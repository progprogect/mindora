/** Keep in sync with `server/lib/purchases.ts` KIT_SKUS. */
/** Active: starter/guide. Retired quiz kits kept for already-recorded purchases. */
export const KIT_SKUS = ['kit-starter', 'kit-guide', 'kit-claudecert', 'kit-challenge'] as const
export type KitSku = (typeof KIT_SKUS)[number]

export function ownsAnyKitSku(purchases?: Set<string> | null): boolean {
  if (!purchases || purchases.size === 0) return false
  for (const sku of KIT_SKUS) {
    if (purchases.has(sku)) return true
  }
  return false
}
