# Firebase App Check (website shell)

The Vite/React marketing shell can send App Check tokens with Firebase Auth and callable Functions when enabled.

## Console setup

1. [Firebase Console](https://console.firebase.google.com/) → project **`red-domino-precision-freight`** → **App Check**.
2. Register the **Web** app used by `website-v1` (same `appId` as `VITE_FIREBASE_APP_ID`).
3. Add provider **reCAPTCHA v3** and copy the **site key**.
4. (Optional) Register debug tokens for local dev: **Manage debug tokens** → add a token → use with debug provider below.

## Environment variables

| Variable | Where | Purpose |
|----------|-------|---------|
| `VITE_USE_APP_CHECK` | `.env` / GitHub Actions vars | Set to `true` to activate App Check in the shell |
| `VITE_FIREBASE_APP_CHECK_RECAPTCHA_SITE_KEY` | `.env` / GitHub Actions secrets | reCAPTCHA v3 site key from App Check |
| `VITE_FIREBASE_APP_CHECK_DEBUG_TOKEN` | local only | Debug provider token (never commit) |

See `.env.example` for placeholders.

## Enforcement

- Enable **enforcement** per product (Auth, Firestore, Functions) only after tokens appear as valid in the App Check dashboard.
- Until enforcement is on, missing App Check in the client is safe for development.

## Code

Initialization lives in `src/config/firebaseClient.js` (`initFirebaseAppCheck`). The shell imports `./config/firebaseClient.js` from `src/main.jsx` before rendering routes.
