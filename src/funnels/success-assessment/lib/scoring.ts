import type { FunnelAnswers } from '@/funnels/shared/types'
import type { Locale } from '../../../../authorisation/src/i18n/locale'
import {
  archetypeFor,
  dimLabels,
  gapBullets,
  gapDisplayLabel,
  rewardLineCopy,
  scoreLabelFor,
  visionStruggleCopy,
} from './scoringCopy'

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

const DIM_IDS = [
  { id: 'mindset', emoji: '🧠' },
  { id: 'career', emoji: '💼' },
  { id: 'business', emoji: '🏢' },
  { id: 'ai', emoji: '🤖' },
  { id: 'health', emoji: '💪' },
  { id: 'financial', emoji: '💰' },
] as const

function clamp(n: number) {
  return Math.max(28, Math.min(92, Math.round(n)))
}

/**
 * Six-dimension SA scoring. Wave 0 path (Career & Business → Building my career →
 * Stuck → …) produces overall 56 / Thriving / The Ambitious Achiever — matching live.
 */
export function buildSaProfile(answers: FunnelAnswers, locale: Locale = 'en'): SaProfile {
  const labels = dimLabels(locale)
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

  const dimensions: SaDimension[] = DIM_IDS.map((d) => ({
    id: d.id,
    emoji: d.emoji,
    label: labels[d.id],
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
  const scoreLabel = scoreLabelFor(overall, locale)

  const gaps = [...dimensions]
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((d) => ({
      id: d.id,
      emoji: d.emoji,
      label: gapDisplayLabel(locale, d.id, d.label),
      score: d.score,
      unlock: 100 - d.score,
      bullets: gapBullets(locale, d.id),
    }))

  const archetype = archetypeFor(locale, identity, focus)

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

export function formatPlus90(from = new Date(), locale: Locale = 'en'): string {
  const d = new Date(from)
  d.setDate(d.getDate() + 90)
  return d.toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function rewardLine(reward: string, locale: Locale = 'en'): string {
  return rewardLineCopy(locale, reward)
}

export function visionStruggle(vision: string, locale: Locale = 'en'): {
  without: string[]
  with: string[]
  kicker: string
} {
  return visionStruggleCopy(locale, vision)
}
