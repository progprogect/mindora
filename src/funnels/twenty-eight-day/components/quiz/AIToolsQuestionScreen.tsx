import { useState } from 'react'
import type { AIToolsQuestionScreen as AIToolsScreenDef } from '@/funnels/twenty-eight-day/types/quiz'

interface AIToolsQuestionScreenProps {
  screen: AIToolsScreenDef
  onAnswer: (optionId: string) => void
}

const TOTAL_QUESTIONS = 18

const AUTO_ADVANCE_DELAY_MS = 480

/**
 * Generic colored-badge + emoji per tool (not the official logos — avoids
 * trademark/licensing issues while keeping each row instantly scannable).
 * Swap for self-hosted brand icons in `public/assets/ai-tools/` if you have
 * the rights to use them; see docs/28_day_quiz/implementation-plan.md.
 */
const BADGE_STYLE: Record<string, { bg: string; emoji: string }> = {
  new: { bg: 'bg-sw-grey-light', emoji: '🤔' },
  chatgpt: { bg: 'bg-emerald-500', emoji: '🤖' },
  claude: { bg: 'bg-orange-500', emoji: '🧠' },
  gemini: { bg: 'bg-blue-500', emoji: '✨' },
  copilot: { bg: 'bg-indigo-500', emoji: '🧭' },
  midjourney: { bg: 'bg-violet-500', emoji: '🎨' },
  perplexity: { bg: 'bg-teal-500', emoji: '🔎' },
}

export default function AIToolsQuestionScreen({ screen, onAnswer }: AIToolsQuestionScreenProps) {
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

      <div className="flex flex-col gap-2.5">
        {screen.options.map((option) => {
          const isSelected = selected === option.id
          const badge = BADGE_STYLE[option.icon] ?? { bg: 'bg-sw-grey-light', emoji: '✨' }
          const isPlainBadge = badge.bg === 'bg-sw-grey-light'

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.id)}
              disabled={Boolean(selected)}
              className={`flex items-center gap-3 rounded-sw border-[2px] px-4 py-3 text-left text-sm font-semibold transition disabled:cursor-default ${
                isSelected
                  ? 'border-sw-blue bg-sw-blue-light text-sw-blue'
                  : 'border-sw-border bg-sw-white text-sw-dark hover:border-sw-blue/60'
              }`}
            >
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-full text-base ${badge.bg} ${isPlainBadge ? '' : 'text-white'}`}
              >
                {badge.emoji}
              </span>
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
