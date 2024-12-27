'use client'

import { ThemeProvider } from 'next-themes'
import { useState, useEffect } from 'react'
import { ReactNode } from 'react'
import Sidebar from '@/components/Sidebar'
import { usePathname } from 'next/navigation'

export default function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

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
        {pathname !== '/' && <Sidebar />}
        <main
          className={`${
            pathname !== '/' ? 'pl-16 w-[calc(100%-4rem)]' : 'w-full'
          }`}
        >
          {children}
        </main>
      </div>
    </ThemeProvider>
  )
}
