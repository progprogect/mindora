import { useEffect } from 'react'
import type { ClaudeProfile, ClaudeQuizAnswers } from '@/funnels/claude/types/claudeQuiz'
import { claudeSalesUiCopy } from '@/funnels/claude/i18n/claudeSalesUiCopy'
import { useI18n } from '../../../../../authorisation/src/i18n/I18nProvider'

interface ClaudeBeforeAfterScreenProps {
  profile: ClaudeProfile
  answers: ClaudeQuizAnswers
  onContinue: () => void
}

export default function ClaudeBeforeAfterScreen({ onContinue }: ClaudeBeforeAfterScreenProps) {
  const { locale } = useI18n()
  const copy = claudeSalesUiCopy(locale).beforeAfter

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pt-8 pb-44">
      <div className="mb-6 animate-fade-up text-center">
        <h1 className="mb-2 text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">{copy.title}</h1>
        <p className="text-sm leading-relaxed text-sw-grey">{copy.subtitle}</p>
      </div>

      <div className="mb-4 animate-fade-up rounded-2xl border border-sw-red/20 bg-sw-red/10 p-5">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-lg">😓</span>
          <h2 className="text-base font-extrabold text-sw-dark">{copy.withoutTitle}</h2>
        </div>
        <div className="flex flex-col gap-3">
          {copy.without.map((item) => (
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
          <h2 className="text-base font-extrabold text-sw-dark">{copy.withTitle}</h2>
        </div>
        <div className="flex flex-col gap-3">
          {copy.with.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="mt-0.5 text-sm text-sw-success">✓</span>
              <p className="text-sm leading-snug font-medium text-sw-dark">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 animate-fade-up rounded-xl border border-sw-border p-4">
        <p className="mb-2 text-sm leading-relaxed text-sw-dark italic">&ldquo;{copy.quote}&rdquo;</p>
        <p className="text-xs font-bold text-sw-grey">{copy.quoteAttribution}</p>
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
            {copy.continue}
          </button>
        </div>
        <div style={{ paddingTop: '56px', paddingBottom: 'env(safe-area-inset-bottom)' }} />
      </div>
    </div>
  )
}
