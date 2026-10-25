import type { MarketingLocale } from '@/marketing/data/moneyBack'

export const COMPANY = {
  legalName: 'Scalion Ltd',
  registration: 'United Kingdom (UK)',
  companyNumber: '17157142',
  address: '50 Princes Street, Ipswich, Suffolk, IP1 1RJ, United Kingdom',
  serviceName: 'Mindora Academy',
  brand: 'MindoraAcademy.com',
  brandName: 'MindoraAcademy',
  tld: '.com',
  email: 'support@mindoraacademy.com',
  website: 'https://mindoraacademy.com/',
  websiteHost: 'mindoraacademy.com',
  tradingAs: 'Scalion Ltd T/A. MindoraAcademy.com',
} as const

export const COMPANY_PAGES_COPY = {
  en: {
    defaultPageTitle: `${COMPANY.brand} — Turn Daily Learning Into Daily Progress`,
    about: {
      pageTitle: 'About Us — Mindora Academy',
      kicker: 'Company',
      title: 'About Us',
      subtitle:
        'Mindora Academy is an online educational platform focused on helping people understand and use artificial intelligence in a simple, practical, and effective way.',
      paragraphs: [
        'We offer educational materials, practical resources, and a growing knowledge base of ready-to-use AI prompts that can help users save time, improve productivity, automate everyday tasks, and get better results from AI tools.',
        'Our platform is designed for both beginners who are taking their first steps into the world of artificial intelligence and experienced users who want to expand their knowledge and discover new ways to apply AI in their work and everyday life.',
        'At Mindora Academy, we believe that AI should be accessible to everyone. Our mission is to make learning artificial intelligence easier by providing clear educational content, useful resources, and practical tools that users can apply immediately.',
        'We are constantly expanding our library and developing new materials to help our community stay up to date with the rapidly evolving world of artificial intelligence.',
      ],
    },
    contact: {
      pageTitle: 'Contact — Mindora Academy',
      kicker: 'Company',
      title: 'Contact',
      needHelp: 'Need help? →',
      helpLink: 'Help & Support',
      details: {
        legalEntity: 'Legal entity:',
        registration: 'Registration:',
        companyNumber: 'Company registration number:',
        address: 'Address:',
        serviceName: 'Service name:',
        contactEmail: 'Contact email:',
        website: 'Website:',
      },
    },
    notFound: {
      title: 'Page not found',
      description: "The page you're looking for doesn't exist.",
    },
    legal: {
      kicker: 'Legal',
      lastUpdatedPrefix: 'Last updated:',
    },
    login: {
      pageTitle: 'MindoraAcademy.com — Turn Daily Learning Into Daily Progress',
      checkInbox: 'Check your inbox',
      sentCode: 'We sent a 6-digit code to',
      didntReceive: "Didn't receive it?",
      sendAgain: 'Send again',
      spamTip:
        '💡 Check your spam or junk folder for an email from MindoraAcademy.com — some email providers filter sign-in codes.',
      spamFolder: 'spam or junk folder',
      signingIn: 'Signing in…',
      signIn: 'Sign In',
      welcomeBack: 'Welcome back',
      emailPrompt: "Enter your email and we'll send a quick sign-in code — no password needed.",
      emailLabel: 'Email address',
      noAccount: "Don't have an account?",
      takeQuiz: 'Take the quiz',
      sendingCode: 'Sending code…',
      sendSignInCode: 'Send Sign-In Code',
      sendCodeError: 'Failed to send code. Please check your email and try again.',
      invalidCode: 'Invalid or expired code. Please try again.',
    },
  },
  ru: {
    defaultPageTitle: `${COMPANY.brand} — Превращайте ежедневное обучение в ежедневный прогресс`,
    about: {
      pageTitle: 'О нас — Mindora Academy',
      kicker: 'Компания',
      title: 'О нас',
      subtitle:
        'Mindora Academy — онлайн-платформа для обучения, которая помогает людям понимать и применять искусственный интеллект просто, практично и эффективно.',
      paragraphs: [
        'Мы предлагаем учебные материалы, практические ресурсы и растущую базу готовых AI-промптов, которые помогают экономить время, повышать продуктивность, автоматизировать повседневные задачи и получать лучшие результаты от инструментов ИИ.',
        'Платформа подходит и новичкам, которые только начинают знакомство с миром искусственного интеллекта, и опытным пользователям, которые хотят расширить знания и найти новые способы применять ИИ в работе и повседневной жизни.',
        'В Mindora Academy мы верим, что ИИ должен быть доступен каждому. Наша миссия — упростить обучение искусственному интеллекту с помощью понятного контента, полезных ресурсов и практических инструментов, которые можно применять сразу.',
        'Мы постоянно расширяем библиотеку и создаём новые материалы, чтобы сообщество оставалось в курсе быстро меняющегося мира искусственного интеллекта.',
      ],
    },
    contact: {
      pageTitle: 'Контакты — Mindora Academy',
      kicker: 'Компания',
      title: 'Контакты',
      needHelp: 'Нужна помощь? →',
      helpLink: 'Помощь и поддержка',
      details: {
        legalEntity: 'Юридическое лицо:',
        registration: 'Регистрация:',
        companyNumber: 'Регистрационный номер компании:',
        address: 'Адрес:',
        serviceName: 'Название сервиса:',
        contactEmail: 'Контактный email:',
        website: 'Сайт:',
      },
    },
    notFound: {
      title: 'Страница не найдена',
      description: 'Страница, которую вы ищете, не существует.',
    },
    legal: {
      kicker: 'Документы',
      lastUpdatedPrefix: 'Последнее обновление:',
    },
    login: {
      pageTitle: 'MindoraAcademy.com — Превращайте ежедневное обучение в ежедневный прогресс',
      checkInbox: 'Проверьте почту',
      sentCode: 'Мы отправили 6-значный код на',
      didntReceive: 'Не получили?',
      sendAgain: 'Отправить снова',
      spamTip:
        '💡 Проверьте папку спам или нежелательная почта — письмо от MindoraAcademy.com; некоторые почтовые сервисы фильтруют коды для входа.',
      spamFolder: 'спам или нежелательная почта',
      signingIn: 'Вход…',
      signIn: 'Войти',
      welcomeBack: 'С возвращением',
      emailPrompt:
        'Введите email — мы отправим быстрый код для входа, пароль не нужен.',
      emailLabel: 'Адрес email',
      noAccount: 'Нет аккаунта?',
      takeQuiz: 'Пройти квиз',
      sendingCode: 'Отправка кода…',
      sendSignInCode: 'Отправить код для входа',
      sendCodeError: 'Не удалось отправить код. Проверьте email и попробуйте снова.',
      invalidCode: 'Неверный или просроченный код. Попробуйте снова.',
    },
  },
} as const

export function companyPagesCopy(locale: MarketingLocale) {
  return COMPANY_PAGES_COPY[locale]
}

export const DEFAULT_PAGE_TITLE = COMPANY_PAGES_COPY.en.defaultPageTitle
