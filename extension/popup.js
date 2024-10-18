document.getElementById('sendBtn').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;
    
    if (userInput) {
      // Show user message in chatbox
      addMessageToChat('You: ' + userInput, 'user-message');
  
      // Send message to the background script to call the Gemini API
      chrome.runtime.sendMessage({ message: userInput }, function(response) {
        if (response && response.reply) {
          // Show bot's reply in chatbox
          addMessageToChat('Bot: ' + response.reply, 'bot-message');
        } else {
          addMessageToChat('Bot: Sorry, no response available.', 'bot-message');
        }
      });
  
      // Clear the input field
      document.getElementById('userInput').value = '';
    }
  });
  
  function addMessageToChat(message, className) {
    const chatbox = document.getElementById('chatbox');
    const p = document.createElement('p');
    p.className = className;
    p.textContent = message;
    chatbox.appendChild(p);
    chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to the bottom
  }
  