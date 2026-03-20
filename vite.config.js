import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base: '/' — correct for custom domain at site root (www / apex on GitHub Pages)
// public/ is copied to dist/ on build (e.g. public/precision-pilot/** → /precision-pilot/** on the live site)
export default defineConfig({
  base: '/',
  plugins: [react()],
})
