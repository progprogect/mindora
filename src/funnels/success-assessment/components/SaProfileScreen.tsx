import { useEffect, useState } from 'react'
import { useI18n } from '../../../../authorisation/src/i18n/I18nProvider'
import { saSalesCopy } from '@/funnels/success-assessment/data/saSalesCopy'
import type { SaProfile } from '@/funnels/success-assessment/lib/scoring'

interface SaProfileScreenProps {
  name: string
  profile: SaProfile
}

const RING = 54
const CIRC = 2 * Math.PI * RING

export default function SaProfileScreen({ name, profile }: SaProfileScreenProps) {
  const { locale } = useI18n()
  const copy = saSalesCopy(locale).profile
  const [animated, setAnimated] = useState(0)
  const displayName = name.trim() || copy.defaultName

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

  const gapAreaLabel = (id: string, label: string) => {
    if (id === 'business') return copy.gapAreaNames.business
    if (id === 'ai') return copy.gapAreaNames.ai
    if (id === 'financial') return copy.gapAreaNames.financial
    return label
  }

  const areasJoined = profile.gaps.map((g) => gapAreaLabel(g.id, g.label)).join(', ')

  return (
    <div className="px-4 pt-8 pb-40 animate-fade-up">
      <div className="mb-4 flex justify-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sw-blue-light px-4 py-1.5 text-xs font-bold tracking-wide text-sw-blue uppercase">
          {copy.badge(displayName)}
        </span>
      </div>
      <h1 className="mb-6 text-center text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
        {copy.headline(displayName).split('\n').map((line, i) => (
          <span key={i}>
            {i > 0 ? <br /> : null}
            {line}
          </span>
        ))}
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
            <span className="text-[10px] font-bold tracking-wide text-sw-grey uppercase">{copy.overallScore}</span>
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
          {profile.archetypeEmoji} {copy.archetypeKicker}
        </p>
        <p className="mb-2 text-xl font-extrabold">{profile.archetype}</p>
        <p className="text-sm leading-relaxed text-white/90">&ldquo;{profile.quote}&rdquo;</p>
      </div>

      <p className="mb-3 text-sm font-extrabold text-sw-dark">{copy.topGapsTitle}</p>
      <p className="mb-4 text-sm text-sw-grey">{copy.topGapsBody}</p>
      <div className="mb-6 flex flex-col gap-3">
        {profile.gaps.map((gap) => (
          <div key={gap.id} className="rounded-2xl border border-sw-grey-border p-4">
            <div className="mb-1 flex items-center justify-between">
              <p className="font-bold text-sw-dark">
                {gap.emoji} {gap.label}
              </p>
              <p className="text-sm font-bold text-sw-dark">{gap.score}%</p>
            </div>
            <p className="mb-2 text-xs font-semibold text-sw-blue">{copy.unlock(gap.unlock)}</p>
            <ul className="mb-2 flex flex-col gap-1 text-sm text-sw-grey">
              {gap.bullets.map((b) => (
                <li key={b}>✓ {b}</li>
              ))}
            </ul>
            <p className="text-xs text-sw-grey">{copy.gapMeta}</p>
          </div>
        ))}
      </div>

      <div className="mb-6 rounded-2xl bg-sw-blue-light p-4">
        <p className="mb-1 text-sm font-bold text-sw-dark">{copy.whyAllThree}</p>
        <p className="text-sm leading-relaxed text-sw-grey">{copy.whyAllThreeBody(areasJoined)}</p>
      </div>

      <div className="rounded-2xl bg-sw-grey-light p-4">
        <p className="mb-2 text-sw-amber">⭐⭐⭐⭐⭐</p>
        <p className="mb-2 text-sm font-semibold text-sw-dark">{copy.testimonialTitle}</p>
        <p className="text-sm leading-relaxed text-sw-grey">&ldquo;{copy.testimonialQuote}&rdquo;</p>
        <p className="mt-2 text-xs font-semibold text-sw-grey">{copy.testimonialAuthor}</p>
      </div>
    </div>
  )
}
