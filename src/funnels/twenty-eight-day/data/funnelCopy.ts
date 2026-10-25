import type { FunnelLocale } from '@/funnels/twenty-eight-day/data/quizScreens'

export function quizPageCopy(locale: FunnelLocale) {
  if (locale === 'ru') {
    return {
      seeMyPlan: 'Посмотреть мой план →',
      continue: 'Продолжить →',
      startChallenge: 'Начать 28-дневный ИИ-челлендж →',
    }
  }
  return {
    seeMyPlan: 'See My Plan →',
    continue: 'Continue →',
    startChallenge: 'Start My 28-Day AI Challenge →',
  }
}

export function quizBackLabel(locale: FunnelLocale): string {
  return locale === 'ru' ? 'Назад' : 'Go back'
}

export function identityFooterLegal(locale: FunnelLocale): string {
  return locale === 'ru' ? 'Scalion Ltd T/A. MindoraAcademy.com' : 'Scalion Ltd T/A. MindoraAcademy.com'
}

export function quizTermsCopy(locale: FunnelLocale) {
  if (locale === 'ru') {
    return {
      prefix: 'Продолжая, вы соглашаетесь с',
      terms: 'Условиями использования',
      privacy: 'Политикой конфиденциальности',
      subscription: 'Условиями подписки',
      and: ',',
    }
  }
  return {
    prefix: 'By proceeding, you agree to the',
    terms: 'Terms and Conditions',
    privacy: 'Privacy Policy',
    subscription: 'Subscription Terms',
    and: ',',
  }
}

export function emailScreenCopy(locale: FunnelLocale) {
  if (locale === 'ru') {
    return {
      planReady: '✓ Ваш план готов',
      features: [
        { emoji: '📅', label: '28-дневный путь' },
        { emoji: '🎯', label: 'Личный план' },
        { emoji: '🏆', label: 'Эксклюзивный доступ' },
      ],
      invalidEmail: 'Введите корректный email',
      consent:
        'Хочу получать мой план по ИИ, персональные советы и эксклюзивные предложения на email.',
      bonusLead: 'Убедитесь, что email верный —',
      bonusBold: 'не упустите эксклюзивный бонус!',
      privacy: '🔒 Мы не передаём ваш email третьим лицам. Отписаться можно в любой момент.',
      unlocking: 'Открываем ваш план...',
      cta: 'ОТКРЫТЬ МОЙ ПЛАН →',
    }
  }
  return {
    planReady: '✓ Your plan is ready',
    features: [
      { emoji: '📅', label: '28-day path' },
      { emoji: '🎯', label: 'Personal plan' },
      { emoji: '🏆', label: 'Exclusive access' },
    ],
    invalidEmail: 'Please enter a valid email address',
    consent:
      "I'd like to receive my AI plan, personal tips, and exclusive offers straight to my inbox.",
    bonusLead: 'Make sure your email is valid —',
    bonusBold: "don't miss your exclusive bonus!",
    privacy: '🔒 We never share your email. Unsubscribe any time.',
    unlocking: 'Unlocking your plan...',
    cta: 'UNLOCK MY PLAN →',
  }
}

export function nameScreenCopy(locale: FunnelLocale) {
  if (locale === 'ru') {
    return { placeholder: 'Введите имя', continue: 'Продолжить' }
  }
  return { placeholder: 'Enter your first name', continue: 'Continue' }
}

