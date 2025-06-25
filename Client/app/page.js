'use client'
import { useEffect, useState } from 'react'
import UserCard from '@/component/Usercard'
import useSearch from '@/hooks/useSearch'

export default function Home() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('https://dummyjson.com/users?limit=20')
        const data = await res.json()
        const enhancedUsers = data.users.map((user) => ({
          ...user,
          department: getRandomDepartment(),
          rating: Math.floor(Math.random() * 5) + 1,
        }))
        setUsers(enhancedUsers)
      } catch (err) {
        setError('Failed to load users')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  function getRandomDepartment() {
    const departments = ['Engineering', 'HR', 'Sales', 'Design', 'Marketing']
    return departments[Math.floor(Math.random() * departments.length)]
  }

  const {
    query,
    setQuery,
    filterDept,
    setFilterDept,
    filterRating,
    setFilterRating,
    filteredUsers,
  } = useSearch(users)

  const departments = [...new Set(users.map((u) => u.department))]
  const ratings = [1, 2, 3, 4, 5]

  if (loading) return <div className="text-center mt-10">Loading users...</div>
  if (error) return <div className="text-center text-red-500">{error}</div>

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-third p-4 rounded-xl space-y-4">
        <input
          type="text"
          placeholder="Search by name, email, or department..."
          className="w-full p-2 rounded-lg text-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <select
            multiple
            className="flex-1 p-2 rounded-lg text-black"
            value={filterDept}
            onChange={(e) =>
              setFilterDept(Array.from(e.target.selectedOptions, (opt) => opt.value))
            }
          >
            <option disabled value="">Filter by Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            multiple
            className="flex-1 p-2 rounded-lg text-black"
            value={filterRating}
            onChange={(e) =>
              setFilterRating(Array.from(e.target.selectedOptions, (opt) => Number(opt.value)))
            }
          >
            <option disabled value="">Filter by Rating</option>
            {ratings.map((r) => (
              <option key={r} value={r}>{r} Star</option>
            ))}
          </select>
        </div>
      </div>

      {/* User Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length === 0 ? (
          <p className="text-gray-400 text-center col-span-full">No matching users.</p>
        ) : (
          filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))
        )}
      </section>
    </div>
  )
}
