import { useCallback, useEffect, useState } from 'react'

/**
 * Thin, resilient wrappers around `/api`.
 * Writes are fire-and-forget + try/caught: an API outage should never
 * block a user from moving through the quiz or sales funnel.
 */

export interface ProductDoc {
  _id: string
  name: string
  stripePriceId: string
  price: number
  intervalMonths: number
  badge?: string
  active: boolean
}

async function apiJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    credentials: 'include',
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })
  const data: unknown = await response.json().catch(() => ({}))
  if (!response.ok) {
    const message =
      data && typeof data === 'object' && 'error' in data && typeof (data as { error: unknown }).error === 'string'
        ? (data as { error: string }).error
        : `Request failed (${response.status})`
    throw new Error(message)
  }
  return data as T
}

export function useCaptureLead() {
  return useCallback(async (args: { email: string; funnel: string; consent: boolean }) => {
    try {
      await apiJson('/api/leads', { method: 'POST', body: JSON.stringify(args) })
    } catch (error) {
      console.warn('[api] leads.capture failed', error)
    }
  }, [])
}

export function useUpdateLeadName() {
  return useCallback(async (args: { email: string; name: string; funnel?: string }) => {
    try {
      await apiJson('/api/leads/name', { method: 'PATCH', body: JSON.stringify(args) })
    } catch (error) {
      console.warn('[api] leads.updateName failed', error)
    }
  }, [])
}

export function useSaveSurveyData() {
  return useCallback(
    async (args: {
      email: string
      funnel: string
      answers: string
      role: string
      profileScore: number
      scoreLabel: string
      archetype: string
    }) => {
      try {
        await apiJson('/api/survey', { method: 'POST', body: JSON.stringify(args) })
      } catch (error) {
        console.warn('[api] survey.save failed', error)
      }
    },
    [],
  )
}

export function useTrackCheckoutInitiated() {
  return useCallback(async (args: { email: string; funnel: string }) => {
    try {
      await apiJson('/api/survey/checkout-initiated', { method: 'POST', body: JSON.stringify(args) })
    } catch (error) {
      console.warn('[api] survey.checkoutInitiated failed', error)
    }
  }, [])
}

/** Returns `undefined` while loading/unreachable — callers should fall back to `DEFAULT_PLANS`. */
export function useProductsList(): ProductDoc[] | undefined {
  const [products, setProducts] = useState<ProductDoc[] | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    apiJson<ProductDoc[]>('/api/products')
      .then((data) => {
        if (!cancelled) setProducts(data)
      })
      .catch((error) => {
        console.warn('[api] products.list failed', error)
        if (!cancelled) setProducts(undefined)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return products
}

export function useCheckoutOfferAction() {
  return useCallback(async (sessionKey: string): Promise<{ percentOff: number }> => {
    try {
      return await apiJson<{ percentOff: number }>('/api/checkout/offer', {
        method: 'POST',
        body: JSON.stringify({ sessionKey }),
      })
    } catch (error) {
      console.warn('[api] checkout.offer failed, using default offer', error)
      return { percentOff: 50 }
    }
  }, [])
}

export function useSetCheckoutOfferPercentAction() {
  return useCallback(async (sessionKey: string, percentOff: number): Promise<{ percentOff: number }> => {
    try {
      return await apiJson<{ percentOff: number }>('/api/checkout/offer/percent', {
        method: 'POST',
        body: JSON.stringify({ sessionKey, percentOff }),
      })
    } catch (error) {
      console.warn('[api] checkout.offer.percent failed, using local value', error)
      return { percentOff }
    }
  }, [])
}

export function useCreateTrialPaymentIntent() {
  return useCallback(
    (args: { email: string; productId: string; funnel: string }) =>
      apiJson<{ clientSecret: string }>('/api/checkout/trial-intent', {
        method: 'POST',
        body: JSON.stringify(args),
      }),
    [],
  )
}

/** @deprecated Alias of `useCreateTrialPaymentIntent`. */
export function useCreateTrialSetupIntent() {
  return useCreateTrialPaymentIntent()
}

export function useCreatePayPalPaymentIntent() {
  return useCallback(
    (args: {
      customerEmail: string
      productId: string
      funnel: string
      returnUrl?: string
      confirmAndRedirect?: boolean
    }) =>
      apiJson<{ clientSecret: string; redirectUrl: string | null }>('/api/checkout/paypal-intent', {
        method: 'POST',
        body: JSON.stringify(args),
      }),
    [],
  )
}

export function useSendMetaEventAction() {
  return useCallback(
    async (args: {
      eventName: string
      eventId: string
      email?: string
      eventSourceUrl?: string
      customData?: Record<string, unknown>
    }) => {
      try {
        await apiJson('/api/meta/event', { method: 'POST', body: JSON.stringify(args) })
      } catch (error) {
        console.warn('[api] meta.event failed', error)
      }
    },
    [],
  )
}
