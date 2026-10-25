/** Mindora refund window. SuccessWise leftover copy used 30; legal `/refund-policy` is 14. */
export const MONEY_BACK_DAYS = 14

export type MarketingLocale = 'en' | 'ru'

export const MONEY_BACK_COPY = {
  en: {
    title: `${MONEY_BACK_DAYS}-Day Money-Back Guarantee`,
    label: `${MONEY_BACK_DAYS}-Day Money-Back`,
    chip: `${MONEY_BACK_DAYS}-day money-back guarantee`,
    chipCap: `${MONEY_BACK_DAYS}-Day money-back guarantee`,
  },
  ru: {
    title: `Гарантия возврата денег ${MONEY_BACK_DAYS} дней`,
    label: `Возврат за ${MONEY_BACK_DAYS} дней`,
    chip: `гарантия возврата денег ${MONEY_BACK_DAYS} дней`,
    chipCap: `Гарантия возврата денег ${MONEY_BACK_DAYS} дней`,
  },
} as const

export function moneyBackCopy(locale: MarketingLocale) {
  return MONEY_BACK_COPY[locale]
}

export const MONEY_BACK_TITLE = MONEY_BACK_COPY.en.title
export const MONEY_BACK_LABEL = MONEY_BACK_COPY.en.label
export const MONEY_BACK_CHIP = MONEY_BACK_COPY.en.chip
export const MONEY_BACK_CHIP_CAP = MONEY_BACK_COPY.en.chipCap
