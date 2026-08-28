import { Link, useLocation } from 'react-router-dom'

export default function WiseFab() {
  const { pathname } = useLocation()
  if (pathname === '/app/wise' || /^\/app\/courses\/[^/]+\/[^/]+$/.test(pathname)) return null

  return (
    <Link
      to="/app/wise"
      className="fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full shadow-lg shadow-[hsl(var(--sw-blue)/0.3)] flex items-center justify-center transition-transform active:scale-95 hover:scale-105 overflow-hidden bg-white border-2 border-sw-blue/20"
      aria-label="Ask Wise — your AI coach"
    >
      <img src="/assets/wise.png" alt="Wise" className="w-full h-full object-cover" />
    </Link>
  )
}
