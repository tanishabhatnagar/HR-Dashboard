import ChartClient from "./chartClient"

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
      <h1 className="text-3xl font-extrabold text-center text-[#1D4ED8] dark:text-blue-400">
        📊 Analytics Dashboard
      </h1>

      <ChartClient users={enrichedUsers} />
    </div>
  )
}
