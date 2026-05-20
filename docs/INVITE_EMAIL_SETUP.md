# Invite Email Setup (marc77014@gmail.com)

Use this runbook when invite emails from `/admin/access` are not sending.

## What is currently missing

In `RDHoldings/website-v1`, verify with `gh secret list --repo RDHoldings/website-v1`.

**Typically still required:**

- `FIREBASE_TOKEN`
- `GMAIL_CLIENT_SECRET`
- `GMAIL_REFRESH_TOKEN`
- `BOOTSTRAP_AUTOMATION_KEY`

**Often present:**

- `GMAIL_CLIENT_ID`
- `FIREBASE_PROJECT_ID` (repository variable = `red-domino-precision-freight`)

**Legacy (remove if unused):** `RESEND_API_KEY`

Full step-by-step checklist: [RD Holdings Projects/docs/REMAINING_USER_ACTIONS.md](../../../RD%20Holdings%20Projects/docs/REMAINING_USER_ACTIONS.md)

## 1) Google Cloud OAuth setup

1. Open [Google Cloud Console](https://console.cloud.google.com/) for project `red-domino-precision-freight`.
2. Confirm **Gmail API** is enabled (`APIs & Services` -> `Library` -> `Gmail API`).
3. Configure OAuth consent screen:
   - App type: External (or Internal if applicable).
   - Add `marc77014@gmail.com` as a test user when in testing mode.
4. Create OAuth client credentials (`APIs & Services` -> `Credentials`):
   - Client type can be **Desktop app** (simplest for refresh token generation) or **Web application**.
   - Save the client ID and client secret.

## 2) Generate Gmail refresh token

You need a refresh token with scope:

- `https://www.googleapis.com/auth/gmail.send`

Recommended method:

1. Use OAuth Playground (or your own local OAuth script) with your client ID/secret.
2. Request the gmail.send scope above.
3. Authorize as `marc77014@gmail.com`.
4. Exchange authorization code for tokens.
5. Copy the returned `refresh_token`.

## 3) Add required GitHub secrets

In `RDHoldings/website-v1`:

`Settings` -> `Secrets and variables` -> `Actions` -> `New repository secret`

Create/update:

- `FIREBASE_TOKEN`
- `GMAIL_CLIENT_ID`
- `GMAIL_CLIENT_SECRET`
- `GMAIL_REFRESH_TOKEN`
- `BOOTSTRAP_AUTOMATION_KEY` (random long secret, minimum 32 chars)

Also confirm repository variable:

- `FIREBASE_PROJECT_ID` = `red-domino-precision-freight`

Optional variable (if functions region is not default):

- `VITE_FIREBASE_FUNCTIONS_REGION` (default is `us-central1`)

## 4) Trigger deploy workflow

After secrets are saved:

1. Push to `main` or run the GitHub Actions workflow manually:
   - Workflow: `Deploy website + Pages`
2. The backend job will:
   - Sync Firebase function secrets
   - Deploy Firestore rules + functions
   - Call `seedInitialInvite` with `sendEmail: true` for `marc77014@gmail.com`

If all required secrets exist, invite email automation should run in CI.

## 5) Bootstrap first admin and send invites

1. Open the website and sign in as `marc77014@gmail.com`.
2. Open `/admin/access`.
3. If needed, bootstrap admin from the app flow (calls `bootstrapAdmin`).
4. Click **Seed marc77014@gmail.com** (now sends email path).
5. Use **Send invite** for additional users.

## 6) Local fallback commands (optional)

If you are authenticated locally and need to sync function secrets manually:

```bash
npx -y firebase-tools@latest functions:secrets:set GMAIL_CLIENT_ID --project red-domino-precision-freight
npx -y firebase-tools@latest functions:secrets:set GMAIL_CLIENT_SECRET --project red-domino-precision-freight
npx -y firebase-tools@latest functions:secrets:set GMAIL_REFRESH_TOKEN --project red-domino-precision-freight
npx -y firebase-tools@latest functions:secrets:set BOOTSTRAP_AUTOMATION_KEY --project red-domino-precision-freight
```

Then deploy:

```bash
npx -y firebase-tools@latest deploy --only firestore:rules,functions --project red-domino-precision-freight
```
