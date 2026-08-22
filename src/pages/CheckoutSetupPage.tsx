import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { loadQuizResults } from '@/funnels/twenty-eight-day/lib/quizStorage'
import { loadClaudeQuizResults } from '@/funnels/claude/lib/claudeQuizStorage'
import { trackEvent } from '@/shared/lib/tracking'

const CHECKOUT_28DAY_KEY = 'sw_checkout_completed'
const CHECKOUT_CLAUDE_KEY = 'sw_checkout_claude_completed'
const CLAUDE_FUNNEL = 'claude-ai-certification'
const QUIZ_28DAY_PATH = '/quiz/28-day-ai-challenge'
const QUIZ_CLAUDE_PATH = '/quiz/claude-ai-certification'

export default function CheckoutSetupPage() {
  const [searchParams] = useSearchParams()
  const funnel = searchParams.get('funnel') ?? '28-day-ai-challenge'
  const claude = funnel === CLAUDE_FUNNEL

  const results = claude ? loadClaudeQuizResults() : loadQuizResults()
  const checkoutKey = claude ? CHECKOUT_CLAUDE_KEY : CHECKOUT_28DAY_KEY
  const quizPath = claude ? QUIZ_CLAUDE_PATH : QUIZ_28DAY_PATH

  const [succeeded] = useState(
    () =>
      searchParams.get('trial') === '1' ||
      searchParams.get('redirect_status') === 'succeeded' ||
      window.localStorage.getItem(checkoutKey) === 'true',
  )

  useEffect(() => {
    if (succeeded) {
      window.localStorage.setItem(checkoutKey, 'true')
      trackEvent('TrialStarted', { funnel })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [succeeded])

  if (succeeded) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-5 px-6 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-sw-success-light">
          <CheckCircle2 className="size-8 text-sw-success" />
        </div>
        <h1 className="text-2xl font-extrabold text-sw-dark">
          You&apos;re all set{results?.name ? `, ${results.name}` : ''}! 🎉
        </h1>
        <p className="max-w-sm text-sm text-sw-grey">
          {claude
            ? 'Your Claude AI Certification plan is ready — your 7-day free trial has started. Check your email for login details and Day 1 of your personalised learning path.'
            : 'Your 7-day free trial has started. Check your email for login details and Day 1 of your 28-day plan.'}
        </p>
        <Link
          to="/"
          className="mt-2 rounded-sw-sm bg-sw-blue px-6 py-3 font-bold text-sw-white transition hover:bg-sw-blue-hover"
        >
          Back to home
        </Link>
      </div>
    )
  }

  if (claude || !loadQuizResults()?.email) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-sm text-sw-grey">
          {claude
            ? "We couldn't find an active checkout session. Please retake the quiz to start your trial."
            : "We couldn't find an active session. Please retake the quiz to start your trial."}
        </p>
        <Link
          to={quizPath}
          className="rounded-sw-sm bg-sw-blue px-6 py-3 font-bold text-sw-white transition hover:bg-sw-blue-hover"
        >
          Take the quiz
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm text-sw-grey">
        Card details are collected on your plan page. Return there to start your $1 trial.
      </p>
      <Link
        to={quizPath}
        className="rounded-sw-sm bg-sw-blue px-6 py-3 font-bold text-sw-white transition hover:bg-sw-blue-hover"
      >
        Back to my plan
      </Link>
    </div>
  )
}
