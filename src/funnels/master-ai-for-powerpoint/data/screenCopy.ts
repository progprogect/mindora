import type { Locale } from '../../../../authorisation/src/i18n/locale'

const COPY = {
  en: {
    pageTitle: 'Master AI for PowerPoint — MindoraAcademy.com | Build Decks in Minutes',
    identity: {
      headline: 'Master AI for PowerPoint',
      subtext: 'Have you ever used AI to help build a presentation?',
      options: [{ label: 'Yes' }, { label: 'Not yet' }],
      collageAlt: 'Claude AI + Microsoft PowerPoint + Microsoft Copilot',
    },
    loading: {
      header: 'Building your PowerPoint + AI path...',
      steps: [
        'Analysing your PowerPoint level...',
        'Mapping your slide gaps...',
        'Selecting your AI workflows...',
        'Building your personalised path...',
        'Your PowerPoint + AI plan is ready!',
      ],
      commitmentQuestion: 'How committed are you to mastering PowerPoint with AI?',
      testimonial: {
        name: 'David R.',
        role: 'Operations Lead',
        text: "The personal path was what sold it. It wasn't generic — it felt built for someone in my exact situation.",
      },
    },
    email: {
      badge: '✓ Your plan is ready',
      title: 'Enter your email to get:',
      subtitle: 'Your personal Master\nAI + PowerPoint Plan',
      consent:
        "I'd like to receive my AI + PowerPoint plan, personal tips, and exclusive offers straight to my inbox.",
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
    pageTitle: 'ИИ для PowerPoint — MindoraAcademy.com | Деки за минуты',
    identity: {
      headline: 'Освойте ИИ для PowerPoint',
      subtext: 'Вы уже использовали ИИ для презентаций?',
      options: [{ label: 'Да' }, { label: 'Ещё нет' }],
      collageAlt: 'Claude AI + Microsoft PowerPoint + Microsoft Copilot',
    },
    loading: {
      header: 'Собираем ваш путь PowerPoint + ИИ…',
      steps: [
        'Анализируем ваш уровень PowerPoint…',
        'Находим пробелы в слайдах…',
        'Подбираем сценарии с ИИ…',
        'Строим персональный путь…',
        'Ваш план PowerPoint + ИИ готов!',
      ],
      commitmentQuestion: 'Насколько вы готовы освоить PowerPoint с ИИ?',
      testimonial: {
        name: 'David R.',
        role: 'Руководитель операций',
        text: 'Персональный путь и продал. Это не шаблон — как будто сделали под мою ситуацию.',
      },
    },
    email: {
      badge: '✓ Ваш план готов',
      title: 'Введите email, чтобы получить:',
      subtitle: 'Ваш персональный план\nИИ + PowerPoint',
      consent: 'Хочу получать план ИИ + PowerPoint, персональные советы и эксклюзивные предложения на email.',
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

export function pptScreenCopy(locale: Locale) {
  return COPY[locale]
}

export function pptPageTitle(locale: Locale) {
  return COPY[locale].pageTitle
}
