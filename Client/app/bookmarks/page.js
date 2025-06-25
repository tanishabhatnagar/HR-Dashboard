
// app/bookmarks/page.js
'use client'
import { useEffect, useState } from 'react'
import UserCard from '@/component/UserCard'

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
    <div>
      <h1 className="text-2xl font-bold mb-4">Bookmarked Employees</h1>
      {bookmarkedUsers.length === 0 ? (
        <p className="text-gray-600 text-center mt-10">📄 Start bookmarking your favorite employees!</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookmarkedUsers.map((user) => (
            <UserCard key={user.id} user={user} onBookmarkChange={handleBookmarkChange} />
          ))}
        </div>
      )}
    </div>
  )
}
