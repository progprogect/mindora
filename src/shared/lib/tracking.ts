import posthog from 'posthog-js'
import { v4 as uuidv4 } from 'uuid'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
  }
}

const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined
const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined
const POSTHOG_HOST = (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ?? 'https://us.i.posthog.com'
const CAPI_RELAY_ENABLED = (import.meta.env.VITE_META_CAPI_ENABLED as string | undefined) === 'true'

let initialized = false

/** Injects the Meta Pixel base snippet (browser-side only, standard pattern). */
function injectMetaPixel(pixelId: string) {
  if (window.fbq) return

  const fbq = function fbq(...args: unknown[]) {
    const self = fbq as unknown as { callMethod?: (...a: unknown[]) => void; queue: unknown[] }
    if (self.callMethod) {
      self.callMethod(...args)
    } else {
      self.queue.push(args)
    }
  } as unknown as Window['fbq'] & { queue: unknown[]; loaded: boolean; version: string }

  if (!window._fbq) window._fbq = fbq
  ;(fbq as unknown as { queue: unknown[] }).queue = []
  ;(fbq as unknown as { loaded: boolean }).loaded = true
  ;(fbq as unknown as { version: string }).version = '2.0'
  window.fbq = fbq

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(script)

  window.fbq?.('init', pixelId)
  window.fbq?.('track', 'PageView')
}

export function initTracking(): void {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  if (META_PIXEL_ID) {
    injectMetaPixel(META_PIXEL_ID)
  }

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