export function loadingScreenCopy(locale: FunnelLocale) {
  if (locale === 'ru') {
    return {
      building: 'Создаём ваш план...',
      quickQuestion: 'Быстрый вопрос',
      deviceTitle: 'Где вы чаще всего будете учиться?',
      deviceSubtitle: 'Мы оптимизируем план под это',
      deviceConfirm: '✓ Отлично — оптимизируем план под это!',
      almostThere: 'Почти готово',
      commitmentTitle: 'Насколько вы готовы к 28-дневному ИИ-челленджу?',
      commitmentSubtitle: 'Будьте честны — план подстраивается под вас',
      deviceOptions: [
        { id: 'phone', label: 'На телефоне', emoji: '📱' },
        { id: 'laptop', label: 'На ноутбуке', emoji: '💻' },
        { id: 'desktop', label: 'На компьютере', emoji: '🖥️' },
        { id: 'mix', label: 'На разных устройствах', emoji: '📱💻' },
      ],
      commitmentOptions: [
        { id: 'full', label: 'Полностью готов(а)', emoji: '🏆' },
        { id: 'high', label: 'Очень готов(а)', emoji: '💪' },
        { id: 'medium', label: 'Достаточно готов(а)', emoji: '🙂' },
        { id: 'trying', label: 'Постараюсь изо всех сил', emoji: '🤞' },
      ],
      commitmentConfirm: {
        full: '🔥 Вот это настрой! Ваш план почти готов!',
        high: '💪 Отлично. Ваш план почти готов!',
        medium: '🙂 Каждый шаг важен. Ваш план почти готов!',
        trying: '🤞 Мы рядом. Ваш план почти готов!',
      },
      buildSteps: [
        'Анализируем ваши цели...',
        'Подбираем уровень навыков...',
        'Выбираем трек обучения...',
        'Настраиваем ежедневный график...',
        'Ваш план готов!',
      ],
      testimonials: [
        {
          name: 'Sarah M.',
          role: 'Менеджер по маркетингу',
          text:
            'Я прошла путь от нуля до автоматизации половины еженедельных задач. 28-дневная структура сделала это реально достижимым.',
        },
        {
          name: 'James K.',
          role: 'Инженер-программист',
          text:
            'Я думал, что уже хорошо знаю ИИ, но MindoraAcademy показала рабочие процессы, о которых я не задумывался. Это переломный момент.',
        },
        {
          name: 'Priya T.',
          role: 'Фриланс-дизайнер',
          text:
            'Наконец курс, который уважает моё время. 10 минут в день — и я действительно уверенно использую ИИ в проектах.',
        },
        {
          name: 'David R.',
          role: 'Руководитель операций',
          text:
            'Личный путь — вот что меня зацепило. Это не шаблон, а план для моей ситуации.',
        },
        {
          name: 'Emma L.',
          role: 'Директор по HR',
          text:
            'Я боялась отстать от ИИ. MindoraAcademy полностью изменила мой взгляд — теперь я в восторге от возможностей.',
        },
      ],
    }
  }
  return {
    building: 'Building your plan...',
    quickQuestion: 'Quick question',
    deviceTitle: 'Where will you mostly be learning?',
    deviceSubtitle: "We'll optimise your plan for it",
    deviceConfirm: "✓ Perfect — we'll optimise your plan for that!",
    almostThere: 'Almost there',
    commitmentTitle: 'How committed are you to your 28-Day Challenge?',
    commitmentSubtitle: 'Be honest — your plan adapts to you',
    deviceOptions: [
      { id: 'phone', label: 'My phone', emoji: '📱' },
      { id: 'laptop', label: 'My laptop', emoji: '💻' },
      { id: 'desktop', label: 'My desktop', emoji: '🖥️' },
      { id: 'mix', label: 'Mix of devices', emoji: '📱💻' },
    ],
    commitmentOptions: [
      { id: 'full', label: 'Fully committed', emoji: '🏆' },
      { id: 'high', label: 'Very committed', emoji: '💪' },
      { id: 'medium', label: 'Pretty committed', emoji: '🙂' },
      { id: 'trying', label: "I'll try my best", emoji: '🤞' },
    ],
    commitmentConfirm: {
      full: "🔥 That's the mindset. Your plan is almost ready!",
      high: '💪 Love that. Your plan is almost ready!',
      medium: '🙂 Every step counts. Your plan is almost ready!',
      trying: "🤞 We've got you. Your plan is almost ready!",
    },
    buildSteps: [
      'Analysing your goals...',
      'Matching your skill level...',
      'Selecting your learning track...',
      'Setting your daily schedule...',
      'Your plan is ready!',
    ],
    testimonials: [
      {
        name: 'Sarah M.',
        role: 'Marketing Manager',
        text:
          'I went from knowing nothing about AI to automating half my weekly tasks. The 28-day structure made it feel completely achievable.',
      },
      {
        name: 'James K.',
        role: 'Software Engineer',
        text:
          'I thought I already knew AI pretty well, but MindoraAcademy showed me workflows I never even considered. Game-changer.',
      },
      {
        name: 'Priya T.',
        role: 'Freelance Designer',
        text:
          'Finally a course that respects my time. 10 minutes a day and I genuinely feel confident using AI in my projects now.',
      },
      {
        name: 'David R.',
        role: 'Operations Lead',
        text: "The personal path was what sold it. It wasn't generic — it felt built for someone in my exact situation.",
      },
      {
        name: 'Emma L.',
        role: 'HR Director',
        text:
          "I was terrified of being left behind by AI. MindoraAcademy completely transformed how I see it. Now I'm excited about it.",
      },
    ],
  }
}

