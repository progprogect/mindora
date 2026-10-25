import { useMemo } from 'react'
import type { QuizAnswers, QuizProfile } from '@/funnels/twenty-eight-day/types/quiz'
import { salesBenefitsCopy } from '@/funnels/twenty-eight-day/data/funnelCopy'
import type { FunnelLocale } from '@/funnels/twenty-eight-day/data/quizScreens'
import { useI18n } from '../../../../../authorisation/src/i18n/I18nProvider'

interface SalesBenefitsScreenProps {
  profile: QuizProfile
  answers: QuizAnswers
}

export default function SalesBenefitsScreen({ profile, answers }: SalesBenefitsScreenProps) {
  const { locale } = useI18n()
  const copy = useMemo(() => salesBenefitsCopy(locale as FunnelLocale), [locale])
  const goalPhrase = copy.goalPhrase[answers['q2-goal']] ?? copy.defaultGoal

  return (
    <div className="flex flex-1 flex-col gap-6 pt-4 pb-32 animate-fade-up">
      <div className="text-center">
        <h1 className="mb-2 text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
          {copy.titleLine1}
          <br />
          {copy.titleLine2}
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-sw-grey">
          {copy.designed} <span className="font-bold text-sw-dark">{goalPhrase}</span> {copy.starting}
        </p>
      </div>

      <div
        className="rounded-2xl px-6 py-8 text-sw-white shadow-sw-card"
        style={{ background: 'linear-gradient(135deg, hsl(var(--sw-blue)) 0%, hsl(221 83% 38%) 100%)' }}
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-white/20 text-3xl">
            {profile.archetypeEmoji}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-white/70">{copy.builtFor}</p>
            <p className="text-lg font-extrabold leading-tight">{profile.archetype}</p>
          </div>
        </div>
        <ul className="flex flex-col gap-3">
          {copy.builtForItems.map((item) => (
            <li key={item.text} className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3">
              <span className="text-xl" aria-hidden>
                {item.icon}
              </span>
              <span className="text-sm font-semibold leading-snug">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-extrabold text-sw-dark">{copy.benefitsTitle}</h2>
        <ul className="flex flex-col gap-4">
          {copy.benefits.map((item) => (
            <li key={item.bold} className="flex items-start gap-4">
              <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-sw-blue">
                <div className="size-3 rounded-full bg-sw-blue" />
              </div>
              <p className="text-sm leading-snug text-sw-dark">
                <span className="font-bold">{item.bold}</span>
                {item.rest}
              </p>
            </li>
          ))}
          <li className="flex items-start gap-4">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-sw-border">
              <div className="size-3 rounded-full bg-sw-border" />
            </div>
            <p className="text-sm font-medium leading-snug text-sw-grey">{copy.more}</p>
          </li>
        </ul>
      </div>
    </div>
  )
}
