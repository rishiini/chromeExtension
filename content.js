// let recognition;

function startVoiceToText() {
  // Check if SpeechRecognition is supported
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Speech Recognition is not supported in your browser.");
    return;
  }

  // Initialize the Web Speech API
  const recognition = new SpeechRecognition();
  recognition.continuous = false; // Set to true for continuous recognition
  recognition.interimResults = false; // Set to true for partial results
  recognition.lang = 'en-US';

  recognition.onresult = function (event) {
    const text = event.results[0][0].transcript;
    console.log("Recognized text:", text);

    // Find the currently focused input/textarea
    const activeElement = document.activeElement;
    if (
      activeElement &&
      (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') &&
      !activeElement.readOnly
    ) {
      activeElement.value += text; // Append text to the input field
    } else {
      alert("Please focus on an editable input or textarea to type.");
    }
  };

  recognition.onerror = function (event) {
    console.error("Speech Recognition Error:", event.error);
    alert(`Speech Recognition Error: ${event.error}`);
  };

  recognition.onend = function () {
    console.log("Speech recognition ended.");
  };

  // Start recognition
  recognition.start();
}


// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "start-voice-to-text") {
    console.log("Voice-to-text action received");
    startVoiceToText();
    sendResponse({ success: true, message: "Voice-to-text started" });
  }
});