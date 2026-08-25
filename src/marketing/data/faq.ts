export type FaqArticle = {
  id: string
  question: string
  answer: string
  categoryId: string
  categoryTitle: string
}

export type FaqCategory = {
  id: string
  title: string
  description: string
  icon: string
  articles: FaqArticle[]
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'getting-started',
    title: "Getting Started",
    description: "Account setup, logging in, and starting your first course.",
    icon: "\ud83d\ude80",
    articles: [
      {
        id: 'create-account',
        question: "How do I create an account?",
        answer: "Tap \"Start Free Trial\" on our homepage or pricing page. You'll be asked for your email address — we'll send you a one-time code to verify it. That's it. No password to remember, no lengthy forms. Once verified, you're in and can start learning immediately during your 7-day free trial.",
        categoryId: 'getting-started',
        categoryTitle: "Getting Started",
      },
      {
        id: 'how-to-login',
        question: "How do I log in?",
        answer: "Tap \"Log In\" at the top of any page. Enter the email address you signed up with and we'll send a one-time login code to your inbox. Enter the code and you're in — no password needed. Check your spam/junk folder if you don't see the email within a minute.",
        categoryId: 'getting-started',
        categoryTitle: "Getting Started",
      },
      {
        id: 'start-course',
        question: "How do I start a course?",
        answer: "After logging in, go to your Dashboard. You'll see categories like AI & Technology, Success Mindset, Career, and more. Tap into any category to see available courses, then tap \"Start\" on the course you want. Each lesson takes just 3-5 minutes — perfect for learning on the go.",
        categoryId: 'getting-started',
        categoryTitle: "Getting Started",
      },
    ],
  },
  {
    id: 'subscription-billing',
    title: "Subscription & Billing",
    description: "Plans, pricing, free trial, payments, and how to cancel.",
    icon: "\ud83d\udcb3",
    articles: [
      {
        id: 'plans-pricing',
        question: "What plans are available and how much do they cost?",
        answer: "We offer three simple plans — all include full access to every course, feature, and future content:\n\n• 1-Month Plan — billed monthly\n• 6-Month Plan (Most Popular) — billed every 6 months at a significant discount\n• 12-Month Plan (Best Value) — billed annually at the lowest per-month price\n\nAll plans include a 7-day free trial. Visit our Pricing page for exact amounts in your currency. We believe in full transparency — the price you see is the price you pay. No hidden fees, ever.",
        categoryId: 'subscription-billing',
        categoryTitle: "Subscription & Billing",
      },
      {
        id: 'free-trial',
        question: "How does the 7-day free trial work?",
        answer: "When you sign up, you get 7 days of full, unrestricted access to everything — every course, every feature, no limitations. You won't be charged during the trial. On day 8, your chosen plan begins and your payment method is charged. If you cancel before the trial ends, you won't be charged a penny.",
        categoryId: 'subscription-billing',
        categoryTitle: "Subscription & Billing",
      },
      {
        id: 'when-charged',
        question: "When will I be charged?",
        answer: "Your first charge happens on day 8 — the day after your 7-day free trial ends. After that, you're billed at the start of each billing cycle (monthly, every 6 months, or annually depending on your plan). We'll always send you a receipt by email when a payment is taken.",
        categoryId: 'subscription-billing',
        categoryTitle: "Subscription & Billing",
      },
      {
        id: 'cancel-subscription',
        question: "How do I cancel my subscription?",
        answer: "You can cancel anytime from your Profile page inside the app. Tap your profile icon, then tap \"Cancel Subscription.\" You'll be taken directly to the cancellation screen — no hoops to jump through, no retention calls, no guilt trips. After cancelling, you keep access until the end of your current billing period.",
        categoryId: 'subscription-billing',
        categoryTitle: "Subscription & Billing",
      },
      {
        id: 'payment-methods',
        question: "What payment methods do you accept?",
        answer: "We accept all major credit and debit cards (Visa, Mastercard, American Express) as well as Apple Pay and Google Pay. All payments are processed securely through Stripe — we never see or store your card details.",
        categoryId: 'subscription-billing',
        categoryTitle: "Subscription & Billing",
      },
      {
        id: 'why-charged',
        question: "Why was I charged?",
        answer: "If you see a charge from SuccessWise, it's likely because your 7-day free trial ended and your subscription began. Check your email for a receipt with the exact amount and date. If you believe the charge is incorrect, you're covered by our 30-day money-back guarantee — just email us and we'll sort it out immediately.",
        categoryId: 'subscription-billing',
        categoryTitle: "Subscription & Billing",
      },
    ],
  },
  {
    id: 'refunds-guarantee',
    title: "Refunds & Guarantee",
    description: "Our industry-leading 30-day money-back guarantee explained.",
    icon: "\ud83d\udee1\ufe0f",
    articles: [
      {
        id: 'refund-policy',
        question: "What is your refund policy?",
        answer: "We offer a 30-day money-back guarantee on all plans — no questions asked. This exceeds the 14-day statutory cooling-off period required by UK/EU law. If you're not satisfied within 30 days of your first charge, we'll refund you in full. No lengthy forms, no interrogation, no hard feelings. We believe our platform should earn your money, not trap it.",
        categoryId: 'refunds-guarantee',
        categoryTitle: "Refunds & Guarantee",
      },
      {
        id: 'request-refund',
        question: "How do I request a refund?",
        answer: "Simply email us at support@successwise.ai with the subject \"Refund Request\" and include the email address on your account. We aim to respond within 1-3 business days. Approved refunds are processed back to your original payment method within 5-10 business days (depending on your bank).",
        categoryId: 'refunds-guarantee',
        categoryTitle: "Refunds & Guarantee",
      },
      {
        id: 'guarantee-coverage',
        question: "What does the 30-day money-back guarantee cover?",
        answer: "The guarantee covers your first subscription on any plan. The 30-day window starts from your first charge (day 8, after the free trial). It applies once per customer. It does not apply to repeat subscriptions (if you cancel, claim a refund, then resubscribe). After 30 days, we don't offer refunds as standard — but we're always reasonable and will consider exceptional circumstances.",
        categoryId: 'refunds-guarantee',
        categoryTitle: "Refunds & Guarantee",
      },
    ],
  },
  {
    id: 'using-successwise',
    title: "Using SuccessWise",
    description: "Courses, progress tracking, streaks, badges, and XP.",
    icon: "\ud83d\udcda",
    articles: [
      {
        id: 'how-courses-work',
        question: "How do courses work?",
        answer: "Each course is broken into daily lessons designed to take 3-5 minutes. Every lesson has 5 learning cards (bite-sized content with key concepts, stats, and actionable tasks) followed by a 3-question quiz to check your understanding. Complete a lesson each day to build your streak and earn XP.",
        categoryId: 'using-successwise',
        categoryTitle: "Using SuccessWise",
      },
      {
        id: 'xp-streaks-badges',
        question: "What are XP, streaks, and badges?",
        answer: "XP (Experience Points) — Earned every time you complete a lesson. Score higher on quizzes to earn more XP.\n\nStreaks — Complete at least one lesson per day to build your streak. The longer your streak, the more bonus XP you earn.\n\nBadges — Special achievements unlocked as you hit milestones: First Step (first lesson), On Fire (7-day streak), Module Master (complete a module), Course Graduate (finish a full course), and more.",
        categoryId: 'using-successwise',
        categoryTitle: "Using SuccessWise",
      },
      {
        id: 'mobile-usage',
        question: "Can I use SuccessWise on my phone?",
        answer: "Yes — SuccessWise is designed mobile-first. It works beautifully on any smartphone browser (Safari, Chrome, Firefox). No app download required. Simply visit successwise.ai on your phone, log in, and start learning. You can even add it to your home screen for an app-like experience.",
        categoryId: 'using-successwise',
        categoryTitle: "Using SuccessWise",
      },
      {
        id: 'track-progress',
        question: "How do I track my progress?",
        answer: "Your Dashboard shows everything at a glance: current courses, progress bars, streak count, total XP, and badges earned. Each category page shows detailed progress per course. The Progress page gives you a bird's-eye view across all categories.",
        categoryId: 'using-successwise',
        categoryTitle: "Using SuccessWise",
      },
    ],
  },
  {
    id: 'certificates',
    title: "Certificates",
    description: "Earning, finding, downloading and sharing your certificates.",
    icon: "\ud83c\udf93",
    articles: [
      {
        id: 'do-i-get-a-certificate',
        question: "Do I get a certificate when I finish a course?",
        answer: "Yes. Every time you complete a course you earn a Certificate of Completion, included free with your subscription — there is nothing extra to buy and nothing to apply for.\n\nEach certificate shows your name, the course you completed, the date, and a unique certificate number that anyone can use to verify it.",
        categoryId: 'certificates',
        categoryTitle: "Certificates",
      },
      {
        id: 'how-many-certificates',
        question: "How many certificates can I earn?",
        answer: "There are 45 certificates available right now — one for every course on SuccessWise:\n\n• AI & Technology — 15 certificates\n• Business — 12 certificates\n• Health — 9 certificates\n• Success Mindset — 5 certificates\n• Career — 4 certificates\n\nYour subscription includes all of them, so you can earn as many as you like. We add new courses regularly, and every new course comes with its own certificate.",
        categoryId: 'certificates',
        categoryTitle: "Certificates",
      },
      {
        id: 'how-to-earn-certificate',
        question: "How do I earn a certificate?",
        answer: "Complete every lesson in a course. That is the only requirement.\n\n1. Open any course from your Dashboard\n2. Work through the lessons — most take 3-5 minutes each\n3. When you finish the final lesson, your certificate is issued automatically\n\nYou do not need to pass a final exam or request anything. The moment the last lesson is marked complete, the certificate appears in My Certificates.",
        categoryId: 'certificates',
        categoryTitle: "Certificates",
      },
      {
        id: 'where-are-my-certificates',
        question: "Where do I find my certificates?",
        answer: "Log in and look for the \"My Certificates\" card on your Dashboard. That page lists every certificate you have earned. Tap any one of them to see the full certificate.",
        categoryId: 'certificates',
        categoryTitle: "Certificates",
      },
      {
        id: 'download-certificate',
        question: "How do I download or print my certificate?",
        answer: "Open the certificate from My Certificates and tap \"Save as PDF\". You can then save it to your phone or computer, print it, or attach it to a job application.\n\nThis works on both mobile and desktop. On some phones the option is labelled \"Print\" — choosing \"Save as PDF\" as the destination gives you the file.",
        categoryId: 'certificates',
        categoryTitle: "Certificates",
      },
      {
        id: 'share-certificate',
        question: "How do I share my certificate with an employer or on LinkedIn?",
        answer: "Open the certificate and tap \"Copy\" next to the sharing link. That link is a public verification page — anyone can open it and confirm your certificate is genuine without creating an account or logging in.\n\nPaste it into your LinkedIn profile, your CV, or an email to an employer. The page shows your name, the course, the date and confirms the certificate is valid.",
        categoryId: 'certificates',
        categoryTitle: "Certificates",
      },
      {
        id: 'certificate-missing-name',
        question: "Why does my certificate not show my name?",
        answer: "If you signed up with just your email address, we do not have a name on file — and we will never guess one from your email address, because a certificate with the wrong name on it is worse than no name at all.\n\nOpen the certificate and you will see a short form asking for the name you want on it. Enter it once and it is saved to your profile. The sharing link only appears after your name is added, so you can never accidentally share a blank certificate.\n\nAlready spelt wrong? You can fix it yourself — see \"How do I change the name on my certificate?\" below.",
        categoryId: 'certificates',
        categoryTitle: "Certificates",
      },
      {
        id: 'certificate-change-name',
        question: "How do I change the name on my certificate?",
        answer: "You can change it yourself in seconds — there is no need to contact us.\n\nThe name printed on your certificates is your profile name, so correcting it updates every certificate you have earned, not just the one you are looking at.\n\nEither way works:\n\n1. Open the certificate from Dashboard → My Certificates, then under \"Name on your certificate\" tap \"Change name\", enter the correct spelling and tap \"Save name\".\n2. Or go to Profile, tap \"Edit\" next to your name, correct it and tap \"Save\".\n\nYour certificate number does not change, so any link you have already shared with an employer will keep working. If a certificate has been revoked it cannot be edited — get in touch and we will help.",
        categoryId: 'certificates',
        categoryTitle: "Certificates",
      },
      {
        id: 'certificate-accreditation',
        question: "Is my certificate an accredited qualification?",
        answer: "No — and we want to be completely straight with you about that.\n\nA SuccessWise certificate is a Certificate of Completion. It proves you worked through and finished the course. It is issued and signed by SuccessWise.ai.\n\nIt is not an accredited award, a regulated qualification, a university credit or a CPD-points certificate, and we will never claim otherwise. It is genuinely useful for showing initiative to an employer or on your LinkedIn profile — but it is not a professional licence.",
        categoryId: 'certificates',
        categoryTitle: "Certificates",
      },
    ],
  },
  {
    id: 'technical-support',
    title: "Technical Support",
    description: "Troubleshooting, device compatibility, and reporting issues.",
    icon: "\ud83d\udd27",
    articles: [
      {
        id: 'app-not-loading',
        question: "The app isn't loading — what should I do?",
        answer: "Try these steps in order:\n\n1. Refresh the page (pull down on mobile, or tap the refresh button)\n2. Clear your browser cache and cookies for successwise.ai\n3. Try a different browser (Chrome, Safari, or Firefox)\n4. Check your internet connection\n5. Try disabling any ad blockers or VPNs temporarily\n\nIf none of these work, email us at support@successwise.ai with your device type and browser — we'll investigate immediately.",
        categoryId: 'technical-support',
        categoryTitle: "Technical Support",
      },
      {
        id: 'browser-support',
        question: "Which browsers and devices are supported?",
        answer: "SuccessWise works on all modern browsers: Safari (iOS 15+), Chrome (Android and desktop), Firefox, and Edge. We recommend keeping your browser updated to the latest version for the best experience. The platform is optimised for smartphones but works great on tablets and laptops too.",
        categoryId: 'technical-support',
        categoryTitle: "Technical Support",
      },
      {
        id: 'report-bug',
        question: "How do I report a bug?",
        answer: "If something isn't working as expected, email us at support@successwise.ai with:\n\n• What you were trying to do\n• What happened instead\n• Your device and browser (e.g. iPhone 15, Safari)\n• A screenshot if possible\n\nWe take every report seriously and typically fix issues within 24-48 hours.",
        categoryId: 'technical-support',
        categoryTitle: "Technical Support",
      },
    ],
  },
]

