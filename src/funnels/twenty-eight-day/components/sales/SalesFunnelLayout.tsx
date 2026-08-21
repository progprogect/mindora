import type { ReactNode } from 'react'
import { ChevronLeft } from 'lucide-react'
import Logo from '@/funnels/twenty-eight-day/components/Logo'

interface SalesFunnelLayoutProps {
  step: number
  totalSteps?: number
  onBack?: () => void
  children: ReactNode
}

export default function SalesFunnelLayout({ step, totalSteps = 6, onBack, children }: SalesFunnelLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-sw-white">
      <header className="sticky top-0 z-20 border-b border-sw-border bg-sw-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-xl items-center gap-3 px-4">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="flex size-8 shrink-0 items-center justify-center rounded-full text-sw-grey transition hover:bg-sw-grey-light hover:text-sw-dark"
            >
              <ChevronLeft className="size-5" />
            </button>
          ) : (
            <div className="size-8 shrink-0" />
          )}

          <div className="flex flex-1 items-center justify-center">
            <Logo />
          </div>

          <div className="w-8 shrink-0" />
        </div>

        <div className="flex items-center justify-center gap-1.5 pb-2.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? 'w-6 bg-sw-blue' : i < step ? 'w-1.5 bg-sw-blue/50' : 'w-1.5 bg-sw-grey-light'
              }`}
            />
          ))}
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-5 py-6">{children}</main>
    </div>
  )
}
