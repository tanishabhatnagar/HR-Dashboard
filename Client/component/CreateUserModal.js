// components/CreateUserModal.js
'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

export default function CreateUserModal({ isOpen, onClose, onUserCreated }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    department: '',
    rating: 1,
  })
  const [error, setError] = useState('')

  const departments = ['Engineering', 'HR', 'Sales', 'Design', 'Marketing']

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = () => {
    // Basic validation
    if (!form.firstName || !form.lastName || !form.email || !form.age || !form.department) {
      return setError('Please fill all fields.')
    }
    if (isNaN(form.age) || Number(form.age) <= 0) {
      return setError('Age must be a valid number.')
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
    onUserCreated(newUser)
    onClose()
    setForm({ firstName: '', lastName: '', email: '', age: '', department: '', rating: 1 })
    setError('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md text-black relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">
          <X />
        </button>
        <h2 className="text-xl font-bold mb-4">Create New User</h2>

        <div className="space-y-3">
          <input name="firstName" placeholder="First Name" className="w-full p-2 border rounded" onChange={handleChange} value={form.firstName} />
          <input name="lastName" placeholder="Last Name" className="w-full p-2 border rounded" onChange={handleChange} value={form.lastName} />
          <input name="email" placeholder="Email" className="w-full p-2 border rounded" onChange={handleChange} value={form.email} />
          <input name="age" placeholder="Age" className="w-full p-2 border rounded" onChange={handleChange} value={form.age} />
          <select name="department" className="w-full p-2 border rounded" onChange={handleChange} value={form.department}>
            <option value="">Select Department</option>
            {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
          </select>
          <select name="rating" className="w-full p-2 border rounded" onChange={handleChange} value={form.rating}>
            {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{r} Star</option>)}
          </select>
        </div>

        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

        <button
  onClick={handleSubmit}
  className="bg-[#f70776] text-white px-4 py-2 rounded-xl mt-4 w-full hover:bg-[#c3195d] transition"
>
  Create User
</button>

      </div>
    </div>
  )
}
