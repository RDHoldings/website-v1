import crypto from 'node:crypto'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'
import { onCall, HttpsError } from 'firebase-functions/v2/https'
import { defineSecret } from 'firebase-functions/params'
import { Resend } from 'resend'
import process from 'node:process'

initializeApp()
const db = getFirestore()
const RESEND_API_KEY = defineSecret('RESEND_API_KEY')

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

function inviteIdFromEmail(email) {
  return normalizeEmail(email).replace(/[^a-z0-9]/g, '_')
}

async function assertAdmin(auth) {
  if (!auth?.uid) throw new HttpsError('unauthenticated', 'Authentication required.')
  const snap = await db.collection('admins').doc(auth.uid).get()
  if (!snap.exists || snap.data()?.enabled === false) {
    throw new HttpsError('permission-denied', 'Admin access required.')
  }
}

function inviteLink(token) {
  return `https://reddominoholdings.com/access?invite=${encodeURIComponent(token)}`
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

async function sendInviteEmail(inviteEmail, token) {
  const key = RESEND_API_KEY.value()
  if (!key) {
    return { delivered: false, message: 'Invite created; RESEND_API_KEY missing so email was not sent.' }
  }
  const resend = new Resend(key)
  await resend.emails.send({
    from: 'Red Domino Access <access@reddominoholdings.com>',
    to: inviteEmail,
    subject: 'Your Red Domino invite link',
    html: `<p>You have been invited to Red Domino protected routes.</p><p><a href="${inviteLink(token)}">Accept invite</a></p>`,
  })
  return { delivered: true, message: 'Invite email sent.' }
}

export const sendInvite = onCall({ secrets: [RESEND_API_KEY] }, async (request) => {
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
})

export const resendInvite = onCall({ secrets: [RESEND_API_KEY] }, async (request) => {
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
})

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

export const seedInitialInvite = onCall({}, async (request) => {
  await assertAdmin(request.auth)
  const { email } = request.data || {}
  const result = await writeInvite({
    email: email || 'marc77014@gmail.com',
    invitedBy: request.auth.uid,
    status: 'pending',
  })
  return { ok: true, message: `Seeded invite for ${result.email}` }
})

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
