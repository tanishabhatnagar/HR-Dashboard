import './globals.css'
import Navbar from '../component/Navbar'
import Sidebar from '../component/Sidebar'

export const metadata = {
  title: 'HR Dashboard',
  description: 'Track and manage employee performance',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Navbar />
            <main className="flex-1 bg-[#f9fafb] dark:bg-[#1e1e1e] overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
