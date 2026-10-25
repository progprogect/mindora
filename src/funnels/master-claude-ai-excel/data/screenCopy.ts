import type { Locale } from '../../../../authorisation/src/i18n/locale'

const COPY = {
  en: {
    pageTitle: 'Master Claude AI for Excel — MindoraAcademy.com | Save 5+ Hours/Week',
    identity: {
      headline: 'Advance Your Excel Work With Claude',
      subtext: 'Have you ever used Claude?',
      options: [{ label: 'Yes' }, { label: 'No' }],
      collageAlt: 'Claude AI + Microsoft Excel',
    },
    loading: {
      header: 'Building your Excel + AI path...',
      steps: [
        'Analysing your Excel level...',
        'Mapping your formula gaps...',
        'Selecting your Claude workflows...',
        'Building your personalised path...',
        'Your Excel + AI plan is ready!',
      ],
      commitmentQuestion: 'How committed are you to mastering Excel with Claude?',
      testimonial: {
        name: 'Priya T.',
        role: 'Freelance Designer',
        text: 'Finally a course that respects my time. 10 minutes a day and I genuinely feel confident using AI in my projects now.',
      },
    },
    email: {
      badge: '✓ Your plan is ready',
      title: 'Enter your email to get:',
      subtitle: 'Your personal Master\nClaude AI + Excel Plan',
      consent:
        "I'd like to receive my Claude AI + Excel plan, personal tips, and exclusive offers straight to my inbox.",
      ctaLabel: 'UNLOCK MY PLAN →',
    },
    nameCapture: {
      title: 'What should we call you?',
      subtitle: "We'll personalise your Excel + AI mastery path with your name",
      placeholder: 'Enter your first name',
      ctaLabel: 'Continue',
    },
  },
  ru: {
    pageTitle: 'Claude AI для Excel — MindoraAcademy.com | Экономьте 5+ часов в неделю',
    identity: {
      headline: 'Прокачайте работу в Excel с Claude',
      subtext: 'Вы уже пользовались Claude?',
      options: [{ label: 'Да' }, { label: 'Нет' }],
      collageAlt: 'Claude AI + Microsoft Excel',
    },
    loading: {
      header: 'Собираем ваш путь Excel + ИИ…',
      steps: [
        'Анализируем ваш уровень Excel…',
        'Находим пробелы в формулах…',
        'Подбираем сценарии с Claude…',
        'Строим персональный путь…',
        'Ваш план Excel + ИИ готов!',
      ],
      commitmentQuestion: 'Насколько вы готовы освоить Excel с Claude?',
      testimonial: {
        name: 'Priya T.',
        role: 'Фриланс-дизайнер',
        text: 'Наконец курс, который уважает моё время. 10 минут в день — и я реально уверенно использую ИИ в проектах.',
      },
    },
    email: {
      badge: '✓ Ваш план готов',
      title: 'Введите email, чтобы получить:',
      subtitle: 'Ваш персональный план\nClaude AI + Excel',
      consent:
        'Хочу получать план Claude AI + Excel, персональные советы и эксклюзивные предложения на email.',
      ctaLabel: 'ОТКРЫТЬ МОЙ ПЛАН →',
    },
    nameCapture: {
      title: 'Как к вам обращаться?',
      subtitle: 'Мы персонализируем путь Excel + ИИ с вашим именем',
      placeholder: 'Введите имя',
      ctaLabel: 'Продолжить',
    },
  },
} as const

export function excelScreenCopy(locale: Locale) {
  return COPY[locale]
}

export function excelPageTitle(locale: Locale) {
  return COPY[locale].pageTitle
}
