import type { TrialPlanCopy } from '@/funnels/shared/components/TrialPlanScreen'
import type { MarketingLocale } from '@/marketing/data/moneyBack'

export const MASTER_TICKER = [
  'alex.t***',
  'maria.s***',
  'daniel.r***',
  'jenny.w***',
  'sam.k***',
  'laura.c***',
  'mike.b***',
  'priya.n***',
  'chris.d***',
  'helen.m***',
  'omar.j***',
  'nicole.f***',
]

export const PPT_BENEFITS = {
  kicker: 'What changes',
  title: (name: string) => `${name}, what you will be able to do`,
  intro: 'The specific things you will be able to do with AI once you stop starting from a blank slide.',
  bullets: [
    {
      title: 'Never start from a blank slide',
      body: 'Give AI your goal and audience, and get a working outline you can argue with before you touch a single layout.',
    },
    {
      title: 'Lead with the argument, not the design',
      body: 'Settle what the deck is actually saying first. Design gets quick once the point is clear.',
    },
    {
      title: 'Turn long documents into slides',
      body: 'Condense a report into a deck without losing the caveats that made the finding true.',
    },
    {
      title: 'Build charts that hold up',
      body: 'Pick the right chart, label it honestly, and keep a source you can point at when someone asks.',
    },
    {
      title: 'Rehearse with a sceptic',
      body: 'Ask AI to attack your argument and find the holes before your audience does.',
    },
    {
      title: 'Reuse what works',
      body: 'Save the prompts that produced your best deck so the next one starts halfway done.',
    },
  ],
  footer:
    'Self-paced lessons you work through in your own time. This is a Certificate of Completion, not an accredited qualification.',
}

export const PPT_BEFORE_AFTER = {
  kicker: 'Before / after',
  title: (name: string) => `${name}, your slides, before and after`,
  intro: 'A side-by-side of how the same deck looks once the argument comes first and AI does the heavy lifting.',
  rows: [
    { label: 'Starting point', before: 'A blank slide and a deadline.', after: 'A brief, then an outline you can argue with before any design.' },
    { label: 'The point', before: "Nobody can say what the deck is actually arguing.", after: 'One clear claim, and every slide earns its place under it.' },
    { label: 'The slides', before: 'Walls of bullets, read out loud.', after: 'One idea per slide, so you talk and the slide supports you.' },
    { label: 'The long report', before: 'Copy, paste, hope the caveats came along.', after: 'Condensed on purpose, with what was left out written down.' },
    { label: 'The numbers', before: 'A chart that looks convincing and cannot be checked.', after: 'The right chart, labelled honestly, with a source you can point at.' },
    { label: 'The questions', before: 'Ambushed by the one question you had not thought about.', after: 'Already asked it yourself, because you rehearsed against a sceptic.' },
  ],
  footer: 'The AI does the drafting. You stay responsible for the argument and for checking anything it claims is a fact.',
}

export const M365_BENEFITS = {
  kicker: 'What changes',
  title: (name: string) => `${name}, what you will be able to do`,
  intro:
    'The specific things you will be able to do across Word, Excel, PowerPoint, Outlook and Teams once AI is doing the drafting.',
  bullets: [
    {
      title: 'Brief AI the way you would brief a colleague',
      body: 'Say what you want, for whom, in what form, and with what it must not do. Vague asks are what waste your time.',
    },
    {
      title: 'Draft and reshape documents in Word',
      body: 'Settle the argument and the outline first, then change the audience, length or tone without changing what is true.',
    },
    {
      title: 'Get through a long document fast',
      body: 'What it says, what it asks of you, and what it quietly leaves out — checked back against the page that said it.',
    },
    {
      title: 'Turn a spreadsheet into one honest slide',
      body: 'Work out what a workbook really contains, find the finding, and put it on a slide with a chart you can defend.',
    },
    {
      title: 'Cut the inbox without dropping anything',
      body: 'Triage by what the sender actually wants, and summarise a long thread into decisions, open questions and what you owe.',
    },
    {
      title: 'Walk into meetings prepared, leave with actions',
      body: 'Turn scattered material into a brief with your own position in it, then capture the decisions and who owns what.',
    },
  ],
  footer:
    'You do not need a paid Copilot licence — the course includes a setup that costs nothing. Self-paced lessons you work through in your own time, and a Certificate of Completion, not an accredited qualification.',
}

