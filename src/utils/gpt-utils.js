/**
 * @param {string} prompt - The system prompt to guide the AI's responses.
 * @param {string} input - The user input to be processed by the AI.
 * @returns {Promise<string>}
 */
export async function getResponse(prompt, input) {
  const azureURL = process.env.AZURE_OPENAI_URL;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;

  const jsonBody = {
    messages: [
      { role: 'system', content: prompt.trim() },
      { role: 'user', content: input.trim() },
    ],
    temperature: 0.7,
  };

  const httpRequest = {
    url: azureURL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify(jsonBody),
  };

  return await fetch(httpRequest.url, {
    method: httpRequest.method,
    headers: httpRequest.headers,
    body: httpRequest.body,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content;
      } else {
        throw new Error('No response from AI');
      }
    })
    .catch((error) => {
      console.error('Error fetching AI response:', error);
      throw error;
    });
}
