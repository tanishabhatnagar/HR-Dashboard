'use client'
import { PlusCircle, Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'
import CreateUserModal from './CreateUserModal'

export default function Navbar() {
  const [showModal, setShowModal] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
  const isDark = localStorage.getItem('theme') === 'dark'
  setDarkMode(isDark)
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}, [])

const toggleTheme = () => {
  const newTheme = !darkMode
  setDarkMode(newTheme)
  localStorage.setItem('theme', newTheme ? 'dark' : 'light')

  if (newTheme) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

  return (
    <>
      <header className="w-full bg-[#FCFCFC] dark:bg-[#1e1e1e] p-4 shadow flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black dark:text-white">HR Dashboard</h1>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="bg-[#2563eb] text-white px-4 py-2 rounded-xl hover:bg-[#1d4ed8] transition text-sm flex items-center gap-2"
          >
            <PlusCircle size={18} />
            Create User
          </button>
        </div>
      </header>

      {showModal && (
        <CreateUserModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onUserCreated={() => {}}
        />
      )}
    </>
  )
}
