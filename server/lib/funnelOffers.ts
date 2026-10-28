import { loadEnv } from '../env.js'
import { isPlaceholderPrice } from './stripe.js'

/** Membership plan — HTML (`monthly_*`) and plan-doc (`main` | `downsell`) both accepted. */
export type FunnelPlan = 'main' | 'downsell'

export type FunnelUpsellProduct = 'mindora_coach' | 'prompt_library' | 'planners_bundle'

export type FunnelUpsellOffer = {
  product: FunnelUpsellProduct
  offerSlug: string
  amountCents: number
  checkoutName: string
}

const PLAN_ALIASES: Record<string, FunnelPlan> = {
  main: 'main',
  downsell: 'downsell',
  monthly_4999: 'main',
  monthly_2999: 'downsell',
}

const UPSELL_BY_PRODUCT: Record<
  FunnelUpsellProduct,
  { offerSlug: string; checkoutName: string; offerCents: number; downsellCents: number }
> = {
  mindora_coach: {
    offerSlug: 'mindora-ai-coach',
    checkoutName: 'Mindora AI Coach',
    offerCents: 1995,
    downsellCents: 1295,
  },
  prompt_library: {
    offerSlug: 'ultimate-prompt-library-oto',
    checkoutName: 'Prompt Library',
    offerCents: 997,
    downsellCents: 697,
  },
  planners_bundle: {
    offerSlug: 'planner-bundle',
    checkoutName: 'All 10 planners',
    offerCents: 495,
    downsellCents: 295,
  },
}

export function normalizeFunnelPlan(raw: string): FunnelPlan | null {
  return PLAN_ALIASES[raw.trim()] ?? null
}

export function isFunnelUpsellProduct(value: string): value is FunnelUpsellProduct {
  return value in UPSELL_BY_PRODUCT
}

/** Parse "$19.95" / "19.95" / 19.95 → cents. */
export function parsePriceToCents(price: string | number): number | null {
  if (typeof price === 'number' && Number.isFinite(price)) {
    return Math.round(price < 1000 && !Number.isInteger(price) ? price * 100 : price)
  }
  const raw = String(price).trim().replace(/[^0-9.]/g, '')
  if (!raw) return null
  const dollars = Number(raw)
  if (!Number.isFinite(dollars)) return null
  return Math.round(dollars * 100)
}

export function resolveMembershipPriceId(plan: FunnelPlan): string | null {
  const env = loadEnv()
  const primary =
    plan === 'main'
      ? env.STRIPE_MONTHLY_4999_PRICE_ID || env.STRIPE_MONTHLY_PRICE_ID
      : env.STRIPE_MONTHLY_2999_PRICE_ID || env.STRIPE_MONTHLY_PRICE_ID
  if (!primary || isPlaceholderPrice(primary)) return null
  return primary
}

export function membershipAmountCents(plan: FunnelPlan): number {
  return plan === 'main' ? 4999 : 2999
}

export function resolveFunnelUpsell(
  product: string,
  price: string | number,
): FunnelUpsellOffer | null {
  if (!isFunnelUpsellProduct(product)) return null
  const cents = parsePriceToCents(price)
  if (cents == null) return null
  const def = UPSELL_BY_PRODUCT[product]
  if (cents !== def.offerCents && cents !== def.downsellCents) return null
  return {
    product,
    offerSlug: def.offerSlug,
    amountCents: cents,
    checkoutName: def.checkoutName,
  }
}

/** Idempotency: token sid + product + price (decline of full price must not block downsell). */
export function funnelChargeIdempotencyKey(sid: string, product: string, amountCents: number): string {
  return `funnel_ch_${sid}_${product}_${amountCents}`.slice(0, 255)
}

export function funnelSubscribeIdempotencyKey(sid: string, plan: FunnelPlan): string {
  return `funnel_sub_${sid}_${plan}`.slice(0, 255)
}
