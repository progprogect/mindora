/** Canonical LMS: `authorisation/server`. Railway mirror — do not add LMS features here. */
import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { profiles, users } from '../db/schema.js'
import { getUserStats } from './progress.js'

export async function loadCurrentUser(userId: string) {
  const [authUser] = await db.select().from(users).where(eq(users.id, userId)).limit(1)
  if (!authUser) return null
  const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1)
  const stats = await getUserStats(userId)
  return {
    name: profile?.name || authUser.name || '',
    email: authUser.email || profile?.email || '',
    onboardingComplete: profile?.onboardingComplete ?? false,
    pacePreference: profile?.pacePreference ?? undefined,
    focusCategory: profile?.focusCategory ?? undefined,
    funnelSource: profile?.funnelSource ?? undefined,
    joinDate: profile?.joinDate.getTime(),
    planTier: profile?.planTier ?? undefined,
    streakCount: stats.streakCount,
    xp: stats.xp,
    lastActivityDate: stats.lastActivityDate ?? undefined,
  }
}
