import type { MarketingLocale } from '@/marketing/data/moneyBack'

export const UNSUBSCRIBE_COPY = {
  en: {
    pageTitle: 'MindoraAcademy.com — Turn Daily Learning Into Daily Progress',
    heading: 'Unsubscribe',
    confirmQuestion: 'Are you sure you want to unsubscribe?',
    button: 'Unsubscribe',
    invalidLink: 'No email address provided. Please use the link from your email.',
  },
  ru: {
    pageTitle: 'MindoraAcademy.com — Turn Daily Learning Into Daily Progress',
    heading: 'Отписаться от рассылки',
    confirmQuestion: 'Вы уверены, что хотите отписаться от рассылки?',
    button: 'Отписаться',
    invalidLink: 'Адрес email не указан. Пожалуйста, используйте ссылку из вашего письма.',
  },
} as const

export function unsubscribeCopy(locale: MarketingLocale) {
  return UNSUBSCRIBE_COPY[locale]
}
