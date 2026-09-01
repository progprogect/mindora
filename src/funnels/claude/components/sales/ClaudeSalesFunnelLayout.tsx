import type { ReactNode } from 'react'
import { ChevronLeft } from 'lucide-react'
import BrandWordmark from '@/shared/components/BrandWordmark'

interface ClaudeSalesFunnelLayoutProps {
  step: number
  totalSteps?: number
  onBack?: () => void
  children: ReactNode
}

/**
 * Port of the sales-funnel shell inlined in production's `Ce()` orchestrator
 * (`claude-ai-certification-*.js`, sales branch) — sticky header with back
 * chevron, BrandWordmark (production doesn't use the
 * image Logo here, unlike the quiz phase), and a 6-dot step indicator.
 */
export default function ClaudeSalesFunnelLayout({
  step,
  totalSteps = 6,
  onBack,
  children,
}: ClaudeSalesFunnelLayoutProps) {
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
              <ChevronLeft className="size-5" strokeWidth={2.5} />
            </button>
          ) : (
            <div className="w-9" />
          )}
          <span className="flex-1 text-center">
            <BrandWordmark size="sm" />
          </span>
          <div className="flex gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all ${
                  i === step ? 'h-2 w-4 bg-sw-blue' : i < step ? 'h-2 w-2 bg-sw-blue/40' : 'h-2 w-2 bg-sw-border'
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
