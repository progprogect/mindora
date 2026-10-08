import posthog from 'posthog-js'
import { v4 as uuidv4 } from 'uuid'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
  }
}

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined
const POSTHOG_HOST = (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ?? 'https://us.i.posthog.com'
const CAPI_RELAY_ENABLED = (import.meta.env.VITE_META_CAPI_ENABLED as string | undefined) === 'true'

let initialized = false

export function initTracking(): void {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  if (POSTHOG_KEY) {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: true,
      persistence: 'localStorage',
    })
  }
}

export type TrackedEventName =
  | 'QuizStarted'
  | 'QuizStepCompleted'
  | 'QuizCompleted'
  | 'Lead'
  | 'PlanViewed'
  | 'PricingViewed'
  | 'SpinWheelSpun'
  | 'CheckoutStarted'
  | 'TrialStarted'

interface TrackEventOptions {
  /** Called with the generated event_id so callers can forward it to `/api/meta/event` for CAPI dedup. */
  onEventId?: (eventId: string) => void
}

/**
 * Fires a tracked funnel event to Meta Pixel (browser) and PostHog, sharing a
 * single `event_id` for browser/server (CAPI) deduplication — see
 * `POST /api/meta/event` for the relay side.
 */
export function trackEvent(
  name: TrackedEventName,
  payload: Record<string, unknown> = {},
  options?: TrackEventOptions,
): string {
  const eventId = uuidv4()
  options?.onEventId?.(eventId)

  if (typeof window === 'undefined') return eventId

  if (window.fbq) {
    window.fbq('trackCustom', name, payload, { eventID: eventId })
  }

  if (POSTHOG_KEY) {
    posthog.capture(name, { ...payload, event_id: eventId })
  }

  return eventId
}

export function identifyUser(email: string, traits: Record<string, unknown> = {}): void {
  if (POSTHOG_KEY) {
    posthog.identify(email, traits)
  }
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', traits)
  }
}

export const isCapiRelayEnabled = CAPI_RELAY_ENABLED