export const FAQ_ARTICLES: FaqArticle[] = FAQ_CATEGORIES.flatMap((c) => c.articles)

export const POPULAR_IDS = [
  'how-to-login',
  'free-trial',
  'cancel-subscription',
  'why-charged',
  'refund-policy',
  'how-courses-work',
  'do-i-get-a-certificate',
  'how-many-certificates',
] as const

export const MAYA_CHIPS = [
  'How do I cancel?',
  'I want a refund',
  "Can't log in",
  'What does the trial include?',
] as const

export type ContactCategory = {
  id: string
  label: string
  icon: string
  subCategories: { id: string; label: string }[]
  deflectionArticleIds: string[]
}

export const CONTACT_CATEGORIES: ContactCategory[] = [
  {
    id: 'billing',
    label: "Billing & Payments",
    icon: "\ud83d\udcb3",
    subCategories: [
      { id: 'unexpected-charge', label: "I was charged unexpectedly" },
      { id: 'payment-failed', label: "Payment failed" },
      { id: 'wrong-amount', label: "Wrong amount charged" },
      { id: 'need-invoice', label: "I need an invoice" },
    ],
    deflectionArticleIds: ["why-charged", "when-charged", "free-trial"],
  },
  {
    id: 'refund',
    label: "Refund Request",
    icon: "\ud83d\udee1\ufe0f",
    subCategories: [
      { id: 'within-guarantee', label: "Within 30-day guarantee" },
      { id: 'trial-charge', label: "Trial charge" },
      { id: 'refund-other', label: "Other refund reason" },
    ],
    deflectionArticleIds: ["refund-policy", "request-refund", "guarantee-coverage"],
  },
  {
    id: 'cancellation',
    label: "Cancellation",
    icon: "\u270b",
    subCategories: [
      { id: 'cant-find-cancel', label: "Can't find the cancel button" },
      { id: 'cancelled-still-charged', label: "Cancelled but still charged" },
      { id: 'want-to-cancel', label: "I want to cancel" },
    ],
    deflectionArticleIds: ["cancel-subscription", "why-charged"],
  },
  {
    id: 'account',
    label: "Account Access",
    icon: "\ud83d\udd11",
    subCategories: [
      { id: 'cant-login', label: "Can't log in" },
      { id: 'no-code', label: "Not receiving login code" },
      { id: 'locked-out', label: "Locked out of my account" },
      { id: 'delete-account', label: "I want to delete my account" },
    ],
    deflectionArticleIds: ["how-to-login", "app-not-loading"],
  },
  {
    id: 'technical',
    label: "Technical Issue",
    icon: "\ud83d\udd27",
    subCategories: [
      { id: 'app-not-loading', label: "App not loading" },
      { id: 'course-not-working', label: "Course not working" },
      { id: 'progress-lost', label: "Progress lost" },
      { id: 'other-bug', label: "Other bug" },
    ],
    deflectionArticleIds: ["app-not-loading", "browser-support", "report-bug"],
  },
  {
    id: 'other',
    label: "Something Else",
    icon: "\ud83d\udcac",
    subCategories: [
    ],
    deflectionArticleIds: [],
  },
]

