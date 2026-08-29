import { Link } from 'react-router-dom'
import { COMPANY } from '@/marketing/data/company'
import { ROUTES } from '@/marketing/data/nav'
import usePageTitle from '@/marketing/hooks/usePageTitle'

const MONTHLY = ['Full access to all courses', 'AI Coach & roadmap', 'Cancel any time'] as const
const QUARTERLY = ['Everything in Monthly', 'Better value per month', 'Cancel any time'] as const
const ANNUAL = ['Everything in Monthly', 'Best value — lowest per month', 'Cancel any time'] as const
const ONE_TIME = [
  'Pay once, access forever',
  'No recurring charges',
  '14-day money-back guarantee included',
  'Certificate of completion included',
] as const

function CheckItem({ children }: { children: string }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-0.5 text-sw-blue">✓</span> {children}
    </li>
  )
}

export default function BillingPage() {
  usePageTitle('Billing & Plans — Mindora Academy')

  return (
    <>
      <section className="bg-sw-dark px-4 py-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-white/50 uppercase">
            Plans & Pricing
          </p>
          <h1 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">Billing & Plans</h1>
          <p className="mx-auto max-w-xl text-base text-white/70">
            Everything you need to know about your {COMPANY.serviceName} subscription — plans,
            billing cycles, payments, and how to manage your account.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-8 shadow-sm sm:p-10">
            <h2 className="mb-2 text-xl font-bold text-sw-dark sm:text-2xl">Subscription Plans</h2>
            <p className="mb-4 text-sw-grey">
              All subscription plans start with a{' '}
              <strong className="text-sw-dark">7-day trial for just $1.00</strong>. After your
              trial, you&apos;ll be billed at the full price according to the plan you chose. Every
              plan includes full access to every course, your AI Coach, personalised roadmap,
              certificates of completion, and every new course we add — at no extra charge.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-sw-grey-border p-5">
                <p className="mb-2 text-sm font-semibold tracking-wide text-sw-grey uppercase">
                  Monthly
                </p>
                <p className="mb-4 text-sm text-sw-grey">
                  Billed monthly after your $1 trial. Cancel any time.
                </p>
                <ul className="space-y-2 text-sm text-sw-grey">
                  {MONTHLY.map((item) => (
                    <CheckItem key={item}>{item}</CheckItem>
                  ))}
                </ul>
              </div>
              <div
                className="relative rounded-2xl border-2 p-5"
                style={{ borderColor: 'hsl(var(--sw-blue))' }}
              >
                <div
                  className="absolute -top-3 left-5 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white"
                  style={{ backgroundColor: 'hsl(var(--sw-blue))' }}
                >
                  MOST POPULAR
                </div>
                <p className="mb-2 text-sm font-semibold tracking-wide text-sw-grey uppercase">
                  Quarterly
                </p>
                <p className="mb-4 text-sm text-sw-grey">
                  Billed every 3 months. Save vs monthly.
                </p>
                <ul className="space-y-2 text-sm text-sw-grey">
                  {QUARTERLY.map((item) => (
                    <CheckItem key={item}>{item}</CheckItem>
                  ))}
                </ul>
              </div>
              <div
                className="relative rounded-2xl border-2 p-5"
                style={{ borderColor: 'hsl(var(--sw-success))' }}
              >
                <div
                  className="absolute -top-3 left-5 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white"
                  style={{ backgroundColor: 'hsl(var(--sw-success))' }}
                >
                  BEST VALUE
                </div>
                <p className="mb-2 text-sm font-semibold tracking-wide text-sw-grey uppercase">
                  Annual
                </p>
                <p className="mb-4 text-sm text-sw-grey">
                  Billed yearly. Lowest price per month.
                </p>
                <ul className="space-y-2 text-sm text-sw-grey">
                  {ANNUAL.map((item) => (
                    <CheckItem key={item}>{item}</CheckItem>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-6 text-center text-sm leading-relaxed text-sw-grey">
              All subscription plans include a 7-day trial for $1.00. After day 7, you&apos;ll be
              billed at the full plan price. Cancel any time before day 7 and no further charges
              apply.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm sm:p-10">
            <h2 className="mb-2 text-xl font-bold text-sw-dark sm:text-2xl">One-Time Purchases</h2>
            <p className="mb-4 text-sw-grey">
              We also offer standalone courses and certification programmes as one-time purchases.
              These are charged once at the listed price, do not auto-renew, and grant you lifetime
              access to the purchased content.
            </p>
            <ul className="space-y-2 text-sm text-sw-grey">
              {ONE_TIME.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </div>

          <div className="space-y-8 rounded-2xl bg-white p-8 shadow-sm sm:p-10">
            <h2 className="border-b border-sw-grey-border pb-3 text-xl font-bold text-sw-dark sm:text-2xl">
              Billing FAQs
            </h2>
            <div>
              <h3 className="mb-2 font-semibold text-sw-dark">When will I be charged?</h3>
              <div className="space-y-2 leading-relaxed text-sw-grey">
                <p>
                  Subscription plans start with a <strong>7-day trial for $1.00</strong>. After day
                  7, you will be billed automatically at the full price according to your chosen
                  plan (monthly, every 3 months, or annually). You&apos;ll receive an email receipt
                  after every payment. Cancel any time before your trial ends to avoid further
                  charges. One-time purchases are charged immediately at the listed price.
                </p>
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-sw-dark">What payment methods do you accept?</h3>
              <div className="space-y-2 leading-relaxed text-sw-grey">
                <p>
                  We accept all major debit and credit cards (Visa, Mastercard, American Express)
                  via our secure payment provider, <strong>Stripe</strong>. We do not store your
                  card details — Stripe handles all payment processing securely and is PCI-DSS
                  Level 1 certified.
                </p>
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-sw-dark">Can I switch between plans?</h3>
              <div className="space-y-2 leading-relaxed text-sw-grey">
                <p>
                  Yes. Tap <strong>Profile</strong> in the bottom navigation bar, then{' '}
                  <strong>Manage Subscription</strong> under &quot;My Subscription&quot; to switch
                  between the Monthly, Quarterly, and Annual plans. If you upgrade to a longer plan,
                  the change takes effect immediately and we&apos;ll credit any unused days from
                  your current billing period. Downgrades take effect at the end of your current
                  period.
                </p>
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-sw-dark">How do I cancel my subscription?</h3>
              <div className="space-y-2 leading-relaxed text-sw-grey">
                <p>
                  Log in, tap <strong>Profile</strong> in the bottom navigation bar, then select{' '}
                  <strong>Cancel Subscription</strong> under &quot;My Subscription&quot;. Your
                  access continues until the end of your current billing period. You can also{' '}
                  <Link to={`${ROUTES.support}?chat=open`} className="font-medium text-sw-blue hover:underline">
                    ask Maya in the Support Centre
                  </Link>{' '}
                  and she&apos;ll walk you through it, or pass you to a human who can cancel it for
                  you.
                </p>
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-sw-dark">
                What happens to my progress when I cancel?
              </h3>
              <div className="space-y-2 leading-relaxed text-sw-grey">
                <p>
                  Your course progress, certificates, and AI Coach history are retained for 90 days
                  after your subscription ends. If you resubscribe within that window, everything
                  will be exactly as you left it. After 90 days, inactive account data may be
                  deleted in accordance with our{' '}
                  <Link to={ROUTES.privacy} className="text-sw-blue hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-sw-dark">Do you offer refunds?</h3>
              <div className="space-y-2 leading-relaxed text-sw-grey">
                <p>
                  Yes. We offer an industry-leading <strong>14-day money-back guarantee</strong> on
                  your first full subscription charge (after the trial) and on all one-time
                  purchases. If you&apos;re not satisfied within 14 days, contact us for a full
                  refund — no questions asked. We&apos;ll also refund the $1.00 trial fee if you ask
                  for it. Please read our{' '}
                  <Link to={ROUTES.refund} className="font-medium text-sw-blue hover:underline">
                    Refund Policy
                  </Link>{' '}
                  for complete details.
                </p>
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-sw-dark">Will I receive a VAT receipt?</h3>
              <div className="space-y-2 leading-relaxed text-sw-grey">
                <p>
                  Yes. A receipt is automatically sent to your registered email address after every
                  payment. Our VAT registration details are included on each receipt. If you need a
                  duplicate receipt,
                  <Link to={`${ROUTES.support}?chat=open`} className="font-medium text-sw-blue hover:underline">
                    ask Maya in the Support Centre
                  </Link>{' '}
                  and she&apos;ll send it over or pass you to a human who can.
                </p>
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-sw-dark">
                Do you offer team or business plans?
              </h3>
              <div className="space-y-2 leading-relaxed text-sw-grey">
                <p>
                  We&apos;re working on team and business pricing. If you need licences for your
                  team or organisation, get in touch at{' '}
                  <a href={`mailto:${COMPANY.email}`} className="text-sw-blue hover:underline">
                    {COMPANY.email}
                  </a>{' '}
                  and we&apos;ll be happy to discuss options.
                </p>
              </div>
            </div>
          </div>

          <div
            className="rounded-2xl p-8 text-center"
            style={{ backgroundColor: 'hsl(var(--sw-blue-light))' }}
          >
            <h3 className="mb-2 text-lg font-bold text-sw-dark">Still have a billing question?</h3>
            <p className="mb-4 text-sm text-sw-grey">
              Maya can answer most billing questions straight away — answers in minutes, 24/7. A
              human replies within 1-3 business days if you need one.
            </p>
            <Link
              to={`${ROUTES.support}?chat=open`}
              className="inline-block rounded-full bg-sw-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sw-blue-hover"
            >
              Ask Maya
            </Link>
          </div>

          <p className="pb-4 text-center text-sm text-sw-grey">
            Related:{' '}
            <Link to={ROUTES.terms} className="text-sw-blue hover:underline">
              Terms & Conditions
            </Link>{' '}
            ·{' '}
            <Link to={ROUTES.refund} className="text-sw-blue hover:underline">
              Refund Policy
            </Link>{' '}
            ·{' '}
            <Link to={ROUTES.privacy} className="text-sw-blue hover:underline">
              Privacy Policy
            </Link>{' '}
            ·{' '}
            <Link to={ROUTES.contact} className="text-sw-blue hover:underline">
              Contact
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}
