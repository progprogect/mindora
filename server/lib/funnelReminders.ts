import { isNull } from 'drizzle-orm'
import { db } from '../db/index.js'
import { funnelTrialReminders } from '../db/schema.js'

/** Charge-before-trial-end reminders are disabled. Call sites stay so checkout does not change. */
export async function scheduleTrialChargeReminder(_input: {
  userId: string
  stripeSubscriptionId: string
  email: string
  amountCents: number
  trialEndUnix: number
  locale?: 'en' | 'ru'
}): Promise<void> {}

/** Drop queued reminders so a restart cannot send them. */
export async function processDueTrialReminders(): Promise<number> {
  const removed = await db
    .delete(funnelTrialReminders)
    .where(isNull(funnelTrialReminders.sentAt))
    .returning({ id: funnelTrialReminders.id })
  if (removed.length > 0) console.log(`[funnel-reminder] dropped unsent=${removed.length}`)
  return removed.length
}

export function startTrialReminderPoller(): void {
  processDueTrialReminders().catch((error) => console.error('[funnel-reminder] purge failed', error))
}
