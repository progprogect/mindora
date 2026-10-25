import type { MarketingLocale } from '@/marketing/data/moneyBack'

export type FunnelUiCopy = {
  goBack: string
  questionOf: (step: number, total: number) => string
  emailInvalid: string
  emailBonusLead: string
  emailBonusHighlight: string
  emailPrivacy: string
  unlockingPlan: string
  emailConfirmed: string
  termsAgreePrefix: (withWord: boolean) => string
  termsAndConditions: string
  privacyPolicy: string
  subscriptionTerms: string
  merchantLine: string
  saSocialProof: string
  socialJoinedThisWeek: string
  socialRatingDefault: string
  claudeHeroAlt: string
  loadingQuickQuestion: string
  loadingWhereLearn: string
  loadingOptimizePlan: string
  loadingDeviceConfirm: string
  loadingAlmostThere: string
  loadingHonestHint: string
  devicePhone: string
  deviceLaptop: string
  deviceDesktop: string
  deviceMix: string
  commitmentFull: string
  commitmentHigh: string
  commitmentMedium: string
  commitmentTrying: string
  commitmentConfirmFull: string
  commitmentConfirmHigh: string
  commitmentConfirmMedium: string
  commitmentConfirmTrying: string
  offerEnded: string
  offerExpires: string
  refreshForDeal: string
  startForJust: string
  refreshCta: string
  getMyPlan: string
  specialDiscount: string
  chooseYourPlan: string
  getStarted: string
  unlockCheckoutEmail: string
  moneyBackSubtitle: string
  justEnrolled: (handle: string, ago: string) => string
  liveMinutesAgo: string[]
  spinWooHoo: string
  spinTitleLine1: string
  spinTitleHighlight: string
  spinWonDiscount: (name: string | null) => string
  spinPercentOff: string
  spinAppliedAuto: string
  claimDiscount: string
  spinWonCta: string
  spinning: string
  spin: string
  defaultName: string
  spinWheelSubtitle: string
  seePptPlan: string
  seeExcelPlan: string
  continueArrow: string
  continue: string
  excelProfileTitle: string
  excelLevelKicker: string
  pptProfileTitle: string
  pptLevelKicker: string
  assessmentResults: string
  biggestOpportunity: string
  potentialTimeSaved: string
  m365ProfileTitle: string
  builtFromAnswers: string
  outOf100: string
  yourReadiness: string
  readinessExplainer: string
  whereWeStart: string
  weStartWith: (app: string) => string
  m365OpportunityTitle: string
  m365TimeExplainer: string
  legalSocialKicker: string
  legalSocialTitle: (name: string) => string
  legalSocialIntro: string
  statCertificates: string
  statLearners: string
  statCourses: string
  whatNumbersAre: string
  whatNumbersAreBody: string
  whatNumbersNot: string
  whatNumbersNotBody: string
  whyNoQuotes: string
  whyNoQuotesBody: string
  legalSocialClosing: string
  profileTitleSuffix: (name: string) => string
}

const LIVE_MINUTES_EN = [
  '1 min ago',
  '2 min ago',
  '3 min ago',
  '4 min ago',
  '5 min ago',
  '6 min ago',
  '7 min ago',
  '8 min ago',
  '9 min ago',
  '10 min ago',
  '11 min ago',
  '12 min ago',
]

const LIVE_MINUTES_RU = [
  '1 мин. назад',
  '2 мин. назад',
  '3 мин. назад',
  '4 мин. назад',
  '5 мин. назад',
  '6 мин. назад',
  '7 мин. назад',
  '8 мин. назад',
  '9 мин. назад',
  '10 мин. назад',
  '11 мин. назад',
  '12 мин. назад',
]

