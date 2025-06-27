// utils/auth.js
export function checkAuth() {
  if (typeof window === 'undefined') return false

  const email = localStorage.getItem('userEmail')
  const password = localStorage.getItem('userPassword')

  return !!email && !!password
}
