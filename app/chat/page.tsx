'use client'
import { useEffect, useRef, useState } from 'react'
import { useDeityStore } from '@/store/deityStore'
import { chatWithGemini } from '@/utils/ai'
import { Message } from '@/utils/constants'

export default function Chat() {
  const currentDeity = useDeityStore((state) => state.currentDeity)
  const setDeity = useDeityStore((state) => state.setDeity)

  const [krishnaMessages, setKrishnaMessages] = useState<Message[]>([])
  const [ramaMessages, setRamaMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const currentMessages =
      currentDeity === 'krishna' ? krishnaMessages : ramaMessages
    const setMessages =
      currentDeity === 'krishna' ? setKrishnaMessages : setRamaMessages

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [krishnaMessages, ramaMessages])

 

  const LoadingDots = () => (
    <div className="flex space-x-2 p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
      <div className="w-2 h-2 rounded-full bg-gray-600 dark:bg-gray-400 animate-bounce"></div>
      <div className="w-2 h-2 rounded-full bg-gray-600 dark:bg-gray-400 animate-bounce [animation-delay:0.2s]"></div>
      <div className="w-2 h-2 rounded-full bg-gray-600 dark:bg-gray-400 animate-bounce [animation-delay:0.4s]"></div>
    </div>
  )

  const handleSendMessage = async () => {
    setInputMessage('')
    if (!inputMessage.trim()) return

    setMessages((prev) => [...prev, { text: inputMessage, sender: 'user' }])
    setIsLoading(true)

    try {
      const response = await chatWithGemini(inputMessage, currentDeity)
      setMessages((prev) => [...prev, { text: response, sender: 'ai' }])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="flex flex-col items-center justify-between h-screen py-6 
      bg-white dark:bg-gray-900 
      text-gray-900 dark:text-gray-100 
      transition-colors duration-300"
    >
      <div className="flex flex-col gap-4">
        <div className="flex w-[60vw] justify-center">
          <div className="flex gap-6">
            <button
              onClick={() => setDeity('rama')}
              className={`px-8 py-4 rounded-lg shadow-lg transition-all ${
                currentDeity === 'rama'
                  ? 'bg-orange-500 dark:bg-orange-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-orange-100 dark:hover:bg-orange-900/30'
              }`}
            >
              Rama
            </button>

            <button
              onClick={() => setDeity('krishna')}
              className={`px-8 py-4 rounded-lg shadow-lg transition-all ${
                currentDeity === 'krishna'
                  ? 'bg-blue-500 dark:bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30'
              }`}
            >
              Krishna
            </button>
          </div>
        </div>

        <div
          className="w-[50vw] h-[calc(100vh-12rem)] 
          overflow-y-auto 
          p-4 space-y-4 mx-auto
          scrollbar-thin 
          scrollbar-track-transparent
          scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600
          scrollbar-thumb-rounded-full
          hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500
          transition-colors duration-300"
        >
          {' '}
          {currentMessages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-gray-100 dark:bg-gray-800'
                    : 'bg-blue-50 dark:bg-gray-700'
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
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="fixed bottom-0 w-full max-w-2xl pt-2 p-4 bg-inherit">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          className={`w-full sticky p-4 pr-12 rounded-lg
            border border-gray-200 dark:border-gray-700
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            shadow-lg dark:shadow-gray-900/50
            focus:ring-2 focus:outline-none text-xl
            transition-colors duration-200
            ${
              currentDeity === 'krishna'
                ? 'focus:ring-blue-500 dark:focus:ring-blue-600'
                : 'focus:ring-orange-500 dark:focus:ring-orange-600'
            }`}
        />
        <button
          onClick={handleSendMessage}
          className={`absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full
            transition-colors duration-200
            ${
              currentDeity === 'krishna'
                ? 'text-blue-500 dark:text-blue-400'
                : 'text-orange-500 dark:text-orange-400'
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
