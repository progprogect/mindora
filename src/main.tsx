import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SessionProvider } from '../authorisation/src/auth/session.tsx'
import { I18nProvider } from '../authorisation/src/i18n/I18nProvider'
import './index.css'
import App from './App.tsx'
import { initTracking } from '@/shared/lib/tracking'

initTracking()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <SessionProvider>
        <App />
      </SessionProvider>
    </I18nProvider>
  </StrictMode>,
)
