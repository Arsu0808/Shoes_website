import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { SessionProvider } from './context/SessionContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SessionProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'var(--color-surface-alt)',
                color: 'var(--color-deep)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                boxShadow: 'var(--shadow-card)',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </SessionProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
