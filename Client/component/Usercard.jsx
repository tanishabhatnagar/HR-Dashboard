'use client'
import { useState, useEffect } from 'react'
import RatingStars from './RatingStars'
import { useRouter } from 'next/navigation'
import { Bookmark, BookmarkCheck } from 'lucide-react' 

export default function UserCard({ user, onBookmarkChange }) {
  const router = useRouter()
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedUsers') || '[]')
    setBookmarked(bookmarks.some((u) => u.id === user.id))
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

  return (
    <div className="bg-white text-black p-5 flex flex-col gap-4 hover:bg-gray-100 border border-gray-200 rounded-xl transition shadow-sm">
      <div>
        <h2 className="text-lg font-bold">{user.firstName} {user.lastName} ({user.age})</h2>
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-sm bg-[#F2F2F2] text-[#4F0DCE] rounded-full p-1 px-4 w-fit mt-2">
          {user.department}
        </p>
      </div>

      <RatingStars rating={user.rating} />

      <div className="flex flex-wrap gap-3 justify-between items-center">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => router.push(`/employee/${user.id}`)}
            className="bg-gray-200 text-black px-4 py-2 rounded-xl text-sm hover:bg-gray-300 transition"
          >
            View
          </button>

          <button
            onClick={() => alert('Promoted!')}
            className="bg-[#4F0DCE] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#5767D0] transition"
          >
            Promote
          </button>
        </div>

        <button
          onClick={toggleBookmark}
          className={`p-2 rounded-full text-white transition ${
            bookmarked
              ? 'bg-[#373737] hover:bg-[#6E6E6E]'
              : 'bg-[#7765DA] hover:bg-[#5767D0]'
          }`}
        >
          {bookmarked ? <BookmarkCheck /> : <Bookmark />}
        </button>
      </div>
    </div>
  )
}
