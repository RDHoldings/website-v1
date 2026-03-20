import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { buildOrganizationJsonLd, SITE_NAME, SITE_URL_DEFAULT } from '../config/site'

/**
 * @param {object} props
 * @param {string} props.title - Document title
 * @param {string} props.description - Meta description (keep ~150–160 chars for SERP)
 * @param {boolean} [props.noIndex]
 * @param {Record<string, unknown> | null | undefined} [props.jsonLd] - JSON-LD object, or `null` to suppress defaults. Omit on `/` for Organization schema.
 * @param {string} [props.ogType] - Open Graph type
 * @param {string} [props.ogImage] - Absolute image URL for sharing
 */
export function Seo({
  title,
  description,
  noIndex = false,
  jsonLd = null,
  ogType = 'website',
  ogImage,
}) {
  const { pathname } = useLocation()

  const origin =
    typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin.replace(/\/$/, '')
      : SITE_URL_DEFAULT

  const pathOnly = pathname.split('?')[0] || '/'
  const canonicalUrl = `${origin}${pathOnly === '/' ? '/' : pathOnly}`
  const imageUrl = ogImage || `${origin}/icons.svg`

  let structured = null
  if (jsonLd !== undefined) {
    structured = jsonLd
  } else if (pathname === '/') {
    structured = buildOrganizationJsonLd(origin)
  }

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={`${SITE_NAME} logo`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {structured ? (
        <script type="application/ld+json">{JSON.stringify(structured)}</script>
      ) : null}
    </Helmet>
  )
}
