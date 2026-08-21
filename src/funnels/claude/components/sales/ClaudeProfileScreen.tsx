import { useEffect, useState } from 'react'
import type { ClaudeProfile, ClaudeQuizAnswers, ClaudeSkillLevel } from '@/funnels/claude/types/claudeQuiz'
import { trackEvent } from '@/shared/lib/tracking'

const FUNNEL = 'claude-ai-certification'

const RING_RADIUS = 34
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

function ScoreRing({ score, label, delay }: { score: number; label: string; delay: number }) {
  const [animated, setAnimated] = useState(0)

  useEffect(() => {
    let frame: number
    const startTimeout = window.setTimeout(() => {
      let current = 0
      const tick = () => {
        current = Math.min(current + 1.5, score)
        setAnimated(Math.round(current))
        if (current < score) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, delay)
    return () => {
      window.clearTimeout(startTimeout)
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
            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
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

interface ClaudeProfileScreenProps {
  name: string
  profile: ClaudeProfile
  answers: ClaudeQuizAnswers
  onContinue: () => void
}

const LEVEL_EMOJI: Record<ClaudeSkillLevel, string> = {
  beginner: '🌱',
  intermediate: '⚡',
  advanced: '🏆',
}

const SKILL_SCORES: Record<string, { prompting: number; workflows: number; certReady: number }> = {
  expert: { prompting: 85, workflows: 78, certReady: 90 },
  advanced: { prompting: 68, workflows: 55, certReady: 72 },
  intermediate: { prompting: 45, workflows: 32, certReady: 55 },
  beginner: { prompting: 22, workflows: 15, certReady: 38 },
}

/**
 * Port of `ClaudeProfileScreen` (`ClaudeProfileScreen-BsMU0jYV.js`) — persona
 * badge, gradient level card, 3 animated score rings and certification path.
 */
export default function ClaudeProfileScreen({ name, profile, answers, onContinue }: ClaudeProfileScreenProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    trackEvent('PlanViewed', { funnel: FUNNEL })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const scores = SKILL_SCORES[answers['q5-skill'] ?? 'beginner'] ?? SKILL_SCORES.beginner

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pt-8 pb-44">
      <div className="mb-6 animate-fade-up text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sw-blue-light px-4 py-1.5">
          <span className="text-sm">🎯</span>
          <span className="text-xs font-bold tracking-wide text-sw-blue uppercase">{profile.persona}</span>
        </div>
        <h1 className="mb-2 text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
          {name}, here&apos;s your
          <br />
          Claude AI Profile
        </h1>
        <p className="text-sm text-sw-grey">Your personalised assessment results</p>
      </div>

      <div
        className="mb-5 animate-fade-up rounded-2xl p-5"
        style={{ background: 'linear-gradient(135deg, hsl(var(--sw-blue)) 0%, hsl(221 83% 38%) 100%)' }}
      >
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-white/20">
            <span className="text-2xl">{LEVEL_EMOJI[profile.level]}</span>
          </div>
          <div>
            <p className="text-xs font-bold tracking-wide text-white/70 uppercase">Current Level</p>
            <p className="text-xl font-extrabold text-white">{profile.levelLabel}</p>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-white/15 px-4 py-3">
          <p className="text-sm leading-relaxed text-white/90">{profile.certificationPath}</p>
        </div>
      </div>

      <div className="mb-6 grid animate-fade-up grid-cols-3 gap-3">
        <ScoreRing score={scores.prompting} label="Prompting" delay={200} />
        <ScoreRing score={scores.workflows} label="Workflows" delay={400} />
        <ScoreRing score={scores.certReady} label="Cert Ready" delay={600} />
      </div>

      <div className="mb-5 animate-fade-up rounded-2xl border-2 border-sw-blue/25 bg-sw-blue-light p-5">
        <p className="mb-1 text-sm font-bold text-sw-dark">Your biggest opportunity:</p>
        <p className="text-sm leading-relaxed text-sw-grey">{profile.description}</p>
      </div>

      <div className="flex animate-fade-up items-center gap-4 rounded-2xl border border-sw-border p-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-sw-success-light">
          <span className="text-xl">⏱️</span>
        </div>
        <div>
          <p className="text-sm font-bold text-sw-dark">Potential time saved</p>
          <p className="text-sm text-sw-grey">{profile.weeklyTimeSaved} per week with Claude mastery</p>
        </div>
      </div>

      <div
        className="fixed inset-x-0 bottom-0 z-50 px-4 pt-10"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.92) 40%, white 65%)' }}
      >
        <div className="mx-auto max-w-lg">
          <button
            type="button"
            onClick={onContinue}
            className="w-full rounded-full bg-sw-blue py-4 text-base font-bold text-sw-white shadow-lg transition-all duration-150 hover:bg-sw-blue-hover active:scale-[0.98]"
          >
            See My Certification Plan →
          </button>
        </div>
        <div style={{ paddingTop: '56px', paddingBottom: 'env(safe-area-inset-bottom)' }} />
      </div>
    </div>
  )
}
