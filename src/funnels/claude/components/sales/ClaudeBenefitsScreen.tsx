import { useEffect } from 'react'
import type { ClaudeProfile, ClaudeQuizAnswers } from '@/funnels/claude/types/claudeQuiz'
import { claudeSalesUiCopy } from '@/funnels/claude/i18n/claudeSalesUiCopy'
import { useI18n } from '../../../../../authorisation/src/i18n/I18nProvider'

interface ClaudeBenefitsScreenProps {
  profile: ClaudeProfile
  answers: ClaudeQuizAnswers
  onContinue: () => void
}

const PURPOSE_GROUP_BY_ANSWER: Record<string, string> = {
  work: 'productivity',
  personal: 'thinking',
  growth: 'career',
}

export default function ClaudeBenefitsScreen({ answers, onContinue }: ClaudeBenefitsScreenProps) {
  const { locale } = useI18n()
  const copy = claudeSalesUiCopy(locale).benefits
  const outcomes = claudeSalesUiCopy(locale).outcomeByPurposeGroup

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const purposeGroup = PURPOSE_GROUP_BY_ANSWER[answers['q1-purpose'] ?? 'work'] ?? 'productivity'
  const outcome = outcomes[purposeGroup as keyof typeof outcomes] ?? outcomes.productivity

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pt-8 pb-44">
      <div className="mb-6 animate-fade-up text-center">
        <h1 className="mb-2 text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
          {copy.titleLine1}
          <br />
          {copy.titleLine2}
        </h1>
        <p className="text-sm leading-relaxed text-sw-grey">
          {copy.designedPrefix}
          <span className="font-bold text-sw-dark">{outcome}</span>
          {copy.designedSuffix}
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
              <p className="text-xs font-bold tracking-wide text-white/70 uppercase">{copy.courseLabel}</p>
              <p className="text-lg leading-tight font-extrabold text-white">
                {copy.courseTitleLine1}
                <br />
                {copy.courseTitleLine2}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {copy.highlights.map((h) => (
              <div key={h.text} className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3">
                <span className="text-xl">{h.icon}</span>
                <span className="text-sm leading-snug font-semibold text-white">{h.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6 animate-fade-up">
        <h2 className="mb-4 text-lg font-extrabold text-sw-dark">{copy.sectionTitle}</h2>
        <div className="flex flex-col gap-4">
          {copy.certificationBenefits.map((b) => (
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
            <p className="text-sm leading-snug font-medium text-sw-grey">{copy.andMore}</p>
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
            {copy.continue}
          </button>
        </div>
        <div style={{ paddingTop: '56px', paddingBottom: 'env(safe-area-inset-bottom)' }} />
      </div>
    </div>
  )
}
