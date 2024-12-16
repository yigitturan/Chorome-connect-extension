import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase.config';

@Component({
 selector: 'app-authentication',
 standalone: true,
 imports: [CommonModule, FormsModule],
 templateUrl: './authentication.component.html',
 styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent {
 @Output() authStatus = new EventEmitter<{ isAuthenticated: boolean; username: string }>();

 email = '';
 password = '';
 username = ''; // Only used during Sign Up
 isSignUpMode = false; // Default to Sign In mode
 errorMessage = '';

 toggleMode() {
   this.isSignUpMode = !this.isSignUpMode;
 }

 async signUp() {
   const auth = getAuth();
   try {
     const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
     const user = userCredential.user;

     await setDoc(doc(db, 'users', user.uid), {
       username: this.username,
       email: this.email,
     });

     this.authStatus.emit({ isAuthenticated: true, username: this.username });
   } catch (error) {
     this.errorMessage = error.message;
   }
 }

 async signIn() {
   const auth = getAuth();
   try {
     const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
     const user = userCredential.user;

     const userDoc = await (await import('firebase/firestore')).getDoc(doc(db, 'users', user.uid));
     const userData = userDoc.data();

     if (userData) {
       this.authStatus.emit({ isAuthenticated: true, username: userData['username'] });
     }
   } catch (error) {
     this.errorMessage = error.message;
   }
 }
}