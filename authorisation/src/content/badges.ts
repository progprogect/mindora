export const BADGES = [
  { id: 'first-step', emoji: '👣' },
  { id: 'perfect-score', emoji: '⭐' },
  { id: 'week-warrior', emoji: '🛡️' },
  { id: 'on-fire', emoji: '🔥' },
  { id: 'module-master', emoji: '🏅' },
  { id: 'course-graduate', emoji: '🎓' },
  { id: 'unstoppable', emoji: '💥' },
] as const

export type BadgeId = (typeof BADGES)[number]['id']

export function badgeKey(id: string, field: 'label' | 'description' | 'unlock' | 'resultDesc') {
  const suffix = field === 'unlock' ? 'unlock' : field
  return `badges.${id}.${suffix}`
}
