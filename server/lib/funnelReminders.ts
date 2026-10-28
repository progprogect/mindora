import { and, eq, isNull, lte } from 'drizzle-orm'
import { sendTrialChargeReminderEmail } from 'successwise-app/mail'
import { db } from '../db/index.js'
import { funnelTrialReminders } from '../db/schema.js'

const REMINDER_LEAD_MS = 24 * 60 * 60 * 1000

export async function scheduleTrialChargeReminder(input: {
  userId: string
  stripeSubscriptionId: string
  email: string
  amountCents: number
  trialEndUnix: number
  locale?: 'en' | 'ru'
}): Promise<void> {
  const chargeAt = new Date(input.trialEndUnix * 1000)
  const sendAt = new Date(chargeAt.getTime() - REMINDER_LEAD_MS)
  // If trial is shorter than 24h (misconfig), send ASAP.
  const effectiveSendAt = sendAt.getTime() < Date.now() ? new Date() : sendAt

  await db
    .insert(funnelTrialReminders)
    .values({
      userId: input.userId,
      stripeSubscriptionId: input.stripeSubscriptionId,
      email: input.email.trim().toLowerCase(),
      amountCents: input.amountCents,
      sendAt: effectiveSendAt,
      locale: input.locale === 'ru' ? 'ru' : 'en',
    })
    .onConflictDoUpdate({
      target: funnelTrialReminders.stripeSubscriptionId,
      set: {
        email: input.email.trim().toLowerCase(),
        amountCents: input.amountCents,
        sendAt: effectiveSendAt,
        locale: input.locale === 'ru' ? 'ru' : 'en',
        sentAt: null,
      },
    })
}

export async function processDueTrialReminders(): Promise<number> {
  const due = await db
    .select()
    .from(funnelTrialReminders)
    .where(and(isNull(funnelTrialReminders.sentAt), lte(funnelTrialReminders.sendAt, new Date())))
    .limit(50)

  let sent = 0
  for (const row of due) {
    const claimed = await db
      .update(funnelTrialReminders)
      .set({ sentAt: new Date() })
      .where(and(eq(funnelTrialReminders.id, row.id), isNull(funnelTrialReminders.sentAt)))
      .returning({ id: funnelTrialReminders.id })
    if (!claimed[0]) continue

    const chargeAt = new Date(row.sendAt.getTime() + REMINDER_LEAD_MS)
    try {
      await sendTrialChargeReminderEmail({
        to: row.email,
        amountCents: row.amountCents,
        chargeAt,
        locale: row.locale === 'ru' ? 'ru' : 'en',
      })
      sent += 1
    } catch (error) {
      console.error('[funnel-reminder] send failed', row.id, error)
      await db.update(funnelTrialReminders).set({ sentAt: null }).where(eq(funnelTrialReminders.id, row.id))
    }
  }
  return sent
}

let reminderTimer: ReturnType<typeof setInterval> | null = null

export function startTrialReminderPoller(): void {
  if (reminderTimer) return
  const tick = () => {
    processDueTrialReminders()
      .then((n) => {
        if (n > 0) console.log(`[funnel-reminder] sent=${n}`)
      })
      .catch((error) => console.error('[funnel-reminder] poll failed', error))
  }
  tick()
  reminderTimer = setInterval(tick, 15 * 60 * 1000)
  if (typeof reminderTimer.unref === 'function') reminderTimer.unref()
}
