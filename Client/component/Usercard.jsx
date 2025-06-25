
// components/UserCard.js
import { useState, useEffect } from 'react'
import RatingStars from './RatingStars'
import { useRouter } from 'next/navigation'

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
    <div className="bg-white text-black p-4 rounded-2xl shadow-lg flex flex-col gap-3 transition transform hover:scale-[1.02] border border-gray-200">
      <div>
        <h2 className="text-lg font-bold">{user.firstName} {user.lastName}</h2>
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-500">Age: {user.age}</p>
        <p className="text-sm">Department: <span className="text-[#f70776]">{user.department}</span></p>
      </div>

      <div>
        <RatingStars rating={user.rating} />
      </div>

      <div className="flex gap-2 mt-2 flex-wrap">
        <button onClick={() => router.push(`/employee/${user.id}`)} className="bg-[#f70776] text-white px-4 py-2 rounded-xl hover:bg-[#c3195d] transition text-sm">View</button>
        <button onClick={toggleBookmark} className={`px-4 py-2 rounded-xl text-white text-sm transition ${bookmarked ? 'bg-gray-500 hover:bg-gray-600' : 'bg-[#c3195d] hover:bg-[#f70776]'}`}>{bookmarked ? 'Bookmarked' : 'Bookmark'}</button>
        <button onClick={() => alert('Promoted!')} className="bg-gray-200 text-black px-4 py-2 rounded-xl text-sm hover:bg-[#f70776] transition">Promote</button>
      </div>
    </div>
  )
}

