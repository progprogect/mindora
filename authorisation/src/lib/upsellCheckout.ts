import { useEffect } from 'react'
import { completeUpsellCheckout } from '@/lib/api'

const handled = new Set<string>()

function stripUpsellQuery() {
  const url = new URL(window.location.href)
  url.searchParams.delete('upsell')
  url.searchParams.delete('session_id')
  window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`)
}

/** After Stripe Checkout: fulfill SKU if webhook lost the race, then reload without the query. */
export function useConsumeUpsellCheckoutReturn(ready: boolean) {
  useEffect(() => {
    if (!ready) return
    const params = new URLSearchParams(window.location.search)
    if (params.get('upsell') !== 'success') return
    const sessionId = params.get('session_id')
    const key = sessionId || `${window.location.pathname}${window.location.search}`
    if (handled.has(key)) return

    window.onbeforeunload = null
    let cancelled = false

    void (async () => {
      if (sessionId) {
        try {
          await completeUpsellCheckout(sessionId)
        } catch (error) {
          console.error('[upsell] checkout complete failed', error)
        }
      }
      if (cancelled) return
      handled.add(key)
      stripUpsellQuery()
      window.location.reload()
    })()

    return () => {
      cancelled = true
    }
  }, [ready])
}
