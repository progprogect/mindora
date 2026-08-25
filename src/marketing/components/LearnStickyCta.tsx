import { Link } from 'react-router-dom'
import { ROUTES } from '@/marketing/data/nav'

export default function LearnStickyCta({
  show,
  label,
  href = ROUTES.quiz28,
  backgroundColor,
  className,
}: {
  show: boolean
  label: string
  href?: string
  backgroundColor?: string
  className?: string
}) {
  return (
    <div
      className={`fixed right-0 bottom-0 left-0 z-50 transition-transform duration-300 sm:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{
        background:
          'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.92) 40%, white 65%)',
      }}
    >
      <div className="px-4 pt-3 pb-3">
        <Link
          to={href}
          className={`flex items-center justify-center gap-2 rounded-full py-4 text-sm font-extrabold text-white shadow-lg transition-all active:scale-[0.98] ${className ?? ''}`}
          style={backgroundColor ? { backgroundColor } : undefined}
        >
          {label}
        </Link>
      </div>
      <div
        style={{
          paddingTop: '56px',
          paddingBottom: 'env(safe-area-inset-bottom)',
          backgroundColor: 'white',
        }}
      />
    </div>
  )
}
