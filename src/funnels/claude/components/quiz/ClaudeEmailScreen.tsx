import { useState } from 'react'
import { Check, Mail } from 'lucide-react'

interface ClaudeEmailScreenProps {
  onSubmit: (email: string, consent: boolean) => Promise<void> | void
}

const FEATURES = [
  { icon: '📅', text: '28-day path' },
  { icon: '🎯', text: 'Personal plan' },
  { icon: '🏆', text: 'Exclusive access' },
]

/** Port of `y()` (`EmailScreen-*.js`, `variant="ai"`) — consent checkbox + UNLOCK MY PLAN CTA. */
export default function ClaudeEmailScreen({ onSubmit }: ClaudeEmailScreenProps) {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [consent, setConsent] = useState(true)

  const handleSubmit = async () => {
    const trimmed = email.trim().toLowerCase()
    if (!trimmed || !trimmed.includes('@') || !trimmed.includes('.')) {
      setError('Please enter a valid email address')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      await onSubmit(trimmed, consent)
    } catch {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pt-6 pb-32 animate-fade-up">
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sw-success/20 bg-sw-success-light px-3 py-1.5 text-xs font-bold text-sw-success">
            ✓ Your plan is ready
          </span>
        </div>
        <h1 className="mb-2 text-center text-[1.75rem] leading-tight font-extrabold text-sw-dark sm:text-4xl">
          Enter your email to get your
        </h1>
        <p className="mb-4 text-center text-[1.75rem] leading-tight font-extrabold text-sw-blue sm:text-4xl">
          Personal AI Plan!
        </p>

        <div className="mb-6 flex justify-center gap-4">
          {FEATURES.map((f) => (
            <div key={f.text} className="flex flex-col items-center gap-1">
              <span className="text-xl">{f.icon}</span>
              <span className="text-xs font-semibold text-sw-grey">{f.text}</span>
            </div>
          ))}
        </div>

        <div className="mb-3">
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-sw-grey" />
            <input
              type="email"
              name="email"
              id="claude-quiz-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="your@email.com"
              autoComplete="email"
              className="w-full rounded-2xl border-2 border-sw-border bg-sw-white py-4 pr-5 pl-11 text-base text-sw-dark placeholder:text-sw-grey outline-none transition-colors focus:border-sw-blue"
            />
          </div>
          {error ? <p className="mt-1.5 ml-1 text-xs text-sw-red">{error}</p> : null}
        </div>

        <label className="mb-4 flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="marketingConsent"
            id="claude-quiz-consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="peer sr-only"
          />
          <span
            aria-hidden
            className={`mt-0.5 flex size-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
              consent ? 'border-sw-blue bg-sw-blue' : 'border-sw-border bg-sw-white'
            }`}
          >
            {consent ? <Check className="size-3 text-sw-white" strokeWidth={2.5} /> : null}
          </span>
          <span className="text-xs leading-relaxed text-sw-grey">
            I&apos;d like to receive my AI plan, personal tips, and exclusive offers straight to my inbox.
          </span>
        </label>

        <div className="mb-2 flex items-center gap-3 rounded-2xl border border-sw-success/20 bg-sw-success-light px-4 py-3">
          <span className="flex-shrink-0 text-2xl">🎁</span>
          <p className="text-sm leading-snug text-sw-dark">
            Make sure your email is valid —{' '}
            <span className="font-bold text-sw-success">don&apos;t miss your exclusive bonus!</span>
          </p>
        </div>

        <p className="mt-2 text-center text-xs text-sw-grey">🔒 We never share your email. Unsubscribe any time.</p>
      </div>

      <div
        className="fixed inset-x-0 bottom-0 z-50 px-4 pt-10"
        style={{ background: 'linear-gradient(to bottom, transparent, white 45%)' }}
      >
        <div className="mx-auto max-w-lg">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full rounded-full bg-sw-blue py-4 text-base font-bold text-sw-white shadow-md transition-all duration-150 hover:bg-sw-blue-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="size-4 animate-spin rounded-full border-2 border-sw-white border-t-transparent" />
                Unlocking your plan...
              </span>
            ) : (
              'UNLOCK MY PLAN →'
            )}
          </button>
        </div>
        <div style={{ paddingTop: '56px', paddingBottom: 'env(safe-area-inset-bottom)' }} />
      </div>
    </>
  )
}
