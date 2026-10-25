import type { ClaudeLocale } from '@/funnels/claude/i18n/locale'

const COPY = {
  en: {
    layout: { backAria: 'Go back' },
    identity: {
      titleLine1: "Let's Create Your",
      titleHighlight: 'Claude AI',
      titleLine2: 'Learning Plan',
      hint: 'Answer a few quick questions and get your personalised Claude learning plan in just 60 seconds.',
      imageAlt: (label: string) => `Claude AI - ${label}`,
    },
    socialProof: {
      joinedThisWeek: 'Joined this week',
      rating: '4.9 / 5 from 12,400+ learners',
      claudeAlt: 'Claude AI',
    },
    question: {
      questionOf: (step: number, total: number) => `Question ${step} of ${total}`,
    },
    interstitial: { continue: 'CONTINUE →' },
    certificate: {
      titleBefore: 'Earn your',
      titleHighlight: 'Claude AI',
      titleAfter: 'Certificate of Mastery',
      subtext:
        'Complete the learning plan and earn a certificate recognising your commitment to developing practical Claude AI skills.',
      imageAlt: 'Claude AI Certificate of Mastery',
      bullets: [
        'Official Claude AI mastery certification by MindoraAcademy.com',
        'Recognised credential for your CV and LinkedIn',
        'Validates real, practical AI skills — not just theory',
        'Complete in 7 days — 15 minutes per day',
      ],
      continue: 'CONTINUE →',
    },
    loading: {
      header: 'Building your certification path...',
      steps: [
        'Analysing your Claude experience...',
        'Mapping your skill gaps...',
        'Selecting your certification modules...',
        'Building your personalised path...',
        'Your Claude AI Certification plan is ready!',
      ],
      quickQuestion: 'Quick question',
      deviceTitle: 'Where will you mostly be learning?',
      deviceSubtext: "We'll optimise your plan for it",
      deviceConfirm: "✓ Perfect — we'll optimise your plan for that!",
      almostThere: 'Almost there',
      commitmentQuestion: 'How committed are you to earning your Claude certification?',
      commitmentSubtext: 'Be honest — your plan adapts to you',
      commitmentConfirm: {
        full: "🔥 That's the mindset. Your plan is almost ready!",
        high: '💪 Love that. Your plan is almost ready!',
        medium: '🙂 Every step counts. Your plan is almost ready!',
        trying: "🤞 We've got you. Your plan is almost ready!",
      },
      deviceOptions: {
        phone: 'My phone',
        laptop: 'My laptop',
        desktop: 'My desktop',
        mix: 'Mix of devices',
      },
      commitmentOptions: {
        full: 'Fully committed',
        high: 'Very committed',
        medium: 'Pretty committed',
        trying: "I'll try my best",
      },
      testimonials: [
        {
          name: 'Sarah M.',
          role: 'Marketing Manager',
          text: 'I went from knowing nothing about AI to automating half my weekly tasks. The 28-day structure made it feel completely achievable.',
        },
        {
          name: 'James K.',
          role: 'Software Engineer',
          text: 'I thought I already knew AI pretty well, but MindoraAcademy showed me workflows I never even considered. Game-changer.',
        },
        {
          name: 'Priya T.',
          role: 'Freelance Designer',
          text: 'Finally a course that respects my time. 10 minutes a day and I genuinely feel confident using AI in my projects now.',
        },
        {
          name: 'David R.',
          role: 'Operations Lead',
          text: "The personal path was what sold it. It wasn't generic — it felt built for someone in my exact situation.",
        },
        {
          name: 'Emma L.',
          role: 'HR Director',
          text: "I was terrified of being left behind by AI. MindoraAcademy completely transformed how I see it. Now I'm excited about it.",
        },
      ],
    },
    email: {
      planReady: '✓ Your plan is ready',
      title: 'Enter your email to get your',
      titleHighlight: 'Personal AI Plan!',
      features: [
        { icon: '📅', text: '28-day path' },
        { icon: '🎯', text: 'Personal plan' },
        { icon: '🏆', text: 'Exclusive access' },
      ],
      invalidEmail: 'Please enter a valid email address',
      submitError: 'Something went wrong. Please try again.',
      consent: "I'd like to receive my AI plan, personal tips, and exclusive offers straight to my inbox.",
      bonusPrefix: 'Make sure your email is valid —',
      bonusBold: "don't miss your exclusive bonus!",
      privacy: '🔒 We never share your email. Unsubscribe any time.',
      unlocking: 'Unlocking your plan...',
      cta: 'UNLOCK MY PLAN →',
    },
    nameCapture: {
      title: 'What should we call you?',
      subtext: "We'll personalise your Claude certification path with your name",
      placeholder: 'Enter your first name',
      continue: 'Continue',
    },
    terms: {
      prefix: 'By proceeding, you agree to the',
      terms: 'Terms and Conditions',
      privacy: 'Privacy Policy',
      subscription: 'Subscription Terms',
      company: 'Scalion Ltd T/A. MindoraAcademy.com',
    },
  },
  ru: {
    layout: { backAria: 'Назад' },
    identity: {
      titleLine1: 'Создадим ваш',
      titleHighlight: 'Claude AI',
      titleLine2: 'план обучения',
      hint: 'Ответьте на несколько быстрых вопросов и получите персональный план обучения Claude за 60 секунд.',
      imageAlt: (label: string) => `Claude AI — ${label}`,
    },
    socialProof: {
      joinedThisWeek: 'Присоединились на этой неделе',
      rating: '4,9 / 5 от 12 400+ учеников',
      claudeAlt: 'Claude AI',
    },
    question: {
      questionOf: (step: number, total: number) => `Вопрос ${step} из ${total}`,
    },
    interstitial: { continue: 'ПРОДОЛЖИТЬ →' },
    certificate: {
      titleBefore: 'Получите',
      titleHighlight: 'Claude AI',
      titleAfter: 'сертификат мастерства',
      subtext:
        'Завершите план обучения и получите сертификат, подтверждающий вашу приверженность практическим навыкам Claude AI.',
      imageAlt: 'Сертификат Claude AI — сертификат мастерства',
      bullets: [
        'Официальная сертификация по Claude AI от MindoraAcademy.com',
        'Признанное подтверждение для CV и LinkedIn',
        'Подтверждает реальные практические навыки AI — не только теорию',
        'За 7 дней — 15 минут в день',
      ],
      continue: 'ПРОДОЛЖИТЬ →',
    },
    loading: {
      header: 'Создаём ваш путь к сертификации...',
      steps: [
        'Анализируем ваш опыт с Claude...',
        'Определяем пробелы в навыках...',
        'Подбираем модули сертификации...',
        'Собираем персональный маршрут...',
        'Ваш план сертификации Claude AI готов!',
      ],
      quickQuestion: 'Быстрый вопрос',
      deviceTitle: 'Где вы чаще всего будете учиться?',
      deviceSubtext: 'Мы оптимизируем план под это',
      deviceConfirm: '✓ Отлично — оптимизируем план под это!',
      almostThere: 'Почти готово',
      commitmentQuestion: 'Насколько вы готовы получить сертификацию Claude?',
      commitmentSubtext: 'Будьте честны — план подстроится под вас',
      commitmentConfirm: {
        full: '🔥 Вот это настрой! Ваш план почти готов!',
        high: '💪 Отлично. Ваш план почти готов!',
        medium: '🙂 Каждый шаг важен. Ваш план почти готов!',
        trying: '🤞 Мы с вами. Ваш план почти готов!',
      },
      deviceOptions: {
        phone: 'На телефоне',
        laptop: 'На ноутбуке',
        desktop: 'На настольном ПК',
        mix: 'На разных устройствах',
      },
      commitmentOptions: {
        full: 'Полностью готов(а)',
        high: 'Очень готов(а)',
        medium: 'Достаточно готов(а)',
        trying: 'Постараюсь изо всех сил',
      },
      testimonials: [
        {
          name: 'Sarah M.',
          role: 'Менеджер по маркетингу',
          text: 'Я ничего не знала об AI, а через неделю автоматизировала половину еженедельных задач. Структура на 28 дней сделала цель достижимой.',
        },
        {
          name: 'James K.',
          role: 'Инженер-программист',
          text: 'Думал, что уже хорошо знаю AI, но MindoraAcademy показала процессы, о которых я не думал. Это переломный момент.',
        },
        {
          name: 'Priya T.',
          role: 'Фриланс-дизайнер',
          text: 'Наконец курс, который уважает моё время. 10 минут в день — и я уверенно использую AI в проектах.',
        },
        {
          name: 'David R.',
          role: 'Руководитель операций',
          text: 'Продало персональный маршрут. Это не шаблон — как будто сделано для моей ситуации.',
        },
        {
          name: 'Emma L.',
          role: 'Директор по HR',
          text: 'Боялась отстать от AI. MindoraAcademy полностью изменила мой взгляд. Теперь я в восторге от этого.',
        },
      ],
    },
    email: {
      planReady: '✓ Ваш план готов',
      title: 'Введите email, чтобы получить',
      titleHighlight: 'персональный AI-план!',
      features: [
        { icon: '📅', text: 'Путь на 28 дней' },
        { icon: '🎯', text: 'Персональный план' },
        { icon: '🏆', text: 'Эксклюзивный доступ' },
      ],
      invalidEmail: 'Введите корректный адрес email',
      submitError: 'Что-то пошло не так. Попробуйте ещё раз.',
      consent: 'Хочу получать AI-план, персональные советы и эксклюзивные предложения на почту.',
      bonusPrefix: 'Убедитесь, что email верный —',
      bonusBold: 'не упустите эксклюзивный бонус!',
      privacy: '🔒 Мы не передаём email третьим лицам. Отписаться можно в любой момент.',
      unlocking: 'Открываем ваш план...',
      cta: 'ОТКРЫТЬ МОЙ ПЛАН →',
    },
    nameCapture: {
      title: 'Как к вам обращаться?',
      subtext: 'Мы персонализируем путь к сертификации Claude с вашим именем',
      placeholder: 'Введите имя',
      continue: 'Продолжить',
    },
    terms: {
      prefix: 'Продолжая, вы соглашаетесь с',
      terms: 'Условиями использования',
      privacy: 'Политикой конфиденциальности',
      subscription: 'Условиями подписки',
      company: 'Scalion Ltd T/A. MindoraAcademy.com',
    },
  },
} as const

export function claudeQuizUiCopy(locale: ClaudeLocale) {
  return COPY[locale]
}
