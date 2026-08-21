import { useState } from 'react'
import { Check } from 'lucide-react'
import type { ClaudeQuestionScreenDef } from '@/funnels/claude/types/claudeQuiz'

interface ClaudeQuestionScreenProps {
  screen: ClaudeQuestionScreenDef
  initialValue?: string
  onSelect: (value: string) => void
}

const AUTO_ADVANCE_DELAY_MS = 480

/** Port of `d()` (`QuestionScreen-*.js`) — emoji options, radio circles, 480ms auto-advance. */
export default function ClaudeQuestionScreen({ screen, initialValue, onSelect }: ClaudeQuestionScreenProps) {
  const [selected, setSelected] = useState<string | null>(initialValue ?? null)

  const handleSelect = (value: string) => {
    if (selected && selected !== initialValue) return
    setSelected(value)
    window.setTimeout(() => onSelect(value), AUTO_ADVANCE_DELAY_MS)
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pt-8 pb-8 animate-fade-up">
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
                  : 'border-sw-border bg-sw-white hover:-translate-y-0.5 hover:scale-[1.02] hover:border-sw-blue hover:bg-sw-blue-light'
              }`}
            >
              <span className="w-9 flex-shrink-0 text-center text-2xl" aria-hidden>
                {option.emoji}
              </span>
              <span
                className={`flex-1 text-base leading-snug font-semibold transition-colors sm:text-lg ${
                  isSelected ? 'text-sw-blue' : 'text-sw-dark'
                }`}
              >
                {option.label}
              </span>
              <span
                className={`flex size-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                  isSelected ? 'scale-110 border-sw-blue bg-sw-blue' : 'border-sw-border bg-sw-white'
                }`}
              >
                {isSelected ? <Check className="size-3 text-sw-white" strokeWidth={2.5} /> : null}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
