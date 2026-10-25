import { MONEY_BACK_DAYS, moneyBackCopy, type MarketingLocale } from '@/marketing/data/moneyBack'

const MONEY_BACK_CHIP_EN = moneyBackCopy('en').chip
const MONEY_BACK_CHIP_RU = moneyBackCopy('ru').chip

export type FaqArticle = {
  id: string
  question: string
  answer: string
  categoryId: string
  categoryTitle: string
}

export type FaqCategory = {
  id: string
  title: string
  description: string
  icon: string
  articles: FaqArticle[]
}

const FAQ_CATEGORIES_EN: FaqCategory[] = [
  {
    id: 'getting-started',
    title: "Getting Started",
    description: "Account setup, logging in, and starting your first course.",
    icon: "\ud83d\ude80",
    articles: [
      {
        id: 'create-account',
        question: "How do I create an account?",
        answer: "Tap \"Start Free Trial\" on our homepage or pricing page. You'll be asked for your email address — we'll send you a one-time code to verify it. That's it. No password to remember, no lengthy forms. Once verified, you're in and can start learning immediately during your 3-day $1 trial.",
        categoryId: 'getting-started',
        categoryTitle: "Getting Started",
      },
      {
        id: 'how-to-login',
        question: "How do I log in?",
        answer: "Tap \"Log In\" at the top of any page. Enter the email address you signed up with and we'll send a one-time login code to your inbox. Enter the code and you're in — no password needed. Check your spam/junk folder if you don't see the email within a minute.",
        categoryId: 'getting-started',
        categoryTitle: "Getting Started",
      },
      {
        id: 'start-course',
        question: "How do I start a course?",
        answer: "After logging in, go to your Dashboard. You'll see categories like AI & Technology, Success Mindset, Career, and more. Tap into any category to see available courses, then tap \"Start\" on the course you want. Each lesson takes just 3-5 minutes — perfect for learning on the go.",
        categoryId: 'getting-started',
        categoryTitle: "Getting Started",
      },
    ],
  },
  {
    id: 'subscription-billing',
    title: "Subscription & Billing",
    description: "Plans, pricing, free trial, payments, and how to cancel.",
    icon: "\ud83d\udcb3",
    articles: [
      {
        id: 'plans-pricing',
        question: "What plans are available and how much do they cost?",
        answer: "We offer three simple plans — all include full access to every course, feature, and future content:\n\n• 1-Month Plan — billed monthly\n• 6-Month Plan (Most Popular) — billed every 6 months at a significant discount\n• 12-Month Plan (Best Value) — billed annually at the lowest per-month price\n\nAll plans include a 3-day $1 trial. Visit our Pricing page for exact amounts in your currency. We believe in full transparency — the price you see is the price you pay. No hidden fees, ever.",
        categoryId: 'subscription-billing',
        categoryTitle: "Subscription & Billing",
      },
      {
        id: 'free-trial',
        question: "How does the 3-day $1 trial work?",
        answer: "When you sign up, you pay $1 and get 3 days of full, unrestricted access to everything — every course, every feature, no limitations. On day 4, your chosen plan begins and your payment method is charged the full plan price. If you cancel before the trial ends, you won't be charged the full amount.",
        categoryId: 'subscription-billing',
        categoryTitle: "Subscription & Billing",
      },
      {
        id: 'when-charged',
        question: "When will I be charged?",
        answer: "You pay $1 today to start your 3-day trial. Your first full charge happens on day 4 — the day after your 3-day $1 trial ends. After that, you're billed at the start of each billing cycle (monthly, every 6 months, or annually depending on your plan). We'll always send you a receipt by email when a payment is taken.",
        categoryId: 'subscription-billing',
        categoryTitle: "Subscription & Billing",
      },
      {
        id: 'cancel-subscription',
        question: "How do I cancel my subscription?",
        answer: "You can cancel anytime from your Profile page inside the app. Tap your profile icon, then tap \"Cancel Subscription.\" You'll be taken directly to the cancellation screen — no hoops to jump through, no retention calls, no guilt trips. After cancelling, you keep access until the end of your current billing period.",
        categoryId: 'subscription-billing',
        categoryTitle: "Subscription & Billing",
      },
      {
        id: 'payment-methods',
        question: "What payment methods do you accept?",
        answer: "We accept all major credit and debit cards (Visa, Mastercard, American Express) as well as Apple Pay and Google Pay. All payments are processed securely through Stripe — we never see or store your card details.",
        categoryId: 'subscription-billing',
        categoryTitle: "Subscription & Billing",
      },
      {
        id: 'why-charged',
        question: "Why was I charged?",
        answer: `If you see a charge from MindoraAcademy, it's likely because your 3-day $1 trial ended and your first full charge was taken on day 4 when your subscription began. Check your email for a receipt with the exact amount and date. If you believe the charge is incorrect, you're covered by our ${MONEY_BACK_CHIP_EN} — just email us and we'll sort it out immediately.`,
        categoryId: 'subscription-billing',
        categoryTitle: "Subscription & Billing",
      },
    ],
  },
  {
    id: 'refunds-guarantee',
    title: "Refunds & Guarantee",
    description: `Our ${MONEY_BACK_CHIP_EN} explained.`,
    icon: "\ud83d\udee1\ufe0f",
    articles: [
      {
        id: 'refund-policy',
        question: "What is your refund policy?",
        answer: `We offer a ${MONEY_BACK_CHIP_EN} on all plans — no questions asked. This matches the ${MONEY_BACK_DAYS}-day statutory cooling-off period required by UK/EU law. If you're not satisfied within ${MONEY_BACK_DAYS} days of your first charge, we'll refund you in full. No lengthy forms, no interrogation, no hard feelings. We believe our platform should earn your money, not trap it.`,
        categoryId: 'refunds-guarantee',
        categoryTitle: "Refunds & Guarantee",
      },
      {
        id: 'request-refund',
        question: "How do I request a refund?",
        answer: "Simply email us at support@mindoraacademy.com with the subject \"Refund Request\" and include the email address on your account. We aim to respond within 1-3 business days. Approved refunds are processed back to your original payment method within 5-10 business days (depending on your bank).",
        categoryId: 'refunds-guarantee',
        categoryTitle: "Refunds & Guarantee",
      },
      {
        id: 'guarantee-coverage',
        question: `What does the ${MONEY_BACK_CHIP_EN} cover?`,
        answer: `The guarantee covers your first subscription on any plan. The ${MONEY_BACK_DAYS}-day window starts from your first full charge (day 4, after the $1 trial). It applies once per customer. It does not apply to repeat subscriptions (if you cancel, claim a refund, then resubscribe). After ${MONEY_BACK_DAYS} days, we don't offer refunds as standard — but we're always reasonable and will consider exceptional circumstances.`,
        categoryId: 'refunds-guarantee',
        categoryTitle: "Refunds & Guarantee",
      },
    ],
  },
  {
    id: 'using-successwise',
    title: "Using MindoraAcademy",
    description: "Courses, progress tracking, streaks, badges, and XP.",
    icon: "\ud83d\udcda",
    articles: [
      {
        id: 'how-courses-work',
        question: "How do courses work?",
        answer: "Each course is broken into daily lessons designed to take 3-5 minutes. Every lesson has 5 learning cards (bite-sized content with key concepts, stats, and actionable tasks) followed by a 3-question quiz to check your understanding. Complete a lesson each day to build your streak and earn XP.",
        categoryId: 'using-successwise',
        categoryTitle: "Using MindoraAcademy",
      },
      {
        id: 'xp-streaks-badges',
        question: "What are XP, streaks, and badges?",
        answer: "XP (Experience Points) — Earned every time you complete a lesson. Score higher on quizzes to earn more XP.\n\nStreaks — Complete at least one lesson per day to build your streak. The longer your streak, the more bonus XP you earn.\n\nBadges — Special achievements unlocked as you hit milestones: First Step (first lesson), On Fire (7-day streak), Module Master (complete a module), Course Graduate (finish a full course), and more.",
        categoryId: 'using-successwise',
        categoryTitle: "Using MindoraAcademy",
      },
      {
        id: 'mobile-usage',
        question: "Can I use MindoraAcademy on my phone?",
        answer: "Yes — MindoraAcademy is designed mobile-first. It works beautifully on any smartphone browser (Safari, Chrome, Firefox). No app download required. Simply visit mindoraacademy.com on your phone, log in, and start learning. You can even add it to your home screen for an app-like experience.",
        categoryId: 'using-successwise',
        categoryTitle: "Using MindoraAcademy",
      },
      {
        id: 'track-progress',
        question: "How do I track my progress?",
        answer: "Your Dashboard shows everything at a glance: current courses, progress bars, streak count, total XP, and badges earned. Each category page shows detailed progress per course. The Progress page gives you a bird's-eye view across all categories.",
        categoryId: 'using-successwise',
        categoryTitle: "Using MindoraAcademy",
      },
    ],
  },
  {
    id: 'certificates',
    title: "Certificates",
    description: "Earning, finding, downloading and sharing your certificates.",
    icon: "\ud83c\udf93",
    articles: [
      {
        id: 'do-i-get-a-certificate',
        question: "Do I get a certificate when I finish a course?",
        answer: "Yes. Every time you complete a course you earn a Certificate of Completion, included free with your subscription — there is nothing extra to buy and nothing to apply for.\n\nEach certificate shows your name, the course you completed, the date, and a unique certificate number that anyone can use to verify it.",
        categoryId: 'certificates',
        categoryTitle: "Certificates",
      },
      {
        id: 'how-many-certificates',
        question: "How many certificates can I earn?",
        answer: "There are 45 certificates available right now — one for every course on MindoraAcademy:\n\n• AI & Technology — 15 certificates\n• Business — 12 certificates\n• Health — 9 certificates\n• Success Mindset — 5 certificates\n• Career — 4 certificates\n\nYour subscription includes all of them, so you can earn as many as you like. We add new courses regularly, and every new course comes with its own certificate.",
        categoryId: 'certificates',
        categoryTitle: "Certificates",
      },
      {
        id: 'how-to-earn-certificate',
        question: "How do I earn a certificate?",
        answer: "Complete every lesson in a course. That is the only requirement.\n\n1. Open any course from your Dashboard\n2. Work through the lessons — most take 3-5 minutes each\n3. When you finish the final lesson, your certificate is issued automatically\n\nYou do not need to pass a final exam or request anything. The moment the last lesson is marked complete, the certificate appears in My Certificates.",
        categoryId: 'certificates',
        categoryTitle: "Certificates",
      },
      {
        id: 'where-are-my-certificates',
        question: "Where do I find my certificates?",
        answer: "Log in and look for the \"My Certificates\" card on your Dashboard. That page lists every certificate you have earned. Tap any one of them to see the full certificate.",
        categoryId: 'certificates',
        categoryTitle: "Certificates",
      },
      {
        id: 'download-certificate',
        question: "How do I download or print my certificate?",
        answer: "Open the certificate from My Certificates and tap \"Save as PDF\". You can then save it to your phone or computer, print it, or attach it to a job application.\n\nThis works on both mobile and desktop. On some phones the option is labelled \"Print\" — choosing \"Save as PDF\" as the destination gives you the file.",
        categoryId: 'certificates',
        categoryTitle: "Certificates",
      },
      {
        id: 'share-certificate',
        question: "How do I share my certificate with an employer or on LinkedIn?",
        answer: "Open the certificate and tap \"Copy\" next to the sharing link. That link is a public verification page — anyone can open it and confirm your certificate is genuine without creating an account or logging in.\n\nPaste it into your LinkedIn profile, your CV, or an email to an employer. The page shows your name, the course, the date and confirms the certificate is valid.",
        categoryId: 'certificates',
        categoryTitle: "Certificates",
      },
      {
        id: 'certificate-missing-name',
        question: "Why does my certificate not show my name?",
        answer: "If you signed up with just your email address, we do not have a name on file — and we will never guess one from your email address, because a certificate with the wrong name on it is worse than no name at all.\n\nOpen the certificate and you will see a short form asking for the name you want on it. Enter it once and it is saved to your profile. The sharing link only appears after your name is added, so you can never accidentally share a blank certificate.\n\nAlready spelt wrong? You can fix it yourself — see \"How do I change the name on my certificate?\" below.",
        categoryId: 'certificates',
        categoryTitle: "Certificates",
      },
      {
        id: 'certificate-change-name',
        question: "How do I change the name on my certificate?",
        answer: "You can change it yourself in seconds — there is no need to contact us.\n\nThe name printed on your certificates is your profile name, so correcting it updates every certificate you have earned, not just the one you are looking at.\n\nEither way works:\n\n1. Open the certificate from Dashboard → My Certificates, then under \"Name on your certificate\" tap \"Change name\", enter the correct spelling and tap \"Save name\".\n2. Or go to Profile, tap \"Edit\" next to your name, correct it and tap \"Save\".\n\nYour certificate number does not change, so any link you have already shared with an employer will keep working. If a certificate has been revoked it cannot be edited — get in touch and we will help.",
        categoryId: 'certificates',
        categoryTitle: "Certificates",
      },
      {
        id: 'certificate-accreditation',
        question: "Is my certificate an accredited qualification?",
        answer: "No — and we want to be completely straight with you about that.\n\nA MindoraAcademy certificate is a Certificate of Completion. It proves you worked through and finished the course. It is issued and signed by MindoraAcademy.com.\n\nIt is not an accredited award, a regulated qualification, a university credit or a CPD-points certificate, and we will never claim otherwise. It is genuinely useful for showing initiative to an employer or on your LinkedIn profile — but it is not a professional licence.",
        categoryId: 'certificates',
        categoryTitle: "Certificates",
      },
    ],
  },
  {
    id: 'technical-support',
    title: "Technical Support",
    description: "Troubleshooting, device compatibility, and reporting issues.",
    icon: "\ud83d\udd27",
    articles: [
      {
        id: 'app-not-loading',
        question: "The app isn't loading — what should I do?",
        answer: "Try these steps in order:\n\n1. Refresh the page (pull down on mobile, or tap the refresh button)\n2. Clear your browser cache and cookies for mindoraacademy.com\n3. Try a different browser (Chrome, Safari, or Firefox)\n4. Check your internet connection\n5. Try disabling any ad blockers or VPNs temporarily\n\nIf none of these work, email us at support@mindoraacademy.com with your device type and browser — we'll investigate immediately.",
        categoryId: 'technical-support',
        categoryTitle: "Technical Support",
      },
      {
        id: 'browser-support',
        question: "Which browsers and devices are supported?",
        answer: "MindoraAcademy works on all modern browsers: Safari (iOS 15+), Chrome (Android and desktop), Firefox, and Edge. We recommend keeping your browser updated to the latest version for the best experience. The platform is optimised for smartphones but works great on tablets and laptops too.",
        categoryId: 'technical-support',
        categoryTitle: "Technical Support",
      },
      {
        id: 'report-bug',
        question: "How do I report a bug?",
        answer: "If something isn't working as expected, email us at support@mindoraacademy.com with:\n\n• What you were trying to do\n• What happened instead\n• Your device and browser (e.g. iPhone 15, Safari)\n• A screenshot if possible\n\nWe take every report seriously and typically fix issues within 24-48 hours.",
        categoryId: 'technical-support',
        categoryTitle: "Technical Support",
      },
    ],
  },
]

