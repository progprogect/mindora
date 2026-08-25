import { useSearchParams } from 'react-router-dom'
import usePageTitle from '@/marketing/hooks/usePageTitle'

export default function EmailPreferencesPage() {
  usePageTitle('SuccessWise.ai — Turn Daily Learning Into Daily Progress')
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
        background: '#fff',
      }}
    >
      <div style={{ maxWidth: 480, width: '100%' }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#1a1a1a' }}>
          Email Preferences
        </h1>
        <div>
          <div
            style={{
              padding: 16,
              border: '1px solid #e5e5e5',
              borderRadius: 8,
              marginBottom: 16,
            }}
          >
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ marginTop: 3, width: 18, height: 18 }} />
              <div>
                <p style={{ margin: '0 0 4px', fontWeight: 600, fontSize: 15, color: '#1a1a1a' }}>
                  Tips, insights & product updates
                </p>
                <p style={{ margin: 0, fontSize: 13, color: '#666' }}>
                  Learning tips from your AI coach Wise, progress celebrations, and platform updates.
                </p>
              </div>
            </label>
          </div>
          <p style={{ fontSize: 13, color: '#666', marginBottom: 20 }}>
            Note: Transactional emails (payment receipts, password resets, account alerts) will always be
            sent regardless of your marketing preferences.
          </p>
          <button
            type="button"
            disabled={!valid}
            style={{
              background: '#2563EB',
              color: '#fff',
              padding: '12px 32px',
              borderRadius: 8,
              border: 'none',
              fontSize: 15,
              fontWeight: 600,
              cursor: valid ? 'pointer' : 'not-allowed',
              opacity: 1,
              width: '100%',
            }}
          >
            Save Preferences
          </button>
          {!valid ? (
            <p style={{ fontSize: 13, color: '#dc2626', marginTop: 12, textAlign: 'center' }}>
              No email address provided. Please use the link from your email.
            </p>
          ) : null}
        </div>
        <p style={{ fontSize: 12, color: '#999', marginTop: 32, textAlign: 'center' }}>
          ClickTech Solutions LTD T/A SuccessWise.ai
          <br />
          Leytonstone House, 3 Hanbury Drive, London, E11 1GA, United Kingdom
        </p>
      </div>
    </div>
  )
}
