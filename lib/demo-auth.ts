export const AUTH_STORAGE_KEY = "hydrosync-client-user"

export const DEMO_CREDENTIALS = {
  email: "demo@hydrosync.app",
  password: "HydroSync2026!",
} as const

export interface DemoSessionUser {
  id: string
  name: string
  email: string
  phone: string
  address: string
  token: string
  refresh: string
  loggedIn: boolean
}

export function createDemoSession(email: string = DEMO_CREDENTIALS.email): DemoSessionUser {
  return {
    id: "demo-user",
    name: "Demo Customer",
    email,
    phone: "+1 (555) 010-2026",
    address: "123 Demo Street, Springfield, IL 62701",
    token: "demo-access-token",
    refresh: "demo-refresh-token",
    loggedIn: true,
  }
}

export function getStoredSession(): DemoSessionUser | null {
  if (typeof window === "undefined") {
    return null
  }

  const rawSession = localStorage.getItem(AUTH_STORAGE_KEY)
  if (!rawSession) {
    return null
  }

  try {
    return JSON.parse(rawSession) as DemoSessionUser
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

export function storeDemoSession(email: string = DEMO_CREDENTIALS.email): DemoSessionUser {
  const session = createDemoSession(email)
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
  return session
}

export function clearStoredSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }
}

export function isDemoCredential(email: string, password: string) {
  return email.trim().toLowerCase() === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password
}