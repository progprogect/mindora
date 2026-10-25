import { getScreenById, type FunnelLocale } from '@/funnels/twenty-eight-day/data/quizScreens'
import type { QuizAnswers, QuizProfile, QuizProfileStat, QuizRole, ScoreLabel } from '@/funnels/twenty-eight-day/types/quiz'
import {
  archetypeFor,
  BLOCKER_STATS_RU,
  GOAL_STATS_RU,
  INCOME_STATS_RU,
  insightFor,
  profileStatLabels,
  scoreLabelFor,
  scoreToneFor,
  STAGE_STATS_RU,
} from '@/funnels/twenty-eight-day/lib/scoring.i18n'

/**
 * Production 1:1 port of `ce` / `ue` / `de` / `me` / `R` from
 * `28-day-ai-challenge-d_h9ZrNh.js`. Score uses five keys only —
 * not a weighted sum of all 18 questions.
 */

const SKILL_POINTS: Record<string, number> = {
  comfortable: 4,
  moderate: 3,
  struggling: 2,
  beginner: 1,
}

const EXPERIENCE_POINTS: Record<string, number> = {
  builder: 4,
  regular: 3,
  tried: 2,
  beginner: 1,
}

const OVERWHELM_POINTS: Record<string, number> = {
  excited: 4,
  curious: 3,
  overwhelmed: 2,
  avoidant: 1,
}

const BLOCKER_POINTS: Record<string, number> = {
  'no-time': 3,
  'no-plan': 2,
  'too-complex': 1,
  'no-start': 1,
}

const FEAR_POINTS: Record<string, number> = {
  opportunity: 4,
  'a-little': 3,
  'somewhat-worried': 2,
  'very-worried': 1,
}

const GOAL_STATS: Record<string, string> = {
  'grow-role': 'Grow in my current role',
  'switch-career': 'Switch careers or get promoted',
  'side-income': 'Build a business or side income',
  creative: 'Use AI for creative projects',
  'stay-current': 'Stay ahead of AI',
  other: 'Explore what AI can do',
}

const BLOCKER_STATS: Record<string, string> = {
  'no-plan': 'No clear system or plan',
  'no-time': 'Not enough time',
  'too-complex': 'It feels too complicated',
  'no-start': 'Not knowing where to start',
}

const INCOME_STATS: Record<string, string> = {
  '500': '$500 / month',
  '1000-2000': '$1,000 – $2,000 / month',
  '3000-5000': '$3,000 – $5,000 / month',
  '5000-plus': '$5,000+ / month',
  none: 'Not a priority right now',
}

const STAGE_STATS: Record<string, string> = {
  student: 'Student / just starting out',
  career: 'Building my career',
  manager: 'Manager or team leader',
  founder: 'Running my own business',
  transitioning: 'In transition',
}

/** Production `ce(answers)` — five keys, `Math.round((sum - 5) / 14 * 100)`. */
export function calculateScore(answers: QuizAnswers, _role?: QuizRole | null): number {
  const sum =
    (SKILL_POINTS[answers['q5-skill']] ?? 1) +
    (EXPERIENCE_POINTS[answers['q7-experience']] ?? 1) +
    (OVERWHELM_POINTS[answers['q4-overwhelm']] ?? 1) +
    (BLOCKER_POINTS[answers['q9-blocker']] ?? 1) +
    (FEAR_POINTS[answers['q6-fear']] ?? 1)
  return Math.round(((sum - 5) / 14) * 100)
}

export function getScoreLabel(score: number, locale: FunnelLocale = 'en'): ScoreLabel | string {
  return scoreLabelFor(score, locale) as ScoreLabel
}

function getScoreTone(score: number, locale: FunnelLocale = 'en'): string {
  return scoreToneFor(score, locale)
}

export interface ArchetypeResult {
  archetype: string
  archetypeEmoji: string
  archetypeFocus: string
}

/** Production `ue(role, answers)`. Independent of score. */
export function getArchetype(role: QuizRole | null, answers: QuizAnswers, locale: FunnelLocale = 'en'): ArchetypeResult {
  return archetypeFor(role, answers, locale)
}

