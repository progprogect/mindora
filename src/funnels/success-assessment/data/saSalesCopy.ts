import type { Locale } from '../../../../authorisation/src/i18n/locale'

export function saSalesCopy(locale: Locale) {
  if (locale === 'ru') {
    return {
      spinSubtitle: 'Не упустите шанс открыть план успеха с личной наградой 🎁',
      footerCta: ['УВИДЕТЬ МОЙ ПЛАН →', 'Открыть мой план успеха →', 'Продолжить →'],
      roadmap: {
        title: ['Ваша дорожная карта', 'готова'],
        subtitle: 'Создана, чтобы раскрыть ваш потенциал — начиная сегодня.',
        builtFor: '🚀 Создано для',
        bullets: [
          '🎯 Персонализировано под ваш профиль успеха',
          '⚡ Первые результаты уже на первой неделе',
          '🔓 Учитесь в своём темпе, на своих условиях',
        ],
        withTitle: 'С MindoraAcademy вы:',
        withItems: [
          'Следуете ежедневной дорожной карте под ваши цели, сильные стороны и пробелы',
          'Отслеживаете прогресс по 6 измерениям успеха и всегда знаете, что делать дальше',
          'Учитесь у контента мирового уровня под ваш архетип — без воды и потерь времени',
          'Ежедневно получаете коучинг ИИ по целям в удобном темпе и по своему графику',
          'Набираете импульс через микро-привычки, которые дают устойчивый результат',
          '…и многое другое!',
        ],
      },
      transformation: {
        title: ['Ваша трансформация', 'успеха'],
        lifeBy: (date: string) => `Жизнь может выглядеть иначе к ${date}`,
        without: 'Без',
        with: 'С',
        struggles: 'Трудности:',
        solutions: 'Решения:',
        promoted: 'Повышение и больший доход ✓',
        ambition: 'Ваша амбиция привела вас сюда — MindoraAcademy даст структуру и направление.',
        profileKicker: '🚀 Ваш профиль успеха',
      },
      social: {
        title: ['Присоединяйтесь к 500 000+', 'сильных людей'],
        subtitle: 'Такие же, как вы — сделали первый шаг',
        stats: ['Высокие достижения по всему миру', 'Средняя оценка', 'Ясность уже на 1-й неделе'],
        testimonialsTitle: 'Что говорят участники',
        trust: ['Гарантия результата', 'Без карты', 'Отмена в любой момент'],
        stories: [
          {
            initials: 'ET',
            name: 'Emma T.',
            role: 'Директор по маркетингу',
            quote:
              'Три года был на одном уровне. За 6 недель по плану успеха получил повышение. Персональная дорожная карта решила всё.',
          },
          {
            initials: 'ML',
            name: 'Marcus L.',
            role: 'Предприниматель',
            quote:
              'Бизнес стоял 18 месяцев. MindoraAcademy показал, где пробелы. Доход +40%, и я снова чувствую контроль.',
          },
          {
            initials: 'SK',
            name: 'Sophie K.',
            role: 'Смена карьеры',
            quote:
              'Знал, что способен на большее, но не было плана. Профиль успеха показал, над чем работать. Через 90 дней — работа мечты.',
          },
        ],
      },
      profile: {
        defaultName: 'Ваш',
        badge: (name: string) => `✨ Профиль успеха ${name}`,
        headline: (name: string) => `${name}, вот ваша\nперсональная дорожная карта`,
        overallScore: 'Общий балл',
        archetypeKicker: 'Ваш архетип',
        topGapsTitle: '🚀 ТОП-3 ЗОНЫ РОСТА',
        topGapsBody:
          'По вашим ответам эти три области дают самый быстрый путь к карьерному прорыву. План закрывает все три одновременно.',
        unlock: (n: number) => `🔓 ${n} пунктов роста готовы к раскрытию`,
        gapMeta: '⏱ 5–10 мин/день · ✅ Включено в план',
        whyAllThree: '🎯 Почему все три зоны сразу?',
        whyAllThreeBody: (areas: string) =>
          `Работа над ${areas} одновременно даёт эффект накопления — прогресс в одной зоне ускоряет другие. Поэтому участники видят результат в 3 раза быстрее, чем при поочерёдной работе.`,
        gapAreaNames: {
          business: 'Бизнес',
          ai: 'ИИ и технологии',
          financial: 'Финансовое благополучие',
        },
        testimonialTitle: '94% участников видят измеримый прогресс за 30 дней',
        testimonialQuote:
          '«Пробовал три раза и бросал. MindoraAcademy дал систему, которая жила с моей жизнью, а не против неё. Через восемь недель — повышение и первый дополнительный доход».',
        testimonialAuthor: '— Alex R., операционный менеджер',
      },
      trial: {
        headlineReady: 'готов',
        metaLeftKicker: '✨ Ваш архетип',
        metaRightKicker: '⚡ Ваш уровень',
        pathTitle: 'ВАША ПЕРСОНАЛЬНАЯ ДОРОЖНАЯ КАРТА УСПЕХА',
        pathSubtitle: 'Ежедневные уроки: мышление, карьера, здоровье и др. 10–15 минут в день.',
        pathItems: [
          { emoji: '🧠', kicker: 'ДЕНЬ 1', label: 'Перезагрузка мышления' },
          { emoji: '🎯', kicker: 'ДЕНЬ 2', label: 'Постановка целей' },
          { emoji: '💼', kicker: 'ДЕНЬ 3', label: 'Карьерная стратегия' },
          { emoji: '⚙️', kicker: 'ДЕНЬ 4', label: 'Дизайн привычек' },
          { emoji: '🏢', kicker: 'ДЕНЬ 8', label: 'Ясность в бизнесе' },
          { emoji: '💰', kicker: 'ДЕНЬ 9', label: 'Финансовое мышление' },
          { emoji: '💪', kicker: 'ДЕНЬ 10', label: 'Здоровье и энергия' },
          { emoji: '📈', kicker: 'ДЕНЬ 11', label: 'Продуктивность' },
          { emoji: '🌟', kicker: 'ДЕНЬ 15', label: 'Лидерство' },
          { emoji: '🤖', kicker: 'ДЕНЬ 16', label: 'ИИ и технологии' },
          { emoji: '⏱️', kicker: 'ДЕНЬ 17', label: 'Мастерство времени' },
          { emoji: '🌱', kicker: 'ДЕНЬ 18', label: 'Дизайн жизни' },
        ],
        pathCta: 'ПОЛУЧИТЬ МОЙ ПЛАН С ИИ →',
        ticker: '🔥 1 247 человек начали план на этой неделе',
        highlights: [
          'Полный доступ к персональному 28-дневному плану с ИИ',
          'Простые ежедневные уроки — опыт не нужен',
          'Новые ИИ-инструменты и навыки каждую неделю',
        ],
        includedTitle: 'Что входит в план',
        included: (archetype: string, emoji: string) => [
          '90-дневная дорожная карта успеха (10 мин/день)',
          `План под ваш архетип ${archetype} ${emoji}`,
          '200+ уроков: мышление, карьера, бизнес, здоровье, финансы',
          'Сертификат о прохождении',
          'Контент от экспертов обновляется каждую неделю',
          'Отмена в любой момент — без обязательств',
        ],
        testimonialsTitle: 'Отзывы участников',
        testimonials: [
          {
            quote:
              'Ясность выросла с 2/10 до 9/10 за первый месяц. Дорожная карта показала, что меня тормозило.',
            name: 'Rachel T.',
            role: 'Смена карьеры',
          },
          {
            quote:
              'Прыгал между книгами без структуры. MindoraAcademy дал систему — повышение через 4 месяца.',
            name: 'Marcus H.',
            role: 'Предприниматель',
          },
          {
            quote:
              'Узнал, что я «Воин здоровья» — помогло поставить здоровье первым. Энергия и фокус выросли за недели.',
            name: 'Priya S.',
            role: 'Директор по операциям',
          },
        ],
        planHeadline: 'Ваш персональный план успеха',
      },
    }
  }

  return {
    spinSubtitle: "Don't miss your chance to unlock your Success Plan with a personal reward 🎁",
    footerCta: ['SEE MY PERSONALISED PLAN →', 'Unlock My Success Plan →', 'Continue →'],
    roadmap: {
      title: ['Your Roadmap', 'is Ready'],
      subtitle: 'Designed to help you reach your full potential — starting today.',
      builtFor: '🚀 Built for',
      bullets: [
        '🎯 Personalised to your success profile',
        '⚡ Start seeing results in your first week',
        '🔓 Learn at your own pace, on your terms',
      ],
      withTitle: 'With MindoraAcademy, you will:',
      withItems: [
        'Follow a personalised daily roadmap built around your exact goals, strengths, and gaps',
        'Track your progress across 6 success dimensions so you always know where you stand and what to do next',
        'Learn from world-class content curated to match your archetype — no fluff, no wasted time',
        'Get coached by AI on your goals every day, at your own pace, on your schedule',
        'Build real momentum with proven micro-habits that compound into lasting results',
        '…and much more!',
      ],
    },
    transformation: {
      title: ['Your Success', 'Transformation'],
      lifeBy: (date: string) => `Life looking different by ${date}`,
      without: 'Without',
      with: 'With',
      struggles: 'Struggles:',
      solutions: 'Solutions:',
      promoted: 'Promoted & earning more ✓',
      ambition: 'Your ambition got you here — MindoraAcademy gives it structure and direction.',
      profileKicker: '🚀 Your success profile',
    },
    social: {
      title: ['Join 500,000+', 'High Achievers'],
      subtitle: 'People just like you who took the first step',
      stats: ['High achievers worldwide', 'Average rating', 'Report clarity in week 1'],
      testimonialsTitle: 'What Our Members Are Saying',
      trust: ['Results Guaranteed', 'No Credit Card Required', 'Cancel Anytime'],
      stories: [
        {
          initials: 'ET',
          name: 'Emma T.',
          role: 'Marketing Director',
          quote:
            "I'd been stuck at the same level for 3 years. Within 6 weeks of following my Success Plan I got the promotion I'd been chasing. The personalised roadmap made all the difference.",
        },
        {
          initials: 'ML',
          name: 'Marcus L.',
          role: 'Entrepreneur',
          quote:
            'My business had stalled for 18 months. MindoraAcademy helped me identify exactly where the gaps were. Revenue is up 40% and I actually feel in control now.',
        },
        {
          initials: 'SK',
          name: 'Sophie K.',
          role: 'Career Changer',
          quote:
            'I always knew I was capable of more but had no clear plan. My Success Profile showed me exactly what to work on. 90 days later I landed my dream role.',
        },
      ],
    },
    profile: {
      defaultName: 'Your',
      badge: (name: string) => `✨ ${name}'s Success Profile`,
      headline: (name: string) => `${name}, here\'s your\npersonalised roadmap`,
      overallScore: 'Overall score',
      archetypeKicker: 'Your archetype',
      topGapsTitle: '🚀 YOUR TOP 3 GROWTH OPPORTUNITIES',
      topGapsBody:
        'Based on your answers, these three areas give you the fastest path to your career breakthrough. Your plan tackles all three simultaneously.',
      unlock: (n: number) => `🔓 ${n} points of growth ready to unlock`,
      gapMeta: '⏱ 5–10 mins/day · ✅ Included in your plan',
      whyAllThree: '🎯 Why all three gaps at once?',
      whyAllThreeBody: (areas: string) =>
        `Working on ${areas} together creates a compounding effect — progress in one area accelerates the others. This is why our members see results 3× faster than tackling each area one at a time.`,
      gapAreaNames: {
        business: 'Business',
        ai: 'AI & Technology',
        financial: 'Financial Wellbeing',
      },
      testimonialTitle: '94% of members see measurable progress within 30 days',
      testimonialQuote:
        "I'd tried three times before and always quit. MindoraAcademy gave me a system that worked with my life, not against it. Eight weeks in, I got a promotion and launched my first side income stream.",
      testimonialAuthor: '— Alex R., Operations Manager',
    },
    trial: {
      headlineReady: 'ready',
      metaLeftKicker: '✨ Your archetype',
      metaRightKicker: '⚡ Your level',
      pathTitle: 'YOUR PERSONALISED SUCCESS ROADMAP',
      pathSubtitle: 'Daily lessons across Mindset, Career, Health & more. 10–15 minutes a day.',
      pathItems: [
        { emoji: '🧠', kicker: 'DAY 1', label: 'Mindset Reset' },
        { emoji: '🎯', kicker: 'DAY 2', label: 'Goal Setting' },
        { emoji: '💼', kicker: 'DAY 3', label: 'Career Strategy' },
        { emoji: '⚙️', kicker: 'DAY 4', label: 'Habit Design' },
        { emoji: '🏢', kicker: 'DAY 8', label: 'Business Clarity' },
        { emoji: '💰', kicker: 'DAY 9', label: 'Financial Mindset' },
        { emoji: '💪', kicker: 'DAY 10', label: 'Health & Energy' },
        { emoji: '📈', kicker: 'DAY 11', label: 'Productivity' },
        { emoji: '🌟', kicker: 'DAY 15', label: 'Leadership' },
        { emoji: '🤖', kicker: 'DAY 16', label: 'AI & Technology' },
        { emoji: '⏱️', kicker: 'DAY 17', label: 'Time Mastery' },
        { emoji: '🌱', kicker: 'DAY 18', label: 'Life Design' },
      ],
      pathCta: 'GET MY AI PLAN →',
      ticker: '🔥 1,247 people started their plan this week',
      highlights: [
        'Full access to your personalised 28-Day AI Plan',
        'Easy-to-follow daily lessons — no experience required',
        'New AI tools and skills added every week',
      ],
      includedTitle: "What's included in your plan",
      included: (archetype: string, emoji: string) => [
        '90-day personalised Success Roadmap (10 min/day)',
        `Plan matched to your ${archetype} ${emoji}`,
        '200+ lessons across Mindset, Career, Business, Health & Finance',
        'Certificate of completion',
        'Expert-led content updated every week',
        'Cancel anytime — no lock-in',
      ],
      testimonialsTitle: 'What members say',
      testimonials: [
        {
          quote:
            'My clarity went from 2/10 to 9/10 in the first month. The roadmap showed me exactly which areas were holding me back.',
          name: 'Rachel T.',
          role: 'Career Changer',
        },
        {
          quote:
            'I used to jump between self-help books with zero structure. MindoraAcademy gave me a real system — I got promoted in 4 months.',
          name: 'Marcus H.',
          role: 'Entrepreneur',
        },
        {
          quote:
            "Knowing I was a 'Wellness Warrior' helped me prioritise health first. My energy and focus improved within weeks.",
          name: 'Priya S.',
          role: 'Operations Director',
        },
      ],
      planHeadline: 'Your Personalised Success Plan',
    },
  }
}
