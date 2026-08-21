import { useState } from 'react'
import type { QuestionScreen as QuestionScreenDef } from '@/funnels/twenty-eight-day/types/quiz'

interface QuestionScreenProps {
  screen: QuestionScreenDef
  onAnswer: (optionId: string) => void
}

const TOTAL_QUESTIONS = 18

const AUTO_ADVANCE_DELAY_MS = 480

export default function QuestionScreen({ screen, onAnswer }: QuestionScreenProps) {
  const [selected, setSelected] = useState<string | null>(null)

  const handleSelect = (optionId: string) => {
    if (selected) return
    setSelected(optionId)
    window.setTimeout(() => onAnswer(optionId), AUTO_ADVANCE_DELAY_MS)
  }

  return (
    <div className="flex flex-col gap-6 py-4 animate-fade-up" key={screen.id}>
      <div className="text-center">
        <p className="text-xs font-bold tracking-wide text-sw-blue uppercase">
          Question {screen.step} of {TOTAL_QUESTIONS}
        </p>
        <h1 className="mt-2 text-xl font-extrabold text-sw-dark sm:text-2xl">{screen.question}</h1>
        {screen.subtitle ? <p className="mt-2 text-sm text-sw-grey">{screen.subtitle}</p> : null}
      </div>

      <div className="flex flex-col gap-3">
        {screen.options.map((option) => {
          const isSelected = selected === option.id
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.id)}
              disabled={Boolean(selected)}
              className={`flex items-center gap-3 rounded-sw border-[2px] px-4 py-3.5 text-left text-sm font-semibold transition disabled:cursor-default ${
                isSelected
                  ? 'border-sw-blue bg-sw-blue-light text-sw-blue'
                  : 'border-sw-border bg-sw-white text-sw-dark hover:border-sw-blue/60'
              }`}
            >
              {option.emoji ? (
                <span className="text-xl" aria-hidden>
                  {option.emoji}
                </span>
              ) : null}
              <span className="flex-1">{option.label}</span>
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  isSelected ? 'border-sw-blue' : 'border-sw-border'
                }`}
              >
                {isSelected ? <span className="size-2.5 rounded-full bg-sw-blue" /> : null}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
