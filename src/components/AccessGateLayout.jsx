import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAccessGate } from '../contexts/AccessGateContext'
import { getSecretRouteKey } from '../config/accessGate'

export function AccessGateLayout({ children }) {
  const { pathname } = useLocation()
  const routeKey = useMemo(() => getSecretRouteKey(pathname), [pathname])
  const {
    authUser,
    authLoading,
    grantDoc,
    grantLoading,
    grantError,
    inviteDoc,
    inviteState,
    isApproved,
    signIn,
    sendMagicLink,
    syncInviteAcceptance,
    signOut,
  } = useAccessGate()

  const [email, setEmail] = useState('')
  const [authError, setAuthError] = useState('')
  const [authSuccess, setAuthSuccess] = useState('')
  const [sending, setSending] = useState(false)

  if (!routeKey) return children
  if (authLoading || grantLoading) {
    return <GateShell title="Checking secure access…" message="Verifying your authentication and grant status." />
  }
  if (isApproved) return children

  async function onGoogleSignIn() {
    setAuthError('')
    setAuthSuccess('')
    try {
      await signIn()
      await syncInviteAcceptance(routeKey)
    } catch (error) {
      setAuthError(error?.message || 'Unable to sign in.')
      await signOut()
    }
  }

  async function onSendMagicLink() {
    setAuthError('')
    setAuthSuccess('')
    try {
      setSending(true)
      await sendMagicLink(email)
      setAuthSuccess('Invite link sent. Check your inbox and open the link on this browser.')
    } catch (error) {
      setAuthError(error?.message || 'Unable to send invite link.')
    } finally {
      setSending(false)
    }
  }

  return (
    <GateShell
      title="Private route"
      message="Invite-only access. Only approved invite emails can authenticate."
    >
      {!authUser ? (
        <div className="w-full max-w-xl rounded-lg border border-white/10 bg-black/30 p-4">
          <div className="mb-4">
            <label className="block text-sm text-[#d1d5db]">
              Invited email
              <input
                type="email"
                className="mt-1 w-full rounded-md border border-white/20 bg-black px-3 py-2 text-sm text-[#f3f4f6]"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
              />
            </label>
            <button
              type="button"
              disabled={sending || !email.trim()}
              onClick={() => void onSendMagicLink()}
              className="mt-3 rounded-md border border-[#c49a3a]/60 bg-[#c49a3a]/20 px-4 py-2 text-sm font-semibold text-[#f3f4f6] disabled:opacity-70"
            >
              {sending ? 'Sending…' : 'Send magic sign-in link'}
            </button>
          </div>
          <div className="border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={() => void onGoogleSignIn()}
              className="rounded-md bg-[#c49a3a] px-4 py-2 font-semibold text-black"
            >
              Sign in with Google (invite only)
            </button>
          </div>
          {authSuccess ? <p className="mt-3 text-sm text-emerald-300">{authSuccess}</p> : null}
          {authError ? <p className="mt-3 text-sm text-red-300">{authError}</p> : null}
        </div>
      ) : (
        <div className="w-full max-w-xl rounded-lg border border-white/10 bg-black/30 p-4">
          <p className="mb-2 text-sm text-[#9ca3af]">
            Signed in as <span className="font-semibold text-[#f3f4f6]">{authUser.email || authUser.uid}</span>
          </p>
          <p className="mb-4 text-sm text-[#9ca3af]">
            Current status:{' '}
            <span className="font-semibold text-[#f3f4f6]">{grantDoc?.status || 'not requested'}</span>
          </p>
          <p className="mb-2 text-sm text-[#9ca3af]">
            Invite status:{' '}
            <span className="font-semibold text-[#f3f4f6]">{inviteDoc?.status || 'missing'}</span>
          </p>
          {grantDoc?.status === 'pending' || inviteDoc?.status === 'pending' || inviteDoc?.status === 'sent' ? (
            <p className="rounded-md border border-amber-700/40 bg-amber-950/30 px-3 py-2 text-sm text-amber-200">
              Invite accepted flow pending review. Admin can approve your UID in <code>access_grants/{authUser.uid}</code>.
            </p>
          ) : null}
          {grantError ? <p className="mt-3 text-sm text-red-300">{grantError}</p> : null}
          {inviteState.error ? <p className="mt-3 text-sm text-red-300">{inviteState.error}</p> : null}
          <button
            type="button"
            onClick={() => void syncInviteAcceptance(routeKey)}
            className="mt-3 rounded-md border border-[#c49a3a]/60 bg-[#c49a3a]/20 px-4 py-2 text-sm font-semibold text-[#f3f4f6] disabled:opacity-70"
          >
            Refresh invite access
          </button>
        </div>
      )}
      {!authUser ? null : (
        <p className="mt-4 text-xs text-[#6b7280]">
          If already approved, refresh after the Firestore document updates to status <code>approved</code>.
        </p>
      )}
    </GateShell>
  )
}

function GateShell({ title, message, children }) {
  return (
    <main id="site-main" className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6 py-10 text-[#e5e7eb]">
      <div className="w-full max-w-2xl rounded-xl border border-white/10 bg-[#111111]/80 p-6">
        <h1 className="text-2xl font-bold text-[#f3f4f6]">{title}</h1>
        <p className="mt-2 text-sm text-[#9ca3af]">{message}</p>
        {children}
      </div>
    </main>
  )
}
