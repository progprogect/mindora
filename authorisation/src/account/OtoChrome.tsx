import type { ReactNode } from 'react'
import BrandWordmark from '@/shared/BrandWordmark'

const STEPS = ['Member', 'Welcome', 'Upgrades', 'Access'] as const

function Step({
  number,
  label,
  status,
}: {
  number: number
  label: string
  status: 'complete' | 'active' | 'upcoming'
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${
          status === 'complete'
            ? 'bg-green-500 text-white'
            : status === 'active'
              ? 'bg-sw-blue text-white'
              : 'bg-gray-200 text-sw-grey'
        }`}
      >
        {status === 'complete' ? '✓' : number}
      </div>
      <span
        className={`text-xs font-bold ${
          status === 'active' ? 'text-sw-blue' : status === 'complete' ? 'text-sw-dark' : 'text-sw-grey'
        }`}
      >
        {label}
      </span>
    </div>
  )
}

export default function OtoChrome({
  activeStep,
  children,
  pillLabel = '⚡ EXCLUSIVE NEW MEMBER OFFER',
  pillSubLabel = 'Only available during setup',
  pillClassName = 'border border-gray-200 bg-gray-50',
  pillTestId,
}: {
  activeStep: (typeof STEPS)[number]
  children?: ReactNode
  pillLabel?: string
  pillSubLabel?: string
  pillClassName?: string
  pillTestId?: string
}) {
  const active = STEPS.indexOf(activeStep)
  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-sw-grey-border">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center justify-center">
          <BrandWordmark />
        </div>
      </header>
      <div className="bg-sw-dark text-white text-center py-2.5 px-4">
        <p className="text-xs sm:text-sm font-semibold">
          <span className="text-amber-400 font-bold">✨ ONE-TIME OFFER</span> — Special new-member
          pricing below. Skip anytime.
        </p>
      </div>
      <div className="bg-white py-4 px-4 border-b border-sw-grey-border">
        <div className="max-w-sm mx-auto flex items-center justify-between">
          {STEPS.map((label, i) => (
            <div key={label} className="contents">
              {i > 0 ? (
                <div
                  className={`flex-1 h-0.5 rounded-full mx-1 mt-[-14px] ${i <= active ? 'bg-green-500' : 'bg-gray-200'}`}
                />
              ) : null}
              <Step
                number={i + 1}
                label={label}
                status={i < active ? 'complete' : i === active ? 'active' : 'upcoming'}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center pt-5 pb-1 px-4">
        <div
          data-testid={pillTestId}
          className={`inline-flex flex-col items-center px-6 py-2.5 rounded-full shadow-sm ${pillClassName}`}
        >
          <span className="text-xs font-bold tracking-wide text-sw-dark uppercase">{pillLabel}</span>
          <span className="text-[11px] text-sw-grey">{pillSubLabel}</span>
        </div>
      </div>
      {children}
    </>
  )
}
