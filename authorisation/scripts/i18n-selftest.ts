import assert from 'node:assert/strict'
import { en, ru } from '../src/i18n/messages.ts'
import { localeFromPathname, localeFromSignals, withLocale } from '../src/i18n/locale.ts'

const enKeys = Object.keys(en).sort()
const ruKeys = Object.keys(ru).sort()
assert.deepEqual(ruKeys, enKeys, 'ru keys must match en keys')
for (const key of enKeys) {
  assert.ok(en[key as keyof typeof en].length > 0, `empty en ${key}`)
  assert.ok(ru[key as keyof typeof ru].length > 0, `empty ru ${key}`)
}

assert.equal(localeFromSignals('ru', 'en-US'), 'ru')
assert.equal(localeFromSignals('en', 'ru-RU'), 'en')
assert.equal(localeFromSignals(null, 'ru-RU'), 'en')
assert.equal(localeFromSignals(null, 'ru'), 'en')
assert.equal(localeFromSignals(null, 'en-GB'), 'en')
assert.equal(localeFromSignals('de', 'fr'), 'en')

assert.equal(localeFromPathname('/en'), 'en')
assert.equal(localeFromPathname('/en/pricing'), 'en')
assert.equal(localeFromPathname('/ru/app/dashboard'), 'ru')
assert.equal(localeFromPathname('/pricing'), null)
assert.equal(localeFromPathname('/de/pricing'), null)

assert.equal(withLocale('ru', '/pricing'), '/ru/pricing')
assert.equal(withLocale('ru', '/en/pricing?x=1#top'), '/ru/pricing?x=1#top')
assert.equal(withLocale('en', '/ru/about'), '/en/about')
assert.equal(withLocale('en', 'pricing'), '/en/pricing')
assert.equal(withLocale('en', '/api/auth'), '/api/auth')
assert.equal(withLocale('en', 'https://example.com/x'), 'https://example.com/x')
assert.equal(withLocale('en', '#section'), '#section')

console.log(`[i18n] ${enKeys.length} keys, locale signals ok`)
