import './globals.css'
import Navbar from '@/component/Navbar'
import Sidebar from '@/component/Sidebar'

export const metadata = {
  title: 'HR Dashboard',
  description: 'Track and manage employee performance',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black">
        <div className="flex h-screen">
          {/* Sidebar on the left, full height */}
          <Sidebar />

          {/* Main content area with Navbar and children */}
          <div className="flex flex-col flex-1">
            <Navbar /> {/* Navbar now appears at the top, after sidebar */}
            <main className="flex-1 bg-[#f9fafb]  overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
