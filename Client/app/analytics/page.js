'use client'

import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const departments = ['All', 'Engineering', 'HR', 'Sales', 'Design', 'Marketing']

export default function AnalyticsPage() {
  const [users, setUsers] = useState([])
  const [filteredDept, setFilteredDept] = useState('All')
  const [departmentData, setDepartmentData] = useState(null)

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch('https://dummyjson.com/users?limit=100')
      const { users } = await res.json()

      const departments = ['Engineering', 'HR', 'Sales', 'Design', 'Marketing']
      const enrichedUsers = users.map(user => ({
        ...user,
        department: departments[Math.floor(Math.random() * departments.length)],
        rating: Math.floor(Math.random() * 5) + 1,
      }))

      setUsers(enrichedUsers)
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    const ratingMap = {}
    const countMap = {}

    const applicableUsers = users.filter(user =>
      filteredDept === 'All' ? true : user.department === filteredDept
    )

    applicableUsers.forEach(user => {
      const dept = user.department
      ratingMap[dept] = (ratingMap[dept] || 0) + user.rating
      countMap[dept] = (countMap[dept] || 0) + 1
    })

    const uniqueDepartments = [...new Set(applicableUsers.map(u => u.department))]

    const averageRatings = uniqueDepartments.map(dept => {
      const avg = ratingMap[dept] / countMap[dept]
      return Math.round(avg * 10) / 10
    })

    setDepartmentData({
      labels: uniqueDepartments,
      datasets: [
        {
          label: 'Average Rating',
          data: averageRatings,
          backgroundColor: '#f70776',
        },
      ],
    })
  }, [users, filteredDept])

  const bookmarkData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Bookmarks',
        data: [5, 8, 12, 9, 15, 20],
        borderColor: '#c3195d',
        backgroundColor: '#f70776',
      },
    ],
  }

  return (
    <div className="p-6 space-y-8 bg-white text-black rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold text-center">📊 Analytics Dashboard</h1>

      {/* Dropdown Filter */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <label htmlFor="dept-filter" className="text-sm font-medium">
          Filter by Department:
        </label>
        <select
          id="dept-filter"
          value={filteredDept}
          onChange={(e) => setFilteredDept(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow">
          <h2 className="text-lg font-semibold mb-2 text-pink-600">
            Department-wise Average Ratings
          </h2>
          {departmentData ? (
            <Bar data={departmentData} options={{ responsive: true }} />
          ) : (
            <p className="text-sm text-gray-500">Loading chart...</p>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow">
          <h2 className="text-lg font-semibold mb-2 text-pink-600">
            Bookmark Trends (Mocked)
          </h2>
          <Line data={bookmarkData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  )
}
