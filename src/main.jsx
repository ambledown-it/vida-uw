import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext'
import { ApplicationsProvider } from './contexts/ApplicationsContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ApplicationsProvider>
        <App />
      </ApplicationsProvider>
    </AuthProvider>
  </StrictMode>,
)
