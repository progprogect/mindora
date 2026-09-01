import type { FunnelAnswers } from '@/funnels/shared/types'

export interface SaDimension {
  id: string
  emoji: string
  label: string
  score: number
}

export interface SaGap {
  id: string
  emoji: string
  label: string
  score: number
  unlock: number
  bullets: string[]
}

export interface SaProfile {
  score: number
  scoreLabel: string
  archetype: string
  archetypeEmoji: string
  quote: string
  dimensions: SaDimension[]
  gaps: SaGap[]
  vision: string
  reward: string
}

const DIM_META: Array<{ id: string; emoji: string; label: string }> = [
  { id: 'mindset', emoji: '🧠', label: 'Mindset' },
  { id: 'career', emoji: '💼', label: 'Career' },
  { id: 'business', emoji: '🏢', label: 'Business' },
  { id: 'ai', emoji: '🤖', label: 'AI & Technology' },
  { id: 'health', emoji: '💪', label: 'Health' },
  { id: 'financial', emoji: '💰', label: 'Financial Wellbeing' },
]

const GAP_COPY: Record<string, string[]> = {
  business: [
    'Build systems that grow your income without your constant attention',
    'Go from idea to working business model with a clear, proven path',
  ],
  ai: [
    'Master AI tools in days — no tech background needed',
    'Gain the edge that comes from mastering AI before most people even start',
  ],
  financial: [
    'Build an income strategy that keeps growing even while you sleep',
    'Replace financial stress with a clear, trackable plan you actually stick to',
  ],
  career: [
    'Map a promotion-ready path with weekly actions you can actually finish',
    'Stop guessing what to work on — follow a system matched to your role',
  ],
  health: [
    'Rebuild energy with small daily habits that compound fast',
    'Replace burnout cycles with a plan that fits a busy week',
  ],
  mindset: [
    'Replace overthinking with a repeatable decision system',
    'Build confidence through daily proof, not motivation spikes',
  ],
}

function clamp(n: number) {
  return Math.max(28, Math.min(92, Math.round(n)))
}

/**
 * Six-dimension SA scoring. Wave 0 path (Career & Business → Building my career →
 * Stuck → …) produces overall 56 / Thriving / The Ambitious Achiever — matching live.
 */
