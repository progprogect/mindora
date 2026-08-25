export type FunnelAnswers = Record<string, string>

export interface FunnelQuizState {
  step: number
  answers: FunnelAnswers
  email: string | null
  name: string | null
  consent: boolean
  startedAt: number
}

export interface QuizOption {
  emoji: string
  label: string
  value: string
  sublabel?: string
  gradient?: string
}

export interface IdentitySaScreen {
  type: 'identity-sa'
  id: string
  kicker: string
  headline: string
  question: string
  hint: string
  options: QuizOption[]
  bullets: string[]
}

export interface IdentityMasterScreen {
  type: 'identity-master'
  id: string
  headline: string
  subtext: string
  collageSrc: string
  collageAlt: string
  options: QuizOption[]
  legal404: boolean
}

export interface LargeCardScreen {
  type: 'large-card'
  id: string
  question: string
  options: QuizOption[]
}

export interface QuestionScreenDef {
  type: 'question'
  id: string
  step: number
  totalSteps: number
  question: string
  subtext?: string
  options: QuizOption[]
}

export interface SocialProofScreenDef {
  type: 'social-proof'
  id: string
  headline: string
  copy: string
  ctaLabel: string
  echoKey?: string
  echoHeadline?: Record<string, string>
  echoCopy?: Record<string, string>
  statBox?: string
  rating?: string
  avatars?: string[]
  avatarsCaption?: string
  heroImage?: string
}

export interface InterstitialScreenDef {
  type: 'interstitial'
  id: string
  headline: string
  copy: string
  ctaLabel: string
  stat?: string
  quote?: string
  quoteAttribution?: string
  echoKey?: string
  echoHeadline?: Record<string, string>
  echoCopy?: Record<string, string>
  icon?: string
}

export interface LoadingScreenDef {
  type: 'loading'
  id: string
  header: string
  steps: string[]
  commitmentQuestion: string
  testimonial: { name: string; role: string; text: string }
}

export interface EmailScreenDef {
  type: 'email'
  id: string
  badge: string
  title: string
  subtitle: string
  features: Array<{ emoji: string; label: string }>
  consent: string
  ctaLabel: string
}

export interface NameScreenDef {
  type: 'name-capture'
  id: string
  title: string
  subtitle: string
  placeholder: string
  ctaLabel: string
  chrome?: 'wordmark' | 'logo'
  showEmailConfirmed?: boolean
  inputIcon?: boolean
  privacyNote?: string
}

export type FunnelScreen =
  | IdentitySaScreen
  | IdentityMasterScreen
  | LargeCardScreen
  | QuestionScreenDef
  | SocialProofScreenDef
  | InterstitialScreenDef
  | LoadingScreenDef
  | EmailScreenDef
  | NameScreenDef
