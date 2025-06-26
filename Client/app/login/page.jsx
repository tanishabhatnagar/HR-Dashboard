'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Cookies from 'js-cookie'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (email && password) {
      Cookies.set('auth', 'true', { expires: 1 }) 
      router.push('/')
    } else {
      setError('Please enter email and password')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50 dark:bg-blue-950">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-blue-900 text-black dark:text-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded dark:bg-blue-800 dark:border-blue-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded dark:bg-blue-800 dark:border-blue-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  )
}
