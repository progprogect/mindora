import { useEffect } from 'react'
import type { ClaudeProfile, ClaudeQuizAnswers } from '@/funnels/claude/types/claudeQuiz'

interface ClaudeBeforeAfterScreenProps {
  profile: ClaudeProfile
  answers: ClaudeQuizAnswers
  onContinue: () => void
}

const WITHOUT_MASTERY: string[] = [
  'Typing basic questions and getting mediocre answers',
  'Spending hours on tasks Claude could do in seconds',
  'Watching others get ahead while you figure it out alone',
  'No proof of your AI skills for employers',
  'Feeling overwhelmed by AI news and updates',
]

const WITH_CERTIFICATION: string[] = [
  'Writing expert prompts that get perfect results first time',
  'Saving 5–10 hours every week with Claude workflows',
  'Confidently using Claude to outperform your peers',
  'A verified Claude AI Certification on your CV & LinkedIn',
  'Calm, confident mastery of the most powerful AI tool',
]

/** Port of `ClaudeBeforeAfterScreen` (`ClaudeBeforeAfterScreen-i_QQO8Sr.js`). */
export default function ClaudeBeforeAfterScreen({ onContinue }: ClaudeBeforeAfterScreenProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pt-8 pb-44">
      <div className="mb-6 animate-fade-up text-center">
        <h1 className="mb-2 text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">The Difference Is Clear</h1>
        <p className="text-sm leading-relaxed text-sw-grey">Where you are now vs where you could be in 30 days</p>
      </div>

      <div className="mb-4 animate-fade-up rounded-2xl border border-sw-red/20 bg-sw-red/10 p-5">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-lg">😓</span>
          <h2 className="text-base font-extrabold text-sw-dark">Without Claude Mastery</h2>
        </div>
        <div className="flex flex-col gap-3">
          {WITHOUT_MASTERY.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="mt-0.5 text-sm text-sw-red">✗</span>
              <p className="text-sm leading-snug text-sw-grey">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5 animate-fade-up rounded-2xl border border-sw-success/20 bg-sw-success-light p-5">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-lg">🚀</span>
          <h2 className="text-base font-extrabold text-sw-dark">With Claude AI Certification</h2>
        </div>
        <div className="flex flex-col gap-3">
          {WITH_CERTIFICATION.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="mt-0.5 text-sm text-sw-success">✓</span>
              <p className="text-sm leading-snug font-medium text-sw-dark">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 animate-fade-up rounded-xl border border-sw-border p-4">
        <p className="mb-2 text-sm leading-relaxed text-sw-dark italic">
          &ldquo;I went from barely using Claude to getting a certification and a promotion in the same month. The
          structured approach made all the difference.&rdquo;
        </p>
        <p className="text-xs font-bold text-sw-grey">— Sarah K., Product Manager</p>
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
