import type { Locale } from '../../../../authorisation/src/i18n/locale'

const DIM_LABELS: Record<Locale, Record<string, string>> = {
  en: {
    mindset: 'Mindset',
    career: 'Career',
    business: 'Business',
    ai: 'AI & Technology',
    health: 'Health',
    financial: 'Financial Wellbeing',
  },
  ru: {
    mindset: 'Мышление',
    career: 'Карьера',
    business: 'Бизнес',
    ai: 'ИИ и технологии',
    health: 'Здоровье',
    financial: 'Финансовое благополучие',
  },
}

const GAP_COPY: Record<Locale, Record<string, string[]>> = {
  en: {
    business: [
      'Build systems that grow your income without your constant attention',
      'Go from idea to working business model with a clear, proven path',
    ],
    ai: [
      'Master AI tools in days — no tech background needed',
      'Gain the edge that comes from mastering AI before most people even start',
    ],
    financial: [
      'Build an income strategy that keeps growing even while you sleep',
      'Replace financial stress with a clear, trackable plan you actually stick to',
    ],
    career: [
      'Map a promotion-ready path with weekly actions you can actually finish',
      'Stop guessing what to work on — follow a system matched to your role',
    ],
    health: [
      'Rebuild energy with small daily habits that compound fast',
      'Replace burnout cycles with a plan that fits a busy week',
    ],
    mindset: [
      'Replace overthinking with a repeatable decision system',
      'Build confidence through daily proof, not motivation spikes',
    ],
  },
  ru: {
    business: [
      'Постройте системы, которые растят доход без вашего постоянного контроля',
      'От идеи к рабочей модели бизнеса по понятному проверенному пути',
    ],
    ai: [
      'Освойте ИИ-инструменты за дни — технический бэкграунд не нужен',
      'Получите преимущество тех, кто освоил ИИ раньше большинства',
    ],
    financial: [
      'Стратегия дохода, которая растёт, пока вы спите',
      'Замените финансовый стресс ясным планом, которому вы реально следуете',
    ],
    career: [
      'Путь к повышению с еженедельными шагами, которые реально завершить',
      'Хватит гадать, над чем работать — система под вашу роль',
    ],
    health: [
      'Верните энергию через маленькие ежедневные привычки',
      'Замените циклы выгорания планом под плотную неделю',
    ],
    mindset: [
      'Замените зацикленность повторяемой системой решений',
      'Уверенность через ежедневные доказательства, а не всплески мотивации',
    ],
  },
}

const SCORE_LABELS: Record<Locale, Array<{ max: number; label: string }>> = {
  en: [
    { max: 39, label: 'Building' },
    { max: 54, label: 'Rising' },
    { max: 69, label: 'Thriving' },
    { max: 100, label: 'Peak' },
  ],
  ru: [
    { max: 39, label: 'Старт' },
    { max: 54, label: 'Рост' },
    { max: 69, label: 'На подъёме' },
    { max: 100, label: 'Пик' },
  ],
}

export function scoreLabelFor(overall: number, locale: Locale): string {
  const bands = SCORE_LABELS[locale]
  if (overall <= bands[0].max) return bands[0].label
  if (overall <= bands[1].max) return bands[1].label
  if (overall <= bands[2].max) return bands[2].label
  return bands[3].label
}

export function dimLabels(locale: Locale) {
  return DIM_LABELS[locale]
}

export function gapBullets(locale: Locale, id: string): string[] {
  return GAP_COPY[locale][id] ?? GAP_COPY[locale].career
}

export function gapDisplayLabel(locale: Locale, id: string, baseLabel: string): string {
  if (locale === 'en') {
    if (id === 'ai') return 'AI & Technology'
    if (id === 'financial') return 'Financial Wellbeing'
    if (id === 'business') return 'Business Mastery'
    return baseLabel
  }
  if (id === 'ai') return 'ИИ и технологии'
  if (id === 'financial') return 'Финансовое благополучие'
  if (id === 'business') return 'Мастерство в бизнесе'
  return baseLabel
}

