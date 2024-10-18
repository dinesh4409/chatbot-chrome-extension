const GEMINI_API_KEY = 'key';  // Replace with your actual API key

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message) {
    const userMessage = request.message;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=key`;

    // Send POST request to Gemini API using fetch
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userMessage }] }]
      })
    })
    .then(response => response.json())
    .then(data => {
      const reply = data.contents ? data.contents[0].parts[0].text : "No response";
      sendResponse({ reply: reply });
    })
    .catch(error => {
      console.error('Error calling Gemini API:', error);
      sendResponse({ reply: 'Error reaching the Gemini API.' });
    });

    return true; // Indicates an asynchronous response
  }
});
