'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  LayoutDashboard,
  Bookmark,
  BarChart2,
  Menu,
  X,
  UserPlus,
} from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    const password = localStorage.getItem('userPassword')
    if (email && password) setIsLoggedIn(true)
  }, [])

  const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
    { href: '/analytics', label: 'Analytics', icon: BarChart2 },
    { href: '/create-user', label: 'Create User', icon: UserPlus },
  ]

  const handleNavClick = (href) => {
    if (!isLoggedIn) {
      router.push('/login')
    } else {
      setOpen(false)
      router.push(href)
    }
  }

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="bg-white dark:bg-gray-800 p-2 rounded-md shadow-md border border-gray-300 dark:border-gray-700"
        >
          {open ? (
            <X size={20} className="text-black dark:text-white" />
          ) : (
            <Menu size={20} className="text-black dark:text-white" />
          )}
        </button>
      </div>

      <aside
        className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 shadow-md border-r border-gray-300 dark:border-gray-700 transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="flex flex-col gap-6 mt-10 md:mt-0">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href

            return (
              <button
                key={href}
                onClick={() => handleNavClick(href)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors w-full text-left
                  ${
                    isActive
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800'
                  }
                `}
              >
                <Icon
                  size={20}
                  className={
                    isActive
                      ? 'text-white'
                      : 'text-gray-600 dark:text-gray-400'
                  }
                />
                <span>{label}</span>
              </button>
            )
          })}
        </div>
      </aside>
    </>
  )
}
