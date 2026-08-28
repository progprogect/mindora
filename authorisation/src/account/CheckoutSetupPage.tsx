import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Authenticated, AuthLoading, Unauthenticated } from '@/auth/authGates'
import { useCurrentUser, useSession } from '@/auth/session'
import {
  apiErrorMessage,
  completeProfile,
  sendOtp,
  syncEmailAfterSetup,
  updateFunnelSource,
  verifyOtp,
} from '@/lib/api'
import { FOCUS_FROM_QUIZ, readQuizResults } from '@/lib/quizResults'
import { track } from '@/lib/track'

const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function InboxHint({ email }: { email: string }) {
  const domain = email.split('@')[1]?.toLowerCase() || ''
  const provider =
    domain === 'gmail.com' || domain === 'googlemail.com'
      ? { name: 'Gmail', url: 'https://mail.google.com', icon: '📧' }
      : domain === 'outlook.com' ||
          domain === 'hotmail.com' ||
          domain === 'live.com' ||
          domain === 'msn.com'
        ? { name: 'Outlook', url: 'https://outlook.live.com', icon: '📬' }
        : domain === 'yahoo.com' || domain === 'ymail.com'
          ? { name: 'Yahoo Mail', url: 'https://mail.yahoo.com', icon: '📨' }
          : domain === 'icloud.com' || domain === 'me.com' || domain === 'mac.com'
            ? { name: 'iCloud Mail', url: 'https://www.icloud.com/mail', icon: '📩' }
            : null
  if (!provider) return null
  return (
    <a
      href={provider.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-sw-grey-border text-sm font-semibold text-sw-dark mb-5 active:scale-[0.98] transition-all hover:border-sw-blue/40"
    >
      <span className="text-base">{provider.icon}</span>
      Open {provider.name}
    </a>
  )
}

function SetupAuthenticated() {
  const navigate = useNavigate()
  const user = useCurrentUser()
  const { refresh } = useSession()
  const ran = useRef(false)

  useEffect(() => {
    if (user === undefined || ran.current) return
    ran.current = true

    const quiz = readQuizResults()
    const funnel = quiz?.quizType || quiz?.funnel

    if (user?.onboardingComplete) {
      if (funnel) {
        const focus = FOCUS_FROM_QUIZ[funnel]
        void updateFunnelSource({ funnelSource: funnel, focusCategory: focus }).finally(() =>
          navigate('/app/dashboard', { replace: true }),
        )
      } else {
        navigate('/app/dashboard', { replace: true })
      }
      return
    }

    if (user?.planTier) {
      if (funnel) {
        const focus = FOCUS_FROM_QUIZ[funnel]
        void updateFunnelSource({ funnelSource: funnel, focusCategory: focus }).finally(() =>
          navigate('/account/welcome', { replace: true }),
        )
      } else {
        navigate('/account/welcome', { replace: true })
      }
      return
    }

    let quizAnswers
    let quizRole
    let funnelSource
    let name = 'Friend'
    let planTier = 'week4'
    if (quiz) {
      quizAnswers = quiz.answers
      quizRole = quiz.role || quiz.identity
      funnelSource = quiz.quizType || quiz.funnel
      name = quiz.name || 'Friend'
      const product = quiz.product || quiz.plan || localStorage.getItem('sw_selected_plan') || 'week4'
      if (['week1', 'week4', 'week12'].includes(product)) planTier = product
    }

    const checkoutEmail = localStorage.getItem('sw_checkout_email') ?? ''
    const checkoutFunnel = localStorage.getItem('sw_checkout_funnel') ?? ''
    const currentEmail = user?.email ?? ''

    const sync = async () => {
      if (checkoutEmail && currentEmail) {
        try {
          await syncEmailAfterSetup({
            oldEmail: checkoutEmail,
            newEmail: '',
            funnel: checkoutFunnel || undefined,
          })
        } catch {
          /* non-fatal */
        }
      }
      try {
        localStorage.removeItem('sw_checkout_email')
        localStorage.removeItem('sw_checkout_funnel')
      } catch {
        /* ignore */
      }
    }

    void completeProfile({
      name,
      planTier,
      quizAnswers,
      quizRole,
      funnelSource,
    })
      .then(async () => {
        await sync()
        await refresh({ silent: true })
        track('otp')
        navigate('/account/welcome', { replace: true })
      })
      .catch(async () => {
        await sync()
        track('otp_profile_error')
        navigate('/account/welcome', { replace: true })
      })
  }, [user, navigate, refresh])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full h-1" style={{ backgroundColor: 'hsl(var(--sw-grey-light))' }}>
        <div
          className="h-full transition-all duration-500"
          style={{ width: '100%', backgroundColor: 'hsl(var(--sw-blue))' }}
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-sw-blue-border border-t-sw-blue rounded-full animate-spin" />
        <p className="text-sm text-sw-grey">Setting up your account…</p>
      </div>
    </div>
  )
}

