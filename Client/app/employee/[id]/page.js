'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

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
    <div className="bg-third p-6 rounded-xl space-y-6 text-white">
      <h1 className="text-2xl font-bold">
        {user.firstName} {user.lastName}
      </h1>
      <p className="text-gray-300">{user.bio}</p>
      <p className="text-sm text-gray-400">Department: {user.department}</p>
      <p className="text-sm text-gray-400">Email: {user.email}</p>
      <p className="text-sm text-gray-400">Phone: {user.phone}</p>
      <p className="text-sm text-gray-400">Address: {user.address}</p>

      {/* Tabs */}
      <div className="flex gap-4 mt-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl ${
              activeTab === tab
                ? 'bg-first text-white'
                : 'bg-fourth text-gray-300 hover:bg-second'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-fourth p-4 rounded-xl mt-2">
        {activeTab === 'Overview' && (
          <div>
            <p>
              <strong>Performance Rating:</strong>{' '}
              <span className="text-first">{user.rating} / 5</span>
            </p>
            <p>
              <strong>Experience:</strong> 5+ years
            </p>
          </div>
        )}
        {activeTab === 'Projects' && (
          <ul className="list-disc ml-5">
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
              className="w-full p-2 rounded-md text-black"
            />
            <button
              type="submit"
              className="bg-first px-4 py-2 rounded-xl hover:bg-second"
            >
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
