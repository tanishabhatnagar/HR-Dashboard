'use client'
import { useEffect, useState } from 'react'
import UserCard from '@/component/Usercard'
import useSearch from '@/hooks/useSearch'
import { Search, Star, Building2 } from 'lucide-react'

export default function Home() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('https://dummyjson.com/users?limit=100')
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

  const usersPerPage = 6
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const startIndex = (currentPage - 1) * usersPerPage
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage)

  if (loading) return <div className="text-center mt-10">Loading users...</div>
  if (error) return <div className="text-center text-red-500">{error}</div>

  return (
    <div className="space-y-6 min-h-screen bg-white p-4">
      {/* Filters */}
     {/* Filters */}
<div className="p-4 rounded-xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  {/* Search Bar */}
  <div className="relative w-full sm:w-1/2">
    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
    <input
      type="text"
      placeholder="Search by name, email..."
      className="w-full bg-white pl-10 pr-4 py-2 rounded-lg text-black border border-gray-300"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value)
        setCurrentPage(1)
      }}
    />
  </div>

  {/* Department Filter */}
  <div className="relative w-full sm:w-1/4">
    <Building2 className="absolute left-3 top-2.5 text-gray-400" size={18} />
    <select
      className="w-full pl-10 pr-4 py-2 rounded-lg text-black border border-gray-300 bg-white"
      value={filterDept[0] || ''}
      onChange={(e) => {
        setFilterDept(e.target.value === 'ALL' ? [] : [e.target.value])
        setCurrentPage(1)
      }}
    >
      <option value="" disabled>Filter by Department</option>
      <option value="ALL">All</option>
      {departments.map((dept) => (
        <option key={dept} value={dept}>{dept}</option>
      ))}
    </select>
  </div>

  {/* Rating Filter */}
  <div className="relative w-full sm:w-1/4">
    <Star className="absolute left-3 top-2.5 text-gray-400" size={18} />
    <select
      className="w-full pl-10 pr-4 py-2 rounded-lg text-black border border-gray-300 bg-white"
      value={filterRating[0] || ''}
      onChange={(e) => {
        setFilterRating(e.target.value === 'ALL' ? [] : [Number(e.target.value)])
        setCurrentPage(1)
      }}
    >
      <option value="" disabled>Filter by Rating</option>
      <option value="ALL">All</option>
      {ratings.map((r) => (
        <option key={r} value={r}>{r} Star</option>
      ))}
    </select>
  </div>
</div>


      {/* Users */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentUsers.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">No matching users.</p>
        ) : (
          currentUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap text-sm">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-lg bg-[#E0E0E0] hover:bg-[#D0D0D0] transition disabled:opacity-50"
          >
            &laquo;
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) =>
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 2 && page <= currentPage + 2)
            )
            .map((page, index, arr) => {
              const isEllipsis = index > 0 && page !== arr[index - 1] + 1
              return (
                <div key={page} className="flex items-center">
                  {isEllipsis && <span className="px-2">...</span>}
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg transition ${
                      currentPage === page
                        ? 'bg-[#4F0DCE] text-white'
                        : 'bg-[#E0E0E0] hover:bg-[#D0D0D0]'
                    }`}
                  >
                    {page}
                  </button>
                </div>
              )
            })}

          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-lg bg-[#E0E0E0] hover:bg-[#D0D0D0] transition disabled:opacity-50"
          >
            &raquo;
          </button>
        </div>
      )}
    </div>
  )
}
