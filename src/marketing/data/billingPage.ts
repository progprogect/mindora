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
    { kind: 'text', value: 'Everything you need to know about ' },
    { kind: 'serviceName' },
    {
      kind: 'text',
      value: ' purchases — products, subscriptions, billing, payments, and how to manage your account.',
    },
  ],
  subscriptionTitle: 'Subscription Plans',
  subscriptionIntro: [
    {
      kind: 'text',
      value:
        'Mindora Membership gives full access to the library, courses, challenges and new content while your subscription is active. A subscription starts only if you confirm it on the subscription offer page (for example, by clicking “Continue”). It may begin with a free trial (for example, 3 days) and then renews automatically at the price shown when you started it (for example, ',
    },
    { kind: 'strong', value: 'US$49.99 per month' },
    {
      kind: 'text',
      value:
        '). Alternative or discounted plans (for example, ',
    },
    { kind: 'strong', value: 'US$29.99 per month' },
    {
      kind: 'text',
      value:
        ') may be offered with their own terms. Some offers instead start with a paid trial of the subscription for a small fee (for example, US$1 for 7 days); if you don’t cancel before the trial ends, it converts automatically into a paid subscription at the price shown when you started it.',
    },
  ],
  subscriptionFootnote:
    'The exact product, price, trial and renewal terms shown on the offer page and payment screen before you confirm always apply to your order. Cancel before the next charge date shown in your account to avoid the next charge.',
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
    'Many offers start with a one-time Entry Product — for example the AI Starter Kit, Claude AI Guide Kit, Claude AI Learning Plan or 28-Day AI Plan — at the price shown on the offer page (for example, US$1). It is charged once, does not renew and gives lifetime access to the content described. Buying an Entry Product does not start a subscription. After your purchase we may offer optional one-time add-ons (such as AI Coach “Ask Mindora”, the AI Prompt Library or Planners). Standalone courses and certification programmes are also charged once at the listed price with lifetime access.',
  oneTimeFeatures: [
    'Entry Products: pay once, lifetime access, no subscription',
    'Optional add-ons charged only when you confirm purchase',
    'Add-ons stay available even if your subscription ends',
    'Individual courses: pay once, lifetime access to that course',
  ],
  faqTitle: 'Billing FAQs',
  faqs: [
    {
      question: 'When will I be charged?',
      answer:
        'Entry Products, add-ons and individual courses are charged immediately when you confirm the purchase. If you start a subscription with a free or paid trial, the trial fee (if any) is charged immediately and your first full subscription charge is made when the trial ends, at the price shown when you started it, and then at the start of each new billing period until you cancel. If your subscription has no trial, the first charge is made immediately. You’ll receive an email receipt after every payment.',
    },
    {
      question: 'Will I be reminded before my trial ends?',
      answer:
        'We aim to send you an email reminder before your trial converts into a paid subscription. The date of your next charge is always shown in your account.',
    },
    {
      question: '$1 product or $1 trial — how do I know which I bought?',
      answer:
        'The offer page and payment screen always state whether your initial payment is a one-time product (no subscription) or a trial that converts into a subscription. Your receipt and account also show this.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: [
        {
          kind: 'text',
          value:
            'We accept major debit and credit cards (Visa, Mastercard, American Express) and other methods shown at checkout, via our secure payment provider, ',
        },
        { kind: 'strong', value: 'Stripe' },
        {
          kind: 'text',
          value:
            '. We do not store your full card details — Stripe handles all payment processing securely and is PCI-DSS Level 1 certified.',
        },
      ],
    },
    {
      question: 'Why wasn’t I asked for my card again for the subscription or add-ons?',
      answer:
        'Your card is securely saved by Stripe at your first purchase. Subscriptions, upgrades and add-ons that you confirm afterwards are charged to that saved card with one click, for the amount shown next to the button. Nothing is charged without your confirmation. Your bank may sometimes ask you to confirm a payment (3-D Secure).',
    },
    {
      question: 'Can I switch between plans?',
      answer:
        'Where plan changes are available, you can switch in the subscription section of your account. An upgrade takes effect immediately and the amount shown at the time of the upgrade is charged at once. A downgrade takes effect at the start of your next billing period.',
    },
    {
      question: 'How do I cancel my subscription?',
      answer: [
        {
          kind: 'text',
          value:
            'Log in, open the subscription section of your profile and select Cancel Subscription. You can also email ',
        },
        { kind: 'email' },
        {
          kind: 'text',
          value:
            '. Your access continues until the end of your current trial or billing period, and no further charges are made. Cancel before the next charge date shown in your account to avoid the next charge.',
        },
      ],
    },
    {
      question: 'What happens to my other purchases when I cancel?',
      answer:
        'Entry Products, add-ons and individual courses you bought stay available on their own terms. Only access to subscription-only content ends at the end of your paid period.',
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
        {
          kind: 'text',
          value:
            'Our products are digital and available immediately, so purchases are generally non-refundable once access has been provided, to the extent permitted by law. A paid trial fee is non-refundable once access has been provided, but cancelling before the trial ends means you won’t be charged the subscription price. Individual courses purchased separately can be refunded on request within 14 days of payment. Duplicate, incorrect or unauthorised charges are always refunded. Your mandatory consumer rights are not affected. Please read our ',
        },
        { kind: 'link', route: 'refund', label: 'Refund Policy' },
        { kind: 'text', value: ' for full details.' },
      ],
    },
    {
      question: 'I bought under an earlier offer. Does anything change?',
      answer: 'No. Purchases made under earlier offers continue under the terms that applied when you bought them.',
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
    { kind: 'text', value: 'Всё, что нужно знать о покупках ' },
    { kind: 'serviceName' },
    {
      kind: 'text',
      value: ' — продукты, подписки, оплата, платежи и управление аккаунтом.',
    },
  ],
  subscriptionTitle: 'Планы подписки',
  subscriptionIntro: [
    {
      kind: 'text',
      value:
        'Mindora Membership даёт полный доступ к библиотеке, курсам, челленджам и новому контенту, пока подписка активна. Подписка начинается только если вы подтвердите её на странице предложения (например, нажав «Continue»). Она может начинаться с бесплатного пробного периода (например, 3 дня), а затем автоматически продлевается по цене, указанной при оформлении (например, ',
    },
    { kind: 'strong', value: 'US$49.99 в месяц' },
    {
      kind: 'text',
      value: '). Могут предлагаться альтернативные или скидочные планы (например, ',
    },
    { kind: 'strong', value: 'US$29.99 в месяц' },
    {
      kind: 'text',
      value:
        ') со своими условиями. Некоторые офферы вместо этого начинаются с платного пробного периода подписки за небольшую плату (например, US$1 за 7 дней); если вы не отмените до окончания пробного периода, он автоматически переходит в платную подписку по цене, указанной при старте.',
    },
  ],
  subscriptionFootnote:
    'Точный продукт, цена, условия пробного периода и продления, показанные на странице оффера и экране оплаты до подтверждения, всегда применяются к вашему заказу. Отмените подписку до даты следующего списания в аккаунте, чтобы избежать следующего платежа.',
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
    'Многие офферы начинаются с разового Entry Product — например, AI Starter Kit, Claude AI Guide Kit, Claude AI Learning Plan или 28-Day AI Plan — по цене на странице оффера (например, US$1). Списание один раз, без автопродления, с пожизненным доступом к описанному контенту. Покупка Entry Product не запускает подписку. После покупки мы можем предложить опциональные разовые дополнения (например, AI Coach «Ask Mindora», AI Prompt Library или Planners). Отдельные курсы и программы сертификации также оплачиваются один раз по указанной цене с пожизненным доступом.',
  oneTimeFeatures: [
    'Entry Products: оплата один раз, пожизненный доступ, без подписки',
    'Опциональные дополнения списываются только после вашего подтверждения',
    'Дополнения остаются доступны даже после окончания подписки',
    'Отдельные курсы: оплата один раз, пожизненный доступ к курсу',
  ],
  faqTitle: 'Частые вопросы об оплате',
  faqs: [
    {
      question: 'Когда с меня спишут деньги?',
      answer:
        'Entry Products, дополнения и отдельные курсы списываются сразу при подтверждении покупки. Если подписка начинается с бесплатного или платного пробного периода, плата за пробный период (если есть) списывается сразу, а первый полный платёж по подписке — по окончании пробного периода по цене, указанной при старте, и далее в начале каждого нового расчётного периода до отмены. Если пробного периода нет, первый платёж списывается сразу. После каждого платежа вы получите квитанцию на email.',
    },
    {
      question: 'Напомнят ли мне до окончания пробного периода?',
      answer:
        'Мы стремимся отправить напоминание по email до перехода пробного периода в платную подписку. Дата следующего списания всегда указана в вашем аккаунте.',
    },
    {
      question: 'Продукт за $1 или пробный период за $1 — как понять, что я купил?',
      answer:
        'На странице оффера и экране оплаты всегда указано, является ли первоначальный платёж разовым продуктом (без подписки) или пробным периодом, который переходит в подписку. Это также отражено в квитанции и в аккаунте.',
    },
    {
      question: 'Какие способы оплаты вы принимаете?',
      answer: [
        {
          kind: 'text',
          value:
            'Мы принимаем основные дебетовые и кредитные карты (Visa, Mastercard, American Express) и другие способы, указанные при оформлении, через нашего безопасного платёжного провайдера ',
        },
        { kind: 'strong', value: 'Stripe' },
        {
          kind: 'text',
          value:
            '. Мы не храним полные данные вашей карты — Stripe обрабатывает все платежи безопасно и сертифицирован по PCI-DSS Level 1.',
        },
      ],
    },
    {
      question: 'Почему меня не попросили снова ввести карту для подписки или дополнений?',
      answer:
        'Карта надёжно сохраняется Stripe при первой покупке. Подписки, апгрейды и дополнения, которые вы подтверждаете позже, списываются с этой сохранённой карты в один клик — на сумму рядом с кнопкой. Без вашего подтверждения списаний нет. Иногда банк может запросить подтверждение платежа (3-D Secure).',
    },
    {
      question: 'Можно ли переключаться между планами?',
      answer:
        'Если смена плана доступна, вы можете переключиться в разделе подписки вашего аккаунта. Апгрейд вступает в силу сразу, и сумма, указанная при апгрейде, списывается немедленно. Понижение плана вступает в силу с начала следующего расчётного периода.',
    },
    {
      question: 'Как отменить подписку?',
      answer: [
        {
          kind: 'text',
          value:
            'Войдите в аккаунт, откройте раздел подписки в профиле и выберите «Отменить подписку». Вы также можете написать на ',
        },
        { kind: 'email' },
        {
          kind: 'text',
          value:
            '. Доступ сохраняется до конца текущего пробного или расчётного периода, дальнейшие списания не производятся. Отмените до даты следующего списания в аккаунте, чтобы избежать следующего платежа.',
        },
      ],
    },
    {
      question: 'Что будет с другими покупками при отмене?',
      answer:
        'Entry Products, дополнения и отдельные курсы, которые вы купили, остаются доступны на своих условиях. Заканчивается только доступ к контенту, доступному по подписке, — в конце оплаченного периода.',
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
        {
          kind: 'text',
          value:
            'Наши продукты цифровые и доступны сразу, поэтому покупки, как правило, не подлежат возврату после предоставления доступа — в пределах, допускаемых законом. Плата за платный пробный период не возвращается после предоставления доступа, но отмена до окончания пробного периода означает, что цена подписки списана не будет. Отдельные курсы, купленные отдельно, можно вернуть по запросу в течение 14 дней с оплаты. Дублирующие, ошибочные или несанкционированные списания всегда возвращаются. Ваши обязательные права потребителя не затрагиваются. Подробности — в нашей ',
        },
        { kind: 'link', route: 'refund', label: 'Политике возврата' },
        { kind: 'text', value: '.' },
      ],
    },
    {
      question: 'Я купил по более раннему офферу. Что-то меняется?',
      answer:
        'Нет. Покупки по более ранним офферам продолжают действовать на условиях, которые применялись на момент покупки.',
    },
    {
      question: 'Получу ли я квитанцию с НДС?',
      answer: [
        {
          kind: 'text',
          value:
            'Да. Квитанция автоматически отправляется на ваш email после каждого платежа. Реквизиты нашей регистрации по НДС указаны в каждой квитанции. Если нужен дубликат, ',
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
