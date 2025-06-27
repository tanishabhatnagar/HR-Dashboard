'use client'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'





 function Navbar() {
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
        <h1 className="text-2xl font-bold text-black dark:text-white text-right w-full md:text-left">
  HR Dashboard
</h1>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
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

export default Navbar