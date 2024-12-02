chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  const handler = new Promise<string>((resolve, reject) => {
    if (request.action === 'getPageInfo') {
      // Send back the page's URL and title
      resolve(`Hi from contentPage! You are currently on: ${window.location.href}, Page Title: ${document.title}`);
    } else if (request.action === 'highlightText') {
      // Example: Highlight all text matching `request.text`
      const text = request.text || '';
      if (text) {
        const regex = new RegExp(text, 'gi');
        document.body.innerHTML = document.body.innerHTML.replace(
          regex,
          (match) => `<span style="background-color: yellow;">${match}</span>`
        );
        resolve(`Highlighted all occurrences of: "${text}"`);
      } else {
        reject('No text provided to highlight.');
      }
    } else {
      reject('Invalid action.');
    }
  });

  handler.then((message) => sendResponse({ status: 'success', message }))
         .catch((error) => sendResponse({ status: 'error', message: error }));

  return true; // Indicates asynchronous response
});
