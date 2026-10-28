import { useEffect, useState, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import AuthSpinner from '@/auth/AuthSpinner'
import { useI18n } from '@/i18n/I18nProvider'
import { withLocale } from '@/i18n/locale'
import { fetchPurchases, fetchSubscription, type SubscriptionDto } from '@/lib/api'
import { ownsAnyKitSku } from '@/shared/kits'

/** Full catalog access while subscription is live; kit SKUs keep shell access after cancel. */
const LIVE_SUB = new Set(['trialing', 'active'])

function hasLiveSubscription(sub: SubscriptionDto | null | undefined): boolean {
  return Boolean(sub && LIVE_SUB.has(sub.status))
}

export default function RequireLmsAccess({ children }: { children: ReactNode }) {
  const { locale, t } = useI18n()
  const [subscription, setSubscription] = useState<SubscriptionDto | undefined | null>(undefined)
  const [hasKit, setHasKit] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    Promise.all([
      fetchSubscription().catch((error) => {
        console.warn('[api] subscription failed', error)
        return null
      }),
      fetchPurchases()
        .then((data) => new Set(data.purchases.map((row) => row.sku)))
        .catch((error) => {
          console.warn('[api] purchases failed', error)
          return new Set<string>()
        }),
    ]).then(([sub, skus]) => {
      if (cancelled) return
      setSubscription(sub)
      setHasKit(ownsAnyKitSku(skus))
    })
    return () => {
      cancelled = true
    }
  }, [])

  if (subscription === undefined || hasKit === undefined) {
    return <AuthSpinner message={t('auth.activatingAccount')} />
  }

  if (!hasLiveSubscription(subscription) && !hasKit) {
    if (import.meta.env.DEV) return children
    return <Navigate to={withLocale(locale, '/pricing')} replace />
  }

  return children
}
