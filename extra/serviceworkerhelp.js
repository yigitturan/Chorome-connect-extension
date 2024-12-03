chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed.');
  
    // Set side panel behavior to open on action click
    chrome.sidePanel
      .setPanelBehavior({ openPanelOnActionClick: true })
      .catch((error) => console.error('Failed to set panel behavior:', error));
  });
  
  // Listen for messages to open the side panel
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'openSidePanel') {
      console.log('Received request to open side panel.');
  
      chrome.sidePanel
        .open({ windowId: sender.tab?.windowId }) // Open the side panel for the current window
        .then(() => {
          console.log('Side panel opened successfully.');
          sendResponse({ status: 'success', message: 'Side panel opened successfully.' });
        })
        .catch((error) => {
          console.error('Error opening side panel:', error.message);
          sendResponse({ status: 'error', message: error.message });
        });
  
      return true; // Keep the message channel open for async responses
    }
  });

  // there is some issue on service file so we need to copy that file directly service file worker in dist file and then reupdate extension in chorome and boom
  
  