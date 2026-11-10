/** Stripe webhook payloads may send an id string or an expanded object. */
export function stripeRefId(value: unknown): string {
  if (typeof value === 'string' && value) return value
  if (value && typeof value === 'object' && 'id' in value) {
    const id = (value as { id: unknown }).id
    if (typeof id === 'string') return id
  }
  return ''
}

/**
 * True when a PaymentIntent was created by a subscription invoice (first rebill after trial,
 * renewals, plan changes). Such payments must never be treated as duplicate $1 trial payments.
 */
export function isInvoicePayment(object: Record<string, unknown>): boolean {
  if (stripeRefId(object.invoice)) return true
  const description = typeof object.description === 'string' ? object.description : ''
  return /^subscription (creation|update)/i.test(description)
}

/**
 * True only for the $1 trial funnel PaymentIntent (created in `/checkout/trial-intent` with
 * `metadata.funnel` + `metadata.productId`). Invoice charges and foreign payments never match,
 * so they can never be auto-refunded as "duplicate trial".
 */
export function isTrialFunnelPayment(object: Record<string, unknown>): boolean {
  if (isInvoicePayment(object)) return false
  const metadata = (object.metadata as Record<string, unknown> | null | undefined) ?? {}
  return Boolean(metadata.funnel) && Boolean(metadata.productId)
}
