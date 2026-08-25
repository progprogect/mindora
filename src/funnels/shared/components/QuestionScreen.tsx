import { useState } from 'react'
import type { QuestionScreenDef } from '@/funnels/shared/types'

interface QuestionScreenProps {
  screen: QuestionScreenDef
  initialSelected?: string
  onAnswer: (value: string) => void
}

const AUTO_ADVANCE_DELAY_MS = 480

export default function QuestionScreen({ screen, initialSelected, onAnswer }: QuestionScreenProps) {
  const [selected, setSelected] = useState<string | null>(initialSelected ?? null)

  const handleSelect = (value: string) => {
    if (selected && selected !== initialSelected) return
    setSelected(value)
    window.setTimeout(() => onAnswer(value), AUTO_ADVANCE_DELAY_MS)
  }

  return (
    <div className="flex flex-1 flex-col animate-fade-up pt-8 pb-8">
      <p className="mb-4 text-center text-xs font-bold tracking-widest text-sw-blue uppercase">
        Question {screen.step} of {screen.totalSteps}
      </p>
      <h2 className="mb-2 text-center text-2xl leading-tight font-bold text-sw-dark sm:text-3xl">{screen.question}</h2>
      {screen.subtext ? (
        <p className="mb-6 text-center text-sm text-sw-grey">{screen.subtext}</p>
      ) : (
        <div className="mb-6" />
      )}

      <div className="flex flex-col gap-3.5">
        {screen.options.map((option) => {
          const isSelected = selected === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-5 text-left transition-all duration-200 active:scale-[0.98] ${
                isSelected
                  ? 'scale-[0.99] border-sw-blue bg-sw-blue-light'
                  : 'cursor-pointer border-sw-grey-border bg-white hover:border-sw-blue hover:bg-sw-blue-light hover:scale-[1.02] hover:-translate-y-0.5'
              }`}
            >
              <span className="w-9 flex-shrink-0 text-center text-2xl" aria-hidden>
                {option.emoji}
              </span>
              <span
                className={`flex-1 text-base leading-snug font-semibold sm:text-lg ${
                  isSelected ? 'text-sw-blue' : 'text-sw-dark'
                }`}
              >
                {option.label}
              </span>
              <span
                className={`flex size-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                  isSelected ? 'scale-110 border-sw-blue bg-sw-blue' : 'border-sw-border bg-white'
                }`}
              >
                {isSelected ? (
                  <svg className="size-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                  </svg>
                ) : null}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
