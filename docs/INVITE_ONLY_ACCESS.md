# Invite-only access implementation

Protected routes:

- `/precision-pilot-test`
- `/living-bible`
- `/living-bible-test`

These routes are controlled by Firebase Auth + Firestore + Cloud Functions invite checks.

## Firestore collections

- `invites/{emailId}`
  - `email`
  - `status`: `pending | sent | accepted | revoked`
  - `invitedBy`
  - `createdAt`, `updatedAt`, `sentAt`, `acceptedAt`
  - `token`
  - `role` (optional)
- `access_grants/{uid}`
  - invite claim result + per-route approval state
- `admins/{uid}`
  - dashboard and invite sender authorization

## Cloud Functions

- `sendInvite` (admin-only): creates/updates invite + sends email via Resend.
- `resendInvite` (admin-only): reuses token and re-sends email.
- `revokeInvite` (admin-only): marks invite revoked.
- `seedInitialInvite` (admin-only): creates pending seed invite (`marc77014@gmail.com` default).
- `bootstrapAdmin`: grants first admin when auth email matches `BOOTSTRAP_ADMIN_EMAIL`.
- `claimInvite`: validates invite/token and grants `access_grants/{uid}`.

## Required secrets / env

- Firebase Functions secret: `RESEND_API_KEY`
- Client env:
  - `VITE_BOOTSTRAP_ADMIN_EMAIL`
  - `VITE_FIREBASE_FUNCTIONS_REGION` (default `us-central1`)

## First-time bootstrap checklist

1. Deploy Firestore rules + functions.
2. Set `RESEND_API_KEY` secret in Firebase Functions.
3. Sign in as bootstrap email (`marc77014@gmail.com` by default).
4. Open `/admin/access`, seed first invite, send invites to users.