/** Production `de(role, answers)`. */
export function getInsight(role: QuizRole | null, answers: QuizAnswers, locale: FunnelLocale = 'en'): string {
  return insightFor(role, answers, locale)
}

function goalStatValue(id: string, locale: FunnelLocale): string {
  return locale === 'ru' ? (GOAL_STATS_RU[id] ?? GOAL_STATS[id] ?? id) : (GOAL_STATS[id] ?? id)
}

function blockerStatValue(id: string, locale: FunnelLocale): string {
  return locale === 'ru' ? (BLOCKER_STATS_RU[id] ?? BLOCKER_STATS[id] ?? id) : (BLOCKER_STATS[id] ?? id)
}

function incomeStatValue(id: string, locale: FunnelLocale): string {
  return locale === 'ru' ? (INCOME_STATS_RU[id] ?? INCOME_STATS[id] ?? id) : (INCOME_STATS[id] ?? id)
}

function stageStatValue(id: string, locale: FunnelLocale): string {
  return locale === 'ru' ? (STAGE_STATS_RU[id] ?? STAGE_STATS[id] ?? id) : (STAGE_STATS[id] ?? id)
}

/** Production `me(answers)` — display maps, not raw option labels. */
export function getProfileStats(answers: QuizAnswers, locale: FunnelLocale = 'en'): QuizProfileStat[] {
  const labels = profileStatLabels(locale)
  const stats: QuizProfileStat[] = []
  if (answers['q2-goal']) {
    stats.push({ label: labels.goal, value: goalStatValue(answers['q2-goal'], locale) })
  }
  if (answers['q9-blocker']) {
    stats.push({ label: labels.blocker, value: blockerStatValue(answers['q9-blocker'], locale) })
  }
  if (answers['q16-income'] && answers['q16-income'] !== 'none') {
    stats.push({ label: labels.income, value: incomeStatValue(answers['q16-income'], locale) })
  }
  if (answers['q10-stage']) {
    stats.push({ label: labels.stage, value: stageStatValue(answers['q10-stage'], locale) })
  }
  return stats.slice(0, 4)
}

function labelFor(screenId: string, answerId: string | undefined, locale: FunnelLocale = 'en'): string | null {
  if (!answerId) return null
  if (screenId === 'q2-goal') return goalStatValue(answerId, locale)
  if (screenId === 'q9-blocker') return blockerStatValue(answerId, locale)
  if (screenId === 'q16-income') return incomeStatValue(answerId, locale)
  if (screenId === 'q10-stage') return stageStatValue(answerId, locale)
  const screen = getScreenById(screenId, locale)
  if (!screen || (screen.type !== 'question' && screen.type !== 'ai-tools')) return null
  return screen.options.find((o) => o.id === answerId)?.label ?? null
}

/** Returns the display label for any question option by screen/answer id. */
export function getAnswerLabel(
  screenId: string,
  answerId: string | undefined,
  locale: FunnelLocale = 'en',
): string | null {
  return labelFor(screenId, answerId, locale)
}

export function getDominantEcho(answers: QuizAnswers): string | null {
  const feeling = answers['q4-overwhelm']
  if (feeling === 'overwhelmed' || feeling === 'avoidant') return feeling
  return null
}

export type Interstitial1Variant = 'overwhelmed' | 'avoidant' | 'confident'

/** Interstitial-1 echo is only `q4-overwhelm` (overwhelmed / avoidant). */
export function getInterstitial1Variant(answers: QuizAnswers): Interstitial1Variant {
  const feeling = answers['q4-overwhelm']
  if (feeling === 'avoidant') return 'avoidant'
  if (feeling === 'overwhelmed') return 'overwhelmed'
  return 'confident'
}

/** Production `R(role, answers)`. */
export function buildProfile(role: QuizRole | null, answers: QuizAnswers, locale: FunnelLocale = 'en'): QuizProfile {
  const score = calculateScore(answers)
  const { archetype, archetypeEmoji, archetypeFocus } = getArchetype(role, answers, locale)

  return {
    score,
    scoreLabel: scoreLabelFor(score, locale),
    scoreTone: getScoreTone(score, locale),
    archetype,
    archetypeEmoji,
    archetypeFocus,
    insight: getInsight(role, answers, locale),
    stats: getProfileStats(answers, locale),
  }
}
