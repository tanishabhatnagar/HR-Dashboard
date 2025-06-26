import ChartClient from "./chartClient"
import { BarChart3 } from 'lucide-react'

export default async function AnalyticsPage() {
  const res = await fetch('https://dummyjson.com/users?limit=100')
  const { users } = await res.json()

  const departments = ['Engineering', 'HR', 'Sales', 'Design', 'Marketing']
  const enrichedUsers = users.map(user => ({
    ...user,
    department: departments[Math.floor(Math.random() * departments.length)],
    rating: Math.floor(Math.random() * 5) + 1,
  }))

  return (
    <div className="p-6 space-y-8 bg-[#F9FAFB] dark:bg-gray-900 text-black dark:text-white rounded-2xl min-h-screen">
      <div className="flex items-center justify-center gap-2">
        <BarChart3 className="h-8 w-8 text-[#1D4ED8] dark:text-blue-400" />
        <h1 className="text-3xl font-extrabold text-[#1D4ED8] dark:text-blue-400">
          Analytics Dashboard
        </h1>
      </div>

      <ChartClient users={enrichedUsers} />
    </div>
  )
}
