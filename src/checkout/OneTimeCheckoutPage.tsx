import { useSearchParams } from 'react-router-dom'
import CheckoutPage from '@/pages/CheckoutPage'
import { useI18n } from '../../authorisation/src/i18n/I18nProvider'
import { checkoutUiCopy } from '@/shared/i18n/checkoutUiCopy'

function PlanSearchError() {
  const { locale } = useI18n()
  const ui = checkoutUiCopy(locale)
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-4xl font-semibold text-sw-dark">{ui.somethingWrong}</h1>
      <p className="max-w-md text-sw-grey">{ui.planParamRequired}</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="inline-flex items-center justify-center rounded-md border border-sw-grey-border bg-white px-4 py-2 text-sm font-medium text-sw-dark hover:bg-sw-grey-light"
      >
        {ui.retry}
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
