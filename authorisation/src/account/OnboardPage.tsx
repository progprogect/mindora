import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Authenticated, AuthLoading, Unauthenticated } from '@/auth/authGates'
import AuthSpinner from '@/auth/AuthSpinner'
import { useCurrentUser, useSession } from '@/auth/session'
import { completeOnboarding } from '@/lib/api'
import { focusFromQuiz } from '@/lib/quizResults'
import { track } from '@/lib/track'

const PACES = [
  { id: 'spark', label: 'Easy start', mins: '5 min/day', icon: '✨', accentColor: '#F59E0B' },
  {
    id: 'momentum',
    label: 'Recommended',
    mins: '15 min/day',
    icon: '🚀',
    accentColor: '#2563EB',
    recommended: true,
  },
  { id: 'ignite', label: 'Fast-track', mins: '30 min/day', icon: '🔥', accentColor: '#EA580C' },
]

function UnauthRedirect() {
  useEffect(() => {
    window.location.href = '/login'
  }, [])
  return <AuthSpinner message="Redirecting…" />
}

function OnboardForm() {
  const navigate = useNavigate()
  const user = useCurrentUser()
  const { refresh } = useSession()
  const [pace, setPace] = useState('momentum')
  const [busy, setBusy] = useState(false)
  const forwarded = useRef(false)

  useEffect(() => {
    if (user?.onboardingComplete && !forwarded.current) {
      forwarded.current = true
      navigate('/app/dashboard', { replace: true })
    }
  }, [user?.onboardingComplete, navigate])

  const firstName = user?.name?.split(' ')[0] || 'there'
  const focus = focusFromQuiz()

  const submit = async () => {
    if (busy || forwarded.current) return
    setBusy(true)
    forwarded.current = true
    try {
      await completeOnboarding({ pacePreference: pace, focusCategory: focus })
      await refresh({ silent: true })
      track('onboarding_completed', { pace, focus })
      navigate('/app/dashboard', { replace: true })
    } catch {
      navigate('/app/dashboard', { replace: true })
    } finally {
      setBusy(false)
    }
  }

  if (user === undefined) return <AuthSpinner />

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-white border-b border-sw-grey-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-center">
          <span className="font-bold text-base text-sw-dark tracking-tight">
            SuccessWise<span className="text-sw-blue">.ai</span>
          </span>
        </div>
      </header>
      <main className="flex-1 flex flex-col px-4 pt-6 pb-44 max-w-lg mx-auto w-full">
        <div className="animate-fade-up">
          <div
            className="relative rounded-3xl overflow-hidden mb-6"
            style={{ background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #3B82F6 100%)' }}
          >
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/5" />
            <div className="relative p-6 pb-7">
              <div className="text-4xl mb-3">🎉</div>
              <h1 className="text-2xl font-extrabold text-white leading-tight mb-2">
                Welcome, {firstName}!
              </h1>
              <p className="text-blue-100 text-sm leading-relaxed">
                Your plan is ready. One quick choice below and you&apos;re in.
              </p>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-sm font-bold text-sw-dark mb-1">How much time can you commit daily?</p>
            <p className="text-xs text-sw-grey mb-4">You can change this anytime in settings</p>
            <div className="space-y-2.5">
              {PACES.map((item) => {
                const active = pace === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPace(item.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.98] ${
                      active ? 'border-sw-blue shadow-sm' : 'border-sw-grey-border hover:border-sw-blue/40'
                    }`}
                    style={active ? { background: `${item.accentColor}08` } : undefined}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ backgroundColor: `${item.accentColor}15` }}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sw-dark text-sm">{item.mins}</span>
                        {item.recommended ? (
                          <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-sw-blue/10 text-sw-blue">
                            Popular
                          </span>
                        ) : null}
                      </div>
                      <p className="text-xs text-sw-grey mt-0.5">{item.label}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        active ? 'border-sw-blue bg-sw-blue' : 'border-sw-grey-border'
                      }`}
                    >
                      {active ? <div className="w-2 h-2 rounded-full bg-white" /> : null}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
          <div className="rounded-xl border border-sw-grey-border p-4">
            <p className="text-xs font-bold text-sw-grey uppercase tracking-widest mb-3">What&apos;s next</p>
            <div className="space-y-2.5">
              {[
                { icon: '✅', label: 'Account set up', done: true },
                { icon: '📚', label: 'Start your first lesson', done: false },
                { icon: '🏆', label: 'Earn your first badge', done: false },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3">
                  <span className="text-base">{row.icon}</span>
                  <span
                    className={`text-sm ${row.done ? 'text-sw-grey line-through' : 'text-sw-dark font-semibold'}`}
                  >
                    {row.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
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
            onClick={() => void submit()}
            disabled={busy}
            className="w-full bg-sw-blue hover:bg-sw-blue-hover text-white font-bold py-4 rounded-full text-base transition-all active:scale-[0.98] shadow-lg disabled:opacity-60"
          >
            {busy ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Setting up…
              </span>
            ) : (
              'Start My First Lesson →'
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

export default function OnboardPage() {
  return (
    <>
      <AuthLoading>
        <AuthSpinner />
      </AuthLoading>
      <Unauthenticated>
        <UnauthRedirect />
      </Unauthenticated>
      <Authenticated>
        <OnboardForm />
      </Authenticated>
    </>
  )
}
