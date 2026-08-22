export type QuizRole = 'employee' | 'business-owner' | 'personal'

export interface QuizOption {
  id: string
  label: string
  emoji?: string
  description?: string
  /** Unused by production scoring (`ce` uses fixed maps, not option weights). */
  weight?: number
  /** Tags an answer as "overwhelmed" / "avoidant" / etc. for interstitial echo copy. */
  echo?: string
}

export interface IdentityScreen {
  type: 'identity'
  id: 'identity'
  title: string
  subtitle: string
  question: string
  trustLine?: string
  options: Array<QuizOption & { role: QuizRole; photo?: string; variant: 'photo' | 'text' }>
}

export interface SocialProofScreen {
  type: 'social-proof'
  id: string
  title: string
  subtitle: string
  heroImage?: string
  avatars: string[]
  avatarsCaption: string
  tagline: string
  stat: string
  ctaLabel: string
}

export interface QuestionScreen {
  type: 'question'
  id: string
  step: number
  question: string
  subtitle?: string
  options: QuizOption[]
}

export interface AIToolsQuestionScreen {
  type: 'ai-tools'
  id: string
  step: number
  question: string
  subtitle?: string
  options: Array<QuizOption & { icon: string }>
}

export interface InterstitialEchoVariant {
  headline?: string
  body?: string
}

export interface InterstitialScreen {
  type: 'interstitial'
  id: string
  afterStep: number
  emoji: string
  defaultHeadline: string
  body: string
  ctaLabel: string
  /** Optional stat callout (e.g. "87% of learners felt confident within a week"). */
  stat?: string
  /** Optional attributed quote block (e.g. the McKinsey interstitial). */
  quote?: string
  author?: string
  echoVariants?: Record<string, InterstitialEchoVariant>
}

export interface LoadingScreen {
  type: 'loading'
  id: 'loading'
}

export interface EmailScreen {
  type: 'email'
  id: 'email'
  /** First line of the (two-line) heading, e.g. "Enter your email to get your". */
  title: string
  /** Second, emphasized line of the heading, e.g. "Personal AI Plan!". */
  subtitle: string
}

export interface NameCaptureScreen {
  type: 'name-capture'
  id: 'name-capture'
  title: string
  subtitle: string
}

export type QuizScreenDef =
  | IdentityScreen
  | SocialProofScreen
  | QuestionScreen
  | AIToolsQuestionScreen
  | InterstitialScreen
  | LoadingScreen
  | EmailScreen
  | NameCaptureScreen

export type QuizAnswerValue = string

export interface QuizAnswers {
  [screenId: string]: QuizAnswerValue
}

export interface QuizState {
  step: number
  role: QuizRole | null
  answers: QuizAnswers
  email: string | null
  name: string | null
  consent: boolean
  startedAt: number
}

export type ScoreLabel = 'AI Newcomer' | 'AI Aware' | 'AI Ready' | 'AI Native'

export interface QuizProfileStat {
  label: string
  value: string
}

export interface QuizProfile {
  score: number
  scoreLabel: ScoreLabel
  scoreTone: string
  archetype: string
  archetypeEmoji: string
  archetypeFocus: string
  insight: string
  stats: QuizProfileStat[]
}

export const TOTAL_QUESTION_STEPS = 18
