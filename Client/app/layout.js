'use client'

import './globals.css'
import Navbar from '../component/Navbar'
import Sidebar from '../component/Sidebar'
import { useEffect, useState } from 'react'
import withAuth from '../component/authWrapper'

 function RootLayout({ children }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light'
    setIsDark(theme === 'dark')
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [])

  return (
    <html lang="en" suppressHydrationWarning className={isDark ? 'dark' : ''}>
      <body className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Navbar />
            <main className="flex-1 bg-[#f9fafb] dark:bg-[#1e1e1e] overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}

export default withAuth(RootLayout)