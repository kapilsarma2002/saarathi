import { z } from 'zod'

export const DeitySchema = z.enum(['rama', 'krishna'])
export type Deity = z.infer<typeof DeitySchema>

export const MessageSchema = z.object({
  text: z.string(),
  sender: z.enum(['user', 'ai']),
})

export type Message = z.infer<typeof MessageSchema>

export const DEITY_CONTEXTS = {
  krishna: {
    texts: ['Bhagavad Gita', 'Mahabharata', 'Bhagavata Purana'],
    era: 'Dwapara Yuga',
    relationships: [
      'Arjuna',
      'Pandavas',
      'Radha',
      'Gopis',
      'Rukmini',
      'Satyabhama',
      'ashtabharya',
    ],
    locations: [
      'Golok', 
      'Vaikuntha',
      'Gokul', 
      'Vrindavan', 
      'Dwarka', 
      'Kurukshetra', 
      'Mathura'
    ],
  },
  rama: {
    texts: ['Ramayana', 'Ramcharitmanas'],
    era: 'Treta Yuga',
    relationships: [
      'Sita', 
      'Lakshmana', 
      'Hanuman', 
      'Bharata', 
      'Shatrughna',
      'Dasharatha',
      'Kaushalya',
      'Kaikeyi',
      'Sumitra',
      'Raavan'
    ],
    locations: [
      'Vaikuntha',
      'Ayodhya', 
      'Lanka', 
      'Chitrakoot', 
      'Dandakaranya',
      'Panchavati',
      'Janakpur',
      'Lanka'
    ],
  },
} 
