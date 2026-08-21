export type ClaudeIdentity = 'yes' | 'not-yet'

export interface ClaudeQuizOption {
  emoji: string
  label: string
  value: string
}

export interface ClaudeIdentityScreenDef {
  type: 'identity'
  id: 'identity'
  totalSteps: number
  headline: string
  subtext: string
  options: Array<{ emoji: string; label: string; value: ClaudeIdentity }>
}

export interface ClaudeSocialProofScreenDef {
  type: 'social-proof'
  id: string
  totalSteps: number
  headline: string
  copy: string
  ctaLabel: string
  stat?: string
  /** Answer key whose value picks the echo variant (e.g. `identity`). */
  echoKey?: string
  echoHeadline?: Record<string, string>
  echoCopy?: Record<string, string>
}

export interface ClaudeQuestionScreenDef {
  type: 'question'
  id: string
  step: number
  totalSteps: number
  question: string
  subtext?: string
  options: ClaudeQuizOption[]
}

export interface ClaudeInterstitialScreenDef {
  type: 'interstitial'
  id: string
  totalSteps: number
  headline: string
  copy?: string
  stat?: string
  quote?: string
  quoteAttribution?: string
  ctaLabel: string
  echoKey?: string
  echoHeadline?: Record<string, string>
  echoCopy?: Record<string, string>
}

export interface ClaudeCertificateScreenDef {
  type: 'certificate'
  id: string
  totalSteps: number
  headline: string
  copy: string
  ctaLabel: string
}

export interface ClaudeLoadingScreenDef {
  type: 'loading'
  id: 'loading'
  totalSteps: number
  headline: string
}

export interface ClaudeEmailScreenDef {
  type: 'email'
  id: 'email'
  totalSteps: number
  headline: string
  subtext: string
  ctaLabel: string
}

export type ClaudeQuizScreenDef =
  | ClaudeIdentityScreenDef
  | ClaudeSocialProofScreenDef
  | ClaudeQuestionScreenDef
  | ClaudeInterstitialScreenDef
  | ClaudeCertificateScreenDef
  | ClaudeLoadingScreenDef
  | ClaudeEmailScreenDef

export type ClaudeQuizAnswers = Record<string, string>

export interface ClaudeQuizState {
  step: number
  answers: ClaudeQuizAnswers
  identity: ClaudeIdentity | ''
  submittedEmail: string
  submittedName: string
}

export type ClaudeSkillLevel = 'beginner' | 'intermediate' | 'advanced'

export interface ClaudeProfile {
  level: ClaudeSkillLevel
  levelLabel: string
  persona: string
  headline: string
  description: string
  topBenefit: string
  weeklyTimeSaved: string
  certificationPath: string
}

export const CLAUDE_TOTAL_QUESTION_STEPS = 16
