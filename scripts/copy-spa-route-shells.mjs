/**
 * GitHub Pages returns 404 for unknown paths even when 404.html is the SPA shell.
 * Some browsers and tools treat that as a failed navigation (e.g. ERR_INVALID_RESPONSE).
 * Copy the built index.html into each client-route directory so
 * /precision-pilot-test/ resolves to precision-pilot-test/index.html → 200 OK.
 *
 * Runs automatically after `vite build` via npm `postbuild`.
 */
import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dist = join(root, 'dist')
const mainIndex = join(dist, 'index.html')

const ROUTES = [
  'precision-pilot',
  'precision-pilot-test',
  'living-bible',
  'living-bible-test',
  'access',
  'access-request',
  'admin/access',
  'privacy',
  'terms',
]

if (!existsSync(mainIndex)) {
  console.error('copy-spa-route-shells: dist/index.html missing — run vite build first')
  process.exit(1)
}

for (const route of ROUTES) {
  const dir = join(dist, route)
  mkdirSync(dir, { recursive: true })
  const out = join(dir, 'index.html')
  copyFileSync(mainIndex, out)
  console.log(`copy-spa-route-shells: wrote ${out}`)
}