export const M365_BEFORE_AFTER = {
  kicker: 'Before / after',
  title: (name: string) => `${name}, your working week, before and after`,
  intro: 'The same week, side by side — faster to produce, and safer, because you keep the decisions and the checks.',
  rows: [
    { label: 'The ask', before: 'A vague prompt, then three more tries to fix the answer.', after: 'One brief that says the outcome, the audience, the form and the limits.' },
    { label: 'The long document', before: 'Skim it, hope you did not miss the part that mattered.', after: 'What it says, what it asks of you, and what it left out — checked against the page.' },
    { label: 'The numbers', before: 'A figure copied between files until nobody can trace it.', after: 'Every figure recalculated in the workbook and traceable back to the source.' },
    { label: 'The thread', before: 'Forty replies and no idea what you personally owe.', after: 'Decisions, open questions and your own actions — each checked back against the message.' },
    { label: 'The reply', before: 'A polite draft sent quickly that agrees to more than you meant.', after: 'Drafted fast, then read for what it commits you to before it goes.' },
    { label: 'The meeting', before: 'Turning up cold, and losing the actions the moment it ends.', after: 'A brief with your own position in it, and every action confirmed with its owner.' },
  ],
  footer: 'The AI does the drafting. You stay responsible for the decisions, and for checking anything it states as a fact.',
}

export const PPT_BENEFITS_RU = {
  kicker: 'Что изменится',
  title: (name: string) => `${name}, что вы сможете делать`,
  intro:
    'Конкретные вещи, которые вы сможете делать с ИИ, когда перестанете начинать с пустого слайда.',
  bullets: [
    {
      title: 'Больше не начинать с пустого слайда',
      body: 'Опишите ИИ цель и аудиторию — получите рабочий план, с которым можно спорить, ещё до вёрстки.',
    },
    {
      title: 'Сначала аргумент, потом дизайн',
      body: 'Сначала ясно, что говорит дека. Дизайн ускоряется, когда мысль понятна.',
    },
    {
      title: 'Длинные документы в слайды',
      body: 'Сожмите отчёт в презентацию, не потеряв оговорки, из‑за которых вывод был верным.',
    },
    {
      title: 'Графики, которые выдерживают проверку',
      body: 'Выберите нужный график, подпишите честно и сохраните источник на случай вопросов.',
    },
    {
      title: 'Репетиция со скептиком',
      body: 'Попросите ИИ атаковать аргумент и найти дыры до того, как это сделает аудитория.',
    },
    {
      title: 'Повторное использование удачного',
      body: 'Сохраните промпты лучших дек — следующая начнётся уже наполовину готовой.',
    },
  ],
  footer:
    'Уроки в своём темпе. Это сертификат о прохождении, а не аккредитованная квалификация.',
}

export const PPT_BEFORE_AFTER_RU = {
  kicker: 'До / после',
  title: (name: string) => `${name}, ваши слайды: до и после`,
  intro:
    'Одна и та же презентация — когда сначала аргумент, а ИИ делает тяжёлую работу.',
  rows: [
    {
      label: 'С чего начинаете',
      before: 'Пустой слайд и дедлайн.',
      after: 'Бриф, затем план, с которым можно спорить до дизайна.',
    },
    {
      label: 'Смысл',
      before: 'Никто не может сказать, что дека на самом деле доказывает.',
      after: 'Один ясный тезис, и каждый слайд на своём месте.',
    },
    {
      label: 'Слайды',
      before: 'Стены буллетов, которые читают вслух.',
      after: 'Одна идея на слайд — вы говорите, слайд поддерживает.',
    },
    {
      label: 'Длинный отчёт',
      before: 'Копировать, вставить, надеяться, что оговорки переехали.',
      after: 'Сжато осознанно, с записью того, что убрали.',
    },
    {
      label: 'Цифры',
      before: 'График выглядит убедительно, но его нельзя проверить.',
      after: 'Нужный график, честные подписи, источник под рукой.',
    },
    {
      label: 'Вопросы',
      before: 'Застали вопросом, о котором не подумали.',
      after: 'Уже задали его сами — репетировали со скептиком.',
    },
  ],
  footer:
    'ИИ чертит черновик. Вы отвечаете за аргумент и проверку любых фактов.',
}

