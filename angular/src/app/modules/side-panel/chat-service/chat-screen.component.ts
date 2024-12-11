import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { collection, query, onSnapshot, orderBy, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase.config';

interface Message {
  id?: string;
  text: string;
  createdAt: Timestamp;
}

@Component({
  selector: 'app-chat-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.scss'],
})
export class ChatScreenComponent implements AfterViewInit {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  messages: Message[] = [];
  newMessage = '';

  constructor() {
    this.fetchMessages();
  }

  fetchMessages() {
    const messagesQuery = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));
    onSnapshot(
      messagesQuery,
      (snapshot) => {
        this.messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[];
        this.scrollToBottom(); // Scroll to the bottom when new messages arrive
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  async sendMessage() {
    const messageText = this.newMessage.trim();
    if (!messageText) return;

    try {
      await addDoc(collection(db, 'messages'), {
        text: messageText,
        createdAt: Timestamp.fromDate(new Date()),
      });
      this.newMessage = ''; // Clear input field
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  scrollToBottom() {
    if (this.scrollContainer) {
      setTimeout(() => {
        this.scrollContainer.nativeElement.scrollTop =
          this.scrollContainer.nativeElement.scrollHeight;
      }, 0);
    }
  }

  ngAfterViewInit() {
    this.scrollToBottom(); // Ensure scroll is set to the bottom when the view is initialized
  }
}
