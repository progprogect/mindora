import type { ReactNode } from 'react'
import { COMPANY, companyPagesCopy } from '@/marketing/data/company'
import { useI18n } from '../../../authorisation/src/i18n/I18nProvider'

export function LegalHero({
  title,
  updated,
  subtitle,
  kicker,
}: {
  title: string
  updated?: string
  subtitle?: ReactNode
  kicker?: string
}) {
  const { locale } = useI18n()
  const legal = companyPagesCopy(locale).legal
  const kickerText = kicker ?? legal.kicker

  return (
    <section className="bg-sw-dark px-4 py-14">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-semibold tracking-widest text-white/50 uppercase">{kickerText}</p>
        <h1 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">{title}</h1>
        {subtitle}
        {updated ? (
          <p className="text-sm text-white/60">
            {legal.lastUpdatedPrefix} {updated}
          </p>
        ) : null}
      </div>
    </section>
  )
}

export function LegalCard({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <div className="space-y-10 rounded-2xl bg-white p-8 shadow-sm sm:p-12">{children}</div>
    </main>
  )
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 border-b border-sw-grey-border pb-3 text-xl font-bold text-sw-dark sm:text-2xl">
        {title}
      </h2>
      <div className="space-y-4 leading-relaxed text-sw-grey">{children}</div>
    </section>
  )
}

export function CompanyBox({ children }: { children: ReactNode }) {
  return (
    <div className="my-2 rounded-xl p-5" style={{ backgroundColor: 'hsl(var(--sw-blue-light))' }}>
      {children}
    </div>
  )
}

export function CompanyDetails() {
  const { locale } = useI18n()
  const details = companyPagesCopy(locale).contact.details

  return (
    <CompanyBox>
      <dl className="space-y-1.5 text-sm text-sw-grey">
        <div>
          <dt className="inline font-semibold text-sw-dark">{details.legalEntity} </dt>
          <dd className="inline">{COMPANY.legalName}</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-sw-dark">{details.registration} </dt>
          <dd className="inline">{COMPANY.registration}</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-sw-dark">{details.companyNumber} </dt>
          <dd className="inline">{COMPANY.companyNumber}</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-sw-dark">{details.address} </dt>
          <dd className="inline">{COMPANY.address}</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-sw-dark">{details.serviceName} </dt>
          <dd className="inline">{COMPANY.serviceName}</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-sw-dark">{details.contactEmail} </dt>
          <dd className="inline">
            <a href={`mailto:${COMPANY.email}`} className="text-sw-blue hover:underline">
              {COMPANY.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="inline font-semibold text-sw-dark">{details.website} </dt>
          <dd className="inline">
            <a
              href={COMPANY.website}
              className="text-sw-blue hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {COMPANY.website}
            </a>
          </dd>
        </div>
      </dl>
    </CompanyBox>
  )
}
