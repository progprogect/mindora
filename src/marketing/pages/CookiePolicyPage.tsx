import { withLocale } from '../../../authorisation/src/i18n/locale'
import { Link } from 'react-router-dom'
import { LegalCard, LegalHero, LegalSection } from '@/marketing/components/LegalBlocks'
import { COMPANY } from '@/marketing/data/company'
import { cookiePolicyCopy } from '@/marketing/data/cookiePolicyCopy'
import { ROUTES } from '@/marketing/data/nav'
import usePageTitle from '@/marketing/hooks/usePageTitle'
import { useI18n } from '../../../authorisation/src/i18n/I18nProvider'

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
  const { locale } = useI18n()
  const copy = cookiePolicyCopy(locale)
  usePageTitle(copy.pageTitle)
  const intro = copy.sections.introduction
  const choices = copy.sections.choices
  const general = copy.sections.general
  const used = copy.sections.used
  const optOut = copy.sections.optOut
  const contact = copy.sections.contact

  return (
    <>
      <LegalHero
        kicker={copy.kicker}
        title={copy.heroTitle}
        updated={locale === 'en' ? copy.updatedDate : undefined}
        subtitle={
          locale === 'ru' ? (
            <p className="text-sm text-white/60">{copy.lastUpdatedLine}</p>
          ) : undefined
        }
      />
      <LegalCard>
        <LegalSection title={intro.title}>
          <p>
            {intro.p1Start}
            {COMPANY.websiteHost}
            {intro.p1Mid}
            {COMPANY.websiteHost}
            {intro.p1End}
          </p>
          <p>
            {COMPANY.websiteHost}
            {intro.p2Start}
            <a href={`mailto:${COMPANY.email}`} className="text-sw-blue hover:underline">
              {COMPANY.email}
            </a>
            {intro.p2Or}
            <Link to={withLocale(locale, ROUTES.contact)} className="text-sw-blue hover:underline">
              {intro.contactPageLink}
            </Link>
            {intro.p2End}
          </p>
          <p>
            {intro.p3Start}
            <Link to={withLocale(locale, ROUTES.privacy)} className="text-sw-blue hover:underline">
              {intro.privacyLink}
            </Link>
            {intro.p3Mid}
            <Link to={withLocale(locale, ROUTES.terms)} className="text-sw-blue hover:underline">
              {intro.termsLink}
            </Link>
            {intro.p3End}
          </p>
        </LegalSection>

        <LegalSection title={choices.title}>
          <p>{choices.body}</p>
        </LegalSection>

        <LegalSection title={general.title}>
          <p>{general.p1}</p>
          <p>{general.p2}</p>
          <p>{general.p3}</p>
          <ul className="list-disc space-y-2 pl-5">
            {BROWSERS.map((browser) => (
              <li key={browser.label}>
                <ExtLink href={browser.href}>{browser.label}</ExtLink>
              </li>
            ))}
          </ul>
          <p>{general.p4}</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              {general.androidPrefix}
              <ExtLink href="https://support.google.com/accounts/answer/61416">{general.googleHelp}</ExtLink>
              {general.androidSuffix}
            </li>
            <li>
              {general.iosPrefix}
              <ExtLink href="https://support.apple.com/HT201265">{general.appleSupport}</ExtLink>
              {general.iosSuffix}
            </li>
          </ul>
        </LegalSection>

        <LegalSection title={used.title}>
          <p>
            {COMPANY.websiteHost}
            {used.introStart}
          </p>
          <ul className="list-disc space-y-3 pl-5">
            {used.categories.map((category) => (
              <li key={category.name}>
                <strong>{category.name}</strong> — {category.description}
              </li>
            ))}
          </ul>
          <p>{used.providersNote}</p>
        </LegalSection>

        <LegalSection title={optOut.title}>
          <p>{optOut.body}</p>
        </LegalSection>

        <LegalSection title={contact.title}>
          <p>
            {contact.p1Start}
            <a href={`mailto:${COMPANY.email}`} className="text-sw-blue hover:underline">
              {COMPANY.email}
            </a>
            {contact.p1Or}
            <Link to={withLocale(locale, ROUTES.contact)} className="text-sw-blue hover:underline">
              {contact.contactPageLink}
            </Link>
            {contact.p1End}
          </p>
          <p>
            {contact.relatedPrefix}{' '}
            <Link to={withLocale(locale, ROUTES.privacy)} className="text-sw-blue hover:underline">
              {contact.privacyLink}
            </Link>{' '}
            {contact.relatedSeparator}{' '}
            <Link to={withLocale(locale, ROUTES.terms)} className="text-sw-blue hover:underline">
              {contact.termsLink}
            </Link>{' '}
            {contact.relatedSeparator}{' '}
            <Link to={withLocale(locale, ROUTES.contact)} className="text-sw-blue hover:underline">
              {contact.contactLink}
            </Link>
          </p>
        </LegalSection>
      </LegalCard>
    </>
  )
}
