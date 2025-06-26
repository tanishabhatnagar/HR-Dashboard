import { NextResponse } from 'next/server'

export function middleware(request) {
  const isAuth = request.cookies.get('auth')?.value === 'true'
  const pathname = request.nextUrl.pathname

  // Redirect unauthenticated users to /login
  if (!isAuth && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect logged-in users away from /login
  if (isAuth && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*'],
}
