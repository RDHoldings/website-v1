# Precision Pilot — static files for pre-release test (`/precision-pilot-test/...`)

## How this repo deploys these paths

1. **Test shell (React)**  
   **`/precision-pilot-test`** is a **client-side route** in this Vite app. It is **built from `src/`** on every `npm run build` and deployed with the main SPA bundle.

2. **Everything in this `public/precision-pilot-test/` folder**  
   Copied to **`dist/precision-pilot-test/`** on every build and **deployed with every push** to `main` (GitHub Actions).

## Hosting the test/staging web client on the same site

Set `precisionPilotWebApp.testEmbedUrl` in `src/config/precisionPilot.js`.

**Do not** put `index.html` at **`public/precision-pilot-test/index.html`** — it can shadow the React test shell.

Use a subfolder, e.g. build your staging app with **`base: '/precision-pilot-test/app/'`** and copy output to:

**`public/precision-pilot-test/app/`**  
→ **`https://your-domain/precision-pilot-test/app/`**  
→ set `testEmbedUrl: '/precision-pilot-test/app/'`.

Optional URL flags stay in `testUrlExtraParams`. Commit and push to deploy.

**Bundled placeholder:** `app/index.html` is a temporary in-iframe page for QA. Replace with your staging SPA when ready.
