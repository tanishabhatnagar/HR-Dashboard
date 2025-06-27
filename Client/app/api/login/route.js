
import { NextResponse } from 'next/server'

export async function POST(req) {
  const body = await req.json()
  const { email, password } = body

  if (email && password) {
    const res = NextResponse.json({ success: true })
    res.cookies.set('auth', 'true', {
  path: '/', 
  maxAge: 60 * 60 * 24,
})

    return res
  }

  return NextResponse.json({ success: false }, { status: 401 })
}
