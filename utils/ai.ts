import { GoogleGenerativeAI } from '@google/generative-ai';

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function chatWithGemini(prompt: string) {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 100,
        temperature: 0.9,
      },
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;

    console.log('Gemini model:', model);
    console.log('Gemini chat:', chat);
    console.log('Gemini result:', result);
    console.log('Gemini response text:', response.text());
    
    return response.text();

  } catch (error) {
    console.error('Error chatting with Gemini:', error);
    throw error;
  }
}