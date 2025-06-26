'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { UserCircle2, Mail, Phone, MapPin, Star } from 'lucide-react'

const tabs = ['Overview', 'Projects', 'Feedback']

export default function EmployeeDetails() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('Overview')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [feedbackError, setFeedbackError] = useState('')
  const [feedbackSuccess, setFeedbackSuccess] = useState('')

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

  function renderStars(rating) {
    return (
      <div className="flex gap-1 mt-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}
          />
        ))}
      </div>
    )
  }

  if (loading) return <div className="text-center mt-10">Loading...</div>
  if (error) return <div className="text-center text-red-500">{error}</div>

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 rounded-xl space-y-6 max-w-3xl mx-auto shadow-md">
      <div className="flex items-center gap-4">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.firstName + user.lastName + user.id}`}
          alt="avatar"
          className="w-20 h-20 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user.bio}</p>
          <span className="inline-block mt-2 text-xs font-medium bg-[#D6ECFF] dark:bg-blue-900 text-[#1D4ED8] dark:text-blue-300 px-3 py-1 rounded-full">
            {user.department}
          </span>
          {renderStars(user.rating)}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <UserCircle2 size={16} /> {user.department}
        </div>
        <div className="flex items-center gap-2">
          <Mail size={16} /> {user.email}
        </div>
        <div className="flex items-center gap-2">
          <Phone size={16} /> {user.phone}
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} /> {user.address}
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm ${
              activeTab === tab
                ? 'bg-[#2563eb] text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        {activeTab === 'Overview' && (
          <div className="space-y-2">
            <p>
              <strong>Performance Rating:</strong>{' '}
              <span className="text-[#2563eb]">{user.rating} / 5</span>
            </p>
            <p><strong>Experience:</strong> 5+ years</p>
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
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              const feedbackText = e.target.feedback.value.trim()

              if (!feedbackText) {
                setFeedbackError('Feedback is required.')
                setFeedbackSuccess('')
              } else {
                setFeedbackError('')
                setFeedbackSuccess('Thank you for your feedback!')
                e.target.reset()
              }
            }}
          >
            <textarea
              name="feedback"
              rows="3"
              placeholder="Leave feedback..."
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-gray-800 dark:text-white dark:bg-gray-700"
            />
            {feedbackError && <p className="text-red-500 text-sm">{feedbackError}</p>}
            {feedbackSuccess && <p className="text-green-600 text-sm">{feedbackSuccess}</p>}
            <button
              type="submit"
              className="bg-[#2563eb] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#1D4ED8] transition"
            >
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