export function aiScoreCardCopy(locale: FunnelLocale) {
  if (locale === 'ru') {
    return { readiness: 'Оценка готовности к ИИ' }
  }
  return { readiness: 'AI Readiness Score' }
}

export function personalProfileCopy(locale: FunnelLocale) {
  if (locale === 'ru') {
    return {
      profileBadge: (name: string | null) => (name ? `Профиль ИИ ${name}` : 'Ваш профиль ИИ'),
      title: (name: string | null) =>
        name ? `${name}, вот ваш личный план` : 'Ваш персональный итог по ИИ',
      subtitle: 'По вашим ответам мы составили персональную 28-дневную дорожную карту',
      archetypeLabel: 'Ваш архетип ИИ',
    }
  }
  return {
    profileBadge: (name: string | null) => (name ? `${name}'s AI Profile` : 'Your AI Profile'),
    title: (name: string | null) =>
      name ? `${name}, here's your personal plan` : 'Your Personal AI Summary',
    subtitle: "Based on your answers, we've built your custom 28-day roadmap",
    archetypeLabel: 'Your AI Archetype',
  }
}

export function salesBenefitsCopy(locale: FunnelLocale) {
  const goalPhrase: Record<string, string> =
    locale === 'ru'
      ? {
          'grow-role': 'получить повышение и зарабатывать больше',
          'switch-career': 'сменить карьеру и выделиться',
          'side-income': 'построить прибыльную подработку с ИИ',
          creative: 'умножить творческий результат с ИИ',
          'stay-current': 'быть на 10 шагов впереди, пока ИИ меняет отрасли',
          other: 'узнать, что ИИ может дать именно вам',
        }
      : {
          'grow-role': 'get promoted and earn more',
          'switch-career': 'switch careers and stand out',
          'side-income': 'build a profitable AI side business',
          creative: 'multiply your creative output with AI',
          'stay-current': 'stay 10 steps ahead as AI reshapes every industry',
          other: 'discover what AI can do for you',
        }

  if (locale === 'ru') {
    return {
      goalPhrase,
      defaultGoal: 'раскрыть свой потенциал в ИИ',
      titleLine1: 'ИИ проще,',
      titleLine2: 'чем кажется',
      designed: 'Создан, чтобы помочь вам',
      starting: '— уже с первого дня.',
      builtFor: 'Создан для',
      builtForItems: [
        { icon: '✅', text: 'Не нужен опыт работы с ИИ' },
        { icon: '📈', text: 'Не нужен диплом университета' },
        { icon: '💡', text: 'Учитесь в своём темпе, на своих условиях' },
      ],
      benefitsTitle: 'С 28-дневным ИИ-челленджем вы:',
      benefits: [
        { bold: 'Освоите инструменты ИИ', rest: ', о которых все говорят — ChatGPT, Gemini, Midjourney и другие' },
        { bold: 'Получите практические навыки', rest: ', которые можно применять с первого дня' },
        { bold: 'Получите сертификат по ИИ', rest: ' и выделитесь среди тех, кто всё ещё путается в ИИ' },
        { bold: 'Откроете 1 000+ проверенных промптов', rest: ' для продуктивности, бизнеса и творчества' },
        { bold: 'Будете отслеживать прогресс', rest: ' и набирать уверенность с каждым уроком' },
      ],
      more: '…и многое другое!',
    }
  }
  return {
    goalPhrase,
    defaultGoal: 'unlock your AI potential',
    titleLine1: 'AI is Easier',
    titleLine2: 'Than You Think',
    designed: 'Designed to help you',
    starting: '— starting day one.',
    builtFor: 'Built for',
    builtForItems: [
      { icon: '✅', text: 'No prior AI knowledge required' },
      { icon: '📈', text: 'No university degree needed' },
      { icon: '💡', text: 'Work at your own pace, on your terms' },
    ],
    benefitsTitle: 'With the 28-Day AI Challenge, you will:',
    benefits: [
      { bold: 'Master the AI tools', rest: ' everyone is talking about — ChatGPT, Gemini, Midjourney & more' },
      { bold: 'Build practical, real-world AI skills', rest: ' you can use from day one' },
      { bold: 'Earn an AI Certificate', rest: ' and stand out from people who still struggle with AI' },
      { bold: 'Unlock 1,000+ proven AI prompts', rest: ' for productivity, business, and creativity' },
      { bold: 'Track your progress', rest: ' and build unstoppable confidence with every lesson' },
    ],
    more: '…and much more!',
  }
}

