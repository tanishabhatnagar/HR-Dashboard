'use client'

import { useState, useEffect } from 'react'
import { UserPlus } from 'lucide-react' // using lucide-react for icon

export default function CreateUserPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    department: '',
    rating: 1,
  })

  const [error, setError] = useState('')
  const [existingEmails, setExistingEmails] = useState([])

  const departments = ['Engineering', 'HR', 'Sales', 'Design', 'Marketing']

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('customUsers') || '[]')
    const emails = stored.map(user => user.email.toLowerCase())
    setExistingEmails(emails)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const validate = () => {
    const { firstName, lastName, email, age, department } = form

    if (!firstName || !lastName || !email || !age || !department) {
      return 'Please fill all fields.'
    }

    if (!/^[a-zA-Z\s]+$/.test(firstName) || !/^[a-zA-Z\s]+$/.test(lastName)) {
      return 'Names should only contain letters and spaces.'
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return 'Invalid email format.'
    }

    if (existingEmails.includes(email.toLowerCase())) {
      return 'This email already exists.'
    }

    const ageNumber = Number(age)
    if (isNaN(ageNumber) || ageNumber < 18 || ageNumber > 65) {
      return 'Age must be a number between 18 and 65.'
    }

    return ''
  }

  const handleSubmit = () => {
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    const newUser = {
      ...form,
      id: Date.now(),
      age: Number(form.age),
      rating: Number(form.rating),
    }

    const existing = JSON.parse(localStorage.getItem('customUsers') || '[]')
    const updated = [...existing, newUser]
    localStorage.setItem('customUsers', JSON.stringify(updated))

    setForm({
      firstName: '',
      lastName: '',
      email: '',
      age: '',
      department: '',
      rating: 1,
    })
    setError('')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex items-center justify-center p-8">
      <div className="flex flex-col md:flex-row bg-gray-50 dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden w-full max-w-5xl">
        
        {/* Left Side - Icon */}
        <div className="flex flex-col items-center justify-center bg-blue-100 dark:bg-gray-700 p-8 md:w-1/2">
          <UserPlus className="h-24 w-24 text-blue-600 dark:text-white mb-4" />
          <h2 className="text-2xl font-bold text-blue-600 dark:text-white text-center">
            Add a New User
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 text-center mt-2">
            Fill out the form to register a new employee in the system.
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:w-1/2">
          <h1 className="text-2xl font-extrabold mb-6 text-center text-[#2563eb] dark:text-bg-blue-800">
            Create New User
          </h1>

          <div className="space-y-4">
            <input name="firstName" placeholder="First Name" className="w-full p-3 border rounded-lg dark:bg-gray-800" onChange={handleChange} value={form.firstName} />
            <input name="lastName" placeholder="Last Name" className="w-full p-3 border rounded-lg dark:bg-gray-800" onChange={handleChange} value={form.lastName} />
            <input name="email" placeholder="Email" className="w-full p-3 border rounded-lg dark:bg-gray-800" onChange={handleChange} value={form.email} />
            <input name="age" placeholder="Age" className="w-full p-3 border rounded-lg dark:bg-gray-800" onChange={handleChange} value={form.age} />

            <select name="department" className="w-full p-3 border rounded-lg dark:bg-gray-800" onChange={handleChange} value={form.department}>
              <option value="">Select Department</option>
              {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
            </select>

            <select name="rating" className="w-full p-3 border rounded-lg dark:bg-gray-800" onChange={handleChange} value={form.rating}>
              {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{r} Star</option>)}
            </select>
          </div>

          {error && <p className=" mt-3 text-sm">{error}</p>}

          <button
            onClick={handleSubmit}
            className="bg-[#2563eb] hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-xl mt-6 w-full"
          >
            🚀 Create User
          </button>
        </div>
      </div>
    </div>
  )
}
