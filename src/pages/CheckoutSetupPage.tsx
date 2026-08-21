import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { loadQuizResults } from '@/funnels/twenty-eight-day/lib/quizStorage'
import { DEFAULT_PLANS } from '@/funnels/twenty-eight-day/data/plans'
import { loadClaudeQuizResults } from '@/funnels/claude/lib/claudeQuizStorage'
import { trackEvent } from '@/shared/lib/tracking'
import InlineTrialCheckout from '@/shared/components/InlineTrialCheckout'

const CHECKOUT_28DAY_KEY = 'sw_checkout_completed'
const CHECKOUT_CLAUDE_KEY = 'sw_checkout_claude_completed'
const CLAUDE_FUNNEL = 'claude-ai-certification'
const QUIZ_28DAY_PATH = '/quiz/28-day-ai-challenge'
const QUIZ_CLAUDE_PATH = '/quiz/claude-ai-certification'

function isClaudeFunnel(funnel: string): boolean {
  return funnel === CLAUDE_FUNNEL
}

export default function CheckoutSetupPage() {
  const [searchParams] = useSearchParams()
  const funnel = searchParams.get('funnel') ?? '28-day-ai-challenge'
  const claude = isClaudeFunnel(funnel)

  const results28 = loadQuizResults()
  const resultsClaude = loadClaudeQuizResults()
  const results = claude ? resultsClaude : results28

  const checkoutKey = claude ? CHECKOUT_CLAUDE_KEY : CHECKOUT_28DAY_KEY
  const quizPath = claude ? QUIZ_CLAUDE_PATH : QUIZ_28DAY_PATH

  const [succeeded, setSucceeded] = useState(() => {
    if (claude) {
      return (
        searchParams.get('trial') === '1' ||
        searchParams.get('redirect_status') === 'succeeded' ||
        window.localStorage.getItem(CHECKOUT_CLAUDE_KEY) === 'true'
      )
    }
    return (
      searchParams.get('redirect_status') === 'succeeded' ||
      window.localStorage.getItem(CHECKOUT_28DAY_KEY) === 'true'
    )
  })

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

  if (claude) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-sm text-sw-grey">
          We couldn&apos;t find an active checkout session. Please retake the quiz to start your trial.
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

  const email = results28?.email

  if (!email) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-sm text-sw-grey">
          We couldn&apos;t find an active session. Please retake the quiz to start your trial.
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

  const productId = DEFAULT_PLANS.find((p) => p.badge)?.id ?? DEFAULT_PLANS[0].id

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-6 px-6 py-10">
      <div className="text-center">
        <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-sw-blue-light">
          <Sparkles className="size-6 text-sw-blue" />
        </div>
        <h1 className="text-xl font-extrabold text-sw-dark">Complete your $1, 7-day trial</h1>
        <p className="mt-2 text-sm text-sw-grey">Secure checkout powered by Stripe.</p>
      </div>

      <InlineTrialCheckout
        email={email}
        productId={productId}
        funnel={funnel}
        onSuccess={() => setSucceeded(true)}
      />
    </div>
  )
}
