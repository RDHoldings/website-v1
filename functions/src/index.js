import crypto from 'node:crypto'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'
import { onCall, HttpsError } from 'firebase-functions/v2/https'
import { defineSecret } from 'firebase-functions/params'
import process from 'node:process'
import {
  normalizeEmail,
  inviteIdFromEmail,
  buildInviteLink,
  resolveInviteSiteBaseUrl,
} from './inviteUtil.js'
import {
  GMAIL_SERVICE_ACCOUNT_JSON,
  sendInviteEmailViaServiceAccount,
} from './gmailServiceAccount.js'

initializeApp()
const db = getFirestore()
const BOOTSTRAP_AUTOMATION_KEY = defineSecret('BOOTSTRAP_AUTOMATION_KEY')

async function assertAdmin(auth) {
  if (!auth?.uid) throw new HttpsError('unauthenticated', 'Authentication required.')
  const snap = await db.collection('admins').doc(auth.uid).get()
  if (!snap.exists || snap.data()?.enabled === false) {
    throw new HttpsError('permission-denied', 'Admin access required.')
  }
}

function inviteLink(token) {
  return buildInviteLink(resolveInviteSiteBaseUrl(), token)
}

async function writeInvite({
  email,
  invitedBy,
  role = null,
  status = 'pending',
  keepToken = false,
}) {
  const normalized = normalizeEmail(email)
  if (!normalized.includes('@')) {
    throw new HttpsError('invalid-argument', 'A valid email is required.')
  }
  const inviteId = inviteIdFromEmail(normalized)
  const ref = db.collection('invites').doc(inviteId)
  const current = await ref.get()
  const token =
    keepToken && current.exists && current.data()?.token
      ? current.data().token
      : crypto.randomBytes(24).toString('hex')
  await ref.set(
    {
      email: normalized,
      status,
      invitedBy,
      role: role || null,
      token,
      createdAt: current.exists ? current.data()?.createdAt || FieldValue.serverTimestamp() : FieldValue.serverTimestamp(),
      sentAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  )
  return { inviteId, token, email: normalized }
}

function inviteEmailContent(token) {
  const inviteUrl = inviteLink(token)
  const subject = 'Your Red Domino invite link'
  const html = [
    '<p>You have been invited to Red Domino protected routes.</p>',
    `<p><a href="${inviteUrl}">Accept invite</a></p>`,
    '<p>If the link does not open, copy and paste this URL:</p>',
    `<p>${inviteUrl}</p>`,
  ].join('')
  return { subject, html }
}

async function sendInviteEmail(inviteEmail, token) {
  const { subject, html } = inviteEmailContent(token)
  return sendInviteEmailViaServiceAccount(inviteEmail, subject, html)
}

/** Workspace SA is primary; OAuth secrets optional when all three are configured in Functions. */
const inviteEmailSecrets = [GMAIL_SERVICE_ACCOUNT_JSON]

export const sendInvite = onCall(
  { secrets: inviteEmailSecrets },
  async (request) => {
  await assertAdmin(request.auth)
  const { email, role } = request.data || {}
  const result = await writeInvite({
    email,
    invitedBy: request.auth.uid,
    role,
    status: 'sent',
  })
  const delivery = await sendInviteEmail(result.email, result.token)
  return {
    ok: true,
    ...delivery,
    email: result.email,
    token: result.token,
  }
  },
)

export const resendInvite = onCall(
  { secrets: inviteEmailSecrets },
  async (request) => {
  await assertAdmin(request.auth)
  const { email } = request.data || {}
  const result = await writeInvite({
    email,
    invitedBy: request.auth.uid,
    keepToken: true,
    status: 'sent',
  })
  const delivery = await sendInviteEmail(result.email, result.token)
  return { ok: true, ...delivery, email: result.email }
  },
)

export const revokeInvite = onCall({}, async (request) => {
  await assertAdmin(request.auth)
  const { email } = request.data || {}
  const normalized = normalizeEmail(email)
  const inviteId = inviteIdFromEmail(normalized)
  await db.collection('invites').doc(inviteId).set(
    {
      email: normalized,
      status: 'revoked',
      updatedAt: FieldValue.serverTimestamp(),
      revokedAt: FieldValue.serverTimestamp(),
      revokedBy: request.auth.uid,
    },
    { merge: true },
  )
  return { ok: true, message: 'Invite revoked.' }
})

export const seedInitialInvite = onCall(
  { secrets: [...inviteEmailSecrets, BOOTSTRAP_AUTOMATION_KEY] },
  async (request) => {
  const automationKey = String(request.data?.automationKey || '').trim()
  const expectedAutomationKey = String(BOOTSTRAP_AUTOMATION_KEY.value() || '').trim()
  const fromAutomation =
    !request.auth?.uid && expectedAutomationKey.length > 0 && automationKey === expectedAutomationKey
  if (!fromAutomation) {
    await assertAdmin(request.auth)
  }
  const { email, sendEmail = false } = request.data || {}
  const result = await writeInvite({
    email: email || 'marc77014@gmail.com',
    invitedBy: fromAutomation ? 'github-actions' : request.auth.uid,
    status: sendEmail ? 'sent' : 'pending',
  })
  if (!sendEmail) {
    return { ok: true, message: `Seeded invite for ${result.email}` }
  }
  const delivery = await sendInviteEmail(result.email, result.token)
  return { ok: true, ...delivery, message: `Seeded invite for ${result.email}` }
  },
)

export const bootstrapAdmin = onCall({}, async (request) => {
  if (!request.auth?.uid) throw new HttpsError('unauthenticated', 'Authentication required.')
  const email = normalizeEmail(request.data?.email || request.auth.token?.email)
  const expected = normalizeEmail(process.env.BOOTSTRAP_ADMIN_EMAIL)
  if (!expected || email !== expected) {
    throw new HttpsError('permission-denied', 'Bootstrap admin email mismatch.')
  }
  await db.collection('admins').doc(request.auth.uid).set(
    {
      uid: request.auth.uid,
      email,
      enabled: true,
      bootstrappedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  )
  await getAuth().setCustomUserClaims(request.auth.uid, { admin: true })
  return { ok: true, message: 'Bootstrap admin granted.' }
})

/** Pre-sign-in invite check (no token returned). */
export const verifyInvite = onCall({}, async (request) => {
  const email = normalizeEmail(request.data?.email)
  if (!email) throw new HttpsError('invalid-argument', 'A valid email is required.')
  const inviteId = inviteIdFromEmail(email)
  const inviteSnap = await db.collection('invites').doc(inviteId).get()
  if (!inviteSnap.exists) throw new HttpsError('permission-denied', 'No invite was found for this email.')
  const invite = inviteSnap.data()
  if (invite.status === 'revoked') throw new HttpsError('permission-denied', 'This invite has been revoked.')
  return {
    ok: true,
    email: invite.email,
    status: invite.status,
  }
})

export const claimInvite = onCall({}, async (request) => {
  if (!request.auth?.uid) throw new HttpsError('unauthenticated', 'Authentication required.')
  const email = normalizeEmail(request.data?.email || request.auth.token?.email)
  if (!email) throw new HttpsError('invalid-argument', 'Invite email is required.')
  const inviteId = inviteIdFromEmail(email)
  const inviteRef = db.collection('invites').doc(inviteId)
  const inviteSnap = await inviteRef.get()
  if (!inviteSnap.exists) throw new HttpsError('permission-denied', 'No invite found.')
  const invite = inviteSnap.data()
  if (invite.status === 'revoked') throw new HttpsError('permission-denied', 'Invite revoked.')
  const token = request.data?.inviteToken || ''
  if (invite.token && token && invite.token !== token) {
    throw new HttpsError('permission-denied', 'Invite token mismatch.')
  }
  const routeKey = request.data?.routeKey || null
  await db.collection('access_grants').doc(request.auth.uid).set(
    {
      uid: request.auth.uid,
      email,
      status: 'approved',
      source: 'invite',
      approvedBy: invite.invitedBy || 'system',
      requestedRoutes: routeKey ? [routeKey] : [],
      updatedAt: FieldValue.serverTimestamp(),
      acceptedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  )
  await inviteRef.set(
    {
      status: 'accepted',
      acceptedByUid: request.auth.uid,
      acceptedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  )
  return { ok: true, inviteStatus: 'accepted' }
})