export function searchFaq(query: string): FaqArticle[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return FAQ_ARTICLES.filter(
    (a) => a.question.toLowerCase().includes(q) || a.answer.toLowerCase().includes(q),
  )
}

export function matchFaqAnswer(message: string): string | null {
  const q = message.trim().toLowerCase()
  if (!q) return null
  const aliases: Record<string, string> = {
    'how do i cancel?': 'cancel-subscription',
    'i want a refund': 'request-refund',
    "can't log in": 'how-to-login',
    'what does the trial include?': 'free-trial',
  }
  const aliasId = aliases[q]
  if (aliasId) {
    const hit = FAQ_ARTICLES.find((a) => a.id === aliasId)
    if (hit) return hit.answer
  }
  const exact = FAQ_ARTICLES.find((a) => a.question.toLowerCase() === q)
  if (exact) return exact.answer
  const scored = FAQ_ARTICLES.map((a) => {
    const hay = `${a.question} ${a.answer}`.toLowerCase()
    const words = q.split(/[^a-z0-9]+/).filter((w) => w.length > 2)
    const hits = words.filter((w) => hay.includes(w)).length
    return { a, hits, ratio: words.length ? hits / words.length : 0 }
  }).sort((x, y) => y.hits - x.hits || y.ratio - x.ratio)
  const best = scored[0]
  if (best && (best.hits >= 2 || best.ratio >= 0.5)) return best.a.answer
  return null
}