const EN: FunnelUiCopy = {
  goBack: 'Go back',
  questionOf: (step, total) => `Question ${step} of ${total}`,
  emailInvalid: 'Please enter a valid email address',
  emailBonusLead: 'Make sure your email is valid —',
  emailBonusHighlight: "don't miss your exclusive bonus!",
  emailPrivacy: '🔒 We never share your email. Unsubscribe any time.',
  unlockingPlan: 'Unlocking your plan...',
  emailConfirmed: '✓ Email confirmed',
  termsAgreePrefix: (withWord) => (withWord ? 'By proceeding, you agree with' : 'By proceeding, you agree to the'),
  termsAndConditions: 'Terms and Conditions',
  privacyPolicy: 'Privacy Policy',
  subscriptionTerms: 'Subscription Terms',
  merchantLine: 'Scalion Ltd T/A. MindoraAcademy.com',
  saSocialProof: '100,000+ people already transformed',
  socialJoinedThisWeek: 'Joined this week',
  socialRatingDefault: '4.9 / 5 from 12,400+ learners',
  claudeHeroAlt: 'Claude AI',
  loadingQuickQuestion: 'Quick question',
  loadingWhereLearn: 'Where will you mostly be learning?',
  loadingOptimizePlan: "We'll optimise your plan for it",
  loadingDeviceConfirm: "✓ Perfect — we'll optimise your plan for that!",
  loadingAlmostThere: 'Almost there',
  loadingHonestHint: 'Be honest — your plan adapts to you',
  devicePhone: 'My phone',
  deviceLaptop: 'My laptop',
  deviceDesktop: 'My desktop',
  deviceMix: 'Mix of devices',
  commitmentFull: 'Fully committed',
  commitmentHigh: 'Very committed',
  commitmentMedium: 'Pretty committed',
  commitmentTrying: "I'll try my best",
  commitmentConfirmFull: "🔥 That's the mindset. Your plan is almost ready!",
  commitmentConfirmHigh: '💪 Love that. Your plan is almost ready!',
  commitmentConfirmMedium: '🙂 Every step counts. Your plan is almost ready!',
  commitmentConfirmTrying: "🤞 We've got you. Your plan is almost ready!",
  offerEnded: 'Offer ended',
  offerExpires: 'Offer expires',
  refreshForDeal: '🔄 Refresh for a new deal',
  startForJust: 'Start for Just',
  refreshCta: 'REFRESH →',
  getMyPlan: 'GET MY PLAN →',
  specialDiscount: 'Special Discount:',
  chooseYourPlan: 'Choose your plan',
  getStarted: 'GET STARTED →',
  unlockCheckoutEmail: 'Please enter your email earlier in the quiz to unlock checkout.',
  moneyBackSubtitle: 'Not right for you? Full refund, no questions asked.',
  justEnrolled: (handle, ago) => `${handle} just enrolled · ${ago}`,
  liveMinutesAgo: LIVE_MINUTES_EN,
  spinWooHoo: 'Woo hoo! 🥳',
  spinTitleLine1: 'Spin & Unlock Your',
  spinTitleHighlight: 'Personal Discount!',
  spinWonDiscount: (name) => (name ? `${name}, you won a discount` : 'You won a discount'),
  spinPercentOff: '% off',
  spinAppliedAuto: 'It will be applied automatically',
  claimDiscount: 'CLAIM MY DISCOUNT',
  spinWonCta: 'YOU WON 97% OFF! 🎉',
  spinning: 'SPINNING…',
  spin: 'SPIN',
  defaultName: 'Alex',
  spinWheelSubtitle: "Don't miss your chance to master AI with your personal reward 🎁",
  seePptPlan: 'See My PowerPoint Mastery Plan →',
  seeExcelPlan: 'See My Excel Mastery Plan →',
  continueArrow: 'Continue →',
  continue: 'Continue',
  excelProfileTitle: 'Excel + AI Profile',
  excelLevelKicker: 'Excel level',
  pptProfileTitle: 'PowerPoint + AI Profile',
  pptLevelKicker: 'PowerPoint level',
  assessmentResults: 'Your personalised assessment results',
  biggestOpportunity: 'Your biggest opportunity:',
  potentialTimeSaved: 'Potential time saved',
  m365ProfileTitle: 'Microsoft 365 + AI profile',
  builtFromAnswers: 'Built from the answers you just gave',
  outOf100: 'out of 100',
  yourReadiness: 'Your readiness',
  readinessExplainer: 'How much of this you already have in place, from your five key answers.',
  whereWeStart: '⚡ Where we start you',
  weStartWith: (app) => `📌 We start with ${app}`,
  m365OpportunityTitle: 'Your plan to stop retyping the same work into four apps',
  m365TimeExplainer: 'That is the time going on work you said AI could help with.',
  legalSocialKicker: 'Others like you',
  legalSocialTitle: (name) => `${name}, you are not starting from scratch`,
  legalSocialIntro: 'What other learners have done so far, counted from our own records.',
  statCertificates: 'certificates earned so far',
  statLearners: 'learners have completed lessons',
  statCourses: 'courses included',
  whatNumbersAre: 'WHAT THE NUMBERS ARE',
  whatNumbersAreBody: 'Counted from our own records of learners who have completed lessons and earned certificates.',
  whatNumbersNot: 'WHAT THEY ARE NOT',
  whatNumbersNotBody:
    'They are not a promise about your results, a rate of growth, or a claim that everyone finishes.',
  whyNoQuotes: 'WHY THERE ARE NO QUOTES',
  whyNoQuotesBody: 'We only publish figures we can show you the workings for, so there are no testimonials here.',
  legalSocialClosing:
    'You would be joining 2,205 learners who have completed lessons and 631 certificates earned so far. Your own progress is yours to set — you learn at your own pace, with nothing scheduled.',
  profileTitleSuffix: (name) => `${name}, here's your`,
}

