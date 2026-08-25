import type { ReactNode } from 'react'

interface SalesDotsLayoutProps {
  step: number
  totalSteps?: number
  onBack?: () => void
  children: ReactNode
}

/** PPT / M365 sales chrome: wordmark + 6-dot indicator (Claude-style). */
export default function SalesDotsLayout({
  step,
  totalSteps = 6,
  onBack,
  children,
}: SalesDotsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-sw-white">
      <header className="sticky top-0 z-50 border-b border-sw-grey-border bg-sw-white">
        <div className="mx-auto flex h-14 max-w-lg items-center px-4">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="-ml-2 p-2 text-sw-dark transition-colors hover:text-sw-blue"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <div className="w-9" />
          )}
          <span className="flex-1 text-center text-base font-bold tracking-tight text-sw-dark">
            SuccessWise<span className="text-sw-blue">.ai</span>
          </span>
          <div className="flex gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all ${
                  i === step ? 'h-2 w-4 bg-sw-blue' : i < step ? 'h-2 w-2 bg-sw-blue/40' : 'h-2 w-2 bg-sw-grey-border'
                }`}
              />
            ))}
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  )
}
