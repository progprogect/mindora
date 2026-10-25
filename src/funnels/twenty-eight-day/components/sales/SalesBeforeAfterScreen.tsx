import { useEffect, useMemo, useState } from 'react'
import type { QuizAnswers, QuizProfile } from '@/funnels/twenty-eight-day/types/quiz'
import AIScoreCard from '@/funnels/twenty-eight-day/components/AIScoreCard'
import { salesBeforeAfterCopy } from '@/funnels/twenty-eight-day/data/funnelCopy'
import type { FunnelLocale } from '@/funnels/twenty-eight-day/data/quizScreens'
import { useI18n } from '../../../../../authorisation/src/i18n/I18nProvider'

interface SalesBeforeAfterScreenProps {
  profile: QuizProfile
  answers: QuizAnswers
}

export default function SalesBeforeAfterScreen({ profile, answers }: SalesBeforeAfterScreenProps) {
  const { locale } = useI18n()
  const copy = useMemo(() => salesBeforeAfterCopy(locale as FunnelLocale), [locale])
  const [certDate, setCertDate] = useState('')
  const blocker = answers['q9-blocker'] ?? 'no-plan'
  const withoutBullets =
    copy.withoutBullets[blocker as keyof typeof copy.withoutBullets] ?? copy.withoutBullets['no-plan']
  const withBullets = copy.withBullets[blocker as keyof typeof copy.withBullets] ?? copy.withBullets['no-plan']
  const result =
    copy.goalResult[answers['q2-goal'] as keyof typeof copy.goalResult] ?? copy.defaultResult

  useEffect(() => {
    const date = new Date()
    date.setDate(date.getDate() + 28)
    setCertDate(
      date.toLocaleDateString(copy.dateLocale, { day: 'numeric', month: 'long', year: 'numeric' }),
    )
  }, [copy.dateLocale])

  return (
    <div className="flex flex-1 flex-col gap-5 pt-4 pb-32 animate-fade-up">
      <div className="text-center">
        <h1 className="mb-2 text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
          {copy.titleLine1}
          <br />
          {copy.titleLine2}
        </h1>
        {certDate ? (
          <p className="mt-2 text-sm text-sw-grey">
            {copy.certBy}{' '}
            <span className="font-bold text-sw-dark underline decoration-sw-blue decoration-2 underline-offset-2">
              {certDate}
            </span>
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-4">
          <div className="mb-4 text-center">
            <div className="mb-2 text-4xl">😟</div>
            <p className="text-xs font-bold uppercase tracking-wide text-red-400">{copy.without}</p>
            <p className="text-sm font-extrabold leading-tight text-sw-dark">MindoraAcademy.com</p>
          </div>
          <div className="border-t border-red-200 pt-3">
            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-red-400">{copy.struggles}</p>
            <ul className="flex flex-col gap-2">
              {withoutBullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-red-400" />
                  <p className="text-xs leading-snug text-sw-dark">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-4">
          <div className="mb-4 text-center">
            <div className="mb-2 text-4xl">😊</div>
            <p className="text-xs font-bold uppercase tracking-wide text-green-500">{copy.with}</p>
            <p className="text-sm font-extrabold leading-tight text-sw-dark">MindoraAcademy.com</p>
          </div>
          <div className="border-t border-green-200 pt-3">
            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-green-500">{copy.solutions}</p>
            <ul className="flex flex-col gap-2">
              {withBullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-green-500" />
                  <p className="text-xs leading-snug text-sw-dark">{item}</p>
                </li>
              ))}
            </ul>
            <p className="mt-2 border-t border-green-200 pt-2 text-center text-xs font-extrabold text-green-600">
              {result} ✓
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-sw-blue-border bg-sw-blue-light p-5">
        <AIScoreCard profile={profile} compact />
        <div>
          <p className="mb-0.5 text-xs font-bold tracking-wide text-sw-grey uppercase">{copy.readiness}</p>
          <p className="text-sm leading-snug font-extrabold text-sw-dark">{profile.scoreLabel}</p>
          <p className="mt-0.5 text-xs text-sw-grey">{profile.scoreTone}</p>
        </div>
      </div>
    </div>
  )
}
