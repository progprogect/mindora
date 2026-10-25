import { claudeProfileCopy } from '@/funnels/claude/i18n/claudeProfileCopy'
import type { ClaudeLocale } from '@/funnels/claude/i18n/locale'
import type { ClaudeIdentity, ClaudeProfile, ClaudeQuizAnswers, ClaudeSkillLevel } from '@/funnels/claude/types/claudeQuiz'

/** Mapping used when persisting `profileScore` to `POST /api/survey`. */
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
export function buildClaudeProfile(
  identity: ClaudeIdentity | '',
  answers: ClaudeQuizAnswers,
  locale: ClaudeLocale = 'en',
): ClaudeProfile {
  const copy = claudeProfileCopy(locale)
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
    levelLabel: copy.levelLabels[level],
    persona: copy.personaByIdentity[identity] ?? copy.defaults.persona,
    headline: copy.headlineByPurpose[purpose] ?? copy.defaults.headline,
    description: copy.descriptionByPurpose[purpose] ?? copy.defaults.description,
    topBenefit: copy.topBenefitByOutcome[outcome] ?? copy.defaults.topBenefit,
    weeklyTimeSaved: copy.timeSavedByWaste[timeWasted] ?? copy.defaults.weeklyTimeSaved,
    certificationPath: copy.certificationPathByLevel[level],
  }
}
