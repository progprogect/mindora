import { Link } from 'react-router-dom'
import { CompanyDetails, LegalCard, LegalHero, LegalSection } from '@/marketing/components/LegalBlocks'
import { COMPANY } from '@/marketing/data/company'
import { ROUTES } from '@/marketing/data/nav'
import usePageTitle from '@/marketing/hooks/usePageTitle'

function Processor({ title, data }: { title: string; data: string }) {
  return (
    <div className="rounded-xl bg-sw-grey-light p-5">
      <h3 className="mb-2 font-semibold text-sw-dark">{title}</h3>
      <p>
        <strong>Personal Data:</strong> {data}
      </p>
    </div>
  )
}

export default function PrivacyPolicyPage() {
  usePageTitle('Privacy Policy — Mindora Academy')

  return (
    <>
      <LegalHero title="Privacy Policy" updated="15 October 2025" />
      <LegalCard>
        <LegalSection title="How We Process Personal Data">
          <p>Personal data is processed for the following purposes and using the following services:</p>
          <Processor
            title="Analytics — Meta Events Manager and Google Analytics (Universal Analytics)"
            data="Online resource usage data; Tracker"
          />
          <Processor
            title="Interaction with support and feedback platforms — Jivochat Widget"
            data="Online resource usage data; Tracker"
          />
          <Processor
            title="Interaction with real-time chat platforms — Jivochat"
            data="Online resource usage data; Data transmitted when using the service; Tracker"
          />
          <Processor
            title="Access to third-party service accounts — Access to Stripe account"
            data="Email address; Online resource usage data; First name; Payment information; Tracker; Last name"
          />
          <Processor
            title="Use of hosting platforms and services — ClickFunnels"
            data="Shipping address; Email address; Billing address; Online resource usage data; First name; Device information; Phone number; Payment information; Tracker; Last name"
          />
          <Processor
            title="AXL Platform"
            data="First name; Email address; Online resource usage data; IP address; Location data; Tracker"
          />
          <Processor
            title="Payment processing — Stripe"
            data="Email address; Online resource usage data; First name; Tracker; Last name"
          />
          <Processor
            title="Displaying content from external platforms — Vimeo Videos"
            data="Online resource usage data; Tracker"
          />
          <Processor
            title="Registration and authentication — Stripe OAuth"
            data="Online resource usage data; Tracker"
          />
          <Processor
            title="Advertising — Link click tracking TikTok, conversion tracking Meta Ads (Meta Pixel), and Meta Lookalike Audience"
            data="Online resource usage data; Tracker"
          />
          <Processor
            title="Remarketing and behavioral targeting — TikTok Ads Remarketing"
            data="Online resource usage data; Tracker; Unique advertising device identifiers (e.g., Google Advertiser ID or IDFA)"
          />
          <Processor title="Meta Custom Audience" data="Email address; Tracker" />
          <Processor
            title="Facebook Remarketing"
            data="Online resource usage data; Tracker"
          />
        </LegalSection>

        <LegalSection title="Information on Opting Out of Personalized Advertising">
          <p>
            In addition to any other opt-out options provided by each of the services mentioned in
            this document, users can learn more about how to opt out of personalized advertising in
            the relevant section of the{' '}
            <Link to={ROUTES.cookie} className="text-sw-blue hover:underline">
              Cookie Policy
            </Link>
            .
          </p>
        </LegalSection>

        <LegalSection title="Additional Information on the Processing of Personal Data">
          <h3 className="font-semibold text-sw-dark">Data Retention</h3>
          <p>
            We retain personal data only for as long as necessary to provide services and comply
            with legal, tax, or regulatory requirements. After the retention periods expire, data is
            securely deleted or anonymized.
          </p>
          <h3 className="font-semibold text-sw-dark">Online Sale of Goods and Services</h3>
          <p>
            Collected personal data is used to provide services to the user or to sell goods,
            including payment and possible delivery. Personal data collected for payment purposes
            may include credit card information, bank account information used for electronic
            payments, or any other payment method. The nature of the data collected by the Service
            depends on the payment system used.
          </p>
        </LegalSection>

        <LegalSection title="Legal Bases for Processing (GDPR)">
          <p>
            We process personal data on the following legal bases: performance of a contract (Art.
            6(1)(b) GDPR), compliance with legal obligations (Art. 6(1)(c)), legitimate interests
            (Art. 6(1)(f)) for security and operation of the service, and consent (Art. 6(1)(a)) for
            analytics/marketing where required. Users may withdraw consent at any time.
          </p>
        </LegalSection>

        <LegalSection title="International Data Transfers">
          <p>
            When personal data is transferred outside the EEA/UK, we use appropriate safeguards,
            such as the European Commission&apos;s Standard Contractual Clauses (and UK
            IDTA/Addendum), as well as, where applicable, mechanisms recognized by regulators.
            Copies of the safeguards are available upon request.
          </p>
        </LegalSection>

        <LegalSection title="Contact Information">
          <p>
            <strong className="text-sw-dark">Data Controller:</strong> {COMPANY.legalName}
          </p>
          <p>
            <strong className="text-sw-dark">Data Processor(s):</strong> Stripe Inc., Meta Platforms
            Inc., TikTok Inc., Google LLC, AXL EdTech Booster LLC, and others, depending on the
            services used.
          </p>
          <p>
            This service is intended for users located in the United States, the European Union, the
            United Kingdom, Canada, and other permitted jurisdictions. Our services are intended for
            adults (18+). We also do not process personal data of children under 16 years of age.
          </p>
          <p>
            Applicable law and jurisdiction: this Privacy Policy is governed by the laws of the
            United Kingdom. All disputes shall be subject to the jurisdiction of the courts of
            England and Wales.
          </p>
          <CompanyDetails />
          <p>
            Related:{' '}
            <Link to={ROUTES.cookie} className="text-sw-blue hover:underline">
              Cookie Policy
            </Link>{' '}
            ·{' '}
            <Link to={ROUTES.terms} className="text-sw-blue hover:underline">
              Terms &amp; Conditions
            </Link>{' '}
            ·{' '}
            <Link to={ROUTES.contact} className="text-sw-blue hover:underline">
              Contact
            </Link>
          </p>
        </LegalSection>
      </LegalCard>
    </>
  )
}
