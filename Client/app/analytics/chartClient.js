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

export default function ChartClient({ users }) {
  const [filteredDept, setFilteredDept] = useState('All')
  const [departmentData, setDepartmentData] = useState(null)

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
          backgroundColor: '#1D4ED8',
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
        borderColor: '#1D4ED8',
        backgroundColor: '#60A5FA',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <label
          htmlFor="dept-filter"
          className="text-sm font-medium text-[#1E3A8A] dark:text-blue-300"
        >
          Filter by Department:
        </label>
        <select
          id="dept-filter"
          value={filteredDept}
          onChange={(e) => setFilteredDept(e.target.value)}
          className="border border-blue-300 dark:border-blue-600 rounded-lg px-4 py-2 text-sm bg-white dark:bg-gray-800 text-[#1E3A8A] dark:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-blue-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition">
          <h2 className="text-lg font-semibold mb-4 text-[#1D4ED8] dark:text-blue-400">
            📈 Department-wise Average Ratings
          </h2>
          {departmentData ? (
            <Bar data={departmentData} options={{ responsive: true }} />
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-300">Loading chart...</p>
          )}
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-blue-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition">
          <h2 className="text-lg font-semibold mb-4 text-[#1D4ED8] dark:text-blue-400">
            📌 Bookmark Trends (Mocked)
          </h2>
          <Line data={bookmarkData} options={{ responsive: true }} />
        </div>
      </div>
    </>
  )
}
