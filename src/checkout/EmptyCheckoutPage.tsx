import { lazy, Suspense } from 'react'
import { useSearchParams } from 'react-router-dom'
import usePageTitle from '@/marketing/hooks/usePageTitle'

const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'))

/**
 * Prod `/checkout` with no funnel id is an empty React root.
 * `?product=` is the expired-offer return from the mounted 28-day / Claude funnels.
 */
export default function EmptyCheckoutPage() {
  usePageTitle('MindoraAcademy.com — Turn Daily Learning Into Daily Progress')
  const [params] = useSearchParams()
  if (params.get('product')) {
    return (
      <Suspense fallback={<div className="min-h-dvh bg-white" />}>
        <CheckoutPage />
      </Suspense>
    )
  }
  return <div className="min-h-dvh bg-white" />
}
