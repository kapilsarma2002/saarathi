'use client'
import { useState } from 'react'
import { useDeityStore } from '@/store/deityStore'
import { chatWithGemini } from '@/utils/ai'

interface Message {
  text: string
  sender: 'user' | 'ai'
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const currentDeity = useDeityStore((state) => state.currentDeity)
  const setDeity = useDeityStore((state) => state.setDeity)

  const LoadingDots = () => (
    <div className="flex space-x-2 p-4 bg-gray-100 rounded-lg animate-pulse">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
    </div>
  )

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    setMessages((prev) => [...prev, { text: inputMessage, sender: 'user' }])
    setIsLoading(true)

    try {
      const response = await chatWithGemini(inputMessage)
      setMessages((prev) => [...prev, { text: response, sender: 'ai' }])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }

    setInputMessage('')
  }

  return (
    <div className="flex flex-col items-center justify-between h-screen py-6">
      <div className="flex flex-col gap-4">
        {/* <h1 className="text-2xl">Chatting with: {currentDeity}</h1> */}

        <div className="flex w-[60vw] justify-center">
          <div className="flex gap-6">
            <button
              onClick={() => setDeity('rama')}
              className={`px-8 py-4 rounded-lg shadow-lg transition-all ${
                currentDeity === 'rama'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white hover:bg-orange-100'
              }`}
            >
              Rama
            </button>

            <button
              onClick={() => setDeity('krishna')}
              className={`px-8 py-4 rounded-lg shadow-lg transition-all ${
                currentDeity === 'krishna'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white hover:bg-blue-100'
              }`}
            >
              Krishna
            </button>
          </div>
        </div>

        <div className="h-[calc(100vh-200px)] w-[40vw] flex-1 overflow-y-auto p-4 space-y-4 mx-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.sender === 'user'
                    ? currentDeity === 'krishna'
                      ? 'bg-blue-100'
                      : 'bg-orange-100'
                    : 'bg-gray-100'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <LoadingDots />
            </div>
          )}
        </div>
      </div>

      <div className="relative w-full max-w-2xl px-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          className={`w-full p-4 pr-12 rounded-lg border shadow-sm focus:ring-2
            ${
              currentDeity === 'krishna'
                ? 'focus:ring-blue-500'
                : 'focus:ring-orange-500'
            } 
            focus:outline-none text-xl text-gray-600`}
        />
        <button
          onClick={handleSendMessage}
          className={`absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full
            ${
              currentDeity === 'krishna'
                ? 'text-blue-500 hover:text-blue-600'
                : 'text-orange-500 hover:text-orange-600'
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
