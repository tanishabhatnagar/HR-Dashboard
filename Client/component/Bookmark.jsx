// 'use client'

// import { Bookmark, FileText } from 'lucide-react'
// import { useBookmarks } from '../../hooks/useBookmarks'
// import UserCard from './../../component/Usercard'

// export default function BookmarksPage() {
//   const { bookmarks, removeBookmark } = useBookmarks()

//   const handleBookmarkChange = (updatedUser) => {
//     removeBookmark(updatedUser.id)
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="flex items-center gap-2 mb-6">
//         <Bookmark className="h-7 w-7 text-[#2563eb]" />
//         <h1 className="text-3xl font-bold text-[#2563eb]">
//           Bookmarked Employees
//         </h1>
//       </div>

//       {bookmarks.length === 0 ? (
//         <div className="bg-blue-50 border border-blue-200 text-blue-700 text-center py-12 rounded-xl shadow-sm flex flex-col items-center gap-4">
//           <FileText className="h-10 w-10" />
//           <p>
//             You haven’t bookmarked anyone yet. Browse the dashboard and tap the bookmark icon to save your favorite employees.
//           </p>
//         </div>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {bookmarks.map((user) => (
//             <UserCard
//               key={user.id}
//               user={user}
//               onBookmarkChange={handleBookmarkChange}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }
