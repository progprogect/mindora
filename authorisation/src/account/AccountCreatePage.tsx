import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Authenticated, AuthLoading, Unauthenticated } from '@/auth/authGates'
import AuthSpinner from '@/auth/AuthSpinner'
import { useCurrentUser, useSession } from '@/auth/session'
import { apiErrorMessage, completeProfile, sendOtp, verifyOtp } from '@/lib/api'
import { readQuizResults } from '@/lib/quizResults'
import BrandWordmark from '@/shared/BrandWordmark'

const PLAN_IDS = ['week1', 'week4', 'week12', 'free'] as const
const PLAN_LABELS: Record<string, string> = {
  week1: '1-Week Plan',
  week4: '28-Day Plan',
  week12: '12-Week Plan',
  free: 'Free Plan',
}

function WordmarkHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-sw-grey-border">
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-center">
        <BrandWordmark />
      </div>
    </header>
  )
}

function CreateAuthenticated({ name, plan }: { name: string; plan: string }) {
  const navigate = useNavigate()
  const user = useCurrentUser()
  const { refresh } = useSession()
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (started || user === undefined) return
    setStarted(true)
    if (user?.onboardingComplete) {
      navigate('/app/dashboard', { replace: true })
      return
    }
    if (user?.planTier) {
      navigate('/account/upgrade', { replace: true })
      return
    }

    const quiz = readQuizResults()
    const planTier = PLAN_IDS.includes(plan as (typeof PLAN_IDS)[number]) ? plan : 'free'
    void completeProfile({
      name: name || quiz?.name || 'Friend',
      planTier,
      quizAnswers: quiz?.answers,
      quizRole: quiz?.role,
      funnelSource: quiz?.quizType || quiz?.funnel,
    })
      .then(async () => {
        await refresh({ silent: true })
        try {
          localStorage.removeItem('sw_quiz_results')
        } catch {
          /* ignore */
        }
        navigate('/account/upgrade', { replace: true })
      })
      .catch(() => navigate('/account/upgrade', { replace: true }))
  }, [user, started, name, plan, navigate, refresh])

  return <AuthSpinner message="Setting up your account…" />
}

function CreateForm({
  initialEmail,
  name,
  plan,
}: {
  initialEmail: string
  name: string
  plan: string
}) {
  const { refresh } = useSession()
  const [step, setStep] = useState<'send' | 'code'>('send')
  const [email, setEmail] = useState(initialEmail)
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const inputs = useRef<Array<HTMLInputElement | null>>([])
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [step])

  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current)
    },
    [],
  )

  const startCooldown = () => {
    setCooldown(30)
    timer.current = setInterval(() => {
      setCooldown((n) => {
        if (n <= 1) {
          if (timer.current) clearInterval(timer.current)
          return 0
        }
        return n - 1
      })
    }, 1000)
  }

  const sendCode = async () => {
    if (!email || busy) return
    setError(null)
    setBusy(true)
    try {
      await sendOtp(email)
      setStep('code')
      startCooldown()
      setTimeout(() => inputs.current[0]?.focus(), 200)
    } catch (err) {
      setError(apiErrorMessage(err, 'Failed to send code — please check your email address and try again.'))
    } finally {
      setBusy(false)
    }
  }

  const resend = async () => {
    if (cooldown > 0 || busy) return
    setDigits(['', '', '', '', '', ''])
    setError(null)
    setBusy(true)
    try {
      await sendOtp(email)
      startCooldown()
      setTimeout(() => inputs.current[0]?.focus(), 100)
    } catch (err) {
      setError(apiErrorMessage(err, 'Failed to resend code. Please try again.'))
    } finally {
      setBusy(false)
    }
  }

  const verify = async (value?: string) => {
    const code = value ?? digits.join('')
    if (code.length < 6 || busy) return
    setError(null)
    setBusy(true)
    try {
      await verifyOtp(email, code)
      await refresh()
    } catch (err) {
      setError(apiErrorMessage(err, 'Invalid or expired code. Please try again.'))
      setDigits(['', '', '', '', '', ''])
      setTimeout(() => inputs.current[0]?.focus(), 100)
    } finally {
      setBusy(false)
    }
  }

  const onDigit = (index: number, raw: string) => {
    if (raw.length > 1) {
      const pasted = raw.replace(/\D/g, '').slice(0, 6)
      if (pasted.length === 6) {
        setDigits(pasted.split(''))
        inputs.current[5]?.focus()
        void verify(pasted)
        return
      }
    }
    const char = raw.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[index] = char
    setDigits(next)
    if (char && index < 5) inputs.current[index + 1]?.focus()
  }

  const onKey = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      void verify()
      return
    }
    if (e.key === 'Backspace') {
      if (digits[index]) {
        const next = [...digits]
        next[index] = ''
        setDigits(next)
      } else if (index > 0) {
        inputs.current[index - 1]?.focus()
        const next = [...digits]
        next[index - 1] = ''
        setDigits(next)
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputs.current[index + 1]?.focus()
    }
  }

  const planLabel = PLAN_LABELS[plan] || 'Free Plan'
  const firstName = name ? name.split(' ')[0] : ''
  const filled = digits.filter(Boolean).length

  if (step === 'code') {
    return (
      <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
        <WordmarkHeader />
        <main className="flex-1 flex flex-col px-4 pt-10 pb-40 max-w-lg mx-auto w-full">
          <div className="animate-fade-up">
            <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-sw-blue-light to-sw-blue/20 flex items-center justify-center mb-6 relative">
              <div className="w-12 h-12 rounded-2xl bg-sw-blue flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div
                className="absolute inset-0 rounded-3xl border-2 border-sw-blue/30 animate-ping"
                style={{ animationDuration: '2s' }}
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-sw-dark text-center leading-tight mb-2">
              Check your inbox
            </h1>
            <p className="text-sm text-sw-grey text-center mb-8 leading-relaxed">
              We sent a 6-digit code to <span className="font-semibold text-sw-dark">{email}</span>
            </p>
            <div className="flex gap-2 sm:gap-3 justify-center mb-6">
              {digits.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputs.current[i] = el
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="\d"
                  maxLength={6}
                  autoComplete="one-time-code"
                  value={digit}
                  onChange={(e) => onDigit(i, e.target.value)}
                  onKeyDown={(e) => onKey(i, e)}
                  onFocus={(e) => e.target.select()}
                  disabled={busy}
                  aria-label={`Digit ${i + 1}`}
                  className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-extrabold rounded-2xl border-2 transition-all outline-none ${
                    digit
                      ? 'border-sw-blue bg-sw-blue-light/40 text-sw-blue'
                      : 'border-sw-grey-border bg-white text-sw-dark'
                  } focus:border-sw-blue focus:bg-sw-blue-light/20 disabled:opacity-50`}
                />
              ))}
            </div>
            <div className="flex justify-center gap-1.5 mb-4">
              {digits.map((digit, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-200 ${digit ? 'bg-sw-blue w-5' : 'bg-sw-grey-border w-3'}`}
                />
              ))}
            </div>
            {error ? (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
                <svg
                  className="w-4 h-4 text-red-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            ) : null}
            <div className="text-center">
              <button
                type="button"
                onClick={() => void resend()}
                disabled={cooldown > 0 || busy}
                className="text-sm text-sw-grey disabled:opacity-50"
              >
                Didn&apos;t receive it?{' '}
                {cooldown > 0 ? (
                  <span className="text-sw-grey font-semibold">Resend in {cooldown}s</span>
                ) : (
                  <span className="text-sw-blue font-semibold">Send again</span>
                )}
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setStep('send')
                setDigits(['', '', '', '', '', ''])
                setError(null)
              }}
              disabled={busy}
              className="mt-3 text-xs text-sw-grey text-center w-full"
            >
              ← Use a different email
            </button>
          </div>
        </main>
        <div
          className="fixed bottom-0 left-0 right-0 px-4 pt-10 z-50"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.92) 40%, white 65%)',
          }}
        >
          <div className="max-w-lg mx-auto">
            <button
              type="button"
              onClick={() => void verify()}
              disabled={busy || filled < 6}
              className="w-full bg-sw-blue hover:bg-sw-blue-hover text-white font-bold py-4 rounded-full text-base transition-all active:scale-[0.98] shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {busy ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Verifying…
                </span>
              ) : (
                'Verify & Create Account'
              )}
            </button>
          </div>
          <div
            style={{
              paddingTop: 56,
              paddingBottom: 'env(safe-area-inset-bottom)',
              backgroundColor: 'white',
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      <WordmarkHeader />
      <main className="flex-1 flex flex-col px-4 pt-12 pb-40 max-w-lg mx-auto w-full">
        <div className="animate-fade-up">
          {plan && plan !== 'free' ? (
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sw-blue-light text-sw-blue text-xs font-semibold">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {planLabel} selected
              </span>
            </div>
          ) : null}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-sw-dark text-center leading-tight mb-3">
            {firstName ? `Almost there, ${firstName}!` : "You're almost in!"}
          </h1>
          <p className="text-sm text-sw-grey text-center mb-10 leading-relaxed">
            We&apos;ll send a quick code to verify your email
            <br className="hidden sm:block" /> and create your MindoraAcademy account.
          </p>
          <label className="block text-sm font-semibold text-sw-dark mb-2">Your email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void sendCode()
            }}
            placeholder="you@example.com"
            required
            disabled={busy}
            className="w-full border-2 border-sw-grey-border rounded-2xl px-5 py-4 text-base text-sw-dark placeholder:text-sw-grey/60 focus:outline-none focus:border-sw-blue transition-colors bg-white"
          />
          {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}
          <p className="mt-6 text-xs text-sw-grey text-center">
            🔒 No password needed · Your data is private & secure
          </p>
        </div>
      </main>
      <div
        className="fixed bottom-0 left-0 right-0 px-4 pt-10 z-50"
        style={{ background: 'linear-gradient(to bottom, transparent, white 45%)' }}
      >
        <div className="max-w-lg mx-auto">
          <button
            type="button"
            onClick={() => void sendCode()}
            disabled={busy || !email}
            className="w-full bg-sw-blue hover:bg-sw-blue-hover text-white font-bold py-4 rounded-full text-base transition-all active:scale-[0.98] shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {busy ? 'Sending code…' : 'Send Verification Code'}
          </button>
        </div>
        <div
          style={{
            paddingTop: 56,
            paddingBottom: 'env(safe-area-inset-bottom)',
            backgroundColor: 'white',
          }}
        />
      </div>
    </div>
  )
}

export default function AccountCreatePage() {
  const [params] = useSearchParams()
  const email = params.get('email') ?? ''
  const name = params.get('name') ?? ''
  const plan = params.get('plan') ?? 'free'

  return (
    <>
      <AuthLoading>
        <AuthSpinner />
      </AuthLoading>
      <Unauthenticated>
        <CreateForm initialEmail={email} name={name} plan={plan} />
      </Unauthenticated>
      <Authenticated>
        <CreateAuthenticated name={name} plan={plan} />
      </Authenticated>
    </>
  )
}
