import { httpRouter, httpActionGeneric, anyApi } from 'convex/server'

const http = httpRouter()

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = Number.parseInt(hex.substr(i * 2, 2), 16)
  }
  return bytes
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i += 1) diff |= a[i] ^ b[i]
  return diff === 0
}

/**
 * Verifies a Stripe webhook signature without depending on the `stripe`
 * Node SDK (keeps this action on Convex's default runtime). Mirrors
 * Stripe's documented scheme: HMAC-SHA256 over `${timestamp}.${payload}`.
 * https://stripe.com/docs/webhooks/signatures
 */
async function verifyStripeSignature(payload: string, header: string | null, secret: string): Promise<boolean> {
  if (!header) return false

  const parts = Object.fromEntries(
    header.split(',').map((part) => {
      const [key, value] = part.split('=')
      return [key, value]
    }),
  )
  const timestamp = parts.t
  const signature = parts.v1
  if (!timestamp || !signature) return false

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const expected = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${timestamp}.${payload}`))

  return timingSafeEqual(new Uint8Array(expected), hexToBytes(signature))
}

interface StripeWebhookEvent {
  type: string
  data: { object: Record<string, unknown> }
}

interface StripeErrorResponse {
  error?: { message?: string }
}

async function stripeRequest<T>(path: string, body?: Record<string, string>, method = 'POST'): Promise<T> {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) throw new Error('STRIPE_SECRET_KEY is not configured')

  const response = await fetch(`https://api.stripe.com/v1${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body ? new URLSearchParams(body).toString() : undefined,
  })
  const json = (await response.json()) as T & StripeErrorResponse
  if (!response.ok) {
    throw new Error(json.error?.message ?? `Stripe request to ${path} failed (${response.status})`)
  }
  return json
}

async function resolveSubscriptionPriceId(
  ctx: { runQuery: (ref: unknown, args?: unknown) => Promise<unknown> },
  productId: string | undefined,
): Promise<string | null> {
  if (productId) {
    const product = (await ctx.runQuery(anyApi.products._getById, { id: productId })) as {
      stripePriceId?: string
      intervalMonths?: number
    } | null
    if (
      product?.stripePriceId &&
      !product.stripePriceId.startsWith('price_REPLACE') &&
      product.intervalMonths !== 1
    ) {
      return product.stripePriceId
    }
  }

  const envPrice = process.env.STRIPE_MONTHLY_PRICE_ID
  if (envPrice && !envPrice.startsWith('price_REPLACE')) return envPrice

  if (productId) {
    const product = (await ctx.runQuery(anyApi.products._getById, { id: productId })) as {
      stripePriceId?: string
    } | null
    if (product?.stripePriceId && !product.stripePriceId.startsWith('price_REPLACE')) {
      return product.stripePriceId
    }
  }

  const products = (await ctx.runQuery(anyApi.products._listActive, {})) as Array<{
    stripePriceId?: string
    intervalMonths?: number
  }>
  const monthly = products.find((p) => p.intervalMonths === 1) ?? products[0]
  if (monthly?.stripePriceId && !monthly.stripePriceId.startsWith('price_REPLACE')) {
    return monthly.stripePriceId
  }
  return null
}

async function handlePaymentIntentSucceeded(
  ctx: {
    runQuery: (ref: unknown, args?: unknown) => Promise<unknown>
    runMutation: (ref: unknown, args?: unknown) => Promise<unknown>
  },
  object: Record<string, unknown>,
): Promise<void> {
  const paymentIntentId = String(object.id ?? '')
  const customerId = typeof object.customer === 'string' ? object.customer : ''
  const paymentMethod = typeof object.payment_method === 'string' ? object.payment_method : ''
  const metadata = (object.metadata as Record<string, string> | undefined) ?? {}

  if (!paymentIntentId) return

  const existing = await ctx.runQuery(anyApi.stripe._getProcessedPayment, { paymentIntentId })
  if (existing) {
    console.log('[stripe webhook] payment_intent already processed', paymentIntentId)
    return
  }

  let subscriptionId: string | undefined
  const priceId = await resolveSubscriptionPriceId(ctx, metadata.productId)
  if (customerId && paymentMethod && priceId) {
    try {
      const subscription = await stripeRequest<{ id: string }>('/subscriptions', {
        customer: customerId,
        default_payment_method: paymentMethod,
        'items[0][price]': priceId,
        trial_period_days: '7',
        'metadata[funnel]': metadata.funnel ?? '28-day-ai-challenge',
        'metadata[paymentIntentId]': paymentIntentId,
      })
      subscriptionId = subscription.id
    } catch (error) {
      console.error('[stripe webhook] failed to create subscription', error)
    }
  } else {
    console.log('[stripe webhook] skipping subscription — missing customer, PM, or Price ID', {
      customerId,
      paymentMethod,
      priceId,
    })
  }

  await ctx.runMutation(anyApi.stripe._recordProcessedPayment, {
    paymentIntentId,
    customerId,
    subscriptionId,
    email: metadata.email,
  })
}

http.route({
  path: '/stripe/webhook',
  method: 'POST',
  handler: httpActionGeneric(async (ctx, request) => {
    const secret = process.env.STRIPE_WEBHOOK_SECRET
    const payload = await request.text()
    const signatureHeader = request.headers.get('stripe-signature')

    if (secret) {
      const isValid = await verifyStripeSignature(payload, signatureHeader, secret)
      if (!isValid) {
        return new Response('Invalid signature', { status: 400 })
      }
    }

    const event = JSON.parse(payload) as StripeWebhookEvent

    switch (event.type) {
      case 'payment_intent.succeeded': {
        await handlePaymentIntentSucceeded(ctx, event.data.object)
        break
      }
      case 'setup_intent.succeeded': {
        const metadata = (event.data.object.metadata as Record<string, string> | undefined) ?? {}
        console.log('[stripe webhook] setup_intent.succeeded', metadata)
        break
      }
      case 'invoice.paid': {
        console.log('[stripe webhook] invoice.paid', event.data.object.id)
        break
      }
      default:
        console.log('[stripe webhook] unhandled event', event.type)
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }),
})

export default http
