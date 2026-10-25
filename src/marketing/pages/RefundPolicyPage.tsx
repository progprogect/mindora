import { Link } from 'react-router-dom'
import { CompanyBox, CompanyDetails, LegalSection } from '@/marketing/components/LegalBlocks'
import { COMPANY } from '@/marketing/data/company'
import { refundPolicyCopy } from '@/marketing/data/refundPolicyCopy'
import { ROUTES } from '@/marketing/data/nav'
import usePageTitle from '@/marketing/hooks/usePageTitle'
import { useI18n } from '../../../authorisation/src/i18n/I18nProvider'

export default function RefundPolicyPage() {
  const { locale } = useI18n()
  const copy = refundPolicyCopy(locale)
  const hero = copy.hero
  const s = copy.sections
  usePageTitle(copy.pageTitle)

  return (
    <>
      <section className="bg-sw-dark px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold tracking-widest text-white/50 uppercase">{hero.kicker}</p>
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
            {hero.title}
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-white/60">
            {hero.subtitleBefore}
            {COMPANY.serviceName}
            {hero.subtitleAfter}
          </p>
          <p className="mt-4 text-xs text-white/30">{hero.meta}</p>
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
              {hero.badgeDays}
            </div>
            <div className="text-xs font-bold tracking-wide uppercase" style={{ color: 'hsl(142 71% 40%)' }}>
              {hero.badgeDaysLabel}
            </div>
          </div>
          <div>
            <p className="mb-1 text-lg font-bold text-sw-dark">
              {hero.cardTitleBefore}
              {COMPANY.serviceName}
              {hero.cardTitleAfter}
            </p>
            <p className="text-sm leading-relaxed text-sw-grey">{hero.cardBody}</p>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4 pt-10 pb-14 sm:px-6">
        <div className="space-y-10 rounded-2xl bg-white p-8 shadow-sm sm:p-12">
          <LegalSection title={s.plainEnglish.title}>
            <p>
              {s.plainEnglish.p1Before}
              {COMPANY.serviceName}
              {s.plainEnglish.p1Mid}
              <strong>{s.plainEnglish.p1Strong}</strong>
              {s.plainEnglish.p1After}
            </p>
            <p>{s.plainEnglish.p2}</p>
            <p>
              {s.plainEnglish.p3Before}
              <strong>{s.plainEnglish.p3Strong}</strong>
              {s.plainEnglish.p3After}
            </p>
            <p>{s.plainEnglish.p4}</p>
          </LegalSection>

          <LegalSection title={s.whoApplies.title}>
            <p>
              {s.whoApplies.p1Before}
              <strong>{s.whoApplies.p1TrialStrong}</strong>
              {s.whoApplies.p1Mid}
              <strong>{s.whoApplies.p1ChargeStrong}</strong>
              {s.whoApplies.p1After}
            </p>
            <p className="mt-4 mb-2 font-semibold text-sw-dark">{s.whoApplies.subscriptionsHeading}</p>
            <ul className="list-disc space-y-2 pl-5 text-sw-grey">
              <li>
                <strong>{s.whoApplies.monthlyLabel}</strong> — {s.whoApplies.monthlyDesc}
              </li>
              <li>
                <strong>{s.whoApplies.quarterlyLabel}</strong> — {s.whoApplies.quarterlyDesc}
              </li>
              <li>
                <strong>{s.whoApplies.annualLabel}</strong> — {s.whoApplies.annualDesc}
              </li>
            </ul>
            <p className="mt-4 mb-2 font-semibold text-sw-dark">{s.whoApplies.oneTimeHeading}</p>
            <ul className="list-disc space-y-2 pl-5 text-sw-grey">
              <li>
                <strong>{s.whoApplies.oneTimeItemLabel}</strong> — {s.whoApplies.oneTimeItemDesc}
              </li>
            </ul>
            <p className="mt-4">
              {s.whoApplies.p2Before}
              <strong>{s.whoApplies.p2OnceStrong}</strong>
              {s.whoApplies.p2After}
            </p>
          </LegalSection>

          <LegalSection title={s.howToRequest.title}>
            <p>{s.howToRequest.intro}</p>
            <CompanyBox>
              <p className="mb-1 font-bold text-sw-dark">
                <a href={`mailto:${COMPANY.email}`} className="text-lg text-sw-blue hover:underline">
                  {COMPANY.email}
                </a>
              </p>
              <p className="mt-2 mb-1 text-sm text-sw-grey">{s.howToRequest.includeLabel}</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-sw-grey">
                <li>{s.howToRequest.includeName}</li>
                <li>{s.howToRequest.includeDate}</li>
                <li>{s.howToRequest.includeReason}</li>
              </ul>
            </CompanyBox>
            <p>
              {s.howToRequest.responseBefore}
              <strong>{s.howToRequest.responseDaysStrong}</strong>
              {s.howToRequest.responseMid}
              <strong>{s.howToRequest.responseBankStrong}</strong>
              {s.howToRequest.responseAfter}
            </p>
          </LegalSection>

          <LegalSection title={s.afterWindow.title}>
            <p>{s.afterWindow.intro}</p>
            <ul className="list-disc space-y-2 pl-5 text-sw-grey">
              <li>
                <strong>{s.afterWindow.technicalLabel}</strong> — {s.afterWindow.technicalDesc}
              </li>
              <li>
                <strong>{s.afterWindow.duplicateLabel}</strong> — {s.afterWindow.duplicateDesc}
              </li>
              <li>
                <strong>{s.afterWindow.illnessLabel}</strong> — {s.afterWindow.illnessDesc}
              </li>
            </ul>
          </LegalSection>

          <LegalSection title={s.cancellations.title}>
            <p>{s.cancellations.intro}</p>
            <ul className="list-disc space-y-2 pl-5 text-sw-grey">
              <li>{s.cancellations.access}</li>
              <li>{s.cancellations.noCharges}</li>
              <li>{s.cancellations.noAutoRefund}</li>
            </ul>
            <p>
              {s.cancellations.cancelIntro}
              <strong>{s.cancellations.profileStrong}</strong>
              {s.cancellations.cancelMid}
              <strong>{s.cancellations.cancelSubStrong}</strong>
              {s.cancellations.cancelUnder}
              <a href={`mailto:${COMPANY.email}`} className="text-sw-blue hover:underline">
                {COMPANY.email}
              </a>
              {s.cancellations.cancelEnd}
            </p>
          </LegalSection>

          <LegalSection title={s.trial.title}>
            <p>
              {s.trial.p1Before}
              <strong>{s.trial.p1TrialStrong}</strong>
              {s.trial.p1Mid}
              <strong>{s.trial.p1GuaranteeStrong}</strong>
              {s.trial.p1End}
            </p>
            <p>{s.trial.p2}</p>
          </LegalSection>

          <LegalSection title={s.chargebacks.title}>
            <p>{s.chargebacks.body}</p>
          </LegalSection>

          <LegalSection title={s.contact.title}>
            <p>{s.contact.intro}</p>
            <CompanyDetails />
            <p>
              {s.contact.relatedPrefix}{' '}
              <Link to={ROUTES.terms} className="text-sw-blue hover:underline">
                {s.contact.termsLink}
              </Link>{' '}
              {s.contact.relatedSeparator}{' '}
              <Link to={ROUTES.billing} className="text-sw-blue hover:underline">
                {s.contact.billingLink}
              </Link>{' '}
              {s.contact.relatedSeparator}{' '}
              <Link to={ROUTES.privacy} className="text-sw-blue hover:underline">
                {s.contact.privacyLink}
              </Link>{' '}
              {s.contact.relatedSeparator}{' '}
              <Link to={ROUTES.contact} className="text-sw-blue hover:underline">
                {s.contact.contactLink}
              </Link>
            </p>
          </LegalSection>
        </div>
      </main>
    </>
  )
}
