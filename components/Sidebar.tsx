'use client'

import ThemeToggle from './Theme'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <div
      className={`
        fixed left-0 top-0 h-screen w-16 
        bg-white dark:bg-gray-900
        backdrop-blur-md 
        border-r border-gray-200 dark:border-gray-800
        shadow-lg dark:shadow-gray-900/50
        flex flex-col items-center 
        gap-8 py-6
        transition-colors duration-300
      `}
    >
      <Link
        href="/"
        className="p-3 rounded-lg
          bg-gray-100 dark:bg-gray-800
          hover:bg-gray-200 dark:hover:bg-gray-700
          text-gray-600 dark:text-gray-400
          transition-all duration-200"
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
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </Link>
      <ThemeToggle />
    </div>
  )
}
