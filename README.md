# SuccessWise Quizzes

Unified SPA combining two quiz funnels:

- **28-Day AI Challenge** — `/quiz/28-day-ai-challenge`
- **Claude AI Certification** — `/quiz/claude-ai-certification`

Landing page at `/` lets users pick a quiz. Individual funnel source projects live in the parent monorepo (`28_days_quiz/`, `claude_ai_certification/`).

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:5173/` — landing with both quizzes.

For Convex backend during development:

```bash
npm run convex:dev   # terminal 1
npm run dev          # terminal 2
```

## Environment variables

Copy `.env.example` → `.env.local`:

| Variable | Purpose |
|----------|---------|
| `VITE_CONVEX_URL` | Convex deployment URL |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `VITE_META_PIXEL_ID` | Meta Pixel ID |
| `VITE_META_CAPI_ENABLED` | Enable server-side CAPI relay |
| `VITE_POSTHOG_KEY` / `VITE_POSTHOG_HOST` | PostHog analytics |

Server secrets (`STRIPE_SECRET_KEY`, etc.) are set on the Convex deployment, not in `.env`.

## Build

```bash
npm run build
npm run lint
```

Production static server (Railway):

```bash
npm start
```

## Routes

| Path | Page |
|------|------|
| `/` | Landing (variant A) |
| `/quiz/28-day-ai-challenge` | 28-day quiz funnel |
| `/quiz/claude-ai-certification` | Claude quiz funnel |
| `/checkout/setup?funnel=` | Unified post-checkout |
| `/checkout?product=&funnel=` | Expired-offer $1 checkout |
| `/terms-and-conditions`, `/privacy-policy`, `/subscription-terms` | Legal stubs |
