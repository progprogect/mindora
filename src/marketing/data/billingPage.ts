import type { MarketingLocale } from '@/marketing/data/moneyBack'

export type BillingLinkRoute = 'terms' | 'refund' | 'privacy' | 'contact' | 'support'

export type BillingInlinePart =
  | { kind: 'text'; value: string }
  | { kind: 'link'; route: BillingLinkRoute; label: string }
  | { kind: 'supportChat'; label: string }
  | { kind: 'email' }
  | { kind: 'strong'; value: string }
  | { kind: 'serviceName' }

export type BillingText = string | BillingInlinePart[]

export type BillingFaq = {
  question: string
  answer: BillingText
}

export type BillingPlanCard = {
  label: string
  badge?: string
  description: string
  features: string[]
  variant: 'default' | 'popular' | 'value'
}

export type BillingPageCopy = {
  pageTitle: string
  heroKicker: string
  heroTitle: string
  heroSubtitle: BillingText
  subscriptionTitle: string
  subscriptionIntro: BillingText
  subscriptionFootnote: string
  plans: BillingPlanCard[]
  oneTimeTitle: string
  oneTimeIntro: string
  oneTimeFeatures: string[]
  faqTitle: string
  faqs: BillingFaq[]
  ctaTitle: string
  ctaBody: string
  ctaButton: string
  relatedLabel: string
  relatedLinks: { route: BillingLinkRoute; label: string }[]
}

