import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base: '/' — correct for custom domain at site root (www / apex on GitHub Pages)
export default defineConfig({
  base: '/',
  plugins: [react()],
})
