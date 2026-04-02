import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import './styles/globals.css'
import './config/firebaseClient.js'
import App from './App.jsx'

const routerBasename = (() => {
  let b = import.meta.env.BASE_URL || '/'
  if (b === 'null' || b === 'undefined') b = '/'
  if (b !== '/' && !b.startsWith('/')) b = `/${b}`
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
