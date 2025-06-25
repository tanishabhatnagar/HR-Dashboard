'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Bookmark, BarChart2 } from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { href: '/bookmarks', label: 'Bookmarks', icon: <Bookmark size={20} /> },
    { href: '/analytics', label: 'Analytics', icon: <BarChart2 size={20} /> },
  ]

  return (
    <aside className="w-full md:w-64 bg-[#fef2f4] text-black p-4 flex flex-row md:flex-col justify-around md:justify-start gap-4 md:gap-6 shadow-md">
      {navItems.map(({ href, label, icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            pathname === href
              ? 'bg-[#f70776] text-white'
              : 'hover:bg-[#fcd3e1] hover:text-[#f70776]'
          }`}
        >
          {icon}
          <span className="text-sm font-medium">{label}</span>
        </Link>
      ))}
    </aside>
  )
}