export type ContactCategory = {
  id: string
  label: string
  icon: string
  subCategories: { id: string; label: string }[]
  deflectionArticleIds: string[]
}

const CONTACT_CATEGORIES_EN: ContactCategory[] = [
  {
    id: 'billing',
    label: "Billing & Payments",
    icon: "\ud83d\udcb3",
    subCategories: [
      { id: 'unexpected-charge', label: "I was charged unexpectedly" },
      { id: 'payment-failed', label: "Payment failed" },
      { id: 'wrong-amount', label: "Wrong amount charged" },
      { id: 'need-invoice', label: "I need an invoice" },
    ],
    deflectionArticleIds: ["why-charged", "when-charged", "free-trial"],
  },
  {
    id: 'refund',
    label: "Refund Request",
    icon: "\ud83d\udee1\ufe0f",
    subCategories: [
      { id: 'within-guarantee', label: `Within ${MONEY_BACK_DAYS}-day guarantee` },
      { id: 'trial-charge', label: "Trial charge" },
      { id: 'refund-other', label: "Other refund reason" },
    ],
    deflectionArticleIds: ["refund-policy", "request-refund", "guarantee-coverage"],
  },
  {
    id: 'cancellation',
    label: "Cancellation",
    icon: "\u270b",
    subCategories: [
      { id: 'cant-find-cancel', label: "Can't find the cancel button" },
      { id: 'cancelled-still-charged', label: "Cancelled but still charged" },
      { id: 'want-to-cancel', label: "I want to cancel" },
    ],
    deflectionArticleIds: ["cancel-subscription", "why-charged"],
  },
  {
    id: 'account',
    label: "Account Access",
    icon: "\ud83d\udd11",
    subCategories: [
      { id: 'cant-login', label: "Can't log in" },
      { id: 'no-code', label: "Not receiving login code" },
      { id: 'locked-out', label: "Locked out of my account" },
      { id: 'delete-account', label: "I want to delete my account" },
    ],
    deflectionArticleIds: ["how-to-login", "app-not-loading"],
  },
  {
    id: 'technical',
    label: "Technical Issue",
    icon: "\ud83d\udd27",
    subCategories: [
      { id: 'app-not-loading', label: "App not loading" },
      { id: 'course-not-working', label: "Course not working" },
      { id: 'progress-lost', label: "Progress lost" },
      { id: 'other-bug', label: "Other bug" },
    ],
    deflectionArticleIds: ["app-not-loading", "browser-support", "report-bug"],
  },
  {
    id: 'other',
    label: "Something Else",
    icon: "\ud83d\udcac",
    subCategories: [
    ],
    deflectionArticleIds: [],
  },
]

