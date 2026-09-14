import { Link, useLocation } from 'react-router-dom'
import { COACH_AVATAR, COACH_NAME } from '@/shared/coach'

export default function MindoraFab() {
  const { pathname } = useLocation()
  if (
    pathname === '/app/mindora' ||
    pathname.startsWith('/app/mindora/unlock') ||
    pathname === '/app/wise' ||
    pathname.startsWith('/app/wise/unlock')
  ) {
    return null
  }

  return (
    <Link
      to="/app/mindora"
      className="fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full shadow-lg shadow-[hsl(var(--sw-blue)/0.3)] flex items-center justify-center transition-transform active:scale-95 hover:scale-105 overflow-hidden bg-white border-2 border-sw-blue/20"
      aria-label="Ask Mindora — your AI coach"
    >
      <img src={COACH_AVATAR} alt={COACH_NAME} className="w-full h-full object-contain p-1.5" />
    </Link>
  )
}
