let recognition;

function startVoiceToText() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Speech Recognition is not supported in your browser.");
    return;
  }

  // Initialize the Web Speech API
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = function (event) {
    const text = event.results[0][0].transcript;

    // Find the currently focused input/textarea
    const activeElement = document.activeElement;
    if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
      activeElement.value += text; // Append text to the input field
    } else {
      alert("Please focus on an input or textarea to type.");
    }
  };

  recognition.onerror = function (event) {
    console.error("Speech Recognition Error: ", event.error);
  };

  recognition.onend = function () {
    console.log("Speech recognition ended.");
  };

  recognition.start();
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "start-voice-to-text") {
    startVoiceToText();
  }
});
