import type { MarketingLocale } from '@/marketing/data/moneyBack'

export const REFUND_POLICY_COPY = {
  en: {
    pageTitle: '14-Day Money-Back Guarantee — Mindora Academy Refund Policy',
    hero: {
      kicker: 'Legal',
      title: '14-Day Money-Back Guarantee',
      subtitleBefore:
        "We're confident ",
      subtitleAfter:
        " will deliver real results. If it doesn't, we'll give you every penny back — no questions asked.",
      meta: 'Refund Policy · Last updated: 10 July 2026',
      badgeDays: '14',
      badgeDaysLabel: 'Days',
      cardTitleBefore: 'Try ',
      cardTitleAfter: ' completely risk-free',
      cardBody:
        "If you're not happy with your progress in the first 14 days after your full subscription charge or one-time purchase — for any reason — contact us and we'll issue a full refund. No lengthy forms, no interrogation, no hard feelings.",
    },
    sections: {
      plainEnglish: {
        title: 'Our Guarantee in Plain English',
        p1Before:
          'We believe ',
        p1Mid: ' delivers real, measurable change — in how you think, how you work, and how you grow. So we back it with an industry-leading ',
        p1Strong: 'full 14-day money-back guarantee',
        p1After: ' on all paid subscriptions and one-time purchases.',
        p2:
          "If you're not satisfied within your first 14 days of your paid subscription charge or one-time purchase, contact our team and we'll refund you in full. No questions asked. No awkward conversations.",
        p3Before: 'This guarantee ',
        p3Strong: 'exceeds',
        p3After:
          ' the 14-day statutory cooling-off period required by UK law (Consumer Contracts Regulations 2013) — because we believe in our product that much.',
        p4:
          "Refunds for courses are available within 14 calendar days from the date of payment upon the user's request. All subscriptions (including Basic, Plus, Creator, Make, N8N, Full, Pro, access to Zoom sessions, live streams, and Telegram bots) are by default non-refundable, except in the cases described below. The money-back guarantee is an exception under which a refund is possible if all of the following conditions are met simultaneously: (a) the request is submitted within 14 days from the date of purchase and before the end of the subscription period; (b) completion of the program for at least 14 consecutive days + receiving feedback from a curator/trainer; (c) screenshots from the personal account confirming completion of 14 or more lessons.",
      },
      whoApplies: {
        title: 'Who This Applies To',
        p1Before: 'All subscription plans start with a ',
        p1TrialStrong: '3-day trial for $1.00',
        p1Mid: '. The 14-day money-back guarantee applies from the date of your ',
        p1ChargeStrong: 'first full charge',
        p1After:
          ' (i.e. the day your trial converts to a paid subscription at the full price).',
        subscriptionsHeading: 'Subscriptions:',
        monthlyLabel: 'Monthly Plan',
        monthlyDesc:
          '14-day guarantee from the date of your first full charge (after the 3-day $1 trial)',
        quarterlyLabel: 'Quarterly Plan',
        quarterlyDesc:
          '14-day guarantee from the date of your first full charge (after the 3-day $1 trial)',
        annualLabel: 'Annual Plan',
        annualDesc:
          '14-day guarantee from the date of your first full charge (after the 3-day $1 trial)',
        oneTimeHeading: 'One-Time Purchases:',
        oneTimeItemLabel: 'Standalone courses & certifications',
        oneTimeItemDesc: '14-day guarantee from the date of purchase',
        p2Before: 'The $1.00 trial fee is refundable on request — just ask and we\'ll return it. The 14-day guarantee applies ',
        p2OnceStrong: 'once per customer',
        p2After:
          ' on their first subscription. It does not apply to repeat subscriptions (i.e. if you cancel, claim a refund, then resubscribe).',
      },
      howToRequest: {
        title: 'How to Request a Refund',
        intro: 'It takes less than 2 minutes. Just email us:',
        includeLabel: 'Please include:',
        includeName: 'Your name and account email address',
        includeDate: 'The date of your original purchase',
        includeReason: "That's it — no reason required",
        responseBefore: 'We aim to respond within ',
        responseDaysStrong: '1-3 business days',
        responseMid: '. Approved refunds are processed back to your original payment method and typically appear within ',
        responseBankStrong: '5–10 business days',
        responseAfter: ', depending on your bank or card provider.',
      },
      afterWindow: {
        title: 'After the 14-Day Window',
        intro:
          "After 14 days, we no longer offer refunds as standard — but we're always reasonable. We consider requests in genuine exceptional circumstances:",
        technicalLabel: 'Technical failure',
        technicalDesc:
          "If a verified bug or outage prevented you from accessing the platform for an extended period, we'll offer a fair resolution (credit extension or partial refund)",
        duplicateLabel: 'Accidental duplicate charge',
        duplicateDesc: 'Refunded immediately',
        illnessLabel: 'Serious illness or bereavement',
        illnessDesc: 'Reviewed case-by-case with compassion. Please get in touch',
      },
      cancellations: {
        title: 'Cancellations',
        intro: 'Cancelling your subscription is separate from requesting a refund. When you cancel:',
        access: 'Your access continues until the end of your current billing period',
        noCharges: 'No further charges are made after that date',
        noAutoRefund:
          "Cancellation does not automatically trigger a refund — submit a separate refund request if you're within the 14-day window",
        cancelIntro: 'To cancel, tap ',
        profileStrong: 'Profile',
        cancelMid: " in the app's bottom navigation bar, then ",
        cancelSubStrong: 'Cancel Subscription',
        cancelUnder: ' under "My Subscription". You can also email ',
        cancelEnd: '.',
      },
      trial: {
        title: '$1 Trial Period',
        p1Before: 'All subscription plans include a ',
        p1TrialStrong: '3-day trial for $1.00',
        p1Mid:
          '. This gives you full access to the platform at a reduced introductory price. If you do not cancel before day 3, your subscription will automatically convert to a paid plan at the full price and your payment method will be charged. Your ',
        p1GuaranteeStrong: '14-day money-back guarantee begins from that first full charge date',
        p1End: '.',
        p2:
          "If you cancel during the trial, no further charges are made. If you'd also like the $1.00 trial fee returned, just ask and we'll refund it.",
      },
      chargebacks: {
        title: 'Chargebacks & Payment Disputes',
        body:
          'Please contact us before initiating a chargeback. We can almost always resolve billing issues faster and more favourably than a formal bank dispute. If a chargeback is filed, your account will be suspended pending investigation.',
      },
      contact: {
        title: 'Contact Us',
        intro: "Questions about this policy? We're happy to help.",
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
      meta: 'Политика возврата · Последнее обновление: 10 июля 2026',
      badgeDays: '14',
      badgeDaysLabel: 'Дней',
      cardTitleBefore: 'Попробуйте ',
      cardTitleAfter: ' совершенно без риска',
      cardBody:
        'Если в первые 14 дней после полного списания по подписке или разовой покупки вы недовольны своим прогрессом — по любой причине — свяжитесь с нами, и мы оформим полный возврат. Никаких длинных форм, допросов и обид.',
    },
    sections: {
      plainEnglish: {
        title: 'Наша гарантия простыми словами',
        p1Before: 'Мы считаем, что ',
        p1Mid:
          ' даёт реальные, измеримые изменения — в том, как вы думаете, работаете и развиваетесь. Поэтому мы подкрепляем это отраслевой ',
        p1Strong: 'полной 14-дневной гарантией возврата денег',
        p1After: ' на все платные подписки и разовые покупки.',
        p2:
          'Если в первые 14 дней после платного списания по подписке или разовой покупки вы недовольны — свяжитесь с нашей командой, и мы вернём деньги полностью. Без лишних вопросов. Без неловких разговоров.',
        p3Before: 'Эта гарантия ',
        p3Strong: 'превышает',
        p3After:
          ' 14-дневный установленный законом Великобритании срок для отказа от договора (Consumer Contracts Regulations 2013) — потому что мы настолько верим в наш продукт.',
        p4:
          'Возврат за курсы доступен в течение 14 календарных дней с даты оплаты по запросу пользователя. Все подписки (включая Базовый, Плюс, Creator, Make, N8N, Полный, Про, доступ к сессиям Zoom, прямым эфирам и Telegram-ботам) по умолчанию не подлежат возврату, за исключением случаев, описанных ниже. Гарантия возврата денег — исключение, при котором возврат возможен, если одновременно выполняются все следующие условия: (a) запрос подан в течение 14 дней с даты покупки и до окончания периода подписки; (b) прохождение программы не менее 14 последовательных дней + получение обратной связи от куратора/тренера; (c) скриншоты из личного кабинета, подтверждающие прохождение 14 или более уроков.',
      },
      whoApplies: {
        title: 'Кому это применяется',
        p1Before: 'Все планы подписки начинаются с ',
        p1TrialStrong: '3-дневного пробного периода за $1.00',
        p1Mid: '. 14-дневная гарантия возврата денег действует с даты вашего ',
        p1ChargeStrong: 'первого полного списания',
        p1After:
          ' (то есть в день, когда пробный период переходит в платную подписку по полной цене).',
        subscriptionsHeading: 'Подписки:',
        monthlyLabel: 'Месячный план',
        monthlyDesc:
          '14-дневная гарантия с даты первого полного списания (после 3-дневного пробного периода за $1)',
        quarterlyLabel: 'Квартальный план',
        quarterlyDesc:
          '14-дневная гарантия с даты первого полного списания (после 3-дневного пробного периода за $1)',
        annualLabel: 'Годовой план',
        annualDesc:
          '14-дневная гарантия с даты первого полного списания (после 3-дневного пробного периода за $1)',
        oneTimeHeading: 'Разовые покупки:',
        oneTimeItemLabel: 'Отдельные курсы и сертификации',
        oneTimeItemDesc: '14-дневная гарантия с даты покупки',
        p2Before:
          'Плата за пробный период $1.00 возвращается по запросу — просто попросите, и мы вернём её. 14-дневная гарантия применяется ',
        p2OnceStrong: 'один раз на клиента',
        p2After:
          ' при первой подписке. Она не распространяется на повторные подписки (то есть если вы отмените подписку, получите возврат и снова оформите подписку).',
      },
      howToRequest: {
        title: 'Как запросить возврат',
        intro: 'Это занимает меньше 2 минут. Просто напишите нам:',
        includeLabel: 'Пожалуйста, укажите:',
        includeName: 'Ваше имя и email аккаунта',
        includeDate: 'Дату первоначальной покупки',
        includeReason: 'Вот и всё — причину указывать не нужно',
        responseBefore: 'Мы стремимся ответить в течение ',
        responseDaysStrong: '1–3 рабочих дней',
        responseMid:
          '. Одобренные возвраты обрабатываются на исходный способ оплаты и обычно отображаются в течение ',
        responseBankStrong: '5–10 рабочих дней',
        responseAfter: ' — в зависимости от вашего банка или платёжной системы.',
      },
      afterWindow: {
        title: 'После 14-дневного срока',
        intro:
          'После 14 дней мы по умолчанию не предлагаем возвраты — но всегда относимся разумно. Мы рассматриваем запросы в подлинно исключительных обстоятельствах:',
        technicalLabel: 'Технический сбой',
        technicalDesc:
          'Если подтверждённый сбой или простой надолго лишили вас доступа к платформе, мы предложим справедливое решение (продление доступа или частичный возврат)',
        duplicateLabel: 'Случайное двойное списание',
        duplicateDesc: 'Возврат оформляется немедленно',
        illnessLabel: 'Тяжёлая болезнь или утрата близкого',
        illnessDesc: 'Рассматривается индивидуально с пониманием. Пожалуйста, свяжитесь с нами',
      },
      cancellations: {
        title: 'Отмена подписки',
        intro: 'Отмена подписки отделена от запроса возврата. При отмене:',
        access: 'Доступ сохраняется до конца текущего расчётного периода',
        noCharges: 'После этой даты новые списания не производятся',
        noAutoRefund:
          'Отмена автоматически не инициирует возврат — подайте отдельный запрос на возврат, если вы в пределах 14-дневного срока',
        cancelIntro: 'Чтобы отменить, нажмите ',
        profileStrong: 'Профиль',
        cancelMid: ' в нижней панели навигации приложения, затем ',
        cancelSubStrong: 'Отменить подписку',
        cancelUnder: ' в разделе «Моя подписка». Вы также можете написать на ',
        cancelEnd: '.',
      },
      trial: {
        title: 'Пробный период за $1',
        p1Before: 'Все планы подписки включают ',
        p1TrialStrong: '3-дневный пробный период за $1.00',
        p1Mid:
          '. Это даёт полный доступ к платформе по сниженной вводной цене. Если вы не отмените подписку до 3-го дня, подписка автоматически перейдёт на платный план по полной цене, и с вашего способа оплаты будет списана сумма. Ваша ',
        p1GuaranteeStrong:
          '14-дневная гарантия возврата денег начинается с даты первого полного списания',
        p1End: '.',
        p2:
          'Если вы отмените подписку во время пробного периода, дальнейшие списания не производятся. Если вы также хотите вернуть плату за пробный период $1.00 — просто попросите, и мы вернём её.',
      },
      chargebacks: {
        title: 'Чарджбэки и платёжные споры',
        body:
          'Пожалуйста, свяжитесь с нами до инициирования чарджбэка. Почти всегда мы можем решить вопросы с оплатой быстрее и выгоднее, чем формальный банковский спор. Если подан чарджбэк, ваш аккаунт будет приостановлен до завершения расследования.',
      },
      contact: {
        title: 'Связаться с нами',
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
