import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import './styles/globals.css'
import App from './App.jsx'

const routerBasename = (() => {
  const b = import.meta.env.BASE_URL || '/'
  if (b === '/') return undefined
  return b.endsWith('/') ? b.slice(0, -1) : b
})()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={routerBasename}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
