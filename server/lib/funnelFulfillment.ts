import { eq } from 'drizzle-orm'
import { recordKitPurchase } from 'successwise-app/purchases'
import type Stripe from 'stripe'
import { db } from '../db/index.js'
import { profiles, users } from '../db/schema.js'
import { getStripe } from './stripe.js'
import type { KitCheckoutKey } from './funnelToken.js'
import { kitProduct } from './funnelKits.js'
import { findUserIdByEmail } from './subscription.js'

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export async function ensureFunnelUser(input: {
  email: string
  name?: string
  kit: KitCheckoutKey
  lang?: 'en' | 'ru'
  stripeCustomerId: string
}): Promise<{ userId: string; created: boolean }> {
  const email = normalizeEmail(input.email)
  let userId = await findUserIdByEmail(email)
  let created = false
  if (!userId) {
    const [createdUser] = await db.insert(users).values({ email }).returning({ id: users.id })
    userId = createdUser?.id
    created = true
  }
  if (!userId) throw new Error('Failed to create funnel user')

  const [existing] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1)
  const funnelSource = kitProduct(input.kit).funnelSource
  const locale = input.lang === 'ru' ? 'ru' : 'en'
  const name = (input.name ?? '').trim()

  if (existing) {
    await db
      .update(profiles)
      .set({
        email,
        stripeCustomerId: input.stripeCustomerId,
        funnelSource: existing.funnelSource || funnelSource,
        locale: existing.locale || locale,
        ...(name && !existing.name ? { name } : {}),
      })
      .where(eq(profiles.id, existing.id))
  } else {
    await db.insert(profiles).values({
      userId,
      email,
      name: name || '',
      stripeCustomerId: input.stripeCustomerId,
      funnelSource,
      locale,
      planTier: 'free',
      onboardingComplete: false,
    })
  }

  return { userId, created }
}

export async function setCustomerDefaultPaymentMethod(
  customerId: string,
  paymentMethodId: string,
): Promise<void> {
  if (!customerId || !paymentMethodId) return
  const stripe = getStripe()
  await stripe.customers.update(customerId, {
    invoice_settings: { default_payment_method: paymentMethodId },
  })
  try {
    await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId })
  } catch (error) {
    // Already attached is fine.
    const message = error instanceof Error ? error.message : ''
    if (!/already been attached|resource_already_exists/i.test(message)) {
      console.warn('[funnel] payment method attach', customerId, message)
    }
  }
}

export async function fulfillDollarKitPurchase(input: {
  kit: KitCheckoutKey
  email: string
  name?: string
  lang?: 'en' | 'ru'
  stripeCustomerId: string
  paymentMethodId?: string
}): Promise<{ userId: string }> {
  const { userId } = await ensureFunnelUser(input)
  await recordKitPurchase(userId, input.kit)
  if (input.paymentMethodId) {
    await setCustomerDefaultPaymentMethod(input.stripeCustomerId, input.paymentMethodId)
  }
  return { userId }
}

export async function paymentMethodFromCheckoutSession(
  session: Stripe.Checkout.Session,
): Promise<string> {
  const stripe = getStripe()
  const piRef = session.payment_intent
  const piId = typeof piRef === 'string' ? piRef : piRef?.id
  if (!piId) return ''
  const pi = await stripe.paymentIntents.retrieve(piId)
  return typeof pi.payment_method === 'string' ? pi.payment_method : pi.payment_method?.id ?? ''
}
