export function ExcelBenefitsScreen() {
  return (
    <div className="px-4 pt-8 pb-40 animate-fade-up">
      <h1 className="mb-2 text-center text-3xl leading-tight font-extrabold text-sw-dark">
        Excel + AI Mastery Is
        <br />
        Easier Than You Think
      </h1>
      <p className="mb-6 text-center text-sm text-sw-grey">
        Designed to help you save 5+ hours every single week on spreadsheet tasks — starting day one.
      </p>
      <div
        className="mb-5 rounded-2xl p-5 text-white"
        style={{ background: 'linear-gradient(135deg, hsl(var(--sw-blue)) 0%, hsl(221 83% 38%) 100%)' }}
      >
        <p className="text-xs font-bold tracking-wide text-white/70 uppercase">📊 Course</p>
        <p className="text-xl font-extrabold">
          Master Claude AI
          <br />
          for Excel
        </p>
      </div>
      <div className="mb-6 flex flex-col gap-2 text-sm font-semibold text-sw-dark">
        <p>📊 Master Excel + Claude in 21 days</p>
        <p>⚡ Results from day one</p>
        <p>📱 10 min/day on any device</p>
      </div>
      <h2 className="mb-3 text-lg font-extrabold text-sw-dark">With this course, you will:</h2>
      <ul className="flex flex-col gap-3 text-sm leading-relaxed text-sw-grey">
        <li>Write any Excel formula in plain English — describe what you need, Claude writes the perfect formula instantly</li>
        <li>Clean messy data in seconds — no more hours fixing inconsistent dates, duplicates, or formatting</li>
        <li>Build professional reports &amp; dashboards that look like a data analyst made them — in minutes, not hours</li>
        <li>Automate repetitive weekly tasks with Claude-generated macros and workflows you can reuse forever</li>
        <li>Analyse data like a pro — spot trends, create insights, and make data-driven decisions effortlessly</li>
        <li>…and much more!</li>
      </ul>
    </div>
  )
}

export function ExcelBeforeAfterScreen() {
  return (
    <div className="px-4 pt-8 pb-40 animate-fade-up">
      <h1 className="mb-2 text-center text-3xl font-extrabold text-sw-dark">The Difference Is Clear</h1>
      <p className="mb-6 text-center text-sm text-sw-grey">Where you are now vs where you could be in 21 days</p>
      <div className="mb-4 rounded-2xl bg-sw-grey-light p-4">
        <h2 className="mb-3 text-base font-extrabold text-sw-dark">😓 Without Claude + Excel Mastery</h2>
        <ul className="flex flex-col gap-2 text-sm text-sw-grey">
          <li>✗ Googling Excel formulas and still getting errors</li>
          <li>✗ Spending hours cleaning messy data by hand</li>
          <li>✗ Building reports manually that look average at best</li>
          <li>✗ Doing the same repetitive tasks every single week</li>
          <li>✗ Feeling like Excel is working against you, not for you</li>
        </ul>
      </div>
      <div className="mb-5 rounded-2xl bg-sw-blue-light p-4">
        <h2 className="mb-3 text-base font-extrabold text-sw-dark">🚀 With Master Claude AI for Excel</h2>
        <ul className="flex flex-col gap-2 text-sm text-sw-dark">
          <li>✓ Describing what you need in English — Claude writes the formula</li>
          <li>✓ Cleaning messy data in seconds with simple prompts</li>
          <li>✓ Creating professional dashboards that impress your team</li>
          <li>✓ Automating weekly tasks so they run themselves</li>
          <li>✓ Feeling confident and in control with any spreadsheet</li>
        </ul>
      </div>
      <div className="rounded-2xl border border-sw-grey-border p-4">
        <p className="text-sm leading-relaxed text-sw-grey">
          &ldquo;I used to spend 3 hours every Monday building my weekly report. Now I ask Claude and it&apos;s done in 5
          minutes. My manager thinks I&apos;m a wizard.&rdquo;
        </p>
        <p className="mt-2 text-xs font-semibold text-sw-grey">— Michael T., Operations Analyst</p>
      </div>
    </div>
  )
}

export function ExcelSocialScreen() {
  const stories = [
    {
      initials: 'R',
      badge: '6 HOURS SAVED PER WEEK',
      quote:
        'I used to dread VLOOKUP and nested IF formulas. Now I describe what I need to Claude and it writes them perfectly. I\'ve saved at least 6 hours every week since starting.',
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
  ]

  return (
    <div className="px-4 pt-8 pb-40 animate-fade-up">
      <h1 className="mb-2 text-center text-3xl leading-tight font-extrabold text-sw-dark">
        Join 12,000+ Excel Users
        <br />
        Who Levelled Up With Claude
      </h1>
      <p className="mb-6 text-center text-sm text-sw-grey">Real results from real people</p>
      <div className="mb-6 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-2xl bg-sw-grey-light py-3">
          <p className="text-lg font-extrabold text-sw-dark">4.9</p>
          <p className="text-[10px] font-bold text-sw-grey">RATING</p>
        </div>
        <div className="rounded-2xl bg-sw-grey-light py-3">
          <p className="text-lg font-extrabold text-sw-dark">12K+</p>
          <p className="text-[10px] font-bold text-sw-grey">ENROLLED</p>
        </div>
        <div className="rounded-2xl bg-sw-grey-light py-3">
          <p className="text-lg font-extrabold text-sw-dark">5h+</p>
          <p className="text-[10px] font-bold text-sw-grey">SAVED/WEEK</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {stories.map((s) => (
          <div key={s.name} className="rounded-2xl border border-sw-grey-border p-4">
            <p className="mb-1 text-amber-400">★★★★★</p>
            <p className="mb-2 text-xs font-bold tracking-wide text-sw-blue">{s.badge}</p>
            <p className="mb-3 text-sm leading-relaxed text-sw-grey">{s.quote}</p>
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-sw-blue text-xs font-bold text-white">
                {s.initials}
              </div>
              <div>
                <p className="text-sm font-bold text-sw-dark">{s.name}</p>
                <p className="text-xs text-sw-grey">{s.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
