'use client'

import ThemeToggle from './Theme'

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
      <ThemeToggle />
    </div>
  )
}
