'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { UserCircle2, Mail, Phone, MapPin } from 'lucide-react'

const tabs = ['Overview', 'Projects', 'Feedback']

export default function EmployeeDetails() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('Overview')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`https://dummyjson.com/users/${id}`)
        const data = await res.json()
        const enhancedUser = {
          ...data,
          department: getRandomDepartment(),
          rating: Math.floor(Math.random() * 5) + 1,
          address: `${data.address?.address}, ${data.address?.city}`,
          bio: 'Hardworking and passionate employee with strong team values.',
          history: Array.from({ length: 3 }, (_, i) => ({
            year: 2021 + i,
            score: Math.floor(Math.random() * 100),
          })),
        }
        setUser(enhancedUser)
      } catch (err) {
        setError('User not found.')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  function getRandomDepartment() {
    const departments = ['Engineering', 'HR', 'Sales', 'Design', 'Marketing']
    return departments[Math.floor(Math.random() * departments.length)]
  }

  if (loading) return <div className="text-center mt-10">Loading...</div>
  if (error) return <div className="text-center text-red-500">{error}</div>

  return (
    <div className="bg-white p-6 rounded-xl space-y-6 text-gray-800 max-w-3xl mx-auto shadow-md">
      <div className="flex items-center gap-4">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.firstName + user.lastName + user.id}`}
          alt="avatar"
          className="w-20 h-20 rounded-full border border-gray-300"
        />
        <div>
          <h1 className="text-2xl font-bold">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-sm text-gray-500">{user.bio}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <UserCircle2 size={16} /> {user.department}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail size={16} /> {user.email}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone size={16} /> {user.phone}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin size={16} /> {user.address}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mt-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm ${
              activeTab === tab
                ? 'bg-[#2563eb] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        {activeTab === 'Overview' && (
          <div className="space-y-2">
            <p>
              <strong>Performance Rating:</strong>{' '}
              <span className="text-[#2563eb]">{user.rating} / 5</span>
            </p>
            <p>
              <strong>Experience:</strong> 5+ years
            </p>
          </div>
        )}
        {activeTab === 'Projects' && (
          <ul className="list-disc ml-5 text-sm space-y-1">
            <li>Team Collaboration Tool</li>
            <li>Performance Tracker App</li>
            <li>Remote Work Dashboard</li>
          </ul>
        )}
        {activeTab === 'Feedback' && (
          <form className="space-y-4">
            <textarea
              rows="3"
              placeholder="Leave feedback..."
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-gray-800"
            />
            <button
              type="submit"
              className="bg-[#2563eb] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#5B46D3] transition"
            >
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