export const M365_BENEFITS_RU = {
  kicker: 'Что изменится',
  title: (name: string) => `${name}, что вы сможете делать`,
  intro:
    'Конкретные вещи в Word, Excel, PowerPoint, Outlook и Teams, когда ИИ делает черновики.',
  bullets: [
    {
      title: 'Ставить задачу ИИ как коллеге',
      body: 'Скажите, что нужно, для кого, в каком виде и чего нельзя. Размытые запросы — главная трата времени.',
    },
    {
      title: 'Черновики и правки в Word',
      body: 'Сначала аргумент и структура, потом смена аудитории, длины или тона без искажения смысла.',
    },
    {
      title: 'Быстро пройти длинный документ',
      body: 'Что в нём сказано, что от вас хотят и что умалчивают — сверка с исходной страницей.',
    },
    {
      title: 'Из таблицы — один честный слайд',
      body: 'Понять, что в файле, найти вывод и вынести на слайд с графиком, который можно защитить.',
    },
    {
      title: 'Разобрать почту без потерь',
      body: 'Сортировка по тому, чего хочет отправитель; длинная переписка — в решения, вопросы и ваши обязательства.',
    },
    {
      title: 'На встречи с подготовкой, после — с действиями',
      body: 'Из разрозненного материала — бриф с вашей позицией; фиксация решений и ответственных.',
    },
  ],
  footer:
    'Платная лицензия Copilot не нужна — в курсе есть бесплатная настройка. Уроки в своём темпе и сертификат о прохождении, не аккредитованная квалификация.',
}

export const M365_BEFORE_AFTER_RU = {
  kicker: 'До / после',
  title: (name: string) => `${name}, рабочая неделя: до и после`,
  intro:
    'Та же неделя рядом — быстрее делать и безопаснее, потому что решения и проверки остаются за вами.',
  rows: [
    {
      label: 'Запрос',
      before: 'Размытый промпт и ещё три попытки исправить ответ.',
      after: 'Один бриф: результат, аудитория, форма и ограничения.',
    },
    {
      label: 'Длинный документ',
      before: 'Пробежать глазами и надеяться, что не пропустили важное.',
      after: 'Суть, требования и пробелы — сверка со страницей.',
    },
    {
      label: 'Цифры',
      before: 'Цифра копируется между файлами, пока никто не знает источник.',
      after: 'Каждая цифра пересчитана в книге и прослеживается до источника.',
    },
    {
      label: 'Переписка',
      before: 'Сорок ответов и неясно, что лично на вас.',
      after: 'Решения, открытые вопросы и ваши действия — сверка с письмами.',
    },
    {
      label: 'Ответ',
      before: 'Быстрый вежливый черновик, который обязывает больше, чем хотели.',
      after: 'Быстрый черновик, но вы читаете, на что он вас обязывает, до отправки.',
    },
    {
      label: 'Встреча',
      before: 'Пришли без подготовки и потеряли действия, как только закончилось.',
      after: 'Бриф с вашей позицией и каждое действие с владельцем.',
    },
  ],
  footer:
    'ИИ чертит черновик. Вы отвечаете за решения и проверку любых фактов.',
}

export function pptBenefits(locale: MarketingLocale) {
  return locale === 'ru' ? PPT_BENEFITS_RU : PPT_BENEFITS
}

export function pptBeforeAfter(locale: MarketingLocale) {
  return locale === 'ru' ? PPT_BEFORE_AFTER_RU : PPT_BEFORE_AFTER
}