const FAQ_CATEGORY_RU: Record<string, { title: string; description: string }> = {
  'getting-started': {
    title: 'Начало работы',
    description: 'Создание аккаунта, вход и первый курс.',
  },
  'subscription-billing': {
    title: 'Подписка и оплата',
    description: 'Планы, цены, пробный период, платежи и отмена.',
  },
  'refunds-guarantee': {
    title: 'Возвраты и гарантия',
    description: `Наша ${MONEY_BACK_CHIP_RU} — подробности.`,
  },
  'using-successwise': {
    title: 'Использование MindoraAcademy',
    description: 'Курсы, прогресс, серии дней, значки и XP.',
  },
  certificates: {
    title: 'Сертификаты',
    description: 'Получение, поиск, скачивание и публикация сертификатов.',
  },
  'technical-support': {
    title: 'Техническая поддержка',
    description: 'Устранение неполадок, устройства и сообщения об ошибках.',
  },
}

const FAQ_ARTICLE_RU: Record<string, { question: string; answer: string }> = {
  'create-account': {
    question: 'Как создать аккаунт?',
    answer:
      'Нажмите «Start Free Trial» на главной или на странице цен. Укажите email — мы отправим одноразовый код для подтверждения. Всё. Пароль не нужен, длинных форм нет. После подтверждения вы сразу можете учиться в рамках 3-дневного пробного периода за $1.',
  },
  'how-to-login': {
    question: 'Как войти в аккаунт?',
    answer:
      'Нажмите «Log In» вверху любой страницы. Введите email, с которым регистрировались — мы отправим одноразовый код на почту. Введите код — вы внутри, пароль не нужен. Если письма нет в течение минуты, проверьте папку спам/нежелательная почта.',
  },
  'start-course': {
    question: 'Как начать курс?',
    answer:
      'После входа откройте Dashboard. Вы увидите категории: AI & Technology, Success Mindset, Career и другие. Выберите категорию, затем курс и нажмите «Start». Каждый урок занимает 3–5 минут — удобно учиться на ходу.',
  },
  'plans-pricing': {
    question: 'Какие планы есть и сколько они стоят?',
    answer:
      'Три простых плана — в каждом полный доступ ко всем курсам, функциям и будущему контенту:\n\n• План на 1 месяц — ежемесячная оплата\n• План на 6 месяцев (самый популярный) — оплата раз в 6 месяцев со значительной скидкой\n• План на 12 месяцев (лучшая цена) — годовая оплата с самой низкой ценой за месяц\n\nВо всех планах — 3-дневный пробный период за $1. Точные суммы в вашей валюте — на странице Pricing. Мы за прозрачность: цена на экране — это цена к оплате. Без скрытых комиссий.',
  },
  'free-trial': {
    question: 'Как работает 3-дневный пробный период за $1?',
    answer:
      'При регистрации вы платите $1 и получаете 3 дня полного доступа ко всему — каждому курсу и функции, без ограничений. На 4-й день начинается выбранный план и списывается полная стоимость. Если отмените до конца пробного периода, полная сумма не спишется.',
  },
  'when-charged': {
    question: 'Когда произойдёт списание?',
    answer:
      'Сегодня вы платите $1 за старт 3-дневного пробного периода. Первое полное списание — на 4-й день, после окончания пробного периода за $1. Далее оплата в начале каждого расчётного периода (ежемесячно, раз в 6 месяцев или раз в год — в зависимости от плана). При каждом списании мы отправляем чек на email.',
  },
  'cancel-subscription': {
    question: 'Как отменить подписку?',
    answer:
      'Отменить можно в любой момент на странице Profile в приложении. Нажмите иконку профиля, затем «Cancel Subscription» — вы попадёте на экран отмены без лишних шагов, звонков и уговоров. После отмены доступ сохраняется до конца текущего оплаченного периода.',
  },
  'payment-methods': {
    question: 'Какие способы оплаты принимаются?',
    answer:
      'Принимаем основные кредитные и дебетовые карты (Visa, Mastercard, American Express), а также Apple Pay и Google Pay. Платежи обрабатывает Stripe — мы не видим и не храним данные вашей карты.',
  },
  'why-charged': {
    question: 'Почему с меня списали деньги?',
    answer: `Если вы видите списание от MindoraAcademy, скорее всего закончился 3-дневный пробный период за $1 и на 4-й день прошла первая полная оплата подписки. Проверьте email — там должен быть чек с суммой и датой. Если списание кажется ошибочным, действует наша ${MONEY_BACK_CHIP_RU} — напишите нам, и мы быстро разберёмся.`,
  },
  'refund-policy': {
    question: 'Какова политика возврата?',
    answer: `На все планы действует ${MONEY_BACK_CHIP_RU} — без лишних вопросов. Это соответствует ${MONEY_BACK_DAYS}-дневному законному периоду отказа для UK/EU. Если в течение ${MONEY_BACK_DAYS} дней после первого списания вы недовольны — вернём деньги полностью. Без длинных форм и допросов. Платформа должна заслуживать оплату, а не удерживать её.`,
  },
  'request-refund': {
    question: 'Как запросить возврат?',
    answer:
      'Напишите на support@mindoraacademy.com с темой «Refund Request» и укажите email аккаунта. Обычно отвечаем за 1–3 рабочих дня. Одобренные возвраты возвращаются на исходный способ оплаты за 5–10 рабочих дней (зависит от банка).',
  },
  'guarantee-coverage': {
    question: `Что покрывает ${MONEY_BACK_CHIP_RU}?`,
    answer: `Гарантия распространяется на первую подписку по любому плану. ${MONEY_BACK_DAYS} дней отсчитываются с первого полного списания (день 4, после пробного периода за $1). Действует один раз на клиента. Не применяется к повторным подпискам (отмена, возврат и повторная подписка). После ${MONEY_BACK_DAYS} дней стандартных возвратов нет — но в исключительных случаях мы всегда готовы обсудить ситуацию.`,
  },
  'how-courses-work': {
    question: 'Как устроены курсы?',
    answer:
      'Каждый курс разбит на ежедневные уроки по 3–5 минут. В уроке 5 обучающих карточек (краткий контент, ключевые идеи, задания) и викторина из 3 вопросов. Завершайте урок каждый день, чтобы поддерживать серию и зарабатывать XP.',
  },
  'xp-streaks-badges': {
    question: 'Что такое XP, серии и значки?',
    answer:
      'XP (очки опыта) — за каждый завершённый урок. Больше правильных ответов в викторине — больше XP.\n\nСерии — завершайте хотя бы один урок в день. Чем длиннее серия, тем больше бонусного XP.\n\nЗначки — достижения: First Step (первый урок), On Fire (серия 7 дней), Module Master (модуль), Course Graduate (весь курс) и другие.',
  },
  'mobile-usage': {
    question: 'Можно ли пользоваться MindoraAcademy на телефоне?',
    answer:
      'Да — MindoraAcademy создан с приоритетом мобильных устройств. Отлично работает в Safari, Chrome, Firefox на смартфоне. Приложение скачивать не нужно. Откройте mindoraacademy.com, войдите и учитесь. Можно добавить сайт на главный экран для опыта как у приложения.',
  },
  'track-progress': {
    question: 'Как отслеживать прогресс?',
    answer:
      'На Dashboard видно всё сразу: текущие курсы, прогресс-бары, серия, общий XP и значки. На странице категории — детальный прогресс по курсам. Страница Progress даёт обзор по всем категориям.',
  },
  'do-i-get-a-certificate': {
    question: 'Получу ли я сертификат после курса?',
    answer:
      'Да. За каждый завершённый курс выдаётся Certificate of Completion бесплатно в рамках подписки — ничего дополнительно покупать и подавать заявки не нужно.\n\nНа сертификате — ваше имя, курс, дата и уникальный номер для проверки подлинности.',
  },
  'how-many-certificates': {
    question: 'Сколько сертификатов можно получить?',
    answer:
      'Сейчас доступно 45 сертификатов — по одному на каждый курс MindoraAcademy:\n\n• AI & Technology — 15\n• Business — 12\n• Health — 9\n• Success Mindset — 5\n• Career — 4\n\nПодписка включает все. Новые курсы добавляются регулярно — у каждого свой сертификат.',
  },
  'how-to-earn-certificate': {
    question: 'Как получить сертификат?',
    answer:
      'Пройдите все уроки курса — это единственное требование.\n\n1. Откройте курс с Dashboard\n2. Проходите уроки — обычно 3–5 минут каждый\n3. После последнего урока сертификат выдаётся автоматически\n\nФинальный экзамен и заявки не нужны. Сертификат появляется в My Certificates сразу после завершения.',
  },
  'where-are-my-certificates': {
    question: 'Где найти мои сертификаты?',
    answer:
      'Войдите в аккаунт и откройте карточку «My Certificates» на Dashboard. Там список всех сертификатов. Нажмите на любой, чтобы открыть полный вид.',
  },
  'download-certificate': {
    question: 'Как скачать или распечатать сертификат?',
    answer:
      'Откройте сертификат в My Certificates и нажмите «Save as PDF». Сохраните на телефон или компьютер, распечатайте или приложите к отклику на работу.\n\nРаботает на мобильных и десктопе. На некоторых телефонах пункт называется «Print» — выберите «Save as PDF» как место сохранения.',
  },
  'share-certificate': {
    question: 'Как поделиться сертификатом с работодателем или в LinkedIn?',
    answer:
      'Откройте сертификат и нажмите «Copy» рядом со ссылкой. Это публичная страница проверки — любой может подтвердить подлинность без аккаунта.\n\nВставьте ссылку в LinkedIn, резюме или email работодателю. На странице — имя, курс, дата и статус действительности.',
  },
  'certificate-missing-name': {
    question: 'Почему на сертификате нет моего имени?',
    answer:
      'Если вы регистрировались только по email, имени в профиле может не быть — мы не угадываем его из адреса почты: сертификат с неверным именем хуже, чем без имени.\n\nОткройте сертификат — там короткая форма для имени. Введите один раз, оно сохранится в профиле. Ссылка для sharing появится только после добавления имени.\n\nОпечатка? Исправьте сами — см. «Как изменить имя на сертификате?» ниже.',
  },
  'certificate-change-name': {
    question: 'Как изменить имя на сертификате?',
    answer:
      'Изменить можно за секунды — писать в поддержку не обязательно.\n\nИмя на сертификатах — это имя в профиле; исправление обновляет все выданные сертификаты.\n\nДва способа:\n\n1. Dashboard → My Certificates → откройте сертификат → «Change name» в блоке «Name on your certificate» → «Save name».\n2. Profile → «Edit» рядом с именем → сохраните.\n\nНомер сертификата не меняется — старые ссылки остаются рабочими. Отозванный сертификат не редактируется — напишите нам.',
  },
  'certificate-accreditation': {
    question: 'Это аккредитованная квалификация?',
    answer:
      'Нет — и мы честно об этом говорим.\n\nСертификат MindoraAcademy — Certificate of Completion. Он подтверждает, что вы прошли курс. Выдаётся MindoraAcademy.com.\n\nЭто не аккредитованная награда, регулируемая квалификация, зачёт вуза или сертификат CPD, и мы никогда не заявим обратного. Полезно показать инициативу работодателю или в LinkedIn — но это не профессиональная лицензия.',
  },
  'app-not-loading': {
    question: 'Приложение не загружается — что делать?',
    answer:
      'Попробуйте по порядку:\n\n1. Обновите страницу (потяните вниз на мобильном или кнопка обновления)\n2. Очистите кэш и cookies для mindoraacademy.com\n3. Другой браузер (Chrome, Safari, Firefox)\n4. Проверьте интернет\n5. Временно отключите блокировщики рекламы или VPN\n\nЕсли не помогло — напишите на support@mindoraacademy.com с типом устройства и браузером.',
  },
  'browser-support': {
    question: 'Какие браузеры и устройства поддерживаются?',
    answer:
      'MindoraAcademy работает во всех современных браузерах: Safari (iOS 15+), Chrome (Android и desktop), Firefox, Edge. Рекомендуем последнюю версию браузера. Платформа оптимизирована для смартфонов, но удобна на планшетах и ноутбуках.',
  },
  'report-bug': {
    question: 'Как сообщить об ошибке?',
    answer:
      'Если что-то работает не так, напишите на support@mindoraacademy.com:\n\n• Что вы делали\n• Что произошло вместо ожидаемого\n• Устройство и браузер (например iPhone 15, Safari)\n• Скриншот, если возможно\n\nМы относимся к каждому сообщению серьёзно и обычно исправляем за 24–48 часов.',
  },
}

