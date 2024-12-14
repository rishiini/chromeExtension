
chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        files: ['content.js']
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error("Error injecting content script:", chrome.runtime.lastError.message);
          // alert("Failed to inject content script. Please reload the page and try again.");
        } else {
          chrome.tabs.sendMessage(tab.id, { action: "start-voice-to-text" }, (response) => {
            if (chrome.runtime.lastError) {
              console.error("Error:", chrome.runtime.lastError.message);
              // alert("The content script is not available. Please reload the page and try again.");
            } else {
              console.log("Message sent successfully:", response);
            }
          });
        }
      }
    );
  } else {
    console.error("No tab ID found.");
    alert("No tab ID found. Please try again.");
  }
});