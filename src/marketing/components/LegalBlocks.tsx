import type { ReactNode } from 'react'
import { COMPANY } from '@/marketing/data/company'

export function LegalHero({
  title,
  updated,
  subtitle,
  kicker = 'Legal',
}: {
  title: string
  updated?: string
  subtitle?: ReactNode
  kicker?: string
}) {
  return (
    <section className="bg-sw-dark px-4 py-14">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-semibold tracking-widest text-white/50 uppercase">{kicker}</p>
        <h1 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">{title}</h1>
        {subtitle}
        {updated ? <p className="text-sm text-white/60">Last updated: {updated}</p> : null}
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
  return (
    <CompanyBox>
      <dl className="space-y-1.5 text-sm text-sw-grey">
        <div>
          <dt className="inline font-semibold text-sw-dark">Legal entity: </dt>
          <dd className="inline">{COMPANY.legalName}</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-sw-dark">Registration: </dt>
          <dd className="inline">{COMPANY.registration}</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-sw-dark">Company registration number: </dt>
          <dd className="inline">{COMPANY.companyNumber}</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-sw-dark">Address: </dt>
          <dd className="inline">{COMPANY.address}</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-sw-dark">Service name: </dt>
          <dd className="inline">{COMPANY.serviceName}</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-sw-dark">Contact email: </dt>
          <dd className="inline">
            <a href={`mailto:${COMPANY.email}`} className="text-sw-blue hover:underline">
              {COMPANY.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="inline font-semibold text-sw-dark">Website: </dt>
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
