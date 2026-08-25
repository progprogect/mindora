import { useEffect, useState } from 'react'
import type { MasterSkillProfile, M365Profile } from '@/funnels/shared/lib/masterProfile'

const RING_RADIUS = 34
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

function ScoreRing({ score, label, delay }: { score: number; label: string; delay: number }) {
  const [animated, setAnimated] = useState(0)
  useEffect(() => {
    let frame = 0
    const start = window.setTimeout(() => {
      const tick = () => {
        setAnimated((n) => {
          if (n >= score) return score
          frame = requestAnimationFrame(tick)
          return Math.min(n + 2, score)
        })
      }
      frame = requestAnimationFrame(tick)
    }, delay)
    return () => {
      window.clearTimeout(start)
      cancelAnimationFrame(frame)
    }
  }, [score, delay])
  const offset = RING_CIRCUMFERENCE - (animated / 100) * RING_CIRCUMFERENCE
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative size-20">
        <svg viewBox="0 0 80 80" className="size-full -rotate-90">
          <circle cx="40" cy="40" r={RING_RADIUS} fill="none" stroke="hsl(var(--sw-grey-light))" strokeWidth="6" />
          <circle
            cx="40"
            cy="40"
            r={RING_RADIUS}
            fill="none"
            stroke="hsl(var(--sw-blue))"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-extrabold text-sw-dark">{animated}%</span>
        </div>
      </div>
      <span className="text-center text-[11px] leading-tight font-semibold text-sw-grey">{label}</span>
    </div>
  )
}

export function MasterSkillProfileScreen({
  name,
  titleLine,
  levelKicker,
  profile,
  badgeEmoji = '🎯',
}: {
  name: string
  titleLine: string
  levelKicker: string
  profile: MasterSkillProfile
  badgeEmoji?: string
}) {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pt-8 pb-44">
      <div className="mb-6 text-center animate-fade-up">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sw-blue-light px-4 py-1.5">
          <span className="text-sm">{badgeEmoji}</span>
          <span className="text-xs font-bold tracking-wide text-sw-blue uppercase">{profile.persona}</span>
        </div>
        <h1 className="mb-2 text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
          {name}, here&apos;s your
          <br />
          {titleLine}
        </h1>
        <p className="text-sm text-sw-grey">Your personalised assessment results</p>
      </div>
      <div
        className="mb-5 animate-fade-up rounded-2xl p-5"
        style={{ background: 'linear-gradient(135deg, hsl(var(--sw-blue)) 0%, hsl(221 83% 38%) 100%)' }}
      >
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-white/20 text-2xl">⚡</div>
          <div>
            <p className="text-xs font-bold tracking-wide text-white/70 uppercase">{levelKicker}</p>
            <p className="text-xl font-extrabold text-white">{profile.levelLabel}</p>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-white/15 px-4 py-3">
          <p className="text-sm leading-relaxed text-white/90">{profile.path}</p>
        </div>
      </div>
      <div className="mb-6 grid animate-fade-up grid-cols-3 gap-3">
        {profile.rings.map((r, i) => (
          <ScoreRing key={r.label} score={r.score} label={r.label} delay={200 + i * 200} />
        ))}
      </div>
      <div className="mb-5 animate-fade-up rounded-2xl border-2 border-sw-blue/25 bg-sw-blue-light p-5">
        <p className="mb-1 text-sm font-bold text-sw-dark">Your biggest opportunity:</p>
        <p className="text-sm leading-relaxed text-sw-grey">{profile.opportunity}</p>
      </div>
      <div className="flex animate-fade-up items-center gap-4 rounded-2xl border border-sw-grey-border p-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-sw-success-light text-xl">⏱️</div>
        <div>
          <p className="text-sm font-bold text-sw-dark">Potential time saved</p>
          <p className="text-sm text-sw-grey">{profile.timeSaved}</p>
        </div>
      </div>
    </div>
  )
}

export function M365ProfileScreen({ name, profile }: { name: string; profile: M365Profile }) {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pt-8 pb-44">
      <div className="mb-6 text-center animate-fade-up">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sw-blue-light px-4 py-1.5">
          <span>🎯</span>
          <span className="text-xs font-bold tracking-wide text-sw-blue uppercase">{profile.persona}</span>
        </div>
        <h1 className="mb-2 text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
          {name}, here&apos;s your
          <br />
          Microsoft 365 + AI profile
        </h1>
        <p className="text-sm text-sw-grey">Built from the answers you just gave</p>
      </div>
      <div className="mb-5 text-center animate-fade-up">
        <p className="text-5xl font-extrabold text-sw-dark">{profile.readiness}</p>
        <p className="text-xs font-bold tracking-wide text-sw-grey uppercase">out of 100</p>
        <p className="mt-3 text-xs font-bold tracking-wide text-sw-grey uppercase">Your readiness</p>
        <p className="mt-1 text-sm font-bold text-sw-blue">{profile.readinessLabel}</p>
        <p className="mt-1 text-xs text-sw-grey">How much of this you already have in place, from your five key answers.</p>
      </div>
      <div
        className="mb-4 rounded-2xl p-5 text-white"
        style={{ background: 'linear-gradient(135deg, hsl(var(--sw-blue)) 0%, hsl(221 83% 38%) 100%)' }}
      >
        <p className="text-xs font-bold tracking-wide text-white/70 uppercase">⚡ Where we start you</p>
        <p className="text-sm font-bold">{profile.path}</p>
      </div>
      <div className="mb-4 rounded-2xl border border-sw-grey-border p-4">
        <p className="text-sm font-bold text-sw-dark">📌 We start with {profile.startApp}</p>
        <p className="text-sm text-sw-grey">{profile.startCopy}</p>
      </div>
      <div className="mb-4 rounded-2xl bg-sw-blue-light p-4">
        <p className="mb-1 text-sm font-bold text-sw-dark">Your plan to stop retyping the same work into four apps</p>
        <p className="text-sm leading-relaxed text-sw-grey">{profile.opportunity}</p>
      </div>
      <div className="flex items-center gap-4 rounded-2xl border border-sw-grey-border p-4">
        <span className="text-xl">⏱️</span>
        <div>
          <p className="text-sm font-bold text-sw-dark">{profile.timeSaved}</p>
          <p className="text-sm text-sw-grey">That is the time going on work you said AI could help with.</p>
        </div>
      </div>
    </div>
  )
}

