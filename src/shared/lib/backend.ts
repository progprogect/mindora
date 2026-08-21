import { useAction, useMutation, useQuery } from 'convex/react'
import { anyApi } from 'convex/server'
import { useCallback } from 'react'

/**
 * Thin, resilient wrappers around the Convex functions defined in `convex/`.
 * Built on `anyApi` (untyped function references) so the frontend compiles
 * and runs before `npx convex dev` has generated `convex/_generated/api`
 * for your deployment — see README "Convex setup" for the codegen step.
 *
 * Every write is fire-and-forget + try/caught: a Convex outage should never
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

export function useCaptureLead() {
  const mutate = useMutation(anyApi.leads.capture)
  return useCallback(
    async (args: { email: string; funnel: string; consent: boolean }) => {
      try {
        await mutate(args)
      } catch (error) {
        console.warn('[convex] leads.capture failed', error)
      }
    },
    [mutate],
  )
}

export function useUpdateLeadName() {
  const mutate = useMutation(anyApi.leads.updateName)
  return useCallback(
    async (args: { email: string; name: string; funnel?: string }) => {
      try {
        await mutate(args)
      } catch (error) {
        console.warn('[convex] leads.updateName failed', error)
      }
    },
    [mutate],
  )
}

export function useSaveSurveyData() {
  const mutate = useMutation(anyApi.leadSurveyData.saveSurveyData)
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
        await mutate(args)
      } catch (error) {
        console.warn('[convex] leadSurveyData.saveSurveyData failed', error)
      }
    },
    [mutate],
  )
}

export function useTrackCheckoutInitiated() {
  const mutate = useMutation(anyApi.leadSurveyData.trackCheckoutInitiated)
  return useCallback(
    async (args: { email: string; funnel: string }) => {
      try {
        await mutate(args)
      } catch (error) {
        console.warn('[convex] leadSurveyData.trackCheckoutInitiated failed', error)
      }
    },
    [mutate],
  )
}

/** Returns `undefined` while loading/unreachable — callers should fall back to `DEFAULT_PLANS`. */
export function useProductsList(): ProductDoc[] | undefined {
  return useQuery(anyApi.products.list, {}) as ProductDoc[] | undefined
}

export function useCheckoutOfferAction() {
  const act = useAction(anyApi.stripe.getOrCreateCheckoutOffer)
  return useCallback(
    async (sessionKey: string): Promise<{ percentOff: number }> => {
      try {
        return (await act({ sessionKey })) as { percentOff: number }
      } catch (error) {
        console.warn('[convex] stripe.getOrCreateCheckoutOffer failed, using default offer', error)
        return { percentOff: 50 }
      }
    },
    [act],
  )
}

export function useSetCheckoutOfferPercentAction() {
  const act = useAction(anyApi.stripe.setCheckoutOfferPercent)
  return useCallback(
    async (sessionKey: string, percentOff: number): Promise<{ percentOff: number }> => {
      try {
        return (await act({ sessionKey, percentOff })) as { percentOff: number }
      } catch (error) {
        console.warn('[convex] stripe.setCheckoutOfferPercent failed, using local value', error)
        return { percentOff }
      }
    },
    [act],
  )
}

export function useCreateTrialSetupIntent() {
  const act = useAction(anyApi.stripe.createTrialSetupIntent)
  return useCallback(
    (args: { email: string; productId: string; funnel: string }) =>
      act(args) as Promise<{ clientSecret: string }>,
    [act],
  )
}

export function useSendMetaEventAction() {
  const act = useAction(anyApi.meta.sendEvent)
  return useCallback(
    async (args: {
      eventName: string
      eventId: string
      email?: string
      eventSourceUrl?: string
      customData?: Record<string, unknown>
    }) => {
      try {
        await act(args)
      } catch (error) {
        console.warn('[convex] meta.sendEvent failed', error)
      }
    },
    [act],
  )
}
