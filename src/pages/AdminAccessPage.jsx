import { useEffect, useMemo, useState } from 'react'
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { Seo } from '../components/Seo'
import { useAccessGate } from '../contexts/AccessGateContext'
import { getFirebaseDb, getFirebaseFunctions } from '../config/firebaseClient'
import { SEO_COPY } from '../config/site'
import { httpsCallable } from 'firebase/functions'

export function AdminAccessPage() {
  const { authUser, inviteDoc } = useAccessGate()
  const [isAdmin, setIsAdmin] = useState(false)
  const [grantRows, setGrantRows] = useState([])
  const [inviteRows, setInviteRows] = useState([])
  const [status, setStatus] = useState('Checking admin status…')
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('')
  const [adminMessage, setAdminMessage] = useState('')

  useEffect(() => {
    const db = getFirebaseDb()
    if (!db || !authUser) {
      setIsAdmin(false)
      setStatus('Sign in to continue.')
      return undefined
    }
    const unsubAdmin = onSnapshot(doc(db, 'admins', authUser.uid), (snap) => {
      const ok = snap.exists() && snap.data()?.enabled !== false
      setIsAdmin(ok)
      setStatus(ok ? '' : 'You are signed in, but not in admins/{uid}.')
    })
    return () => unsubAdmin()
  }, [authUser])

  useEffect(() => {
    const db = getFirebaseDb()
    if (!db || !isAdmin) {
      setGrantRows([])
      return undefined
    }
    const q = query(collection(db, 'access_grants'), orderBy('updatedAt', 'desc'))
    const unsub = onSnapshot(q, (snapshot) => {
      setGrantRows(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
    })
    return () => unsub()
  }, [isAdmin])

  useEffect(() => {
    const db = getFirebaseDb()
    if (!db || !isAdmin) {
      setInviteRows([])
      setAdminMessage('')
      return undefined
    }
    const q = query(collection(db, 'invites'), orderBy('updatedAt', 'desc'))
    const unsub = onSnapshot(q, (snapshot) => {
      setInviteRows(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
    })
    return () => unsub()
  }, [isAdmin])

  async function setGrantStatus(uid, next) {
    const db = getFirebaseDb()
    if (!db) return
    await setDoc(
      doc(db, 'access_grants', uid),
      {
        uid,
        status: next,
        updatedAt: serverTimestamp(),
        reviewedBy: authUser?.uid || '',
      },
      { merge: true },
    )
  }

  async function sendInvite() {
    const fns = getFirebaseFunctions()
    if (!fns) return
    const callable = httpsCallable(fns, 'sendInvite')
    const result = await callable({ email: inviteEmail, role: inviteRole || null })
    setAdminMessage(result.data?.message || 'Invite sent.')
    setInviteEmail('')
    setInviteRole('')
  }

  async function resendInvite(email) {
    const fns = getFirebaseFunctions()
    if (!fns) return
    const callable = httpsCallable(fns, 'resendInvite')
    const result = await callable({ email })
    setAdminMessage(result.data?.message || 'Invite resent.')
  }

  async function revokeInvite(email) {
    const fns = getFirebaseFunctions()
    if (!fns) return
    const callable = httpsCallable(fns, 'revokeInvite')
    const result = await callable({ email })
    setAdminMessage(result.data?.message || 'Invite revoked.')
  }

  async function seedFirstInvite() {
    const fns = getFirebaseFunctions()
    if (!fns) return
    const callable = httpsCallable(fns, 'seedInitialInvite')
    const result = await callable({ email: 'marc77014@gmail.com' })
    setAdminMessage(result.data?.message || 'Seed invite created.')
  }

  const sorted = useMemo(() => grantRows, [grantRows])
  const inviteSorted = useMemo(() => inviteRows, [inviteRows])

  return (
    <>
      <Seo title={SEO_COPY.adminAccess.title} description={SEO_COPY.adminAccess.description} noIndex />
      <main id="site-main" className="min-h-screen bg-[#0a0a0a] px-6 py-8 text-[#e5e7eb]">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-2xl font-bold text-[#f3f4f6]">Access dashboard</h1>
          {!isAdmin ? (
            <p className="mt-4 rounded-md border border-amber-700/40 bg-amber-950/30 px-4 py-3 text-sm text-amber-200">
              {status}
            </p>
          ) : (
            <div className="mt-6 space-y-6">
              <section className="rounded-xl border border-white/10 bg-black/30 p-4">
                <h2 className="text-lg font-semibold text-[#f3f4f6]">Send invite</h2>
                <div className="mt-3 flex flex-wrap gap-3">
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(event) => setInviteEmail(event.target.value)}
                    placeholder="invitee@example.com"
                    className="min-w-[260px] flex-1 rounded border border-white/20 bg-black px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    value={inviteRole}
                    onChange={(event) => setInviteRole(event.target.value)}
                    placeholder="role (optional)"
                    className="min-w-[160px] rounded border border-white/20 bg-black px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => void sendInvite()}
                    className="rounded border border-emerald-700/50 bg-emerald-900/30 px-3 py-2 text-xs text-emerald-200"
                  >
                    Send invite
                  </button>
                  <button
                    type="button"
                    onClick={() => void seedFirstInvite()}
                    className="rounded border border-amber-700/50 bg-amber-900/30 px-3 py-2 text-xs text-amber-200"
                  >
                    Seed marc77014@gmail.com
                  </button>
                </div>
                {adminMessage ? <p className="mt-3 text-sm text-emerald-300">{adminMessage}</p> : null}
                {inviteDoc?.role ? (
                  <p className="mt-2 text-xs text-[#9ca3af]">Your invite role: {inviteDoc.role}</p>
                ) : null}
              </section>

              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="min-w-full border-collapse text-sm">
                  <thead className="bg-white/5 text-left text-[#cbd5e1]">
                    <tr>
                      <th className="px-3 py-2">UID</th>
                      <th className="px-3 py-2">Email</th>
                      <th className="px-3 py-2">Requested routes</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.map((row) => (
                      <tr key={row.id} className="border-t border-white/10">
                        <td className="px-3 py-2 font-mono text-xs text-[#d1d5db]">{row.uid || row.id}</td>
                        <td className="px-3 py-2 text-[#d1d5db]">{row.email || '-'}</td>
                        <td className="px-3 py-2 text-[#9ca3af]">{Array.isArray(row.requestedRoutes) ? row.requestedRoutes.join(', ') : '-'}</td>
                        <td className="px-3 py-2 text-[#f3f4f6]">{row.status || 'pending'}</td>
                        <td className="px-3 py-2">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => void setGrantStatus(row.id, 'approved')}
                              className="rounded border border-emerald-700/50 bg-emerald-900/30 px-2 py-1 text-xs text-emerald-200"
                            >
                              Approve
                            </button>
                            <button
                              type="button"
                              onClick={() => void setGrantStatus(row.id, 'denied')}
                              className="rounded border border-red-700/50 bg-red-900/30 px-2 py-1 text-xs text-red-200"
                            >
                              Deny
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="min-w-full border-collapse text-sm">
                  <thead className="bg-white/5 text-left text-[#cbd5e1]">
                    <tr>
                      <th className="px-3 py-2">Email</th>
                      <th className="px-3 py-2">Role</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inviteSorted.map((row) => (
                      <tr key={row.id} className="border-t border-white/10">
                        <td className="px-3 py-2 text-[#d1d5db]">{row.email || row.id}</td>
                        <td className="px-3 py-2 text-[#9ca3af]">{row.role || '-'}</td>
                        <td className="px-3 py-2 text-[#f3f4f6]">{row.status || 'pending'}</td>
                        <td className="px-3 py-2">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => void resendInvite(row.email)}
                              className="rounded border border-indigo-700/50 bg-indigo-900/30 px-2 py-1 text-xs text-indigo-200"
                            >
                              Resend
                            </button>
                            <button
                              type="button"
                              onClick={() => void revokeInvite(row.email)}
                              className="rounded border border-red-700/50 bg-red-900/30 px-2 py-1 text-xs text-red-200"
                            >
                              Revoke
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
