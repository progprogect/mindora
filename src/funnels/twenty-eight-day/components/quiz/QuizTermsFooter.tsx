import { withLocale } from '../../../../../authorisation/src/i18n/locale'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { quizTermsCopy } from '@/funnels/twenty-eight-day/data/funnelCopy'
import type { FunnelLocale } from '@/funnels/twenty-eight-day/data/quizScreens'
import { useI18n } from '../../../../../authorisation/src/i18n/I18nProvider'

export default function QuizTermsFooter() {
  const { locale } = useI18n()
  const copy = useMemo(() => quizTermsCopy(locale as FunnelLocale), [locale])

  return (
    <p className="mt-4 text-center text-[11px] leading-relaxed text-sw-grey">
      {copy.prefix}{' '}
      <Link to={withLocale(locale, "/terms-and-conditions")} className="underline text-sw-blue hover:text-sw-blue-hover">
        {copy.terms}
      </Link>
      {copy.and}{' '}
      <Link to={withLocale(locale, "/privacy-policy")} className="underline text-sw-blue hover:text-sw-blue-hover">
        {copy.privacy}
      </Link>
      {copy.and}{' '}
      <Link to={withLocale(locale, "/subscription-terms")} className="underline text-sw-blue hover:text-sw-blue-hover">
        {copy.subscription}
      </Link>
    </p>
  )
}
