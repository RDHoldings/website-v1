# Red Domino Holdings — Website

A production-oriented marketing site for **Red Domino Holdings**: responsive landing experience, division portfolio, **Precision Pilot** product showcase (device mockup + platform downloads), and legal pages. Built as a **React** single-page application with **Vite**, **Tailwind CSS**, and **React Router**.

**Repository:** [github.com/RDHoldings/website-v1](https://github.com/RDHoldings/website-v1) (adjust if your remote differs)

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Routing](#routing)
- [Configuration](#configuration)
- [Assets & media](#assets--media)
- [Precision Pilot web shell](#precision-pilot-web-shell-routes) · [downloads](#precision-pilot-downloads)
- [Legal & compliance content](#legal--compliance-content)
- [Environment variables](#environment-variables)
- [SEO & accessibility](#seo--accessibility)
- [Building for production](#building-for-production)
- [GitHub Pages & custom domain (Squarespace)](#github-pages--custom-domain-squarespace)
- [Linting](#linting)
- [Troubleshooting](#troubleshooting)
- [Maintenance checklist](#maintenance-checklist)

---

## Features

- **Hero** — Full-viewport section with optional looping background video (`public/hero-video.mp4`) and overlay.
- **Our Divisions** — Logistics and media group cards with entity lists and brand marks.
- **Proprietary Tech** — Precision Pilot feature list, **Galaxy-style device mockup** with rotating app screenshots, audience line, **Learn more** link, and **per-platform download** cards (Android, iOS, Web, Windows).
- **Legal** — Dedicated **Privacy Policy** and **Terms of Service** routes with shared layout and footer links from the home page.
- **Motion** — Scroll-triggered animations via **Framer Motion** (respects `prefers-reduced-motion` where implemented).
- **Navigation** — Client-side routing with scroll-to-top on route change.

---

## Tech stack

| Layer        | Technology |
|-------------|------------|
| Framework   | React 18   |
| Build tool  | Vite 5     |
| Styling     | Tailwind CSS 3, PostCSS, Autoprefixer |
| Routing     | React Router 7 |
| Animation   | Framer Motion 11 |
| Icons       | Lucide React |

---

## Prerequisites

- **Node.js** — LTS recommended (e.g. **20.x** or **22.x**).
- **npm** — Ships with Node (this repo uses `package-lock.json`).

Verify:

```bash
node -v
npm -v
```

---

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/RDHoldings/website-v1.git
cd website-v1
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the URL Vite prints (typically `http://localhost:5173`). If port **5173** is busy, Vite will use the next free port.

### 4. Production build (local check)

```bash
npm run build
npm run preview
```

`preview` serves the contents of `dist/` for smoke-testing before deploy.

---

## Available scripts

| Command        | Description |
|----------------|-------------|
| `npm run dev`  | Start Vite dev server with HMR. |
| `npm run build` | Type-check-free production bundle → `dist/`. |
| `npm run preview` | Serve `dist/` locally. |
| `npm run lint` | Run ESLint on the project. |

---

## Project structure

```text
├── .github/workflows/           # CI — deploy-github-pages.yml → GitHub Pages
├── public/                      # Static files (copied to dist root as-is)
│   ├── CNAME.example            # Copy to CNAME with your hostname for custom domain
│   ├── downloads/precision-pilot/  # Optional hosted installers (see below)
│   ├── favicon.svg
│   ├── hero-video.mp4           # Optional; referenced by Hero
│   └── ...
├── src/
│   ├── App.jsx                  # Route definitions
│   ├── main.jsx                 # React root + BrowserRouter
│   ├── assets/                  # Images, fonts, screenshots (bundled)
│   ├── components/              # Shared UI (Nav, Button, device, downloads, etc.)
│   ├── components/sections/     # Home page sections (Hero, Divisions, Tech, …)
│   ├── config/
│   │   └── precisionPilot.js    # Copy, learn-more link, download URLs & flags
│   ├── pages/                   # Home + legal pages + layouts
│   ├── styles/                  # globals.css, fonts.css
│   └── utils/                   # animation variants
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── eslint.config.js
```

---

## Routing

| Path                     | Page |
|--------------------------|------|
| `/`                      | Marketing home (Header, Hero, Divisions, Tech, Footer) |
| `/precision-pilot`       | Precision Pilot **production** web shell (iframe + config) |
| `/precision-pilot-test`  | Precision Pilot **pre-release** web shell (test banner, `noindex`) |
| `/privacy`               | Privacy Policy |
| `/terms`                 | Terms of Service |

`BrowserRouter` is mounted in `src/main.jsx`. Footer and nav use `Link` / paths such as `/#divisions` and `/#tech` for in-page anchors.

---

## Configuration

### Precision Pilot (`src/config/precisionPilot.js`)

Central place for:

- **Audience** one-liner and **Learn more** `href` (defaults to **`/precision-pilot`**).
- **Download** metadata per platform: `fileUrl`, optional `storeUrl`, `storeLabel`, and `enabled`.
- **`precisionPilotWebApp`** — production vs test **iframe** URLs for the web shell routes (see below).

Set `enabled: true` when a build or URL is live. Paths under `/downloads/...` map to `public/downloads/...`.

### Precision Pilot web shell (routes)

| Path | Purpose |
|------|---------|
| **`/precision-pilot`** | Production shell: full-viewport **iframe** loading **`productionEmbedUrl`** (default **`/precision-pilot/app/`** — Flutter web build with **`base href /precision-pilot/app/`**). |
| **`/precision-pilot-test`** | Pre-release shell: **`testEmbedUrl`** (default **`/precision-pilot-test/app/`**) + **`testUrlExtraParams`**. Test banner, **noindex** on the marketing shell + test embed `index.html`, debug line for resolved iframe `src`. **Two panes:** embedded Flutter app + **`console-panel.html`** — a rich forwarded log (filters, search, export, seq IDs, categories) wired via **`postMessage`** from the early script in **`public/precision-pilot-test/app/index.html`**. |

If embed URLs are cleared (`''`), both routes show setup copy and the **download** cards instead of an iframe. Point your web app (Vercel, Cloudflare, etc.) at these paths for deep links, or set embed URLs to load that app inside the iframe.

**Google Maps (Flutter web):** `public/precision-pilot*/app/index.html` loads the Maps JS API with placeholder **`YOUR_GOOGLE_MAPS_WEB_API_KEY`** only — **never commit a raw `AIzaSy…` key** in tracked files; the build fails verification if one appears. At **`npm run build`**, `scripts/inject-google-maps-key.mjs` replaces the placeholder in **`dist/`** when **`GOOGLE_MAPS_WEB_API_KEY`** is set (local env or GitHub Actions secret **`GOOGLE_MAPS_WEB_API_KEY`** — wired in **`.github/workflows/deploy-github-pages.yml`** on the **Build** step). On GitHub Actions, the postbuild step fails if the placeholder is still present (missing or empty secret). Restrict the key by HTTP referrer in Google Cloud. If a key was ever committed or leaked, **rotate** it in Google Cloud and update the repository secret. Enable **Elevation API** for the same project and include it in the key’s **API restrictions** — the embedded Flutter web bundle calls **`https://maps.googleapis.com/maps/api/elevation/json`** using **`GOOGLE_MAPS_API_KEY`** from `assets/.env` (same value as **`GOOGLE_MAPS_WEB_API_KEY`** in practice). **Re-copying a new Flutter `build/web`** overwrites `main.dart.js`; either re-apply the elevation endpoint in Dart (preferred) or re-patch the bundle as in this repo’s history.

**Test shell (`/precision-pilot-test`) diagnostics:** The early script in **`public/precision-pilot-test/app/index.html`** forwards **`console.*`** (with **seq** IDs and inferred **categories**), **`window.onerror`**, **`unhandledrejection`**, **`rejectionhandled`** (via `console.warn`), **lifecycle** (bridge ready, `DOMContentLoaded`, `load`, visibility), **`fetch`** + **XHR** (status / timing; failures always logged), **WebSocket** open/close/error (only when **`debugVerbose=1`** — optional `addEventListener` patch), **long tasks** (PerformanceObserver, ≥50ms), **slow resources** when **`debugVerbose=1`**, **failed `fetch`**, and **combined stack traces** from multiple `Error` arguments. It logs a delayed **`[Maps]`** **`console.error`** only if **`google.maps`** never becomes available (API key, billing, referrer restrictions, etc.). A successful load is logged at **`console.debug`** so routine cases do not flood monitoring (e.g. Sentry). It does **not** treat a normal `key=AIzaSy…` script URL as an error — that is expected after CI injects **`GOOGLE_MAPS_WEB_API_KEY`**. **HERE** and other non-Google providers are configured in the **Flutter** project — this static site only injects the Google Maps JS script. **Backend / Cloud Functions / Firestore server logs do not appear** in the browser unless the Flutter app prints them. **`flutter run -v`** streams **Dart/VM/engine** logs — those are **not** available in a static web shell unless you forward them from Dart (e.g. `dart:developer` / custom logging to `console`).

**Console panel (`console-panel.html`):** Level + category filters, text search (optional regex), pause autoscroll + **Latest ↓**, copy visible lines, export full buffer as `.txt`, font size, keyboard shortcuts (`/` focus search, `Esc` clear search, `Ctrl+L` clear log).

**Optional URL flags on the embedded app** (e.g. **`testUrlExtraParams`** in `precisionPilotWebApp`): **`debugVerbose=1`** — extra successful fetch/XHR timing and slow resource hints (noisy). **`debugTrace=1`** — stack on each pointer/click (very noisy).

**Flutter `assets/.env` (API keys for the embedded app):** Tracked files under **`public/precision-pilot*/app/assets/.env`** stay **comment-only** (no secrets in git). On **`npm run build`**, **`scripts/inject-flutter-web-env.mjs`** writes **`dist/precision-pilot*/app/assets/.env`** from environment variables — in GitHub Actions, from **repository secrets** / **variables** listed in **`.github/workflows/deploy-github-pages.yml`**. **Security:** anything in that file is a **public static asset**; anyone can download it. Use **browser-restricted** keys (Google HTTP referrers, HERE app limits, etc.). Server-only secrets (invite-email OAuth credentials, tokens, API secrets) are never injected into client `assets/.env`; keep them in Firebase Functions secrets.

**After copying a new Flutter `build/web` into `public/precision-pilot*/app/`:** Do **not** ship the stock Flutter `index.html` (it omits viewport/SEO, may omit `assets/.env`, and must not hardcode a Maps API key). Restore the marketing wrappers: **`YOUR_GOOGLE_MAPS_WEB_API_KEY`** + **`<script async … loading=async>`**, correct **`<base href>`**, **viewport**, test-route **`noindex`**, branded **title/description**, and a **placeholder** **`assets/.env`**. Then run **`npm run build`** — **`verify-flutter-embed-assets.mjs`** fails the build if tracked files contain keys or Maps markup is wrong.

**Static Precision Pilot builds in this repo (tracked + deployed):**

| Path in repo | Served at | Notes |
|--------------|-----------|--------|
| **`public/precision-pilot/**`** | **`/precision-pilot/...`** | Copied to `dist/` on every `npm run build`. Commit files here to ship them on every push. Put the **embedded SPA** under **`public/precision-pilot/app/`** (not `index.html` at the folder root — that can shadow the React shell). |
| **`public/precision-pilot-test/**`** | **`/precision-pilot-test/...`** | Same for staging/test; prefer **`public/precision-pilot-test/app/`** for the iframe target. |

GitHub Actions runs **one** `npm run build`; the artifact is all of **`dist/`** (marketing SPA + `public/` trees above). No separate workflow is required for those directories.

**CORS / cookies:** If the iframe `src` is **another origin**, your app must allow being embedded (`X-Frame-Options` / CSP `frame-ancestors`) where appropriate.

### Vite (`vite.config.js`)

Default `base` is `/`. If you deploy to a **GitHub Pages project site** (`https://user.github.io/repo-name/`), set:

```js
export default defineConfig({
  base: '/repo-name/',
  plugins: [react()],
})
```

…and pass the same value as `basename` to `BrowserRouter` in `src/main.jsx`.

---

## Assets & media

### Fonts (bundled)

Declared in `src/styles/fonts.css` and loaded from:

- `src/assets/fonts/Pirulen Rg.otf`
- `src/assets/fonts/FELIXTI.TTF`

**Google Fonts** (Inter) are loaded from `index.html`.

### Brand & content images (`src/assets/`)

Includes header/footer logos, division marks, hero art, and **Precision Pilot** screenshots.

### Screenshot slideshow

`PrecisionPilotDevice` loads PNGs via `import.meta.glob` from:

- `src/assets/Screenshot_*.png`
- `src/assets/precision-pilot/*.png` (if used)

Order is **alphabetical** by path. Other PNGs in `src/assets/` are not included unless they match those patterns.

### Hero video

`Hero.jsx` references `/hero-video.mp4`. Place the file in **`public/hero-video.mp4`** (optional; the page still renders if the file is missing).

---

## Precision Pilot downloads

1. Add binaries under **`public/downloads/precision-pilot/`** (see **`public/downloads/precision-pilot/README.md`** for default filenames).
2. Update **`src/config/precisionPilot.js`**: correct `fileUrl` / `storeUrl`, then set **`enabled: true`** for each live platform.

---

## Legal & compliance content

Privacy and Terms are extensive **templates** in `src/pages/PrivacyPolicy.jsx` and `src/pages/TermsOfService.jsx`. **Have qualified counsel review** before relying on them in production. Update **contact emails**, **DMCA agent** (Terms), **governing law**, and any **arbitration** language to match your entity and risk posture.

---

## Environment variables

There is **no required** `.env` for local development. The app does not read secrets at build time by default.

If you add variables later, prefix client-visible values with **`VITE_`** and document them here. Keep `.env` files out of git (already listed in `.gitignore`).

Optional **`VITE_SITE_URL`** (see **`.env.example`**) sets the canonical origin for SEO fallbacks in **`src/config/site.js`** when `window` is unavailable.

For secure-route gating (`/precision-pilot-test`, `/living-bible`, `/living-bible-test`):

- Enable Google Auth provider in Firebase Authentication.
- Add at least one Firestore admin doc: **`admins/<uid>`** with `{ enabled: true }`.
- User approvals live in **`access_grants/<uid>`** with `status: "approved"` (managed by `/admin/access` UI).
- Invite-only model: invited emails are stored in **`invites/<normalizedEmailId>`** and must be
  active (`pending`, `sent`, or `accepted`) for Google/magic-link sign-in.
- Functions region defaults to `us-central1`; set **`VITE_FIREBASE_FUNCTIONS_REGION`** if different.
- First admin bootstrap email can be configured with **`VITE_BOOTSTRAP_ADMIN_EMAIL`**
  (defaults to `marc77014@gmail.com`).

### Invite-only admin workflow

1. Deploy functions + rules:
   - `npm run install:functions`
   - `npm run deploy:functions`
2. Set Firebase Functions Gmail secrets:
   - `firebase functions:secrets:set GMAIL_CLIENT_ID`
   - `firebase functions:secrets:set GMAIL_CLIENT_SECRET`
   - `firebase functions:secrets:set GMAIL_REFRESH_TOKEN`
3. Sign in as bootstrap email (`VITE_BOOTSTRAP_ADMIN_EMAIL`) and open `/admin/access`.
4. Use **Send invite** for additional users; email links are generated via `sendInvite`.
5. Users authenticate via invite magic-link or Google sign-in with the invited email only.
6. Full operational runbook: [`docs/INVITE_EMAIL_SETUP.md`](docs/INVITE_EMAIL_SETUP.md)

### Gmail API OAuth setup (invite emails)

1. In Google Cloud Console (`red-domino-precision-freight`), enable **Gmail API**.
2. Configure OAuth consent screen and add your sender account (`marc77014@gmail.com`) as a test user if the app is in testing.
3. Create OAuth client credentials (Desktop app is acceptable for token generation).
4. Generate a refresh token with `https://www.googleapis.com/auth/gmail.send` scope for the sender mailbox.
5. Save these in Firebase Functions secrets (`GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`).
6. Optional sender override: set runtime env `GMAIL_FROM_EMAIL` (defaults to `marc77014@gmail.com`).

---

## SEO & accessibility

- **Per-route meta:** **`src/components/Seo.jsx`** (via **`react-helmet-async`**) sets `title`, `description`, `canonical`, Open Graph, Twitter Card tags, and **`robots`** (`noindex` on **`/precision-pilot-test`**). Home page injects **Organization** JSON-LD; **`/precision-pilot`** adds **SoftwareApplication** JSON-LD.
- **Defaults for non-JS crawlers:** **`index.html`** includes base description, theme color, and OG/Twitter tags pointing at **`https://reddominoholdings.com/`** (apex — GitHub redirects `www` here) — override with `VITE_SITE_URL` if needed.
- **Sitemap & robots:** **`public/sitemap.xml`** and **`public/robots.txt`** (sitemap URL, **`Disallow: /precision-pilot-test`**). Regenerate or edit URLs when the live domain changes.
- **Skip link:** **`src/components/SkipLink.jsx`** → **`#site-main`**; **`globals.css`** defines **`.skip-link`** and **`:focus-visible`** outlines for keyboard users.
- **Landmarks & labels:** `role="banner"` / `contentinfo`, labeled `<nav>` elements, **`aria-label`** on logo home links, section **`aria-labelledby`**, decorative video **`aria-hidden`**, **`scroll-mt-*`** for fixed header anchor targets.
- **Leadership & contact:** **`src/components/sections/LeadershipContact.jsx`** backs **`#leadership`** and **`#contact`** (previously missing), matching primary nav / footer links.

---

## Building for production

```bash
npm run build
```

Output: **`dist/`** — static HTML, JS, CSS, and hashed assets suitable for any static host (GitHub Pages, Netlify, Vercel, S3, etc.).

After **`vite build`**, **`postbuild`** runs **`scripts/copy-spa-route-shells.mjs`**, which drops a copy of **`index.html`** into **`precision-pilot/`**, **`precision-pilot-test/`**, **`privacy/`**, and **`terms/`** so hosts like GitHub Pages return **HTTP 200** (not **404**) for those URLs.

---

## GitHub Pages & custom domain (Squarespace)

This repo includes **`.github/workflows/deploy-github-pages.yml`**, which on every push to **`main`** runs `npm ci` → `npm run build`, copies **`index.html`** to **`404.html`** (so routes like `/privacy` work on refresh), and publishes **`dist/`** to GitHub Pages.

**Important:** Use **only** this workflow for Pages. Do **not** add a second “upload the whole repo” workflow (e.g. GitHub’s default **Deploy static content to Pages** template): it would race the real deploy and can publish **source files** instead of **`dist/`**, breaking the live site.

**DNS errors?** **`InvalidCNAMEError`:** `www` must be a **CNAME** → **`rdholdings.github.io`** (not a redirect to your apex). **`NotServedByPagesError`:** apex **`@`** needs GitHub’s **A** records (or Squarespace is still pointing `@` at Squarespace). See **[`docs/DNS_GITHUB_PAGES.md`](docs/DNS_GITHUB_PAGES.md)** for exact values and Squarespace notes.

### 1. Enable Pages in the repository

1. Open **GitHub** → **RDHoldings/website-v1** → **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, choose **GitHub Actions** (not “Deploy from a branch”).
3. Commit and push the workflow file (if it is not on `main` yet). The **Actions** tab should show a **Deploy to GitHub Pages** run; when it succeeds, the site is live at:
   - **Project URL:** `https://rdholdings.github.io/website-v1/`  
   (GitHub shows the exact URL under **Settings → Pages**.)

**Base URL (`VITE_BASE_URL`):** `vite.config.js` defaults to **`base: '/'`**, which matches a **custom domain at the site root**. If you browse the **GitHub project URL** (`https://rdholdings.github.io/website-v1/`) without a custom domain, set a **repository variable** **`VITE_BASE_URL`** to **`/website-v1/`** (Settings → Secrets and variables → Actions → Variables) so assets, React Router, and **Precision Pilot iframe** paths resolve correctly. The workflow passes **`vars.VITE_BASE_URL`** into the build step. Leave the variable **unset** for custom-domain-only deployments.

### 2. Custom domain + `CNAME` in the repo

GitHub needs a **`CNAME`** file in the **published** site (the contents of `dist/`). Vite copies everything from **`public/`** into `dist/`, so:

1. Copy **`public/CNAME.example`** to **`public/CNAME`** (same folder).
2. Edit **`public/CNAME`** so it contains **only one line**: the hostname you want GitHub to use, e.g. `www.reddominoholdings.com` (no `https://`, no path).
3. Commit and push. The next workflow run will include `CNAME` in the deployment.

Alternatively, you can add the custom domain only in **Settings → Pages → Custom domain**; GitHub may still expect the **`public/CNAME`** file for Actions-based builds—keeping **`public/CNAME`** in sync with that setting avoids mismatches.

### 3. Tell GitHub your custom domain

1. **Settings** → **Pages** → **Custom domain** → enter your hostname (e.g. `www.yourdomain.com`).
2. Save. GitHub will show **DNS records** to add (and may verify once DNS propagates).
3. When checks pass, enable **Enforce HTTPS**.

### 4. DNS at Squarespace

Use **Squarespace Domains** (or wherever your domain’s **DNS** is managed—sometimes DNS is at the registrar, not Squarespace).

**If you use `www` (recommended with GitHub Pages):**

| Type | Host / Name | Data / Points to |
|------|-------------|------------------|
| **CNAME** | `www` | **`rdholdings.github.io`** |

Do **not** include `https://` or `/website-v1`. For a **project** site, the CNAME target is still the **org (or user) Pages hostname** — [GitHub: DNS for project sites](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain).

**If you use the apex domain (`@` / bare domain):**

Use the **A** (and **AAAA** if shown) records GitHub lists for your repository’s Pages settings. IPs can change — always copy from **current GitHub documentation**:  
[Configuring an apex domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain).

**Squarespace UI tips:** Look for **DNS settings**, **Custom records**, or **Advanced DNS**. Names vary by product; add the same record **types** and **values** GitHub shows.

Propagation can take from a few minutes to 48 hours.

### 5. Squarespace “website” vs this GitHub site

- If the domain currently opens a **Squarespace-built site**, pointing **`www`** to GitHub will send **`www`** visitors to **this** repo’s Pages site instead. Plan whether **`www`** or the **apex** should show GitHub vs Squarespace, or use a **subdomain** (e.g. `portal.`) for one of them.
- You can keep **email** or other DNS records as-is; only add/change the records GitHub requires.

### 6. Other hosts

The same **`dist/`** output works on **Netlify**, **Vercel**, **Cloudflare Pages**, etc., with their SPA / rewrite rules as needed.

---

## Linting

```bash
npm run lint
```

If ESLint fails due to **flat config** / plugin compatibility, align `eslint.config.js` with your installed **ESLint 9** + **eslint-plugin-react** versions or pin ESLint to a supported major version for this config.

---

## Troubleshooting

| Issue | Suggestion |
|-------|------------|
| Blank or broken styles after deploy | Check Vite **`base`** matches your hosted path; hard-refresh CDN. |
| Route blank with URL ending in `/` (e.g. `/precision-pilot-test/`) | **`TrailingSlashRedirect`** strips the slash so React Router matches; hard-refresh after deploy. |
| Browser shows “invalid response” on apex | Usually **DNS / HTTPS** for the bare domain (see **`docs/DNS_GITHUB_PAGES.md`**). `curl -sI https://yourdomain.com/...` should return headers from **GitHub.com**. |
| `/privacy` 404 on refresh | On GitHub Pages, the workflow copies `index.html` → `404.html`. For other hosts, configure SPA fallback. |
| DevTools shows **404** for a deep link (but the SPA loads) | **Fixed in this repo**: `postbuild` copies `index.html` into `precision-pilot/`, `precision-pilot-test/`, `privacy/`, and `terms/` so GitHub Pages returns **200** for those paths. `404.html` still covers any other unknown route. |
| Pages workflow fails | Repo **Settings → Pages** must use **GitHub Actions** as source; org must allow Actions / Pages. |
| Custom domain not verifying | Match **`public/CNAME`** to Settings → Pages; wait for DNS; check CNAME target is `rdholdings.github.io` for `www`. |
| Screenshots missing in mockup | Add matching PNGs or adjust globs in `PrecisionPilotDevice.jsx`. |
| Fonts look wrong | Confirm font files exist under `src/assets/fonts/` and paths in `fonts.css`. |
| Hero video doesn’t play | Add `public/hero-video.mp4`; ensure codec is web-friendly (e.g. H.264 + AAC). |

---

## Maintenance checklist

- [ ] Set **`precisionPilotWebApp.productionEmbedUrl`** / **`testEmbedUrl`** when the web client is hosted; confirm **`/precision-pilot`** and **`/precision-pilot-test`** behave as expected.
- [ ] Replace placeholder download URLs in `precisionPilot.js` and set **`enabled: true`** per platform when live.
- [ ] Refresh **Privacy** / **Terms** dates and body copy with legal review.
- [ ] Add **DMCA designated agent** details in Terms if you rely on that section.
- [ ] Keep **dependencies** patched (`npm audit`, periodic `npm update`).
- [ ] Confirm **leadership** / **contact** sections or footer anchors match real page IDs when you add those sections.

---

## License & ownership

This project is **private** and proprietary to **Red Domino Holdings** (or its designated owner). Do not redistribute without authorization.

---

## Support

For repository access, deployment, or content updates, contact your **Red Domino Holdings** / **Phantom Development** project lead or the maintainers of the **RDHoldings** GitHub organization.
