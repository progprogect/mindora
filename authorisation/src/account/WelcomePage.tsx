import { useEffect, useState } from 'react'
import { Authenticated, AuthLoading, Unauthenticated } from '@/auth/authGates'
import { useCurrentUser } from '@/auth/session'
import { track } from '@/lib/track'
import BrandWordmark from '@/shared/BrandWordmark'

function Spinner() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-sw-blue-border border-t-sw-blue rounded-full animate-spin" />
    </div>
  )
}

function UnauthRedirect() {
  useEffect(() => {
    window.location.href = '/checkout/setup'
  }, [])
  return <Spinner />
}

function Step({
  number,
  label,
  status,
}: {
  number: number
  label: string
  status: 'complete' | 'active' | 'upcoming'
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          status === 'complete'
            ? 'bg-green-500 text-white'
            : status === 'active'
              ? 'bg-sw-blue text-white'
              : 'bg-gray-200 text-sw-grey'
        }`}
      >
        {status === 'complete' ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          number
        )}
      </div>
      <span className={`text-[10px] font-semibold ${status === 'upcoming' ? 'text-sw-grey' : 'text-sw-dark'}`}>
        {label}
      </span>
    </div>
  )
}

function Letter({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-xl flex-shrink-0">{emoji}</span>
      <span className="text-sm text-sw-dark font-medium">{text}</span>
    </div>
  )
}

function WelcomeLetter() {
  const user = useCurrentUser()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
    track('welcome_letter_viewed')
  }, [])

  const firstName = user?.name?.split(' ')[0] || 'Friend'

  const continueToUpgrade = () => {
    track('welcome_letter_continue_clicked')
    window.location.href = '/account/upgrade'
  }

  if (!ready) return <Spinner />

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-white border-b border-sw-grey-border">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center justify-center">
          <BrandWordmark />
        </div>
      </header>
      <div className="bg-white py-4 px-4 border-b border-sw-grey-border">
        <div className="max-w-sm mx-auto flex items-center justify-between">
          <Step number={1} label="Member" status="complete" />
          <div className="flex-1 h-0.5 bg-gray-200 mx-2 mt-[-12px]" />
          <Step number={2} label="Welcome" status="active" />
          <div className="flex-1 h-0.5 bg-gray-200 mx-2 mt-[-12px]" />
          <Step number={3} label="Access" status="upcoming" />
        </div>
      </div>
      <main className="max-w-lg mx-auto px-5 pt-8 pb-40">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
            <span className="text-4xl">🎉</span>
          </div>
          <h1 className="text-3xl font-extrabold text-sw-dark leading-tight">Welcome aboard, {firstName}!</h1>
          <p className="text-sm text-sw-grey mt-2">You just made a brilliant decision.</p>
        </div>
        <div className="rounded-2xl border border-sw-grey-border bg-gray-50/50 p-6 sm:p-8 space-y-4">
          <p className="text-base text-sw-dark leading-relaxed">Hey {firstName},</p>
          <p className="text-base text-sw-dark leading-relaxed">
            I&apos;m genuinely excited you&apos;re here. You&apos;re about to unlock a learning experience
            that&apos;s helped thousands of people master AI, build better habits, and achieve their goals
            faster than they ever thought possible.
          </p>
          <p className="text-base text-sw-dark leading-relaxed">
            Over the next 28 days, you&apos;ll get <span className="font-bold">daily micro-lessons</span>{' '}
            designed to fit into your busiest schedule — just 5 minutes a day is all it takes.
          </p>
          <p className="text-base text-sw-dark leading-relaxed">Here&apos;s what&apos;s waiting for you:</p>
          <div className="space-y-3 py-2">
            <Letter emoji="📱" text="Daily bite-sized lessons delivered to your dashboard" />
            <Letter emoji="🏆" text="XP points, streaks & badges to keep you motivated" />
            <Letter emoji="🎯" text="Personalised learning path based on your goals" />
            <Letter emoji="🤝" text="A community of driven learners just like you" />
          </div>
          <p className="text-base text-sw-dark leading-relaxed">
            But first — on the next page, I&apos;ve put together a{' '}
            <span className="font-bold">special new-member offer</span> just for you. It&apos;s 100%
            optional, but many members grab it because it complements your learning perfectly.
          </p>
          <p className="text-base text-sw-dark leading-relaxed">
            Either way, you can skip straight through to your dashboard whenever you&apos;re ready.
          </p>
          <div className="pt-4 border-t border-sw-grey-border">
            <p className="text-base text-sw-dark font-semibold">Let&apos;s make this your best year yet 🚀</p>
            <div className="mt-3 flex items-center gap-3">
              <img
                src="/assets/rob-wass.jpg"
                alt="Rob Wass"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-bold text-sw-dark">Rob Wass</p>
                <p className="text-xs text-sw-grey">Founder, MindoraAcademy.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-center">
          <span className="text-sm text-sw-grey">Trusted by</span>
          <span className="text-sm font-bold text-sw-dark">100,000+ members</span>
          <span className="text-sm text-sw-grey">worldwide</span>
        </div>
      </main>
      <div
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.92) 40%, white 65%)',
        }}
      >
        <div className="max-w-lg mx-auto px-5 pt-6 pb-2">
          <button
            type="button"
            onClick={continueToUpgrade}
            className="w-full py-4 rounded-full bg-sw-blue hover:bg-sw-blue-hover text-white font-bold text-lg transition-all active:scale-[0.98] shadow-lg"
          >
            Continue →
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

export default function WelcomePage() {
  return (
    <>
      <AuthLoading>
        <Spinner />
      </AuthLoading>
      <Unauthenticated>
        <UnauthRedirect />
      </Unauthenticated>
      <Authenticated>
        <WelcomeLetter />
      </Authenticated>
    </>
  )
}
