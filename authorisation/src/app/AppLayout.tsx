import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import AppNavFooter from '@/app/AppNavFooter'
import WiseFab from '@/app/WiseFab'
import { initialsFromName, PLAN_TIERS } from '@/app/mockUser'
import { useCurrentUser, useSession } from '@/auth/session'

export default function AppLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuPath, setMenuPath] = useState(pathname)
  if (menuPath !== pathname) {
    setMenuPath(pathname)
    if (menuOpen) setMenuOpen(false)
  }
  const { signOut } = useSession()
  const user = useCurrentUser()
  const hideChrome =
    pathname.startsWith('/app/wise') ||
    pathname === '/app/planners' ||
    pathname.startsWith('/app/certificate/') ||
    /^\/app\/courses\/[^/]+\/[^/]+$/.test(pathname)
  const showWordmark = pathname === '/app/dashboard'
  const name = user?.name || 'Friend'
  const initials = initialsFromName(name)
  const tierKey = user?.planTier && user.planTier in PLAN_TIERS ? (user.planTier as keyof typeof PLAN_TIERS) : 'week4'
  const plan = PLAN_TIERS[tierKey]

  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [menuOpen])

  const handleSignOut = async () => {
    setMenuOpen(false)
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <>
      <div
        className="min-h-screen overflow-x-hidden"
        style={{ backgroundColor: 'hsl(var(--sw-grey-light))' }}
      >
        {hideChrome || !showWordmark ? null : (
          <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-sw-grey-border">
            <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
              <span className="font-extrabold text-base text-sw-dark tracking-tight">
                SuccessWise<span className="text-sw-blue">.ai</span>
              </span>
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((open) => !open)}
                  className="w-9 h-9 rounded-full bg-sw-blue text-white font-bold text-sm flex items-center justify-center shadow-sm active:scale-95 transition-transform"
                  aria-label="Open profile menu"
                >
                  {initials}
                </button>
                {menuOpen ? (
                  <div className="absolute right-0 top-11 bg-white rounded-xl shadow-xl border border-sw-grey-border py-1 w-44 z-50">
                    <div className="px-3 py-2.5 border-b border-sw-grey-border">
                      <p className="text-xs font-bold text-sw-dark truncate">{name}</p>
                      <p className="text-xs text-sw-grey mt-0.5">{plan.label}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => void handleSignOut()}
                      className="w-full text-left px-3 py-2.5 text-sm font-semibold text-sw-coral hover:bg-sw-grey-light transition-colors rounded-b-xl"
                    >
                      Sign out
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </header>
        )}
        <Outlet />
      </div>
      {hideChrome ? null : <AppNavFooter />}
      <WiseFab />
    </>
  )
}
