import { getQuestionScreens, getScreenById } from '@/funnels/twenty-eight-day/data/quizScreens'
import { quizScreens } from '@/funnels/twenty-eight-day/data/quizScreens'
import type { QuizAnswers, QuizProfile, QuizRole, ScoreLabel } from '@/funnels/twenty-eight-day/types/quiz'

const MAX_WEIGHT_PER_QUESTION = 10
const IDENTITY_MAX_WEIGHT = 6

function getIdentityWeight(role: QuizRole | null): number {
  if (!role) return 0
  const identityScreen = quizScreens.find((s) => s.type === 'identity')
  if (identityScreen?.type !== 'identity') return 0
  const option = identityScreen.options.find((o) => o.role === role)
  return option?.weight ?? 0
}

function getOptionWeight(screenId: string, answerId: string | undefined): number {
  if (!answerId) return 0
  const screen = getScreenById(screenId)
  if (!screen || (screen.type !== 'question' && screen.type !== 'ai-tools')) return 0
  const option = screen.options.find((o) => o.id === answerId)
  return option?.weight ?? 0
}

/**
 * Port of `calculateScore(answers)` — sums per-question weights (0-10) and
 * the identity bonus, normalized to a 0-100 AI-readiness score.
 */
export function calculateScore(answers: QuizAnswers, role: QuizRole | null): number {
  const questionScreens = getQuestionScreens()
  const questionSum = questionScreens.reduce((sum, screen) => sum + getOptionWeight(screen.id, answers[screen.id]), 0)
  const identitySum = getIdentityWeight(role)

  const maxTotal = questionScreens.length * MAX_WEIGHT_PER_QUESTION + IDENTITY_MAX_WEIGHT
  const raw = ((questionSum + identitySum) / maxTotal) * 100

  return Math.min(100, Math.max(0, Math.round(raw)))
}

export function getScoreLabel(score: number): ScoreLabel {
  if (score <= 30) return 'AI Newcomer'
  if (score <= 55) return 'AI Aware'
  if (score <= 75) return 'AI Ready'
  return 'AI Native'
}

const ARCHETYPES_BY_ROLE: Record<QuizRole, [string, string, string]> = {
  employee: ['Cautious Starter', 'Efficiency Seeker', 'AI Accelerator'],
  'business-owner': ['Foundational Builder', 'Business Builder', 'Growth Builder'],
  personal: ['Fresh Beginner', 'Curious Learner', 'Creative Explorer'],
}

/**
 * Port of `getArchetype(role, answers)` — bucket score into role-specific
 * archetype tiers.
 */
export function getArchetype(role: QuizRole | null, score: number): string {
  const tiers = role ? ARCHETYPES_BY_ROLE[role] : null
  if (!tiers) return 'AI Explorer'
  if (score >= 70) return tiers[2]
  if (score >= 40) return tiers[1]
  return tiers[0]
}

function labelFor(screenId: string, answerId: string | undefined): string | null {
  if (!answerId) return null
  const screen = getScreenById(screenId)
  if (!screen || (screen.type !== 'question' && screen.type !== 'ai-tools')) return null
  return screen.options.find((o) => o.id === answerId)?.label ?? null
}

/**
 * Port of `getInsight(role, answers)` — personalized one-liner referencing
 * the user's stated goal and biggest blocker.
 */
export function getInsight(role: QuizRole | null, answers: QuizAnswers): string {
  const goal = labelFor('q5-goal', answers['q5-goal'])
  const blocker = labelFor('q3-challenge', answers['q3-challenge'])
  const roleLabel =
    role === 'employee' ? 'your role' : role === 'business-owner' ? 'your business' : 'your life'

  if (goal && blocker) {
    return `Your top goal is "${goal.toLowerCase()}", and your biggest blocker right now is "${blocker.toLowerCase()}". Your 28-day plan is built to remove that blocker first, so you can make progress on ${roleLabel} immediately.`
  }
  if (goal) {
    return `Your top goal is "${goal.toLowerCase()}" — your 28-day plan is sequenced to get you there as fast as possible.`
  }
  return `Based on your answers, we've built a 28-day plan tailored to ${roleLabel} and where you are today.`
}

function getTimeSavedPerWeek(answers: QuizAnswers): string {
  const time = answers['q6-time']
  switch (time) {
    case '2hr+':
      return '10+ hours/week'
    case '1hr':
      return '7-10 hours/week'
    case '30min':
      return '5-7 hours/week'
    default:
      return '3-5 hours/week'
  }
}

/**
 * Port of `buildProfile(role, answers)` — aggregates score, label,
 * archetype, insight and headline stats used on the PersonalProfileScreen.
 */
/**
 * Determines which "echo" tag (e.g. `overwhelmed`, `avoidant`) is most
 * common across answers so far, used to pick the InterstitialScreen copy
 * variant that best matches how the user has been responding.
 */
export function getDominantEcho(answers: QuizAnswers): string | null {
  const counts = new Map<string, number>()

  for (const screen of getQuestionScreens()) {
    const answerId = answers[screen.id]
    if (!answerId) continue
    const option = screen.options.find((o) => o.id === answerId)
    if (!option?.echo) continue
    counts.set(option.echo, (counts.get(option.echo) ?? 0) + 1)
  }

  let best: string | null = null
  let bestCount = 0
  for (const [echo, count] of counts) {
    if (count > bestCount) {
      best = echo
      bestCount = count
    }
  }
  return best
}

export function buildProfile(role: QuizRole | null, answers: QuizAnswers): QuizProfile {
  const score = calculateScore(answers, role)
  const scoreLabel = getScoreLabel(score)
  const archetype = getArchetype(role, score)
  const insight = getInsight(role, answers)

  return {
    score,
    scoreLabel,
    archetype,
    insight,
    stats: {
      timeSavedPerWeek: getTimeSavedPerWeek(answers),
      percentile: Math.min(97, Math.max(50, score + 15)),
      toolsToMaster: role === 'business-owner' ? 5 : role === 'employee' ? 4 : 3,
    },
  }
}
