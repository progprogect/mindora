import type { NavigateFunction } from 'react-router-dom'
import { recordUpsellEvent, recordUpsellFailure } from '@/lib/api'
import { track } from '@/lib/track'

export function leaveOtoPage(): void {
  if (typeof window === 'undefined') return
  window.onbeforeunload = null
}

export function goOtoNext(navigate: NavigateFunction, next: string): void {
  leaveOtoPage()
  navigate(next)
}

export function onOtoChargeFailed(args: {
  navigate: NavigateFunction
  offerSlug: string
  reason: string
  next: string
}): void {
  const { navigate, offerSlug, reason, next } = args
  track('upsell_purchase_failed', { offer: offerSlug, reason })
  void recordUpsellFailure({ offerSlug, reason, source: 'upgrade_path' }).catch(() => {})
  void recordUpsellEvent({ offerSlug, action: 'skipped' }).catch(() => {})
  goOtoNext(navigate, next)
}