export function salesBeforeAfterCopy(locale: FunnelLocale) {
  if (locale === 'ru') {
    return {
      titleLine1: 'Ваша 28-дневная',
      titleLine2: 'трансформация',
      certBy: 'Мы ожидаем, что вы получите сертификат по ИИ к',
      without: 'Без',
      with: 'С',
      struggles: 'Сложности:',
      solutions: 'Решения:',
      readiness: 'Ваша готовность к ИИ',
      withoutBullets: {
        'no-plan': ['Нет системы и плана', 'Случайные попытки с ИИ', 'Нет измеримого прогресса'],
        'no-time': ['Нет времени на новые навыки', 'Каждый день отстаёте', 'Перегруз и паралич'],
        'too-complex': ['ИИ кажется слишком сложным', 'Путаница из-за шумихи и жаргона', 'Начинаете и бросаете'],
        'no-start': ['Не знаете, с чего начать', 'Другие уходят вперёд', 'Действуете наугад'],
      },
      withBullets: {
        'no-plan': ['Понятная ежедневная структура', 'Один навык в день, видимый прогресс', 'Уверенность за 28 дней'],
        'no-time': ['Всего 10 мин/день — реальный результат', 'Опережаете коллег', 'Результаты с первой недели'],
        'too-complex': ['Простые уроки без жаргона', 'Реальные инструменты понятным языком', 'ИИ наконец складывается в картину'],
        'no-start': ['Понятный путь с 1-го дня', 'Ежедневный импульс', 'Действуете уверенно'],
      },
      goalResult: {
        'grow-role': 'Повышение и больший доход',
        'switch-career': 'Карьерный переход завершён',
        'side-income': 'Доход с ИИ открыт',
        creative: 'Творческий результат умножен',
        'stay-current': 'На 10 шагов впереди',
        other: 'ИИ работает на вас',
      },
      defaultResult: 'ИИ работает на вас',
      dateLocale: 'ru-RU',
    }
  }
  return {
    titleLine1: 'Your 28-Day',
    titleLine2: 'Transformation',
    certBy: 'We expect you to be AI-certified by',
    without: 'Without',
    with: 'With',
    struggles: 'Struggles:',
    solutions: 'Solutions:',
    readiness: 'Your AI Readiness',
    withoutBullets: {
      'no-plan': ['No system or clear plan', 'Randomly trying AI tools', 'No measurable progress'],
      'no-time': ['No time to learn new skills', 'Falling further behind daily', 'Overwhelm and paralysis'],
      'too-complex': ['AI feels too complicated', 'Confused by hype and jargon', 'Starting and stopping'],
      'no-start': ["Don't know where to begin", 'Watching others pull ahead', 'Guessing instead of doing'],
    },
    withBullets: {
      'no-plan': ['Clear step-by-step daily structure', 'One skill per day, tracked progress', 'Confidence in 28 days'],
      'no-time': ['Just 10 mins/day — proven results', 'Skill-up faster than your peers', 'Results from week one'],
      'too-complex': ['Simple lessons, zero jargon', 'Real tools explained clearly', 'AI makes sense, finally'],
      'no-start': ['A clear path starting from day 1', 'Daily momentum builds fast', 'Acting with confidence'],
    },
    goalResult: {
      'grow-role': 'Promoted and earning more',
      'switch-career': 'Career pivot complete',
      'side-income': 'AI income stream unlocked',
      creative: 'Creative output multiplied',
      'stay-current': '10 steps ahead',
      other: 'AI working for you',
    },
    defaultResult: 'AI working for you',
    dateLocale: 'en-GB',
  }
}

