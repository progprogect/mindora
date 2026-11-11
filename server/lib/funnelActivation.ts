import { and, eq, isNull, sql } from 'drizzle-orm'
import { sendFunnelAccessEmail } from 'successwise-app/mail'
import { db } from '../db/index.js'
import { funnelActivationEmails } from '../db/schema.js'
import { recoveryLink } from './funnelAccess.js'
import { isFunnelFlow, isFunnelKit } from './funnelToken.js'

/** The visitor has this long after the Checkout to reach the platform before the link is emailed. */
export const ACTIVATION_DELAY_MS = 10 * 60 * 1000
const POLL_INTERVAL_MS = 60 * 1000
const MAX_ATTEMPTS = 3
const BATCH = 20

/** Queue the "finish signing in" email. One row per funnel session: a repeated webhook delivery is a no-op. */
export async function scheduleActivationEmail(input: {
  userId: string
  email: string
  sid: string
  kit: string
  flow?: string
  locale: 'en' | 'ru'
  delayMs?: number
}): Promise<void> {
  await db
    .insert(funnelActivationEmails)
    .values({
      userId: input.userId,
      email: input.email,
      sid: input.sid,
      kit: input.kit,
      flow: input.flow ?? null,
      locale: input.locale,
      sendAt: new Date(Date.now() + (input.delayMs ?? ACTIVATION_DELAY_MS)),
    })
    .onConflictDoNothing({ target: funnelActivationEmails.sid })
}

/** The visitor finished /account/verify: drop every unsent activation email for the account. */
export async function cancelActivationEmails(userId: string): Promise<void> {
  await db
    .update(funnelActivationEmails)
    .set({ cancelledAt: new Date() })
    .where(
      and(
        eq(funnelActivationEmails.userId, userId),
        isNull(funnelActivationEmails.sentAt),
        isNull(funnelActivationEmails.cancelledAt),
      ),
    )
}

/**
 * Claim due rows atomically (`FOR UPDATE SKIP LOCKED`) so two app instances never send the same email, then send.
 * A failed send releases the row for a retry, up to `MAX_ATTEMPTS`.
 */
export async function processDueActivationEmails(): Promise<number> {
  const claimed = await db.execute<{
    id: string
    user_id: string
    email: string
    kit: string
    flow: string | null
    locale: string
    attempts: number
  }>(sql`
    UPDATE funnel_activation_emails
    SET sent_at = now(), attempts = attempts + 1
    WHERE id IN (
      SELECT id FROM funnel_activation_emails
      WHERE sent_at IS NULL AND cancelled_at IS NULL AND attempts < ${MAX_ATTEMPTS} AND send_at <= now()
      ORDER BY send_at
      LIMIT ${BATCH}
      FOR UPDATE SKIP LOCKED
    )
    RETURNING id, user_id, email, kit, flow, locale, attempts
  `)

  let sent = 0
  for (const row of claimed.rows) {
    const lang = row.locale === 'ru' ? 'ru' : 'en'
    try {
      if (!isFunnelKit(row.kit)) throw new Error(`unknown kit ${row.kit}`)
      await sendFunnelAccessEmail({
        to: row.email,
        kind: 'activate',
        locale: lang,
        link: recoveryLink({
          kit: row.kit,
          flow: isFunnelFlow(row.flow) ? row.flow : undefined,
          email: row.email,
          userId: row.user_id,
          lang,
        }),
      })
      sent += 1
    } catch (error) {
      console.error('[funnel-activation] send failed', row.id, error)
      await db
        .update(funnelActivationEmails)
        .set({ sentAt: null })
        .where(eq(funnelActivationEmails.id, row.id))
    }
  }
  return sent
}

export function startActivationEmailPoller(): void {
  const tick = () => {
    processDueActivationEmails().catch((error) => console.error('[funnel-activation] poll failed', error))
  }
  tick()
  const timer = setInterval(tick, POLL_INTERVAL_MS)
  timer.unref()
}
