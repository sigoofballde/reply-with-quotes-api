export const geminiResponse = {
  response: {
    candidates: [
      {
        content: {
          parts: [
            {
              text:
                'Here are 3 movie/TV show quotes you can use to reply to "Hello":\n' +
                '\n' +
                `1. "**I'm sorry, I don't speak English.**" - *The Princess Bride* \n` +
                '2. "**You talking to me?**" - *Taxi Driver* \n' +
                `3. **"I'm feeling... like a very large, very purple, very angry grape." - The Simpsons** \n`,
            },
          ],
          role: 'model',
        },
        finishReason: 'STOP',
        index: 0,
        safetyRatings: [
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            probability: 'NEGLIGIBLE',
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            probability: 'NEGLIGIBLE',
          },
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            probability: 'NEGLIGIBLE',
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            probability: 'NEGLIGIBLE',
          },
        ],
      },
    ],
    usageMetadata: {
      promptTokenCount: 31,
      candidatesTokenCount: 90,
      totalTokenCount: 121,
    },
    text: () => {
      return { name: '' }
    },
    functionCall: () => {
      return { name: '' }
    },
    functionCalls: () => {
      return { name: '' }
    },
  },
}

export const formattedJSONResponse = [
  {
    quote: `I'm sorry, I don't speak English.`,
    reference: 'The Princess Bride',
  },
  { quote: 'You talking to me?', reference: 'Taxi Driver' },
  {
    quote: `I'm feeling... like a very large, very purple, very angry grape.`,
    reference: 'The Simpsons',
  },
]
