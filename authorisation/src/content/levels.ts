export const LEVELS = [
  { level: 1, min: 0, max: 500 },
  { level: 2, min: 500, max: 1500 },
  { level: 3, min: 1500, max: 3500 },
  { level: 4, min: 3500, max: 7000 },
  { level: 5, min: 7000, max: 12000 },
  { level: 6, min: 12000, max: 20000 },
  { level: 7, min: 20000, max: Infinity },
] as const

export function levelTitleKey(level: number) {
  return `levels.${level}.title`
}

export function levelForXp(xp: number) {
  const reached = LEVELS.filter((level) => xp >= level.min)
  const current = reached[reached.length - 1] ?? LEVELS[0]
  const next = LEVELS.find((level) => level.level === current.level + 1)
  const progressPct = next ? Math.min(100, Math.round(((xp - current.min) / (next.min - current.min)) * 100)) : 100
  const xpToNext = next ? next.min - xp : 0
  return { current, next, progressPct, xpToNext }
}

export function levelEmoji(level: number) {
  return level === 1
    ? '🌱'
    : level === 2
      ? '🔍'
      : level === 3
        ? '⭐'
        : level === 4
          ? '🚀'
          : level === 5
            ? '🏆'
            : level === 6
              ? '💎'
              : '👑'
}
