import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ChatScreenComponent } from './chat-service/chat-screen.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
 selector: 'app-side-panel',
 standalone: true,
 imports: [CommonModule, AuthenticationComponent, ChatScreenComponent, MatProgressBarModule],
 templateUrl: './side-panel.component.html',
 styleUrls: ['./side-panel.component.scss'],
})
export class SidePanelComponent {
 isAuthenticated = false;
 authenticatedUsername = '';
 isLoading = false;

 handleAuthenticationStatus(status: { isAuthenticated: boolean; username: string }) {
   this.isAuthenticated = status.isAuthenticated;
   this.authenticatedUsername = status.username;
 }

 handleLoadingState(isLoading: boolean) {
   this.isLoading = isLoading;
 }
}
