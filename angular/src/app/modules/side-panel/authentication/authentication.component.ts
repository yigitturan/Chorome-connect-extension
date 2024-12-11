import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // For ngModel
import { auth } from '../firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [CommonModule, FormsModule], // Imported modules for template functionality
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent {
  email = '';
  password = '';
  @Output() authStatus = new EventEmitter<boolean>();
  isLoading = false;
  errorMessage: string | null = null;

  async signIn() {
    this.isLoading = true;
    this.errorMessage = null;

    try {
      await signInWithEmailAndPassword(auth, this.email.trim(), this.password);
      this.authStatus.emit(true); // Notify success
    } catch (error: any) {
      this.errorMessage = this.getErrorMessage(error.code);
      console.error('Login failed:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/user-not-found':
        return 'No user found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      default:
        return 'An unknown error occurred. Please try again later.';
    }
  }
}
