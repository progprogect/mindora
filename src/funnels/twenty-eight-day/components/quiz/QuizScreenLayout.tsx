import type { ReactNode } from 'react'
import { ChevronLeft } from 'lucide-react'
import Logo from '@/funnels/twenty-eight-day/components/Logo'

interface QuizScreenLayoutProps {
  children: ReactNode
  onBack?: () => void
  currentStep?: number
  totalSteps?: number
  footer?: ReactNode
  contentClassName?: string
}

export default function QuizScreenLayout({
  children,
  onBack,
  currentStep,
  totalSteps,
  footer,
  contentClassName = '',
}: QuizScreenLayoutProps) {
  const showProgress = typeof currentStep === 'number' && typeof totalSteps === 'number'

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

          <div className="flex w-8 shrink-0 justify-end text-xs font-semibold text-sw-grey">
            {showProgress ? `${currentStep}/${totalSteps}` : null}
          </div>
        </div>
        {showProgress ? (
          <div className="h-1 w-full bg-sw-grey-light">
            <div
              className="h-full bg-sw-blue transition-all duration-500 ease-out"
              style={{ width: `${Math.min(100, ((currentStep ?? 0) / (totalSteps ?? 1)) * 100)}%` }}
            />
          </div>
        ) : null}
      </header>

      <main className={`mx-auto flex w-full max-w-xl flex-1 flex-col px-5 py-6 ${contentClassName}`}>
        {children}
      </main>

      {footer ? (
        <div className="sticky bottom-0 z-20 border-t border-sw-border bg-sw-white/95 backdrop-blur safe-bottom">
          <div className="mx-auto max-w-xl px-5 py-4">{footer}</div>
        </div>
      ) : null}
    </div>
  )
}
