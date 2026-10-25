import { Link } from 'react-router-dom'
import { claudeQuizUiCopy } from '@/funnels/claude/i18n/claudeQuizUiCopy'
import { useI18n } from '../../../../../authorisation/src/i18n/I18nProvider'

/** Port of the identity-screen legal footer — matches production copy verbatim. */
export default function QuizTermsFooter() {
  const { locale } = useI18n()
  const copy = claudeQuizUiCopy(locale).terms

  return (
    <div className="mt-4 px-4 text-center">
      <p className="text-[11px] leading-relaxed text-sw-grey">
        {copy.prefix}{' '}
        <Link to="/terms-and-conditions" className="underline text-sw-blue hover:text-sw-blue-hover">
          {copy.terms}
        </Link>
        ,{' '}
        <Link to="/privacy-policy" className="underline text-sw-blue hover:text-sw-blue-hover">
          {copy.privacy}
        </Link>
        ,{' '}
        <Link to="/subscription-terms" className="underline text-sw-blue hover:text-sw-blue-hover">
          {copy.subscription}
        </Link>
      </p>
      <p className="mt-2 text-[11px] text-sw-grey">{copy.company}</p>
    </div>
  )
}
