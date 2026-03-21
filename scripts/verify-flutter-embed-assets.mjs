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
}

if (failed) {
  process.exit(1)
}
console.log('verify-flutter-embed-assets: all checks passed')