const EN: BillingPageCopy = {
  pageTitle: 'Billing & Plans — Mindora Academy',
  heroKicker: 'Plans & Pricing',
  heroTitle: 'Billing & Plans',
  heroSubtitle: [
    { kind: 'text', value: 'Everything you need to know about your ' },
    { kind: 'serviceName' },
    { kind: 'text', value: ' subscription — plans, billing cycles, payments, and how to manage your account.' },
  ],
  subscriptionTitle: 'Subscription Plans',
  subscriptionIntro: [
    { kind: 'text', value: 'All subscription plans start with a ' },
    { kind: 'strong', value: '3-day trial for just $1.00' },
    {
      kind: 'text',
      value:
        ". After your trial, you'll be billed at the full price according to the plan you chose. Every plan includes full access to every course, your AI Coach, personalised roadmap, certificates of completion, and every new course we add — at no extra charge.",
    },
  ],
  subscriptionFootnote:
    "All subscription plans include a 3-day trial for $1.00. After day 3, you'll be billed at the full plan price. Cancel any time before day 3 and no further charges apply.",
  plans: [
    {
      label: 'Monthly',
      description: 'Billed monthly after your $1 trial. Cancel any time.',
      features: ['Full access to all courses', 'AI Coach & roadmap', 'Cancel any time'],
      variant: 'default',
    },
    {
      label: 'Quarterly',
      badge: 'MOST POPULAR',
      description: 'Billed every 3 months. Save vs monthly.',
      features: ['Everything in Monthly', 'Better value per month', 'Cancel any time'],
      variant: 'popular',
    },
    {
      label: 'Annual',
      badge: 'BEST VALUE',
      description: 'Billed yearly. Lowest price per month.',
      features: ['Everything in Monthly', 'Best value — lowest per month', 'Cancel any time'],
      variant: 'value',
    },
  ],
  oneTimeTitle: 'One-Time Purchases',
  oneTimeIntro:
    'We also offer standalone courses and certification programmes as one-time purchases. These are charged once at the listed price, do not auto-renew, and grant you lifetime access to the purchased content.',
  oneTimeFeatures: [
    'Pay once, access forever',
    'No recurring charges',
    '14-day money-back guarantee included',
    'Certificate of completion included',
  ],
  faqTitle: 'Billing FAQs',
  faqs: [
    {
      question: 'When will I be charged?',
      answer: [
        { kind: 'text', value: 'Subscription plans start with a ' },
        { kind: 'strong', value: '3-day trial for $1.00' },
        {
          kind: 'text',
          value:
            ". After day 3, you will be billed automatically at the full price according to your chosen plan (monthly, every 3 months, or annually). You'll receive an email receipt after every payment. Cancel any time before your trial ends to avoid further charges. One-time purchases are charged immediately at the listed price.",
        },
      ],
    },
    {
      question: 'What payment methods do you accept?',
      answer: [
        {
          kind: 'text',
          value:
            'We accept all major debit and credit cards (Visa, Mastercard, American Express) via our secure payment provider, ',
        },
        { kind: 'strong', value: 'Stripe' },
        {
          kind: 'text',
          value:
            '. We do not store your card details — Stripe handles all payment processing securely and is PCI-DSS Level 1 certified.',
        },
      ],
    },
    {
      question: 'Can I switch between plans?',
      answer: [
        { kind: 'text', value: 'Yes. Tap ' },
        { kind: 'strong', value: 'Profile' },
        { kind: 'text', value: ' in the bottom navigation bar, then ' },
        { kind: 'strong', value: 'Manage Subscription' },
        {
          kind: 'text',
          value:
            ' under "My Subscription" to switch between the Monthly, Quarterly, and Annual plans. If you upgrade to a longer plan, the change takes effect immediately and we\'ll credit any unused days from your current billing period. Downgrades take effect at the end of your current period.',
        },
      ],
    },
    {
      question: 'How do I cancel my subscription?',
      answer: [
        { kind: 'text', value: 'Log in, tap ' },
        { kind: 'strong', value: 'Profile' },
        { kind: 'text', value: ' in the bottom navigation bar, then select ' },
        { kind: 'strong', value: 'Cancel Subscription' },
        { kind: 'text', value: ' under "My Subscription". Your access continues until the end of your current billing period. You can also ' },
        { kind: 'supportChat', label: 'ask Maya in the Support Centre' },
        { kind: 'text', value: " and she'll walk you through it, or pass you to a human who can cancel it for you." },
      ],
    },
    {
      question: 'What happens to my progress when I cancel?',
      answer: [
        {
          kind: 'text',
          value:
            'Your course progress, certificates, and AI Coach history are retained for 90 days after your subscription ends. If you resubscribe within that window, everything will be exactly as you left it. After 90 days, inactive account data may be deleted in accordance with our ',
        },
        { kind: 'link', route: 'privacy', label: 'Privacy Policy' },
        { kind: 'text', value: '.' },
      ],
    },
    {
      question: 'Do you offer refunds?',
      answer: [
        { kind: 'text', value: 'Yes. We offer an industry-leading ' },
        { kind: 'strong', value: '14-day money-back guarantee' },
        {
          kind: 'text',
          value:
            " on your first full subscription charge (after the trial) and on all one-time purchases. If you're not satisfied within 14 days, contact us for a full refund — no questions asked. We'll also refund the $1.00 trial fee if you ask for it. Please read our ",
        },
        { kind: 'link', route: 'refund', label: 'Refund Policy' },
        { kind: 'text', value: ' for complete details.' },
      ],
    },
    {
      question: 'Will I receive a VAT receipt?',
      answer: [
        {
          kind: 'text',
          value:
            'Yes. A receipt is automatically sent to your registered email address after every payment. Our VAT registration details are included on each receipt. If you need a duplicate receipt, ',
        },
        { kind: 'supportChat', label: 'ask Maya in the Support Centre' },
        { kind: 'text', value: " and she'll send it over or pass you to a human who can." },
      ],
    },
    {
      question: 'Do you offer team or business plans?',
      answer: [
        {
          kind: 'text',
          value:
            "We're working on team and business pricing. If you need licences for your team or organisation, get in touch at ",
        },
        { kind: 'email' },
        { kind: 'text', value: " and we'll be happy to discuss options." },
      ],
    },
  ],
  ctaTitle: 'Still have a billing question?',
  ctaBody:
    'Maya can answer most billing questions straight away — answers in minutes, 24/7. A human replies within 1-3 business days if you need one.',
  ctaButton: 'Ask Maya',
  relatedLabel: 'Related:',
  relatedLinks: [
    { route: 'terms', label: 'Terms & Conditions' },
    { route: 'refund', label: 'Refund Policy' },
    { route: 'privacy', label: 'Privacy Policy' },
    { route: 'contact', label: 'Contact' },
  ],
}

