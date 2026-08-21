import { httpRouter, httpActionGeneric } from 'convex/server'

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
      case 'setup_intent.succeeded': {
        const metadata = (event.data.object.metadata as Record<string, string> | undefined) ?? {}
        console.log('[stripe webhook] setup_intent.succeeded', metadata)
        // TODO: create the recurring subscription for `metadata.productId` using
        // the saved payment method, once you have real Stripe Price IDs seeded.
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
