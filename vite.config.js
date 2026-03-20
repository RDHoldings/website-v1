import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function viteBase() {
  const raw = process.env.VITE_BASE_URL?.trim()
  if (!raw || raw === '/') return '/'
  return raw.endsWith('/') ? raw : `${raw}/`
}

// https://vite.dev/config/
// base: '/' — custom domain at site root (e.g. www.reddominoholdings.com)
// base: '/repo-name/' — GitHub Pages project URL (set VITE_BASE_URL in CI or .env.production)
// public/ is copied to dist/ under that base (e.g. precision-pilot/**)
export default defineConfig({
  base: viteBase(),
  plugins: [react()],
})
