const GEMINI_API_KEY = 'AIzaSyDAdgx03H2n2J-NKGoiZa9-aABygK2HrUs'; // Replace with your actual API key

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message) {
    const userMessage = request.message;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

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
        // Log full response for debugging
        console.log('Full API Response:', data);

        // Check if the response has candidates array and the text in the first part
        const reply = data.candidates && data.candidates.length > 0
          && data.candidates[0].content.parts
          && data.candidates[0].content.parts.length > 0
          ? data.candidates[0].content.parts[0].text
          : "No response";

        sendResponse({ reply: reply });
      })
      .catch(error => {
        console.error('Error calling Gemini API:', error);
        sendResponse({ reply: 'Error reaching the Gemini API.' });
      });

    return true; // Keeps the messaging channel open for async response
  }
});
