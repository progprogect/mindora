import type { Locale } from '../../../../authorisation/src/i18n/locale'

export function excelSalesCopy(locale: Locale) {
  if (locale === 'ru') {
    return {
      benefits: {
        title: ['Мастерство Excel + ИИ', 'проще, чем кажется'],
        subtitle:
          'Поможем экономить 5+ часов каждую неделю на таблицах — с первого дня.',
        course: '📊 Курс',
        courseTitle: ['Освойте Claude AI', 'для Excel'],
        bullets: [
          '📊 Excel + Claude за 21 день',
          '⚡ Результат с первого дня',
          '📱 10 мин/день с любого устройства',
        ],
        withTitle: 'С этим курсом вы:',
        withItems: [
          'Пишете любую формулу простым языком — описали задачу, Claude пишет формулу',
          'Чистите грязные данные за секунды — без часов на даты, дубликаты и формат',
          'Собираете отчёты и дашборды уровня аналитика — за минуты, не за часы',
          'Автоматизируете еженедельную рутину макросами и процессами от Claude',
          'Анализируете данные как профи — тренды, выводы и решения без усилий',
          '…и многое другое!',
        ],
      },
      beforeAfter: {
        title: 'Разница очевидна',
        subtitle: 'Где вы сейчас и где можете быть через 21 день',
        withoutTitle: '😓 Без мастерства Claude + Excel',
        withoutItems: [
          '✗ Ищете формулы в Google и всё равно ошибки',
          '✗ Часами чистите данные вручную',
          '✗ Собираете посредственные отчёты',
          '✗ Каждую неделю одни и те же задачи',
          '✗ Чувствуете, что Excel против вас',
        ],
        withTitle: '🚀 С курсом «Claude AI для Excel»',
        withItems: [
          '✓ Описываете задачу — Claude пишет формулу',
          '✓ Чистите данные за секунды простыми промптами',
          '✓ Дашборды, которые впечатляют команду',
          '✓ Еженедельные задачи выполняются сами',
          '✓ Уверенность с любой таблицей',
        ],
        quote:
          '«Раньше 3 часа каждый понедельник на отчёт. Теперь спрашиваю Claude — 5 минут. Начальник думает, что я волшебник».',
        quoteAuthor: '— Michael T., аналитик операций',
      },
      social: {
        title: ['Присоединяйтесь к 12 000+', 'пользователей Excel с Claude'],
        subtitle: 'Реальные результаты реальных людей',
        stats: ['ОЦЕНКА', 'УЧАСТНИКОВ', 'ЭКОНОМИЯ/НЕД'],
        stories: [
          {
            initials: 'R',
            badge: '6 ЧАСОВ В НЕДЕЛЮ',
            quote:
              'Боялся ВПР и вложенных ЕСЛИ. Теперь описываю задачу Claude — формулы идеальны. Экономлю минимум 6 часов в неделю.',
            name: 'Rachel P.',
            role: 'Финансовый аналитик',
          },
          {
            initials: 'M',
            badge: 'БЕЗ ПЛАТНОГО БУХГАЛТЕРА',
            quote:
              'Платил бухгалтеру за месячные отчёты. Теперь делаю за 10 минут с Claude. Курс окупился за неделю.',
            name: 'Marcus D.',
            role: 'Владелец малого бизнеса',
          },
          {
            initials: 'L',
            badge: '2 ДНЯ → 20 МИНУТ',
            quote:
              'Дали базу на 10 000 строк. Спросил Claude — точные шаги. Готово за 20 минут вместо 2 дней.',
            name: 'Lisa W.',
            role: 'Админ-менеджер',
          },
          {
            initials: 'T',
            badge: 'АВТООТЧЁТЫ КАЖДЫЙ ДЕНЬ',
            quote:
              'Модуль автоматизации изменил всё. Макрос обновляет дашборд продаж каждое утро. Команда думает, что наняли разработчика.',
            name: 'Tom H.',
            role: 'Руководитель продаж',
          },
        ],
      },
    }
  }

  return {
    benefits: {
      title: ['Excel + AI Mastery Is', 'Easier Than You Think'],
      subtitle: 'Designed to help you save 5+ hours every single week on spreadsheet tasks — starting day one.',
      course: '📊 Course',
      courseTitle: ['Master Claude AI', 'for Excel'],
      bullets: [
        '📊 Master Excel + Claude in 21 days',
        '⚡ Results from day one',
        '📱 10 min/day on any device',
      ],
      withTitle: 'With this course, you will:',
      withItems: [
        'Write any Excel formula in plain English — describe what you need, Claude writes the perfect formula instantly',
        'Clean messy data in seconds — no more hours fixing inconsistent dates, duplicates, or formatting',
        'Build professional reports & dashboards that look like a data analyst made them — in minutes, not hours',
        'Automate repetitive weekly tasks with Claude-generated macros and workflows you can reuse forever',
        'Analyse data like a pro — spot trends, create insights, and make data-driven decisions effortlessly',
        '…and much more!',
      ],
    },
    beforeAfter: {
      title: 'The Difference Is Clear',
      subtitle: 'Where you are now vs where you could be in 21 days',
      withoutTitle: '😓 Without Claude + Excel Mastery',
      withoutItems: [
        '✗ Googling Excel formulas and still getting errors',
        '✗ Spending hours cleaning messy data by hand',
        '✗ Building reports manually that look average at best',
        '✗ Doing the same repetitive tasks every single week',
        '✗ Feeling like Excel is working against you, not for you',
      ],
      withTitle: '🚀 With Master Claude AI for Excel',
      withItems: [
        '✓ Describing what you need in English — Claude writes the formula',
        '✓ Cleaning messy data in seconds with simple prompts',
        '✓ Creating professional dashboards that impress your team',
        '✓ Automating weekly tasks so they run themselves',
        '✓ Feeling confident and in control with any spreadsheet',
      ],
      quote:
        'I used to spend 3 hours every Monday building my weekly report. Now I ask Claude and it\'s done in 5 minutes. My manager thinks I\'m a wizard.',
      quoteAuthor: '— Michael T., Operations Analyst',
    },
    social: {
      title: ['Join 12,000+ Excel Users', 'Who Levelled Up With Claude'],
      subtitle: 'Real results from real people',
      stats: ['RATING', 'ENROLLED', 'SAVED/WEEK'],
      stories: [
        {
          initials: 'R',
          badge: '6 HOURS SAVED PER WEEK',
          quote:
            "I used to dread VLOOKUP and nested IF formulas. Now I describe what I need to Claude and it writes them perfectly. I've saved at least 6 hours every week since starting.",
          name: 'Rachel P.',
          role: 'Financial Analyst',
        },
        {
          initials: 'M',
          badge: 'REPLACED PAID BOOKKEEPER',
          quote:
            'I was paying a bookkeeper to build my monthly reports. Now I do them myself in 10 minutes with Claude. The course paid for itself in the first week.',
          name: 'Marcus D.',
          role: 'Small Business Owner',
        },
        {
          initials: 'L',
          badge: '2 DAYS → 20 MINUTES',
          quote:
            'My boss gave me a messy database of 10,000 rows to clean. I asked Claude and it gave me the exact steps. Done in 20 minutes instead of 2 days.',
          name: 'Lisa W.',
          role: 'Admin Manager',
        },
        {
          initials: 'T',
          badge: 'AUTOMATED DAILY REPORTING',
          quote:
            'The automation module changed everything. I built a macro that updates our sales dashboard automatically every morning. My team thinks I hired a developer.',
          name: 'Tom H.',
          role: 'Sales Team Lead',
        },
      ],
    },
  }
}
