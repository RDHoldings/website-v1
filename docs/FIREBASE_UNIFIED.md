# Firebase/GCP Unified Project Guidance

Use one Firebase Blaze project for the Red Domino ecosystem, with strict logical separation by collection namespace and least-privilege service identities.

## Scope and intent

- Website shell + access gate (React/Vite): Auth + Firestore access grants.
- Precision Freight app (Flutter): Firebase services for mobile/web operations.
- Living Bible app (Expo/React Native): Auth/content and future AI workflows.

## Recommended namespace layout

- `admins/{uid}`: website access-gate administrators.
- `access_grants/{uid}`: approval state for protected web routes.
- `invites/{emailId}`: invite-only source of truth for allowed sign-ins (pending/sent/accepted/revoked).
- `precision_*` collections: Precision Freight domain entities.
- `bible_*` collections: Living Bible domain entities.

Keep collection prefixes explicit so rules, exports, and monitoring remain auditable.

## Identity and key isolation

- Use separate runtime service accounts per app surface (website CI/deploy, Precision backend jobs, Living Bible backend jobs).
- Restrict each service account to only required APIs and Firestore paths.
- Keep web API keys in client env only when needed, with strict referrer/app restrictions.
- Never commit secrets to git; keep local `.env` untracked and CI secrets in repository/org secret stores.

## API enablement

- Enable Firebase Authentication and Firestore for all app surfaces.
- Enable Email link and Google providers (invite-only filtered by server-side checks).
- Enable Generative Language / Veo-related APIs only for workloads that require them (Living Bible AI features).
- Apply per-service quotas and alerting thresholds to avoid cross-app blast radius.

## Invite-only flow (website access gate)

- Admin creates invites in `/admin/access`, invoking Cloud Functions (`sendInvite`, `resendInvite`, `revokeInvite`).
- Invite email includes `https://reddominoholdings.com/access?invite=<token>`.
- On authenticated callback, Cloud Function `claimInvite` validates invite/token and writes `access_grants/{uid}`.
- Bootstrap admin path: `bootstrapAdmin` callable requires `BOOTSTRAP_ADMIN_EMAIL` and sets custom admin claim + `admins/{uid}` doc.

## Operations checklist

- Define per-app dashboards and error alerts in GCP/Firebase.
- Audit IAM bindings quarterly.
- Rotate high-risk credentials and remove stale keys.
- Validate Firestore rules before production deploys.
