import { Link } from 'react-router-dom'
import { CompanyBox, CompanyDetails, LegalSection } from '@/marketing/components/LegalBlocks'
import { COMPANY } from '@/marketing/data/company'
import { ROUTES } from '@/marketing/data/nav'
import usePageTitle from '@/marketing/hooks/usePageTitle'

export default function RefundPolicyPage() {
  usePageTitle('14-Day Money-Back Guarantee — Mindora Academy Refund Policy')

  return (
    <>
      <section className="bg-sw-dark px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold tracking-widest text-white/50 uppercase">Legal</p>
          <div className="mb-5 flex justify-center">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{
                backgroundColor: 'hsl(142 71% 45% / 0.15)',
                border: '2px solid hsl(142 71% 45% / 0.4)',
              }}
            >
              <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path
                  d="M16 3 L27 7.5 V16 C27 22.5 22 27.5 16 30 C10 27.5 5 22.5 5 16 V7.5 Z"
                  fill="hsl(142 71% 45% / 0.15)"
                  stroke="hsl(142 71% 45%)"
                  strokeWidth="1.5"
                />
                <path
                  d="M11 16l4 4 7-7"
                  stroke="hsl(142 71% 45%)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <h1 className="mb-3 text-3xl font-extrabold text-white sm:text-4xl">
            14-Day Money-Back Guarantee
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-white/60">
            We&apos;re confident {COMPANY.serviceName} will deliver real results. If it doesn&apos;t,
            we&apos;ll give you every penny back — no questions asked.
          </p>
          <p className="mt-4 text-xs text-white/30">Refund Policy · Last updated: 10 July 2026</p>
        </div>
      </section>

      <div
        className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6"
        style={{ marginTop: '-1px', marginBottom: '-1rem' }}
      >
        <div
          className="flex flex-col items-center gap-5 rounded-2xl p-6 shadow-lg sm:flex-row sm:p-8"
          style={{
            background: 'linear-gradient(135deg, hsl(142 71% 45% / 0.08) 0%, hsl(142 71% 45% / 0.04) 100%)',
            border: '2px solid hsl(142 71% 45% / 0.25)',
          }}
        >
          <div className="flex-shrink-0 text-center">
            <div className="text-4xl font-extrabold" style={{ color: 'hsl(142 71% 40%)' }}>
              14
            </div>
            <div className="text-xs font-bold tracking-wide uppercase" style={{ color: 'hsl(142 71% 40%)' }}>
              Days
            </div>
          </div>
          <div>
            <p className="mb-1 text-lg font-bold text-sw-dark">
              Try {COMPANY.serviceName} completely risk-free
            </p>
            <p className="text-sm leading-relaxed text-sw-grey">
              If you&apos;re not happy with your progress in the first 14 days after your full
              subscription charge or one-time purchase — for any reason — contact us and we&apos;ll
              issue a full refund. No lengthy forms, no interrogation, no hard feelings.
            </p>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4 pt-10 pb-14 sm:px-6">
        <div className="space-y-10 rounded-2xl bg-white p-8 shadow-sm sm:p-12">
          <LegalSection title="Our Guarantee in Plain English">
            <p>
              We believe {COMPANY.serviceName} delivers real, measurable change — in how you think,
              how you work, and how you grow. So we back it with an industry-leading{' '}
              <strong>full 14-day money-back guarantee</strong> on all paid subscriptions and
              one-time purchases.
            </p>
            <p>
              If you&apos;re not satisfied within your first 14 days of your paid subscription
              charge or one-time purchase, contact our team and we&apos;ll refund you in full. No
              questions asked. No awkward conversations.
            </p>
            <p>
              This guarantee <strong>exceeds</strong> the 14-day statutory cooling-off period
              required by UK law (Consumer Contracts Regulations 2013) — because we believe in our
              product that much.
            </p>
            <p>
              Refunds for courses are available within 14 calendar days from the date of payment
              upon the user&apos;s request. All subscriptions (including Basic, Plus, Creator, Make,
              N8N, Full, Pro, access to Zoom sessions, live streams, and Telegram bots) are by
              default non-refundable, except in the cases described below. The money-back guarantee
              is an exception under which a refund is possible if all of the following conditions
              are met simultaneously: (a) the request is submitted within 14 days from the date of
              purchase and before the end of the subscription period; (b) completion of the program
              for at least 14 consecutive days + receiving feedback from a curator/trainer; (c)
              screenshots from the personal account confirming completion of 14 or more lessons.
            </p>
          </LegalSection>

          <LegalSection title="Who This Applies To">
            <p>
              All subscription plans start with a <strong>7-day trial for $1.00</strong>. The 14-day
              money-back guarantee applies from the date of your <strong>first full charge</strong>{' '}
              (i.e. the day your trial converts to a paid subscription at the full price).
            </p>
            <p className="mt-4 mb-2 font-semibold text-sw-dark">Subscriptions:</p>
            <ul className="list-disc space-y-2 pl-5 text-sw-grey">
              <li>
                <strong>Monthly Plan</strong> — 14-day guarantee from the date of your first full
                charge (after the 7-day $1 trial)
              </li>
              <li>
                <strong>Quarterly Plan</strong> — 14-day guarantee from the date of your first full
                charge (after the 7-day $1 trial)
              </li>
              <li>
                <strong>Annual Plan</strong> — 14-day guarantee from the date of your first full
                charge (after the 7-day $1 trial)
              </li>
            </ul>
            <p className="mt-4 mb-2 font-semibold text-sw-dark">One-Time Purchases:</p>
            <ul className="list-disc space-y-2 pl-5 text-sw-grey">
              <li>
                <strong>Standalone courses &amp; certifications</strong> — 14-day guarantee from the
                date of purchase
              </li>
            </ul>
            <p className="mt-4">
              The $1.00 trial fee is refundable on request — just ask and we&apos;ll return it. The
              14-day guarantee applies <strong>once per customer</strong> on their first
              subscription. It does not apply to repeat subscriptions (i.e. if you cancel, claim a
              refund, then resubscribe).
            </p>
          </LegalSection>

          <LegalSection title="How to Request a Refund">
            <p>It takes less than 2 minutes. Just email us:</p>
            <CompanyBox>
              <p className="mb-1 font-bold text-sw-dark">
                <a href={`mailto:${COMPANY.email}`} className="text-lg text-sw-blue hover:underline">
                  {COMPANY.email}
                </a>
              </p>
              <p className="mt-2 mb-1 text-sm text-sw-grey">Please include:</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-sw-grey">
                <li>Your name and account email address</li>
                <li>The date of your original purchase</li>
                <li>That&apos;s it — no reason required</li>
              </ul>
            </CompanyBox>
            <p>
              We aim to respond within <strong>1-3 business days</strong>. Approved refunds are
              processed back to your original payment method and typically appear within{' '}
              <strong>5–10 business days</strong>, depending on your bank or card provider.
            </p>
          </LegalSection>

          <LegalSection title="After the 14-Day Window">
            <p>
              After 14 days, we no longer offer refunds as standard — but we&apos;re always
              reasonable. We consider requests in genuine exceptional circumstances:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sw-grey">
              <li>
                <strong>Technical failure</strong> — If a verified bug or outage prevented you from
                accessing the platform for an extended period, we&apos;ll offer a fair resolution
                (credit extension or partial refund)
              </li>
              <li>
                <strong>Accidental duplicate charge</strong> — Refunded immediately
              </li>
              <li>
                <strong>Serious illness or bereavement</strong> — Reviewed case-by-case with
                compassion. Please get in touch
              </li>
            </ul>
          </LegalSection>

          <LegalSection title="Cancellations">
            <p>Cancelling your subscription is separate from requesting a refund. When you cancel:</p>
            <ul className="list-disc space-y-2 pl-5 text-sw-grey">
              <li>Your access continues until the end of your current billing period</li>
              <li>No further charges are made after that date</li>
              <li>
                Cancellation does not automatically trigger a refund — submit a separate refund
                request if you&apos;re within the 14-day window
              </li>
            </ul>
            <p>
              To cancel, tap <strong>Profile</strong> in the app&apos;s bottom navigation bar, then{' '}
              <strong>Cancel Subscription</strong> under &quot;My Subscription&quot;. You can also
              email{' '}
              <a href={`mailto:${COMPANY.email}`} className="text-sw-blue hover:underline">
                {COMPANY.email}
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection title="$1 Trial Period">
            <p>
              All subscription plans include a <strong>7-day trial for $1.00</strong>. This gives
              you full access to the platform at a reduced introductory price. If you do not cancel
              before day 7, your subscription will automatically convert to a paid plan at the full
              price and your payment method will be charged. Your{' '}
              <strong>14-day money-back guarantee begins from that first full charge date</strong>.
            </p>
            <p>
              If you cancel during the trial, no further charges are made. If you&apos;d also like
              the $1.00 trial fee returned, just ask and we&apos;ll refund it.
            </p>
          </LegalSection>

          <LegalSection title="Chargebacks & Payment Disputes">
            <p>
              Please contact us before initiating a chargeback. We can almost always resolve billing
              issues faster and more favourably than a formal bank dispute. If a chargeback is
              filed, your account will be suspended pending investigation.
            </p>
          </LegalSection>

          <LegalSection title="Contact Us">
            <p>Questions about this policy? We&apos;re happy to help.</p>
            <CompanyDetails />
            <p>
              Related:{' '}
              <Link to={ROUTES.terms} className="text-sw-blue hover:underline">
                Terms &amp; Conditions
              </Link>{' '}
              ·{' '}
              <Link to={ROUTES.billing} className="text-sw-blue hover:underline">
                Billing &amp; Plans
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
          </LegalSection>
        </div>
      </main>
    </>
  )
}
