import type { Locale } from '../../../../authorisation/src/i18n/locale'

const COPY = {
  en: {
    pageTitle: 'Success Assessment — MindoraAcademy.com | Your Personalised Roadmap',
    identity: {
      kicker: 'MindoraAcademy Success Assessment',
      headline: 'Discover your\npersonal roadmap',
      question: "What's your #1 focus right now?",
      hint: '(Choose one)',
      bullets: ['Takes only 60 seconds.', 'Get your personal plan.'],
      options: [
        { label: 'Career & Business' },
        { label: 'Wealth & Freedom' },
        { label: 'Health & Vitality' },
        { label: 'Mindset & Confidence' },
      ],
    },
    socialProof: {
      statBox: '500,000+ people have used MindoraAcademy to transform their life',
      rating: '4.9 / 5 from 12,400+ learners',
    },
    loading: {
      header: 'Building your profile...',
      steps: [
        'Analysing your goals...',
        'Mapping your success dimensions...',
        'Selecting your archetype...',
        'Building your personalised roadmap...',
        'Your Success Profile is ready!',
      ],
      commitmentQuestion: 'How committed are you to transforming your life?',
      testimonial: {
        name: 'James W.',
        role: 'Freelancer',
        text: "I'd tried three times before and always quit. MindoraAcademy gave me a system that worked with my life, not against it.",
      },
    },
    email: {
      badge: '✓ Your Success Profile is ready',
      title: 'Enter your email to get your',
      subtitle: 'Personal Success Plan!',
      features: [
        { label: 'Success profile' },
        { label: 'Personal roadmap' },
        { label: 'Exclusive access' },
      ],
      consent:
        "I'd like to receive my Success Plan, personal tips, and exclusive offers straight to my inbox.",
      ctaLabel: 'UNLOCK MY SUCCESS PLAN →',
    },
    nameCapture: {
      title: 'What should we call you?',
      subtitle: "We'll personalise your Success Profile with your name",
      placeholder: 'Enter your first name',
      ctaLabel: 'REVEAL MY SUCCESS PROFILE →',
    },
  },
  ru: {
    pageTitle: 'Оценка успеха — MindoraAcademy.com | Ваш персональный план',
    identity: {
      kicker: 'Оценка успеха MindoraAcademy',
      headline: 'Откройте свой\nперсональный план',
      question: 'Что для вас сейчас главный приоритет?',
      hint: '(Выберите один вариант)',
      bullets: ['Займёт всего 60 секунд.', 'Получите личный план.'],
      options: [
        { label: 'Карьера и бизнес' },
        { label: 'Богатство и свобода' },
        { label: 'Здоровье и энергия' },
        { label: 'Мышление и уверенность' },
      ],
    },
    socialProof: {
      statBox: 'Более 500 000 человек изменили жизнь с MindoraAcademy',
      rating: '4,9 / 5 от 12 400+ учеников',
    },
    loading: {
      header: 'Собираем ваш профиль…',
      steps: [
        'Анализируем ваши цели…',
        'Сопоставляем измерения успеха…',
        'Подбираем ваш архетип…',
        'Строим персональную дорожную карту…',
        'Ваш профиль успеха готов!',
      ],
      commitmentQuestion: 'Насколько вы готовы изменить свою жизнь?',
      testimonial: {
        name: 'James W.',
        role: 'Фрилансер',
        text: 'Я пробовал три раза и каждый раз бросал. MindoraAcademy дал систему, которая работала с моей жизнью, а не против неё.',
      },
    },
    email: {
      badge: '✓ Ваш профиль успеха готов',
      title: 'Введите email, чтобы получить',
      subtitle: 'Персональный план успеха!',
      features: [
        { label: 'Профиль успеха' },
        { label: 'Личная дорожная карта' },
        { label: 'Эксклюзивный доступ' },
      ],
      consent:
        'Хочу получать план успеха, персональные советы и эксклюзивные предложения на email.',
      ctaLabel: 'ОТКРЫТЬ МОЙ ПЛАН УСПЕХА →',
    },
    nameCapture: {
      title: 'Как к вам обращаться?',
      subtitle: 'Мы персонализируем профиль успеха с вашим именем',
      placeholder: 'Введите имя',
      ctaLabel: 'ПОКАЗАТЬ МОЙ ПРОФИЛЬ УСПЕХА →',
    },
  },
} as const

export function saScreenCopy(locale: Locale) {
  return COPY[locale]
}

export function saPageTitle(locale: Locale) {
  return COPY[locale].pageTitle
}
