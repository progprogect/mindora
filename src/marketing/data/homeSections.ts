import type { HomeLocale } from './home'
import { MONEY_BACK_DAYS } from './moneyBack'

const MONEY_BACK_TITLE_EN = `${MONEY_BACK_DAYS}-Day Money-Back Guarantee`

export const HOME_SECTIONS_COPY = {
  en: {
    hero: {
      badge: 'The #1 Platform for Daily Self-Growth',
      h1Become: 'Become',
      h1Better: '1% Better.',
      h1EveryDay: 'Every Single Day.',
      subhead:
        'Curated expert knowledge. A personalised daily system. An AI Coach that turns every lesson into real action — in just 5 minutes a day.',
      cta: 'Start Your 60-Second Success Quiz',
      ctaHint: 'Takes 60 seconds · Instant results',
      starRatingAria: '5 star rating',
      trustedPrefix: 'Trusted by',
      trustedCount: '100,000+ learners',
      trustedSuffix: 'worldwide',
      owlAlt: 'Mindora',
    },
    marquee: {
      intro: 'What do you want to improve?',
      introHighlight: '12 life areas. One system.',
    },
    stats: {
      owlAlt: 'MindoraAcademy owl',
      asSeenIn: 'AS SEEN IN',
    },
    problem: {
      line1Prefix: "You've read the ",
      line1Suffix: ' books.',
      line2Prefix: 'Watched the ',
      line2Suffix: ' videos.',
      line3Prefix: 'Started the ',
      line3Suffix: ' courses.',
      headline: 'And yet — nothing changed.',
      bodyPrefix: "It's not a knowledge problem. It's a ",
      bodyEmphasis: 'system',
      bodySuffix: ' problem.',
      bodyLine2: 'Without a daily framework to act on what you learn, knowledge just piles up.',
      closing: 'MindoraAcademy gives you the system to finally act on what you learn.',
    },
    features: {
      eyebrow: 'How It Works',
      titleLine1: 'Three steps to become',
      titleLine2: 'who you want to be.',
      subtitle: 'A simple daily system. Personalised to you. Powered by expert knowledge and AI.',
      compareEyebrow: 'How we compare',
      compareThemLabel: 'Every other platform',
      compareUsLabel: 'MindoraAcademy',
    },
    howItWorks: {
      eyebrow: 'Our Learning System',
      title: 'Every Lesson Follows the Same Proven System',
      subtitle: 'Designed for real change — not just information. Every step is purposeful.',
      ctaLead: 'Ready to experience a lesson that actually changes something?',
      cta: 'Start Your Roadmap →',
    },
    aiCoach: {
      chatTitle: 'Your AI Coach',
      onlineNow: 'Online now',
      userMsg1:
        "I've been told to ask for a pay rise but I don't know how to start the conversation.",
      coachMsg1:
        "Great timing to work on this! Based on your roadmap, you're currently at the 'Confidence' milestone in your Career path. Let's prepare you for exactly this conversation. When did you last have a performance review?",
      userMsg2: '6 months ago. It went well but I never followed up.',
      coachMsg2:
        'Perfect — that\'s your opening. Here\'s your specific action: Send this message to your manager today: "Hi [Name], I\'d love to schedule 20 minutes to discuss my progress and trajectory. When works for you?" Want me to help you customise it for your situation?',
      inputPlaceholder: 'Ask your AI Coach anything...',
      sendAria: 'Send',
      meetBadge: 'Meet Your AI Coach',
      owlAlt: 'Mindora',
      titleLine1: 'Knowledge without action is',
      titleLine2: 'just',
      titleHighlight: 'expensive entertainment.',
      body:
        'After every lesson, your personal AI Coach converts what you just learned into one specific action for your life — right now, for your exact situation. No vague suggestions. Real next steps.',
      cta: 'Meet Your AI Coach →',
    },
    successStories: {
      eyebrow: 'Real Transformations',
      titleLine1: 'Not just knowledge consumed.',
      titleLine2: 'Lives actually changed.',
      subtitle: 'Real people. Real actions taken. Real results.',
      beforeLabel: 'BEFORE',
      afterLabel: 'AFTER',
      starRatingAria: '5 star rating',
    },
    finalCta: {
      badge: 'Your Journey Starts Today',
      titleLine1: 'The person you want to be',
      titleLine2: 'is already inside you.',
      body:
        'All you need is the right system to bring them out. It starts with a 60-second quiz. It ends with the life you’ve been working towards.',
      cta: 'Start Your Success Quiz',
      ctaHint: '60 seconds · Instant results',
    },
    mobileStickyCta: {
      title: 'Get Your Personal Roadmap',
      subtitle: '60 Second Quiz',
      button: 'Start Now →',
    },
    moneyBack: {
      zeroRisk: 'Zero Risk',
      title: MONEY_BACK_TITLE_EN,
      bodyPrefix: "Try MindoraAcademy.com completely risk-free. If you don't feel the difference in your first ",
      bodyMid: `${MONEY_BACK_DAYS} days — for`,
      bodySuffix:
        " any reason at all — we'll give you a full refund. No forms, no friction, no questions asked.",
      footerPrefix:
        "We back our platform because we've seen what it does for people. Your success is our only goal. ",
      guaranteeLink: 'Read the full guarantee →',
      points: ['Full refund', 'No questions asked', 'Any reason, any time'] as const,
    },
  },
  ru: {
    hero: {
      badge: 'Платформа №1 для ежедневного роста',
      h1Become: 'Становитесь',
      h1Better: 'на 1% лучше.',
      h1EveryDay: 'Каждый день.',
      subhead:
        'Экспертные знания в одном месте. Персональная ежедневная система. AI Coach превращает каждый урок в реальное действие — всего за 5 минут в день.',
      cta: 'Начните 60‑секундный тест на успех',
      ctaHint: '60 секунд · результат сразу',
      starRatingAria: 'Оценка 5 звёзд',
      trustedPrefix: 'Нам доверяют',
      trustedCount: '100,000+ учеников',
      trustedSuffix: 'по всему миру',
      owlAlt: 'Mindora',
    },
    marquee: {
      intro: 'Что хотите улучшить?',
      introHighlight: '12 сфер жизни. Одна система.',
    },
    stats: {
      owlAlt: 'Сова MindoraAcademy',
      asSeenIn: 'О НАС ПИШУТ',
    },
    problem: {
      line1Prefix: 'Вы прочитали ',
      line1Suffix: ' книги.',
      line2Prefix: 'Посмотрели ',
      line2Suffix: ' видео.',
      line3Prefix: 'Начали ',
      line3Suffix: ' курсы.',
      headline: 'И всё же — ничего не изменилось.',
      bodyPrefix: 'Это не проблема знаний. Это проблема ',
      bodyEmphasis: 'системы',
      bodySuffix: '.',
      bodyLine2:
        'Без ежедневной структуры, чтобы применять усвоенное, знания просто копятся.',
      closing: 'MindoraAcademy даёт систему, чтобы наконец действовать по тому, что вы узнали.',
    },
    features: {
      eyebrow: 'Как это работает',
      titleLine1: 'Три шага, чтобы стать',
      titleLine2: 'тем, кем вы хотите быть.',
      subtitle:
        'Простая ежедневная система. Персонально для вас. На экспертных знаниях и ИИ.',
      compareEyebrow: 'Сравнение',
      compareThemLabel: 'Другие платформы',
      compareUsLabel: 'MindoraAcademy',
    },
    howItWorks: {
      eyebrow: 'Наша система обучения',
      title: 'Каждый урок следует одной проверенной системе',
      subtitle:
        'Создано для реальных изменений — не ради информации. Каждый шаг осмыслен.',
      ctaLead: 'Готовы к уроку, который действительно что‑то меняет?',
      cta: 'Начните свой маршрут →',
    },
    aiCoach: {
      chatTitle: 'Ваш AI Coach',
      onlineNow: 'На связи',
      userMsg1:
        'Мне сказали попросить повышение зарплаты, но я не знаю, как начать этот разговор.',
      coachMsg1:
        'Отличный момент поработать над этим! По вашему маршруту вы на этапе «Уверенность» в треке «Карьера». Подготовим вас именно к этому разговору. Когда у вас в последний раз была оценка результативности?',
      userMsg2: '6 месяцев назад. Прошло хорошо, но я так и не вернулся к теме.',
      coachMsg2:
        'Идеально — это ваш заход. Ваше конкретное действие: отправьте менеджеру сегодня: «Привет, [Имя], хотел(а) бы назначить 20 минут, чтобы обсудить мой прогресс и перспективы. Когда вам удобно?» Помочь адаптировать под вашу ситуацию?',
      inputPlaceholder: 'Спросите AI Coach о чём угодно...',
      sendAria: 'Отправить',
      meetBadge: 'Знакомьтесь: AI Coach',
      owlAlt: 'Mindora',
      titleLine1: 'Знания без действий —',
      titleLine2: 'это просто',
      titleHighlight: 'дорогое развлечение.',
      body:
        'После каждого урока ваш личный AI Coach превращает усвоенное в одно конкретное действие для вашей жизни — сейчас, под вашу ситуацию. Без расплывчатых советов. Реальные следующие шаги.',
      cta: 'Познакомиться с AI Coach →',
    },
    successStories: {
      eyebrow: 'Реальные трансформации',
      titleLine1: 'Не просто потреблённые знания.',
      titleLine2: 'Жизни, которые действительно изменились.',
      subtitle: 'Реальные люди. Реальные действия. Реальные результаты.',
      beforeLabel: 'ДО',
      afterLabel: 'ПОСЛЕ',
      starRatingAria: 'Оценка 5 звёзд',
    },
    finalCta: {
      badge: 'Ваш путь начинается сегодня',
      titleLine1: 'Человек, которым вы хотите стать,',
      titleLine2: 'уже внутри вас.',
      body:
        'Нужна только правильная система, чтобы его раскрыть. Начинается с 60‑секундного теста. Заканчивается жизнью, к которой вы стремились.',
      cta: 'Начните тест на успех',
      ctaHint: '60 секунд · результат сразу',
    },
    mobileStickyCta: {
      title: 'Получите персональный маршрут',
      subtitle: 'Тест за 60 секунд',
      button: 'Начать →',
    },
    moneyBack: {
      zeroRisk: 'Без риска',
      title: `Гарантия возврата за ${MONEY_BACK_DAYS} дней`,
      bodyPrefix: 'Попробуйте MindoraAcademy.com без риска. Если за первые ',
      bodyMid: `${MONEY_BACK_DAYS} дней`,
      bodySuffix:
        ' вы не почувствуете разницу — по любой причине — вернём деньги полностью. Без форм, без лишних шагов, без вопросов.',
      footerPrefix:
        'Мы уверены в платформе, потому что видели, как она меняет жизни людей. Ваш успех — наша единственная цель. ',
      guaranteeLink: 'Полные условия гарантии →',
      points: ['Полный возврат', 'Без лишних вопросов', 'По любой причине, в любой момент'] as const,
    },
  },
} as const

export function homeSectionsCopy(locale: HomeLocale) {
  return HOME_SECTIONS_COPY[locale]
}
