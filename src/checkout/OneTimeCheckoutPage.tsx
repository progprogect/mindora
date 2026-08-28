import { useSearchParams } from 'react-router-dom'
import CheckoutPage from '@/pages/CheckoutPage'

const MISSING_PLAN = `[
  {
    "expected": "string",
    "code": "invalid_type",
    "path": [
      "plan"
    ],
    "message": "Invalid input"
  }
]`

function PlanSearchError() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-4xl font-semibold text-sw-dark">Something went wrong</h1>
      <p className="max-w-md break-words text-sw-grey whitespace-pre-wrap">{MISSING_PLAN}</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="inline-flex items-center justify-center rounded-md border border-sw-grey-border bg-white px-4 py-2 text-sm font-medium text-sw-dark hover:bg-sw-grey-light"
      >
        Retry
      </button>
    </div>
  )
}

/**
 * Prod `/checkout/one-time` is a dedicated child (not `/checkout/:funnel`).
 * `plan` is required search; missing it is a validation error, not the $1 trial page.
 */
export default function OneTimeCheckoutPage() {
  const [params] = useSearchParams()
  if (params.get('plan') === null) return <PlanSearchError />
  return <CheckoutPage />
}
