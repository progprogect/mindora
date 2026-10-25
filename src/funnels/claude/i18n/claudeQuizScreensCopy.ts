import type { ClaudeLocale } from '@/funnels/claude/i18n/locale'
import type { ClaudeQuizScreenDef } from '@/funnels/claude/types/claudeQuiz'

type OptionLabels = Record<string, string>

type ScreenRuOverlay = {
  headline?: string
  subtext?: string
  question?: string
  copy?: string
  ctaLabel?: string
  stat?: string
  quote?: string
  quoteAttribution?: string
  optionLabels?: OptionLabels
  echoHeadline?: Record<string, string>
  echoCopy?: Record<string, string>
}

const RU_OVERLAYS: Record<string, ScreenRuOverlay> = {
  identity: {
    subtext: 'Вы уже пользовались Claude?',
    optionLabels: { yes: 'Да', 'not-yet': 'Ещё нет' },
  },
  'positive-reinforcement': {
    headline: 'Вы впереди — но это только начало',
    copy:
      'Уже стартовать — значит быть впереди 83% людей, но главный разрыв случается дальше. Одни остаются на поверхности, другие углубляются и раскрывают, на что способен AI.',
    ctaLabel: 'ПРОДОЛЖИТЬ →',
    echoHeadline: {
      yes: 'Вы впереди — но это только начало',
      'not-yet': 'Вы как раз вовремя — с этого всё начинается',
    },
    echoCopy: {
      yes:
        'Уже стартовать — значит быть впереди 83% людей, но главный разрыв случается дальше. Одни остаются на поверхности, другие углубляются и раскрывают, на что способен AI.',
      'not-yet':
        'Большинство начинают именно с нуля — без опыта. Некоторые из наших лучших студентов стартовали с нуля. Разница — в том, что вы сделаете дальше.',
    },
  },
  'q1-purpose': {
    question: 'Я хочу изучать Claude для...',
    optionLabels: {
      work: 'Рабочих задач',
      personal: 'Личного использования',
      growth: 'Роста — люблю осваивать востребованные навыки',
    },
  },
  'q2-work-status': {
    question: 'Какой у вас текущий статус занятости?',
    optionLabels: {
      'full-time': 'Работаю по найму полный день',
      freelancer: 'Фрилансер / самозанятый',
      'business-owner': 'Владелец бизнеса',
      'between-jobs': 'Между работами / смена карьеры',
      exploring: 'Изучаю варианты',
    },
  },
  'q3-industry': {
    question: 'В какой сфере вы работаете?',
    optionLabels: {
      tech: 'Технологии и ПО',
      marketing: 'Маркетинг и контент',
      finance: 'Финансы и консалтинг',
      education: 'Образование и исследования',
      legal: 'Право и комплаенс',
      healthcare: 'Здравоохранение',
      other: 'Другое',
    },
  },
  'q4-why-claude': {
    question: 'Почему вас интересует именно Claude?',
    optionLabels: {
      writing: 'Слышал(а), что он лучше для текста и рассуждений',
      documents: 'Лучше справляется с длинными документами',
      company: 'Компания внедряет его',
      unsure: 'Пока не уверен(а) — хочу разобраться',
    },
  },
  'q5-skill': {
    question: 'Как вы оцениваете свои навыки промптинга в AI?',
    optionLabels: {
      beginner: 'Начинающий — пишу простые вопросы',
      intermediate: 'Средний — получаю приемлемые результаты',
      advanced: 'Продвинутый — использую структурированные промпты',
      expert: 'Эксперт — строю сложные рабочие процессы',
    },
  },
  'interstitial-1': {
    headline: 'Большинство используют Claude на 10% его возможностей',
    copy:
      'Разница между базовым пользователем и сертифицированным по Claude — не талант, а техника. Структурированный промптинг, управление контекстом и дизайн процессов — всё это можно освоить.',
    stat: '93% наших выпускников по Claude экономят 5+ часов в неделю уже в первые 14 дней',
    ctaLabel: 'ПРОДОЛЖАТЬ →',
    echoHeadline: {
      beginner: 'Идеально — вы начинаете с чистого листа',
      intermediate: 'Хорошие новости — вы ближе, чем кажется',
    },
    echoCopy: {
      beginner:
        'Начинающие по структурированному пути часто прогрессируют быстрее самоучек с вредными привычками. Вы в идеальной позиции.',
      intermediate:
        'Многие на среднем уровне застревают из‑за отсутствия фреймворков. Несколько ключевых техник дадут кратно лучшие результаты.',
    },
  },
  'q6-frustration': {
    question: 'Что больше всего раздражает при работе с AI?',
    optionLabels: {
      'bad-output': 'Не даёт того, что мне нужно',
      're-prompting': 'Приходится переспрашивать снова и снова',
      'no-use-case': 'Не знаю, как применить это в реальной работе',
      overwhelmed: 'Слишком много функций — теряюсь',
    },
  },
  'q7-use-cases': {
    question: 'Чем вы хотите, чтобы Claude помогал?',
    subtext: 'Выберите то, что важнее всего прямо сейчас',
    optionLabels: {
      writing: 'Писать письма, отчёты и документы',
      analysis: 'Анализировать данные и исследовать',
      brainstorm: 'Генерировать идеи и решать задачи',
      automation: 'Автоматизировать рутину',
      coding: 'Писать или проверять код',
      summarise: 'Суммировать длинные документы',
    },
  },
  'q8-time-wasted': {
    question: 'Сколько времени в неделю вы теряете на задачи, которые мог бы делать Claude?',
    optionLabels: {
      '1-3': '1–3 часа',
      '3-5': '3–5 часов',
      '5-10': '5–10 часов',
      '10-plus': '10+ часов — да, больно',
    },
  },
  'q9-learning': {
    question: 'Как вам удобнее учиться?',
    optionLabels: {
      'bite-sized': 'Короткие уроки, которые можно проходить с телефона',
      examples: 'Реальные примеры, которые можно копировать и адаптировать',
      projects: 'Практические проекты с чёткими шагами',
      video: 'Видео-разборы',
    },
  },
  'q10-career': {
    question: 'Насколько важна AI-грамотность для вашей карьеры сейчас?',
    optionLabels: {
      critical: 'Критично — нужно было ещё вчера',
      very: 'Очень важно — это выделит меня',
      somewhat: 'В некоторой степени — хочу оставаться конкурентным',
      curious: 'Интересно — изучаю варианты',
    },
  },
  'interstitial-2': {
    headline: 'Компании уже ищут «владение Claude»',
    quote:
      '«К 2027 году 70% офисных работников будут ежедневно пользоваться AI-ассистентами. Те, кто освоит их, получат на 40% более высокую зарплату».',
    quoteAttribution: '— Gartner Research, 2026',
    copy:
      'Сертификация Claude AI даёт проверяемое подтверждение и практические навыки, которые активно ищут работодатели.',
    ctaLabel: 'ПРОДОЛЖИТЬ →',
  },
  'certificate-showcase': {
    headline: 'Получите сертификат мастерства Claude AI',
    copy:
      'Не просто учите AI — докажите это. Пройдите план обучения на MindoraAcademy.com, сдайте сертификацию и добавьте официальное подтверждение в резюме и LinkedIn.',
    ctaLabel: 'ПРОДОЛЖИТЬ →',
  },
  'q11-certification': {
    question: 'Помогла бы сертификация Claude AI вашей карьере?',
    optionLabels: {
      'yes-proof': 'Однозначно — хочу подтверждение навыков',
      'yes-cv': 'Да — добавлю в CV/LinkedIn',
      maybe: 'Возможно — зависит от содержания',
      'skills-only': 'Важнее навыки, чем сертификат',
    },
  },
  'q12-blocker': {
    question: 'Что мешает вам освоить Claude прямо сейчас?',
    optionLabels: {
      'no-start': 'Не знаю, с чего начать',
      'no-time': 'Нет часов на обучение',
      scattered: 'Бесплатные ресурсы слишком разрозненны',
      'no-vision': 'Не понимаю, что возможно',
    },
  },
  'q13-previous': {
    question: 'Проходили ли вы курсы по AI раньше?',
    optionLabels: {
      'first-time': 'Нет — это будет первый',
      youtube: 'Смотрел(а) бесплатные ролики на YouTube',
      'paid-unfinished': 'Пробовал(а) платный курс, но не закончил(а)',
      completed: 'Да, завершил(а) — хочу углубиться',
    },
  },
  'q14-time': {
    question: 'Сколько времени вы готовы уделять изучению Claude?',
    subtext: 'Курс рассчитан на плотный график',
    optionLabels: {
      '10min': '10 минут / день',
      '15min': '15 минут / день',
      '20min': '20 минут / день',
      '30min': '30+ минут / день',
    },
  },
  'q15-outcome': {
    question: 'После сертификации что для вас важнее всего?',
    optionLabels: {
      'earn-more': 'Зарабатывать больше с AI-навыками',
      productivity: 'Делать в 10 раз больше за меньшее время',
      credential: 'Иметь подтверждение навыков',
      confidence: 'Чувствовать уверенность и контроль с AI',
    },
  },
  'q16-income': {
    question: 'Сколько дополнительного дохода могут дать навыки Claude?',
    optionLabels: {
      '500': '$500 / месяц',
      '1000-2000': '$1,000 – $2,000 / месяц',
      '3000-5000': '$3,000 – $5,000 / месяц',
      '5000-plus': '$5,000+ / месяц',
      'career-value': 'Важнее карьерная ценность, а не только деньги',
    },
  },
  'interstitial-3': {
    headline: 'Ваш персональный план освоения Claude почти готов',
    copy:
      'По вашим ответам мы строим путь к сертификации под ваш уровень, цели и график. Люди с вашим профилем обычно видят результат уже на первой неделе.',
    ctaLabel: 'СОЗДАТЬ МОЙ ПЛАН →',
  },
  loading: {
    headline: 'Создаём ваш путь к сертификации Claude AI...',
  },
  email: {
    headline: 'Ваш план сертификации Claude AI готов!',
    subtext: 'Введите email, чтобы открыть персональный маршрут — бесплатно, без карты',
    ctaLabel: 'ОТКРЫТЬ МОЙ ПЛАН →',
  },
}

