import type { Locale } from '../../../../authorisation/src/i18n/locale'

const COPY = {
  en: {
    pageTitle:
      'Master AI for Microsoft 365 — MindoraAcademy.com | Word, Excel, PowerPoint, Outlook & Teams',
    identity: {
      headline: 'Master AI for Microsoft 365',
      subtext: 'Have you ever used AI to help with Word, Excel, PowerPoint or Outlook?',
      options: [{ label: 'Yes' }, { label: 'Not yet' }],
      collageAlt: 'Claude AI + Microsoft 365 + Microsoft Copilot',
    },
    loading: {
      header: 'Building your Microsoft 365 + AI plan...',
      steps: [
        'Analysing your Microsoft 365 setup...',
        'Matching the app that costs you most time...',
        'Selecting your 24 lessons...',
        'Building your six-module path...',
        'Your Microsoft 365 + AI plan is ready!',
      ],
      commitmentQuestion: 'How committed are you to mastering Microsoft 365 with AI?',
      testimonial: {
        name: 'David R.',
        role: 'Operations Lead',
        text: "The personal path was what sold it. It wasn't generic — it felt built for someone in my exact situation.",
      },
    },
    email: {
      badge: '✓ Your plan is ready',
      title: 'Enter your email to get:',
      subtitle: 'Your personal Microsoft 365 + AI Plan',
      consent:
        "I'd like to receive my Microsoft 365 + AI plan, personal tips, and exclusive offers straight to my inbox.",
      ctaLabel: 'UNLOCK MY PLAN →',
    },
    nameCapture: {
      title: 'One last thing — what should we call you?',
      subtitle: "We'll personalise your plan (and your certificate) with your name.",
      placeholder: 'Your first name',
      ctaLabel: 'CONTINUE →',
      privacyNote: '🔒 Only used to personalise your plan.',
    },
  },
  ru: {
    pageTitle:
      'ИИ для Microsoft 365 — MindoraAcademy.com | Word, Excel, PowerPoint, Outlook и Teams',
    identity: {
      headline: 'Освойте ИИ для Microsoft 365',
      subtext: 'Вы уже использовали ИИ для Word, Excel, PowerPoint или Outlook?',
      options: [{ label: 'Да' }, { label: 'Ещё нет' }],
      collageAlt: 'Claude AI + Microsoft 365 + Microsoft Copilot',
    },
    loading: {
      header: 'Собираем ваш план Microsoft 365 + ИИ…',
      steps: [
        'Анализируем вашу настройку Microsoft 365…',
        'Находим приложение, которое отнимает больше всего времени…',
        'Подбираем 24 урока…',
        'Строим путь из шести модулей…',
        'Ваш план Microsoft 365 + ИИ готов!',
      ],
      commitmentQuestion: 'Насколько вы готовы освоить Microsoft 365 с ИИ?',
      testimonial: {
        name: 'David R.',
        role: 'Руководитель операций',
        text: 'Персональный путь и продал. Это не шаблон — как будто сделали под мою ситуацию.',
      },
    },
    email: {
      badge: '✓ Ваш план готов',
      title: 'Введите email, чтобы получить:',
      subtitle: 'Ваш персональный план Microsoft 365 + ИИ',
      consent:
        'Хочу получать план Microsoft 365 + ИИ, персональные советы и эксклюзивные предложения на email.',
      ctaLabel: 'ОТКРЫТЬ МОЙ ПЛАН →',
    },
    nameCapture: {
      title: 'Последнее — как к вам обращаться?',
      subtitle: 'Мы персонализируем план (и сертификат) с вашим именем.',
      placeholder: 'Ваше имя',
      ctaLabel: 'ПРОДОЛЖИТЬ →',
      privacyNote: '🔒 Используем только для персонализации плана.',
    },
  },
} as const

export function m365ScreenCopy(locale: Locale) {
  return COPY[locale]
}

export function m365PageTitle(locale: Locale) {
  return COPY[locale].pageTitle
}