const RU: FunnelUiCopy = {
  goBack: 'Назад',
  questionOf: (step, total) => `Вопрос ${step} из ${total}`,
  emailInvalid: 'Введите корректный адрес электронной почты',
  emailBonusLead: 'Убедитесь, что email верный —',
  emailBonusHighlight: 'не упустите эксклюзивный бонус!',
  emailPrivacy: '🔒 Мы не передаём email третьим лицам. Отписка в любой момент.',
  unlockingPlan: 'Открываем ваш план...',
  emailConfirmed: '✓ Email подтверждён',
  termsAgreePrefix: (withWord) =>
    withWord ? 'Продолжая, вы соглашаетесь с' : 'Продолжая, вы соглашаетесь с',
  termsAndConditions: 'Условиями использования',
  privacyPolicy: 'Политикой конфиденциальности',
  subscriptionTerms: 'Условиями подписки',
  merchantLine: 'Scalion Ltd T/A. MindoraAcademy.com',
  saSocialProof: 'Более 100 000 человек уже изменили жизнь',
  socialJoinedThisWeek: 'Присоединились на этой неделе',
  socialRatingDefault: '4,9 / 5 от более 12 400 учеников',
  claudeHeroAlt: 'Claude AI',
  loadingQuickQuestion: 'Быстрый вопрос',
  loadingWhereLearn: 'Где вы чаще всего будете учиться?',
  loadingOptimizePlan: 'Мы оптимизируем план под это',
  loadingDeviceConfirm: '✓ Отлично — мы оптимизируем план под это!',
  loadingAlmostThere: 'Почти готово',
  loadingHonestHint: 'Отвечайте честно — план подстроится под вас',
  devicePhone: 'Телефон',
  deviceLaptop: 'Ноутбук',
  deviceDesktop: 'Настольный ПК',
  deviceMix: 'Разные устройства',
  commitmentFull: 'Полная отдача',
  commitmentHigh: 'Очень мотивирован(а)',
  commitmentMedium: 'Достаточно мотивирован(а)',
  commitmentTrying: 'Постараюсь изо всех сил',
  commitmentConfirmFull: '🔥 Отличный настрой. Ваш план почти готов!',
  commitmentConfirmHigh: '💪 Супер. Ваш план почти готов!',
  commitmentConfirmMedium: '🙂 Каждый шаг важен. Ваш план почти готов!',
  commitmentConfirmTrying: '🤞 Мы поможем. Ваш план почти готов!',
  offerEnded: 'Предложение завершено',
  offerExpires: 'Предложение истекает',
  refreshForDeal: '🔄 Обновите для нового предложения',
  startForJust: 'Начните всего за',
  refreshCta: 'ОБНОВИТЬ →',
  getMyPlan: 'МОЙ ПЛАН →',
  specialDiscount: 'Специальная скидка:',
  chooseYourPlan: 'Выберите тариф',
  getStarted: 'НАЧАТЬ →',
  unlockCheckoutEmail: 'Укажите email в квизе раньше, чтобы открыть оплату.',
  moneyBackSubtitle: 'Не подошло? Полный возврат без вопросов.',
  justEnrolled: (handle, ago) => `${handle} только что оформил(а) подписку · ${ago}`,
  liveMinutesAgo: LIVE_MINUTES_RU,
  spinWooHoo: 'Ура! 🥳',
  spinTitleLine1: 'Крутите и откройте',
  spinTitleHighlight: 'личную скидку!',
  spinWonDiscount: (name) => (name ? `${name}, вы выиграли скидку` : 'Вы выиграли скидку'),
  spinPercentOff: '% скидка',
  spinAppliedAuto: 'Скидка применится автоматически',
  claimDiscount: 'ЗАБРАТЬ СКИДКУ',
  spinWonCta: 'ВЫ ВЫИГРАЛИ 97% СКИДКИ! 🎉',
  spinning: 'КРУТИМ…',
  spin: 'КРУТИТЬ',
  defaultName: 'Алекс',
  spinWheelSubtitle: 'Не упустите шанс освоить AI с личной наградой 🎁',
  seePptPlan: 'Мой план PowerPoint →',
  seeExcelPlan: 'Мой план Excel →',
  continueArrow: 'Продолжить →',
  continue: 'Продолжить',
  excelProfileTitle: 'Профиль Excel + AI',
  excelLevelKicker: 'Уровень Excel',
  pptProfileTitle: 'Профиль PowerPoint + AI',
  pptLevelKicker: 'Уровень PowerPoint',
  assessmentResults: 'Результаты персональной оценки',
  biggestOpportunity: 'Ваша главная возможность:',
  potentialTimeSaved: 'Потенциальная экономия времени',
  m365ProfileTitle: 'Профиль Microsoft 365 + AI',
  builtFromAnswers: 'На основе ваших ответов',
  outOf100: 'из 100',
  yourReadiness: 'Ваша готовность',
  readinessExplainer: 'Насколько это уже внедрено у вас — по пяти ключевым ответам.',
  whereWeStart: '⚡ С чего начнём',
  weStartWith: (app) => `📌 Начинаем с ${app}`,
  m365OpportunityTitle: 'План, чтобы перестать дублировать одну работу в четырёх приложениях',
  m365TimeExplainer: 'Это время уходит на задачи, где AI может помочь — по вашим ответам.',
  legalSocialKicker: 'Такие же, как вы',
  legalSocialTitle: (name) => `${name}, вы не начинаете с нуля`,
  legalSocialIntro: 'Что уже сделали другие ученики — по нашим данным.',
  statCertificates: 'сертификатов выдано',
  statLearners: 'учеников завершили уроки',
  statCourses: 'курсов в программе',
  whatNumbersAre: 'ЧТО ОЗНАЧАЮТ ЦИФРЫ',
  whatNumbersAreBody: 'Подсчитано по нашим записям об учениках, завершивших уроки и получивших сертификаты.',
  whatNumbersNot: 'ЧЕМ ОНИ НЕ ЯВЛЯЮТСЯ',
  whatNumbersNotBody:
    'Это не обещание ваших результатов, не темп роста и не утверждение, что все доходят до конца.',
  whyNoQuotes: 'ПОЧЕМУ НЕТ ОТЗЫВОВ',
  whyNoQuotesBody: 'Мы публикуем только цифры, которые можем обосновать, поэтому здесь нет цитат.',
  legalSocialClosing:
    'Вы присоединитесь к 2 205 ученикам, завершившим уроки, и 631 выданному сертификату. Темп обучения вы задаёте сами — без расписания.',
  profileTitleSuffix: (name) => `${name}, ваш`,
}

