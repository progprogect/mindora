import { useEffect, useState } from 'react'
import type { QuizProfile } from '@/funnels/twenty-eight-day/types/quiz'

interface AIScoreCardProps {
  profile: QuizProfile
  compact?: boolean
}

const RADIUS = 52
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function ScoreRing({ score, size, showLabel }: { score: number; size: number; showLabel?: string }) {
  const [ringReady, setRingReady] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setRingReady(true))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  const offset = ringReady ? CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE : CIRCUMFERENCE

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="hsl(var(--sw-grey-light))" strokeWidth="10" />
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            stroke="hsl(var(--sw-blue))"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${size >= 128 ? 'text-3xl' : 'text-xl'} leading-none font-extrabold text-sw-dark`}>
            {score}
          </span>
          <span className="text-xs font-semibold text-sw-grey">/ 100</span>
        </div>
      </div>
      {showLabel ? (
        <span className="text-sm font-bold tracking-wide text-sw-blue uppercase">{showLabel}</span>
      ) : null}
    </div>
  )
}

export default function AIScoreCard({ profile, compact = false }: AIScoreCardProps) {
  if (compact) {
    return <ScoreRing score={profile.score} size={64} />
  }

  return (
    <div className="mb-4 w-full rounded-2xl border-2 border-sw-grey-border bg-white p-6 animate-fade-up">
      <div className="flex items-center gap-6">
        <ScoreRing score={profile.score} size={128} showLabel={profile.scoreLabel} />
        <div className="flex-1">
          <p className="mb-1 text-xs font-bold tracking-wide text-sw-grey uppercase">AI Readiness Score</p>
          <p className="text-sm leading-snug text-sw-dark">{profile.scoreTone}</p>
        </div>
      </div>
    </div>
  )
}
