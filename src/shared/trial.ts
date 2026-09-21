// Keep in sync with github/server/lib/trial.ts (or the FE twin).
// Server rootDir is ./server — the webhook must not import this frontend module.
export const TRIAL_DAYS = 3
export const TRIAL_CHARGE_DAY = 4 // calendar day after trial ends