const CONTACT_LABEL_RU: Record<
  string,
  { label: string; subCategories: Record<string, string> }
> = {
  billing: {
    label: 'Оплата и платежи',
    subCategories: {
      'unexpected-charge': 'Списание было неожиданным',
      'payment-failed': 'Платёж не прошёл',
      'wrong-amount': 'Списали неверную сумму',
      'need-invoice': 'Нужен счёт',
    },
  },
  refund: {
    label: 'Запрос возврата',
    subCategories: {
      'within-guarantee': `В рамках гарантии ${MONEY_BACK_DAYS} дней`,
      'trial-charge': 'Списание за пробный период',
      'refund-other': 'Другая причина возврата',
    },
  },
  cancellation: {
    label: 'Отмена подписки',
    subCategories: {
      'cant-find-cancel': 'Не могу найти кнопку отмены',
      'cancelled-still-charged': 'Отменил(а), но снова списали',
      'want-to-cancel': 'Хочу отменить подписку',
    },
  },
  account: {
    label: 'Доступ к аккаунту',
    subCategories: {
      'cant-login': 'Не могу войти',
      'no-code': 'Не приходит код для входа',
      'locked-out': 'Заблокирован доступ к аккаунту',
      'delete-account': 'Хочу удалить аккаунт',
    },
  },
  technical: {
    label: 'Техническая проблема',
    subCategories: {
      'app-not-loading': 'Не загружается приложение',
      'course-not-working': 'Курс не работает',
      'progress-lost': 'Пропал прогресс',
      'other-bug': 'Другая ошибка',
    },
  },
  other: {
    label: 'Другое',
    subCategories: {},
  },
}

