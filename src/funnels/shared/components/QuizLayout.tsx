import type { ReactNode } from 'react'
import Logo from '@/funnels/shared/components/Logo'
import QuizStickyCta from '@/funnels/shared/components/QuizStickyCta'

interface QuizLayoutProps {
  children: ReactNode
  onBack?: () => void
  currentStep?: number
  totalSteps?: number
  footer?: ReactNode
  contentClassName?: string
  pageClassName?: string
  logoVariant?: 'image' | 'text'
}

export default function QuizLayout({
  children,
  onBack,
  currentStep,
  totalSteps,
  footer,
  contentClassName,
  pageClassName,
  logoVariant,
}: QuizLayoutProps) {
  const showProgress = typeof currentStep === 'number' && typeof totalSteps === 'number'
  const hideSideSlots = !onBack && !showProgress
  const progressWidth = showProgress
    ? Math.min(100, Math.max(0, (((currentStep ?? 1) - 1) / (totalSteps ?? 1)) * 100))
    : 0

  return (
    <div className={`flex min-h-dvh flex-col ${pageClassName || 'bg-sw-white'}`}>
      <header className="sticky top-0 z-50 border-b border-sw-grey-border bg-white">
        <div className="mx-auto flex h-14 max-w-lg items-center gap-3 px-4">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-sw-dark transition-colors hover:bg-sw-grey-light"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M19 12H5M12 5l-7 7 7 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : hideSideSlots ? null : (
            <div className="size-8 shrink-0" />
          )}

          <div className="flex flex-1 items-center justify-center">
            <Logo variant={logoVariant} />
          </div>

          {hideSideSlots ? null : (
            <div className="flex w-8 shrink-0 justify-end text-xs font-semibold text-sw-grey">
              {showProgress ? `${currentStep} / ${totalSteps}` : null}
            </div>
          )}
        </div>
        {showProgress ? (
          <div className="h-1 w-full bg-sw-grey-light">
            <div className="h-full bg-sw-blue transition-all duration-500 ease-out" style={{ width: `${progressWidth}%` }} />
          </div>
        ) : null}
      </header>

      <main className={`mx-auto flex w-full max-w-lg flex-1 flex-col ${contentClassName ?? 'px-4 py-6'}`}>
        {children}
      </main>

      {footer ? <QuizStickyCta>{footer}</QuizStickyCta> : null}
    </div>
  )
}
