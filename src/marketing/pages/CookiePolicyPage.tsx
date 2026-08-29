import { Link } from 'react-router-dom'
import { LegalCard, LegalHero, LegalSection } from '@/marketing/components/LegalBlocks'
import { COMPANY } from '@/marketing/data/company'
import { ROUTES } from '@/marketing/data/nav'
import usePageTitle from '@/marketing/hooks/usePageTitle'

const BROWSERS = [
  { label: 'Microsoft Edge', href: 'https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
  { label: 'Firefox', href: 'https://support.mozilla.org/kb/clear-cookies-and-site-data-firefox' },
  { label: 'Chrome', href: 'https://support.google.com/chrome/answer/95647' },
  { label: 'Safari', href: 'https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac' },
  { label: 'Opera', href: 'https://help.opera.com/latest/web-preferences/#cookies' },
] as const

function ExtLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} className="text-sw-blue hover:underline" target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

export default function CookiePolicyPage() {
  usePageTitle('Cookie Policy — Mindora Academy')

  return (
    <>
      <LegalHero title="Cookie Policy" />
      <LegalCard>
        <LegalSection title="Introduction">
          <p>
            This Cookie Policy describes the use of cookies and similar technologies on our website
            — the {COMPANY.websiteHost} website (hereinafter — &quot;{COMPANY.websiteHost}&quot;).
            It explains how cookies are used to improve your user experience and enhance the quality
            of our services.
          </p>
          <p>
            {COMPANY.websiteHost} collects information through cookies placed on your device. If you
            have any questions or require additional information, please contact us through the{' '}
            <Link to={ROUTES.contact} className="text-sw-blue hover:underline">
              contact page
            </Link>
            .
          </p>
          <p>
            This Cookie Policy should be read together with our{' '}
            <Link to={ROUTES.privacy} className="text-sw-blue hover:underline">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link to={ROUTES.terms} className="text-sw-blue hover:underline">
              Terms of Use
            </Link>
            .
          </p>
          <p>
            By interacting with the {COMPANY.websiteHost} website, you consent to the use of cookies
            in accordance with this Policy.
          </p>
        </LegalSection>

        <LegalSection title="General Information">
          <p>
            If you prefer not to allow the use of cookies on your device, you can change your
            internet browser settings to reject some or all cookies, as well as receive
            notifications when they are installed. Please note that in this case, access to or
            proper functioning of certain sections of the website may be limited. Detailed
            instructions on changing browser settings can be found in the &quot;Help,&quot;
            &quot;Tools,&quot; or &quot;Settings&quot; sections of your browser.
          </p>
          <p>
            If you wish to delete cookies already stored on your device, you can do so manually at
            any time. However, deleting existing cookies will not prevent new ones from being
            installed unless you change the relevant browser settings.
          </p>
          <p>To manage and block cookies, please refer to the guides for the respective browsers:</p>
          <ul className="list-disc space-y-2 pl-5">
            {BROWSERS.map((browser) => (
              <li key={browser.label}>
                <ExtLink href={browser.href}>{browser.label}</ExtLink>
              </li>
            ))}
          </ul>
          <p>Mobile device users can manage cookies through their device settings:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              For Android — see{' '}
              <ExtLink href="https://support.google.com/accounts/answer/61416">Google Help</ExtLink>
              .
            </li>
            <li>
              For iOS — visit{' '}
              <ExtLink href="https://support.apple.com/HT201265">Apple Support</ExtLink>.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Cookies Used by Mindora Academy">
          <p>
            {COMPANY.websiteHost} uses various cookies necessary for the proper functioning of the
            website, ensuring security, analyzing performance, and improving the user experience,
            including, but not limited to, the following:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Type:</strong> required / security / analytical
            </li>
            <li>
              <strong>Retention period:</strong> session / persistent
            </li>
            <li>
              <strong>Purpose:</strong> ensuring the functioning and security of the website, as
              well as collecting analytical data to improve our services.
            </li>
          </ul>
          <p>
            We use Google Analytics to better understand how you interact with our website and to
            improve the quality of the user experience. For more detailed information, please refer
            to{' '}
            <ExtLink href="https://policies.google.com/privacy">Google&apos;s Privacy Policy</ExtLink>
            .
          </p>
        </LegalSection>

        <LegalSection title="Contact Us">
          <p>
            If you have any questions or require clarification regarding this Cookie Policy or the
            ways in which your data is processed, please contact us through the{' '}
            <Link to={ROUTES.contact} className="text-sw-blue hover:underline">
              contact page
            </Link>
            .
          </p>
          <p>
            Related:{' '}
            <Link to={ROUTES.privacy} className="text-sw-blue hover:underline">
              Privacy Policy
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
