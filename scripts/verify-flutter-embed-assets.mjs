/**
 * After Vite build + inject-google-maps-key, ensure Flutter web embeds under dist/
 * include the tracked `assets/.env` placeholder (avoids Flutter 404) and recommended
 * Google Maps loading (`async` + `loading=async`).
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const root = join(__dirname, '..')

const embeds = ['precision-pilot-test', 'precision-pilot']

let failed = false

/** Never commit real Maps browser keys in tracked public/ HTML — use YOUR_GOOGLE_MAPS_WEB_API_KEY only. */
const publicIndexFiles = [
  join(root, 'public', 'precision-pilot', 'app', 'index.html'),
  join(root, 'public', 'precision-pilot-test', 'app', 'index.html'),
]

for (const pubPath of publicIndexFiles) {
  if (!existsSync(pubPath)) continue
  const src = readFileSync(pubPath, 'utf8')
  if (src.includes('AIzaSy')) {
    console.error(
      `verify-flutter-embed-assets: remove hardcoded Google Maps API key from ${pubPath} — use YOUR_GOOGLE_MAPS_WEB_API_KEY and GOOGLE_MAPS_WEB_API_KEY at build. Rotate the exposed key in Google Cloud Console.`,
    )
    failed = true
  }
}

/** Tracked Flutter assets/.env must stay empty of secrets — CI injects into dist/ only. */
const publicEnvFiles = [
  join(root, 'public', 'precision-pilot', 'app', 'assets', '.env'),
  join(root, 'public', 'precision-pilot-test', 'app', 'assets', '.env'),
]

for (const envPath of publicEnvFiles) {
  if (!existsSync(envPath)) continue
  const src = readFileSync(envPath, 'utf8')
  if (
    src.includes('AIzaSy') ||
    /\b(re_[a-zA-Z0-9_]+|zpka_[a-zA-Z0-9_]+)\b/.test(src)
  ) {
    console.error(
      `verify-flutter-embed-assets: remove API keys from tracked ${envPath} — use GitHub Actions secrets and inject-flutter-web-env.mjs.`,
    )
    failed = true
  }
}

const ci =
  process.env.CI === 'true' ||
  process.env.GITHUB_ACTIONS === 'true' ||
  process.env.GITHUB_ACTIONS === '1'

for (const name of embeds) {
  const envPath = join(root, 'dist', name, 'app', 'assets', '.env')
  if (!existsSync(envPath)) {
    console.error(`verify-flutter-embed-assets: missing ${envPath}`)
    failed = true
  } else {
    console.log(`verify-flutter-embed-assets: OK ${envPath}`)
  }

  const indexPath = join(root, 'dist', name, 'app', 'index.html')
  if (!existsSync(indexPath)) {
    console.error(`verify-flutter-embed-assets: missing ${indexPath}`)
    failed = true
    continue
  }
  const html = readFileSync(indexPath, 'utf8')
  if (!html.includes('maps.googleapis.com/maps/api/js')) {
    console.error(`verify-flutter-embed-assets: Maps script URL missing in ${indexPath}`)
    failed = true
  }
  if (!html.includes('loading=async')) {
    console.error(
      `verify-flutter-embed-assets: Maps URL must include loading=async (see ${indexPath})`,
    )
    failed = true
  }
  const mapsLine = html
    .split('\n')
    .find((line) => line.includes('maps.googleapis.com/maps/api/js'))
  if (mapsLine && !mapsLine.includes('async')) {
    console.error(
      `verify-flutter-embed-assets: Maps <script> should use the async attribute (${indexPath})`,
    )
    failed = true
  }
  if (
    ci &&
    mapsLine &&
    mapsLine.includes('YOUR_GOOGLE_MAPS_WEB_API_KEY')
  ) {
    console.error(
      `verify-flutter-embed-assets: Maps placeholder was not replaced in ${indexPath}. Ensure GOOGLE_MAPS_WEB_API_KEY is set for this build (GitHub Actions secret on CI).`,
    )
    failed = true
  }
}

if (failed) {
  process.exit(1)
}
console.log('verify-flutter-embed-assets: all checks passed')
