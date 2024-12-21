import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
if (!apiKey) {
  throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is required')
}

const ai = new GoogleGenerativeAI(apiKey)

export async function chatWithGemini(prompt: string) {
  try {
    const model = ai.getGenerativeModel({
      model: 'gemini-pro',
    })

    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 100,
        temperature: 0.9,
      },
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;

    // console.log('Gemini model:', model);
    // console.log('Gemini chat:', chat);
    // console.log('Gemini result:', result);
    // console.log('Gemini response text:', response.text());
    
    return response.text();

  } catch (error) {
    console.error('Error chatting with Gemini:', error);
    throw error;
  }
}