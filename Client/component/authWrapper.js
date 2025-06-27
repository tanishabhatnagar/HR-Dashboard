// components/withAuth.js
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { checkAuth } from '../Utils/checkAuth'

export default function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const router = useRouter()

    useEffect(() => {
      if (!checkAuth()) {
        router.push('/login')
      }
    }, [])

    return <Component {...props} />
  }
}