const MAYA_CHIPS_RU = [
  'Как отменить подписку?',
  'Хочу вернуть деньги',
  'Не могу войти',
  'Что входит в пробный период?',
] as const

function localizeFaqCategories(locale: MarketingLocale): FaqCategory[] {
  if (locale === 'en') return FAQ_CATEGORIES_EN
  return FAQ_CATEGORIES_EN.map((cat) => {
    const meta = FAQ_CATEGORY_RU[cat.id]
    return {
      ...cat,
      title: meta.title,
      description: meta.description,
      articles: cat.articles.map((article) => {
        const ru = FAQ_ARTICLE_RU[article.id]
        return {
          ...article,
          question: ru.question,
          answer: ru.answer,
          categoryTitle: meta.title,
        }
      }),
    }
  })
}

function localizeContactCategories(locale: MarketingLocale): ContactCategory[] {
  if (locale === 'en') return CONTACT_CATEGORIES_EN
  return CONTACT_CATEGORIES_EN.map((cat) => {
    const ru = CONTACT_LABEL_RU[cat.id]
    return {
      ...cat,
      label: ru.label,
      subCategories: cat.subCategories.map((sub) => ({
        ...sub,
        label: ru.subCategories[sub.id] ?? sub.label,
      })),
    }
  })
}

