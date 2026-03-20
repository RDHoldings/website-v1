/**
 * Replaces YOUR_GOOGLE_MAPS_WEB_API_KEY in Flutter web index.html files under dist/
 * after Vite build. Set GOOGLE_MAPS_WEB_API_KEY in the environment (or GitHub Actions secret).
 * No-op if unset — Maps on web will not work until a valid key is injected.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const root = join(__dirname, '..')
const placeholder = 'YOUR_GOOGLE_MAPS_WEB_API_KEY'
const key = process.env.GOOGLE_MAPS_WEB_API_KEY?.trim()

if (!key) {
  console.log(
    'inject-google-maps-key: GOOGLE_MAPS_WEB_API_KEY unset — skipping (set Actions secret or env for Maps on web).',
  )
  process.exit(0)
}

const files = [
  join(root, 'dist', 'precision-pilot', 'app', 'index.html'),
  join(root, 'dist', 'precision-pilot-test', 'app', 'index.html'),
]

for (const file of files) {
  if (!existsSync(file)) {
    console.warn(`inject-google-maps-key: skip missing ${file}`)
    continue
  }
  const before = readFileSync(file, 'utf8')
  if (!before.includes(placeholder)) {
    console.warn(`inject-google-maps-key: placeholder not found in ${file}`)
    continue
  }
  writeFileSync(file, before.split(placeholder).join(key))
  console.log(`inject-google-maps-key: updated ${file}`)
}
