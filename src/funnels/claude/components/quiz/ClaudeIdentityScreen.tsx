import { ChevronRight } from 'lucide-react'
import AssetImage from '@/shared/components/AssetImage'
import QuizTermsFooter from '@/funnels/claude/components/quiz/QuizTermsFooter'
import type { ClaudeIdentity, ClaudeIdentityScreenDef } from '@/funnels/claude/types/claudeQuiz'

interface ClaudeIdentityScreenProps {
  screen: ClaudeIdentityScreenDef
  onSelect: (value: ClaudeIdentity) => void
}

const IDENTITY_ASSET_SRC: Record<ClaudeIdentity, string> = {
  yes: '/assets/claude-yes.png',
  'not-yet': '/assets/claude-not-yet.png',
}

/** Port of `oe()` — the bespoke Claude identity screen (lavender bg, 2 photo cards). */
export default function ClaudeIdentityScreen({ screen, onSelect }: ClaudeIdentityScreenProps) {
  return (
    <div className="flex w-full flex-1 flex-col animate-fade-up" style={{ background: 'hsl(240 40% 95%)' }}>
      <div className="mx-auto flex w-full max-w-lg flex-col px-4">
        <div className="pt-8 pb-4 text-center">
          <h1 className="text-[clamp(1.5rem,6vw,1.95rem)] leading-[1.15] font-extrabold tracking-tight text-sw-dark uppercase">
            Let&apos;s Create Your
            <br />
            <span className="text-sw-blue">Claude AI</span> Learning Plan
          </h1>
        </div>
        <p className="mb-5 text-center text-lg font-semibold text-sw-dark sm:text-xl">{screen.subtext}</p>

        <div className="mb-5 grid grid-cols-2 gap-3">
          {screen.options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border-2 border-sw-blue bg-sw-white shadow-md transition-all duration-150 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-xl active:scale-[0.97]"
            >
              <div className="flex w-full flex-1 items-center justify-center p-3" style={{ minHeight: '160px' }}>
                <AssetImage
                  src={IDENTITY_ASSET_SRC[option.value]}
                  alt={`Claude AI - ${option.label}`}
                  fallbackEmoji={option.emoji}
                  className="h-auto w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex items-center justify-center gap-2 bg-sw-blue px-4 py-3">
                <span className="text-base font-bold text-sw-white">{option.label}</span>
                <ChevronRight className="size-4 text-sw-white/90" strokeWidth={2.5} />
              </div>
            </button>
          ))}
        </div>

        <div className="mb-6 flex items-start justify-center gap-2 px-2">
          <span className="text-lg" aria-hidden>
            ✨
          </span>
          <p className="text-center text-sm leading-snug font-medium text-sw-dark/80 sm:text-[15px]">
            Answer a few quick questions and get your personalised Claude learning plan in just 60 seconds.
          </p>
        </div>

        <QuizTermsFooter />
      </div>
    </div>
  )
}
