import type { AppLocale } from './lib/localePath.js'

declare module 'hono' {
  interface ContextVariableMap {
    locale: AppLocale
  }
}
