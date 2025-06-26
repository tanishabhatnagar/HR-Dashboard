'use client'

import { useState, useEffect } from 'react'
import RatingStars from './RatingStars'
import { useRouter } from 'next/navigation'
import { Bookmark, BookmarkCheck, CheckCircle } from 'lucide-react'

export default function UserCard({ user, onBookmarkChange }) {
  const router = useRouter()
  const [bookmarked, setBookmarked] = useState(false)
  const [promoted, setPromoted] = useState(false)

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedUsers') || '[]')
    setBookmarked(bookmarks.some((u) => u.id === user.id))

    const promotedUsers = JSON.parse(localStorage.getItem('promotedUsers') || '[]')
    setPromoted(promotedUsers.includes(user.id))
  }, [user.id])

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedUsers') || '[]')
    let updatedBookmarks
    if (bookmarked) {
      updatedBookmarks = bookmarks.filter((u) => u.id !== user.id)
    } else {
      updatedBookmarks = [...bookmarks, user]
    }
    localStorage.setItem('bookmarkedUsers', JSON.stringify(updatedBookmarks))
    setBookmarked(!bookmarked)
    if (onBookmarkChange) onBookmarkChange(updatedBookmarks)
  }

  const togglePromote = () => {
    let promotedUsers = JSON.parse(localStorage.getItem('promotedUsers') || '[]')
    if (promoted) {
      promotedUsers = promotedUsers.filter(id => id !== user.id)
    } else {
      promotedUsers.push(user.id)
    }
    localStorage.setItem('promotedUsers', JSON.stringify(promotedUsers))
    setPromoted(!promoted)
  }

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-5 flex flex-col gap-4 border border-gray-200 dark:border-gray-700 rounded-xl transition shadow hover:shadow-md">
      <div className="flex items-center gap-4">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.firstName + user.lastName + user.id)}`}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-14 h-14 rounded-full object-cover border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
        />

        <div>
          <h2 className="text-lg font-semibold">{user.firstName} {user.lastName} ({user.age})</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
          <span className="inline-block mt-1 text-xs font-medium bg-[#D6ECFF] dark:bg-blue-900 text-[#1D4ED8] dark:text-blue-300 px-3 py-1 rounded-full">
            {user.department}
          </span>
        </div>
      </div>

      <RatingStars rating={user.rating} />
      <div className="flex flex-wrap justify-between items-center mt-2">
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/employee/${user.id}`)}
            className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            View
          </button>

          <button
            onClick={togglePromote}
            className={`px-4 py-2 rounded-lg text-sm flex items-center gap-1 transition ${
              promoted
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {promoted ? <><CheckCircle size={16} /> Promoted</> : 'Promote'}
          </button>
        </div>

        <button
          onClick={toggleBookmark}
          className={`p-2 rounded-full transition ${
            bookmarked
              ? 'bg-gray-700 hover:bg-gray-600 text-white'
              : 'bg-indigo-500 hover:bg-indigo-600 text-white'
          }`}
        >
          {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
      </div>
    </div>
  )
}
