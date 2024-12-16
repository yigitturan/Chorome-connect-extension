import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { collection, query, onSnapshot, orderBy, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase.config';

interface Message {
  id?: string;
  text?: string;
  photoUrl?: string;
  createdAt: Timestamp;
  username: string;
}

@Component({
  selector: 'app-chat-screen',
  standalone: true,
  imports: [CommonModule, FormsModule, MatProgressBarModule],
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.scss'],
})
export class ChatScreenComponent implements AfterViewInit {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  @ViewChild('video') videoElement!: ElementRef;

  @Input() currentUsername!: string;
  @Output() loadingState = new EventEmitter<boolean>();

  messages: Message[] = [];
  newMessage = '';
  isSending = false;
  isLoading = true;
  isCapturingPhoto = false;
  capturedPhotoBlob: Blob | null = null;
  usernameColors = new Map<string, string>();
  private stream: MediaStream | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.fetchMessages();
  }

  fetchMessages() {
    this.loadingState.emit(true);
    const messagesQuery = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));

    onSnapshot(
      messagesQuery,
      (snapshot) => {
        this.messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[];

        this.assignUsernameColors();
        this.scrollToBottom();
        this.isLoading = false;
        this.loadingState.emit(false);
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching messages:', error);
        this.isLoading = false;
        this.loadingState.emit(false);
        this.cdr.detectChanges();
      }
    );
  }

  async sendMessage() {
    const messageText = this.newMessage.trim();
    if (!messageText || this.isSending) return;

    this.isSending = true;
    this.loadingState.emit(true);

    try {
      await addDoc(collection(db, 'messages'), {
        text: messageText,
        createdAt: Timestamp.fromDate(new Date()),
        username: this.currentUsername,
      });
      this.newMessage = '';
      this.scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      this.isSending = false;
      this.loadingState.emit(false);
    }
  }

  formatTimestamp(timestamp: Timestamp): string {
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(date);
  }

  scrollToBottom() {
    if (this.scrollContainer) {
      setTimeout(() => {
        const container = this.scrollContainer.nativeElement;
        container.scrollTop = container.scrollHeight;
      }, 100);
    }
  }

  getUsernameColor(username: string): string {
    if (this.usernameColors.has(username)) {
      return this.usernameColors.get(username)!;
    }

    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    this.usernameColors.set(username, color);
    return color;
  }

  assignUsernameColors() {
    this.messages.forEach((message) => {
      if (!this.usernameColors.has(message.username)) {
        this.getUsernameColor(message.username);
      }
    });
  }

  async startCamera() {
    if (this.isCapturingPhoto) {
      return; // Prevent multiple initializations
    }

    try {
      // Stop any existing stream
      await this.stopCamera();
      
      this.isCapturingPhoto = true;
      this.cdr.detectChanges(); // Ensure template is updated before accessing video element
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      this.stream = stream;
      const video = this.videoElement?.nativeElement;
      
      if (video) {
        video.srcObject = stream;
        await video.play(); // Wait for video to start playing
      }
    } catch (error) {
      console.error('Error starting camera:', error);
      this.isCapturingPhoto = false;
      this.cdr.detectChanges();
    }
  }

  async capturePhoto() {
    const video = this.videoElement?.nativeElement;

    if (!video?.srcObject) {
      console.error('Camera is not active.');
      return;
    }

    try {
      // Ensure video has valid dimensions
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;

      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Canvas context could not be created.');
      }

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      this.capturedPhotoBlob = await new Promise((resolve) =>
        canvas.toBlob(resolve, 'image/jpeg', 0.9)
      );

      if (!this.capturedPhotoBlob) {
        throw new Error('Failed to capture photo.');
      }

      await this.stopCamera();
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error capturing photo:', error);
      await this.stopCamera();
      this.cdr.detectChanges();
    }
  }

  async stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }

    const video = this.videoElement?.nativeElement;
    if (video) {
      video.srcObject = null;
    }

    this.isCapturingPhoto = false;
    this.cdr.detectChanges();
  }

  async sendPhoto() {
    if (!this.capturedPhotoBlob) {
      console.error('No photo to send.');
      return;
    }

    this.isSending = true;
    this.loadingState.emit(true);

    try {
      const photoRef = ref(storage, `photos/${Date.now()}.jpg`);
      await uploadBytes(photoRef, this.capturedPhotoBlob);
      const photoUrl = await getDownloadURL(photoRef);

      await addDoc(collection(db, 'messages'), {
        photoUrl,
        createdAt: Timestamp.fromDate(new Date()),
        username: this.currentUsername,
      });

      this.capturedPhotoBlob = null;
      this.scrollToBottom();
    } catch (error) {
      console.error('Error sending photo:', error);
    } finally {
      this.isSending = false;
      this.loadingState.emit(false);
    }
  }
}