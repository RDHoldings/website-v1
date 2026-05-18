export function normalizeInviteEmail(email) {
  return String(email || '').trim().toLowerCase()
}

export function toInviteEmailId(email) {
  return normalizeInviteEmail(email).replace(/[^a-z0-9]/g, '_')
}
