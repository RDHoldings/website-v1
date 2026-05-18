/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  getIdTokenResult,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { doc, getDoc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore'
import { httpsCallable } from 'firebase/functions'
import {
  getFirebaseAuth,
  getFirebaseDb,
  getFirebaseFunctions,
  getGoogleAuthProvider,
} from '../config/firebaseClient'
import { normalizeInviteEmail, toInviteEmailId } from '../utils/inviteIds'

const AccessGateContext = createContext(null)

export function AccessGateProvider({ children }) {
  const [authUser, setAuthUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [grantDoc, setGrantDoc] = useState(null)
  const [grantLoading, setGrantLoading] = useState(false)
  const [grantError, setGrantError] = useState('')
  const [inviteDoc, setInviteDoc] = useState(null)
  const [inviteState, setInviteState] = useState({ loading: false, error: '' })

  useEffect(() => {
    const auth = getFirebaseAuth()
    if (!auth) {
      setAuthLoading(false)
      return undefined
    }
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthUser(user)
      setAuthLoading(false)
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    const db = getFirebaseDb()
    if (!db || !authUser) {
      setGrantDoc(null)
      setGrantLoading(false)
      setGrantError('')
      return undefined
    }
    setGrantLoading(true)
    const unsub = onSnapshot(
      doc(db, 'access_grants', authUser.uid),
      (snapshot) => {
        setGrantDoc(snapshot.exists() ? snapshot.data() : null)
        setGrantError('')
        setGrantLoading(false)
      },
      (error) => {
        setGrantError(error?.message || 'Unable to read access grant.')
        setGrantLoading(false)
      },
    )
    return () => unsub()
  }, [authUser])

  useEffect(() => {
    const auth = getFirebaseAuth()
    if (!auth || !isSignInWithEmailLink(auth, window.location.href)) return
    const email = window.localStorage.getItem('rdh_invite_email')
    if (!email) return
    void signInWithEmailLink(auth, email, window.location.href)
      .then(() => {
        window.localStorage.removeItem('rdh_invite_email')
        window.history.replaceState({}, '', window.location.pathname)
      })
      .catch((error) => {
        setInviteState({ loading: false, error: error?.message || 'Email link sign-in failed.' })
      })
  }, [])

  const verifyInviteForEmail = useCallback(async (email) => {
    const db = getFirebaseDb()
    if (!db) throw new Error('Firestore is not configured.')
    const normalized = normalizeInviteEmail(email)
    if (!normalized) throw new Error('A valid invite email is required.')
    const snap = await getDoc(doc(db, 'invites', toInviteEmailId(normalized)))
    if (!snap.exists()) throw new Error('No invite was found for this email.')
    const data = snap.data()
    if (data.status === 'revoked') throw new Error('This invite has been revoked.')
    return data
  }, [])

  const signIn = useCallback(async () => {
    const auth = getFirebaseAuth()
    if (!auth) throw new Error('Firebase Auth is not configured.')
    const result = await signInWithPopup(auth, getGoogleAuthProvider())
    const email = normalizeInviteEmail(result.user?.email)
    if (!email) {
      await firebaseSignOut(auth)
      throw new Error('This account is missing an email and cannot be invited.')
    }
    await verifyInviteForEmail(email)
  }, [verifyInviteForEmail])

  const sendMagicLink = useCallback(async (email) => {
    const auth = getFirebaseAuth()
    if (!auth) throw new Error('Firebase Auth is not configured.')
    const normalized = normalizeInviteEmail(email)
    await verifyInviteForEmail(normalized)
    const actionCodeSettings = {
      url: `${window.location.origin}/access`,
      handleCodeInApp: true,
    }
    await sendSignInLinkToEmail(auth, normalized, actionCodeSettings)
    window.localStorage.setItem('rdh_invite_email', normalized)
  }, [verifyInviteForEmail])

  const signOut = useCallback(async () => {
    const auth = getFirebaseAuth()
    if (!auth) return
    await firebaseSignOut(auth)
  }, [])

  const requestAccess = useCallback(async (secretRouteKey, note) => {
    if (!authUser) throw new Error('Please sign in first.')
    const db = getFirebaseDb()
    if (!db) throw new Error('Firestore is not configured.')
    const cleanNote = (note || '').trim()
    await setDoc(
      doc(db, 'access_grants', authUser.uid),
      {
        uid: authUser.uid,
        email: authUser.email || '',
        displayName: authUser.displayName || '',
        requestedRoutes: [secretRouteKey],
        note: cleanNote,
        status: 'pending',
        requestedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    )
  }, [authUser])

  const syncInviteAcceptance = useCallback(async (forceRouteKey = null) => {
    if (!authUser) return
    const db = getFirebaseDb()
    const fns = getFirebaseFunctions()
    if (!db || !fns) throw new Error('Firebase backend is not configured.')
    const email = normalizeInviteEmail(authUser.email)
    if (!email) throw new Error('Signed-in account has no email.')
    const inviteSnap = await getDoc(doc(db, 'invites', toInviteEmailId(email)))
    if (!inviteSnap.exists()) throw new Error('No invite exists for this email.')
    const invite = inviteSnap.data()
    if (invite.status === 'revoked') throw new Error('This invite has been revoked.')
    const claim = httpsCallable(fns, 'claimInvite')
    const claimResult = await claim({
      email,
      routeKey: forceRouteKey,
      inviteToken: new URLSearchParams(window.location.search).get('invite') || '',
    })
    setInviteDoc({
      id: inviteSnap.id,
      ...invite,
      ...(claimResult.data || {}),
    })
  }, [authUser])

  useEffect(() => {
    if (!authUser?.email) {
      setInviteDoc(null)
      return
    }
    const db = getFirebaseDb()
    if (!db) return
    const inviteId = toInviteEmailId(authUser.email)
    const unsub = onSnapshot(
      doc(db, 'invites', inviteId),
      (snap) => {
        setInviteDoc(snap.exists() ? { id: snap.id, ...snap.data() } : null)
        setInviteState((prev) => ({ ...prev, error: '' }))
      },
      (error) => {
        setInviteState((prev) => ({ ...prev, error: error?.message || 'Unable to read invite status.' }))
      },
    )
    return () => unsub()
  }, [authUser])

  useEffect(() => {
    if (!authUser) return
    void getIdTokenResult(authUser).then((token) => {
      const bootstrap = normalizeInviteEmail(import.meta.env.VITE_BOOTSTRAP_ADMIN_EMAIL)
      const email = normalizeInviteEmail(authUser.email)
      const isAdminClaim = Boolean(token.claims?.admin)
      if (bootstrap && email && email === bootstrap && !isAdminClaim) {
        const fns = getFirebaseFunctions()
        if (!fns) return
        const bootstrapFn = httpsCallable(fns, 'bootstrapAdmin')
        void bootstrapFn({ email })
      }
    })
  }, [authUser])

  const value = useMemo(
    () => ({
      authUser,
      authLoading,
      grantDoc,
      grantLoading,
      grantError,
      inviteDoc,
      inviteState,
      isApproved: grantDoc?.status === 'approved',
      signIn,
      sendMagicLink,
      signOut,
      requestAccess,
      verifyInviteForEmail,
      syncInviteAcceptance,
    }),
    [
      authUser,
      authLoading,
      grantDoc,
      grantLoading,
      grantError,
      inviteDoc,
      inviteState,
      signIn,
      sendMagicLink,
      signOut,
      requestAccess,
      verifyInviteForEmail,
      syncInviteAcceptance,
    ],
  )

  return <AccessGateContext.Provider value={value}>{children}</AccessGateContext.Provider>
}

export function useAccessGate() {
  const value = useContext(AccessGateContext)
  if (!value) {
    throw new Error('useAccessGate must be used inside AccessGateProvider')
  }
  return value
}
