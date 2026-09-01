import { useSearchParams } from 'react-router-dom'
import { COMPANY } from '@/marketing/data/company'
import usePageTitle from '@/marketing/hooks/usePageTitle'

export default function UnsubscribePage() {
  usePageTitle('MindoraAcademy.com — Turn Daily Learning Into Daily Progress')
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
          Unsubscribe
        </h1>
        <div>
          <p style={{ fontSize: 16, color: '#333', marginBottom: 8 }}>
            Are you sure you want to unsubscribe?
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
            Unsubscribe
          </button>
          {!valid ? (
            <p style={{ fontSize: 13, color: '#dc2626', marginTop: 12 }}>
              No email address provided. Please use the link from your email.
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
