'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Bookmark,
  BarChart2,
} from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
    { href: '/analytics', label: 'Analytics', icon: BarChart2 },
  ]

  return (
    <aside className="w-full md:w-64 bg-[#000000] p-6 flex flex-row md:flex-col justify-around md:justify-start gap-6 shadow-lg min-h-screen">
      

      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href

        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              isActive
                ? 'bg-[#4F0DCE]'
                : 'hover:bg-[#5767D0]'
            }`}
            style={{ color: 'white' }} // 👈 forces label text to white
          >
            <Icon size={20} color="white" /> {/* 👈 forces icon color to white */}
            <span style={{ color: 'white' }}>{label}</span> {/* 👈 double safety */}
          </Link>
        )
      })}
    </aside>
  )
}
