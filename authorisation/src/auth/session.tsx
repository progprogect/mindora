import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { fetchCurrentUser, signOut as apiSignOut, type CurrentUser } from '@/lib/api'

type SessionValue = {
  isLoading: boolean
  isAuthenticated: boolean
  user: CurrentUser | null
  refresh: (opts?: { silent?: boolean }) => Promise<void>
  signOut: () => Promise<void>
}

const SessionContext = createContext<SessionValue | null>(null)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refresh = useCallback(async (opts?: { silent?: boolean }) => {
    if (!opts?.silent) setIsLoading(true)
    try {
      setUser(await fetchCurrentUser())
    } catch (error) {
      console.warn('[api] me failed', error)
      setUser(null)
    } finally {
      if (!opts?.silent) setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const signOut = useCallback(async () => {
    try {
      await apiSignOut()
    } catch (error) {
      console.warn('[api] signout failed', error)
    }
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      isLoading,
      isAuthenticated: Boolean(user),
      user,
      refresh,
      signOut,
    }),
    [isLoading, user, refresh, signOut],
  )

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession must be used within SessionProvider')
  return ctx
}

/** Convex-shaped: `undefined` while loading, `null` when signed out. */
export function useCurrentUser() {
  const { user, isLoading } = useSession()
  if (isLoading) return undefined
  return user
}
