import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SessionProvider } from '../authorisation/src/auth/session.tsx'
import './index.css'
import App from './App.tsx'
import { initTracking } from '@/shared/lib/tracking'

initTracking()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SessionProvider>
      <App />
    </SessionProvider>
  </StrictMode>,
)
