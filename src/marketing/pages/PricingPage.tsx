import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PRICING_FEATURES, PRICING_PLANS, PRICING_TRUST } from '@/marketing/data/pricing'
import { ROUTES } from '@/marketing/data/nav'
import usePageTitle from '@/marketing/hooks/usePageTitle'

export default function PricingPage() {
  usePageTitle('Pricing — MindoraAcademy.com | Simple Plans, Full Platform Access')
  const [selected, setSelected] = useState<(typeof PRICING_PLANS)[number]['id']>('quarter')
  const navigate = useNavigate()
  const plan = PRICING_PLANS.find((p) => p.id === selected) ?? PRICING_PLANS[1]

  return (
    <>
      <section className="bg-sw-dark px-4 py-12 sm:py-16">
        <div className="animate-fade-up mx-auto max-w-3xl text-center">
          <h1 className="mb-3 text-3xl font-extrabold text-white sm:text-4xl">
            Start with a <span style={{ color: 'hsl(var(--sw-success))' }}>$1 trial</span> for 7 days
          </h1>
          <p className="mx-auto max-w-xl text-base text-white/70">
            Full access to every course, your AI Coach, and personalised roadmap — normally{' '}
            <span className="line-through">$29.99/mo</span>. Cancel any time before day 7 — you
            won&apos;t be charged.
          </p>
        </div>
      </section>

      <section className="relative z-10 -mt-6 px-4">
        <div className="mx-auto max-w-2xl">
          <div
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl px-4 py-3.5 text-center shadow-lg"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--sw-success)) 0%, hsl(160 60% 45%) 100%)',
            }}
          >
            <span aria-hidden="true" className="text-lg">
              🎉
            </span>
            <span className="text-sm font-bold text-white sm:text-base">
              Just $1 to start — full access for 7 days
            </span>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <p className="mb-6 text-center text-sm text-sw-grey">
          Choose the plan that continues after your trial:
        </p>

        <div className="flex flex-col gap-3">
          {PRICING_PLANS.map((item) => {
            const active = item.id === selected
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(item.id)}
                className={`relative overflow-hidden rounded-2xl border-2 text-left transition-all duration-150 ${
                  active
                    ? 'shadow-md'
                    : 'border-sw-grey-border hover:border-sw-grey'
                }`}
                style={
                  active
                    ? {
                        backgroundColor: 'hsl(var(--sw-blue-light))',
                        borderColor: 'hsl(var(--sw-blue))',
                      }
                    : { backgroundColor: 'white' }
                }
              >
                {item.badge ? (
                  <div
                    className="py-1 text-center text-[11px] font-bold tracking-wider text-white uppercase"
                    style={{
                      backgroundColor:
                        item.badge === 'BEST VALUE'
                          ? 'hsl(var(--sw-success))'
                          : 'hsl(var(--sw-blue))',
                    }}
                  >
                    {item.badge}
                  </div>
                ) : null}
                <div className="flex items-center justify-between px-5 py-5 sm:px-6">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2"
                      style={{
                        borderColor: active
                          ? 'hsl(var(--sw-blue))'
                          : 'hsl(var(--sw-grey-border))',
                      }}
                      aria-hidden="true"
                    >
                      {active ? (
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: 'hsl(var(--sw-blue))' }}
                        />
                      ) : null}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="text-lg font-extrabold text-sw-dark">{item.label}</span>
                      <span
                        className="inline-block w-fit rounded-md px-2 py-0.5 text-[11px] font-bold"
                        style={{
                          backgroundColor: 'hsl(var(--sw-success) / 0.15)',
                          color: 'hsl(var(--sw-success))',
                        }}
                      >
                        Save {item.save}%
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-sw-grey line-through">${item.was}/mo</span>
                    <div
                      className="rounded-xl px-3 py-1.5"
                      style={{ backgroundColor: 'hsl(var(--sw-grey-light))' }}
                    >
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-sm font-medium text-sw-grey">$</span>
                        <span className="text-2xl font-extrabold text-sw-dark">{item.now}</span>
                        <span className="text-sm font-medium text-sw-grey"> /mo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <p className="mt-5 text-center text-sm leading-relaxed text-sw-grey">{plan.summary}</p>

        <button
          type="button"
          onClick={() => navigate(ROUTES.quiz28)}
          className="mt-5 w-full rounded-full bg-sw-blue px-6 py-4 text-center text-lg font-extrabold tracking-wide text-white uppercase shadow-lg transition-all duration-200 hover:bg-sw-blue-hover disabled:opacity-50"
        >
          Start my $1 trial
        </button>

        <ul className="mt-8 grid gap-2.5 text-sm text-sw-grey sm:grid-cols-2">
          {PRICING_FEATURES.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-0.5 text-sw-blue">✓</span>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-sw-grey">
          {PRICING_TRUST.map((item) => (
            <span key={item} className="flex items-center gap-2">
              <span className="text-sw-success">✓</span> {item}
            </span>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-sw-grey">
          Questions about billing? Visit our{' '}
          <Link to={ROUTES.billing} className="font-medium text-sw-blue hover:underline">
            Billing & Plans
          </Link>{' '}
          page.
        </p>
      </main>
    </>
  )
}
