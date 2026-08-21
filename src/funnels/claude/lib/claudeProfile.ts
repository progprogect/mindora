import type { ClaudeIdentity, ClaudeProfile, ClaudeQuizAnswers, ClaudeSkillLevel } from '@/funnels/claude/types/claudeQuiz'

const LEVEL_LABELS: Record<ClaudeSkillLevel, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

/**
 * Persona lookup keyed by identity — mirrors production `D()`. Only
 * `yes`/`not-yet` are ever reachable since identity is the sole caller;
 * the extra keys are dead branches inherited from a shared lookup shape
 * used by other (non-Claude) funnels in the same bundle.
 */
const PERSONA_BY_IDENTITY: Record<string, string> = {
  yes: 'Claude Power User',
  'not-yet': 'Claude Explorer',
}

const HEADLINE_BY_PURPOSE: Record<string, string> = {
  work: 'Your plan to reclaim 5+ hours every week using Claude at work',
  personal: 'Your personalised Claude mastery plan for everyday life',
  growth: 'Your path to becoming one of the most in-demand AI professionals',
}

const DESCRIPTION_BY_PURPOSE: Record<string, string> = {
  work: "You're leaving hours on the table every week. Your personalised path focuses on the exact workflows that will give you time back immediately.",
  personal: 'Claude can transform how you think, create, and organise your life. Your path focuses on practical everyday applications.',
  growth: 'Claude skills are in high demand. Your certification path includes real-world projects that set you apart from 97% of professionals.',
}

const TIME_SAVED_BY_WASTE: Record<string, string> = {
  '1-3': '2–3 hours',
  '3-5': '4–5 hours',
  '5-10': '6–8 hours',
  '10-plus': '10+ hours',
}

const TOP_BENEFIT_BY_OUTCOME: Record<string, string> = {
  'earn-more': 'Unlock new income streams with verified AI skills',
  productivity: 'Save 5+ hours weekly with Claude-powered workflows',
  credential: 'Earn a verifiable Claude AI Certification for your CV',
  confidence: 'Master Claude with structured, proven techniques',
}

const CERTIFICATION_PATH_BY_LEVEL: Record<ClaudeSkillLevel, string> = {
  beginner: 'Claude Foundations → Core Skills → Certification',
  intermediate: 'Advanced Prompting → Workflows → Certification',
  advanced: 'Power User → Automation → Expert Certification',
}

/** Mapping used when persisting `profileScore` to Convex (`leadSurveyData.saveSurveyData`). */
export const CLAUDE_PROFILE_SCORE_BY_LEVEL: Record<ClaudeSkillLevel, number> = {
  beginner: 25,
  intermediate: 55,
  advanced: 80,
}

/**
 * 1:1 port of `D(identity, answers)` from the production bundle
 * (`claude-ai-certification-*.js`) — unlike the 28-day quiz's weighted
 * score, the Claude profile is built purely from 4 lookup answers:
 * `q5-skill` (+ identity) for level, `q1-purpose` for headline/description,
 * `q8-time-wasted` for weekly time saved, `q15-outcome` for top benefit.
 */
export function buildClaudeProfile(identity: ClaudeIdentity | '', answers: ClaudeQuizAnswers): ClaudeProfile {
  const skill = answers['q5-skill'] ?? 'beginner'
  let level: ClaudeSkillLevel = 'beginner'
  if (skill === 'advanced' || skill === 'expert' || identity === 'yes') {
    level = 'advanced'
  } else if (skill === 'intermediate') {
    level = 'intermediate'
  }

  const purpose = answers['q1-purpose'] ?? 'work'
  const timeWasted = answers['q8-time-wasted'] ?? '3-5'
  const outcome = answers['q15-outcome'] ?? 'productivity'

  return {
    level,
    levelLabel: LEVEL_LABELS[level],
    persona: PERSONA_BY_IDENTITY[identity] ?? 'AI Learner',
    headline: HEADLINE_BY_PURPOSE[purpose] ?? 'Your personalised Claude AI mastery plan',
    description:
      DESCRIPTION_BY_PURPOSE[purpose] ??
      'Your personalised path is designed around your experience level, goals, and available time.',
    topBenefit: TOP_BENEFIT_BY_OUTCOME[outcome] ?? 'Master Claude AI with a structured certification path',
    weeklyTimeSaved: TIME_SAVED_BY_WASTE[timeWasted] ?? '5+ hours',
    certificationPath: CERTIFICATION_PATH_BY_LEVEL[level],
  }
}
