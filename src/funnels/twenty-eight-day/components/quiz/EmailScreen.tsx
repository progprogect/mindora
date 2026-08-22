import { useState } from 'react'
import type { EmailScreen as EmailScreenDef } from '@/funnels/twenty-eight-day/types/quiz'
import QuizStickyCta from '@/funnels/twenty-eight-day/components/quiz/QuizStickyCta'

interface EmailScreenProps {
  screen: EmailScreenDef
  onSubmit: (email: string, consent: boolean) => void
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FEATURES = [
  { emoji: '📅', label: '28-day path' },
  { emoji: '🎯', label: 'Personal plan' },
  { emoji: '🏆', label: 'Exclusive access' },
]

export default function EmailScreen({ screen, onSubmit }: EmailScreenProps) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(true)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = () => {
    const trimmed = email.trim()
    if (!EMAIL_REGEX.test(trimmed)) {
      setError('Please enter a valid email address')
      return
    }
    setError('')
    setSubmitting(true)
    onSubmit(trimmed, consent)
  }

  return (
    <>
      <div className="flex w-full flex-1 flex-col px-4 pt-6 pb-32 animate-fade-up">
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sw-success/20 bg-sw-success/10 px-3 py-1.5 text-xs font-bold text-sw-success">
            ✓ Your plan is ready
          </span>
        </div>

        <h1 className="mb-2 text-center text-[1.75rem] leading-tight font-extrabold text-sw-dark sm:text-4xl">
          {screen.title}
        </h1>
        <p className="mb-4 text-center text-[1.75rem] leading-tight font-extrabold text-sw-blue sm:text-4xl">
          {screen.subtitle}
        </p>

        <div className="mb-6 flex justify-center gap-4">
          {FEATURES.map((f) => (
            <div key={f.label} className="flex flex-col items-center gap-1">
              <span className="text-xl" aria-hidden>
                {f.emoji}
              </span>
              <span className="text-xs font-semibold text-sw-grey">{f.label}</span>
            </div>
          ))}
        </div>

        <div className="mb-3">
          <div className="relative">
            <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-lg text-sw-grey">
              ✉️
            </span>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="your@email.com"
              className="w-full rounded-2xl border-2 border-sw-grey-border bg-white py-4 pr-5 pl-11 text-base text-sw-dark outline-none transition-colors placeholder:text-sw-grey focus:border-sw-blue"
            />
          </div>
          {error ? <p className="mt-1.5 ml-1 text-xs text-sw-red">{error}</p> : null}
        </div>

        <label className="mb-4 flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="peer sr-only"
          />
          <div
            aria-hidden
            className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
              consent ? 'border-sw-blue bg-sw-blue' : 'border-sw-grey-border bg-white'
            }`}
          >
            {consent ? (
              <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 12 12">
                <path
                  d="M2 6l3 3 5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : null}
          </div>
          <span className="text-xs leading-relaxed text-sw-grey">
            I&apos;d like to receive my AI plan, personal tips, and exclusive offers straight to my inbox.
          </span>
        </label>

        <div className="mb-2 flex items-center gap-3 rounded-2xl border border-sw-success/20 bg-sw-success/8 px-4 py-3">
          <span className="flex-shrink-0 text-2xl" aria-hidden>
            🎁
          </span>
          <p className="text-sm leading-snug text-sw-dark">
            Make sure your email is valid —{' '}
            <span className="font-bold text-sw-success">don&apos;t miss your exclusive bonus!</span>
          </p>
        </div>

        <p className="mt-2 text-center text-xs text-sw-grey">🔒 We never share your email. Unsubscribe any time.</p>
      </div>

      <QuizStickyCta>
        <button type="button" onClick={handleSubmit} disabled={submitting} className="sw-cta">
          {submitting ? 'Unlocking your plan...' : 'UNLOCK MY PLAN →'}
        </button>
      </QuizStickyCta>
    </>
  )
}