export const POPULAR_IDS = [
  'how-to-login',
  'free-trial',
  'cancel-subscription',
  'why-charged',
  'refund-policy',
  'how-courses-work',
  'do-i-get-a-certificate',
  'how-many-certificates',
] as const

const MAYA_CHIPS_EN = [
  'How do I cancel?',
  'I want a refund',
  "Can't log in",
  'What does the trial include?',
] as const

export const SUPPORT_UI_COPY = {
  en: {
    pageTitle: 'Support Center — MindoraAcademy.com | Help, Billing, Refunds & FAQs',
    kicker: 'Support Center',
    heading: 'How can we help you?',
    mayaBadge: 'Chat with Maya for instant support',
    searchPlaceholder: 'Search for answers...',
    searchAria: 'Search support articles',
    resultsFor: (count: number, query: string) =>
      `${count} result${count !== 1 ? 's' : ''} for "${query}"`,
    noArticlesTitle: 'No articles found',
    noArticlesBody: 'Try different keywords, or',
    contactTeam: 'contact our team',
    browseByTopic: 'Browse by topic',
    popularHeading: 'Most popular questions',
    quickActions: 'Quick actions',
    cancelSubscription: 'Cancel subscription',
    cancelHint: 'Go to your profile to cancel',
    requestRefund: 'Request a refund',
    cantLogin: "Can't log in?",
    cantLoginHint: 'Ask Maya — answers in minutes, 24/7',
    stillNeedHelp: 'Still need help?',
    emailSupport: 'Email support for answers 1-3 business days',
    mayaFooter: 'Maya answers in minutes, 24/7',
    noHiddenFees: 'No hidden fees',
    backHome: '← Back to MindoraAcademy.com',
    form: {
      title: 'Contact Support',
      subtitle: 'We typically respond within 1-3 business days.',
      whatNeed: 'What do you need help with?',
      changeCategory: '← Change category',
      whatSpecifically: 'What specifically?',
      mightHelp: '💡 These might help:',
      checkBeforeContact: 'Check if your question is answered below before contacting us.',
      didntFind: "Didn't find your answer above?",
      stillNeedHelp: 'I still need help →',
      startOver: '← Start over',
      transcriptTitle: 'Chat transcript attached',
      transcriptBody:
        'Your conversation with Maya will be included so our team has full context. Just add any extra details below.',
      attached: '✓ Attached',
      emailLabel: 'Email address',
      emailHint: 'Use the email you signed up with so we can find your account.',
      nameLabel: 'Your name',
      namePlaceholder: 'First name is fine',
      helpLabel: 'How can we help?',
      placeholderDefault: "Tell us what's happening. The more detail you give, the faster we can help.",
      placeholderWithTranscript:
        'Anything else we should know? (Your chat with Maya is already attached)',
      sending: 'Sending...',
      sendMessage: 'Send Message',
      respondNote: "We'll respond to your email within 1-3 business days.",
      sentTitle: 'Message sent!',
      reference: 'Reference:',
      received: "We've received your message and will get back to you at",
      teamResponds: 'Our team responds within 1-3 business days.',
      backToSupport: '← Back to Support Center',
    },
  },
  ru: {
    pageTitle: 'Центр поддержки — MindoraAcademy.com | Помощь, оплата, возвраты и FAQ',
    kicker: 'Центр поддержки',
    heading: 'Чем мы можем помочь?',
    mayaBadge: 'Чат с Maya — мгновенная поддержка',
    searchPlaceholder: 'Поиск ответов...',
    searchAria: 'Поиск статей поддержки',
    resultsFor: (count: number, query: string) => {
      const word = count === 1 ? 'результат' : count < 5 ? 'результата' : 'результатов'
      return `${count} ${word} по запросу «${query}»`
    },
    noArticlesTitle: 'Статьи не найдены',
    noArticlesBody: 'Попробуйте другие слова или',
    contactTeam: 'напишите нашей команде',
    browseByTopic: 'Темы',
    popularHeading: 'Самые популярные вопросы',
    quickActions: 'Быстрые действия',
    cancelSubscription: 'Отменить подписку',
    cancelHint: 'Отмена в профиле',
    requestRefund: 'Запросить возврат',
    cantLogin: 'Не можете войти?',
    cantLoginHint: 'Спросите Maya — ответ за минуты, 24/7',
    stillNeedHelp: 'Всё ещё нужна помощь?',
    emailSupport: 'Email-поддержка — ответ за 1–3 рабочих дня',
    mayaFooter: 'Maya отвечает за минуты, 24/7',
    noHiddenFees: 'Без скрытых платежей',
    backHome: '← На MindoraAcademy.com',
    form: {
      title: 'Связаться с поддержкой',
      subtitle: 'Обычно отвечаем в течение 1–3 рабочих дней.',
      whatNeed: 'С чем вам нужна помощь?',
      changeCategory: '← Сменить категорию',
      whatSpecifically: 'Уточните, пожалуйста:',
      mightHelp: '💡 Возможно, это поможет:',
      checkBeforeContact: 'Проверьте ответы ниже, прежде чем писать нам.',
      didntFind: 'Не нашли ответ выше?',
      stillNeedHelp: 'Мне всё ещё нужна помощь →',
      startOver: '← Начать сначала',
      transcriptTitle: 'Прикреплён текст чата',
      transcriptBody:
        'Переписка с Maya будет приложена, чтобы у команды был полный контекст. Добавьте детали ниже при необходимости.',
      attached: '✓ Прикреплено',
      emailLabel: 'Адрес email',
      emailHint: 'Укажите email, с которым вы регистрировались, чтобы мы нашли аккаунт.',
      nameLabel: 'Ваше имя',
      namePlaceholder: 'Достаточно имени',
      helpLabel: 'Чем можем помочь?',
      placeholderDefault:
        'Опишите ситуацию. Чем больше деталей, тем быстрее мы поможем.',
      placeholderWithTranscript:
        'Что ещё важно знать? (Чат с Maya уже прикреплён)',
      sending: 'Отправка...',
      sendMessage: 'Отправить сообщение',
      respondNote: 'Ответим на email в течение 1–3 рабочих дней.',
      sentTitle: 'Сообщение отправлено!',
      reference: 'Номер обращения:',
      received: 'Мы получили ваше сообщение и ответим на',
      teamResponds: 'Команда отвечает в течение 1–3 рабочих дней.',
      backToSupport: '← В центр поддержки',
    },
  },
} as const

