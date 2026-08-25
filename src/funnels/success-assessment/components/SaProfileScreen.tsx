import { useEffect, useState } from 'react'
import type { SaProfile } from '@/funnels/success-assessment/lib/scoring'

interface SaProfileScreenProps {
  name: string
  profile: SaProfile
}

const RING = 54
const CIRC = 2 * Math.PI * RING

export default function SaProfileScreen({ name, profile }: SaProfileScreenProps) {
  const [animated, setAnimated] = useState(0)
  const displayName = name.trim() || 'Your'

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    let frame = 0
    const tick = () => {
      setAnimated((n) => {
        if (n >= profile.score) return profile.score
        frame = requestAnimationFrame(tick)
        return n + 1
      })
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [profile.score])

  const offset = CIRC - (animated / 100) * CIRC

  return (
    <div className="px-4 pt-8 pb-40 animate-fade-up">
      <div className="mb-4 flex justify-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sw-blue-light px-4 py-1.5 text-xs font-bold tracking-wide text-sw-blue uppercase">
          ✨ {displayName}&apos;s Success Profile
        </span>
      </div>
      <h1 className="mb-6 text-center text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
        {displayName}, here&apos;s your
        <br />
        personalised roadmap
      </h1>

      <div className="mb-6 flex flex-col items-center">
        <div className="relative size-32">
          <svg viewBox="0 0 120 120" className="size-full -rotate-90">
            <circle cx="60" cy="60" r={RING} fill="none" stroke="hsl(var(--sw-grey-light))" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r={RING}
              fill="none"
              stroke="hsl(var(--sw-blue))"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-sw-dark">{animated}</span>
            <span className="text-[10px] font-bold tracking-wide text-sw-grey uppercase">Overall score</span>
          </div>
        </div>
        <p className="mt-2 text-lg font-extrabold text-sw-blue">{profile.scoreLabel}</p>
      </div>

      <div className="mb-6 flex flex-col gap-3">
        {profile.dimensions.map((dim) => (
          <div key={dim.id}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-semibold text-sw-dark">
                {dim.emoji} {dim.label}
              </span>
              <span className="font-bold text-sw-dark">{dim.score}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-sw-grey-light">
              <div className="h-full rounded-full bg-sw-blue" style={{ width: `${dim.score}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div
        className="mb-6 rounded-2xl p-5 text-white"
        style={{ background: 'linear-gradient(135deg, hsl(var(--sw-blue)) 0%, hsl(221 83% 38%) 100%)' }}
      >
        <p className="mb-1 text-xs font-bold tracking-wide text-white/70 uppercase">
          {profile.archetypeEmoji} Your archetype
        </p>
        <p className="mb-2 text-xl font-extrabold">{profile.archetype}</p>
        <p className="text-sm leading-relaxed text-white/90">&ldquo;{profile.quote}&rdquo;</p>
      </div>

      <p className="mb-3 text-sm font-extrabold text-sw-dark">🚀 YOUR TOP 3 GROWTH OPPORTUNITIES</p>
      <p className="mb-4 text-sm text-sw-grey">
        Based on your answers, these three areas give you the fastest path to your career breakthrough. Your plan
        tackles all three simultaneously.
      </p>
      <div className="mb-6 flex flex-col gap-3">
        {profile.gaps.map((gap) => (
          <div key={gap.id} className="rounded-2xl border border-sw-grey-border p-4">
            <div className="mb-1 flex items-center justify-between">
              <p className="font-bold text-sw-dark">
                {gap.emoji} {gap.label}
              </p>
              <p className="text-sm font-bold text-sw-dark">{gap.score}%</p>
            </div>
            <p className="mb-2 text-xs font-semibold text-sw-blue">🔓 {gap.unlock} points of growth ready to unlock</p>
            <ul className="mb-2 flex flex-col gap-1 text-sm text-sw-grey">
              {gap.bullets.map((b) => (
                <li key={b}>✓ {b}</li>
              ))}
            </ul>
            <p className="text-xs text-sw-grey">⏱ 5–10 mins/day · ✅ Included in your plan</p>
          </div>
        ))}
      </div>

      <div className="mb-6 rounded-2xl bg-sw-blue-light p-4">
        <p className="mb-1 text-sm font-bold text-sw-dark">🎯 Why all three gaps at once?</p>
        <p className="text-sm leading-relaxed text-sw-grey">
          Working on{' '}
          {profile.gaps
            .map((g) => (g.id === 'business' ? 'Business' : g.id === 'ai' ? 'AI & Technology' : g.id === 'financial' ? 'Financial Wellbeing' : g.label))
            .join(', ')}{' '}
          together creates a compounding effect — progress in one area accelerates the others. This is why our members
          see results 3× faster than tackling each area one at a time.
        </p>
      </div>

      <div className="rounded-2xl bg-sw-grey-light p-4">
        <p className="mb-2 text-sw-amber">⭐⭐⭐⭐⭐</p>
        <p className="mb-2 text-sm font-semibold text-sw-dark">94% of members see measurable progress within 30 days</p>
        <p className="text-sm leading-relaxed text-sw-grey">
          &ldquo;I&apos;d tried three times before and always quit. SuccessWise gave me a system that worked with my
          life, not against it. Eight weeks in, I got a promotion and launched my first side income stream.&rdquo;
        </p>
        <p className="mt-2 text-xs font-semibold text-sw-grey">— Alex R., Operations Manager</p>
      </div>
    </div>
  )
}
