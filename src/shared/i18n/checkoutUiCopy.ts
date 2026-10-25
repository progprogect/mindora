import type { MarketingLocale } from '@/marketing/data/moneyBack'

export type CheckoutUiCopy = {
  emailRequired: string
  emailInvalid: string
  invalidPlan: string
  planParamRequired: string
  paymentSuccessful: string
  trialActive: string
  redirectHint: string
  continueNow: string
  joinHeadlinePrefix: string
  joinHeadlineHighlight: string
  joinHeadlineTo: string
  joinHeadlineSuffix: string
  professionalCertsTitle: string
  professionalCertsBlurb: string
  completionCertTitle: string
  completionCertBlurb: string
  safeCheckout: string
  professionalCertificates: string
  certificateOfCompletion: string
  free: string
  threeDayTrial: string
  dueToday: string
  dueTodayLower: string
  thenAfterTrial: (planPrice: string, periodLabel: string, monthlyExtra: string | null) => string
  emailAddress: string
  emailPlaceholder: string
  continueToPayment: string
  continueToPaymentLower: string
  confirmPayment: string
  confirmPaymentDefault: string
  encrypted256: string
  cancelAnyTime: string
  legalTrial: (planPrice: string, periodLabel: string, moneyBackChip: string) => string
  pageTitle: string
  funnelJoinTitle: string
  promoApplied: string
  youSavePercent: (percent: number) => string
  included: string
  riskFreeIncluded: (chip: string) => string
  receiptBlurb: string
  terms: string
  privacy: string
  refunds: string
  subscriptionTerms: string
  somethingWrong: string
  retry: string
  checkInbox: string
  sentCodeTo: string
  codePlaceholder: string
  didntReceive: string
  sendAgain: string
  verifying: string
  continue: string
  setupTitle: string
  setupBlurb: string
  emailWarning: string
  sending: string
  verifyCodeError: string
  codeHint: string
  paySafeSecure: string
  cardsAcceptedAlt: string
  securePayment: string
  instantAccess: string
  cancelAnytime: string
  planReadyBanner: string
  promoCodeApplied: string
  youSaveToday: (percent: number) => string
  off: string
  totalDue: string
  trialChargeBlurb: string
  orPayWithCard: string
  cardNumber: string
  expiryDate: string
  securityCode: string
  processing: string
  loadingPaymentForm: string
  cardFormNotFound: string
  authRequired: string
  paymentNotCompleted: string
  paymentFailedGeneric: string
  stripeErrorSuffix: string
  scalionTerms: string
  paymentUnavailable: string
  paymentUnavailableBlurb: string
  alreadyMemberTitle: string
  alreadyMemberBlurb: string
  logIn: string
  continueToAccount: string
  couldNotStartCheckout: string
  pricePerMonth: string
}