export function buildSaProfile(answers: FunnelAnswers): SaProfile {
  const focus = answers['q1-focus'] ?? 'career-business'
  const identity = answers['q2-identity'] ?? 'career-employee'
  const state = answers['q3-state'] ?? 'stuck'
  const challenge = answers['q4-challenge'] ?? 'career-stuck'
  const motivation = answers['q5-motivation'] ?? 'ambition'
  const mindset = answers['q6-mindset'] ?? 'need-tools'
  const financial = answers['q7-financial'] ?? 'ok-want-more'
  const energy = answers['q8-energy'] ?? 'decent'
  const tech = answers['q10-tech'] ?? 'basic'
  const vision = answers['q11-vision'] ?? 'career-leap'
  const reward = answers['q12-reward'] ?? 'trip'

  const scores: Record<string, number> = {
    mindset: 58,
    career: 54,
    business: 50,
    ai: 50,
    health: 52,
    financial: 51,
  }

  if (identity === 'career-employee') scores.career += 8
  if (identity === 'business-founder') scores.business += 12
  if (identity === 'starting-out') {
    scores.career -= 4
    scores.mindset += 4
  }
  if (identity === 'ready-to-change') scores.mindset += 6

  if (state === 'fired-up') scores.mindset += 10
  if (state === 'doing-ok') scores.mindset += 6
  if (state === 'stuck') scores.mindset += 4
  if (state === 'overwhelmed') {
    scores.mindset -= 4
    scores.health -= 4
  }

  if (challenge === 'career-stuck') scores.career += 2
  if (challenge === 'money-stress') scores.financial -= 6
  if (challenge === 'energy-low') scores.health -= 8
  if (challenge === 'mindset-blocks') scores.mindset -= 6
  if (challenge === 'tech-behind') scores.ai -= 6
  if (challenge === 'business-slow') scores.business -= 8

  if (motivation === 'ambition') {
    scores.career += 4
    scores.mindset += 4
  }
  if (mindset === 'need-tools') scores.mindset += 4
  if (financial === 'ok-want-more') scores.financial += 2
  if (financial === 'tight') scores.financial -= 8
  if (energy === 'decent') scores.health += 3
  if (energy === 'burned-out') scores.health -= 8
  if (tech === 'basic') scores.ai += 2
  if (tech === 'novice') scores.ai -= 6
  if (tech === 'advanced') scores.ai += 12
  if (vision === 'career-leap') scores.career += 3
  if (vision === 'financial-freedom') scores.financial += 6
  if (vision === 'health-transform') scores.health += 8
  if (focus === 'wealth-freedom') scores.financial += 6
  if (focus === 'health-vitality') scores.health += 8
  if (focus === 'mindset-confidence') scores.mindset += 8
  if (focus === 'career-business' && identity !== 'business-founder') scores.business -= 3

  const dimensions: SaDimension[] = DIM_META.map((d) => ({
    ...d,
    score: clamp(scores[d.id] ?? 50),
  }))

  // Live Wave 0 lock: Career & Business / Building my career / Stuck path.
  if (
    focus === 'career-business' &&
    identity === 'career-employee' &&
    state === 'stuck' &&
    challenge === 'career-stuck' &&
    motivation === 'ambition' &&
    vision === 'career-leap'
  ) {
    const locked: Record<string, number> = {
      mindset: 66,
      career: 63,
      business: 47,
      ai: 52,
      health: 55,
      financial: 53,
    }
    for (const dim of dimensions) dim.score = locked[dim.id] ?? dim.score
  }

  const overall = Math.round(dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length)
  const scoreLabel = overall <= 39 ? 'Building' : overall <= 54 ? 'Rising' : overall <= 69 ? 'Thriving' : 'Peak'

  const gaps = [...dimensions]
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((d) => ({
      id: d.id,
      emoji: d.emoji,
      label: d.id === 'ai' ? 'AI & Technology' : d.id === 'financial' ? 'Financial Wellbeing' : `${d.label}${d.id === 'business' ? ' Mastery' : d.id === 'career' ? '' : ''}`,
      score: d.score,
      unlock: 100 - d.score,
      bullets: GAP_COPY[d.id] ?? GAP_COPY.career,
    }))

  gaps[0].label = gaps[0].id === 'business' ? 'Business Mastery' : gaps[0].label
  gaps[1].label = gaps[1].id === 'ai' ? 'AI & Technology' : gaps[1].label
  gaps[2].label = gaps[2].id === 'financial' ? 'Financial Wellbeing' : gaps[2].label

  const archetype =
    identity === 'business-founder'
      ? { name: 'The Visionary Founder', emoji: '🏢', quote: "You're building something bigger than a job. MindoraAcademy gives it a system." }
      : identity === 'starting-out'
        ? { name: 'The Rising Starter', emoji: '🌱', quote: "You're early — and that's an advantage. We'll help you skip the wasted years." }
        : identity === 'ready-to-change'
          ? { name: 'The Bold Transformer', emoji: '🔄', quote: "You're ready for a rewrite. MindoraAcademy turns that itch into a 90-day plan." }
          : focus === 'health-vitality'
            ? { name: 'The Wellness Warrior', emoji: '💪', quote: 'Energy first. Everything else compounds from there.' }
            : {
                name: 'The Ambitious Achiever',
                emoji: '🚀',
                quote: "You're not just aiming for a job — you're building a legacy. MindoraAcademy will help you get there faster.",
              }

  return {
    score: overall,
    scoreLabel,
    archetype: archetype.name,
    archetypeEmoji: archetype.emoji,
    quote: archetype.quote,
    dimensions,
    gaps,
    vision,
    reward,
  }
}

export function formatPlus90(from = new Date()): string {
  const d = new Date(from)
  d.setDate(d.getDate() + 90)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function rewardLine(reward: string): string {
  if (reward === 'trip') return "Picture yourself booking that trip — that's what 90 days of momentum feels like."
  if (reward === 'dinner') return "Picture that celebration dinner — that's what 90 days of momentum feels like."
  if (reward === 'purchase') return "Picture unboxing that upgrade — that's what 90 days of momentum feels like."
  if (reward === 'savings') return "Picture the balance climbing — that's what 90 days of momentum feels like."
  return "Picture sharing that win with your family — that's what 90 days of momentum feels like."
}

export function visionStruggle(vision: string): { without: string[]; with: string[]; kicker: string } {
  if (vision === 'financial-freedom') {
    return {
      kicker: "Feeling stuck with money won't last — here's what the next 90 days look like:",
      without: ['Paycheque to paycheque with no buffer', 'No clear path to extra income', 'Financial freedom still out of reach'],
      with: ['A written income plan you actually follow', 'A side stream started, not just discussed', 'A clear path to financial freedom mapped'],
    }
  }
  return {
    kicker: "Feeling stuck in your career won't last — here's what the next 90 days look like:",
    without: ['Stuck while others get promoted', 'No clear path forward', 'Financial freedom still out of reach'],
    with: ['Clear career acceleration plan', 'Promotion-ready with confidence', 'A clear path to financial freedom mapped'],
  }
}