export function salesSocialProofCopy(locale: FunnelLocale) {
  if (locale === 'ru') {
    return {
      titleLine1: 'Присоединяйтесь к 100 000+',
      titleLine2: 'ученикам ИИ',
      subtitle: 'Люди, как вы, которые сделали первый шаг',
      stats: [
        { value: '100k+', label: 'Учеников по всему миру' },
        { value: '4.8★', label: 'Средняя оценка' },
        { value: '93%', label: 'Видят результат к 7-му дню' },
      ],
      testimonialsTitle: 'Что говорят наши ученики',
      testimonials: [
        {
          name: 'Sarah M.',
          initials: 'SM',
          role: 'Менеджер по маркетингу',
          color: 'bg-sw-blue',
          quote:
            'Я прошла путь от нуля до ежедневного использования ИИ на работе. 28-дневная структура сделала это реально посильным — даже с двумя детьми.',
        },
        {
          name: 'James K.',
          initials: 'JK',
          role: 'Фриланс-дизайнер',
          color: 'bg-teal-500',
          quote:
            'Автоматизировал 3 часа работы в неделю с навыками только первых 7 дней. Жаль, что не начал раньше.',
        },
        {
          name: 'Priya R.',
          initials: 'PR',
          role: 'Смена карьеры',
          color: 'bg-purple-500',
          quote:
            'Получила сертификат по ИИ и через 6 недель после курса вышла на новую роль. Личный план сделал всё.',
        },
      ],
    }
  }
  return {
    titleLine1: 'Join 100,000+',
    titleLine2: 'AI Learners',
    subtitle: 'People just like you who took the first step',
    stats: [
      { value: '100k+', label: 'Learners worldwide' },
      { value: '4.8★', label: 'Average rating' },
      { value: '93%', label: 'See results by day 7' },
    ],
    testimonialsTitle: 'What Our Learners Are Saying',
    testimonials: [
      {
        name: 'Sarah M.',
        initials: 'SM',
        role: 'Marketing Manager',
        color: 'bg-sw-blue',
        quote:
          'I went from zero AI knowledge to using it every single day at work. The 28-day structure made it completely manageable — even with two kids.',
      },
      {
        name: 'James K.',
        initials: 'JK',
        role: 'Freelance Designer',
        color: 'bg-teal-500',
        quote: "I automated 3 hours of work a week using skills from just the first 7 days. I genuinely wish I'd started sooner.",
      },
      {
        name: 'Priya R.',
        initials: 'PR',
        role: 'Career Changer',
        color: 'bg-purple-500',
        quote:
          'Got my AI certificate and landed a new role within 6 weeks of finishing. The personal plan made all the difference.',
      },
    ],
  }
}

export function salesSpinWheelCopy(locale: FunnelLocale) {
  if (locale === 'ru') {
    return {
      offSuffix: 'скидка',
      titleLine1: 'Крутите и откройте',
      titleLine2: 'личную скидку!',
      subtitle: 'Не упустите шанс освоить ИИ с персональной наградой 🎁',
      spin: 'КРУТИТЬ',
      spinning: 'КРУТИМ…',
      won: 'ВЫ ВЫИГРАЛИ 97% СКИДКИ! 🎉',
      popupTitle: 'Ура! 🥳',
      wonDiscount: (name: string | null) =>
        name ? `${name}, вы выиграли скидку` : 'Вы выиграли скидку',
      applied: 'Она применится автоматически',
      claim: 'ЗАБРАТЬ СКИДКУ',
    }
  }
  return {
    offSuffix: 'off',
    titleLine1: 'Spin & Unlock Your',
    titleLine2: 'Personal Discount!',
    subtitle: "Don't miss your chance to master AI with your personal reward 🎁",
    spin: 'SPIN',
    spinning: 'SPINNING…',
    won: 'YOU WON 97% OFF! 🎉',
    popupTitle: 'Woo hoo! 🥳',
    wonDiscount: (name: string | null) => (name ? `${name}, you won a discount` : 'You won a discount'),
    applied: 'It will be applied automatically',
    claim: 'CLAIM MY DISCOUNT',
  }
}

