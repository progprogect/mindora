/**
 * Price variants of a funnel. The same landing, pages, e-mails and code serve every variant; only the kit price and the
 * numbers shown around it differ. No variant (`undefined`) is the original $1 funnel and behaves exactly as before.
 *
 * - `offer`: Starter Kit Sub Out at $4.99 (split test), served on `/start-kit-sub-out-offer`.
 *
 * The "real value" total and the savings are marketing numbers typed by hand (they are not the sum of the listed items),
 * so they live here, next to the price, instead of in the page text.
 */
export const FUNNEL_PRICE_VARIANTS = ['offer'] as const
export type FunnelPriceVariant = (typeof FUNNEL_PRICE_VARIANTS)[number]

export type KitPricing = {
  /** Charged for the kit, in cents. */
  cents: number
  /** Whole-dollar or cents text shown on the pages, e.g. `$1` or `$4.99`. */
  display: string
  /** Same amount as a number for analytics (`value`). */
  value: number
  /** Struck-through "total real value" shown on the landing. */
  oldTotal: string
  /** "You save ..." amount. */
  savings: string
  /** Discount badge, e.g. `−99%`. */
  off: string
}

const BASE_PRICING: KitPricing = {
  cents: 100,
  display: '$1',
  value: 1,
  oldTotal: '$391.95',
  savings: '$390.95',
  off: '−99%',
}

const VARIANT_PRICING: Record<FunnelPriceVariant, KitPricing> = {
  offer: {
    cents: 499,
    display: '$4.99',
    value: 4.99,
    oldTotal: '$500',
    savings: '$495.01',
    off: '−99%',
  },
}

export function isFunnelPriceVariant(value: unknown): value is FunnelPriceVariant {
  return typeof value === 'string' && (FUNNEL_PRICE_VARIANTS as readonly string[]).includes(value)
}

export function kitPricing(variant?: FunnelPriceVariant): KitPricing {
  return variant ? VARIANT_PRICING[variant] : BASE_PRICING
}

/** `window.FUNNEL` fields every page reads its price numbers from. */
export function pricePayload(variant?: FunnelPriceVariant): Record<string, unknown> {
  const pricing = kitPricing(variant)
  return {
    priceVariant: variant ?? '',
    price: pricing.display,
    priceValue: pricing.value,
    priceCents: pricing.cents,
    oldTotal: pricing.oldTotal,
    savings: pricing.savings,
    off: pricing.off,
  }
}

/** Suffix of the variant landing path and of the reporting source, e.g. `/start-kit-sub-out` + `-offer`. */
export function variantSuffix(variant?: FunnelPriceVariant): string {
  return variant ? `-${variant}` : ''
}
