import type { QuizScreenDef } from '@/funnels/twenty-eight-day/types/quiz'
import type { FunnelLocale } from '@/funnels/twenty-eight-day/data/quizScreens'

type ScreenFields = {
  title?: string
  subtitle?: string
  question?: string
  trustLine?: string
  avatarsCaption?: string
  tagline?: string
  stat?: string
  ctaLabel?: string
  defaultHeadline?: string
  body?: string
  quote?: string
  author?: string
}

const SCREEN_RU: Record<string, ScreenFields> = {
  identity: {
    title: '28-дневный ИИ-челлендж',
    subtitle: 'Получите сертификат по ИИ',
    question: 'Что вас лучше всего описывает?',
    trustLine: '✓ 2 минуты на прохождение  ·  ✓ Мгновенный результат',
  },
  'social-proof-1': {
    title: 'Вы в хорошей компании',
    subtitle: 'Более 500 000 специалистов прошли обучение в MindoraAcademy, чтобы быть впереди в мире ИИ',
    avatarsCaption: 'Присоединились на этой неделе',
    tagline: 'Составим ваш личный план — это займёт 2 минуты',
    stat: '4,9 / 5 по отзывам 12 400+ учеников',
    ctaLabel: 'НАЧАТЬ →',
  },
  'q1-age': { question: 'Сколько вам лет?' },
  'q2-goal': { question: 'Какая у вас главная цель в работе с ИИ?' },
  'q3-industry': { question: 'В какой сфере вы работаете?' },
  'q4-overwhelm': { question: 'Как вы себя чувствуете, когда видите новости об ИИ?' },
  'q5-skill': { question: 'Насколько вам комфортно пользоваться инструментами ИИ сейчас?' },
  'interstitial-1': {
    defaultHeadline: 'Вы уже опережаете большинство',
    stat: '📊 87% учеников MindoraAcademy почувствовали уверенность в ИИ уже на первой неделе',
    body:
      'Большинство понимают, что ИИ важен, но так и не сделали ни шага. То, что вы здесь, уже ставит вас в топ-20%.',
    ctaLabel: 'ПРОДОЛЖИТЬ →',
  },
  'q6-fear': { question: 'Насколько вы беспокоитесь, что ИИ повлияет на работу или доход?' },
  'q7-experience': { question: 'Что лучше описывает ваш опыт с ИИ?' },
  'q8-ai-tools': { question: 'С каким инструментом ИИ вы знакомы больше всего?' },
  'q9-blocker': { question: 'Что больше всего вас сдерживает?' },
  'q10-stage': { question: 'Что лучше описывает вашу текущую ситуацию?' },
  'q11-priority': { question: 'С чем вы хотите, чтобы ИИ помог в первую очередь?' },
  'q12-concern': { question: 'Когда вы думаете об ИИ и своём будущем, что беспокоит сильнее всего?' },
  'interstitial-2': {
    defaultHeadline: 'Окно возможностей открыто — но не навсегда',
    quote: 'ИИ не заменит людей. Но люди, которые используют ИИ, заменят тех, кто не использует.',
    author: 'McKinsey Global Institute',
    body:
      'Компании уже нанимают с учётом владения ИИ. 28-дневный ИИ-челлендж создан, чтобы вы стали таким человеком — быстро.',
    ctaLabel: 'ДАЛЕЕ →',
  },
  'q13-previous': { question: 'Вы уже пробовали изучать ИИ раньше?' },
  'q14-comfort': { question: 'Вам комфортно осваивать новые навыки онлайн?' },
  'q15-first-win': { question: 'Какой результат вы хотите получить за первые 7 дней?' },
  'q16-income': { question: 'Какой дополнительный доход реально изменил бы вашу жизнь?' },
  'q17-time': {
    question: 'Сколько времени вы можете уделять каждый день?',
    subtitle: 'Будьте честны — регулярность важнее интенсивности',
  },
  'q18-reward': {
    question: 'Чем вы порадуете себя после прохождения 28-дневного ИИ-челленджа?',
    subtitle: 'Исследования показывают: награда утраивает шанс дойти до конца',
  },
  'interstitial-3': {
    defaultHeadline: 'Вы уже делаете прогресс!',
    body:
      'Люди с чёткими целями и наградой в 3 раза чаще доводят начатое до конца. Ваш план сейчас строится по вашим ответам.',
    ctaLabel: 'ПОСМОТРЕТЬ МОЙ ПЛАН →',
  },
  email: {
    title: 'Введите email, чтобы получить',
    subtitle: 'личный план по ИИ!',
  },
  'name-capture': {
    title: 'Как к вам обращаться?',
    subtitle: 'Мы персонализируем ваш план по ИИ с вашим именем',
  },
}

