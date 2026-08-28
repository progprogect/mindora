import { Link } from 'react-router-dom'

export default function WiseStubPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center gap-2 px-4 h-14 border-b border-sw-grey-border sticky top-0 z-10 bg-white">
        <Link
          to="/app/dashboard"
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-sw-grey-light/50 transition-colors"
          aria-label="Back to dashboard"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
        <div className="flex items-center gap-2.5">
          <img src="/assets/wise.png" alt="Wise" className="w-9 h-9 rounded-full object-cover" />
          <div>
            <h1 className="text-base font-bold text-sw-dark leading-tight">{title}</h1>
            <p className="text-xs text-sw-grey">Your AI Coach</p>
          </div>
        </div>
      </div>
      <main className="flex-1 px-4 pt-8" />
    </div>
  )
}