export function funnelUiCopy(locale: MarketingLocale): FunnelUiCopy {
  return locale === 'ru' ? RU : EN
}

export function loadingDeviceOptions(locale: MarketingLocale) {
  const ui = funnelUiCopy(locale)
  return [
    { id: 'phone', label: ui.devicePhone, emoji: '📱' },
    { id: 'laptop', label: ui.deviceLaptop, emoji: '💻' },
    { id: 'desktop', label: ui.deviceDesktop, emoji: '🖥️' },
    { id: 'mix', label: ui.deviceMix, emoji: '📱💻' },
  ]
}

export function loadingCommitmentOptions(locale: MarketingLocale) {
  const ui = funnelUiCopy(locale)
  return [
    { id: 'full', label: ui.commitmentFull, emoji: '🏆' },
    { id: 'high', label: ui.commitmentHigh, emoji: '💪' },
    { id: 'medium', label: ui.commitmentMedium, emoji: '🙂' },
    { id: 'trying', label: ui.commitmentTrying, emoji: '🤞' },
  ]
}

export function commitmentConfirmMessage(locale: MarketingLocale, id: string): string {
  const ui = funnelUiCopy(locale)
  const map: Record<string, string> = {
    full: ui.commitmentConfirmFull,
    high: ui.commitmentConfirmHigh,
    medium: ui.commitmentConfirmMedium,
    trying: ui.commitmentConfirmTrying,
  }
  return map[id] ?? ui.commitmentConfirmTrying
}