const OPTIONS_RU: Record<string, Record<string, string>> = {
  identity: {
    employee: 'Я работаю в компании',
    'business-owner': 'Я строю свой бизнес',
    personal: 'Изучаю это для себя',
  },
  'q1-age': {
    'under-25': 'Младше 25',
    '25-34': '25 – 34',
    '35-44': '35 – 44',
    '45-54': '45 – 54',
    '55-plus': '55+',
  },
  'q2-goal': {
    'grow-role': 'Расти в текущей роли',
    'switch-career': 'Сменить карьеру или получить повышение',
    'side-income': 'Построить бизнес или дополнительный доход',
    creative: 'Использовать ИИ для творческих проектов',
    'stay-current': 'Быть в курсе и не отставать',
    other: 'Другое',
  },
  'q3-industry': {
    tech: 'Технологии и софт',
    finance: 'Финансы и бухгалтерия',
    marketing: 'Маркетинг и медиа',
    healthcare: 'Здравоохранение',
    education: 'Образование',
    sales: 'Продажи и развитие бизнеса',
    operations: 'Операции и менеджмент',
    other: 'Другое',
  },
  'q4-overwhelm': {
    excited: 'В восторге — слежу за новостями',
    curious: 'Интересно, но немного теряюсь',
    overwhelmed: 'Честно говоря, перегружен(а)',
    avoidant: 'Стараюсь об этом не думать',
  },
  'q5-skill': {
    comfortable: 'Очень комфортно',
    moderate: 'Справляюсь, но иногда тяжело',
    struggling: 'Мне очень сложно',
    beginner: 'Почти не пробовал(а)',
  },
  'q6-fear': {
    'very-worried': 'Очень беспокоюсь',
    'somewhat-worried': 'Немного беспокоюсь',
    'a-little': 'Немного',
    opportunity: 'Вовсе нет — вижу в этом возможность',
  },
  'q7-experience': {
    beginner: 'Полный новичок',
    tried: 'Пробовал(а) несколько инструментов',
    regular: 'Регулярно использую ИИ',
    builder: 'Строю рабочие процессы с ИИ',
  },
  'q8-ai-tools': {
    new: 'Я новичок в инструментах ИИ',
    chatgpt: 'ChatGPT',
    claude: 'Claude AI',
    gemini: 'Google Gemini',
    copilot: 'Microsoft Copilot',
    midjourney: 'Midjourney',
    perplexity: 'Perplexity AI',
  },
  'q9-blocker': {
    'no-plan': 'Нет чёткой системы или плана',
    'no-time': 'Не хватает времени',
    'too-complex': 'Кажется слишком сложным',
    'no-start': 'Не знаю, с чего начать',
  },
  'q10-stage': {
    student: 'Студент или только начинаю путь',
    career: 'В роли, развиваю карьеру',
    manager: 'Менеджер или руководитель команды',
    founder: 'Веду свой бизнес',
    transitioning: 'Делаю паузу или в переходе',
  },
  'q11-priority': {
    writing: 'Письмо и коммуникация',
    data: 'Данные и исследования',
    creative: 'Изображения и творчество',
    automation: 'Автоматизация задач',
    learning: 'Учиться быстрее и умнее',
  },
  'q12-concern': {
    colleagues: 'Коллеги уходят вперёд',
    automation: 'Мою роль автоматизируют',
    skills: 'Нет нужных навыков',
    opportunity: 'Ничего — вижу в этом преимущество',
  },
  'q13-previous': {
    'first-time': 'Нет — это мой первый раз',
    'free-resources': 'Да, бесплатные YouTube / блоги',
    'paid-course': 'Да, платный курс',
    structured: 'Использую ИИ, но хочу структуру',
  },
  'q14-comfort': {
    yes: 'Да, часто учусь онлайн',
    open: 'Открыт(а) к этому',
    'hands-on': 'Не очень — предпочитаю практику',
  },
  'q15-first-win': {
    'first-prompt': 'Написать первый промпт для ИИ',
    automate: 'Автоматизировать задачу на работе',
    content: 'Создавать контент с ИИ',
    'side-project': 'Запустить побочный проект с ИИ',
  },
  'q16-income': {
    '500': '$500 / месяц',
    '1000-2000': '$1 000 – $2 000 / месяц',
    '3000-5000': '$3 000 – $5 000 / месяц',
    '5000-plus': '$5 000+ / месяц',
    none: 'Мне не нужен дополнительный доход',
  },
  'q17-time': {
    '10min': '10 мин / день',
    '15min': '15 мин / день',
    '20min': '20 мин / день',
    '30min': '30+ мин / день',
  },
  'q18-reward': {
    trip: 'Запланировать отпуск',
    dinner: 'Ужин в хорошем ресторане',
    tech: 'Новая техника или гаджеты',
    savings: 'Отложить на сбережения',
    family: 'Что-то для семьи',
    other: 'Другое',
  },
}

