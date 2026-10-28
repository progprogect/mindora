import type { MarketingLocale } from '@/marketing/data/moneyBack'

type ProcessorEntry = { title: string; data: string }

export const PRIVACY_POLICY_COPY = {
  en: {
    pageTitle: 'Privacy Policy — Mindora Academy',
    kicker: 'Legal',
    heroTitle: 'Privacy Policy',
    updatedDate: '26 October 2026',
    lastUpdatedLine: 'Last updated: 26 October 2026',
    personalDataLabel: 'Personal Data:',
    intro: {
      p1Start:
        'This Privacy Policy explains how Scalion Ltd (“Company”, “we”, “us”), operator of Mindora Academy at ',
      p1End:
        ', collects, uses and protects personal data, and the rights you have. We act as the data controller for the personal data described below. We process personal data in accordance with the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018 and, where applicable, the EU General Data Protection Regulation (GDPR).',
    },
    sections: {
      processing: {
        title: 'How We Process Personal Data',
        intro: 'Personal data is processed for the following purposes and using the following services:',
        afterProcessorsBeforeLink:
          'Analytics, advertising and remarketing tools are used as described in our ',
        afterProcessorsAfterLink:
          '. You can opt out of them at any time as described there. We do not sell your personal data.',
      },
      optOut: {
        title: 'Information on Opting Out of Personalized Advertising',
        beforeLink:
          'In addition to any other opt-out options provided by each of the services mentioned in this document, users can learn more about how to opt out of personalized advertising in the relevant section of the ',
        afterLink: '.',
      },
      additional: {
        title: 'Additional Information on the Processing of Personal Data',
        directCollectTitle: 'Data we collect from you directly',
        directCollectBody:
          'Name, email address, account and profile settings, quiz answers and learning preferences, purchases and subscription status, course progress, and messages you send to support.',
        onlineSaleTitle: 'Online Sale of Goods and Services',
        onlineSaleBody:
          'Collected personal data is used to provide services to the user or to sell goods, including payment, subscription management and the delivery of digital products. Payment data is processed by our payment provider, Stripe. Your saved payment method is stored by Stripe so that subscriptions, renewals and purchases you confirm can be charged without re-entering your card details.',
        retentionTitle: 'Data Retention',
        retentionBody:
          'We retain personal data only for as long as necessary to provide services and comply with legal, tax, or regulatory requirements. After the retention periods expire, data is securely deleted or anonymised.',
        marketingTitle: 'Marketing',
        marketingBody:
          'We may send you emails about our products where permitted by law. You can unsubscribe at any time using the link in each email.',
        securityTitle: 'Security',
        securityBody:
          'We apply appropriate technical and organisational measures, including encryption in transit and access controls. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.',
        breachTitle: 'Data Breach Notification',
        breachBody:
          'If a security incident is likely to result in a risk to your rights and freedoms, we will notify the Information Commissioner’s Office and, where required, you, within the timeframes required by law.',
      },
      legalBases: {
        title: 'Legal Bases for Processing',
        body:
          'We process personal data on the following legal bases under the UK GDPR and the GDPR: performance of a contract (Art. 6(1)(b)) to provide the Service and process payments; compliance with legal obligations (Art. 6(1)(c)) such as tax and accounting; legitimate interests (Art. 6(1)(f)) for security, fraud prevention, customer support and operation of the Service; and consent (Art. 6(1)(a)) for analytics, advertising cookies and marketing where required. You may withdraw consent at any time.',
      },
      transfers: {
        title: 'International Data Transfers',
        body:
          'Some of our service providers process data outside the United Kingdom and the EEA. When personal data is transferred outside the UK/EEA, we use appropriate safeguards, such as the UK International Data Transfer Agreement or the UK Addendum to the European Commission’s Standard Contractual Clauses, and other mechanisms recognised by regulators. Copies of the safeguards are available upon request.',
      },
      rights: {
        title: 'Your Rights',
        intro: 'Under the UK GDPR and the GDPR, you have the right to:',
        items: [
          'access your personal data;',
          'rectify inaccurate data;',
          'erase your data;',
          'restrict or object to processing, including processing for direct marketing;',
          'data portability;',
          'withdraw consent at any time.',
        ],
        exerciseBeforeEmail:
          'To exercise any right, email ',
        exerciseAfterEmail:
          ' with the subject “Privacy Request”. We may ask for information to verify your identity. We respond within one month, which may be extended where permitted by law. If you are not satisfied with our response, you have the right to lodge a complaint with the Information Commissioner’s Office (ICO), ',
        icoUrl: 'www.ico.org.uk',
        exerciseEnd:
          ', or with the data protection authority of your country of residence.',
      },
      contact: {
        title: 'Contact Information',
        dataControllerLabel: 'Data Controller:',
        dataProcessorLabel: 'Data Processor(s):',
        dataProcessorBody:
          'Stripe Inc., Meta Platforms Inc., TikTok Inc., Google LLC, AXL EdTech Booster LLC, and others, depending on the services used.',
        jurisdictionsBody:
          'This service is intended for users located in the United States, the European Union, the United Kingdom, Canada, and other permitted jurisdictions. Our services are intended for adults (18+). We do not knowingly collect personal data of persons under 18. If you believe a minor has provided us with personal data, contact us and we will delete it.',
        lawBody:
          'Applicable Law and Jurisdiction: This Privacy Policy is governed by the laws of England and Wales. All disputes shall be subject to the jurisdiction of the courts of England and Wales, without prejudice to your right to complain to a data protection authority.',
        relatedPrefix: 'Related:',
        relatedSeparator: '·',
      },
    },
    processors: [
      {
        title: 'Analytics — Meta Events Manager and Google Analytics 4',
        data: 'Online resource usage data; Tracker',
      },
      {
        title:
          'Interaction with external social networks and platforms — PayPal service buttons and social mini-applications',
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
        data:
          'Email address; Online resource usage data; First name; Tracker; Last name; Payment information (full card numbers are processed by Stripe and are not stored by us)',
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
    updatedDate: '26 октября 2026',
    lastUpdatedLine: 'Последнее обновление: 26 октября 2026',
    personalDataLabel: 'Персональные данные:',
    intro: {
      p1Start:
        'Настоящая Политика конфиденциальности объясняет, как Scalion Ltd («Компания», «мы», «нас»), оператор Mindora Academy по адресу ',
      p1End:
        ', собирает, использует и защищает персональные данные, а также какие права у вас есть. Мы выступаем контролёром данных в отношении персональных данных, описанных ниже. Мы обрабатываем персональные данные в соответствии с Общим регламентом по защите данных Великобритании (UK GDPR), Законом о защите данных 2018 года и, где применимо, Общим регламентом по защите данных ЕС (GDPR).',
    },
    sections: {
      processing: {
        title: 'Как мы обрабатываем персональные данные',
        intro:
          'Персональные данные обрабатываются в следующих целях и с использованием следующих сервисов:',
        afterProcessorsBeforeLink:
          'Инструменты аналитики, рекламы и ремаркетинга используются, как описано в нашей ',
        afterProcessorsAfterLink:
          '. Вы можете отказаться от них в любое время, как описано там. Мы не продаём ваши персональные данные.',
      },
      optOut: {
        title: 'Информация об отказе от персонализированной рекламы',
        beforeLink:
          'В дополнение к любым другим вариантам отказа, предусмотренным каждым из сервисов, упомянутых в этом документе, пользователи могут узнать больше о том, как отказаться от персонализированной рекламы, в соответствующем разделе ',
        afterLink: '.',
      },
      additional: {
        title: 'Дополнительная информация об обработке персональных данных',
        directCollectTitle: 'Данные, которые мы собираем напрямую от вас',
        directCollectBody:
          'Имя, адрес email, настройки аккаунта и профиля, ответы на квиз и учебные предпочтения, покупки и статус подписки, прогресс по курсам, а также сообщения, которые вы отправляете в поддержку.',
        onlineSaleTitle: 'Онлайн-продажа товаров и услуг',
        onlineSaleBody:
          'Собранные персональные данные используются для предоставления услуг пользователю или продажи товаров, включая оплату, управление подпиской и доставку цифровых продуктов. Платёжные данные обрабатываются нашим платёжным провайдером Stripe. Сохранённый способ оплаты хранится у Stripe, чтобы подписки, продления и подтверждённые вами покупки можно было списывать без повторного ввода данных карты.',
        retentionTitle: 'Хранение данных',
        retentionBody:
          'Мы храним персональные данные только столько, сколько необходимо для предоставления услуг и соблюдения юридических, налоговых или регуляторных требований. По истечении сроков хранения данные надёжно удаляются или обезличиваются.',
        marketingTitle: 'Маркетинг',
        marketingBody:
          'Мы можем отправлять вам письма о наших продуктах, где это разрешено законом. Вы можете отписаться в любое время по ссылке в каждом письме.',
        securityTitle: 'Безопасность',
        securityBody:
          'Мы применяем надлежащие технические и организационные меры, включая шифрование при передаче и контроль доступа. Ни один способ передачи или хранения не является полностью безопасным, и мы не можем гарантировать абсолютную безопасность.',
        breachTitle: 'Уведомление о нарушении безопасности данных',
        breachBody:
          'Если инцидент безопасности с высокой вероятностью создаёт риск для ваших прав и свобод, мы уведомим Управление уполномоченного по информации (ICO) и, где требуется, вас — в сроки, установленные законом.',
      },
      legalBases: {
        title: 'Правовые основания обработки',
        body:
          'Мы обрабатываем персональные данные на следующих правовых основаниях по UK GDPR и GDPR: исполнение договора (ст. 6(1)(b)) для предоставления Сервиса и обработки платежей; соблюдение юридических обязательств (ст. 6(1)(c)), например налоговых и бухгалтерских; законные интересы (ст. 6(1)(f)) в целях безопасности, предотвращения мошенничества, поддержки клиентов и работы Сервиса; а также согласие (ст. 6(1)(a)) для аналитики, рекламных cookie и маркетинга, где это требуется. Вы можете отозвать согласие в любое время.',
      },
      transfers: {
        title: 'Международная передача данных',
        body:
          'Некоторые из наших поставщиков услуг обрабатывают данные за пределами Соединённого Королевства и ЕЭЗ. Когда персональные данные передаются за пределы Великобритании/ЕЭЗ, мы используем надлежащие гарантии, такие как UK International Data Transfer Agreement или UK Addendum к Стандартным договорным положениям Европейской комиссии, а также другие механизмы, признанные регуляторами. Копии гарантий предоставляются по запросу.',
      },
      rights: {
        title: 'Ваши права',
        intro: 'В соответствии с UK GDPR и GDPR вы имеете право:',
        items: [
          'получить доступ к своим персональным данным;',
          'исправить неточные данные;',
          'удалить свои данные;',
          'ограничить обработку или возразить против неё, включая обработку для прямого маркетинга;',
          'на переносимость данных;',
          'отозвать согласие в любое время.',
        ],
        exerciseBeforeEmail: 'Чтобы воспользоваться любым правом, напишите на ',
        exerciseAfterEmail:
          ' с темой «Privacy Request». Мы можем запросить информацию для подтверждения личности. Мы отвечаем в течение одного месяца; срок может быть продлён, где это разрешено законом. Если вас не устраивает наш ответ, вы вправе подать жалобу в Управление уполномоченного по информации (ICO), ',
        icoUrl: 'www.ico.org.uk',
        exerciseEnd:
          ', или в орган по защите данных страны вашего проживания.',
      },
      contact: {
        title: 'Контактная информация',
        dataControllerLabel: 'Контролёр данных:',
        dataProcessorLabel: 'Обработчик(и) данных:',
        dataProcessorBody:
          'Stripe Inc., Meta Platforms Inc., TikTok Inc., Google LLC, AXL EdTech Booster LLC и другие — в зависимости от используемых сервисов.',
        jurisdictionsBody:
          'Этот сервис предназначен для пользователей, находящихся в Соединённых Штатах, Европейском союзе, Соединённом Королевстве, Канаде и других разрешённых юрисдикциях. Наши услуги предназначены для взрослых (18+). Мы намеренно не собираем персональные данные лиц младше 18 лет. Если вы считаете, что несовершеннолетний предоставил нам персональные данные, свяжитесь с нами — мы удалим их.',
        lawBody:
          'Применимое право и юрисдикция: настоящая Политика конфиденциальности регулируется законодательством Англии и Уэльса. Все споры подлежат рассмотрению в судах Англии и Уэльса без ущерба для вашего права обратиться в орган по защите данных.',
        relatedPrefix: 'См. также:',
        relatedSeparator: '·',
      },
    },
    processors: [
      {
        title: 'Аналитика — Meta Events Manager и Google Analytics 4',
        data: 'Данные об использовании онлайн-ресурса; трекер',
      },
      {
        title:
          'Взаимодействие с внешними социальными сетями и платформами — кнопки сервиса PayPal и социальные мини-приложения',
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
        data:
          'Адрес email; данные об использовании онлайн-ресурса; имя; трекер; фамилия; платёжная информация (полные номера карт обрабатываются Stripe и нами не хранятся)',
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
