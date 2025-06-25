'use client'
import { useEffect, useState } from 'react'
import UserCard from './../../component/Usercard'

export default function BookmarksPage() {
  const [bookmarkedUsers, setBookmarkedUsers] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookmarkedUsers') || '[]')
    setBookmarkedUsers(stored)
  }, [])

  const handleBookmarkChange = (updated) => {
    setBookmarkedUsers(updated)
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#4F0DCE] mb-6">
        ⭐ Bookmarked Employees
      </h1>

      {bookmarkedUsers.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 text-center py-12 rounded-xl shadow-sm">
          📄 You haven’t bookmarked anyone yet. Browse the dashboard and tap the ⭐ to save your favorite employees.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bookmarkedUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onBookmarkChange={handleBookmarkChange}
            />
          ))}
        </div>
      )}
    </div>
  )
}