const EN: CheckoutUiCopy = {
  emailRequired: 'Please enter your email address.',
  emailInvalid: 'Please enter a valid email address.',
  invalidPlan: 'Invalid plan. Please go back and try again.',
  planParamRequired: 'This checkout link is missing a plan. Please go back and try again.',
  paymentSuccessful: 'Payment successful!',
  trialActive: 'Your 3-day trial is now active. Setting up your account…',
  redirectHint: "You'll be redirected automatically in a moment.",
  continueNow: 'Continue now',
  joinHeadlinePrefix: 'Join ',
  joinHeadlineHighlight: '100,000+ users',
  joinHeadlineTo: ' to',
  joinHeadlineSuffix: 'achieve your goals',
  professionalCertsTitle: 'Professional Certificates Included',
  professionalCertsBlurb:
    'Earn 30+ certifications, share them on LinkedIn and add them to your resume.',
  completionCertTitle: 'Certificate of Completion Included',
  completionCertBlurb:
    'Earn your 28-Day AI Challenge certificate, share it on LinkedIn and add it to your resume.',
  safeCheckout: 'Safe checkout',
  professionalCertificates: 'Professional Certificates',
  certificateOfCompletion: 'Certificate of Completion',
  free: 'FREE',
  threeDayTrial: '3-Day Trial',
  dueToday: 'Due Today',
  dueTodayLower: 'Due today',
  thenAfterTrial: (planPrice, periodLabel, monthlyExtra) =>
    `Then ${planPrice} ${periodLabel} after your 3-day trial.${monthlyExtra ?? ''} Cancel any time.`,
  emailAddress: 'Email address',
  emailPlaceholder: 'you@email.com',
  continueToPayment: 'Continue to Payment',
  continueToPaymentLower: 'Continue to payment',
  confirmPayment: 'Confirm Payment',
  confirmPaymentDefault: 'CONFIRM PAYMENT — $1.00',
  encrypted256: '🔒 256-bit encrypted',
  cancelAnyTime: '✓ Cancel any time',
  legalTrial: (planPrice, periodLabel, moneyBackChip) =>
    `By proceeding, you agree to pay $1.00 today for a 3-day trial. After your 3-day trial, you'll be charged ${planPrice} ${periodLabel} until you cancel. You can cancel at any time from your account settings. ${moneyBackChip}.`,
  pageTitle: 'MindoraAcademy.com — Turn Daily Learning Into Daily Progress',
  funnelJoinTitle: 'Join the challenge and start today',
  promoApplied: 'Promo Code TRIAL1 Applied',
  youSavePercent: (percent) => `You save ${percent}% today`,
  included: 'Included',
  riskFreeIncluded: (chip) => `Risk-free ${chip} included.`,
  receiptBlurb: 'We use this to send your receipt and set up your account.',
  terms: 'Terms',
  privacy: 'Privacy',
  refunds: 'Refunds',
  subscriptionTerms: 'Subscription terms',
  somethingWrong: 'Something went wrong',
  retry: 'Retry',
  checkInbox: 'Check your inbox',
  sentCodeTo: 'We sent a 6-digit code to',
  codePlaceholder: '000000',
  didntReceive: "Didn't receive it?",
  sendAgain: 'Send again',
  verifying: 'Verifying…',
  continue: 'Continue',
  setupTitle: "You're in! Set up your account",
  setupBlurb:
    "Enter the email you'd like to use for your account. We'll send a quick verification code.",
  emailWarning:
    "⚠️ All login codes and course access emails will be sent to this address. Make sure it's an email you can access.",
  sending: 'Sending…',
  verifyCodeError: 'Invalid or expired code. Please try again.',
  codeHint: "We'll send a 6-digit code to verify your email. No password needed.",
  paySafeSecure: 'Pay safe & secure',
  cardsAcceptedAlt: 'Mastercard, Visa, Amex, Discover accepted',
  securePayment: 'Secure payment',
  instantAccess: 'Instant access',
  cancelAnytime: 'Cancel anytime',
  planReadyBanner: '⚡ Your Plan is Ready — Start Under 30 Seconds',
  promoCodeApplied: 'Promo Code TRIAL1 Applied',
  youSaveToday: (percent) => `You save ${percent}% today`,
  off: 'OFF',
  totalDue: 'Total due:',
  trialChargeBlurb:
    "Start today for just $1. After a 3-day trial, we'll charge $29.99/month until you cancel. Cancel at any time via your MindoraAcademy dashboard or by contacting support.",
  orPayWithCard: 'or pay with card',
  cardNumber: 'Card number',
  expiryDate: 'Expiry date',
  securityCode: 'Security code',
  processing: 'Processing...',
  loadingPaymentForm: 'Loading payment form...',
  cardFormNotFound: 'Card form not found. Please refresh and try again.',
  authRequired:
    'Your bank requires additional verification. Please try again — you may see a pop-up from your bank to confirm the payment.',
  paymentNotCompleted: 'Payment could not be completed. Please try again or use a different payment method.',
  paymentFailedGeneric:
    "Payment didn't go through. Please try a different card or contact your bank and try again.",
  stripeErrorSuffix: ' Please try again or use a different payment method.',
  scalionTerms:
    'By providing your card information, you allow Scalion Ltd to charge your card for future payments in accordance with their terms.',
  paymentUnavailable: 'Payment unavailable',
  paymentUnavailableBlurb: 'Card checkout is not configured on this environment.',
  alreadyMemberTitle: 'You already have a membership',
  alreadyMemberBlurb:
    'This email is already on a Mindora Academy plan. Log in to continue — no extra payment needed.',
  logIn: 'Log in',
  continueToAccount: 'Continue to your account',
  couldNotStartCheckout: 'Could not start checkout.',
  pricePerMonth: '/mo',
}

