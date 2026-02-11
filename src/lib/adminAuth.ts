// Admin Authentication Module
const ADMIN_SESSION_KEY = 'admin_session';

export interface AdminSession {
  isAuthenticated: boolean;
  username: string;
  loginTime: number;
}

export function setAdminSession(username: string): void {
  const session: AdminSession = {
    isAuthenticated: true,
    username,
    loginTime: Date.now(),
  };
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
}

export function getAdminSession(): AdminSession | null {
  const sessionStr = localStorage.getItem(ADMIN_SESSION_KEY);
  if (!sessionStr) return null;
  
  try {
    const session = JSON.parse(sessionStr) as AdminSession;
    // Check if session is still valid (24 hours)
    if (Date.now() - session.loginTime > 24 * 60 * 60 * 1000) {
      clearAdminSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function isAdminAuthenticated(): boolean {
  const session = getAdminSession();
  return session?.isAuthenticated ?? false;
}

export function clearAdminSession(): void {
  localStorage.removeItem(ADMIN_SESSION_KEY);
}

export function loginAdmin(password: string): boolean {
  // Simple password check - in production, this should be handled by a backend API
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
  
  if (password === adminPassword) {
    setAdminSession('admin');
    return true;
  }
  
  return false;
}
