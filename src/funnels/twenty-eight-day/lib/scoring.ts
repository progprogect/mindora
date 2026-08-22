import { getScreenById } from '@/funnels/twenty-eight-day/data/quizScreens'
import type { QuizAnswers, QuizProfile, QuizProfileStat, QuizRole, ScoreLabel } from '@/funnels/twenty-eight-day/types/quiz'

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

export function getScoreLabel(score: number): ScoreLabel {
  if (score <= 30) return 'AI Newcomer'
  if (score <= 55) return 'AI Aware'
  if (score <= 75) return 'AI Ready'
  return 'AI Native'
}

function getScoreTone(score: number): string {
  if (score <= 30) return "You're in exactly the right place — the Challenge starts from zero."
  if (score <= 55) return "You have the foundation. Now it's time to build fast."
  if (score <= 75) return "You're ahead of most people. Let's make that gap even bigger."
  return 'You already get AI. Time to go further, faster.'
}

export interface ArchetypeResult {
  archetype: string
  archetypeEmoji: string
  archetypeFocus: string
}

/** Production `ue(role, answers)`. Independent of score. */
export function getArchetype(role: QuizRole | null, answers: QuizAnswers): ArchetypeResult {
  const skill = answers['q5-skill']
  const experience = answers['q7-experience']
  const goal = answers['q2-goal']

  if ((skill === 'comfortable' || experience === 'builder' || experience === 'regular') && skill !== 'beginner') {
    return { archetype: 'The AI Accelerator', archetypeEmoji: '⚡', archetypeFocus: 'Advanced AI mastery' }
  }
  if (role === 'business-owner' || goal === 'side-income') {
    return { archetype: 'The Business Builder', archetypeEmoji: '💼', archetypeFocus: 'AI-powered business growth' }
  }
  if (goal === 'creative') {
    return { archetype: 'The Creative Entrepreneur', archetypeEmoji: '🌟', archetypeFocus: 'AI for creative work & content' }
  }
  if (role === 'employee' && (goal === 'grow-role' || goal === 'switch-career')) {
    return { archetype: 'The Ambitious Professional', archetypeEmoji: '🚀', archetypeFocus: 'Career-accelerating AI skills' }
  }
  return { archetype: 'The AI Newcomer', archetypeEmoji: '🎓', archetypeFocus: 'Building AI confidence from scratch' }
}

/** Production `de(role, answers)`. */
export function getInsight(role: QuizRole | null, answers: QuizAnswers): string {
  const goal = answers['q2-goal']
  const blocker = answers['q9-blocker']
  const concern = answers['q12-concern']
  const skill = answers['q5-skill']

  if (concern === 'opportunity' || skill === 'comfortable') {
    return "You already see AI as your edge. Now it's about moving faster than everyone else."
  }
  if (concern === 'automation' || concern === 'colleagues') {
    return "The people who thrive through AI disruption are learning it now — that's exactly what you're doing."
  }
  if (goal === 'side-income' || role === 'business-owner') {
    return "Your first AI skill could unlock a completely new income stream. Let's build it."
  }
  if (goal === 'creative') {
    return "AI won't replace your creativity — it'll multiply it. Time to find out how."
  }
  if (blocker === 'too-complex' || blocker === 'no-start') {
    return 'The 28-Day Challenge cuts through the noise — one clear skill, every day, no jargon.'
  }
  if (blocker === 'no-time') {
    return 'Ten minutes a day is all it takes. Most learners see results by day 7.'
  }
  return "You're closer than you think. The 28-Day Challenge gives you the system to get there."
}

/** Production `me(answers)` — display maps, not raw option labels. */
export function getProfileStats(answers: QuizAnswers): QuizProfileStat[] {
  const stats: QuizProfileStat[] = []
  if (answers['q2-goal']) {
    stats.push({ label: 'Your #1 Goal', value: GOAL_STATS[answers['q2-goal']] ?? answers['q2-goal'] })
  }
  if (answers['q9-blocker']) {
    stats.push({ label: 'Biggest Blocker', value: BLOCKER_STATS[answers['q9-blocker']] ?? answers['q9-blocker'] })
  }
  if (answers['q16-income'] && answers['q16-income'] !== 'none') {
    stats.push({ label: 'Income Target', value: INCOME_STATS[answers['q16-income']] ?? answers['q16-income'] })
  }
  if (answers['q10-stage']) {
    stats.push({ label: 'Career Stage', value: STAGE_STATS[answers['q10-stage']] ?? answers['q10-stage'] })
  }
  return stats.slice(0, 4)
}

function labelFor(screenId: string, answerId: string | undefined): string | null {
  if (!answerId) return null
  if (screenId === 'q2-goal') return GOAL_STATS[answerId] ?? answerId
  if (screenId === 'q9-blocker') return BLOCKER_STATS[answerId] ?? answerId
  if (screenId === 'q16-income') return INCOME_STATS[answerId] ?? answerId
  if (screenId === 'q10-stage') return STAGE_STATS[answerId] ?? answerId
  const screen = getScreenById(screenId)
  if (!screen || (screen.type !== 'question' && screen.type !== 'ai-tools')) return null
  return screen.options.find((o) => o.id === answerId)?.label ?? null
}

/** Returns the display label for any question option by screen/answer id. */
export function getAnswerLabel(screenId: string, answerId: string | undefined): string | null {
  return labelFor(screenId, answerId)
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
export function buildProfile(role: QuizRole | null, answers: QuizAnswers): QuizProfile {
  const score = calculateScore(answers)
  const { archetype, archetypeEmoji, archetypeFocus } = getArchetype(role, answers)

  return {
    score,
    scoreLabel: getScoreLabel(score),
    scoreTone: getScoreTone(score),
    archetype,
    archetypeEmoji,
    archetypeFocus,
    insight: getInsight(role, answers),
    stats: getProfileStats(answers),
  }
}