const INTERSTITIAL_ECHO_RU: Record<string, Record<string, { headline?: string; body?: string }>> = {
  'interstitial-1': {
    overwhelmed: {
      headline: 'Чувствовать перегруз от ИИ — это нормально',
      body:
        'Большинство чувствуют то же самое. Главное — не знать всё, а иметь простой структурированный план. Именно это мы для вас и строим.',
    },
    avoidant: {
      headline: 'Игнорировать новости об ИИ не отменяет реальность — но мы можем помочь',
      body:
        'Хорошая новость: не нужно следить за каждым обновлением. 28-дневный ИИ-челлендж даёт понятный путь — только то, что действительно важно.',
    },
  },
}

function applyScreenFields<T extends QuizScreenDef>(screen: T, fields: ScreenFields): T {
  return { ...screen, ...fields }
}

export function localizeQuizScreens(screens: QuizScreenDef[], locale: FunnelLocale): QuizScreenDef[] {
  if (locale === 'en') return screens

  return screens.map((screen): QuizScreenDef => {
    const fields = SCREEN_RU[screen.id]
    const optionMap = OPTIONS_RU[screen.id]

    if (screen.type === 'identity') {
      const withFields = fields ? applyScreenFields(screen, fields) : screen
      if (!optionMap) return withFields
      return {
        ...withFields,
        options: withFields.options.map((opt) => ({
          ...opt,
          label: optionMap[opt.id] ?? opt.label,
        })),
      }
    }

    if (screen.type === 'question' || screen.type === 'ai-tools') {
      const withFields = fields ? applyScreenFields(screen, fields) : screen
      if (!optionMap) return withFields
      return {
        ...withFields,
        options: withFields.options.map((opt) => ({
          ...opt,
          label: optionMap[opt.id] ?? opt.label,
        })),
      }
    }

    if (screen.type === 'interstitial') {
      let next = fields ? applyScreenFields(screen, fields) : screen
      const echoRu = INTERSTITIAL_ECHO_RU[screen.id]
      if (echoRu && next.echoVariants) {
        const echoVariants = { ...next.echoVariants }
        for (const [key, variant] of Object.entries(echoRu)) {
          echoVariants[key] = { ...echoVariants[key], ...variant }
        }
        next = { ...next, echoVariants }
      }
      return next
    }

    if (
      screen.type === 'social-proof' ||
      screen.type === 'email' ||
      screen.type === 'name-capture'
    ) {
      return fields ? applyScreenFields(screen, fields) : screen
    }

    return screen
  })
}
