import { useState, type ReactNode } from 'react'
import type { AIToolsQuestionScreen as AIToolsScreenDef } from '@/funnels/twenty-eight-day/types/quiz'
import QuizOptionRadio from '@/funnels/twenty-eight-day/components/quiz/QuizOptionRadio'

interface AIToolsQuestionScreenProps {
  screen: AIToolsScreenDef
  onAnswer: (optionId: string) => void
  initialSelected?: string
}

const TOTAL_QUESTIONS = 18

const AUTO_ADVANCE_DELAY_MS = 480

const TOOL_PNG: Record<string, { src: string; alt: string }> = {
  chatgpt: { src: '/assets/tools/chatgpt.png', alt: 'ChatGPT' },
  gemini: { src: '/assets/tools/gemini.png', alt: 'Google Gemini' },
  copilot: { src: '/assets/tools/copilot.png', alt: 'Microsoft Copilot' },
  midjourney: { src: '/assets/tools/midjourney.png', alt: 'Midjourney' },
}

function BrandTile({ color, children }: { color: string; children: ReactNode }) {
  return (
    <div
      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
      style={{ background: color }}
    >
      {children}
    </div>
  )
}

function ClaudeIcon() {
  return (
    <BrandTile color="rgb(217, 119, 87)">
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden>
        <path d="M14 6.5A5.5 5.5 0 1 0 14 13.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </BrandTile>
  )
}

function PerplexityIcon() {
  return (
    <BrandTile color="rgb(32, 128, 141)">
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden>
        <line x1="10" y1="3" x2="10" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="3" y1="10" x2="17" y2="10" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="5.05" y1="5.05" x2="14.95" y2="14.95" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="14.95" y1="5.05" x2="5.05" y2="14.95" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </BrandTile>
  )
}

function ToolIcon({ icon, emoji }: { icon: string; emoji?: string }) {
  if (icon === 'new') {
    return (
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-sw-grey-light text-xl">
        {emoji ?? '🤔'}
      </div>
    )
  }
  if (icon === 'claude') return <ClaudeIcon />
  if (icon === 'perplexity') return <PerplexityIcon />
  const png = TOOL_PNG[icon]
  if (png) {
    return <img src={png.src} alt={png.alt} className="h-9 w-9 flex-shrink-0 rounded-xl object-contain" />
  }
  return (
    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-sw-grey-light text-xl">
      {emoji ?? '✨'}
    </div>
  )
}

export default function AIToolsQuestionScreen({
  screen,
  onAnswer,
  initialSelected,
}: AIToolsQuestionScreenProps) {
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
      <h2 className="mb-6 text-center text-2xl leading-tight font-bold text-sw-dark sm:text-3xl">
        {screen.question}
      </h2>
      {screen.subtitle ? <p className="mb-6 text-center text-sm text-sw-grey">{screen.subtitle}</p> : null}

      <div className="flex flex-col gap-3">
        {screen.options.map((option) => {
          const isSelected = selected === option.id
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.id)}
              className={`flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all duration-200 active:scale-[0.98] ${
                isSelected
                  ? 'scale-[0.99] border-sw-blue bg-sw-blue-light'
                  : 'border-sw-grey-border bg-white hover:border-sw-blue hover:bg-sw-blue-light'
              }`}
            >
              <ToolIcon icon={option.icon} emoji={option.emoji} />
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
