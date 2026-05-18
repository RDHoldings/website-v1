import { resolveSitePath } from '../utils/sitePaths'

export const livingBibleWebApp = {
  productionEmbedUrl: '/living-bible/app/',
  testEmbedUrl: '/living-bible-test/app/',
  testUrlExtraParams: '',
}

/**
 * @param {'production' | 'test'} variant
 * @returns {string | null}
 */
export function getLivingBibleWebEmbedSrc(variant) {
  const raw =
    variant === 'test'
      ? livingBibleWebApp.testEmbedUrl?.trim()
      : livingBibleWebApp.productionEmbedUrl?.trim()
  if (!raw) return null

  let resolved = raw
  if (!/^https?:\/\//i.test(raw)) {
    const ref = new URL(raw, 'https://placeholder.invalid')
    resolved = resolveSitePath(ref.pathname) + ref.search + ref.hash
  }

  if (variant !== 'test' || !livingBibleWebApp.testUrlExtraParams?.trim()) {
    return resolved
  }
  const extra = livingBibleWebApp.testUrlExtraParams.replace(/^\?/, '').trim()
  if (!extra) return resolved
  return resolved.includes('?') ? `${resolved}&${extra}` : `${resolved}?${extra}`
}