export function m365Benefits(locale: MarketingLocale) {
  return locale === 'ru' ? M365_BENEFITS_RU : M365_BENEFITS
}

export function m365BeforeAfter(locale: MarketingLocale) {
  return locale === 'ru' ? M365_BEFORE_AFTER_RU : M365_BEFORE_AFTER
}

export function pptPlan(
  name: string | null,
  level: string,
  timeSaved: string,
  insight: string,
  locale: MarketingLocale = 'en',
): TrialPlanCopy {
  if (locale === 'ru') {
    return {
      funnel: 'master-ai-for-powerpoint',
      headline: (n) => (
        <>
          Ваш план
          <br />
          PowerPoint + ИИ готов, {n ?? name ?? 'друг'}!
        </>
      ),
      insight,
      metaLeft: { kicker: '📊 Уровень PowerPoint', value: level },
      metaRight: { kicker: '⏱️ Сэкономите времени', value: timeSaved },
      pathTitle: 'Ваш 7-дневный путь PowerPoint + ИИ',
      pathItems: [
        { emoji: '🖥️', kicker: 'ДЕНЬ 1', label: 'Слайды и основы ИИ' },
        { emoji: '🧩', kicker: 'ДЕНЬ 2', label: 'Структура и сюжет' },
        { emoji: '✍️', kicker: 'ДЕНЬ 3', label: 'Текст на слайдах' },
        { emoji: '🎨', kicker: 'ДЕНЬ 4', label: 'Дизайн и вёрстка' },
        { emoji: '📊', kicker: 'ДЕНЬ 5', label: 'Графики и визуал' },
        { emoji: '🎤', kicker: 'ДЕНЬ 6', label: 'Заметки и подача' },
        { emoji: '🚀', kicker: 'ДЕНЬ 7', label: 'Продвинутые процессы' },
      ],
      pathCta: 'МОЙ ПЛАН POWERPOINT →',
      tickerLabel: '🔥 2 847 человек начали план PowerPoint + ИИ на этой неделе',
      tickerHandles: MASTER_TICKER,
      highlights: [
        'Полный доступ к персональному плану PowerPoint + ИИ',
        '7-дневный курс — всего 15 мин/день',
        'Структура, текст, дизайн и визуал с ИИ',
        'Сертификат курса PowerPoint + ИИ',
      ],
      impactTitle: 'Реальный эффект от PowerPoint + ИИ',
      impactItems: [
        {
          emoji: '⏱️',
          text: 'Экономьте часы на каждой деке: ИИ чертит структуру, текст и вёрстку',
        },
        {
          emoji: '💡',
          text: 'Станьте тем, кто превращает идеи в деки, пока другие смотрят на пустой слайд',
        },
        {
          emoji: '🧠',
          text: 'Больше не начинать с нуля — промпты от мысли к рабочему плану',
        },
        {
          emoji: '🎨',
          text: 'Слайды как от дизайнера — без найма и борьбы с выравниванием',
        },
      ],
      includedTitle: 'Что входит в план PowerPoint + ИИ',
      included: [
        '7-дневный курс PowerPoint + ИИ (15 мин/день)',
        'Персональный путь под ваш уровень и цели',
        'Модули: структура, текст, дизайн и визуал',
        'Практика, которую можно применить на работе сразу',
        'Экономия 6–8 часов в неделю на презентациях',
        'Сертификат курса PowerPoint + ИИ',
      ],
      testimonialsTitle: 'Отзывы учеников PowerPoint + ИИ',
      testimonials: [
        {
          quote:
            'Раньше уходил целый вечер на одну деку. Теперь ИИ чертит структуру, я довожу. Последний пакет для совета — меньше часа.',
          name: 'Priya M.',
          role: 'Programme Manager',
        },
        {
          quote:
            'Слайды никогда не выглядели «дизайнерскими». Научилась ставить задачу ИИ по вёрстке — спрашивают, кто делал.',
          name: 'Tom H.',
          role: 'Account Director',
        },
        {
          quote: 'Пустой первый слайд убивал меня. Теперь начинаю с аргумента — дека почти собирается сама.',
          name: 'Grace O.',
          role: 'Marketing Lead',
        },
      ],
    }
  }
  return {
    funnel: 'master-ai-for-powerpoint',
    headline: (n) => (
      <>
        Your AI + PowerPoint
        <br />
        Mastery Plan is ready, {n ?? name ?? 'there'}!
      </>
    ),
    insight,
    metaLeft: { kicker: '📊 PowerPoint level', value: level },
    metaRight: { kicker: "⏱️ Time you'll save", value: timeSaved },
    pathTitle: 'Your 7-Day AI + PowerPoint Learning Path',
    pathItems: [
      { emoji: '🖥️', kicker: 'DAY 1', label: 'Slides + AI Basics' },
      { emoji: '🧩', kicker: 'DAY 2', label: 'Structure & Storyline' },
      { emoji: '✍️', kicker: 'DAY 3', label: 'Writing Slide Copy' },
      { emoji: '🎨', kicker: 'DAY 4', label: 'Design & Layout' },
      { emoji: '📊', kicker: 'DAY 5', label: 'Charts & Visuals' },
      { emoji: '🎤', kicker: 'DAY 6', label: 'Speaker Notes & Delivery' },
      { emoji: '🚀', kicker: 'DAY 7', label: 'Advanced Workflows' },
    ],
    pathCta: 'GET MY POWERPOINT PLAN →',
    tickerLabel: '🔥 2,847 people started their AI + PowerPoint plan this week',
    tickerHandles: MASTER_TICKER,
    highlights: [
      'Full access to your personalised AI + PowerPoint Plan',
      '7-day structured course — just 15 min/day',
      'Learn slide structure, copy, design & visuals with AI',
      'AI + PowerPoint Course Certificate',
    ],
    impactTitle: 'See real impact of mastering AI + PowerPoint',
    impactItems: [
      { emoji: '⏱️', text: 'Save hours on every deck by letting AI draft the structure, the copy and the layout for you' },
      { emoji: '💡', text: 'Become the person who turns ideas into decks while everyone else is still staring at a blank slide' },
      { emoji: '🧠', text: 'Never start from nothing again with prompts that take you from rough thought to a working outline' },
      { emoji: '🎨', text: 'Present slides that look professionally designed without hiring a designer or fighting with alignment tools' },
    ],
    includedTitle: "What's included in your AI + PowerPoint plan",
    included: [
      '7-day structured AI + PowerPoint mastery course (15 min/day)',
      'Personalised path based on your PowerPoint level & goals',
      'Slide structure, copywriting, design & visuals modules',
      'Real-world exercises you can use at work immediately',
      'Save 6–8 hours every week on building presentations',
      'AI + PowerPoint Course Certificate',
    ],
    testimonialsTitle: 'Hear it from AI + PowerPoint learners',
    testimonials: [
      {
        quote:
          'I used to lose a whole evening to one deck. Now AI drafts the structure and I just refine it. My last board pack took under an hour.',
        name: 'Priya M.',
        role: 'Programme Manager',
      },
      {
        quote:
          'I could never get my slides to look designed. Learning how to brief AI on layout changed everything — people ask who made them.',
        name: 'Tom H.',
        role: 'Account Director',
      },
      {
        quote: 'The blank first slide was the killer for me. Now I start with the argument and the deck almost builds itself.',
        name: 'Grace O.',
        role: 'Marketing Lead',
      },
    ],
  }
}

