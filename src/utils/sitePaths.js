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

  let base = import.meta.env.BASE_URL || '/'
  if (base === 'null' || base === 'undefined') base = '/'
  const normalizedPath = s.startsWith('/') ? s : `/${s}`

  if (base === '/' || base === '') return normalizedPath

  const baseNoSlash = base.endsWith('/') ? base.slice(0, -1) : base
  return `${baseNoSlash}${normalizedPath}`
}

/**
 * Full https URL for same-origin navigation / iframes (avoids ambiguous relative resolution).
 * @param {string} href - path or absolute URL
 */
export function toAbsoluteSiteUrl(href) {
  const h = String(href).trim()
  if (/^https?:\/\//i.test(h)) return h
  if (typeof window === 'undefined' || !window.location?.origin) return h
  try {
    return new URL(h, `${window.location.origin}/`).href
  } catch {
    return h
  }
}
