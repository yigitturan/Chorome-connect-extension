/// <reference types="chrome" />

// Constants
const GOOGLE_ORIGIN = 'https://www.google.com';

// Listen for when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed.');

  // Set side panel behavior to open on action click
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .then(() => console.log('Panel behavior set to open on action click.'))
    .catch((error) => console.error('Failed to set panel behavior:', error));
});

// Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener((message: { action: string }, sender, sendResponse) => {
  if (message.action === 'openSidePanel') {
    console.log('Received request to open side panel.');

    // Extract windowId or tabId from sender
    const windowId = sender.tab?.windowId;
    const tabId = sender.tab?.id;

    if (windowId !== undefined) {
      // Open the side panel for the specific window
      chrome.sidePanel
        .open({ windowId })
        .then(() => {
          console.log('Side panel opened successfully.');
          sendResponse({ status: 'success', message: 'Side panel opened successfully.' });
        })
        .catch((error) => {
          console.error('Error opening side panel:', error.message);
          sendResponse({ status: 'error', message: error.message });
        });
    } else if (tabId !== undefined) {
      // Fallback: Open the side panel for a specific tab
      chrome.sidePanel
        .open({ tabId })
        .then(() => {
          console.log('Side panel opened successfully for tab.');
          sendResponse({ status: 'success', message: 'Side panel opened successfully for tab.' });
        })
        .catch((error) => {
          console.error('Error opening side panel for tab:', error.message);
          sendResponse({ status: 'error', message: error.message });
        });
    } else {
      console.error('Invalid windowId and tabId: Unable to open side panel.');
      sendResponse({ status: 'error', message: 'Invalid windowId and tabId: Unable to open side panel.' });
    }

    return true; // Indicates asynchronous response
  }
});

// Enable side panel on specific tabs
chrome.tabs.onUpdated.addListener((tabId: number, info, tab) => {
  if (!tab.url) return;

  const url = new URL(tab.url);

  if (url.origin === GOOGLE_ORIGIN) {
    chrome.sidePanel
      .setOptions({
        tabId,
        path: 'sidepanel.html',
        enabled: true,
      })
      .then(() => console.log(`Side panel enabled for tab ${tabId}.`))
      .catch((error) => console.error(`Failed to enable side panel for tab ${tabId}:`, error));
  } else {
    chrome.sidePanel
      .setOptions({
        tabId,
        enabled: false,
      })
      .then(() => console.log(`Side panel disabled for tab ${tabId}.`))
      .catch((error) => console.error(`Failed to disable side panel for tab ${tabId}:`, error));
  }
});

// Enable a context menu for opening the side panel
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'openSidePanel',
    title: 'Open Side Panel',
    contexts: ['all'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openSidePanel') {
    // Open the side panel for the current tab
    const tabId = tab?.id;

    if (tabId !== undefined) {
      chrome.sidePanel
        .open({ tabId })
        .then(() => console.log('Side panel opened from context menu.'))
        .catch((error) => console.error('Error opening side panel from context menu:', error.message));
    } else {
      console.error('No valid tabId to open side panel from context menu.');
    }
  }
});


//https://developer.chrome.com/docs/extensions/reference/api/sidePanel