function applyOverlay(screen: ClaudeQuizScreenDef, overlay: ScreenRuOverlay | undefined): ClaudeQuizScreenDef {
  if (!overlay) return screen

  const next = { ...screen } as ClaudeQuizScreenDef

  if (overlay.headline !== undefined && 'headline' in next) next.headline = overlay.headline
  if (overlay.subtext !== undefined && 'subtext' in next) next.subtext = overlay.subtext
  if (overlay.question !== undefined && 'question' in next) next.question = overlay.question
  if (overlay.copy !== undefined && 'copy' in next) next.copy = overlay.copy
  if (overlay.ctaLabel !== undefined && 'ctaLabel' in next) next.ctaLabel = overlay.ctaLabel
  if (overlay.stat !== undefined && 'stat' in next) next.stat = overlay.stat
  if (overlay.quote !== undefined && 'quote' in next) next.quote = overlay.quote
  if (overlay.quoteAttribution !== undefined && 'quoteAttribution' in next) {
    next.quoteAttribution = overlay.quoteAttribution
  }
  if (overlay.echoHeadline !== undefined && 'echoHeadline' in next) next.echoHeadline = overlay.echoHeadline
  if (overlay.echoCopy !== undefined && 'echoCopy' in next) next.echoCopy = overlay.echoCopy

  if (overlay.optionLabels && 'options' in next && Array.isArray(next.options)) {
    next.options = next.options.map((opt) => ({
      ...opt,
      label: overlay.optionLabels![opt.value] ?? opt.label,
    }))
  }

  return next
}

export function localizeClaudeQuizScreens(screens: ClaudeQuizScreenDef[], locale: ClaudeLocale): ClaudeQuizScreenDef[] {
  if (locale === 'en') return screens
  return screens.map((screen) => applyOverlay(screen, RU_OVERLAYS[screen.id]))
}
