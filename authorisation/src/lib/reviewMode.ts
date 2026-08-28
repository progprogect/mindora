const REVIEW_PARAM = 'review'
const REVIEW_EMAILS = ['rob@inetsquared.com', 'rob@clicktech.com']

function emailAllowed(email: string | undefined) {
  if (!email) return false
  const trimmed = email.trim().toLowerCase()
  return trimmed ? REVIEW_EMAILS.includes(trimmed) : false
}

export function isReviewQuery() {
  if (typeof window === 'undefined') return false
  try {
    return new URLSearchParams(window.location.search).get(REVIEW_PARAM) === '1'
  } catch {
    return false
  }
}

let armed = false

/** Prod: `i` — arm review mode when `?review=1` and the signed-in email is allowlisted. */
export function armReviewMode(email: string | undefined) {
  const next = isReviewQuery() && emailAllowed(email)
  armed = next
  return next
}

/** Prod: `a` — purchases stay disabled while review query is on and mode was armed. */
export function isReviewPurchaseBlocked() {
  return armed && isReviewQuery()
}

export const REVIEW_PURCHASE_BLOCKED = 'Review mode: purchases are disabled on this page.'
