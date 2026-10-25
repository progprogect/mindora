import type { MarketingLocale } from '@/marketing/data/moneyBack'

export type SubscriptionTermsLinkRoute = 'terms' | 'privacy' | 'refund' | 'support'

export type SubscriptionTermsInlinePart =
  | { kind: 'text'; value: string }
  | { kind: 'link'; route: SubscriptionTermsLinkRoute; label: string }
  | { kind: 'moneyBackChip' }
  | { kind: 'moneyBackDays' }
  | { kind: 'strong'; value: string }
  | { kind: 'email'; address: string }
  | { kind: 'supportLink'; label: string }

export type SubscriptionTermsParagraphContent = string | SubscriptionTermsInlinePart[]

export type SubscriptionTermsBlock =
  | { kind: 'p'; content: SubscriptionTermsParagraphContent }
  | { kind: 'ul'; items: SubscriptionTermsParagraphContent[] }

export type SubscriptionTermsSection = {
  title: string
  blocks: SubscriptionTermsBlock[]
}

export type SubscriptionTermsPageCopy = {
  pageTitle: string
  heroTitle: string
  heroUpdated: string
  intro: SubscriptionTermsParagraphContent
  sections: SubscriptionTermsSection[]
}

const EN: SubscriptionTermsPageCopy = {
  pageTitle: 'Subscription Terms — MindoraAcademy.com',
  heroTitle: 'Subscription Terms',
  heroUpdated: '6 July 2026',
  intro: [
    { kind: 'text', value: 'These Subscription Terms ("Subscription Terms") govern your subscription to MindoraAcademy.com ("Platform", "Service"), operated by Scalion Ltd ("we", "us", "our"). By subscribing, you agree to these terms in addition to our ' },
    { kind: 'link', route: 'terms', label: 'Terms and Conditions' },
    { kind: 'text', value: ' and ' },
    { kind: 'link', route: 'privacy', label: 'Privacy Policy' },
    { kind: 'text', value: '.' },
  ],
  sections: [
    {
      title: '1. Subscription Plans',
      blocks: [
        { kind: 'p', content: 'We offer the following subscription plans:' },
        {
          kind: 'ul',
          items: [
            [{ kind: 'strong', value: '1-Month Plan' }, { kind: 'text', value: ' — billed monthly' }],
            [{ kind: 'strong', value: '6-Month Plan' }, { kind: 'text', value: ' — billed every 6 months' }],
            [{ kind: 'strong', value: '12-Month Plan' }, { kind: 'text', value: ' — billed annually' }],
          ],
        },
        {
          kind: 'p',
          content:
            'Plan pricing is displayed on our website at the time of purchase. All prices are in USD unless otherwise stated.',
        },
      ],
    },
    {
      title: '2. Free Trial',
      blocks: [
        {
          kind: 'p',
          content:
            'We may offer a free trial period (typically 3 days) for new subscribers. During the trial, you will have full access to the Platform. If you do not cancel before the trial ends, your subscription will automatically convert to a paid plan and your payment method will be charged.',
        },
        {
          kind: 'p',
          content:
            'You will not be charged during the trial period. You may cancel at any time before the trial ends without charge.',
        },
      ],
    },
    {
      title: '3. Billing & Payment',
      blocks: [
        {
          kind: 'ul',
          items: [
            'All payments are processed securely via Stripe.',
            'Your subscription will automatically renew at the end of each billing cycle unless cancelled.',
            'You authorise us to charge your chosen payment method on a recurring basis.',
            'If a payment fails, we may retry the charge and/or suspend your access until payment is received.',
          ],
        },
      ],
    },
    {
      title: '4. Promotional Discounts',
      blocks: [
        {
          kind: 'p',
          content:
            'From time to time, we may offer promotional discounts or coupons. These apply to the initial billing period only unless explicitly stated otherwise. After the promotional period ends, your subscription will renew at the standard rate displayed at checkout.',
        },
      ],
    },
    {
      title: '5. Cancellation',
      blocks: [
        {
          kind: 'ul',
          items: [
            'You may cancel your subscription at any time from your account settings or by contacting support.',
            'Upon cancellation, you will retain access to the Platform until the end of your current billing period.',
            'No partial refunds will be issued for unused time within a billing cycle, unless covered by our refund policy.',
          ],
        },
      ],
    },
    {
      title: '6. Refund Policy',
      blocks: [
        {
          kind: 'p',
          content: [
            { kind: 'text', value: 'We offer a ' },
            { kind: 'moneyBackChip' },
            { kind: 'text', value: ' from the date of your first payment. If you are unsatisfied with the Platform, contact our support team within ' },
            { kind: 'moneyBackDays' },
            { kind: 'text', value: ' days of your first charge and we will issue a full refund.' },
          ],
        },
        {
          kind: 'p',
          content: [
            { kind: 'text', value: 'Refund requests made after ' },
            { kind: 'moneyBackDays' },
            { kind: 'text', value: ' days will be reviewed on a case-by-case basis. Refunds are not available for renewal charges after the first billing cycle.' },
          ],
        },
        {
          kind: 'p',
          content: [
            { kind: 'text', value: 'For full details, see our ' },
            { kind: 'link', route: 'refund', label: 'Refund Policy' },
            { kind: 'text', value: '.' },
          ],
        },
      ],
    },
    {
      title: '7. Changes to Pricing',
      blocks: [
        {
          kind: 'p',
          content:
            'We reserve the right to change subscription pricing. Existing subscribers will be notified at least 30 days in advance. Price changes will apply to the next billing cycle after notification.',
        },
      ],
    },
    {
      title: '8. Account Access',
      blocks: [
        {
          kind: 'p',
          content:
            'Your subscription is personal to you. Sharing login credentials or allowing others to access your account is prohibited. We reserve the right to suspend accounts found to be sharing access.',
        },
      ],
    },
    {
      title: '9. Service Availability',
      blocks: [
        {
          kind: 'p',
          content:
            'We aim to provide continuous access to the Platform but do not guarantee uninterrupted service. Scheduled maintenance, updates, and unforeseen issues may occasionally affect availability. We will endeavour to minimise disruption.',
        },
      ],
    },
    {
      title: '10. Termination by Us',
      blocks: [
        {
          kind: 'p',
          content:
            'We may terminate or suspend your subscription without refund if you violate these terms, our Terms and Conditions, or engage in fraudulent or abusive behaviour.',
        },
      ],
    },
    {
      title: '11. Contact Us',
      blocks: [
        { kind: 'p', content: 'For subscription enquiries, cancellations, or refund requests:' },
        {
          kind: 'p',
          content: [
            { kind: 'text', value: 'Email: ' },
            { kind: 'email', address: 'support@mindoraacademy.com' },
          ],
        },
        {
          kind: 'p',
          content: [
            { kind: 'text', value: 'Support page: ' },
            { kind: 'supportLink', label: 'mindoraacademy.com/support' },
          ],
        },
        {
          kind: 'p',
          content:
            'Scalion Ltd T/A. MindoraAcademy.com. These Subscription Terms are governed by the laws of England and Wales.',
        },
      ],
    },
  ],
}