const RU: CheckoutUiCopy = {
  emailRequired: 'Введите адрес электронной почты.',
  emailInvalid: 'Введите корректный адрес электронной почты.',
  invalidPlan: 'Неверный тариф. Вернитесь назад и попробуйте снова.',
  planParamRequired: 'В ссылке на оплату не указан тариф. Вернитесь назад и попробуйте снова.',
  paymentSuccessful: 'Оплата прошла успешно!',
  trialActive: 'Ваш 3-дневный пробный период активирован. Настраиваем аккаунт…',
  redirectHint: 'Через мгновение вы будете перенаправлены автоматически.',
  continueNow: 'Продолжить сейчас',
  joinHeadlinePrefix: 'Присоединяйтесь к ',
  joinHeadlineHighlight: '100 000+ пользователям',
  joinHeadlineTo: ', чтобы',
  joinHeadlineSuffix: 'достигать целей',
  professionalCertsTitle: 'Профессиональные сертификаты включены',
  professionalCertsBlurb:
    'Получите более 30 сертификатов, добавьте их в LinkedIn и резюме.',
  completionCertTitle: 'Сертификат об окончании включён',
  completionCertBlurb:
    'Получите сертификат 28-дневного ИИ-челленджа, добавьте его в LinkedIn и резюме.',
  safeCheckout: 'Безопасная оплата',
  professionalCertificates: 'Профессиональные сертификаты',
  certificateOfCompletion: 'Сертификат об окончании',
  free: 'БЕСПЛАТНО',
  threeDayTrial: '3-дневный пробный период',
  dueToday: 'К оплате сегодня',
  dueTodayLower: 'К оплате сегодня',
  thenAfterTrial: (planPrice, periodLabel, monthlyExtra) =>
    `Затем ${planPrice} ${periodLabel} после 3-дневного пробного периода.${monthlyExtra ?? ''} Отменить можно в любой момент.`,
  emailAddress: 'Электронная почта',
  emailPlaceholder: 'you@email.com',
  continueToPayment: 'Перейти к оплате',
  continueToPaymentLower: 'Перейти к оплате',
  confirmPayment: 'Подтвердить оплату',
  confirmPaymentDefault: 'ПОДТВЕРДИТЬ ОПЛАТУ — $1.00',
  encrypted256: '🔒 Шифрование 256-bit',
  cancelAnyTime: '✓ Отмена в любой момент',
  legalTrial: (planPrice, periodLabel, moneyBackChip) =>
    `Продолжая, вы соглашаетесь оплатить $1.00 сегодня за 3-дневный пробный период. После пробного периода с вас будет списываться ${planPrice} ${periodLabel}, пока вы не отмените подписку. Отменить можно в любой момент в настройках аккаунта. ${moneyBackChip}.`,
  pageTitle: 'MindoraAcademy.com — Превратите ежедневное обучение в ежедневный прогресс',
  funnelJoinTitle: 'Присоединяйтесь к челленджу и начните сегодня',
  promoApplied: 'Промокод TRIAL1 применён',
  youSavePercent: (percent) => `Вы экономите ${percent}% сегодня`,
  included: 'Включено',
  riskFreeIncluded: (chip) => `Без риска: ${chip} включена.`,
  receiptBlurb: 'Мы используем его для чека и настройки аккаунта.',
  terms: 'Условия',
  privacy: 'Конфиденциальность',
  refunds: 'Возвраты',
  subscriptionTerms: 'Условия подписки',
  somethingWrong: 'Что-то пошло не так',
  retry: 'Повторить',
  checkInbox: 'Проверьте почту',
  sentCodeTo: 'Мы отправили 6-значный код на',
  codePlaceholder: '000000',
  didntReceive: 'Не получили?',
  sendAgain: 'Отправить снова',
  verifying: 'Проверяем…',
  continue: 'Продолжить',
  setupTitle: 'Вы внутри! Настройте аккаунт',
  setupBlurb: 'Укажите email для аккаунта. Мы отправим короткий код подтверждения.',
  emailWarning:
    '⚠️ Все коды входа и письма о доступе к курсам будут приходить на этот адрес. Убедитесь, что у вас есть доступ к почте.',
  sending: 'Отправляем…',
  verifyCodeError: 'Неверный или просроченный код. Попробуйте снова.',
  codeHint: 'Мы отправим 6-значный код для подтверждения email. Пароль не нужен.',
  paySafeSecure: 'Безопасная оплата',
  cardsAcceptedAlt: 'Принимаются Mastercard, Visa, Amex, Discover',
  securePayment: 'Защищённая оплата',
  instantAccess: 'Мгновенный доступ',
  cancelAnytime: 'Отмена в любой момент',
  planReadyBanner: '⚡ Ваш план готов — старт менее чем за 30 секунд',
  promoCodeApplied: 'Промокод TRIAL1 применён',
  youSaveToday: (percent) => `Вы экономите ${percent}% сегодня`,
  off: 'СКИДКА',
  totalDue: 'К оплате:',
  trialChargeBlurb:
    'Начните сегодня всего за $1. После 3-дневного пробного периода списание $29.99/мес., пока вы не отмените. Отмена в любой момент в личном кабинете MindoraAcademy или через поддержку.',
  orPayWithCard: 'или оплатить картой',
  cardNumber: 'Номер карты',
  expiryDate: 'Срок действия',
  securityCode: 'Код безопасности',
  processing: 'Обработка...',
  loadingPaymentForm: 'Загрузка формы оплаты...',
  cardFormNotFound: 'Форма карты не найдена. Обновите страницу и попробуйте снова.',
  authRequired:
    'Банку нужна дополнительная проверка. Попробуйте снова — может появиться окно от банка для подтверждения оплаты.',
  paymentNotCompleted: 'Оплату не удалось завершить. Попробуйте снова или используйте другой способ оплаты.',
  paymentFailedGeneric:
    'Оплата не прошла. Попробуйте другую карту или свяжитесь с банком и повторите попытку.',
  stripeErrorSuffix: ' Попробуйте снова или используйте другой способ оплаты.',
  scalionTerms:
    'Указывая данные карты, вы разрешаете Scalion Ltd списывать платежи в будущем в соответствии с их условиями.',
  paymentUnavailable: 'Оплата недоступна',
  paymentUnavailableBlurb: 'Оплата картой не настроена в этой среде.',
  alreadyMemberTitle: 'У вас уже есть подписка',
  alreadyMemberBlurb:
    'Этот email уже привязан к плану Mindora Academy. Войдите, чтобы продолжить — дополнительная оплата не нужна.',
  logIn: 'Войти',
  continueToAccount: 'Перейти в аккаунт',
  couldNotStartCheckout: 'Не удалось начать оплату.',
  pricePerMonth: '/мес',
}

