import { Outlet, useLocation } from 'react-router-dom'
import MarketingHeader from './MarketingHeader'
import MarketingFooter from './MarketingFooter'
import HomeStickyCta from './HomeStickyCta'

export default function MarketingLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isFinance = pathname === '/learn/financial-wellbeing'
  const lightBg = isHome || isFinance

  return (
    <div
      className={`min-h-dvh overflow-x-hidden ${lightBg ? 'bg-white' : ''}`}
      style={lightBg ? undefined : { backgroundColor: 'hsl(var(--sw-grey-light))' }}
    >
      <MarketingHeader />
      {!isHome ? <div className="h-16" aria-hidden="true" /> : null}
      <Outlet />
      <MarketingFooter />
      <HomeStickyCta />
    </div>
  )
}
