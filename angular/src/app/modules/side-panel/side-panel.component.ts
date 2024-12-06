import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { AuthenticationComponent } from './components/authentication/authentication.component'; // Adjust path as necessary


@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [CommonModule, AuthenticationComponent],
  templateUrl: 'side-panel.component.html',
  styleUrls: ['side-panel.component.scss']
})
export class SidePanelComponent {}
