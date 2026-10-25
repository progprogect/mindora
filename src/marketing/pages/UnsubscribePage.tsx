import { useSearchParams } from 'react-router-dom'
import { COMPANY } from '@/marketing/data/company'
import { unsubscribeCopy } from '@/marketing/data/unsubscribeCopy'
import usePageTitle from '@/marketing/hooks/usePageTitle'
import { useI18n } from '../../../authorisation/src/i18n/I18nProvider'

export default function UnsubscribePage() {
  const { locale } = useI18n()
  const copy = unsubscribeCopy(locale)
  usePageTitle(copy.pageTitle)
  const [params] = useSearchParams()
  const email = params.get('email') || ''
  const token = params.get('token') || ''
  const valid = Boolean(email && token)

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: '#1a1a1a' }}>
          {copy.heading}
        </h1>
        <div>
          <p style={{ fontSize: 16, color: '#333', marginBottom: 8 }}>
            {copy.confirmQuestion}
          </p>
          <button
            type="button"
            disabled={!valid}
            style={{
              background: '#1a1a1a',
              color: '#fff',
              padding: '12px 32px',
              borderRadius: 8,
              border: 'none',
              fontSize: 15,
              fontWeight: 600,
              cursor: valid ? 'pointer' : 'not-allowed',
              opacity: 1,
            }}
          >
            {copy.button}
          </button>
          {!valid ? (
            <p style={{ fontSize: 13, color: '#dc2626', marginTop: 12 }}>
              {copy.invalidLink}
            </p>
          ) : null}
        </div>
        <p style={{ fontSize: 12, color: '#999', marginTop: 32 }}>
          {COMPANY.tradingAs}
          <br />
          {COMPANY.address}
        </p>
      </div>
    </div>
  )
}
