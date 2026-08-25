import { Link } from 'react-router-dom'
import { CompanyBox, LegalCard, LegalHero, LegalSection } from '@/marketing/components/LegalBlocks'
import { ROUTES } from '@/marketing/data/nav'
import usePageTitle from '@/marketing/hooks/usePageTitle'

export default function TermsPage() {
  usePageTitle('Terms & Conditions — SuccessWise.ai')

  return (
    <>
      <LegalHero title="Terms & Conditions" updated="10 July 2026" />
      <LegalCard>
        <LegalSection title="1. Introduction & Acceptance">
          <p>
            These Terms & Conditions (&quot;Terms&quot;) govern your access to and use of the SuccessWise.ai
            website and platform (the &quot;Service&quot;), operated by:
          </p>
          <CompanyBox>
            <p className="font-semibold text-sw-dark">ClickTech Solutions LTD</p>
            <p className="text-sm text-sw-grey">Trading as SuccessWise.ai</p>
            <p className="text-sm text-sw-grey">Company Number: 09899629</p>
            <p className="text-sm text-sw-grey">
              Registered Office: Leytonstone House, 3 Hanbury Drive,
              <br />
              Leytonstone, London, United Kingdom, E11 1GA
            </p>
          </CompanyBox>
          <p>
            By creating an account, starting a free trial, or purchasing a subscription, you confirm that you
            have read, understood, and agree to be bound by these Terms. If you do not agree, please do not use
            the Service.
          </p>
          <p>
            These Terms form a legally binding agreement between you and ClickTech Solutions LTD. We recommend
            saving or printing a copy for your records.
          </p>
        </LegalSection>

        <LegalSection title="2. Definitions">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>&quot;Service&quot;</strong> — The SuccessWise.ai website, platform, courses, AI Coach,
              and all related features accessible at successwise.ai.
            </li>
            <li>
              <strong>&quot;Account&quot;</strong> — Your registered user account, created with an email
              address and password.
            </li>
            <li>
              <strong>&quot;Subscription&quot;</strong> — A paid membership plan giving you access to premium
              features and course content.
            </li>
            <li>
              <strong>&quot;Content&quot;</strong> — All course material, lessons, quizzes, AI outputs,
              articles, and other educational material provided through the Service.
            </li>
            <li>
              <strong>&quot;User Content&quot;</strong> — Any data, responses, or information you submit via
              the Service, including quiz answers and AI Coach interactions.
            </li>
            <li>
              <strong>&quot;We&quot;, &quot;Us&quot;, &quot;Our&quot;</strong> — ClickTech Solutions LTD,
              trading as SuccessWise.ai.
            </li>
            <li>
              <strong>&quot;You&quot;, &quot;Your&quot;</strong> — The individual accessing or using the
              Service.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="3. Description of Service">
          <p>SuccessWise.ai is a digital self-improvement platform offering:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Bite-sized, expert-curated online courses across mindset, career, business, AI & technology,
              health, and financial wellbeing
            </li>
            <li>A personalised 90-day learning roadmap</li>
            <li>
              An AI Coach that provides contextual guidance and helps you apply lessons to your life
            </li>
            <li>Progress tracking, certificates of completion, and interactive learning tools</li>
            <li>Structured learning paths and featured programmes</li>
          </ul>
          <p>
            The Service is intended for personal development and educational purposes only. It is not a
            substitute for professional advice (medical, legal, financial, or otherwise). For important
            decisions, always consult a qualified professional.
          </p>
          <p>
            We reserve the right to modify, update, or discontinue any feature of the Service at any time. We
            will endeavour to give reasonable notice of material changes that affect your subscription.
          </p>
        </LegalSection>

        <LegalSection title="4. Eligibility">
          <p>
            To use the Service, you must be at least 18 years of age. By using the Service, you confirm that
            you meet this requirement.
          </p>
          <p>
            If you are accessing the Service on behalf of an organisation, you represent that you have
            authority to bind that organisation to these Terms.
          </p>
        </LegalSection>

        <LegalSection title="5. Account Registration & Security">
          <p>To access most features of the Service, you must create an account. You agree to:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Provide accurate, current, and complete registration information</li>
            <li>Keep your login credentials confidential and not share your account with others</li>
            <li>
              Notify us immediately at{' '}
              <a href="mailto:support@successwise.ai" className="text-sw-blue hover:underline">
                support@successwise.ai
              </a>{' '}
              if you suspect unauthorised access to your account
            </li>
            <li>Be responsible for all activity that occurs under your account</li>
          </ul>
          <p>
            Each subscription is for a single named user. Sharing account credentials with third parties is a
            breach of these Terms and may result in immediate account termination without refund.
          </p>
        </LegalSection>

        <LegalSection title="6. Subscriptions, One-Time Purchases & Billing">
          <p>
            Access to premium content requires an active paid subscription or a qualifying one-time purchase.
            Full details of current pricing, available plans, and billing cycles are set out on our{' '}
            <Link to={ROUTES.billing} className="text-sw-blue hover:underline">
              Billing
            </Link>{' '}
            page.
          </p>
          <h3 className="font-semibold text-sw-dark">Subscription Plans</h3>
          <p>
            We offer three subscription plans: Monthly (billed monthly), Quarterly (billed every 3 months),
            and Annual (billed yearly). Longer plans offer a lower price per month compared to the Monthly
            plan.
          </p>
          <h3 className="font-semibold text-sw-dark">$1 Trial (7 Days)</h3>
          <p>
            All subscription plans include a 7-day trial for $1.00. You will have full access to the Service
            during the trial. At the end of the 7-day trial, your subscription will automatically convert to a
            paid plan at the full price unless you cancel before the trial expires. If you cancel during the
            trial, no further charges are made, and we will refund the $1.00 trial fee on request.
          </p>
          <h3 className="font-semibold text-sw-dark">One-Time Purchases</h3>
          <p>
            We also offer one-time purchase products (such as standalone certification courses). These are
            charged once at the listed price, do not auto-renew, and grant lifetime access to the purchased
            content. One-time purchases are not subscription plans and do not include a trial period.
          </p>
          <h3 className="font-semibold text-sw-dark">Automatic Renewal</h3>
          <p>
            Subscriptions renew automatically at the end of each billing period (monthly, every 3 months, or
            annually depending on your plan) unless you cancel before the renewal date. You authorise us to
            charge your payment method on each renewal date at the then-current subscription price.
          </p>
          <h3 className="font-semibold text-sw-dark">Price Changes</h3>
          <p>
            We may change subscription prices from time to time. We will give you at least 30 days&apos; notice
            of any price increase by email or in-app notification. If you do not wish to continue at the new
            price, you may cancel before your next renewal date.
          </p>
          <h3 className="font-semibold text-sw-dark">Payment Processing</h3>
          <p>
            All payments are processed securely by Stripe, Inc., a PCI-DSS Level 1 certified payment
            processor. We do not store your card details. By providing your payment information, you authorise
            us to charge your selected payment method for future payments in accordance with these Terms.
          </p>
        </LegalSection>

        <LegalSection title="7. Cancellation & Refunds">
          <p>
            You may cancel your subscription at any time. Cancellation takes effect at the end of your current
            billing period — you retain full access until then.
          </p>
          <p>
            We offer an industry-leading 30-day money-back guarantee on the first full subscription charge
            after your trial period, and on all one-time purchases. If you are not satisfied within the first
            30 days of your paid subscription or purchase, contact us for a full refund — no questions asked.
            Full details are set out on our{' '}
            <Link to={ROUTES.refund} className="text-sw-blue hover:underline">
              Refund Policy
            </Link>{' '}
            page.
          </p>
          <p>
            The $1.00 trial fee is also refundable — if you would like it back, contact us and we will return
            it.
          </p>
          <p>
            To cancel, log in and tap Profile in the bottom navigation bar, then Cancel Subscription under
            &quot;My Subscription&quot;. You can also contact us at{' '}
            <a href="mailto:support@successwise.ai" className="text-sw-blue hover:underline">
              support@successwise.ai
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="8. Acceptable Use">
          <p>
            You agree to use the Service only for lawful purposes and in accordance with these Terms. You must
            not:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Copy, reproduce, distribute, or resell any part of the Content without our prior written consent
            </li>
            <li>Use the Service to develop a competing product or service</li>
            <li>Use automated tools (bots, scrapers, crawlers) to extract Content from the Service</li>
            <li>Attempt to gain unauthorised access to any part of the Service or its infrastructure</li>
            <li>Upload or transmit malicious code, viruses, or other harmful material</li>
            <li>Harass, abuse, or harm any person through the Service</li>
            <li>Use the Service for any illegal purpose or in violation of any applicable law or regulation</li>
            <li>Impersonate any person or misrepresent your affiliation with any organisation</li>
          </ul>
          <p>
            Breach of these provisions may result in immediate suspension or termination of your account
            without notice and without refund.
          </p>
        </LegalSection>

        <LegalSection title="9. Intellectual Property">
          <p>
            All Content on the Service — including course material, lesson text, images, audio, video,
            graphics, trademarks, and the SuccessWise.ai brand — is owned by or licensed to ClickTech
            Solutions LTD and is protected by UK and international copyright, trademark, and other
            intellectual property laws.
          </p>
          <p>
            Your subscription grants you a personal, non-exclusive, non-transferable, revocable licence to
            access and use the Content for your own personal, non-commercial education. No other rights are
            granted.
          </p>
          <p>
            You retain ownership of any User Content you submit. By submitting User Content, you grant us a
            non-exclusive, royalty-free, worldwide licence to use, store, and process it solely to provide and
            improve the Service. We will never sell your User Content to third parties.
          </p>
        </LegalSection>

        <LegalSection title="10. AI Coach & AI-Generated Content">
          <p>
            The Service includes an AI Coach feature powered by third-party AI model providers (including but
            not limited to Anthropic and OpenAI). Please be aware of the following:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              AI-generated responses are for educational and inspirational purposes only and do not constitute
              professional advice of any kind
            </li>
            <li>
              AI outputs may occasionally be inaccurate, incomplete, or not suited to your specific
              circumstances
            </li>
            <li>
              Your interactions with the AI Coach are processed under strict data processing agreements; your
              data is not used to train AI models
            </li>
            <li>Do not share sensitive personal, financial, medical, or legal information with the AI Coach</li>
          </ul>
          <p>
            We are not liable for any decisions made or actions taken in reliance on AI-generated content.
          </p>
        </LegalSection>

        <LegalSection title="11. Disclaimers">
          <h3 className="font-semibold text-sw-dark">Educational Content Only</h3>
          <p>
            All Content on SuccessWise.ai is provided for educational and informational purposes only. Nothing
            on the Service constitutes professional medical, psychological, legal, financial, or investment
            advice. Individual results will vary. Always seek the advice of a qualified professional before
            making decisions based on information obtained through the Service.
          </p>
          <h3 className="font-semibold text-sw-dark">No Guarantee of Results</h3>
          <p>
            We do not guarantee any specific outcomes, improvements, or results from using the Service.
            Success depends on many factors, including your individual effort, circumstances, and background.
          </p>
          <h3 className="font-semibold text-sw-dark">Service Availability</h3>
          <p>
            We aim to provide a reliable and uninterrupted service, but we do not guarantee that the Service
            will be available at all times or error-free. We may need to carry out maintenance or updates that
            temporarily affect availability.
          </p>
        </LegalSection>

        <LegalSection title="12. Limitation of Liability">
          <p>To the fullest extent permitted by English law:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              We shall not be liable for any indirect, incidental, special, consequential, or punitive
              damages, including loss of profit, revenue, data, or business opportunities arising from your
              use of the Service
            </li>
            <li>
              Our total aggregate liability to you arising under or in connection with these Terms shall not
              exceed the total amount paid by you in the 12 months preceding the claim
            </li>
            <li>
              Nothing in these Terms excludes or limits our liability for death or personal injury caused by
              negligence, fraud, or any other liability that cannot lawfully be excluded
            </li>
          </ul>
          <p>
            If you are a consumer under the Consumer Rights Act 2015, you may have statutory rights that
            cannot be excluded. These Terms do not affect those rights.
          </p>
        </LegalSection>

        <LegalSection title="13. Third-Party Links & Services">
          <p>
            The Service may contain links to third-party websites, tools, or services. These are provided for
            convenience only. We have no control over, and accept no responsibility for, the content, privacy
            practices, or terms of those third-party services.
          </p>
        </LegalSection>

        <LegalSection title="14. Indemnification">
          <p>
            You agree to indemnify, defend, and hold harmless ClickTech Solutions LTD, its directors,
            employees, and agents from and against any claims, liabilities, damages, losses, and expenses
            (including reasonable legal fees) arising out of or in connection with:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Your breach of these Terms</li>
            <li>Your use of the Service in an unlawful or unauthorised manner</li>
            <li>Any User Content you submit that infringes a third party&apos;s rights</li>
          </ul>
        </LegalSection>

        <LegalSection title="15. Termination">
          <p>
            We may suspend or terminate your account at any time if we reasonably believe you have breached
            these Terms or are engaged in conduct harmful to the Service, other users, or third parties. Where
            possible, we will give you prior notice and an opportunity to remedy the breach.
          </p>
          <p>On termination of your account:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Your right to access the Service ceases immediately</li>
            <li>
              Refunds for unused subscription time (where applicable) are governed by our Refund Policy
            </li>
            <li>
              Clauses relating to intellectual property, limitation of liability, and governing law survive
              termination
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="16. Governing Law & Jurisdiction">
          <p>
            These Terms are governed by and construed in accordance with the laws of England and Wales. Any
            dispute arising from or in connection with these Terms shall be subject to the exclusive
            jurisdiction of the courts of England and Wales, except where you are a consumer and are entitled
            to bring proceedings in the courts of another jurisdiction.
          </p>
        </LegalSection>

        <LegalSection title="17. Consumer Rights (UK)">
          <p>
            If you are a consumer in the United Kingdom, you have statutory rights under the Consumer Rights
            Act 2015 and related legislation. In particular:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Under the Consumer Contracts Regulations 2013, you have a 14-day statutory right to cancel. Our
              30-day money-back guarantee exceeds this statutory right — you may request a full refund within
              30 days of your first full charge (subscription) or purchase (one-time), no questions asked. By
              accessing the Service immediately (as is standard), the 30-day guarantee replaces and supersedes
              the 14-day statutory cooling-off right.
            </li>
            <li>
              The $1.00 trial fee is a reduced-price introductory charge, and we will refund it on request.
            </li>
          </ul>
          <p>
            Please see our{' '}
            <Link to={ROUTES.refund} className="text-sw-blue hover:underline">
              Refund Policy
            </Link>{' '}
            for full details of how we handle cancellations and refund requests.
          </p>
        </LegalSection>

        <LegalSection title="18. Changes to These Terms">
          <p>
            We may update these Terms from time to time. When we make material changes, we will update the
            &quot;Last Updated&quot; date at the top of this page and notify you by email or in-app
            notification with at least 14 days&apos; notice before the changes take effect.
          </p>
          <p>
            Your continued use of the Service after the effective date of any changes constitutes your
            acceptance of the revised Terms. If you do not agree with the changes, you must cancel your
            subscription before they take effect.
          </p>
        </LegalSection>

        <LegalSection title="19. Contact Us">
          <p>If you have any questions about these Terms or our Service, please contact us:</p>
          <CompanyBox>
            <p className="font-semibold text-sw-dark">ClickTech Solutions LTD</p>
            <p className="text-sm text-sw-grey">Trading as SuccessWise.ai</p>
            <p className="text-sm text-sw-grey">Company Number: 09899629</p>
            <p className="text-sm text-sw-grey">
              Registered Office: Leytonstone House, 3 Hanbury Drive,
              <br />
              Leytonstone, London, United Kingdom, E11 1GA
            </p>
            <div className="mt-3 space-y-1">
              <p className="text-sm">
                General enquiries:{' '}
                <a href="mailto:contact@clicktech.com" className="text-sw-blue hover:underline">
                  contact@clicktech.com
                </a>
              </p>
              <p className="text-sm">
                Customer support:{' '}
                <a href="mailto:support@successwise.ai" className="text-sw-blue hover:underline">
                  support@successwise.ai
                </a>
              </p>
            </div>
          </CompanyBox>
        </LegalSection>
      </LegalCard>
    </>
  )
}