export const MAYA_UI_COPY = {
  en: {
    welcome:
      "Hi! 👋 I'm Maya, your friendly AI support assistant. I can help you with billing questions, account access, refunds, cancellations, and more.\n\nWhat can I help you with today?",
    placeholder: 'Type your question...',
    noMatch:
      "I'm sorry, I'm having trouble right now. Please try again or use the contact form below to reach our team directly.",
    deskImageAlt: 'Maya Bennett — AI Support Assistant',
    openChatAria: 'Open chat with Maya',
    onlineNow: 'Online now',
    chatTitle: 'Chat with Maya',
    chatSubtitle: 'Your friendly AI assistant — ask anything, any time',
    askNow: 'Ask Maya now',
    mayaBadge: 'Chat with Maya for instant support',
    emailSupport: 'Email support for answers 1-3 business days',
    minimizeAria: 'Minimize chat',
    roleSubtitle: 'Your Friendly AI Assistant',
    commonQuestions: 'Common questions:',
    messageAria: 'Type a message',
    sendAria: 'Send message',
    rephraseHint: 'Maya can usually sort this in minutes — try rephrasing your question.',
    passToHuman: 'Pass it to a human instead →',
    transcriptAttached:
      "✓ Transcript attached — scroll down to complete the form and we'll follow up personally.",
    customerLabel: 'Customer',
    assistantLabel: 'AI Assistant',
  },
  ru: {
    welcome:
      'Привет! 👋 Я Maya, ваш AI-ассистент поддержки. Помогу с оплатой, доступом к аккаунту, возвратами, отменой подписки и другими вопросами.\n\nЧем могу помочь сегодня?',
    placeholder: 'Введите вопрос...',
    noMatch:
      'Извините, сейчас не получается ответить. Попробуйте снова или воспользуйтесь формой ниже, чтобы связаться с командой.',
    deskImageAlt: 'Maya Bennett — AI-ассистент поддержки',
    openChatAria: 'Открыть чат с Maya',
    onlineNow: 'Онлайн',
    chatTitle: 'Чат с Maya',
    chatSubtitle: 'Ваш дружелюбный AI-ассистент — спрашивайте в любое время',
    askNow: 'Спросить Maya',
    mayaBadge: 'Чат с Maya — мгновенная поддержка',
    emailSupport: 'Email-поддержка — ответ за 1–3 рабочих дня',
    minimizeAria: 'Свернуть чат',
    roleSubtitle: 'Ваш дружелюбный AI-ассистент',
    commonQuestions: 'Частые вопросы:',
    messageAria: 'Введите сообщение',
    sendAria: 'Отправить сообщение',
    rephraseHint: 'Обычно Maya отвечает за минуты — попробуйте переформулировать вопрос.',
    passToHuman: 'Передать человеку →',
    transcriptAttached:
      '✓ Текст чата прикреплён — прокрутите вниз, заполните форму, и мы ответим лично.',
    customerLabel: 'Клиент',
    assistantLabel: 'AI-ассистент',
  },
} as const

