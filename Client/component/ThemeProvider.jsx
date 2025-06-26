'use client'

import { useEffect } from 'react'

export default function ToggleDarkMode() {
  useEffect(() => {
    document.documentElement.classList.add('dark') 
  }, [])

  return null
}
