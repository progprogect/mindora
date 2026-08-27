import { CompanyBox, LegalCard, LegalHero, LegalSection } from '@/marketing/components/LegalBlocks'
import usePageTitle from '@/marketing/hooks/usePageTitle'

export default function PrivacyPolicyPage() {
  usePageTitle('Privacy Policy — SuccessWise.ai')

  return (
    <>
      <LegalHero title="Privacy Policy" updated="1 February 2025" />
      <LegalCard>
        <LegalSection title="Who We Are">
          <p>
            This Privacy Policy explains how <strong className="text-sw-dark">ClickTech Solutions LTD</strong>{' '}
            (trading as <strong className="text-sw-dark">SuccessWise.ai</strong>) collects, uses, stores, and
            protects your personal data when you use our website and services.
          </p>
          <CompanyBox>
            <p className="font-semibold text-sw-dark">ClickTech Solutions LTD</p>
            <p className="text-sm text-sw-grey">Trading as SuccessWise.ai</p>
            <p className="mt-1 text-sm text-sw-grey">Company Number: 09899629</p>
            <p className="text-sm text-sw-grey">
              Registered Office: Leytonstone House, 3 Hanbury Drive,
              <br />
              Leytonstone, London, United Kingdom, E11 1GA
            </p>
          </CompanyBox>
          <p>
            We are the <strong>data controller</strong> for the personal data we collect about you. We are
            committed to processing your data in accordance with the UK General Data Protection Regulation (UK
            GDPR), the Data Protection Act 2018, and all other applicable UK data protection legislation.
          </p>
          <p>
            If you have any questions about this policy or our data practices, please contact us at{' '}
            <a href="mailto:contact@clicktech.com" className="text-sw-blue hover:underline">
              contact@clicktech.com
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="Lawful Basis for Processing Your Data">
          <p>
            Under UK GDPR, we must have a lawful basis for processing your personal data. Depending on the
            activity, we rely on one or more of the following:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sw-grey">
            <li>
              <strong>Consent</strong> — Where you have freely given, specific, informed, and unambiguous
              consent (e.g. subscribing to marketing emails or accepting non-essential cookies). You may
              withdraw consent at any time.
            </li>
            <li>
              <strong>Contract</strong> — Where processing is necessary to fulfil your subscription, provide
              access to courses, or manage your account.
            </li>
            <li>
              <strong>Legal Obligation</strong> — Where we are required to process your data to comply with
              applicable law (e.g. tax and accounting obligations).
            </li>
            <li>
              <strong>Legitimate Interests</strong> — Where processing is necessary for our legitimate
              interests (or those of a third party), provided those interests are not overridden by your rights
              and interests. This includes fraud prevention, platform security, and improving our services. We
              carry out a Legitimate Interest Assessment (LIA) before relying on this basis.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="What Data We Collect and Why">
          <p>We collect the following categories of personal data:</p>
          <div className="rounded-xl bg-sw-grey-light p-5">
            <h3 className="mb-2 font-semibold text-sw-dark">Account & Identity Data</h3>
            <p>
              When you create an account, we collect your name, email address, and password (stored in hashed
              form). We use this to authenticate you, provide course access, and personalise your experience.
            </p>
          </div>
          <div className="rounded-xl bg-sw-grey-light p-5">
            <h3 className="mb-2 font-semibold text-sw-dark">Usage & Behavioural Data</h3>
            <p>
              We automatically collect data about how you interact with our platform — including pages visited,
              lessons completed, quiz responses, time on page, and feature usage. This helps us improve the
              platform and personalise your learning journey.
            </p>
          </div>
          <div className="rounded-xl bg-sw-grey-light p-5">
            <h3 className="mb-2 font-semibold text-sw-dark">Device & Technical Data</h3>
            <p>
              We collect technical data such as your IP address, browser type, operating system, device
              identifiers, and referring URLs. This is used for security monitoring, fraud prevention, and site
              performance analytics.
            </p>
          </div>
          <div className="rounded-xl bg-sw-grey-light p-5">
            <h3 className="mb-2 font-semibold text-sw-dark">Communications Data</h3>
            <p>
              If you contact us directly (e.g. via support or email), we collect your name, email address, and
              the contents of your message. This is used to respond to and resolve your enquiry.
            </p>
          </div>
          <div className="rounded-xl bg-sw-grey-light p-5">
            <h3 className="mb-2 font-semibold text-sw-dark">Payment Data</h3>
            <p>
              We do not store payment card details. All payment processing is handled by our payment processor
              (Stripe, Inc.), which is PCI-DSS compliant. We retain transaction records (amount, date, product)
              for legal and accounting purposes.
            </p>
          </div>
          <p>
            We do not knowingly collect personal data from anyone under the age of 18. If you believe we have
            done so, please contact us immediately and we will delete it.
          </p>
        </LegalSection>

        <LegalSection title="Cookies & Tracking Technologies">
          <p>
            We use cookies and similar tracking technologies on our site. Cookies are small text files stored
            on your device that help us provide and improve our services.
          </p>
          <p>We use the following types of cookies:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Strictly necessary cookies</strong> — Required for the site to function. These cannot be
              disabled.
            </li>
            <li>
              <strong>Analytics cookies</strong> — Help us understand how visitors use our site (e.g. Google
              Analytics, Microsoft Clarity). Enabled only with your consent.
            </li>
            <li>
              <strong>Marketing cookies</strong> — Used to show you relevant advertising and measure campaign
              effectiveness. Enabled only with your consent.
            </li>
          </ul>
          <p>
            You can manage your cookie preferences at any time via our Cookie Settings panel, or by configuring
            your browser to block cookies. Please note that disabling certain cookies may affect site
            functionality. For full details, see our Cookie Policy.
          </p>
        </LegalSection>

        <LegalSection title="How We Share Your Data">
          <p>
            We will never sell, rent, or trade your personal data to third parties for their own marketing
            purposes.
          </p>
          <p>
            We may share your data with trusted third-party service providers who act as our data processors,
            meaning they process data only on our instructions and are bound by appropriate data processing
            agreements. These include:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Railway / Postgres</strong> — Database and backend infrastructure
            </li>
            <li>
              <strong>Stripe</strong> — Payment processing
            </li>
            <li>
              <strong>Google Analytics / Microsoft Clarity</strong> — Analytics and heatmapping (consent-gated)
            </li>
            <li>
              <strong>Email service providers</strong> — Transactional and marketing emails (consent-gated for
              marketing)
            </li>
            <li>
              <strong>AI model providers</strong> — Where you interact with our AI Coach, relevant content may
              be processed by third-party AI providers (e.g. Anthropic, OpenAI) under strict data processing
              agreements. No data shared is used to train their models.
            </li>
          </ul>
          <p>
            We may also disclose your data where required by law, court order, or regulatory authority, or
            where necessary to protect the rights, property, or safety of SuccessWise.ai, our users, or others.
          </p>
        </LegalSection>

        <LegalSection title="International Data Transfers">
          <p>
            Some of our service providers are based outside the United Kingdom. Where we transfer your personal
            data outside the UK, we ensure appropriate safeguards are in place — such as UK-approved Standard
            Contractual Clauses (SCCs), adequacy decisions, or the International Data Transfer Agreement (IDTA)
            — in accordance with UK GDPR Chapter V.
          </p>
        </LegalSection>

        <LegalSection title="Data Retention">
          <p>We retain your personal data only for as long as necessary for the purposes for which it was collected:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Account data</strong> — Retained for the duration of your account. If you delete your
              account, we will erase your data within 30 days, unless a longer retention period is required by
              law.
            </li>
            <li>
              <strong>Transaction records</strong> — Retained for 7 years to comply with HMRC requirements.
            </li>
            <li>
              <strong>Communications</strong> — Retained for up to 3 years after your last interaction.
            </li>
            <li>
              <strong>Analytics data</strong> — Retained in anonymised or aggregated form.
            </li>
          </ul>
          <p>When data is no longer needed, it is securely deleted or anonymised.</p>
        </LegalSection>

        <LegalSection title="Your Rights Under UK GDPR">
          <p>As a data subject in the UK, you have the following rights:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Right of Access</strong> — You can request a copy of the personal data we hold about you
              (a Subject Access Request).
            </li>
            <li>
              <strong>Right to Rectification</strong> — You can ask us to correct inaccurate or incomplete data.
            </li>
            <li>
              <strong>Right to Erasure</strong> — You can request that we delete your personal data
              (&quot;right to be forgotten&quot;), subject to certain legal exceptions.
            </li>
            <li>
              <strong>Right to Restrict Processing</strong> — You can ask us to pause processing of your data
              in certain circumstances.
            </li>
            <li>
              <strong>Right to Data Portability</strong> — You can request a machine-readable copy of the data
              you provided to us, where processing is based on consent or contract.
            </li>
            <li>
              <strong>Right to Object</strong> — You can object to processing based on legitimate interests or
              for direct marketing purposes.
            </li>
            <li>
              <strong>Rights related to Automated Decision-Making</strong> — You have the right not to be
              subject to solely automated decisions that produce significant legal or similarly significant
              effects.
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{' '}
            <a href="mailto:contact@clicktech.com" className="text-sw-blue hover:underline">
              contact@clicktech.com
            </a>
            . We will respond within one calendar month. We will not charge a fee unless your request is
            manifestly unfounded or excessive.
          </p>
          <p>
            If you are dissatisfied with how we handle your data, you have the right to lodge a complaint with
            the UK supervisory authority, the Information Commissioner&apos;s Office (ICO).
          </p>
        </LegalSection>

        <LegalSection title="Security of Your Data">
          <p>
            We take the security of your personal data seriously. We implement appropriate technical and
            organisational measures to protect your data against unauthorised access, loss, destruction, or
            alteration. These include:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Encryption of data in transit (TLS/HTTPS) and at rest</li>
            <li>Access controls and role-based permissions for staff</li>
            <li>Regular security assessments</li>
            <li>Secure, third-party infrastructure providers with their own ISO/SOC certifications</li>
          </ul>
          <p>
            No method of electronic transmission or storage is 100% secure. In the unlikely event of a data
            breach that poses a risk to your rights and freedoms, we will notify you and the ICO as required by
            law (within 72 hours of becoming aware).
          </p>
        </LegalSection>

        <LegalSection title="Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. When we make material changes, we will update
            the &quot;Last Updated&quot; date at the top of this page and, where appropriate, notify you by
            email or via a prominent notice on the site.
          </p>
          <p>
            Your continued use of SuccessWise.ai after any changes take effect constitutes your acknowledgement
            of the updated policy.
          </p>
        </LegalSection>

        <LegalSection title="Contact Us">
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data
            practices, please contact us:
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
