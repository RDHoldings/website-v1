import { resolveSitePath } from '../utils/sitePaths'

/**
 * Precision Pilot — marketing copy & download endpoints
 *
 * Plug-and-play:
 * 1. Drop builds into `public/downloads/precision-pilot/` using the filenames below
 *    (or change `fileUrl` to match your asset names).
 * 2. Set `enabled: true` for each platform you are ready to ship.
 * 3. For store listings, set `storeUrl` (and optional `storeLabel`); users will see the
 *    store button as the primary action when `storeUrl` is set.
 *
 * Paths under `fileUrl` are served from `public/` — e.g. `/downloads/...` → `public/downloads/...`
 */

/** Base URL for self-hosted bundles (relative to site origin) */
export const PRECISION_PILOT_DOWNLOAD_BASE = '/downloads/precision-pilot'

/**
 * Web client loaded inside `/precision-pilot` and `/precision-pilot-test`.
 * Defaults point at same-origin static files in `public/.../app/` (built to `dist/.../app/`).
 * Replace with a full SPA build or an external https:// URL when ready.
 */
export const precisionPilotWebApp = {
  /** Production web client — iframe `src` (https://… or path under /precision-pilot/app/) */
  productionEmbedUrl: '/precision-pilot/app/',
  /** Pre-release / staging web client for `/precision-pilot-test` */
  testEmbedUrl: '/precision-pilot-test/app/',
  /**
   * Query string appended to **test** embed only (no leading `?` required).
   * Leave empty for the public site so the embedded build uses its default Firebase/env
   * (forcing e.g. `env=staging` here can break the shell if staging backends are slow or unavailable).
   * For local flags, temporarily set e.g. `debug=1` or `debug=1&env=staging` while testing.
   */
  testUrlExtraParams: '',
}

/**
 * Resolved iframe src for the Precision Pilot shell routes.
 * @param {'production' | 'test'} variant
 * @returns {string | null}
 */
export function getPrecisionPilotWebEmbedSrc(variant) {
  const raw =
    variant === 'test'
      ? precisionPilotWebApp.testEmbedUrl?.trim()
      : precisionPilotWebApp.productionEmbedUrl?.trim()
  if (!raw) return null

  let resolved = raw
  if (!/^https?:\/\//i.test(raw)) {
    const ref = new URL(raw, 'https://placeholder.invalid')
    resolved = resolveSitePath(ref.pathname) + ref.search + ref.hash
  }

  if (variant !== 'test' || !precisionPilotWebApp.testUrlExtraParams?.trim()) {
    return resolved
  }
  const extra = precisionPilotWebApp.testUrlExtraParams.replace(/^\?/, '').trim()
  if (!extra) return resolved
  return resolved.includes('?') ? `${resolved}&${extra}` : `${resolved}?${extra}`
}

export const precisionPilot = {
  /** One line: who the app is for */
  audienceLine:
    'Built for fleet owners, dispatchers, and operations teams running OTR freight, equipment, and dedicated carrier networks—on Android, iOS, web, or Windows.',

  learnMore: {
    label: 'Learn more',
    href: '/precision-pilot',
  },

  downloadsHeading: 'Get Precision Pilot',
  downloadsSubtext:
    'Choose your platform. Store links and installers go live here as each build is published.',

  /**
   * @typedef {Object} PrecisionPilotPlatform
   * @property {string} id
   * @property {string} name
   * @property {string} description
   * @property {string} fileUrl - Self-hosted file (under public/) or absolute URL for web app
   * @property {string | null} storeUrl - Play Store, App Store, Microsoft Store, etc.
   * @property {string} [storeLabel] - Button label when storeUrl is set
   * @property {boolean} enabled - Set true when file exists or web URL is final
   */

  /** @type {PrecisionPilotPlatform[]} */
  platforms: [
    {
      id: 'android',
      name: 'Android',
      description: 'Phones and tablets — Play Store or enterprise / MDM distribution.',
      fileUrl: `${PRECISION_PILOT_DOWNLOAD_BASE}/precision-pilot-android.aab`,
      storeUrl: null,
      storeLabel: 'Google Play',
      enabled: false,
    },
    {
      id: 'ios',
      name: 'iOS',
      description: 'iPhone and iPad — TestFlight or public App Store when available.',
      fileUrl: `${PRECISION_PILOT_DOWNLOAD_BASE}/precision-pilot-ios.ipa`,
      storeUrl: null,
      storeLabel: 'App Store',
      enabled: false,
    },
    {
      id: 'web',
      name: 'Web',
      description: 'Full experience in the browser — no install required.',
      /** Opens the hosted web shell on this site; enable when the product is public */
      fileUrl: '/precision-pilot',
      storeUrl: null,
      storeLabel: null,
      enabled: true,
    },
    {
      id: 'windows',
      name: 'Windows',
      description: 'Desktop app for Windows 10 and 11.',
      fileUrl: `${PRECISION_PILOT_DOWNLOAD_BASE}/precision-pilot-windows.msix`,
      storeUrl: null,
      storeLabel: 'Microsoft Store',
      enabled: false,
    },
  ],
}
