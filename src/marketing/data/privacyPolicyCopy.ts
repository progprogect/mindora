import type { MarketingLocale } from '@/marketing/data/moneyBack'

type ProcessorEntry = { title: string; data: string }

export const PRIVACY_POLICY_COPY = {
  en: {
    pageTitle: 'Privacy Policy — Mindora Academy',
    kicker: 'Legal',
    heroTitle: 'Privacy Policy',
    updatedDate: '15 October 2025',
    lastUpdatedLine: 'Last updated: 15 October 2025',
    personalDataLabel: 'Personal Data:',
    sections: {
      processing: {
        title: 'How We Process Personal Data',
        intro: 'Personal data is processed for the following purposes and using the following services:',
      },
      optOut: {
        title: 'Information on Opting Out of Personalized Advertising',
        beforeLink:
          'In addition to any other opt-out options provided by each of the services mentioned in this document, users can learn more about how to opt out of personalized advertising in the relevant section of the ',
        afterLink: '.',
      },
      additional: {
        title: 'Additional Information on the Processing of Personal Data',
        retentionTitle: 'Data Retention',
        retentionBody:
          'We retain personal data only for as long as necessary to provide services and comply with legal, tax, or regulatory requirements. After the retention periods expire, data is securely deleted or anonymized.',
        onlineSaleTitle: 'Online Sale of Goods and Services',
        onlineSaleBody:
          'Collected personal data is used to provide services to the user or to sell goods, including payment and possible delivery. Personal data collected for payment purposes may include credit card information, bank account information used for electronic payments, or any other payment method. The nature of the data collected by the Service depends on the payment system used.',
      },
      legalBases: {
        title: 'Legal Bases for Processing (GDPR)',
        body:
          'We process personal data on the following legal bases: performance of a contract (Art. 6(1)(b) GDPR), compliance with legal obligations (Art. 6(1)(c)), legitimate interests (Art. 6(1)(f)) for security and operation of the service, and consent (Art. 6(1)(a)) for analytics/marketing where required. Users may withdraw consent at any time.',
      },
      transfers: {
        title: 'International Data Transfers',
        body:
          "When personal data is transferred outside the EEA/UK, we use appropriate safeguards, such as the European Commission's Standard Contractual Clauses (and UK IDTA/Addendum), as well as, where applicable, mechanisms recognized by regulators. Copies of the safeguards are available upon request.",
      },
      contact: {
        title: 'Contact Information',
        dataControllerLabel: 'Data Controller:',
        dataProcessorLabel: 'Data Processor(s):',
        dataProcessorBody:
          'Stripe Inc., Meta Platforms Inc., TikTok Inc., Google LLC, AXL EdTech Booster LLC, and others, depending on the services used.',
        jurisdictionsBody:
          'This service is intended for users located in the United States, the European Union, the United Kingdom, Canada, and other permitted jurisdictions. Our services are intended for adults (18+). We also do not process personal data of children under 16 years of age.',
        lawBody:
          'Applicable law and jurisdiction: this Privacy Policy is governed by the laws of the United Kingdom. All disputes shall be subject to the jurisdiction of the courts of England and Wales.',
        relatedPrefix: 'Related:',
        relatedSeparator: '·',
      },
    },
    processors: [
      {
        title: 'Analytics — Meta Events Manager and Google Analytics (Universal Analytics)',
        data: 'Online resource usage data; Tracker',
      },
      {
        title: 'Interaction with support and feedback platforms — Jivochat Widget',
        data: 'Online resource usage data; Tracker',
      },
      {
        title: 'Interaction with real-time chat platforms — Jivochat',
        data: 'Online resource usage data; Data transmitted when using the service; Tracker',
      },
      {
        title: 'Access to third-party service accounts — Access to Stripe account',
        data: 'Email address; Online resource usage data; First name; Payment information; Tracker; Last name',
      },
      {
        title: 'Use of hosting platforms and services — ClickFunnels',
        data:
          'Shipping address; Email address; Billing address; Online resource usage data; First name; Device information; Phone number; Payment information; Tracker; Last name',
      },
      {
        title: 'AXL Platform',
        data: 'First name; Email address; Online resource usage data; IP address; Location data; Tracker',
      },
      {
        title: 'Payment processing — Stripe',
        data: 'Email address; Online resource usage data; First name; Tracker; Last name',
      },
      {
        title: 'Displaying content from external platforms — Vimeo Videos',
        data: 'Online resource usage data; Tracker',
      },
      {
        title: 'Registration and authentication — Stripe OAuth',
        data: 'Online resource usage data; Tracker',
      },
      {
        title:
          'Advertising — Link click tracking TikTok, conversion tracking Meta Ads (Meta Pixel), and Meta Lookalike Audience',
        data: 'Online resource usage data; Tracker',
      },
      {
        title: 'Remarketing and behavioral targeting — TikTok Ads Remarketing',
        data:
          'Online resource usage data; Tracker; Unique advertising device identifiers (e.g., Google Advertiser ID or IDFA)',
      },
      { title: 'Meta Custom Audience', data: 'Email address; Tracker' },
      { title: 'Facebook Remarketing', data: 'Online resource usage data; Tracker' },
    ] satisfies ProcessorEntry[],
  },
  ru: {
    pageTitle: 'Политика конфиденциальности — Mindora Academy',
    kicker: 'Документы',
    heroTitle: 'Политика конфиденциальности',
    updatedDate: '15 октября 2025',
    lastUpdatedLine: 'Последнее обновление: 15 октября 2025',
    personalDataLabel: 'Персональные данные:',
    sections: {
      processing: {
        title: 'Как мы обрабатываем персональные данные',
        intro:
          'Персональные данные обрабатываются в следующих целях и с использованием следующих сервисов:',
      },
      optOut: {
        title: 'Информация об отказе от персонализированной рекламы',
        beforeLink:
          'В дополнение к любым другим вариантам отказа, предусмотренным каждым из сервисов, упомянутых в этом документе, пользователи могут узнать больше о том, как отказаться от персонализированной рекламы, в соответствующем разделе ',
        afterLink: '.',
      },
      additional: {
        title: 'Дополнительная информация об обработке персональных данных',
        retentionTitle: 'Хранение данных',
        retentionBody:
          'Мы храним персональные данные только столько, сколько необходимо для предоставления услуг и соблюдения юридических, налоговых или регуляторных требований. По истечении сроков хранения данные надёжно удаляются или обезличиваются.',
        onlineSaleTitle: 'Онлайн-продажа товаров и услуг',
        onlineSaleBody:
          'Собранные персональные данные используются для предоставления услуг пользователю или продажи товаров, включая оплату и возможную доставку. Персональные данные, собираемые в целях оплаты, могут включать данные кредитной карты, данные банковского счёта, используемого для электронных платежей, или любой другой способ оплаты. Характер данных, собираемых Сервисом, зависит от используемой платёжной системы.',
      },
      legalBases: {
        title: 'Правовые основания обработки (GDPR)',
        body:
          'Мы обрабатываем персональные данные на следующих правовых основаниях: исполнение договора (ст. 6(1)(b) GDPR), соблюдение юридических обязательств (ст. 6(1)(c)), законные интересы (ст. 6(1)(f)) в целях безопасности и работы сервиса, а также согласие (ст. 6(1)(a)) для аналитики/маркетинга, где это требуется. Пользователи могут отозвать согласие в любое время.',
      },
      transfers: {
        title: 'Международная передача данных',
        body:
          'Когда персональные данные передаются за пределы ЕЭЗ/Великобритании, мы используем надлежащие гарантии, такие как Стандартные договорные положения Европейской комиссии (и UK IDTA/Addendum), а также, где применимо, механизмы, признанные регуляторами. Копии гарантий предоставляются по запросу.',
      },
      contact: {
        title: 'Контактная информация',
        dataControllerLabel: 'Контролёр данных:',
        dataProcessorLabel: 'Обработчик(и) данных:',
        dataProcessorBody:
          'Stripe Inc., Meta Platforms Inc., TikTok Inc., Google LLC, AXL EdTech Booster LLC и другие — в зависимости от используемых сервисов.',
        jurisdictionsBody:
          'Этот сервис предназначен для пользователей, находящихся в Соединённых Штатах, Европейском союзе, Соединённом Королевстве, Канаде и других разрешённых юрисдикциях. Наши услуги предназначены для взрослых (18+). Мы также не обрабатываем персональные данные детей младше 16 лет.',
        lawBody:
          'Применимое право и юрисдикция: настоящая Политика конфиденциальности регулируется законодательством Соединённого Королевства. Все споры подлежат рассмотрению в судах Англии и Уэльса.',
        relatedPrefix: 'См. также:',
        relatedSeparator: '·',
      },
    },
    processors: [
      {
        title: 'Аналитика — Meta Events Manager и Google Analytics (Universal Analytics)',
        data: 'Данные об использовании онлайн-ресурса; трекер',
      },
      {
        title: 'Взаимодействие с платформами поддержки и обратной связи — Jivochat Widget',
        data: 'Данные об использовании онлайн-ресурса; трекер',
      },
      {
        title: 'Взаимодействие с платформами чата в реальном времени — Jivochat',
        data: 'Данные об использовании онлайн-ресурса; данные, передаваемые при использовании сервиса; трекер',
      },
      {
        title: 'Доступ к учётным записям сторонних сервисов — доступ к учётной записи Stripe',
        data:
          'Адрес email; данные об использовании онлайн-ресурса; имя; платёжная информация; трекер; фамилия',
      },
      {
        title: 'Использование хостинговых платформ и сервисов — ClickFunnels',
        data:
          'Адрес доставки; адрес email; платёжный адрес; данные об использовании онлайн-ресурса; имя; информация об устройстве; номер телефона; платёжная информация; трекер; фамилия',
      },
      {
        title: 'AXL Platform',
        data:
          'Имя; адрес email; данные об использовании онлайн-ресурса; IP-адрес; данные о местоположении; трекер',
      },
      {
        title: 'Обработка платежей — Stripe',
        data: 'Адрес email; данные об использовании онлайн-ресурса; имя; трекер; фамилия',
      },
      {
        title: 'Отображение контента с внешних платформ — Vimeo Videos',
        data: 'Данные об использовании онлайн-ресурса; трекер',
      },
      {
        title: 'Регистрация и аутентификация — Stripe OAuth',
        data: 'Данные об использовании онлайн-ресурса; трекер',
      },
      {
        title:
          'Реклама — отслеживание кликов по ссылкам TikTok, отслеживание конверсий Meta Ads (Meta Pixel) и Meta Lookalike Audience',
        data: 'Данные об использовании онлайн-ресурса; трекер',
      },
      {
        title: 'Ремаркетинг и поведенческий таргетинг — TikTok Ads Remarketing',
        data:
          'Данные об использовании онлайн-ресурса; трекер; уникальные рекламные идентификаторы устройства (например, Google Advertiser ID или IDFA)',
      },
      { title: 'Meta Custom Audience', data: 'Адрес email; трекер' },
      { title: 'Facebook Remarketing', data: 'Данные об использовании онлайн-ресурса; трекер' },
    ] satisfies ProcessorEntry[],
  },
} as const

export function privacyPolicyCopy(locale: MarketingLocale) {
  return PRIVACY_POLICY_COPY[locale]
}
