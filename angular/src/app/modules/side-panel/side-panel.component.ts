import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ChatScreenComponent } from './chat-service/chat-screen.component';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [CommonModule, AuthenticationComponent, ChatScreenComponent],
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
})
export class SidePanelComponent {
  isAuthenticated = false; // State to track authentication

  handleAuthenticationStatus(status: boolean) {
    this.isAuthenticated = status; // Set authentication state
  }
}
