'use client'

import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#121212] text-black dark:text-white transition-all">
      <div className="text-center space-y-4">
        <Loader2 className="animate-spin mx-auto text-[#2563eb] dark:text-pink-500" size={48} />
        <p className="text-lg font-semibold">Loading  users...</p>
      </div>
    </div>
  )
}
