import { useState } from 'react'
import type { QuestionScreen as QuestionScreenDef } from '@/funnels/twenty-eight-day/types/quiz'
import QuizOptionRadio from '@/funnels/twenty-eight-day/components/quiz/QuizOptionRadio'

interface QuestionScreenProps {
  screen: QuestionScreenDef
  onAnswer: (optionId: string) => void
  initialSelected?: string
}

const TOTAL_QUESTIONS = 18

const AUTO_ADVANCE_DELAY_MS = 480

export default function QuestionScreen({ screen, onAnswer, initialSelected }: QuestionScreenProps) {
  const [selected, setSelected] = useState<string | null>(initialSelected ?? null)

  const handleSelect = (optionId: string) => {
    if (selected && selected !== initialSelected) return
    setSelected(optionId)
    window.setTimeout(() => onAnswer(optionId), AUTO_ADVANCE_DELAY_MS)
  }

  return (
    <div className="flex flex-1 flex-col animate-fade-up pt-8 pb-8">
      <p className="mb-4 text-center text-xs font-bold tracking-widest text-sw-blue uppercase">
        Question {screen.step} of {TOTAL_QUESTIONS}
      </p>
      <h2 className="mb-2 text-center text-2xl leading-tight font-bold text-sw-dark sm:text-3xl">
        {screen.question}
      </h2>
      {screen.subtitle ? (
        <p className="mb-6 text-center text-sm text-sw-grey">{screen.subtitle}</p>
      ) : (
        <div className="mb-6" />
      )}

      <div className="flex flex-col gap-3.5">
        {screen.options.map((option) => {
          const isSelected = selected === option.id
          const hasEmoji = Boolean(option.emoji)
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.id)}
              className={`flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-5 transition-all duration-200 active:scale-[0.98] ${
                hasEmoji ? 'text-left' : 'justify-center'
              } ${
                isSelected
                  ? 'scale-[0.99] border-sw-blue bg-sw-blue-light'
                  : 'cursor-pointer border-sw-grey-border bg-white hover:border-sw-blue hover:bg-sw-blue-light hover:scale-[1.02] hover:-translate-y-0.5'
              }`}
            >
              {hasEmoji ? (
                <span className="w-9 flex-shrink-0 text-center text-2xl" aria-hidden>
                  {option.emoji}
                </span>
              ) : null}
              <span
                className={`flex-1 text-base leading-snug font-semibold sm:text-lg ${
                  isSelected ? 'text-sw-blue' : 'text-sw-dark'
                }`}
              >
                {option.label}
              </span>
              <QuizOptionRadio selected={isSelected} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
