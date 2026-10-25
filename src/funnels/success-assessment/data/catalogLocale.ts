import type { Locale } from '../../../../authorisation/src/i18n/locale'
import catalogEn from './catalog.json'
import catalogRu from './catalog.ru.json'
import type { RawCatalogItem } from '@/funnels/shared/lib/mapCatalog'

export function catalogForLocale(locale: Locale): RawCatalogItem[] {
  return (locale === 'ru' ? catalogRu : catalogEn) as RawCatalogItem[]
}
