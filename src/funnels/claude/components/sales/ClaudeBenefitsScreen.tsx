import { useEffect } from 'react'
import type { ClaudeProfile, ClaudeQuizAnswers } from '@/funnels/claude/types/claudeQuiz'

interface ClaudeBenefitsScreenProps {
  profile: ClaudeProfile
  answers: ClaudeQuizAnswers
  onContinue: () => void
}

const OUTCOME_BY_PURPOSE_GROUP: Record<string, string> = {
  career: 'get promoted and stand out from your peers',
  productivity: 'save 5+ hours every single week',
  income: 'build a profitable AI-powered side income',
  thinking: 'make sharper decisions and think more clearly',
  building: 'build real products and automations with Claude',
}

const PURPOSE_GROUP_BY_ANSWER: Record<string, string> = {
  work: 'productivity',
  personal: 'thinking',
  growth: 'career',
}

const HIGHLIGHTS: Array<{ icon: string; text: string }> = [
  { icon: '🎓', text: 'Earn a Claude AI Certification' },
  { icon: '⚡', text: 'Results from week one' },
  { icon: '📱', text: '10 min/day on any device' },
]

const CERTIFICATION_BENEFITS: Array<{ bold: string; rest: string }> = [
  {
    bold: 'Master Claude from beginner to certified',
    rest: ' — structured lessons that build real skill, not just surface knowledge',
  },
  { bold: 'Get a verifiable AI Certification', rest: ' you can add to LinkedIn and your CV immediately' },
  { bold: '50+ real-world Claude templates', rest: ' for writing, analysis, automation, and creative work' },
  { bold: 'Save 5–10 hours every week', rest: ' by learning which tasks to delegate to Claude (and how)' },
  {
    bold: 'Stand out in a competitive job market',
    rest: ' with proof you can use the most powerful AI tool available',
  },
]

/** Port of `ClaudeBenefitsScreen` (`ClaudeBenefitsScreen-B5qMZQKq.js`). */
export default function ClaudeBenefitsScreen({ answers, onContinue }: ClaudeBenefitsScreenProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const purposeGroup = PURPOSE_GROUP_BY_ANSWER[answers['q1-purpose'] ?? 'work'] ?? 'productivity'
  const outcome = OUTCOME_BY_PURPOSE_GROUP[purposeGroup] ?? 'master Claude AI'

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pt-8 pb-44">
      <div className="mb-6 animate-fade-up text-center">
        <h1 className="mb-2 text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
          Claude AI Mastery Is
          <br />
          Easier Than You Think
        </h1>
        <p className="text-sm leading-relaxed text-sw-grey">
          Designed to help you <span className="font-bold text-sw-dark">{outcome}</span> — starting day one.
        </p>
      </div>

      <div
        className="relative mb-6 animate-fade-up overflow-hidden rounded-2xl"
        style={{ background: 'linear-gradient(135deg, hsl(var(--sw-blue)) 0%, hsl(221 83% 38%) 100%)' }}
      >
        <div className="px-6 py-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white/20 text-3xl">🏆</div>
            <div>
              <p className="text-xs font-bold tracking-wide text-white/70 uppercase">Course</p>
              <p className="text-lg leading-tight font-extrabold text-white">
                Claude AI: Think Smarter,
                <br />
                Work Faster
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {HIGHLIGHTS.map((h) => (
              <div key={h.text} className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3">
                <span className="text-xl">{h.icon}</span>
                <span className="text-sm leading-snug font-semibold text-white">{h.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6 animate-fade-up">
        <h2 className="mb-4 text-lg font-extrabold text-sw-dark">With your Claude AI Certification, you will:</h2>
        <div className="flex flex-col gap-4">
          {CERTIFICATION_BENEFITS.map((b) => (
            <div key={b.bold} className="flex items-start gap-4">
              <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-sw-blue">
                <div className="size-3 rounded-full bg-sw-blue" />
              </div>
              <p className="text-sm leading-snug text-sw-dark">
                <span className="font-bold">{b.bold}</span>
                {b.rest}
              </p>
            </div>
          ))}
          <div className="flex items-start gap-4">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-sw-border">
              <div className="size-3 rounded-full bg-sw-border" />
            </div>
            <p className="text-sm leading-snug font-medium text-sw-grey">…and much more!</p>
          </div>
        </div>
      </div>

      <div
        className="fixed inset-x-0 bottom-0 z-50 px-4 pt-10"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.92) 40%, white 65%)' }}
      >
        <div className="mx-auto max-w-lg">
          <button
            type="button"
            onClick={onContinue}
            className="w-full rounded-full bg-sw-blue py-4 text-base font-bold text-sw-white shadow-lg transition-all duration-150 hover:bg-sw-blue-hover active:scale-[0.98]"
          >
            Continue →
          </button>
        </div>
        <div style={{ paddingTop: '56px', paddingBottom: 'env(safe-area-inset-bottom)' }} />
      </div>
    </div>
  )
}
