import { useState } from 'react'
import type { LargeCardScreen } from '@/funnels/shared/types'

interface LargeCardQuestionProps {
  screen: LargeCardScreen
  onSelect: (value: string) => void
}

const AUTO_ADVANCE_DELAY_MS = 480

export default function LargeCardQuestion({ screen, onSelect }: LargeCardQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null)

  const handleSelect = (value: string) => {
    if (selected) return
    setSelected(value)
    window.setTimeout(() => onSelect(value), AUTO_ADVANCE_DELAY_MS)
  }

  return (
    <div className="flex w-full flex-1 flex-col bg-white animate-fade-up">
      <div className="px-5 pt-8 pb-5 text-center">
        <h2 className="text-[1.7rem] leading-[1.15] font-extrabold text-sw-dark sm:text-[2rem]">{screen.question}</h2>
      </div>
      <div className="grid grid-cols-2 gap-3 px-4 pb-8">
        {screen.options.map((option) => {
          const ariaLabel = option.sublabel ? `${option.label} — ${option.sublabel}` : option.label
          return (
            <button
              key={option.value}
              type="button"
              aria-label={ariaLabel}
              onClick={() => handleSelect(option.value)}
              className="group cursor-pointer overflow-hidden rounded-2xl shadow-md transition-all duration-150 hover:shadow-xl focus:outline-none active:scale-[0.96]"
              style={{ background: option.gradient }}
            >
              <div className="flex items-center justify-center pt-7 pb-3">
                <span className="leading-none transition-transform duration-150 group-active:scale-90" style={{ fontSize: '3rem' }} aria-hidden>
                  {option.emoji}
                </span>
              </div>
              <div className="px-3 pb-5 text-center">
                <span className="block text-[14px] leading-snug font-bold text-white">{option.label}</span>
                {option.sublabel ? (
                  <span className="mt-0.5 block text-[11px] leading-snug font-medium text-white/75">{option.sublabel}</span>
                ) : null}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