export function archetypeFor(
  locale: Locale,
  identity: string,
  focus: string,
): { name: string; emoji: string; quote: string } {
  if (locale === 'en') {
    if (identity === 'business-founder')
      return {
        name: 'The Visionary Founder',
        emoji: '🏢',
        quote: "You're building something bigger than a job. MindoraAcademy gives it a system.",
      }
    if (identity === 'starting-out')
      return {
        name: 'The Rising Starter',
        emoji: '🌱',
        quote: "You're early — and that's an advantage. We'll help you skip the wasted years.",
      }
    if (identity === 'ready-to-change')
      return {
        name: 'The Bold Transformer',
        emoji: '🔄',
        quote: "You're ready for a rewrite. MindoraAcademy turns that itch into a 90-day plan.",
      }
    if (focus === 'health-vitality')
      return { name: 'The Wellness Warrior', emoji: '💪', quote: 'Energy first. Everything else compounds from there.' }
    return {
      name: 'The Ambitious Achiever',
      emoji: '🚀',
      quote: "You're not just aiming for a job — you're building a legacy. MindoraAcademy will help you get there faster.",
    }
  }

  if (identity === 'business-founder')
    return {
      name: 'Основатель-визионер',
      emoji: '🏢',
      quote: 'Вы строите нечто большее, чем работа. MindoraAcademy даст этому систему.',
    }
  if (identity === 'starting-out')
    return {
      name: 'Растущий новичок',
      emoji: '🌱',
      quote: 'Вы в начале пути — и это преимущество. Поможем пропустить лишние годы.',
    }
  if (identity === 'ready-to-change')
    return {
      name: 'Смелый трансформатор',
      emoji: '🔄',
      quote: 'Вы готовы к перезапуску. MindoraAcademy превратит это в план на 90 дней.',
    }
  if (focus === 'health-vitality')
    return { name: 'Воин здоровья', emoji: '💪', quote: 'Сначала энергия. Всё остальное нарастает от неё.' }
  return {
    name: 'Амбициозный достигатор',
    emoji: '🚀',
    quote: 'Вы строите не просто карьеру — вы строите наследие. MindoraAcademy поможет быстрее.',
  }
}

export function rewardLineCopy(locale: Locale, reward: string): string {
  const en: Record<string, string> = {
    trip: "Picture yourself booking that trip — that's what 90 days of momentum feels like.",
    dinner: "Picture that celebration dinner — that's what 90 days of momentum feels like.",
    purchase: "Picture unboxing that upgrade — that's what 90 days of momentum feels like.",
    savings: "Picture the balance climbing — that's what 90 days of momentum feels like.",
    family: "Picture sharing that win with your family — that's what 90 days of momentum feels like.",
  }
  const ru: Record<string, string> = {
    trip: 'Представьте, как бронируете поездку — так ощущаются 90 дней импульса.',
    dinner: 'Представьте праздничный ужин — так ощущаются 90 дней импульса.',
    purchase: 'Представьте, как распаковываете желанную покупку — так ощущаются 90 дней импульса.',
    savings: 'Представьте растущий баланс — так ощущаются 90 дней импульса.',
    family: 'Представьте, как делитесь победой с семьёй — так ощущаются 90 дней импульса.',
  }
  const table = locale === 'ru' ? ru : en
  return table[reward] ?? table.family
}

export function visionStruggleCopy(
  locale: Locale,
  vision: string,
): { without: string[]; with: string[]; kicker: string } {
  if (locale === 'ru') {
    if (vision === 'financial-freedom') {
      return {
        kicker: 'Застой с деньгами не вечен — вот как могут выглядеть следующие 90 дней:',
        without: [
          'От зарплаты до зарплаты без подушки',
          'Нет ясного пути к дополнительному доходу',
          'Финансовая свобода всё ещё далеко',
        ],
        with: [
          'План дохода, которому вы реально следуете',
          'Дополнительный поток запущен, а не обсуждается',
          'Ясный путь к финансовой свободе на карте',
        ],
      }
    }
    return {
      kicker: 'Застой в карьере не вечен — вот как могут выглядеть следующие 90 дней:',
      without: [
        'Застряли, пока других повышают',
        'Нет ясного пути вперёд',
        'Финансовая свобода всё ещё далеко',
      ],
      with: [
        'Ясный план ускорения карьеры',
        'Готовность к повышению с уверенностью',
        'Ясный путь к финансовой свободе на карте',
      ],
    }
  }

  if (vision === 'financial-freedom') {
    return {
      kicker: "Feeling stuck with money won't last — here's what the next 90 days look like:",
      without: ['Paycheque to paycheque with no buffer', 'No clear path to extra income', 'Financial freedom still out of reach'],
      with: ['A written income plan you actually follow', 'A side stream started, not just discussed', 'A clear path to financial freedom mapped'],
    }
  }
  return {
    kicker: "Feeling stuck in your career won't last — here's what the next 90 days look like:",
    without: ['Stuck while others get promoted', 'No clear path forward', 'Financial freedom still out of reach'],
    with: ['Clear career acceleration plan', 'Promotion-ready with confidence', 'A clear path to financial freedom mapped'],
  }
}
