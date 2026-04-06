/**
 * After Vite copies public/ → dist/, normalize <base href> in Flutter embed index.html
 * so asset URLs match the site base (import.meta.env.BASE_URL / VITE_BASE_URL).
 *
 * Without this, GitHub Pages project URLs (e.g. /website-v1/) load the iframe from the
 * correct path, but Flutter still requests main.dart.js from /precision-pilot/... at the
 * origin root → 404 and a blank app.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function siteBasePrefix() {
  const raw = process.env.VITE_BASE_URL?.trim()
  if (!raw || raw === '/' || raw === 'null' || raw === 'undefined') return ''
  let b = raw.startsWith('/') ? raw : `/${raw}`
  if (!b.endsWith('/')) b += '/'
  return b.endsWith('/') ? b.slice(0, -1) : b
}

/**
 * @param {string} embedPath - e.g. precision-pilot/app/ (no leading slash)
 */
function flutterBaseHref(embedPath) {
  const prefix = siteBasePrefix()
  const path = embedPath.replace(/^\//, '').replace(/\/?$/, '') + '/'
  const full = prefix ? `${prefix}/${path}` : `/${path}`
  return full.replace(/\/+/g, '/')
}

const embeds = [
  { dir: 'precision-pilot', path: 'precision-pilot/app/' },
  { dir: 'precision-pilot-test', path: 'precision-pilot-test/app/' },
]

const prefix = siteBasePrefix()
console.log(
  `rewrite-flutter-embed-base-href: VITE_BASE_URL site prefix="${prefix || '/'}"`,
)

for (const { dir, path } of embeds) {
  const indexPath = join(root, 'dist', dir, 'app', 'index.html')
  if (!existsSync(indexPath)) {
    console.warn(`rewrite-flutter-embed-base-href: skip missing ${indexPath}`)
    continue
  }
  const href = flutterBaseHref(path)
  const html = readFileSync(indexPath, 'utf8')
  const baseRe = /<base\s+href\s*=\s*["'][^"']*["']\s*>/i
  if (!baseRe.test(html)) {
    console.warn(`rewrite-flutter-embed-base-href: no <base href> in ${indexPath}`)
    continue
  }
  const replaced = html.replace(baseRe, `<base href="${href}">`)
  if (replaced === html) {
    console.log(
      `rewrite-flutter-embed-base-href: OK (unchanged) ${indexPath} <base href="${href}">`,
    )
    continue
  }
  writeFileSync(indexPath, replaced, 'utf8')
  console.log(`rewrite-flutter-embed-base-href: ${indexPath} → <base href="${href}">`)
}
