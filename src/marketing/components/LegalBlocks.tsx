import type { ReactNode } from 'react'

export function LegalHero({
  title,
  updated,
  subtitle,
}: {
  title: string
  updated?: string
  subtitle?: ReactNode
}) {
  return (
    <section className="bg-sw-dark px-4 py-14">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-semibold tracking-widest text-white/50 uppercase">Legal</p>
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
