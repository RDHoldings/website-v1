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

```
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
| **`/precision-pilot`** | Production shell: full-viewport **iframe** loading **`productionEmbedUrl`** (default **`/precision-pilot/app/`** — placeholder HTML until you ship your SPA). |
| **`/precision-pilot-test`** | Pre-release shell: **`testEmbedUrl`** (default **`/precision-pilot-test/app/`**) + **`testUrlExtraParams`**. Test banner, **noindex** meta, debug line for resolved iframe `src`. |

If embed URLs are cleared (`''`), both routes show setup copy and the **download** cards instead of an iframe. Point your web app (Vercel, Cloudflare, etc.) at these paths for deep links, or set embed URLs to load that app inside the iframe.

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

---

## SEO & accessibility

- **Per-route meta:** **`src/components/Seo.jsx`** (via **`react-helmet-async`**) sets `title`, `description`, `canonical`, Open Graph, Twitter Card tags, and **`robots`** (`noindex` on **`/precision-pilot-test`**). Home page injects **Organization** JSON-LD; **`/precision-pilot`** adds **SoftwareApplication** JSON-LD.
- **Defaults for non-JS crawlers:** **`index.html`** includes base description, theme color, and OG/Twitter tags pointing at **`https://www.reddominoholdings.com/`** — update if your canonical domain differs.
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
| `/privacy` 404 on refresh | On GitHub Pages, the workflow copies `index.html` → `404.html`. For other hosts, configure SPA fallback. |
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