export function faqCopy(locale: MarketingLocale) {
  const categories = localizeFaqCategories(locale)
  const contactCategories = localizeContactCategories(locale)
  const mayaChips = locale === 'en' ? MAYA_CHIPS_EN : MAYA_CHIPS_RU
  return {
    categories,
    articles: categories.flatMap((c) => c.articles),
    contactCategories,
    mayaChips,
    popularIds: POPULAR_IDS,
  }
}

export function supportUiCopy(locale: MarketingLocale) {
  return SUPPORT_UI_COPY[locale]
}

export function mayaUiCopy(locale: MarketingLocale) {
  return MAYA_UI_COPY[locale]
}

export const FAQ_CATEGORIES = FAQ_CATEGORIES_EN
export const FAQ_ARTICLES: FaqArticle[] = FAQ_CATEGORIES_EN.flatMap((c) => c.articles)
export const CONTACT_CATEGORIES = CONTACT_CATEGORIES_EN
export const MAYA_CHIPS = MAYA_CHIPS_EN

export function searchFaq(query: string, locale: MarketingLocale): FaqArticle[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const articles = faqCopy(locale).articles
  return articles.filter(
    (a) => a.question.toLowerCase().includes(q) || a.answer.toLowerCase().includes(q),
  )
}

export function matchFaqAnswer(message: string, locale: MarketingLocale): string | null {
  const q = message.trim().toLowerCase()
  if (!q) return null
  const articles = faqCopy(locale).articles
  const aliasesEn: Record<string, string> = {
    'how do i cancel?': 'cancel-subscription',
    'i want a refund': 'request-refund',
    "can't log in": 'how-to-login',
    'what does the trial include?': 'free-trial',
    'how does the 3-day $1 trial work?': 'free-trial',
    'how does the 7-day free trial work?': 'free-trial',
  }
  const aliasesRu: Record<string, string> = {
    'как отменить подписку?': 'cancel-subscription',
    'как отменить?': 'cancel-subscription',
    'хочу вернуть деньги': 'request-refund',
    'не могу войти': 'how-to-login',
    'что входит в пробный период?': 'free-trial',
    'как работает пробный период за $1 на 3 дня?': 'free-trial',
  }
  const aliases = locale === 'en' ? aliasesEn : aliasesRu
  const aliasId = aliases[q]
  if (aliasId) {
    const hit = articles.find((a) => a.id === aliasId)
    if (hit) return hit.answer
  }
  const exact = articles.find((a) => a.question.toLowerCase() === q)
  if (exact) return exact.answer
  const scored = articles.map((a) => {
    const hay = `${a.question} ${a.answer}`.toLowerCase()
    const words = q.split(/[^a-zа-яё0-9]+/i).filter((w) => w.length > 2)
    const hits = words.filter((w) => hay.includes(w)).length
    return { a, hits, ratio: words.length ? hits / words.length : 0 }
  }).sort((x, y) => y.hits - x.hits || y.ratio - x.ratio)
  const best = scored[0]
  if (best && (best.hits >= 2 || best.ratio >= 0.5)) return best.a.answer
  return null
}