export function salesPlanCopy(locale: FunnelLocale) {
  if (locale === 'ru') {
    return {
      offerEnded: 'Предложение закончилось',
      offerExpires: 'Предложение истекает',
      refreshDeal: '🔄 Обновите для новой скидки',
      startFor: 'Начать всего за',
      refreshCta: 'ОБНОВИТЬ →',
      getPlan: 'ПОЛУЧИТЬ ПЛАН →',
      specialDiscount: 'Специальная скидка:',
      offerExpiredRefresh: '🔄 Предложение истекло — обновите страницу для новой скидки',
      planTitle: 'Ваш личный 28-дневный план по ИИ',
      planReadyWithName: (name: string) => `готов, ${name}!`,
      planReadyHighlight: 'готов!',
      yourGoal: '🎯 Ваша цель',
      yourLevel: '⚡ Ваш уровень',
      dayLabel: 'ДЕНЬ',
      getAiPlan: 'ПОЛУЧИТЬ МОЙ ПЛАН ПО ИИ →',
      liveEnrolled: (handle: string, minutes: string) => `${handle} только что записался · ${minutes}`,
      peopleStartedPrefix: '🔥 ',
      peopleStartedCount: '1 247 человек',
      peopleStartedSuffix: ' начали план на этой неделе',
      emailMissing: 'Введите email раньше в квизе, чтобы открыть оплату.',
      includedTitle: 'Что входит в ваш план',
      personalised: (archetype: string, emoji: string) => `План для архетипа ${archetype} ${emoji}`,
      included: [
        '28 структурированных ежедневных уроков по ИИ (всего 10 мин/день)',
        '150+ инструментов ИИ, шаблонов и библиотека промптов',
        'Сертификат о прохождении',
        'Новый контент каждую неделю',
        'Отмена в любой момент — без обязательств',
      ],
      membersSay: 'Отзывы участников',
      moneyBackBody: 'Не подошло? Полный возврат без лишних вопросов.',
      choosePlan: 'Выберите план',
      selectPlan: 'Выберите план, чтобы начать путь',
      refreshDiscount: '🔄 Обновите страницу, чтобы получить новую скидку',
      cancelAnyTime: 'Отмена в любой момент.',
      perMonth: '/мес',
      getStarted: 'НАЧАТЬ',
      paySafe: 'Безопасная оплата',
      paySafeAlt: 'Принимаем Mastercard, Visa, Amex, Discover',
      liveMinutes: [
        '1 мин назад',
        '2 мин назад',
        '3 мин назад',
        '4 мин назад',
        '5 мин назад',
        '6 мин назад',
        '7 мин назад',
        '8 мин назад',
        '9 мин назад',
        '10 мин назад',
        '11 мин назад',
        '12 мин назад',
      ],
      memberTestimonials: [
        {
          name: 'Sophie R.',
          role: 'Менеджер по маркетингу',
          stars: 5,
          quote:
            'Я прошла путь от нуля до собственных автоматизированных процессов за 28 дней. Это переломный момент.',
        },
        {
          name: 'Marcus T.',
          role: 'Владелец бизнеса',
          stars: 5,
          quote: 'Ежедневная структура держала в ритме. Ко 2-й неделе я экономил 3 часа в день на работе.',
        },
        {
          name: 'Claire N.',
          role: 'Руководитель операций',
          stars: 5,
          quote: 'Сначала сомневалась. Теперь использую ИИ каждый день — и начальство это заметило.',
        },
      ],
    }
  }
  return {
    offerEnded: 'Offer ended',
    offerExpires: 'Offer expires',
    refreshDeal: '🔄 Refresh for a new deal',
    startFor: 'Start for Just',
    refreshCta: 'REFRESH →',
    getPlan: 'GET MY PLAN →',
    specialDiscount: 'Special Discount:',
    offerExpiredRefresh: '🔄 Offer expired — refresh page for a new deal',
      planTitle: 'Your personal 28-Day AI Plan',
      planReadyWithName: (name: string) => `is ready, ${name}!`,
      planReadyHighlight: 'is ready!',
    yourGoal: '🎯 Your Goal',
    yourLevel: '⚡ Your Level',
    dayLabel: 'DAY',
    getAiPlan: 'GET MY AI PLAN →',
    liveEnrolled: (handle: string, minutes: string) => `${handle} just enrolled · ${minutes}`,
      peopleStartedPrefix: '🔥 ',
      peopleStartedCount: '1,247 people',
      peopleStartedSuffix: ' started their plan this week',
    emailMissing: 'Please enter your email earlier in the quiz to unlock checkout.',
    includedTitle: "What's included in your plan",
    personalised: (archetype: string, emoji: string) => `Plan personalised for ${archetype} ${emoji}`,
    included: [
      '28 structured daily AI lessons (just 10 min/day)',
      '150+ AI tools, templates & prompts library',
      'Certificate of completion',
      'New content added every week',
      'Cancel anytime — no lock-in',
    ],
    membersSay: 'What members say',
    moneyBackBody: 'Not right for you? Full refund, no questions asked.',
    choosePlan: 'Choose your plan',
    selectPlan: 'Select a plan to start your journey',
    refreshDiscount: '🔄 Refresh page to unlock a new discount',
    cancelAnyTime: 'Cancel any time.',
    perMonth: '/mo',
    getStarted: 'GET STARTED',
    paySafe: 'Pay safe & secure',
    paySafeAlt: 'Mastercard, Visa, Amex, Discover accepted',
    liveMinutes: [
      '1 min ago',
      '2 min ago',
      '3 min ago',
      '4 min ago',
      '5 min ago',
      '6 min ago',
      '7 min ago',
      '8 min ago',
      '9 min ago',
      '10 min ago',
      '11 min ago',
      '12 min ago',
    ],
    memberTestimonials: [
      {
        name: 'Sophie R.',
        role: 'Marketing Manager',
        stars: 5,
        quote:
          'I went from knowing nothing about AI to building my own automated workflows in 28 days. Game-changer.',
      },
      {
        name: 'Marcus T.',
        role: 'Business Owner',
        stars: 5,
        quote: 'The daily structure kept me consistent. By week 2 I was saving 3 hours a day at work.',
      },
      {
        name: 'Claire N.',
        role: 'Operations Lead',
        stars: 5,
        quote: 'I was sceptical at first. Now I use AI every day and my boss has noticed.',
      },
    ],
  }
}

