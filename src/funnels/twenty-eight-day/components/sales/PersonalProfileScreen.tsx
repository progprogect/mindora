import { useEffect, useState } from 'react'
import { Clock, TrendingUp, Wrench } from 'lucide-react'
import type { QuizProfile, QuizRole } from '@/funnels/twenty-eight-day/types/quiz'

interface PersonalProfileScreenProps {
  profile: QuizProfile
  role: QuizRole | null
  name: string | null
  onContinue: () => void
}

const RADIUS = 54
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function PersonalProfileScreen({ profile, role, name, onContinue }: PersonalProfileScreenProps) {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const timeout = window.setTimeout(() => setAnimatedScore(profile.score), 150)
    return () => window.clearTimeout(timeout)
  }, [profile.score])

  const offset = CIRCUMFERENCE - (animatedScore / 100) * CIRCUMFERENCE
  const roleLabel = role === 'employee' ? 'a professional' : role === 'business-owner' ? 'a business owner' : 'you'

  return (
    <div className="flex flex-1 flex-col items-center gap-8 py-4 text-center animate-fade-up">
      <div>
        <h1 className="text-2xl font-extrabold text-sw-dark">
          {name ? `${name}, here's your AI profile` : "Here's your AI profile"}
        </h1>
        <p className="mt-2 text-sm text-sw-grey">Based on your answers, tailored for {roleLabel}.</p>
      </div>

      <div className="relative flex size-40 items-center justify-center">
        <svg viewBox="0 0 128 128" className="size-40 -rotate-90">
          <circle cx="64" cy="64" r={RADIUS} fill="none" stroke="hsl(var(--sw-grey-light))" strokeWidth="10" />
          <circle
            cx="64"
            cy="64"
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
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-extrabold text-sw-dark">{animatedScore}</span>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-sw-grey">/ 100</span>
        </div>
      </div>

      <div className="rounded-sw-sm bg-sw-blue-light px-4 py-1.5 text-sm font-bold text-sw-blue">
        {profile.scoreLabel}
      </div>

      <div className="w-full rounded-sw border border-sw-border bg-sw-white p-5 text-left shadow-sw-card">
        <p className="text-xs font-bold uppercase tracking-wide text-sw-blue">Your archetype</p>
        <p className="mt-1 text-lg font-extrabold text-sw-dark">{profile.archetype}</p>
        <p className="mt-2 text-sm leading-relaxed text-sw-grey">{profile.insight}</p>
      </div>

      <div className="grid w-full grid-cols-3 gap-2">
        <StatCard icon={Clock} label="Time saved" value={profile.stats.timeSavedPerWeek} />
        <StatCard icon={TrendingUp} label="Ahead of" value={`${profile.stats.percentile}%`} />
        <StatCard icon={Wrench} label="Tools to master" value={String(profile.stats.toolsToMaster)} />
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-2 w-full animate-pulse-cta rounded-sw-sm bg-sw-blue py-3.5 font-extrabold tracking-wide text-sw-white transition hover:bg-sw-blue-hover"
      >
        SEE MY FULL PLAN →
      </button>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock
  label: string
  value: string
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-sw border border-sw-border bg-sw-white px-2 py-3">
      <Icon className="size-4 text-sw-blue" />
      <span className="text-sm font-extrabold text-sw-dark">{value}</span>
      <span className="text-center text-[10px] leading-tight text-sw-grey">{label}</span>
    </div>
  )
}
