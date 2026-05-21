import { google } from 'googleapis'
import { defineSecret } from 'firebase-functions/params'

export const GMAIL_SERVICE_ACCOUNT_JSON = defineSecret('GMAIL_SERVICE_ACCOUNT_JSON')

const GMAIL_SEND_SCOPE = 'https://www.googleapis.com/auth/gmail.send'
const DEFAULT_SENDER = 'support@reddominnoholdings.com'

function parseServiceAccountJson(raw) {
  if (!raw?.trim()) return null
  try {
    const j = JSON.parse(raw.trim())
    const clientEmail = j.client_email
    const privateKey = j.private_key
    if (!clientEmail || !privateKey) return null
    return { clientEmail, privateKey }
  } catch {
    return null
  }
}

function buildRfc822Raw(fromHeader, to, subject, html) {
  const b64 = Buffer.from(html, 'utf8').toString('base64')
  const wrapped = b64.replace(/.{1,76}/g, (m) => `${m}\r\n`).trimEnd()
  return [
    `From: ${fromHeader}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    wrapped,
  ].join('\r\n')
}

function encodeWeb64Raw(raw) {
  return Buffer.from(raw, 'utf8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

/** Send via Workspace domain-wide delegation (Precision Pilot mailer SA). */
export async function sendInviteEmailViaServiceAccount(inviteEmail, subject, html) {
  const rawJson = GMAIL_SERVICE_ACCOUNT_JSON.value()
  const creds = parseServiceAccountJson(rawJson)
  const impersonateUser =
    process.env.GMAIL_SUPPORT_USER?.trim() || DEFAULT_SENDER
  if (!creds || !impersonateUser) {
    return {
      delivered: false,
      message: 'Workspace Gmail service account is not configured.',
    }
  }

  const jwt = new google.auth.JWT({
    email: creds.clientEmail,
    key: creds.privateKey,
    scopes: [GMAIL_SEND_SCOPE],
    subject: impersonateUser,
  })

  const gmail = google.gmail({ version: 'v1', auth: jwt })
  const fromHeader = `Red Domino Access <${impersonateUser}>`
  const encoded = encodeWeb64Raw(buildRfc822Raw(fromHeader, inviteEmail, subject, html))

  await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw: encoded },
  })

  return { delivered: true, message: 'Invite email sent via Workspace Gmail.' }
}
