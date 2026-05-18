import { resolveSitePath } from '../utils/sitePaths'

/**
 * Canonical marketing domain for SEO defaults (sitemap, robots, fallbacks before hydration).
 * Override at build time with `VITE_SITE_URL` if needed.
 */
export const SITE_URL_DEFAULT =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') || 'https://reddominoholdings.com'

export const SITE_NAME = 'Red Domino Holdings'

/** Short brand line used in titles and meta */
export const SITE_TAGLINE = 'Strategic Scaling. Infinite Potential.'

export const SEO_COPY = {
  home: {
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description:
      'Red Domino Holdings is a management firm scaling logistics, transportation, and digital media through proprietary technology—including Precision Pilot—and strategic market expansion.',
  },
  precisionPilot: {
    title: `Precision Pilot | ${SITE_NAME}`,
    description:
      'Precision Pilot: enterprise tools for fleet owners, dispatchers, and operations—OTR freight, equipment, and dedicated carrier networks. Web, Android, iOS, and Windows.',
  },
  precisionPilotTest: {
    title: `Precision Pilot (pre-release test) | ${SITE_NAME}`,
    description:
      'Pre-release test environment for Precision Pilot. For internal QA only—not indexed by search engines.',
  },
  livingBible: {
    title: `Living Bible | ${SITE_NAME}`,
    description:
      'Living Bible web application experience embedded in the Red Domino ecosystem for scripture study and engagement.',
  },
  livingBibleTest: {
    title: `Living Bible (pre-release test) | ${SITE_NAME}`,
    description:
      'Pre-release test environment for Living Bible. Internal QA route only and excluded from search indexing.',
  },
  accessRequest: {
    title: `Access Request | ${SITE_NAME}`,
    description:
      'Invite-only authentication gateway for protected Red Domino routes.',
  },
  adminAccess: {
    title: `Access Admin | ${SITE_NAME}`,
    description:
      'Administrative dashboard for approving or denying protected route access grants.',
  },
  privacy: {
    title: `Privacy Policy | ${SITE_NAME}`,
    description:
      'How Red Domino Holdings collects, uses, and protects personal information when you use our website and related services.',
  },
  terms: {
    title: `Terms of Service | ${SITE_NAME}`,
    description:
      'Terms governing use of the Red Domino Holdings website and related services.',
  },
}

/**
 * @param {string} origin - e.g. https://reddominoholdings.com (no trailing slash)
 */
export function buildOrganizationJsonLd(origin) {
  const base = origin.replace(/\/$/, '')
  const logoPath = resolveSitePath('/icons.svg')
  const logo = new URL(logoPath, `${base}/`).href
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: base,
    description: SEO_COPY.home.description,
    logo,
  }
}
