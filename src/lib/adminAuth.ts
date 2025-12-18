const ADMIN_SESSION_KEY = 'admin_session'
// ⚠️ SECURITY: Admin password should be set via VITE_ADMIN_PASSWORD environment variable
// Never commit the actual password to the repository!
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || ''

export const checkAdminPassword = (password: string): boolean => {
  return password === ADMIN_PASSWORD
}

export const setAdminSession = (): void => {
  localStorage.setItem(ADMIN_SESSION_KEY, 'true')
}

export const clearAdminSession = (): void => {
  localStorage.removeItem(ADMIN_SESSION_KEY)
}

export const isAdminAuthenticated = (): boolean => {
  return localStorage.getItem(ADMIN_SESSION_KEY) === 'true'
}

