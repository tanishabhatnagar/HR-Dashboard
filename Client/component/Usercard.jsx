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
    <div className="bg-white text-black p-5 flex flex-col gap-4 border border-gray-200 rounded-xl transition shadow hover:shadow-md">
      {/* Avatar and Info */}
      <div className="flex items-center gap-4">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.firstName + user.lastName + user.id)}`}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-14 h-14 rounded-full object-cover border border-gray-300 bg-white"
        />

        <div>
          <h2 className="text-lg font-semibold">{user.firstName} {user.lastName} ({user.age})</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
          <span className="inline-block mt-1 text-xs font-medium bg-[#D6ECFF] text-[#1D4ED8] px-3 py-1 rounded-full">
            {user.department}
          </span>
        </div>
      </div>

      {/* Rating */}
      <RatingStars rating={user.rating} />

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-between items-center mt-2">
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/employee/${user.id}`)}
            className="bg-gray-200 text-black px-4 py-2 rounded-lg text-sm hover:bg-gray-300 transition"
          >
            View
          </button>

          <button
            onClick={togglePromote}
            className={`px-4 py-2 rounded-lg text-sm flex items-center gap-1 transition ${
              promoted
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-[#2563eb] text-white hover:bg-[#5B46D3]'
            }`}
          >
            {promoted ? <><CheckCircle size={16} /> Promoted</> : 'Promote'}
          </button>
        </div>

        <button
          onClick={toggleBookmark}
          className={`p-2 rounded-full text-white transition ${
            bookmarked
              ? 'bg-[#373737] hover:bg-[#6E6E6E]'
              : 'bg-[#7765DA] hover:bg-[#5A50B8]'
          }`}
        >
          {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
      </div>
    </div>
  )
}
