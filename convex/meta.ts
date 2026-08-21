import { actionGeneric } from 'convex/server'
import { v } from 'convex/values'

async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value.trim().toLowerCase())
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * `meta.sendEvent` — optional server-side Meta Conversions API (CAPI) relay,
 * deduplicated against the browser Pixel event via the shared `eventId`
 * (see `src/lib/tracking.ts`). Fully optional: the funnel works with
 * browser-only Pixel tracking if `META_ACCESS_TOKEN` is not configured.
 */
export const sendEvent = actionGeneric({
  args: {
    eventName: v.string(),
    eventId: v.string(),
    email: v.optional(v.string()),
    eventSourceUrl: v.optional(v.string()),
    customData: v.optional(v.record(v.string(), v.any())),
  },
  handler: async (_ctx, args) => {
    const pixelId = process.env.META_PIXEL_ID
    const accessToken = process.env.META_ACCESS_TOKEN

    if (!pixelId || !accessToken) {
      return { skipped: true, reason: 'META_PIXEL_ID / META_ACCESS_TOKEN not configured' }
    }

    const userData: Record<string, unknown> = {}
    if (args.email) {
      userData.em = [await sha256Hex(args.email)]
    }

    const payload = {
      data: [
        {
          event_name: args.eventName,
          event_id: args.eventId,
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_source_url: args.eventSourceUrl,
          user_data: userData,
          custom_data: args.customData ?? {},
        },
      ],
    }

    const response = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      },
    )

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Meta CAPI relay failed (${response.status}): ${text}`)
    }

    return { skipped: false }
  },
})
