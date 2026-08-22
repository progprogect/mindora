import { useEffect, useState } from 'react'
import type { QuizAnswers, QuizProfile } from '@/funnels/twenty-eight-day/types/quiz'
import AIScoreCard from '@/funnels/twenty-eight-day/components/AIScoreCard'

interface SalesBeforeAfterScreenProps {
  profile: QuizProfile
  answers: QuizAnswers
}

const WITHOUT: Record<string, string[]> = {
  'no-plan': ['No system or clear plan', 'Randomly trying AI tools', 'No measurable progress'],
  'no-time': ['No time to learn new skills', 'Falling further behind daily', 'Overwhelm and paralysis'],
  'too-complex': ['AI feels too complicated', 'Confused by hype and jargon', 'Starting and stopping'],
  'no-start': ["Don't know where to begin", 'Watching others pull ahead', 'Guessing instead of doing'],
}

const WITH: Record<string, string[]> = {
  'no-plan': ['Clear step-by-step daily structure', 'One skill per day, tracked progress', 'Confidence in 28 days'],
  'no-time': ['Just 10 mins/day — proven results', 'Skill-up faster than your peers', 'Results from week one'],
  'too-complex': ['Simple lessons, zero jargon', 'Real tools explained clearly', 'AI makes sense, finally'],
  'no-start': ['A clear path starting from day 1', 'Daily momentum builds fast', 'Acting with confidence'],
}

const GOAL_RESULT: Record<string, string> = {
  'grow-role': 'Promoted and earning more',
  'switch-career': 'Career pivot complete',
  'side-income': 'AI income stream unlocked',
  creative: 'Creative output multiplied',
  'stay-current': '10 steps ahead',
  other: 'AI working for you',
}

export default function SalesBeforeAfterScreen({ profile, answers }: SalesBeforeAfterScreenProps) {
  const [certDate, setCertDate] = useState('')
  const blocker = answers['q9-blocker'] ?? 'no-plan'
  const withoutBullets = WITHOUT[blocker] ?? WITHOUT['no-plan']
  const withBullets = WITH[blocker] ?? WITH['no-plan']
  const result = GOAL_RESULT[answers['q2-goal'] ?? 'other'] ?? 'AI working for you'

  useEffect(() => {
    const date = new Date()
    date.setDate(date.getDate() + 28)
    setCertDate(date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }))
  }, [])

  return (
    <div className="flex flex-1 flex-col gap-5 pt-4 pb-32 animate-fade-up">
      <div className="text-center">
        <h1 className="mb-2 text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
          Your 28-Day
          <br />
          Transformation
        </h1>
        {certDate ? (
          <p className="mt-2 text-sm text-sw-grey">
            We expect you to be AI-certified by{' '}
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
            <p className="text-xs font-bold uppercase tracking-wide text-red-400">Without</p>
            <p className="text-sm font-extrabold leading-tight text-sw-dark">SuccessWise.ai</p>
          </div>
          <div className="border-t border-red-200 pt-3">
            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-red-400">Struggles:</p>
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
            <p className="text-xs font-bold uppercase tracking-wide text-green-500">With</p>
            <p className="text-sm font-extrabold leading-tight text-sw-dark">SuccessWise.ai</p>
          </div>
          <div className="border-t border-green-200 pt-3">
            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-green-500">Solutions:</p>
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
          <p className="mb-0.5 text-xs font-bold tracking-wide text-sw-grey uppercase">Your AI Readiness</p>
          <p className="text-sm leading-snug font-extrabold text-sw-dark">{profile.scoreLabel}</p>
          <p className="mt-0.5 text-xs text-sw-grey">{profile.scoreTone}</p>
        </div>
      </div>
    </div>
  )
}
