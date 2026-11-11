import { loadEnv } from '../env.js'

/** Public site origin for links in emails (no request context); falls back to the production host. */
export function publicOriginFromEnv(): string {
  return loadEnv().PUBLIC_ORIGIN.replace(/\/$/, '') || 'https://www.mindoraacademy.com'
}
