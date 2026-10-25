import { useEffect, useState, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import AuthSpinner from '@/auth/AuthSpinner'
import { useI18n } from '@/i18n/I18nProvider'
import { fetchSubscription, type SubscriptionDto } from '@/lib/api'

export default function RequireLmsAccess({ children }: { children: ReactNode }) {
  const { t } = useI18n()
  const [subscription, setSubscription] = useState<SubscriptionDto | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    fetchSubscription()
      .then((data) => {
        if (!cancelled) setSubscription(data)
      })
      .catch((error) => {
        console.warn('[api] subscription failed', error)
        if (!cancelled) setSubscription(null)
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (subscription === undefined) {
    return <AuthSpinner message={t('auth.activatingAccount')} />
  }

  if (subscription === null) {
    if (import.meta.env.DEV) return children
    return <Navigate to="/pricing" replace />
  }

  return children
}
