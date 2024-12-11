import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidePanelComponent } from './modules/side-panel/side-panel.component'; // Adjust the path to your SidePanelComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SidePanelComponent], // Include SidePanelComponent in the imports array
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