export function m365Plan(
  name: string | null,
  level: string,
  timeSaved: string,
  insight: string,
  locale: MarketingLocale = 'en',
): TrialPlanCopy {
  if (locale === 'ru') {
    return {
      funnel: 'master-ai-microsoft-365',
      headline: (n) => (
        <>
          Ваш план
          <br />
          Microsoft 365 + ИИ готов, {n ?? name ?? 'друг'}!
        </>
      ),
      insight,
      metaLeft: { kicker: '📊 Уровень Microsoft 365', value: level },
      metaRight: { kicker: '⏱️ Вы указали', value: timeSaved },
      pathTitle: 'Ваш путь Microsoft 365 + ИИ',
      pathItems: [
        { emoji: '🧠', kicker: 'МОДУЛЬ 1', label: 'Основы ИИ и Microsoft 365' },
        { emoji: '📄', kicker: 'МОДУЛЬ 2', label: 'Word и документы' },
        { emoji: '📊', kicker: 'МОДУЛЬ 3', label: 'Excel и PowerPoint' },
        { emoji: '📥', kicker: 'МОДУЛЬ 4', label: 'Outlook и коммуникация' },
        { emoji: '👥', kicker: 'МОДУЛЬ 5', label: 'Teams, встречи и проекты' },
        { emoji: '🚀', kicker: 'МОДУЛЬ 6', label: 'Процессы Microsoft 365 с ИИ' },
      ],
      pathCta: 'МОЙ ПЛАН MICROSOFT 365 →',
      highlights: [
        'Полный доступ к персональному плану Microsoft 365 + ИИ',
        '24 урока в своём темпе — около 5 мин каждый',
        'Процессы в Word, Excel, PowerPoint, Outlook и Teams',
        'Сертификат о прохождении Microsoft 365 + ИИ',
      ],
      impactTitle: 'Реальный эффект от Microsoft 365 + ИИ',
      impactItems: [
        {
          emoji: '⏱️',
          text: 'Не начинать каждую задачу с пустой страницы — ИИ чертит документ, письмо или деку',
        },
        {
          emoji: '💡',
          text: 'Из таблицы — в вывод, из вывода — в слайды: процесс Excel и PowerPoint в модуле 3',
        },
        {
          emoji: '🧠',
          text: 'Промпты от мысли к рабочему плану — больше не с нуля',
        },
        {
          emoji: '📥',
          text: 'Меньше почты и встреч в модулях Outlook и Teams — проверки остаются за вами',
        },
      ],
      includedTitle: 'Что входит в план Microsoft 365 + ИИ',
      included: [
        '24 урока в 6 модулях — в своём темпе',
        'Персональный путь под уровень и цели',
        'Процессы Word, Excel, PowerPoint, Outlook и Teams',
        'Рабочие задачи, которые можно применить в тот же день',
        'Без расписания — всё в удобное время',
        'Сертификат о прохождении Microsoft 365 + ИИ',
      ],
    }
  }
  return {
    funnel: 'master-ai-microsoft-365',
    headline: (n) => (
      <>
        Your Microsoft 365 + AI
        <br />
        Mastery Plan is ready, {n ?? name ?? 'there'}!
      </>
    ),
    insight,
    metaLeft: { kicker: '📊 Microsoft 365 level', value: level },
    metaRight: { kicker: '⏱️ You told us', value: timeSaved },
    pathTitle: 'Your Microsoft 365 + AI Learning Path',
    pathItems: [
      { emoji: '🧠', kicker: 'MODULE 1', label: 'AI and Microsoft 365 Foundations' },
      { emoji: '📄', kicker: 'MODULE 2', label: 'Word and Documents' },
      { emoji: '📊', kicker: 'MODULE 3', label: 'Excel and PowerPoint' },
      { emoji: '📥', kicker: 'MODULE 4', label: 'Outlook and Communication' },
      { emoji: '👥', kicker: 'MODULE 5', label: 'Teams, Meetings and Projects' },
      { emoji: '🚀', kicker: 'MODULE 6', label: 'AI-Powered Microsoft 365 Workflows' },
    ],
    pathCta: 'GET MY MICROSOFT 365 PLAN →',
    highlights: [
      'Full access to your personalised Microsoft 365 + AI plan',
      '24 self-paced lessons — about 5 min each',
      'Word, Excel, PowerPoint, Outlook and Teams workflows',
      'Microsoft 365 + AI Certificate of Completion',
    ],
    impactTitle: 'See real impact of mastering Microsoft 365 + AI',
    impactItems: [
      { emoji: '⏱️', text: 'Stop starting every task from a blank page by briefing AI to draft the document, the email or the deck first' },
      { emoji: '💡', text: 'Turn a spreadsheet into an insight, and an insight into slides using the Excel and PowerPoint workflow in module 3' },
      { emoji: '🧠', text: 'Never start from nothing again with prompts that take you from rough thought to a working outline' },
      { emoji: '📥', text: 'Cut your email and meeting workload with the Outlook and Teams modules — while you stay the one who checks it' },
    ],
    includedTitle: "What's included in your Microsoft 365 + AI plan",
    included: [
      '24 self-paced lessons across 6 modules, in your own time',
      'Personalised path based on your Microsoft 365 level & goals',
      'Word, Excel, PowerPoint, Outlook and Teams workflows',
      'Real work tasks you can apply the same day',
      'Work through it at your own pace — nothing is scheduled',
      'Microsoft 365 + AI Certificate of Completion',
    ],
  }
}

