import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SessionProvider } from '@/auth/session'
import { I18nProvider } from '@/i18n/I18nProvider'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <SessionProvider>
        <App />
      </SessionProvider>
    </I18nProvider>
  </StrictMode>,
)
