/**
 * Prefix a same-origin path with Vite `base` (import.meta.env.BASE_URL).
 * Use for iframe src, fetch, etc. when the site is hosted under a subpath
 * (e.g. GitHub Pages project site: /website-v1/).
 *
 * Absolute http(s) URLs are returned unchanged.
 *
 * @param {string} path
 * @returns {string}
 */
export function resolveSitePath(path) {
  const s = String(path).trim()
  if (/^https?:\/\//i.test(s)) return s

  const base = import.meta.env.BASE_URL || '/'
  const normalizedPath = s.startsWith('/') ? s : `/${s}`

  if (base === '/' || base === '') return normalizedPath

  const baseNoSlash = base.endsWith('/') ? base.slice(0, -1) : base
  return `${baseNoSlash}${normalizedPath}`
}
