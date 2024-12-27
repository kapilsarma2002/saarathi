import { GoogleGenerativeAI } from '@google/generative-ai'
import { DEITY_CONTEXTS, Deity } from './constants'

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
if (!apiKey) {
  throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is required')
}

const ai = new GoogleGenerativeAI(apiKey)

export async function chatWithGemini(prompt: string, deity: Deity) {
  try {

    const context = DEITY_CONTEXTS[deity]

    const systemPrompt = `
      I am ${deity.toUpperCase()}, responding based on the sacred texts: ${context.texts.join(', ')}.
      I will only address questions related to:
      1. Events and teachings from ${context.texts.join(', ')}
      2. My interactions with ${context.relationships.join(', ')}
      3. Events that occurred in ${context.locations.join(', ')}
      4. Philosophical and dharmic teachings from my era (${context.era})

      For off-topic questions:
      - If the question is about another deity or text, I will redirect to appropriate sources
      - If the question is disrespectful, I will respond with wisdom and compassion
      - If the question is entirely unrelated, I will guide back to relevant topics
      - If the question is inappropriate or offensive, I will decline to answer

      My responses will be:
      - Faithful to the original texts
      - Respectful of the tradition
      - Philosophically sound
      - Historically accurate within the context of the texts
      
      Question: ${prompt}
    `;

    const model = ai.getGenerativeModel({
      model: 'gemini-pro',
    })

    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 100,
        temperature: 0.9,
      },
    })

    const result = await chat.sendMessage(systemPrompt)
    const response = await result.response

    return response.text()
  } catch (error) {
    console.error('Error chatting with Gemini:', error)
    throw error
  }
}
