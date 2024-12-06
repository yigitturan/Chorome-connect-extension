import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environment } from '../../enviroment';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  private auth = getAuth(initializeApp(environment.firebaseConfig));
  email: string = '';
  password: string = '';
  message: string = '';
  user: any = null;

  ngOnInit() {
    this.monitorAuthState(); // Monitor user's authentication state
  }

  // Log in with email and password
  async loginEmailPassword() {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password);
      this.user = userCredential.user;
      this.message = `Welcome, ${this.user.email}!`;
    } catch (error: any) {
      console.error('Login Error:', error.message);
      this.message = `Login Error: ${error.message}`;
    }
  }

  // Create a new account with email and password
  async createAccount() {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      this.user = userCredential.user;
      this.message = `Account created for ${this.user.email}!`;
    } catch (error: any) {
      console.error('Sign-Up Error:', error.message);
      this.message = `Sign-Up Error: ${error.message}`;
    }
  }

  // Monitor the authentication state
  monitorAuthState() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user = user;
        this.message = `Welcome, ${user.email || 'User'}!`;
      } else {
        this.user = null;
        this.message = 'You are not logged in.';
      }
    });
  }

  // Log out the user
  async logout() {
    try {
      await signOut(this.auth);
      this.user = null;
      this.message = 'Signed out successfully.';
    } catch (error: any) {
      console.error('Sign-Out Error:', error.message);
      this.message = `Sign-Out Error: ${error.message}`;
    }
  }
}