export function excelPlan(
  name: string | null,
  level: string,
  timeSaved: string,
  insight: string,
  locale: MarketingLocale = 'en',
): TrialPlanCopy {
  if (locale === 'ru') {
    return {
      funnel: 'master-claude-ai-excel',
      headline: (n) => (
        <>
          Ваш план
          <br />
          Excel + ИИ готов, {n ?? name ?? 'друг'}!
        </>
      ),
      insight,
      metaLeft: { kicker: '📊 Уровень Excel', value: level },
      metaRight: { kicker: '⏱️ Сэкономите времени', value: timeSaved },
      pathTitle: 'Ваш 7-дневный путь Excel + ИИ',
      pathItems: [
        { emoji: '📊', kicker: 'ДЕНЬ 1', label: 'Excel и основы ИИ' },
        { emoji: '🧮', kicker: 'ДЕНЬ 2', label: 'Формулы' },
        { emoji: '🧹', kicker: 'ДЕНЬ 3', label: 'Очистка данных' },
        { emoji: '📈', kicker: 'ДЕНЬ 4', label: 'Анализ и инсайты' },
        { emoji: '📋', kicker: 'ДЕНЬ 5', label: 'Отчёты и графики' },
        { emoji: '⚙️', kicker: 'ДЕНЬ 6', label: 'Автоматизация и макросы' },
        { emoji: '🚀', kicker: 'ДЕНЬ 7', label: 'Продвинутые процессы' },
      ],
      pathCta: 'МОЙ ПЛАН EXCEL + ИИ →',
      tickerLabel: '🔥 2 847 человек начали план Excel + ИИ на этой неделе',
      tickerHandles: MASTER_TICKER,
      highlights: [
        'Полный доступ к персональному плану Excel + ИИ',
        '7-дневный курс — всего 15 мин/день',
        'Формулы, очистка данных и автоматизация с Claude',
        'Сертификат курса Claude + Excel',
      ],
      impactTitle: 'Реальный эффект от Excel + ИИ',
      impactItems: [
        {
          emoji: '⏱️',
          text: 'Экономьте 5+ часов в неделю: Claude берёт формулы, очистку и рутину',
        },
        {
          emoji: '💰',
          text: 'Зарабатывайте больше, став экспертом Excel, который сдаёт за минуты, а не часы',
        },
        {
          emoji: '🧠',
          text: 'Не застревать на формулах и данных — спросите Claude',
        },
        {
          emoji: '📈',
          text: 'Отчёты, на которые уходил день, — до обеда',
        },
      ],
      includedTitle: 'Что входит в план Excel + ИИ',
      included: [
        '7-дневный курс Excel + Claude (15 мин/день)',
        'Персональный путь под уровень и цели',
        'Модули: формулы, очистка данных и автоматизация',
        'Практика для работы сразу',
        'Экономия 6–8 часов в неделю на таблицах',
        'Сертификат курса Claude + Excel',
      ],
      testimonialsTitle: 'Отзывы учеников Excel + ИИ',
      testimonials: [
        {
          quote:
            'Тратил 3 часа в неделю на отчёты. Теперь Claude пишет формулы за секунды. Начальник думает, что я гений таблиц.',
          name: 'Alex T.',
          role: 'Operations Manager',
        },
        {
          quote:
            'Боялся VLOOKUP. Научился описывать задачу Claude — формула собирается сразу. Переломный момент.',
          name: 'Maria S.',
          role: 'HR Coordinator',
        },
        {
          quote:
            'Сэкономили команде 10+ часов в неделю на еженедельной очистке данных. Окупилось мгновенно — я не технарь.',
          name: 'Daniel R.',
          role: 'Sales Team Lead',
        },
      ],
    }
  }
  return {
    funnel: 'master-claude-ai-excel',
    headline: (n) => (
      <>
        Your Excel + AI
        <br />
        Mastery Plan is ready, {n ?? name ?? 'there'}!
      </>
    ),
    insight,
    metaLeft: { kicker: '📊 Excel level', value: level },
    metaRight: { kicker: "⏱️ Time you'll save", value: timeSaved },
    pathTitle: 'Your 7-Day Excel + AI Learning Path',
    pathItems: [
      { emoji: '📊', kicker: 'DAY 1', label: 'Excel + AI Basics' },
      { emoji: '🧮', kicker: 'DAY 2', label: 'Formula Mastery' },
      { emoji: '🧹', kicker: 'DAY 3', label: 'Data Cleaning' },
      { emoji: '📈', kicker: 'DAY 4', label: 'Analysis & Insights' },
      { emoji: '📋', kicker: 'DAY 5', label: 'Reports & Charts' },
      { emoji: '⚙️', kicker: 'DAY 6', label: 'Automation & Macros' },
      { emoji: '🚀', kicker: 'DAY 7', label: 'Advanced Workflows' },
    ],
    pathCta: 'GET MY EXCEL + AI PLAN →',
    tickerLabel: '🔥 2,847 people started their Excel + AI plan this week',
    tickerHandles: MASTER_TICKER,
    highlights: [
      'Full access to your personalised Excel + AI Plan',
      '7-day structured course — just 15 min/day',
      'Learn formulas, data cleaning & automation with Claude',
      'Claude AI + Excel Course Certificate',
    ],
    impactTitle: 'See real impact of mastering Excel + AI',
    impactItems: [
      { emoji: '⏱️', text: 'Save 5+ hours every week by letting Claude handle formulas, data cleaning, and repetitive tasks' },
      { emoji: '💰', text: 'Earn more at work by becoming the go-to Excel expert who delivers in minutes, not hours' },
      { emoji: '🧠', text: 'Never feel stuck again with any formula, function, or data task — just ask Claude' },
      { emoji: '📈', text: 'Impress with professional reports that used to take a full day — now done before lunch' },
    ],
    includedTitle: "What's included in your Excel + AI plan",
    included: [
      '7-day structured Excel + Claude AI mastery course (15 min/day)',
      'Personalised path based on your Excel level & goals',
      'Formula writing, data cleaning & automation modules',
      'Real-world exercises you can use at work immediately',
      'Save 6–8 hours every week on spreadsheet tasks',
      'Claude AI + Excel Course Certificate',
    ],
    testimonialsTitle: 'Hear it from Excel + AI learners',
    testimonials: [
      {
        quote:
          'I used to spend 3 hours a week on reports. Now Claude writes my formulas in seconds. My boss thinks I\'m a spreadsheet genius.',
        name: 'Alex T.',
        role: 'Operations Manager',
      },
      {
        quote:
          'I was terrified of VLOOKUP. This course taught me to describe what I need to Claude and it builds the formula instantly. Game-changer.',
        name: 'Maria S.',
        role: 'HR Coordinator',
      },
      {
        quote: "Saved my team 10+ hours a week by automating our weekly data cleanup. The ROI was instant — and I'm not even technical.",
        name: 'Daniel R.',
        role: 'Sales Team Lead',
      },
    ],
  }
}