export function BulletBenefitsScreen({
  kicker,
  title,
  intro,
  bullets,
  footer,
}: {
  kicker: string
  title: string
  intro: string
  bullets: Array<{ title: string; body: string }>
  footer: string
}) {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pt-8 pb-44">
      <p className="mb-2 text-center text-xs font-bold tracking-wide text-sw-blue uppercase">{kicker}</p>
      <h1 className="mb-3 text-center text-2xl leading-tight font-extrabold text-sw-dark">{title}</h1>
      <p className="mb-6 text-center text-sm text-sw-grey">{intro}</p>
      <div className="flex flex-col gap-4">
        {bullets.map((b) => (
          <div key={b.title}>
            <p className="text-sm font-extrabold text-sw-dark">{b.title}</p>
            <p className="text-sm leading-relaxed text-sw-grey">{b.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs leading-relaxed text-sw-grey">{footer}</p>
    </div>
  )
}

export function BeforeAfterTable({
  kicker,
  title,
  intro,
  rows,
  footer,
}: {
  kicker: string
  title: string
  intro: string
  rows: Array<{ label: string; before: string; after: string }>
  footer: string
}) {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pt-8 pb-44">
      <p className="mb-2 text-center text-xs font-bold tracking-wide text-sw-blue uppercase">{kicker}</p>
      <h1 className="mb-3 text-center text-2xl leading-tight font-extrabold text-sw-dark">{title}</h1>
      <p className="mb-6 text-center text-sm text-sw-grey">{intro}</p>
      <div className="flex flex-col gap-4">
        {rows.map((row) => (
          <div key={row.label} className="rounded-2xl border border-sw-grey-border p-4">
            <p className="mb-2 text-xs font-bold tracking-wide text-sw-grey uppercase">{row.label}</p>
            <p className="mb-1 text-sm text-sw-grey">{row.before}</p>
            <p className="text-sm font-semibold text-sw-dark">{row.after}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs leading-relaxed text-sw-grey">{footer}</p>
    </div>
  )
}

export function LegalSocialScreen({ name }: { name: string }) {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pt-8 pb-44">
      <p className="mb-2 text-center text-xs font-bold tracking-wide text-sw-blue uppercase">Others like you</p>
      <h1 className="mb-3 text-center text-2xl leading-tight font-extrabold text-sw-dark">
        {name}, you are not starting from scratch
      </h1>
      <p className="mb-6 text-center text-sm text-sw-grey">
        What other learners have done so far, counted from our own records.
      </p>
      <div className="mb-6 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-2xl bg-sw-grey-light px-2 py-3">
          <p className="text-lg font-extrabold text-sw-dark">631</p>
          <p className="text-[10px] font-semibold text-sw-grey">certificates earned so far</p>
        </div>
        <div className="rounded-2xl bg-sw-grey-light px-2 py-3">
          <p className="text-lg font-extrabold text-sw-dark">2,205</p>
          <p className="text-[10px] font-semibold text-sw-grey">learners have completed lessons</p>
        </div>
        <div className="rounded-2xl bg-sw-grey-light px-2 py-3">
          <p className="text-lg font-extrabold text-sw-dark">45</p>
          <p className="text-[10px] font-semibold text-sw-grey">courses included</p>
        </div>
      </div>
      <div className="mb-4 rounded-2xl bg-sw-grey-light p-4 text-sm text-sw-grey">
        <p className="mb-2 font-bold text-sw-dark">WHAT THE NUMBERS ARE</p>
        <p>Counted from our own records of learners who have completed lessons and earned certificates.</p>
        <p className="mt-3 font-bold text-sw-dark">WHAT THEY ARE NOT</p>
        <p>They are not a promise about your results, a rate of growth, or a claim that everyone finishes.</p>
        <p className="mt-3 font-bold text-sw-dark">WHY THERE ARE NO QUOTES</p>
        <p>We only publish figures we can show you the workings for, so there are no testimonials here.</p>
      </div>
      <p className="text-sm leading-relaxed text-sw-grey">
        You would be joining 2,205 learners who have completed lessons and 631 certificates earned so far. Your own
        progress is yours to set — you learn at your own pace, with nothing scheduled.
      </p>
    </div>
  )
}
