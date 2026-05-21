/**
 * Pure helpers for invite email links and IDs (unit-tested).
 */

export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

export function inviteIdFromEmail(email) {
  return normalizeEmail(email).replace(/[^a-z0-9]/g, '_')
}

/**
 * @param {string} siteBaseUrl - Origin without trailing slash, e.g. https://reddominoholdings.com
 * @param {string} token
 */
export function buildInviteLink(siteBaseUrl, token) {
  const base = String(siteBaseUrl || '').trim().replace(/\/$/, '')
  if (!base) {
    throw new Error('siteBaseUrl is required for invite links')
  }
  return `${base}/access?invite=${encodeURIComponent(token)}`
}

export function resolveInviteSiteBaseUrl() {
  const fromEnv =
    process.env.SITE_BASE_URL ||
    process.env.VITE_SITE_URL ||
    process.env.INVITE_SITE_BASE_URL ||
    ''
  const trimmed = String(fromEnv).trim().replace(/\/$/, '')
  if (trimmed) return trimmed
  return 'https://reddominoholdings.com'
}
