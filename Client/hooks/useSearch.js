'use client'
import { useState, useEffect } from 'react'

export default function useSearch(users) {
  const [query, setQuery] = useState('')
  const [filterDept, setFilterDept] = useState([])
  const [filterRating, setFilterRating] = useState([])
  const [filteredUsers, setFilteredUsers] = useState(users)

  useEffect(() => {
    const lowerQuery = query.toLowerCase()

    const result = users.filter((user) => {
      const matchesQuery =
        user.firstName.toLowerCase().includes(lowerQuery) ||
        user.lastName.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery) ||
        user.department.toLowerCase().includes(lowerQuery)

      const matchesDept =
        filterDept.length === 0 || filterDept.includes(user.department)

      const matchesRating =
        filterRating.length === 0 || filterRating.includes(user.rating)

      return matchesQuery && matchesDept && matchesRating
    })

    setFilteredUsers(result)
  }, [query, filterDept, filterRating, users])

  return {
    query,
    setQuery,
    filterDept,
    setFilterDept,
    filterRating,
    setFilterRating,
    filteredUsers,
  }
}
