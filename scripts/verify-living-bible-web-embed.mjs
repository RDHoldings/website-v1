import { existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dist = join(root, 'dist')

function fail(message) {
  console.error(`verify-living-bible-web-embed: ${message}`)
  process.exit(1)
}

function verifyIndex(route, expectedBasePrefix) {
  const file = join(dist, route, 'app', 'index.html')
  if (!existsSync(file)) {
    fail(`missing ${route}/app/index.html`)
  }
  const html = readFileSync(file, 'utf8')
  if (!html.includes('_expo/static')) {
    fail(`${route}/app/index.html missing _expo/static references`)
  }
  if (!html.includes(`${expectedBasePrefix}/_expo/static/`)) {
    fail(`${route}/app/index.html missing ${expectedBasePrefix}/_expo/static/ assets`)
  }
}

verifyIndex('living-bible', '/living-bible/app')
verifyIndex('living-bible-test', '/living-bible-test/app')
console.log('verify-living-bible-web-embed: ok')
