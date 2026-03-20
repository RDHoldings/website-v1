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

export const precisionPilot = {
  /** One line: who the app is for */
  audienceLine:
    'Built for fleet owners, dispatchers, and operations teams running OTR freight, equipment, and dedicated carrier networks—on Android, iOS, web, or Windows.',

  learnMore: {
    label: 'Learn more',
    /** Swap for `/precision-pilot` or another route when you add a product page */
    href: 'mailto:info@reddominoholdings.com?subject=Precision%20Pilot%20inquiry',
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
      fileUrl: 'https://app.precisionpilot.example.com',
      storeUrl: null,
      storeLabel: null,
      enabled: false,
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
