import assert from 'node:assert/strict'
import { en, ru } from '../src/i18n/messages.ts'
import { localeFromSignals } from '../src/i18n/locale.ts'

const enKeys = Object.keys(en).sort()
const ruKeys = Object.keys(ru).sort()
assert.deepEqual(ruKeys, enKeys, 'ru keys must match en keys')
for (const key of enKeys) {
  assert.ok(en[key as keyof typeof en].length > 0, `empty en ${key}`)
  assert.ok(ru[key as keyof typeof ru].length > 0, `empty ru ${key}`)
}

assert.equal(localeFromSignals('ru', 'en-US'), 'ru')
assert.equal(localeFromSignals('en', 'ru-RU'), 'en')
assert.equal(localeFromSignals(null, 'ru-RU'), 'ru')
assert.equal(localeFromSignals(null, 'ru'), 'ru')
assert.equal(localeFromSignals(null, 'en-GB'), 'en')
assert.equal(localeFromSignals('de', 'fr'), 'en')

console.log(`[i18n] ${enKeys.length} keys, locale signals ok`)