/** Locale strings only — months / badge keys stay on EN `PLAN_DISPLAY_META`. */
type PlanLabelCopy = { label: string; periodLabel: string }

type PlanDisplayCopy = {
  plans: Record<
    'Monthly Plan' | 'Quarterly Plan' | 'Annual Plan' | '6-Month Plan' | '12-Month Plan',
    PlanLabelCopy
  >
  byMonths: Record<1 | 3 | 6 | 12, PlanLabelCopy>
  perPeriod: string
  badges: Record<'MOST POPULAR' | 'BEST VALUE', string>
  defaultNames: Record<'monthly' | '6month' | '12month', string>
}

export function planDisplayCopy(locale: FunnelLocale): PlanDisplayCopy {
  if (locale === 'ru') {
    return {
      plans: {
        'Monthly Plan': { label: '1 месяц', periodLabel: 'в месяц' },
        'Quarterly Plan': { label: '3 месяца', periodLabel: 'каждые 3 месяца' },
        'Annual Plan': { label: '12 месяцев', periodLabel: 'в год' },
        '6-Month Plan': { label: '6 месяцев', periodLabel: 'каждые 6 месяцев' },
        '12-Month Plan': { label: '12 месяцев', periodLabel: 'в год' },
      },
      byMonths: {
        1: { label: '1 месяц', periodLabel: 'в месяц' },
        3: { label: '3 месяца', periodLabel: 'каждые 3 месяца' },
        6: { label: '6 месяцев', periodLabel: 'каждые 6 месяцев' },
        12: { label: '12 месяцев', periodLabel: 'в год' },
      },
      perPeriod: 'за период',
      badges: {
        'MOST POPULAR': 'САМЫЙ ПОПУЛЯРНЫЙ',
        'BEST VALUE': 'ЛУЧШАЯ ЦЕНА',
      },
      defaultNames: {
        monthly: 'Месячный план',
        '6month': 'План на 6 месяцев',
        '12month': 'План на 12 месяцев',
      },
    }
  }
  return {
    plans: {
      'Monthly Plan': { label: '1 month', periodLabel: 'per month' },
      'Quarterly Plan': { label: '3 months', periodLabel: 'every 3 months' },
      'Annual Plan': { label: '12 months', periodLabel: 'per year' },
      '6-Month Plan': { label: '6 months', periodLabel: 'every 6 months' },
      '12-Month Plan': { label: '12 months', periodLabel: 'per year' },
    },
    byMonths: {
      1: { label: '1 month', periodLabel: 'per month' },
      3: { label: '3 months', periodLabel: 'every 3 months' },
      6: { label: '6 months', periodLabel: 'every 6 months' },
      12: { label: '12 months', periodLabel: 'per year' },
    },
    perPeriod: 'per period',
    badges: {
      'MOST POPULAR': 'MOST POPULAR',
      'BEST VALUE': 'BEST VALUE',
    },
    defaultNames: {
      monthly: 'Monthly Plan',
      '6month': '6-Month Plan',
      '12month': '12-Month Plan',
    },
  }
}
