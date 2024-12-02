import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'side-panel.component.html',
  styleUrls: ['side-panel.component.scss']
})
export class SidePanelComponent {}
