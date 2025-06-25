import './globals.css'
import Navbar from '@/component/Navbar'
import Sidebar from '@/component/Sidebar'
import { BookmarkProvider } from '@/context/BookmarkContext'

export const metadata = {
  title: 'HR Dashboard',
  description: 'Track and manage employee performance',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col md:flex-row min-h-screen bg-fourth text-white">
        <BookmarkProvider>
          <Sidebar />
          <div className="flex-1">
            <Navbar />
            <main className="p-4">{children}</main>
          </div>
        </BookmarkProvider>
      </body>
    </html>
  )
}
