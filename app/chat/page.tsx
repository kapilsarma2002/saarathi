'use client'
import { useDeityStore } from '@/store/deityStore'
import { chatWithGemini } from '@/utils/ai'

export default function Chat() {
  const currentDeity = useDeityStore((state) => state.currentDeity)
  const setDeity = useDeityStore((state) => state.setDeity)
  const res = chatWithGemini('Jai Sri Krishna!')
  console.log('Chat response:', res)

  return (
    <div className="flex flex-col items-center justify-between h-screen py-6">
      <div className='flex flex-col gap-4'>
        <h1 className="text-2xl">
          Chatting with: {currentDeity}
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => setDeity('rama')}
            className={`px-8 py-4 rounded-lg shadow-lg transition-all ${currentDeity === 'rama'
                ? 'bg-orange-500 text-white'
                : 'bg-white hover:bg-orange-100'
              }`}
          >
            Rama
          </button>

          <button
            onClick={() => setDeity('krishna')}
            className={`px-8 py-4 rounded-lg shadow-lg transition-all ${currentDeity === 'krishna'
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-blue-100'
              }`}
          >
            Krishna
          </button>
        </div>
      </div>

      <div className="relative w-full max-w-2xl px-4">
        <input
          type="text"
          placeholder="Type your message..."
          className={`w-full p-4 pr-12 rounded-lg border shadow-sm focus:ring-2
            ${currentDeity === 'krishna' ? 'focus:ring-blue-500' : 'focus:ring-orange-500'} 
            focus:outline-none`
          }
        />
        <button
          className={`absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full
            ${currentDeity === 'krishna'
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