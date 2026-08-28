import type { ReactNode } from 'react'
import { useSession } from '@/auth/session'

export function useAuthGate() {
  const { isLoading, isAuthenticated } = useSession()
  return { isLoading, isAuthenticated }
}

export function AuthLoading({ children }: { children: ReactNode }) {
  const { isLoading } = useAuthGate()
  return isLoading ? <>{children}</> : null
}

export function Unauthenticated({ children }: { children: ReactNode }) {
  const { isLoading, isAuthenticated } = useAuthGate()
  return isLoading || isAuthenticated ? null : <>{children}</>
}

export function Authenticated({ children }: { children: ReactNode }) {
  const { isLoading, isAuthenticated } = useAuthGate()
  return isLoading || !isAuthenticated ? null : <>{children}</>
}
