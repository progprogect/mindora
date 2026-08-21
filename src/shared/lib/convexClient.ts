import { ConvexReactClient } from 'convex/react'

const CONVEX_URL = import.meta.env.VITE_CONVEX_URL as string | undefined

export const isConvexConfigured = Boolean(CONVEX_URL)

/**
 * When `VITE_CONVEX_URL` is not set (e.g. local dev before `npx convex dev`
 * has been run), we still construct a client against a syntactically-valid
 * (but unreachable) deployment URL so the app renders normally — Convex
 * validates the `word-word-000.convex.cloud` shape at construction time.
 * All calls made through `lib/backend.ts` are wrapped in try/catch and never
 * block the quiz/sales UX — see docs/28_day_quiz.
 */
export const convexClient = new ConvexReactClient(CONVEX_URL ?? 'https://not-configured-000.convex.cloud', {
  unsavedChangesWarning: false,
})
