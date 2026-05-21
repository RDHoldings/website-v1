/**
 * Firebase JS SDK for the Vite/React shell (marketing site, Precision Pilot chrome).
 * The embedded Flutter web app uses FlutterFire separately inside the iframe.
 *
 * Set VITE_FIREBASE_* in .env (see .env.example). Build-time only — never put secrets
 * that must stay server-only here; the web API key is public by design (restrict in GCP).
 */
import { initializeApp, getApps } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'

function readConfig() {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID
  if (!apiKey?.trim() || !projectId?.trim()) return null
  return {
    apiKey: apiKey.trim(),
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? `${projectId.trim()}.firebaseapp.com`,
    projectId: projectId.trim(),
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? `${projectId.trim()}.firebasestorage.app`,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID ?? '',
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  }
}

let appInstance
let analyticsInstance
let authInstance
let dbInstance
let googleProvider
let functionsInstance
let appCheckInitialized = false

function shouldUseAppCheck() {
  return import.meta.env.VITE_USE_APP_CHECK === 'true'
}

/** App Check for the marketing shell (see docs/APP_CHECK_WEB.md). */
export function initFirebaseAppCheck() {
  if (appCheckInitialized || !shouldUseAppCheck()) return
  const app = getFirebaseApp()
  if (!app) return
  const siteKey = import.meta.env.VITE_FIREBASE_APP_CHECK_RECAPTCHA_SITE_KEY?.trim()
  const debugToken = import.meta.env.VITE_FIREBASE_APP_CHECK_DEBUG_TOKEN?.trim()
  if (import.meta.env.DEV && debugToken && typeof self !== 'undefined') {
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = debugToken
  }
  if (!siteKey) {
    if (import.meta.env.DEV) {
      console.info(
        'Firebase App Check: VITE_USE_APP_CHECK is true but VITE_FIREBASE_APP_CHECK_RECAPTCHA_SITE_KEY is missing — skipping.',
      )
    }
    return
  }
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(siteKey),
    isTokenAutoRefreshEnabled: true,
  })
  appCheckInitialized = true
}

export function getFirebaseApp() {
  if (typeof window === 'undefined') return null
  if (appInstance) return appInstance
  const firebaseConfig = readConfig()
  if (!firebaseConfig?.appId) {
    if (import.meta.env.DEV) {
      console.info(
        'Firebase (shell): VITE_FIREBASE_* not set — skip init. Copy .env.example to .env and fill values.',
      )
    }
    return null
  }
  appInstance = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
  initFirebaseAppCheck()
  return appInstance
}

export function getFirebaseAuth() {
  if (authInstance !== undefined) return authInstance
  const app = getFirebaseApp()
  if (!app) {
    authInstance = null
    return null
  }
  authInstance = getAuth(app)
  return authInstance
}

export function getFirebaseDb() {
  if (dbInstance !== undefined) return dbInstance
  const app = getFirebaseApp()
  if (!app) {
    dbInstance = null
    return null
  }
  dbInstance = getFirestore(app)
  return dbInstance
}

export function getGoogleAuthProvider() {
  if (googleProvider) return googleProvider
  googleProvider = new GoogleAuthProvider()
  googleProvider.setCustomParameters({ prompt: 'select_account' })
  return googleProvider
}

export function getFirebaseFunctions() {
  if (functionsInstance !== undefined) return functionsInstance
  const app = getFirebaseApp()
  if (!app) {
    functionsInstance = null
    return null
  }
  const region = import.meta.env.VITE_FIREBASE_FUNCTIONS_REGION?.trim() || 'us-central1'
  functionsInstance = getFunctions(app, region)
  return functionsInstance
}

/** Resolves after Analytics is ready or unsupported (null). */
export async function getFirebaseAnalytics() {
  if (analyticsInstance !== undefined) return analyticsInstance
  const app = getFirebaseApp()
  if (!app) {
    analyticsInstance = null
    return null
  }
  const supported = await isSupported()
  if (!supported) {
    analyticsInstance = null
    return null
  }
  analyticsInstance = getAnalytics(app)
  return analyticsInstance
}

void getFirebaseApp()
void getFirebaseAnalytics()
void getFirebaseAuth()
void getFirebaseDb()
void getFirebaseFunctions()
