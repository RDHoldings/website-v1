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
/** Raw browser Maps keys in HTML (never commit in public/ — use placeholder only). */
const leakedKeyInScript = /key=AIzaSy[A-Za-z0-9_-]{20,}/
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

function applyMapsKey(html) {
  let out = html
  if (out.includes(placeholder)) {
    out = out.split(placeholder).join(key)
  }
  // Recover if a real key was committed into public/ instead of the placeholder
  if (leakedKeyInScript.test(out)) {
    out = out.replace(/key=AIzaSy[A-Za-z0-9_-]{20,}/g, `key=${key}`)
  }
  return out
}

for (const file of files) {
  if (!existsSync(file)) {
    console.warn(`inject-google-maps-key: skip missing ${file}`)
    continue
  }
  const before = readFileSync(file, 'utf8')
  if (!before.includes(placeholder) && !leakedKeyInScript.test(before)) {
    console.warn(`inject-google-maps-key: no placeholder or Maps key= pattern in ${file}`)
    continue
  }
  const after = applyMapsKey(before)
  if (after === before) {
    console.warn(`inject-google-maps-key: no change for ${file}`)
    continue
  }
  writeFileSync(file, after)
  console.log(`inject-google-maps-key: updated ${file}`)
}
