import type { MarketingLocale } from '@/marketing/data/moneyBack'

export const REFUND_POLICY_COPY = {
  en: {
    pageTitle: '14-Day Money-Back Guarantee — Mindora Academy Refund Policy',
    hero: {
      kicker: 'Legal',
      title: '14-Day Money-Back Guarantee',
      subtitleBefore: "We're confident ",
      subtitleAfter:
        " will deliver real results. If it doesn't, we'll give you every penny back — no questions asked.",
      meta: 'Refund Policy · Last updated: 26 October 2026',
      badgeDays: '14',
      badgeDaysLabel: 'Days',
      cardTitleBefore: 'Try ',
      cardTitleAfter: ' completely risk-free',
      cardBody:
        "If you're not happy with your progress in the first 14 days after your full subscription charge or one-time purchase — for any reason — contact us and we'll issue a full refund. No lengthy forms, no interrogation, no hard feelings.",
    },
    sections: {
      intro: {
        p1Before: 'This Refund Policy applies to purchases made on ',
        p1Mid: ' (',
        p1After:
          '), operated by Scalion Ltd, and forms part of our Terms and Conditions of Use of the Service. Terms and guarantees that applied when an earlier purchase was made continue to apply to that purchase.',
      },
      whatYouBuy: {
        title: '1. What you buy',
        intro: 'Mindora Academy is a digital learning platform. Depending on the offer, you may purchase:',
        entryLabel: 'Entry Products',
        entryDesc:
          ' — one-time digital products offered at the start of an offer (for example, the AI Starter Kit, Claude AI Guide Kit, Claude AI Learning Plan or 28-Day AI Plan). They are charged once, do not renew and give lifetime access to the content described in the offer. An Entry Product does not include a subscription.',
        paidTrialLabel: 'Paid trial subscription',
        paidTrialDesc:
          ' — a subscription that starts with a paid trial for a small fee (for example, US$1 for 7 days) and, unless cancelled before the trial ends, converts automatically into a paid subscription at the recurring price shown at purchase (for example, US$29 per month).',
        membershipLabel: 'Subscription (Membership) after an Entry Product',
        membershipDesc:
          ' — recurring access to the full Mindora Academy library and features. A subscription starts only when you separately confirm it on the subscription offer page. It may begin with a free or paid trial and then renews automatically until cancelled.',
        upgradesLabel: 'Upgrades and plan changes',
        upgradesDesc: ' — moving to a different or higher subscription plan, where offered.',
        addOnsLabel: 'Add-ons',
        addOnsDesc:
          ' — one-time products offered after your main purchase (for example, AI Coach “Ask Mindora”, the AI Prompt Library or Planners), including discounted versions of these offers. Add-ons give lifetime access and remain available if your subscription ends.',
        coursesLabel: 'Individual courses',
        coursesDesc: ' — standalone courses and certification programmes purchased separately.',
        note1:
          'In some offers the initial payment (for example, US$1) is a one-time Entry Product with no subscription; in others it is a paid trial of a subscription. The offer page and payment screen always state which applies.',
        note2:
          'Access to digital content starts as soon as payment is confirmed or, for a subscription with a trial, at the start of the trial. Materials offered for download can be saved immediately. The price does not depend on how much of the content you use or how quickly you use it.',
      },
      priceTrialRenewal: {
        title: '2. Price, trial and renewal',
        p1: 'The product, amount, currency, billing period, trial length and renewal price shown on the offer page and in the payment screen before you confirm your purchase govern your order. Different offers, landing pages and promotions may have different prices and terms.',
        p2: 'Subscriptions renew automatically at the end of each billing period until cancelled. If a trial is offered and you do not cancel before it ends, the subscription converts to a paid subscription at the recurring price shown when you started it. Prices for new offers may change; we notify existing subscribers before a change to their recurring price so they can cancel. A period already paid for is not repriced.',
      },
      cancellations: {
        title: '3. Cancelling your subscription',
        p1: 'You can cancel your subscription at any time in the subscription section of your account or by emailing support@mindoraacademy.com. To avoid the next charge, cancel before the next charge date shown in your account.',
        p2: 'If you cancel during a free or paid trial, you will not be charged the recurring subscription price.',
        p3: 'After cancellation, your access continues until the end of the trial or billing period that has already started, and no further charges are made.',
        p4: 'Cancelling a subscription does not by itself request a refund of a previous charge.',
        p5: 'Cancelling a subscription does not affect Entry Products, add-ons or individual courses you have purchased.',
      },
      refunds: {
        title: '4. Refunds',
        intro:
          'Once access has been provided, purchases are generally non-refundable because you changed your mind or your plans, did not use the materials, or used or downloaded them quickly, to the extent permitted by applicable law. In particular:',
        entryLabel: 'Entry Products',
        entryDesc: ' are non-refundable once access has been provided.',
        paidTrialLabel: 'Paid trials',
        paidTrialDesc:
          ': the trial fee (for example, US$1) is non-refundable once access has been provided.',
        subscriptionsLabel: 'Subscriptions',
        subscriptionsDesc:
          ': a trial or billing period that has already started, including an automatic renewal, is non-refundable; we do not provide partial or prorated refunds.',
        upgradesLabel: 'Upgrades and plan changes',
        upgradesDesc:
          ': amounts charged for an upgrade or plan change are non-refundable once the new plan is active.',
        addOnsLabel: 'Add-ons',
        addOnsDesc: ' are non-refundable once access has been provided.',
        coursesLabel: 'Individual courses',
        coursesDesc:
          ' purchased separately may be refunded on request within 14 calendar days from the date of payment.',
        note1:
          'Changes in price, promotional periods, content assortment, or temporary unavailability of individual features (less than 24 hours) are not grounds for a refund.',
        note2:
          'This section does not override mandatory consumer rights or any refund guarantee expressly offered for your purchase at the time you made it.',
      },
      consumerRights: {
        title: '5. Consumer rights and exceptions',
        p1: 'Consumers in the United Kingdom and the European Union generally have a 14-day right to cancel distance contracts. For digital content, this right may be lost once supply has begun where the legal requirements for this are met. Where mandatory law in your country gives you a right to cancel or to a proportionate refund, including any cooling-off rights for subscriptions, we will honour that right.',
        p2: 'We will always refund or otherwise resolve:',
        duplicate: 'duplicate or incorrect charges;',
        unauthorised: 'charges you did not authorise;',
        technical:
          'a paid product that you could not access because of a verified technical error on our side.',
      },
      earlierPurchases: {
        title: '6. Earlier purchases',
        body: 'Purchases made before the date of this policy remain subject to the refund terms that applied at the time of purchase. This update does not reduce the terms of earlier purchases.',
      },
      howToRequest: {
        title: '7. How to contact us',
        intro: 'Email support@mindoraacademy.com from the email address used for your purchase. Please include:',
        includeProduct: 'the product or plan concerned;',
        includeDate: 'the date of purchase;',
        includeReceipt: 'your Stripe receipt number (if available);',
        includeDescription: 'a short description of your request.',
        response:
          'We review requests within five business days; mandatory legal deadlines take priority. Approved refunds are issued through Stripe to the original payment method. Your bank or card provider determines when the funds appear, usually within 5–10 business days.',
      },
      chargebacks: {
        title: '8. Chargebacks and payment disputes',
        body: 'Please contact us before opening a dispute with your bank. Most billing questions can be resolved faster directly with us. If a chargeback is filed, we may suspend access to the related products while the dispute is reviewed and provide the bank with the purchase details and the terms you accepted.',
      },
      contact: {
        title: 'Contact details',
        intro: 'Questions about this policy? We are happy to help.',
        relatedPrefix: 'Related:',
        relatedSeparator: '·',
        termsLink: 'Terms & Conditions',
        billingLink: 'Billing & Plans',
        privacyLink: 'Privacy Policy',
        contactLink: 'Contact',
      },
    },
  },
  ru: {
    pageTitle: 'Гарантия возврата денег 14 дней — Политика возврата Mindora Academy',
    hero: {
      kicker: 'Документы',
      title: 'Гарантия возврата денег 14 дней',
      subtitleBefore: 'Мы уверены, что ',
      subtitleAfter:
        ' принесёт реальные результаты. Если этого не произойдёт — мы вернём каждый цент без лишних вопросов.',
      meta: 'Политика возврата · Последнее обновление: 26 октября 2026',
      badgeDays: '14',
      badgeDaysLabel: 'Дней',
      cardTitleBefore: 'Попробуйте ',
      cardTitleAfter: ' совершенно без риска',
      cardBody:
        'Если в первые 14 дней после полного списания по подписке или разовой покупки вы недовольны своим прогрессом — по любой причине — свяжитесь с нами, и мы оформим полный возврат. Никаких длинных форм, допросов и обид.',
    },
    sections: {
      intro: {
        p1Before: 'Настоящая Политика возврата применяется к покупкам на ',
        p1Mid: ' (',
        p1After:
          '), оператором которой является Scalion Ltd, и является частью наших Условий использования Сервиса. Условия и гарантии, действовавшие на момент более ранней покупки, продолжают применяться к этой покупке.',
      },
      whatYouBuy: {
        title: '1. Что вы покупаете',
        intro:
          'Mindora Academy — платформа цифрового обучения. В зависимости от предложения вы можете приобрести:',
        entryLabel: 'Entry Products (входные продукты)',
        entryDesc:
          ' — разовые цифровые продукты, предлагаемые в начале оффера (например, AI Starter Kit, Claude AI Guide Kit, Claude AI Learning Plan или 28-Day AI Plan). Они списываются один раз, не продлеваются и дают пожизненный доступ к контенту, описанному в оффере. Entry Product не включает подписку.',
        paidTrialLabel: 'Платная пробная подписка',
        paidTrialDesc:
          ' — подписка, которая начинается с платного пробного периода за небольшую плату (например, US$1 на 7 дней) и, если её не отменить до окончания пробного периода, автоматически переходит в платную подписку по регулярной цене, указанной при покупке (например, US$29 в месяц).',
        membershipLabel: 'Подписка (Membership) после Entry Product',
        membershipDesc:
          ' — регулярный доступ к полной библиотеке и функциям Mindora Academy. Подписка начинается только когда вы отдельно подтверждаете её на странице предложения подписки. Она может начинаться с бесплатного или платного пробного периода и затем автоматически продлевается до отмены.',
        upgradesLabel: 'Апгрейды и смена плана',
        upgradesDesc: ' — переход на другой или более высокий план подписки, где это предлагается.',
        addOnsLabel: 'Дополнения (add-ons)',
        addOnsDesc:
          ' — разовые продукты, предлагаемые после основной покупки (например, AI Coach «Ask Mindora», AI Prompt Library или Planners), включая их скидочные версии. Дополнения дают пожизненный доступ и остаются доступными, если подписка заканчивается.',
        coursesLabel: 'Отдельные курсы',
        coursesDesc: ' — самостоятельные курсы и программы сертификации, приобретаемые отдельно.',
        note1:
          'В одних офферах первоначальный платёж (например, US$1) — это разовый Entry Product без подписки; в других — платный пробный период подписки. Страница оффера и экран оплаты всегда указывают, что именно применяется.',
        note2:
          'Доступ к цифровому контенту начинается сразу после подтверждения оплаты или, для подписки с пробным периодом, с начала пробного периода. Материалы, предлагаемые для скачивания, можно сохранить сразу. Цена не зависит от того, сколько контента вы используете и как быстро.',
      },
      priceTrialRenewal: {
        title: '2. Цена, пробный период и продление',
        p1: 'Продукт, сумма, валюта, расчётный период, длительность пробного периода и цена продления, указанные на странице оффера и на экране оплаты до подтверждения покупки, определяют ваш заказ. Разные офферы, лендинги и акции могут иметь разные цены и условия.',
        p2: 'Подписки автоматически продлеваются в конце каждого расчётного периода до отмены. Если предложен пробный период и вы не отмените подписку до его окончания, она переходит в платную подписку по регулярной цене, указанной при старте. Цены новых офферов могут меняться; существующих подписчиков мы уведомляем до изменения регулярной цены, чтобы они могли отменить подписку. Уже оплаченный период не пересчитывается.',
      },
      cancellations: {
        title: '3. Отмена подписки',
        p1: 'Вы можете отменить подписку в любое время в разделе подписки вашего аккаунта или написав на support@mindoraacademy.com. Чтобы избежать следующего списания, отмените подписку до даты следующего списания, указанной в аккаунте.',
        p2: 'Если вы отмените подписку во время бесплатного или платного пробного периода, регулярная цена подписки списана не будет.',
        p3: 'После отмены доступ сохраняется до конца уже начавшегося пробного или расчётного периода, и дальнейшие списания не производятся.',
        p4: 'Отмена подписки сама по себе не является запросом на возврат предыдущего списания.',
        p5: 'Отмена подписки не влияет на Entry Products, дополнения или отдельные курсы, которые вы приобрели.',
      },
      refunds: {
        title: '4. Возвраты',
        intro:
          'После предоставления доступа покупки, как правило, не подлежат возврату из‑за изменения мнения или планов, неиспользования материалов либо быстрого использования или скачивания — в пределах, допускаемых применимым правом. В частности:',
        entryLabel: 'Entry Products',
        entryDesc: ' не подлежат возврату после предоставления доступа.',
        paidTrialLabel: 'Платные пробные периоды',
        paidTrialDesc:
          ': плата за пробный период (например, US$1) не подлежит возврату после предоставления доступа.',
        subscriptionsLabel: 'Подписки',
        subscriptionsDesc:
          ': уже начавшийся пробный или расчётный период, включая автоматическое продление, не подлежит возврату; частичные или пропорциональные возвраты не предоставляются.',
        upgradesLabel: 'Апгрейды и смена плана',
        upgradesDesc:
          ': суммы, списанные за апгрейд или смену плана, не подлежат возврату после активации нового плана.',
        addOnsLabel: 'Дополнения',
        addOnsDesc: ' не подлежат возврату после предоставления доступа.',
        coursesLabel: 'Отдельные курсы',
        coursesDesc:
          ', приобретённые отдельно, могут быть возвращены по запросу в течение 14 календарных дней с даты оплаты.',
        note1:
          'Изменение цены, промо-периодов, ассортимента контента или временная недоступность отдельных функций (менее 24 часов) не являются основанием для возврата.',
        note2:
          'Этот раздел не отменяет обязательные права потребителей и любую гарантию возврата, прямо предложенную для вашей покупки на момент её совершения.',
      },
      consumerRights: {
        title: '5. Права потребителей и исключения',
        p1: 'Потребители в Соединённом Королевстве и Европейском союзе, как правило, имеют 14-дневное право на отказ от договоров, заключённых на расстоянии. Для цифрового контента это право может быть утрачено после начала поставки, если соблюдены соответствующие правовые требования. Если обязательное право вашей страны даёт право на отказ или пропорциональный возврат, включая сроки «охлаждения» для подписок, мы соблюдаем это право.',
        p2: 'Мы всегда вернём средства или иным образом урегулируем:',
        duplicate: 'дублирующие или ошибочные списания;',
        unauthorised: 'списания, которые вы не авторизовали;',
        technical:
          'платный продукт, к которому вы не смогли получить доступ из‑за подтверждённой технической ошибки с нашей стороны.',
      },
      earlierPurchases: {
        title: '6. Более ранние покупки',
        body: 'Покупки, совершённые до даты настоящей политики, остаются предметом условий возврата, действовавших на момент покупки. Это обновление не ухудшает условия более ранних покупок.',
      },
      howToRequest: {
        title: '7. Как связаться с нами',
        intro:
          'Напишите на support@mindoraacademy.com с адреса электронной почты, использованного при покупке. Пожалуйста, укажите:',
        includeProduct: 'продукт или план;',
        includeDate: 'дату покупки;',
        includeReceipt: 'номер квитанции Stripe (если есть);',
        includeDescription: 'краткое описание запроса.',
        response:
          'Мы рассматриваем запросы в течение пяти рабочих дней; обязательные юридические сроки имеют приоритет. Одобренные возвраты оформляются через Stripe на исходный способ оплаты. Срок поступления средств определяет ваш банк или платёжная система, обычно 5–10 рабочих дней.',
      },
      chargebacks: {
        title: '8. Чарджбэки и платёжные споры',
        body: 'Пожалуйста, свяжитесь с нами до открытия спора с банком. Большинство вопросов по оплате решаются быстрее напрямую с нами. Если подан чарджбэк, мы можем приостановить доступ к связанным продуктам на время рассмотрения спора и предоставить банку сведения о покупке и принятых вами условиях.',
      },
      contact: {
        title: 'Контактные данные',
        intro: 'Вопросы по этой политике? Мы рады помочь.',
        relatedPrefix: 'См. также:',
        relatedSeparator: '·',
        termsLink: 'Условия использования',
        billingLink: 'Оплата и планы',
        privacyLink: 'Политика конфиденциальности',
        contactLink: 'Контакты',
      },
    },
  },
} as const

export function refundPolicyCopy(locale: MarketingLocale) {
  return REFUND_POLICY_COPY[locale]
}
