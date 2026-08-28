import { Link, useLocation } from 'react-router-dom'
import { LEARN_PATHS } from '@/app/mockUser'
import { useCurrentUser } from '@/auth/session'

const LEARN_ACTIVE = [
  '/app/ai-and-technology',
  '/app/success-mindset',
  '/app/career',
  '/app/business',
  '/app/health',
  '/app/financial-wellbeing',
]

function tabClass(active: boolean) {
  return `flex flex-col items-center justify-center py-2.5 gap-1 ${active ? 'text-sw-blue' : 'text-sw-grey'}`
}

function labelClass(active: boolean) {
  return `text-[10px] ${active ? 'font-bold' : 'font-semibold'}`
}

export default function AppNavFooter() {
  const { pathname } = useLocation()
  const user = useCurrentUser()
  const focus = user?.focusCategory && user.focusCategory in LEARN_PATHS ? user.focusCategory : 'ai'
  const learnHref = LEARN_PATHS[focus] || '/app/ai-and-technology'
  const homeActive = pathname === '/app/dashboard'
  const learnActive =
    pathname.startsWith('/learn') ||
    pathname.startsWith('/app/courses') ||
    LEARN_ACTIVE.includes(pathname)
  const progressActive = pathname === '/app/progress'
  const profileActive = pathname === '/app/profile'

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-sw-grey-border"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="max-w-2xl mx-auto flex">
        <Link to="/app/dashboard" className="flex-1">
          <div className={tabClass(homeActive)}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className={labelClass(homeActive)}>Home</span>
          </div>
        </Link>
        <Link to={learnHref} className="flex-1">
          <div className={tabClass(learnActive)}>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span className={labelClass(learnActive)}>Learn</span>
          </div>
        </Link>
        <Link to="/app/progress" className="flex-1">
          <div className={tabClass(progressActive)}>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span className={labelClass(progressActive)}>Progress</span>
          </div>
        </Link>
        <Link to="/app/profile" className="flex-1">
          <div className={tabClass(profileActive)}>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className={labelClass(profileActive)}>Profile</span>
          </div>
        </Link>
      </div>
    </nav>
  )
}