const RU: SubscriptionTermsPageCopy = {
  pageTitle: 'Условия подписки — MindoraAcademy.com',
  heroTitle: 'Условия подписки',
  heroUpdated: '6 июля 2026 г.',
  intro: [
    {
      kind: 'text',
      value:
        'Настоящие Условия подписки («Условия подписки») регулируют вашу подписку на MindoraAcademy.com («Платформа», «Сервис»), которую предоставляет Scalion Ltd («мы», «нас», «наш»). Оформляя подписку, вы соглашаетесь с этими условиями в дополнение к нашим ',
    },
    { kind: 'link', route: 'terms', label: 'Условиям и положениям' },
    { kind: 'text', value: ' и ' },
    { kind: 'link', route: 'privacy', label: 'Политике конфиденциальности' },
    { kind: 'text', value: '.' },
  ],
  sections: [
    {
      title: '1. Планы подписки',
      blocks: [
        { kind: 'p', content: 'Мы предлагаем следующие планы подписки:' },
        {
          kind: 'ul',
          items: [
            [{ kind: 'strong', value: 'План на 1 месяц' }, { kind: 'text', value: ' — оплата ежемесячно' }],
            [{ kind: 'strong', value: 'План на 6 месяцев' }, { kind: 'text', value: ' — оплата каждые 6 месяцев' }],
            [{ kind: 'strong', value: 'План на 12 месяцев' }, { kind: 'text', value: ' — оплата ежегодно' }],
          ],
        },
        {
          kind: 'p',
          content:
            'Стоимость планов отображается на нашем сайте на момент покупки. Все цены указаны в USD, если не указано иное.',
        },
      ],
    },
    {
      title: '2. Бесплатный пробный период',
      blocks: [
        {
          kind: 'p',
          content:
            'Мы можем предлагать бесплатный пробный период (обычно 3 дня) для новых подписчиков. В течение пробного периода у вас будет полный доступ к Платформе. Если вы не отмените подписку до окончания пробного периода, ваша подписка автоматически перейдёт на платный план, и с вашего способа оплаты будет списана сумма.',
        },
        {
          kind: 'p',
          content:
            'В течение пробного периода с вас не взимается плата. Вы можете отменить подписку в любое время до окончания пробного периода без каких-либо платежей.',
        },
      ],
    },
    {
      title: '3. Оплата и платежи',
      blocks: [
        {
          kind: 'ul',
          items: [
            'Все платежи обрабатываются безопасно через Stripe.',
            'Ваша подписка автоматически продлевается в конце каждого расчётного периода, если вы её не отмените.',
            'Вы уполномочиваете нас периодически списывать средства с выбранного вами способа оплаты.',
            'Если платёж не прошёл, мы можем повторить попытку списания и/или приостановить ваш доступ до получения оплаты.',
          ],
        },
      ],
    },
    {
      title: '4. Промоакции и скидки',
      blocks: [
        {
          kind: 'p',
          content:
            'Иногда мы можем предлагать промоакции или купоны. Они применяются только к первому расчётному периоду, если прямо не указано иное. После окончания промо-периода подписка продлевается по стандартной ставке, указанной при оформлении заказа.',
        },
      ],
    },
    {
      title: '5. Отмена',
      blocks: [
        {
          kind: 'ul',
          items: [
            'Вы можете отменить подписку в любое время в настройках аккаунта или обратившись в службу поддержки.',
            'После отмены вы сохраняете доступ к Платформе до конца текущего расчётного периода.',
            'Частичные возвраты за неиспользованное время в расчётном периоде не предусмотрены, за исключением случаев, предусмотренных нашей политикой возврата.',
          ],
        },
      ],
    },
    {
      title: '6. Политика возврата',
      blocks: [
        {
          kind: 'p',
          content: [
            { kind: 'text', value: 'Мы предлагаем ' },
            { kind: 'moneyBackChip' },
            { kind: 'text', value: ' с даты вашего первого платежа. Если Платформа вас не устроила, свяжитесь с нашей службой поддержки в течение ' },
            { kind: 'moneyBackDays' },
            { kind: 'text', value: ' дней после первого списания — мы оформим полный возврат.' },
          ],
        },
        {
          kind: 'p',
          content: [
            { kind: 'text', value: 'Запросы на возврат, поданные позже чем через ' },
            { kind: 'moneyBackDays' },
            { kind: 'text', value: ' дней, рассматриваются в индивидуальном порядке. Возврат за продление подписки после первого расчётного цикла не предусмотрен.' },
          ],
        },
        {
          kind: 'p',
          content: [
            { kind: 'text', value: 'Подробности см. в нашей ' },
            { kind: 'link', route: 'refund', label: 'Политике возврата' },
            { kind: 'text', value: '.' },
          ],
        },
      ],
    },
    {
      title: '7. Изменение цен',
      blocks: [
        {
          kind: 'p',
          content:
            'Мы оставляем за собой право изменять стоимость подписки. Действующим подписчикам мы уведомим об этом не менее чем за 30 дней. Изменение цены применяется к следующему расчётному циклу после уведомления.',
        },
      ],
    },
    {
      title: '8. Доступ к аккаунту',
      blocks: [
        {
          kind: 'p',
          content:
            'Подписка предназначена лично для вас. Передача учётных данных или предоставление доступа к аккаунту другим лицам запрещена. Мы вправе приостановить аккаунты, в отношении которых обнаружено совместное использование доступа.',
        },
      ],
    },
    {
      title: '9. Доступность сервиса',
      blocks: [
        {
          kind: 'p',
          content:
            'Мы стремимся обеспечивать непрерывный доступ к Платформе, но не гарантируем бесперебойную работу. Плановое обслуживание, обновления и непредвиденные сбои могут временно влиять на доступность. Мы приложим усилия, чтобы минимизировать перебои.',
        },
      ],
    },
    {
      title: '10. Прекращение подписки нами',
      blocks: [
        {
          kind: 'p',
          content:
            'Мы можем прекратить или приостановить вашу подписку без возврата средств, если вы нарушаете эти условия, наши Условия и положения или допускаете мошенническое либо оскорбительное поведение.',
        },
      ],
    },
    {
      title: '11. Связаться с нами',
      blocks: [
        { kind: 'p', content: 'По вопросам подписки, отмены или возврата:' },
        {
          kind: 'p',
          content: [
            { kind: 'text', value: 'Email: ' },
            { kind: 'email', address: 'support@mindoraacademy.com' },
          ],
        },
        {
          kind: 'p',
          content: [
            { kind: 'text', value: 'Страница поддержки: ' },
            { kind: 'supportLink', label: 'mindoraacademy.com/support' },
          ],
        },
        {
          kind: 'p',
          content:
            'Scalion Ltd T/A. MindoraAcademy.com. Настоящие Условия подписки регулируются законодательством Англии и Уэльса.',
        },
      ],
    },
  ],
}

export const SUBSCRIPTION_TERMS_PAGE_COPY: Record<MarketingLocale, SubscriptionTermsPageCopy> = {
  en: EN,
  ru: RU,
}

export function subscriptionTermsPageCopy(locale: MarketingLocale): SubscriptionTermsPageCopy {
  return SUBSCRIPTION_TERMS_PAGE_COPY[locale]
}
