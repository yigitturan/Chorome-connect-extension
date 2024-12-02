(() => {
  const targetUrl = 'index.html?#/side-panel';

  try {
    console.log('Redirecting to side panel route...');
    window.location.href = targetUrl;
  } catch (error) {
    console.error('Error during redirection:', error.message);
    document.body.innerHTML = `
      <div class="message">
        <p>Failed to redirect to side panel. Please try again later.</p>
        <p>Error: ${error.message}</p>
      </div>
    `;
  }
})();
