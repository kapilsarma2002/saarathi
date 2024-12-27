'use client'

import { ThemeProvider } from 'next-themes'
import { useState, useEffect } from 'react'
import { ReactNode } from 'react'
import Sidebar from '@/components/Sidebar'

export default function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div>{children}</div>
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Sidebar />
        <main className="pl-16">{children}</main>
      </div>
    </ThemeProvider>
  )
}
