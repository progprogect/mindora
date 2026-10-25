import type { MarketingLocale } from '@/marketing/data/moneyBack'

export const EMAIL_PREFERENCES_COPY = {
  en: {
    pageTitle: 'MindoraAcademy.com — Turn Daily Learning Into Daily Progress',
    heading: 'Email Preferences',
    optionTitle: 'Tips, insights & product updates',
    optionDescription:
      'Learning tips from your AI coach Mindora, progress celebrations, and platform updates.',
    transactionalNote:
      'Note: Transactional emails (payment receipts, password resets, account alerts) will always be sent regardless of your marketing preferences.',
    saveButton: 'Save Preferences',
    invalidLink: 'No email address provided. Please use the link from your email.',
  },
  ru: {
    pageTitle: 'MindoraAcademy.com — Turn Daily Learning Into Daily Progress',
    heading: 'Настройки email-рассылки',
    optionTitle: 'Советы, идеи и обновления продукта',
    optionDescription:
      'Советы по обучению от вашего AI-коуча Mindora, поздравления с прогрессом и обновления платформы.',
    transactionalNote:
      'Примечание: транзакционные письма (квитанции об оплате, сброс пароля, уведомления об аккаунте) всегда отправляются независимо от ваших маркетинговых настроек.',
    saveButton: 'Сохранить настройки',
    invalidLink: 'Адрес email не указан. Пожалуйста, используйте ссылку из вашего письма.',
  },
} as const

export function emailPreferencesCopy(locale: MarketingLocale) {
  return EMAIL_PREFERENCES_COPY[locale]
}
