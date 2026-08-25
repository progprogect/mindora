import { Link } from 'react-router-dom'
import { LegalCard, LegalHero, LegalSection } from '@/marketing/components/LegalBlocks'
import { ROUTES } from '@/marketing/data/nav'
import usePageTitle from '@/marketing/hooks/usePageTitle'

export default function SubscriptionTermsPage() {
  usePageTitle('Subscription Terms — SuccessWise.ai')

  return (
    <>
      <LegalHero title="Subscription Terms" updated="6 July 2026" />
      <LegalCard>
        <p className="leading-relaxed text-sw-grey">
          These Subscription Terms (&quot;Subscription Terms&quot;) govern your subscription to SuccessWise.ai
          (&quot;Platform&quot;, &quot;Service&quot;), operated by ClickTech Solutions LTD (&quot;we&quot;,
          &quot;us&quot;, &quot;our&quot;). By subscribing, you agree to these terms in addition to our{' '}
          <Link to={ROUTES.terms} className="text-sw-blue hover:underline">
            Terms and Conditions
          </Link>{' '}
          and{' '}
          <Link to={ROUTES.privacy} className="text-sw-blue hover:underline">
            Privacy Policy
          </Link>
          .
        </p>

        <LegalSection title="1. Subscription Plans">
          <p>We offer the following subscription plans:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>1-Month Plan</strong> — billed monthly
            </li>
            <li>
              <strong>6-Month Plan</strong> — billed every 6 months
            </li>
            <li>
              <strong>12-Month Plan</strong> — billed annually
            </li>
          </ul>
          <p>
            Plan pricing is displayed on our website at the time of purchase. All prices are in USD unless
            otherwise stated.
          </p>
        </LegalSection>

        <LegalSection title="2. Free Trial">
          <p>
            We may offer a free trial period (typically 7 days) for new subscribers. During the trial, you
            will have full access to the Platform. If you do not cancel before the trial ends, your
            subscription will automatically convert to a paid plan and your payment method will be charged.
          </p>
          <p>
            You will not be charged during the trial period. You may cancel at any time before the trial ends
            without charge.
          </p>
        </LegalSection>

        <LegalSection title="3. Billing & Payment">
          <ul className="list-disc space-y-2 pl-5">
            <li>All payments are processed securely via Stripe.</li>
            <li>Your subscription will automatically renew at the end of each billing cycle unless cancelled.</li>
            <li>You authorise us to charge your chosen payment method on a recurring basis.</li>
            <li>
              If a payment fails, we may retry the charge and/or suspend your access until payment is received.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="4. Promotional Discounts">
          <p>
            From time to time, we may offer promotional discounts or coupons. These apply to the initial
            billing period only unless explicitly stated otherwise. After the promotional period ends, your
            subscription will renew at the standard rate displayed at checkout.
          </p>
        </LegalSection>

        <LegalSection title="5. Cancellation">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              You may cancel your subscription at any time from your account settings or by contacting
              support.
            </li>
            <li>
              Upon cancellation, you will retain access to the Platform until the end of your current billing
              period.
            </li>
            <li>
              No partial refunds will be issued for unused time within a billing cycle, unless covered by our
              refund policy.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="6. Refund Policy">
          <p>
            We offer a 30-day money-back guarantee from the date of your first payment. If you are unsatisfied
            with the Platform, contact our support team within 30 days of your first charge and we will issue
            a full refund.
          </p>
          <p>
            Refund requests made after 30 days will be reviewed on a case-by-case basis. Refunds are not
            available for renewal charges after the first billing cycle.
          </p>
          <p>
            For full details, see our{' '}
            <Link to={ROUTES.refund} className="text-sw-blue hover:underline">
              Refund Policy
            </Link>
            .
          </p>
        </LegalSection>

        <LegalSection title="7. Changes to Pricing">
          <p>
            We reserve the right to change subscription pricing. Existing subscribers will be notified at
            least 30 days in advance. Price changes will apply to the next billing cycle after notification.
          </p>
        </LegalSection>

        <LegalSection title="8. Account Access">
          <p>
            Your subscription is personal to you. Sharing login credentials or allowing others to access your
            account is prohibited. We reserve the right to suspend accounts found to be sharing access.
          </p>
        </LegalSection>

        <LegalSection title="9. Service Availability">
          <p>
            We aim to provide continuous access to the Platform but do not guarantee uninterrupted service.
            Scheduled maintenance, updates, and unforeseen issues may occasionally affect availability. We
            will endeavour to minimise disruption.
          </p>
        </LegalSection>

        <LegalSection title="10. Termination by Us">
          <p>
            We may terminate or suspend your subscription without refund if you violate these terms, our
            Terms and Conditions, or engage in fraudulent or abusive behaviour.
          </p>
        </LegalSection>

        <LegalSection title="11. Contact Us">
          <p>For subscription enquiries, cancellations, or refund requests:</p>
          <p>
            Email:{' '}
            <a href="mailto:support@successwise.ai" className="text-sw-blue hover:underline">
              support@successwise.ai
            </a>
          </p>
          <p>
            Support page:{' '}
            <Link to={ROUTES.support} className="text-sw-blue hover:underline">
              successwise.ai/support
            </Link>
          </p>
          <p>
            ClickTech Solutions LTD. T/A. SuccessWise. These Subscription Terms are governed by the laws of
            England and Wales.
          </p>
        </LegalSection>
      </LegalCard>
    </>
  )
}