function SetupForm() {
  const { refresh } = useSession()
  const [step, setStep] = useState<'email' | 'code'>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const codeRef = useRef<HTMLInputElement>(null)
  const autoVerify = useRef(false)

  useEffect(() => {
    try {
      const quiz = JSON.parse(localStorage.getItem('sw_quiz_results') ?? '{}') as { email?: string }
      if (quiz.email) setEmail(quiz.email)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    if (step === 'code') codeRef.current?.focus()
  }, [step])

  useEffect(() => {
    autoVerify.current = false
  }, [code])

  useEffect(() => {
    if (code.length >= 6 && step === 'code' && !busy && !autoVerify.current) {
      autoVerify.current = true
      const t = setTimeout(() => {
        setBusy(true)
        track('setup_code_submitted', { email, auto: true })
        void verifyOtp(email, code)
          .then(() => {
            track('setup_verified', { email })
            return refresh()
          })
          .catch((err) => setError(apiErrorMessage(err, 'Invalid or expired code. Please try again.')))
          .finally(() => {
            setBusy(false)
          })
      }, 300)
      return () => clearTimeout(t)
    }
  }, [code, step, busy, email, refresh])

  const sendCode = async () => {
    if (!email || busy) return
    if (!EMAIL_OK.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError(null)
    setBusy(true)
    track('setup_email_submitted', { email })
    try {
      await sendOtp(email)
      setStep('code')
    } catch (err) {
      setError(apiErrorMessage(err, 'Failed to send verification code. Please check your email and try again.'))
    } finally {
      setBusy(false)
    }
  }

  const verifyCode = async () => {
    if (!code || busy) return
    setError(null)
    setBusy(true)
    track('setup_code_submitted', { email })
    try {
      await verifyOtp(email, code)
      track('setup_verified', { email })
      await refresh()
    } catch (err) {
      setError(apiErrorMessage(err, 'Invalid or expired code. Please try again.'))
    } finally {
      setBusy(false)
    }
  }

  const resend = async () => {
    setError(null)
    setBusy(true)
    try {
      await sendOtp(email)
      setError(null)
    } catch (err) {
      setError(apiErrorMessage(err, 'Failed to resend code.'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full h-1" style={{ backgroundColor: 'hsl(var(--sw-grey-light))' }}>
        <div
          className="h-full transition-all duration-500"
          style={{
            width: step === 'email' ? '33%' : '66%',
            backgroundColor: 'hsl(var(--sw-blue))',
          }}
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-10 max-w-sm mx-auto w-full">
        {step === 'email' ? (
          <>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-5"
              style={{ backgroundColor: 'hsl(var(--sw-success) / 0.1)' }}
            >
              🎉
            </div>
            <h1 className="text-2xl font-extrabold text-sw-dark text-center mb-2">
              You&apos;re in! Set up your account
            </h1>
            <p className="text-sm text-sw-grey text-center mb-4 leading-relaxed">
              Enter the email you&apos;d like to use for your account. We&apos;ll send a quick
              verification code.
            </p>
            <div className="w-full bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6">
              <p className="text-xs text-amber-800 text-center leading-relaxed font-medium">
                ⚠️ All login codes and course access emails will be sent to this address. Make sure
                it&apos;s an email you can access.
              </p>
            </div>
            <div className="w-full mb-4">
              <label className="block text-sm font-semibold text-sw-dark mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') void sendCode()
                }}
                placeholder="your@email.com"
                className="w-full px-4 py-3.5 rounded-xl border-2 text-base text-sw-dark outline-none transition-colors"
                style={{
                  borderColor: error ? 'hsl(0 72% 51%)' : 'hsl(var(--sw-grey-border))',
                }}
                autoFocus
                autoComplete="email"
              />
            </div>
            {error ? (
              <p className="text-sm font-medium mb-3 text-center" style={{ color: 'hsl(0 72% 51%)' }}>
                {error}
              </p>
            ) : null}
            <button
              type="button"
              onClick={() => void sendCode()}
              disabled={!email || busy}
              className="w-full py-4 rounded-xl font-bold text-white text-base disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
              style={{ backgroundColor: 'hsl(var(--sw-blue))' }}
            >
              {busy ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Sending code...
                </span>
              ) : (
                'Continue'
              )}
            </button>
            <p className="text-xs text-sw-grey text-center mt-4">
              We&apos;ll send a 6-digit code to verify your email. No password needed.
            </p>
          </>
        ) : (
          <>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-5"
              style={{ backgroundColor: 'hsl(var(--sw-blue) / 0.1)' }}
            >
              ✉️
            </div>
            <h1 className="text-2xl font-extrabold text-sw-dark text-center mb-2">Check your inbox</h1>
            <p className="text-sm text-sw-grey text-center mb-1 leading-relaxed">
              We sent a 6-digit code to
            </p>
            <p className="text-sm font-bold text-sw-dark text-center mb-4">{email}</p>
            <InboxHint email={email} />
            <div className="w-full mb-4">
              <label className="block text-xs font-semibold text-sw-grey uppercase tracking-wide mb-2 text-center">
                Enter your 6-digit code
              </label>
              <input
                ref={codeRef}
                type="text"
                inputMode="numeric"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 8))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') void verifyCode()
                }}
                placeholder="• • • • • •"
                className="w-full px-4 py-4 rounded-xl border-2 text-center text-2xl font-bold tracking-[0.4em] text-sw-dark outline-none transition-colors"
                style={{
                  borderColor: error
                    ? 'hsl(0 72% 51%)'
                    : code.length >= 6
                      ? 'hsl(var(--sw-success))'
                      : 'hsl(var(--sw-grey-border))',
                }}
                autoComplete="one-time-code"
              />
              {code.length > 0 && code.length < 6 ? (
                <p className="text-xs text-sw-grey text-center mt-1.5">
                  {6 - code.length} more digits needed
                </p>
              ) : null}
            </div>
            {error ? (
              <p className="text-sm font-medium mb-3 text-center" style={{ color: 'hsl(0 72% 51%)' }}>
                {error}
              </p>
            ) : null}
            <button
              type="button"
              onClick={() => void verifyCode()}
              disabled={!code || code.length < 6 || busy}
              className="w-full py-4 rounded-xl font-bold text-white text-base disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
              style={{ backgroundColor: 'hsl(var(--sw-blue))' }}
            >
              {busy ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Verifying...
                </span>
              ) : (
                'Verify & Complete Setup'
              )}
            </button>
            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                type="button"
                onClick={() => void resend()}
                disabled={busy}
                className="text-sm text-sw-blue font-semibold disabled:opacity-50"
              >
                Resend code
              </button>
              <span className="text-sw-grey-border">|</span>
              <button
                type="button"
                onClick={() => {
                  setStep('email')
                  setCode('')
                  setError(null)
                }}
                className="text-sm text-sw-grey font-semibold"
              >
                Change email
              </button>
            </div>
            <p className="text-xs text-sw-grey text-center mt-5 leading-relaxed">
              Code expires in 10 minutes. Check your spam folder if you don&apos;t see it.
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default function CheckoutSetupPage() {
  return (
    <>
      <AuthLoading>
        <div className="min-h-screen flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-4 border-sw-grey-border border-t-sw-blue rounded-full animate-spin" />
          <p className="text-sm text-sw-grey">Loading...</p>
        </div>
      </AuthLoading>
      <Authenticated>
        <SetupAuthenticated />
      </Authenticated>
      <Unauthenticated>
        <SetupForm />
      </Unauthenticated>
    </>
  )
}
