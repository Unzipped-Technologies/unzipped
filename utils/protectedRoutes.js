export const protectedRoutes = [
  'dashboard',
  '/dashboard/tasklist',
  '/dashboard/inbox',
  '/dashboard/projects',
  'dashboard/list'
]
export const isProtected = route => protectedRoutes.includes(route)
