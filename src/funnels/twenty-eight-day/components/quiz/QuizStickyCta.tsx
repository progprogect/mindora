import type { ReactNode } from 'react'

interface QuizStickyCtaProps {
  children: ReactNode
  zClass?: string
  /** Spin footer sits 16px off the bottom; other CTAs use the 56px prod spacer. */
  compact?: boolean
}

export default function QuizStickyCta({
  children,
  zClass = 'z-50',
  compact = false,
}: QuizStickyCtaProps) {
  return (
    <div
      className={`fixed right-0 bottom-0 left-0 px-4 pt-10 ${zClass}`}
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.92) 40%, rgb(255, 255, 255) 65%)',
      }}
    >
      <div className="mx-auto max-w-lg">{children}</div>
      <div
        className="mx-auto max-w-lg bg-white"
        style={{
          paddingTop: compact ? 16 : 56,
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      />
    </div>
  )
}
