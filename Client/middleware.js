import { NextResponse } from 'next/server'

export function middleware(request) {
  const isAuth = request.cookies.get('auth')?.value === 'true'
  const pathname = request.nextUrl.pathname

  if (!isAuth && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuth && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*'],
}