export function checkoutUiCopy(locale: MarketingLocale): CheckoutUiCopy {
  return locale === 'ru' ? RU : EN
}

const DECLINE_EN: Record<string, string> = {
  card_declined: 'Your card was declined. Try another card or contact your bank.',
  expired_card: 'This card has expired. Please use a different card.',
  incorrect_cvc: 'The CVC code is incorrect. Please check and try again.',
  incorrect_number: 'The card number is incorrect. Please check and try again.',
  insufficient_funds: 'This card has insufficient funds. Try another card.',
  processing_error: 'We could not process this payment. Please try again.',
  generic_decline: 'Your card was declined. Try another card or contact your bank.',
  authentication_required:
    'Your bank requires additional verification. Please try again — you may see a pop-up from your bank.',
}

const DECLINE_RU: Record<string, string> = {
  card_declined: 'Карта отклонена. Попробуйте другую карту или свяжитесь с банком.',
  expired_card: 'Срок действия карты истёк. Используйте другую карту.',
  incorrect_cvc: 'Неверный CVC. Проверьте и попробуйте снова.',
  incorrect_number: 'Неверный номер карты. Проверьте и попробуйте снова.',
  insufficient_funds: 'Недостаточно средств. Попробуйте другую карту.',
  processing_error: 'Не удалось обработать платёж. Попробуйте снова.',
  generic_decline: 'Карта отклонена. Попробуйте другую карту или свяжитесь с банком.',
  authentication_required:
    'Банку нужна дополнительная проверка. Попробуйте снова — может появиться окно от банка.',
}

export function stripeDeclineMessage(locale: MarketingLocale, code: string | undefined): string | undefined {
  if (!code) return undefined
  const table = locale === 'ru' ? DECLINE_RU : DECLINE_EN
  return table[code]
}

const FUNNEL_LINE_ITEMS_EN = [
  { label: '3-Day Trial', value: '$1', emphasis: 'dark' as const },
  { label: 'Full 28-day AI Challenge', value: 'Included', emphasis: 'success' as const },
  { label: 'All courses + 45 certificates', value: 'Included', emphasis: 'success' as const },
  { label: 'Mindora, your AI coach', value: 'Included', emphasis: 'success' as const },
]

const FUNNEL_LINE_ITEMS_RU = [
  { label: '3-дневный пробный период', value: '$1', emphasis: 'dark' as const },
  { label: 'Полный 28-дневный ИИ-челлендж', value: 'Включено', emphasis: 'success' as const },
  { label: 'Все курсы + 45 сертификатов', value: 'Включено', emphasis: 'success' as const },
  { label: 'Mindora, ваш AI-коуч', value: 'Включено', emphasis: 'success' as const },
]

export function funnelCheckoutLineItems(locale: MarketingLocale) {
  return locale === 'ru' ? FUNNEL_LINE_ITEMS_RU : FUNNEL_LINE_ITEMS_EN
}

export function funnelCheckoutTrialNote(locale: MarketingLocale): string {
  return locale === 'ru'
    ? 'Затем $29.99 в месяц после 3-дневного пробного периода. Отменить можно в профиле.'
    : 'Then $29.99 per month after your 3-day trial. Cancel any time from your profile page.'
}
