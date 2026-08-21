import { useState } from 'react'
import { Mail } from 'lucide-react'
import type { EmailScreen as EmailScreenDef } from '@/funnels/twenty-eight-day/types/quiz'

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
  const [touched, setTouched] = useState(false)

  const isValid = EMAIL_REGEX.test(email)

  const handleSubmit = () => {
    setTouched(true)
    if (!isValid) return
    onSubmit(email.trim(), consent)
  }

  return (
    <div className="flex flex-1 flex-col justify-center gap-6 pb-28 animate-fade-up">
      <div className="text-center">
        <div className="mx-auto mb-3 inline-flex items-center gap-1.5 rounded-full bg-sw-success-light px-3 py-1 text-xs font-bold text-sw-success">
          ✓ Your plan is ready
        </div>
        <h1 className="text-2xl font-extrabold text-sw-dark">
          {screen.title} <span className="text-sw-blue">{screen.subtitle}</span>
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {FEATURES.map((f) => (
          <div
            key={f.label}
            className="flex flex-col items-center gap-1 rounded-sw border border-sw-border bg-sw-white px-2 py-3"
          >
            <span className="text-lg" aria-hidden>
              {f.emoji}
            </span>
            <span className="text-center text-[10px] font-semibold text-sw-grey">{f.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="relative">
          <Mail className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-sw-grey" />
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="your@email.com"
            className={`w-full rounded-sw-sm border-[2px] py-3.5 pr-4 pl-11 text-base outline-none transition ${
              touched && !isValid ? 'border-sw-red' : 'border-sw-border focus:border-sw-blue'
            }`}
          />
        </div>
        {touched && !isValid ? (
          <p className="text-xs font-medium text-sw-red">Please enter a valid email address.</p>
        ) : null}
      </div>

      <label className="flex cursor-pointer items-start gap-2.5 text-xs text-sw-grey">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 size-4 shrink-0 rounded border-sw-border accent-[hsl(var(--sw-blue))]"
        />
        I&apos;d like to receive my AI plan, personal tips, and exclusive offers straight to my inbox.
      </label>

      <p className="text-center text-xs text-sw-grey">
        🎁 Make sure your email is valid — don&apos;t miss your exclusive bonus!
      </p>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-sw-border bg-sw-white/95 p-4 backdrop-blur safe-bottom">
        <div className="mx-auto max-w-xl">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-sw-sm bg-sw-blue py-3.5 font-extrabold tracking-wide text-sw-white transition hover:bg-sw-blue-hover"
          >
            UNLOCK MY PLAN →
          </button>
          <p className="mt-2 text-center text-[11px] text-sw-grey">
            🔒 We never share your email. Unsubscribe any time.
          </p>
        </div>
      </div>
    </div>
  )
}
