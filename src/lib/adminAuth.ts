const ADMIN_SESSION_KEY = 'admin_session'
// ⚠️ SECURITY: Admin password MUST be set via VITE_ADMIN_PASSWORD environment variable
// Never commit the actual password to the repository!
// Create a .env file in the root directory with: VITE_ADMIN_PASSWORD=your_password_here
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || ''

export const checkAdminPassword = (password: string): boolean => {
  // Check if password is configured
  if (!ADMIN_PASSWORD || ADMIN_PASSWORD.trim().length === 0) {
    console.error('[AdminAuth] ⚠️ ADMIN_PASSWORD not configured! Set VITE_ADMIN_PASSWORD in .env file.');
    return false;
  }
  
  // Trim whitespace and compare
  const trimmedPassword = password.trim();
  const trimmedAdminPassword = ADMIN_PASSWORD.trim();
  const isMatch = trimmedPassword === trimmedAdminPassword;
  
  console.log('[AdminAuth] Password check:', {
    providedLength: trimmedPassword.length,
    expectedLength: trimmedAdminPassword.length,
    match: isMatch
  });
  
  return isMatch;
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

