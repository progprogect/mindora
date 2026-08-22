import type { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import Logo from '@/funnels/claude/components/Logo'

interface ClaudeQuizLayoutProps {
  children: ReactNode
  onBack?: () => void
  currentStep?: number
  totalSteps?: number
  showProgress?: boolean
  bgColor?: string
}

/**
 * Port of the shared quiz shell (`Q` export in `meta-quiz-tracking-*.js`):
 * sticky header with back button, centered logo, and a progress bar shown
 * only on question screens.
 */
export default function ClaudeQuizLayout({
  children,
  onBack,
  currentStep,
  totalSteps,
  showProgress = false,
  bgColor,
}: ClaudeQuizLayoutProps) {
  const hasProgress = showProgress && typeof currentStep === 'number' && typeof totalSteps === 'number'
  const progressPercent = hasProgress ? Math.round(((currentStep! - 1) / totalSteps!) * 100) : 0

  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden" style={{ background: bgColor ?? 'white' }}>
      <header className="sticky top-0 z-50 border-b border-sw-grey-border bg-sw-white">
        <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="flex size-8 items-center justify-center rounded-full text-sw-dark transition-colors hover:bg-sw-grey-light"
            >
              <ArrowLeft className="size-[18px]" strokeWidth={2.5} />
            </button>
          ) : (
            <span className="size-8" />
          )}
          <Logo />
          {hasProgress ? (
            <span className="text-xs font-semibold text-sw-grey">
              {currentStep} / {totalSteps}
            </span>
          ) : (
            <span className="size-8" />
          )}
        </div>
        {hasProgress ? (
          <div className="h-1 bg-sw-grey-light">
            <div
              className="h-full bg-sw-blue transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        ) : null}
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  )
}
