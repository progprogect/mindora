import { MONEY_BACK_DAYS } from '@/marketing/data/moneyBack'

export type HomeLocale = 'en' | 'ru'

const MONEY_BACK_LABEL_EN = `${MONEY_BACK_DAYS}-Day Money-Back`
const MONEY_BACK_LABEL_RU = `Возврат за ${MONEY_BACK_DAYS} дней`

export const HOME_COPY = {
  en: {
    lifeAreasRowA: [
      { emoji: '🧠', label: 'Mindset', bg: '#F5F3FF', border: '#8B5CF630', color: '#8B5CF6' },
      { emoji: '💼', label: 'Career', bg: '#EFF6FF', border: '#2563EB30', color: '#2563EB' },
      { emoji: '🚀', label: 'Business', bg: '#ECFEFF', border: '#0891B230', color: '#0891B2' },
      { emoji: '💰', label: 'Financial Wellbeing', bg: '#FFFBEB', border: '#D9770630', color: '#D97706' },
      { emoji: '❤️', label: 'Health', bg: '#FEF2F2', border: '#DC262630', color: '#DC2626' },
      { emoji: '⚡', label: 'Productivity', bg: '#F5F3FF', border: '#7C3AED30', color: '#7C3AED' },
    ],
    lifeAreasRowB: [
      { emoji: '👑', label: 'Leadership', bg: '#FFFBEB', border: '#B4530930', color: '#B45309' },
      { emoji: '🗣️', label: 'Communication', bg: '#ECFEFF', border: '#0E749030', color: '#0E7490' },
      { emoji: '🤝', label: 'Relationships', bg: '#FDF2F8', border: '#BE185D30', color: '#BE185D' },
      { emoji: '🎨', label: 'Content Creation', bg: '#F5F3FF', border: '#7C3AED30', color: '#7C3AED' },
      { emoji: '✨', label: 'Lifestyle Design', bg: '#ECFDF5', border: '#05966930', color: '#059669' },
      { emoji: '🤖', label: 'AI & Technology', bg: '#ECFEFF', border: '#06B6D430', color: '#06B6D4' },
    ],
    heroPills: [
      { emoji: '📚', label: 'Expert-curated lessons' },
      { emoji: '⚡', label: '5 minutes a day' },
      { emoji: '🎯', label: 'AI Coach bridges knowing & doing' },
    ],
    statsBar: [
      { value: '100K+', label: 'Learners Worldwide' },
      { value: '4.9★', label: 'Average Rating' },
      { value: '200+', label: 'Expert Lessons' },
      { value: '87%', label: 'Report Real Progress' },
    ],
    problemStats: [
      { emoji: '😔', value: '72%', label: 'never finish the courses they buy' },
      { emoji: '⏳', value: '3 weeks', label: 'before most quit a new habit' },
      { emoji: '🤯', value: '90%', label: 'feel overwhelmed by too many options' },
    ],
    featureSteps: [
      {
        num: '01',
        title: 'Tell us your goals',
        body: 'Take our 60-second quiz. We learn exactly where you are, what you want, and what’s holding you back — then build your personalised roadmap on the spot.',
        badge: '60-second quiz',
        accent: '#2563EB',
        tile: '#EFF6FF',
        delay: '0s',
      },
      {
        num: '02',
        title: 'Learn in 5 minutes a day',
        body: 'Your daily roadmap serves you one bite-sized expert lesson — distilled from the world’s best books, coaches, and frameworks. No filler. Just the signal.',
        badge: '200+ curated lessons',
        accent: '#7C3AED',
        tile: '#F5F3FF',
        delay: '0.4s',
      },
      {
        num: '03',
        title: 'Apply it with your AI Coach',
        body: 'After every lesson, your personal AI Coach turns what you just learned into one specific action for your life — today. Not generic advice. Your advice.',
        badge: '24/7 personalised coaching',
        accent: '#059669',
        tile: '#ECFDF5',
        delay: '0.8s',
      },
    ],
    compareThem: [
      'Random content, no clear structure',
      'Watch → Quiz → Certificate → Forget',
      'No personalisation, no AI',
      'Knowledge piles up, nothing changes',
    ],
    compareUs: [
      'Expert-curated, personalised roadmap',
      'Learn → Apply → AI Coach → Win',
      'Tailored to your goals & situation',
      'Daily actions = daily real-world progress',
    ],
    systemSteps: [
      {
        num: '01',
        title: 'Learn',
        body: 'Absorb one focused, bite-sized lesson. No fluff. Just what matters.',
        tile: '#EFF6FF',
        accent: '#2563EB',
        icon: 'shield' as const,
        arrow: true,
      },
      {
        num: '02',
        title: 'Understand',
        body: 'See exactly why this matters to your goals, your life, and your situation.',
        tile: '#F5F3FF',
        accent: '#7C3AED',
        icon: 'info' as const,
        arrow: true,
      },
      {
        num: '03',
        title: 'Apply',
        body: 'Complete a specific action — something that improves your life today.',
        tile: '#ECFEFF',
        accent: '#0891B2',
        icon: 'arrow' as const,
        arrow: false,
      },
      {
        num: '04',
        title: 'AI Coach',
        body: 'Your personal AI Coach guides you to apply what you learned to your exact situation.',
        tile: '#ECFDF5',
        accent: '#059669',
        icon: 'sun' as const,
        arrow: true,
      },
      {
        num: '05',
        title: 'Win',
        body: 'Complete the challenge, earn your achievement, and celebrate a real improvement.',
        tile: '#FFFBEB',
        accent: '#D97706',
        icon: 'star' as const,
        arrow: true,
      },
      {
        num: '06',
        title: 'Improve',
        body: 'Track progress, build streaks, and watch yourself transform over time.',
        tile: '#FEF2F2',
        accent: '#DC2626',
        icon: 'trend' as const,
        arrow: false,
      },
    ],
    coachBullets: [
      'Personalised to your goals and situation',
      'Gives you specific actions, not vague suggestions',
      'Remembers your progress and adapts over time',
      'Available any time you need guidance',
    ],
    stories: [
      {
        banner: 'Promoted after 3 months',
        before: 'Consumed endless YouTube videos about career growth. Never acted on any of it.',
        after: 'Applied one lesson per day. Had the salary conversation. Got the promotion.',
        quote:
          'MindoraAcademy is the only platform that actually makes me do something after every lesson. I’ve applied more in 2 weeks than in 2 years of watching YouTube videos.',
        initials: 'SK',
        avatar: '#8B5CF6',
        name: 'Sarah K.',
        role: 'Marketing Manager · Career',
      },
      {
        banner: 'Launched first product in 6 weeks',
        before: 'Had a business idea for 2 years. Read every book. Never launched.',
        after: 'AI Coach turned every lesson into a specific next step. Launched in 6 weeks.',
        quote:
          'The AI Coach is like having a business mentor in my pocket. It gives advice specific to my actual situation. Game-changing.',
        initials: 'MT',
        avatar: '#2563EB',
        name: 'Marcus T.',
        role: 'Entrepreneur · Business',
      },
      {
        banner: '2× productivity in 30 days',
        before: 'Busy all day, productive for none of it. Knew all the frameworks. Applied zero.',
        after: 'One 5-minute lesson at lunch. One action in the afternoon. Everything shifted.',
        quote:
          'I do one lesson on my lunch break and always have one specific thing to try in the afternoon. My productivity has genuinely transformed.',
        initials: 'PS',
        avatar: '#10B981',
        name: 'Priya S.',
        role: 'Software Engineer · Productivity',
      },
    ],
    storyStats: [
      { value: '100K+', label: 'Members Worldwide' },
      { value: '200K+', label: 'Lessons Completed' },
      { value: '4.9/5', label: 'Average Rating' },
      { value: '87%', label: 'Report Real Progress' },
    ],
    finalTrust: [
      { emoji: '🔒', label: 'Secure & Private' },
      { emoji: '⭐', label: 'Trusted by 100K+' },
      { emoji: '⚡', label: 'Instant Roadmap' },
      { emoji: '🤖', label: 'AI Coach Included' },
      { emoji: '🛡️', label: MONEY_BACK_LABEL_EN },
    ],
    phoneMock: {
      welcomeBack: 'Welcome back, Alex 👋',
      roadmapTitle: 'Your Personalised Roadmap',
      dayStreak: 'day streak',
      yourProgress: 'Your Progress',
      progressEncouragement: "Keep going! You're doing great.",
      learningRoadmap: 'Learning Roadmap',
      viewAll: 'View All',
      viewAllArrow: 'View All →',
      recentAchievements: 'Recent Achievements',
      todaysAction: "Today's Action",
      todaysActionBody: 'Block 20 mins today to review your Q3 goals',
      tracks: [
        { emoji: '🧠', label: 'Mindset', pct: 75, delay: '0s', tile: '#8B5CF618', bar: '#8B5CF6' },
        { emoji: '💼', label: 'Career', pct: 60, delay: '0.3s', tile: '#2563EB18', bar: '#2563EB' },
        { emoji: '🤖', label: 'AI', pct: 80, delay: '0.6s', tile: '#06B6D418', bar: '#06B6D4' },
        { emoji: '❤️', label: 'Health', pct: 65, delay: '0.9s', tile: '#10B98118', bar: '#10B981' },
        { emoji: '💰', label: 'Finance', pct: 70, delay: '1.2s', tile: '#F59E0B18', bar: '#F59E0B' },
      ],
      badges: [
        { emoji: '⭐', label: 'Consistent Learner', delay: '0s' },
        { emoji: '🎯', label: 'Goal Getter', delay: '0.2s' },
        { emoji: '📚', label: 'Knowledge Seeker', delay: '0.4s' },
        { emoji: '👑', label: 'Growth Mindset', delay: '0.6s' },
      ],
    },
  },
  ru: {
    lifeAreasRowA: [
      { emoji: '🧠', label: 'Мышление', bg: '#F5F3FF', border: '#8B5CF630', color: '#8B5CF6' },
      { emoji: '💼', label: 'Карьера', bg: '#EFF6FF', border: '#2563EB30', color: '#2563EB' },
      { emoji: '🚀', label: 'Бизнес', bg: '#ECFEFF', border: '#0891B230', color: '#0891B2' },
      { emoji: '💰', label: 'Финансовое благополучие', bg: '#FFFBEB', border: '#D9770630', color: '#D97706' },
      { emoji: '❤️', label: 'Здоровье', bg: '#FEF2F2', border: '#DC262630', color: '#DC2626' },
      { emoji: '⚡', label: 'Продуктивность', bg: '#F5F3FF', border: '#7C3AED30', color: '#7C3AED' },
    ],
    lifeAreasRowB: [
      { emoji: '👑', label: 'Лидерство', bg: '#FFFBEB', border: '#B4530930', color: '#B45309' },
      { emoji: '🗣️', label: 'Коммуникация', bg: '#ECFEFF', border: '#0E749030', color: '#0E7490' },
      { emoji: '🤝', label: 'Отношения', bg: '#FDF2F8', border: '#BE185D30', color: '#BE185D' },
      { emoji: '🎨', label: 'Создание контента', bg: '#F5F3FF', border: '#7C3AED30', color: '#7C3AED' },
      { emoji: '✨', label: 'Дизайн жизни', bg: '#ECFDF5', border: '#05966930', color: '#059669' },
      { emoji: '🤖', label: 'ИИ и технологии', bg: '#ECFEFF', border: '#06B6D430', color: '#06B6D4' },
    ],
    heroPills: [
      { emoji: '📚', label: 'Уроки, отобранные экспертами' },
      { emoji: '⚡', label: '5 минут в день' },
      { emoji: '🎯', label: 'AI Coach связывает знания и действия' },
    ],
    statsBar: [
      { value: '100K+', label: 'учащихся по всему миру' },
      { value: '4.9★', label: 'средняя оценка' },
      { value: '200+', label: 'экспертных уроков' },
      { value: '87%', label: 'отмечают реальный прогресс' },
    ],
    problemStats: [
      { emoji: '😔', value: '72%', label: 'не доходят до конца купленных курсов' },
      { emoji: '⏳', value: '3 weeks', label: 'и большинство бросает новую привычку' },
      { emoji: '🤯', value: '90%', label: 'теряются из‑за слишком большого выбора' },
    ],
    featureSteps: [
      {
        num: '01',
        title: 'Расскажите о своих целях',
        body: 'Пройдите наш 60‑секундный тест. Мы узнаем, где вы сейчас, чего хотите и что вам мешает — и сразу соберём персональный маршрут.',
        badge: 'тест за 60 секунд',
        accent: '#2563EB',
        tile: '#EFF6FF',
        delay: '0s',
      },
      {
        num: '02',
        title: 'Учитесь 5 минут в день',
        body: 'Ежедневный маршрут даёт один короткий экспертный урок — сжатую суть лучших книг, коучей и методик. Без воды. Только суть.',
        badge: '200+ отобранных уроков',
        accent: '#7C3AED',
        tile: '#F5F3FF',
        delay: '0.4s',
      },
      {
        num: '03',
        title: 'Применяйте с AI Coach',
        body: 'После каждого урока ваш личный AI Coach превращает усвоенное в одно конкретное действие для вашей жизни — сегодня. Не общие советы. Ваши советы.',
        badge: 'персональный коучинг 24/7',
        accent: '#059669',
        tile: '#ECFDF5',
        delay: '0.8s',
      },
    ],
    compareThem: [
      'Случайный контент без структуры',
      'Смотреть → тест → сертификат → забыть',
      'Без персонализации и без ИИ',
      'Знания копятся, жизнь не меняется',
    ],
    compareUs: [
      'Экспертный персональный маршрут',
      'Учиться → применять → AI Coach → победа',
      'Под ваши цели и ситуацию',
      'Ежедневные действия = реальный прогресс каждый день',
    ],
    systemSteps: [
      {
        num: '01',
        title: 'Учиться',
        body: 'Освойте один сфокусированный короткий урок. Без лишнего — только важное.',
        tile: '#EFF6FF',
        accent: '#2563EB',
        icon: 'shield' as const,
        arrow: true,
      },
      {
        num: '02',
        title: 'Понять',
        body: 'Увидьте, почему это важно именно для ваших целей, жизни и ситуации.',
        tile: '#F5F3FF',
        accent: '#7C3AED',
        icon: 'info' as const,
        arrow: true,
      },
      {
        num: '03',
        title: 'Применить',
        body: 'Сделайте конкретное действие — то, что улучшит вашу жизнь уже сегодня.',
        tile: '#ECFEFF',
        accent: '#0891B2',
        icon: 'arrow' as const,
        arrow: false,
      },
      {
        num: '04',
        title: 'AI Coach',
        body: 'Ваш личный AI Coach помогает применить урок к вашей конкретной ситуации.',
        tile: '#ECFDF5',
        accent: '#059669',
        icon: 'sun' as const,
        arrow: true,
      },
      {
        num: '05',
        title: 'Победа',
        body: 'Завершите челлендж, получите достижение и отметьте реальное улучшение.',
        tile: '#FFFBEB',
        accent: '#D97706',
        icon: 'star' as const,
        arrow: true,
      },
      {
        num: '06',
        title: 'Расти',
        body: 'Отслеживайте прогресс, копите серии и наблюдайте, как вы меняетесь со временем.',
        tile: '#FEF2F2',
        accent: '#DC2626',
        icon: 'trend' as const,
        arrow: false,
      },
    ],
    coachBullets: [
      'Под ваши цели и ситуацию',
      'Конкретные действия, а не расплывчатые советы',
      'Помнит ваш прогресс и подстраивается со временем',
      'Доступен, когда нужна поддержка',
    ],
    stories: [
      {
        banner: 'Повышение через 3 месяца',
        before: 'Бесконечно смотрела ролики о карьерном росте на YouTube. Ничего не делала.',
        after: 'Один урок в день. Разговор о зарплате. Получила повышение.',
        quote:
          'MindoraAcademy — единственная платформа, после уроков которой я реально что‑то делаю. За 2 недели применила больше, чем за 2 года просмотра YouTube.',
        initials: 'SK',
        avatar: '#8B5CF6',
        name: 'Sarah K.',
        role: 'Маркетинг-менеджер · Карьера',
      },
      {
        banner: 'Первый продукт за 6 недель',
        before: 'Идея бизнеса 2 года. Прочитал все книги. Так и не запустился.',
        after: 'AI Coach превращал каждый урок в конкретный следующий шаг. Запустился за 6 недель.',
        quote:
          'AI Coach — как наставник по бизнесу в кармане. Советы под мою реальную ситуацию. Это меняет правила игры.',
        initials: 'MT',
        avatar: '#2563EB',
        name: 'Marcus T.',
        role: 'Предприниматель · Бизнес',
      },
      {
        banner: 'Продуктивность ×2 за 30 дней',
        before: 'Весь день занят, пользы ноль. Знал все фреймворки. Не применял ни одного.',
        after: 'Пятиминутный урок в обед. Одно действие днём. Всё сдвинулось.',
        quote:
          'Один урок в обед — и всегда есть одна конкретная вещь, которую попробовать после обеда. Продуктивность реально изменилась.',
        initials: 'PS',
        avatar: '#10B981',
        name: 'Priya S.',
        role: 'Инженер ПО · Продуктивность',
      },
    ],
    storyStats: [
      { value: '100K+', label: 'участников по всему миру' },
      { value: '200K+', label: 'завершённых уроков' },
      { value: '4.9/5', label: 'средняя оценка' },
      { value: '87%', label: 'отмечают реальный прогресс' },
    ],
    finalTrust: [
      { emoji: '🔒', label: 'Безопасно и конфиденциально' },
      { emoji: '⭐', label: 'Доверяют 100K+' },
      { emoji: '⚡', label: 'Маршрут сразу' },
      { emoji: '🤖', label: 'AI Coach включён' },
      { emoji: '🛡️', label: MONEY_BACK_LABEL_RU },
    ],
    phoneMock: {
      welcomeBack: 'С возвращением, Alex 👋',
      roadmapTitle: 'Ваш персональный маршрут',
      dayStreak: 'дн. серия',
      yourProgress: 'Ваш прогресс',
      progressEncouragement: 'Так держать! У вас отлично получается.',
      learningRoadmap: 'Маршрут обучения',
      viewAll: 'Все',
      viewAllArrow: 'Все →',
      recentAchievements: 'Недавние достижения',
      todaysAction: 'Действие на сегодня',
      todaysActionBody: 'Выделите 20 минут сегодня, чтобы пересмотреть цели на Q3',
      tracks: [
        { emoji: '🧠', label: 'Мышление', pct: 75, delay: '0s', tile: '#8B5CF618', bar: '#8B5CF6' },
        { emoji: '💼', label: 'Карьера', pct: 60, delay: '0.3s', tile: '#2563EB18', bar: '#2563EB' },
        { emoji: '🤖', label: 'ИИ', pct: 80, delay: '0.6s', tile: '#06B6D418', bar: '#06B6D4' },
        { emoji: '❤️', label: 'Здоровье', pct: 65, delay: '0.9s', tile: '#10B98118', bar: '#10B981' },
        { emoji: '💰', label: 'Финансы', pct: 70, delay: '1.2s', tile: '#F59E0B18', bar: '#F59E0B' },
      ],
      badges: [
        { emoji: '⭐', label: 'Постоянный ученик', delay: '0s' },
        { emoji: '🎯', label: 'Достигатор целей', delay: '0.2s' },
        { emoji: '📚', label: 'Искатель знаний', delay: '0.4s' },
        { emoji: '👑', label: 'Мышление роста', delay: '0.6s' },
      ],
    },
  },
} as const

