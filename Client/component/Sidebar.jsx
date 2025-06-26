'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  Bookmark,
  BarChart2,
  Menu,
  X,
} from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
    { href: '/analytics', label: 'Analytics', icon: BarChart2 },
  ]

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="bg-white p-2 rounded-md shadow-md border"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <aside
        className={`fixed md:static z-40 top-0 left-0 h-full bg-gray-100 text-[#1E293B] p-6 shadow-md border-r border-gray-200 transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64`}
      >
        <div className="flex flex-col gap-6 mt-10 md:mt-0">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive
                    ? 'bg-[#2563eb] text-white shadow'
                    : 'hover:bg-gray-200 text-[#1E293B]'
                }`}
              >
                <Icon
                  size={20}
                  className={isActive ? 'text-white' : 'text-[#475569]'}
                />
                <span>{label}</span>
              </Link>
            )
          })}
        </div>
      </aside>
    </>
  )
}
