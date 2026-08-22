import type { ReactNode } from 'react'
import Logo from '@/funnels/twenty-eight-day/components/Logo'
import QuizBackButton from '@/funnels/twenty-eight-day/components/quiz/QuizBackButton'
import QuizStickyCta from '@/funnels/twenty-eight-day/components/quiz/QuizStickyCta'

interface SalesFunnelLayoutProps {
  step: number
  totalSteps?: number
  onBack?: () => void
  children: ReactNode
  footer?: ReactNode
  contentClassName?: string
}

export default function SalesFunnelLayout({
  onBack,
  children,
  footer,
  contentClassName,
}: SalesFunnelLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-sw-white">
      <header className="sticky top-0 z-50 border-b border-sw-grey-border bg-white">
        <div className="mx-auto flex h-14 max-w-lg items-center gap-3 px-4">
          {onBack ? <QuizBackButton onClick={onBack} /> : <div className="size-8 shrink-0" />}

          <div className="flex flex-1 items-center justify-center">
            <Logo variant="text" />
          </div>

          <div className="w-8 shrink-0" />
        </div>
      </header>

      <main
        className={`mx-auto flex w-full max-w-lg flex-1 flex-col ${contentClassName ?? 'px-4 py-6'}`}
      >
        {children}
      </main>

      {footer ? <QuizStickyCta>{footer}</QuizStickyCta> : null}
    </div>
  )
}
