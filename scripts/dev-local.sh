#!/usr/bin/env bash
# Local dev with an isolated Postgres and Stripe TEST keys only. Never touches the remote DB or live Stripe.
set -euo pipefail
cd "$(dirname "$0")/.."
get() { grep -E "^$1=" .env.local | head -1 | cut -d= -f2- | tr -d "'\" "; }
SK="$(get STRIPE_SECRET_KEY)"; PK="$(get STRIPE_PUBLISHABLE_KEY)"
case "$SK" in sk_test_*) ;; *) echo "refusing to start: .env.local STRIPE_SECRET_KEY is not a sk_test_ key" >&2; exit 1;; esac
case "$PK" in pk_test_*) ;; *) echo "refusing to start: .env.local STRIPE_PUBLISHABLE_KEY is not a pk_test_ key" >&2; exit 1;; esac
export STRIPE_SECRET_KEY="$SK" STRIPE_PUBLISHABLE_KEY="$PK" VITE_STRIPE_PUBLISHABLE_KEY="$PK"
export DATABASE_URL="postgresql://postgres:local@localhost:55440/mindora"
export PUBLIC_ORIGIN="http://localhost:5173" NODE_ENV=development PORT=3000
export STRIPE_WEBHOOK_SECRET="" AUTH_RESEND_KEY=""
unset ANTHROPIC_API_KEY OPENAI_API_KEY META_ACCESS_TOKEN || true
exec npm run dev