export function homeCopy(locale: HomeLocale) {
  return HOME_COPY[locale]
}

export const LIFE_AREAS_ROW_A = HOME_COPY.en.lifeAreasRowA
export const LIFE_AREAS_ROW_B = HOME_COPY.en.lifeAreasRowB
export const HERO_PILLS = HOME_COPY.en.heroPills
export const HERO_AVATARS = [
  { initial: 'A', className: 'bg-violet-500' },
  { initial: 'M', className: 'bg-blue-500' },
  { initial: 'J', className: 'bg-emerald-500' },
  { initial: 'S', className: 'bg-orange-500' },
  { initial: 'R', className: 'bg-rose-500' },
] as const
export const STATS_BAR = HOME_COPY.en.statsBar
export const PRESS_NAMES = ['Forbes', 'Inc.', 'Entrepreneur', 'Business Insider'] as const
export const PROBLEM_STATS = HOME_COPY.en.problemStats
export const FEATURE_STEPS = HOME_COPY.en.featureSteps
export const COMPARE_THEM = HOME_COPY.en.compareThem
export const COMPARE_US = HOME_COPY.en.compareUs
export const SYSTEM_STEPS = HOME_COPY.en.systemSteps
export const COACH_BULLETS = HOME_COPY.en.coachBullets
export const STORIES = HOME_COPY.en.stories
export const STORY_STATS = HOME_COPY.en.storyStats
export const FINAL_TRUST = HOME_COPY.en.finalTrust