const RU: BillingPageCopy = {
  pageTitle: 'Оплата и тарифы — Mindora Academy',
  heroKicker: 'Тарифы и цены',
  heroTitle: 'Оплата и тарифы',
  heroSubtitle: [
    { kind: 'text', value: 'Всё, что нужно знать о подписке ' },
    { kind: 'serviceName' },
    { kind: 'text', value: ' — тарифы, расчётные периоды, платежи и управление аккаунтом.' },
  ],
  subscriptionTitle: 'Планы подписки',
  subscriptionIntro: [
    { kind: 'text', value: 'Все планы подписки начинаются с ' },
    { kind: 'strong', value: '3-дневного пробного периода всего за $1.00' },
    {
      kind: 'text',
      value:
        '. После пробного периода с вас будет списываться полная стоимость выбранного плана. Каждый план включает полный доступ ко всем курсам, AI Coach, персональную дорожную карту, сертификаты об окончании и каждый новый курс, который мы добавляем — без дополнительной платы.',
    },
  ],
  subscriptionFootnote:
    'Все планы подписки включают 3-дневный пробный период за $1.00. После 3-го дня с вас списывается полная стоимость плана. Отмените подписку до 3-го дня — дальнейшие списания не производятся.',
  plans: [
    {
      label: 'Ежемесячно',
      description: 'Оплата ежемесячно после пробного периода за $1. Отмена в любое время.',
      features: ['Полный доступ ко всем курсам', 'AI Coach и дорожная карта', 'Отмена в любое время'],
      variant: 'default',
    },
    {
      label: 'Ежеквартально',
      badge: 'САМЫЙ ПОПУЛЯРНЫЙ',
      description: 'Оплата каждые 3 месяца. Выгоднее, чем ежемесячно.',
      features: ['Всё из ежемесячного плана', 'Лучшая цена за месяц', 'Отмена в любое время'],
      variant: 'popular',
    },
    {
      label: 'Ежегодно',
      badge: 'ЛУЧШАЯ ЦЕНА',
      description: 'Оплата раз в год. Самая низкая цена за месяц.',
      features: ['Всё из ежемесячного плана', 'Максимальная выгода — минимум за месяц', 'Отмена в любое время'],
      variant: 'value',
    },
  ],
  oneTimeTitle: 'Разовые покупки',
  oneTimeIntro:
    'Мы также предлагаем отдельные курсы и программы сертификации как разовые покупки. Оплата производится один раз по указанной цене, автопродление не применяется, доступ к купленному контенту предоставляется бессрочно.',
  oneTimeFeatures: [
    'Оплатите один раз — доступ навсегда',
    'Без регулярных списаний',
    'Включена 14-дневная гарантия возврата денег',
    'Включён сертификат об окончании',
  ],
  faqTitle: 'Частые вопросы об оплате',
  faqs: [
    {
      question: 'Когда с меня спишут деньги?',
      answer: [
        { kind: 'text', value: 'Планы подписки начинаются с ' },
        { kind: 'strong', value: '3-дневного пробного периода за $1.00' },
        {
          kind: 'text',
          value:
            '. После 3-го дня с вас автоматически списывается полная стоимость выбранного плана (ежемесячно, каждые 3 месяца или ежегодно). После каждого платежа вы получите квитанцию на email. Отмените подписку до окончания пробного периода, чтобы избежать дальнейших списаний. Разовые покупки оплачиваются сразу по указанной цене.',
        },
      ],
    },
    {
      question: 'Какие способы оплаты вы принимаете?',
      answer: [
        {
          kind: 'text',
          value:
            'Мы принимаем основные дебетовые и кредитные карты (Visa, Mastercard, American Express) через нашего безопасного платёжного провайдера ',
        },
        { kind: 'strong', value: 'Stripe' },
        {
          kind: 'text',
          value:
            '. Мы не храним данные вашей карты — Stripe обрабатывает все платежи безопасно и сертифицирован по PCI-DSS Level 1.',
        },
      ],
    },
    {
      question: 'Можно ли переключаться между планами?',
      answer: [
        { kind: 'text', value: 'Да. Нажмите ' },
        { kind: 'strong', value: 'Профиль' },
        { kind: 'text', value: ' в нижней панели навигации, затем ' },
        { kind: 'strong', value: 'Управление подпиской' },
        {
          kind: 'text',
          value:
            ' в разделе «Моя подписка», чтобы переключиться между планами Месячный, Квартальный и Годовой. При переходе на более длительный план изменение вступает в силу немедленно, а неиспользованные дни текущего периода будут зачтены. Понижение плана вступает в силу в конце текущего периода.',
        },
      ],
    },
    {
      question: 'Как отменить подписку?',
      answer: [
        { kind: 'text', value: 'Войдите в аккаунт, нажмите ' },
        { kind: 'strong', value: 'Профиль' },
        { kind: 'text', value: ' в нижней панели навигации, затем выберите ' },
        { kind: 'strong', value: 'Отменить подписку' },
        { kind: 'text', value: ' в разделе «Моя подписка». Доступ сохраняется до конца текущего расчётного периода. Вы также можете ' },
        { kind: 'supportChat', label: 'обратиться к Maya в Центре поддержки' },
        { kind: 'text', value: ' — она проведёт вас по шагам или передаст запрос специалисту, который отменит подписку за вас.' },
      ],
    },
    {
      question: 'Что будет с моим прогрессом после отмены?',
      answer: [
        {
          kind: 'text',
          value:
            'Прогресс по курсам, сертификаты и история AI Coach сохраняются 90 дней после окончания подписки. Если вы оформите подписку снова в этот срок, всё останется как было. Через 90 дней данные неактивного аккаунта могут быть удалены в соответствии с нашей ',
        },
        { kind: 'link', route: 'privacy', label: 'Политикой конфиденциальности' },
        { kind: 'text', value: '.' },
      ],
    },
    {
      question: 'Предусмотрен ли возврат денег?',
      answer: [
        { kind: 'text', value: 'Да. Мы предлагаем ' },
        { kind: 'strong', value: '14-дневную гарантию возврата денег' },
        {
          kind: 'text',
          value:
            ' на первый полный платёж по подписке (после пробного периода) и на все разовые покупки. Если вас что-то не устроило в течение 14 дней, свяжитесь с нами для полного возврата — без лишних вопросов. По запросу мы также вернём $1.00 за пробный период. Подробности — в нашей ',
        },
        { kind: 'link', route: 'refund', label: 'Политике возврата' },
        { kind: 'text', value: '.' },
      ],
    },
    {
      question: 'Получу ли я квитанцию с НДС?',
      answer: [
        {
          kind: 'text',
          value:
            'Да. Квитанция автоматически отправляется на ваш email после каждого платежа. Реквизиты нашей регистрации по НДС указаны в каждой квитанции. Если нужна дубликат, ',
        },
        { kind: 'supportChat', label: 'обратитесь к Maya в Центре поддержки' },
        { kind: 'text', value: ' — она отправит квитанцию или передаст запрос специалисту.' },
      ],
    },
    {
      question: 'Есть ли корпоративные или командные тарифы?',
      answer: [
        {
          kind: 'text',
          value:
            'Мы работаем над тарифами для команд и бизнеса. Если вам нужны лицензии для команды или организации, напишите на ',
        },
        { kind: 'email' },
        { kind: 'text', value: ' — мы с радостью обсудим варианты.' },
      ],
    },
  ],
  ctaTitle: 'Остались вопросы по оплате?',
  ctaBody:
    'Maya отвечает на большинство вопросов об оплате за минуты, круглосуточно. Если нужен человек — ответ в течение 1–3 рабочих дней.',
  ctaButton: 'Спросить Maya',
  relatedLabel: 'См. также:',
  relatedLinks: [
    { route: 'terms', label: 'Условия и положения' },
    { route: 'refund', label: 'Политика возврата' },
    { route: 'privacy', label: 'Политика конфиденциальности' },
    { route: 'contact', label: 'Контакты' },
  ],
}

export const BILLING_PAGE_COPY: Record<MarketingLocale, BillingPageCopy> = {
  en: EN,
  ru: RU,
}

export function billingPageCopy(locale: MarketingLocale): BillingPageCopy {
  return BILLING_PAGE_COPY[locale]
}
