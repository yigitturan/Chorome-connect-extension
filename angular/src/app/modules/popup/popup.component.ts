import { Component } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  message: string = 'Click the button to open the side panel!';

  onOpenSidePanel() {
    chrome.runtime.sendMessage({ action: 'openSidePanel' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error:', chrome.runtime.lastError.message);
        this.message = `Error: ${chrome.runtime.lastError.message}`;
      } else {
        console.log('Side Panel Response:', response?.message);
        this.message = response?.message || 'Side panel opened successfully!';
      }
    });
  }
}
