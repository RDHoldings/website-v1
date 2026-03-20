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
- [Precision Pilot downloads](#precision-pilot-downloads)
- [Legal & compliance content](#legal--compliance-content)
- [Environment variables](#environment-variables)
- [Building for production](#building-for-production)
- [Deployment notes](#deployment-notes)
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
├── public/                      # Static files (copied to dist root as-is)
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

| Path        | Page |
|------------|------|
| `/`        | Marketing home (Header, Hero, Divisions, Tech, Footer) |
| `/privacy` | Privacy Policy |
| `/terms`   | Terms of Service |

`BrowserRouter` is mounted in `src/main.jsx`. Footer and nav use `Link` / paths such as `/#divisions` and `/#tech` for in-page anchors.

---

## Configuration

### Precision Pilot (`src/config/precisionPilot.js`)

Central place for:

- **Audience** one-liner and **Learn more** `href` (mailto, future product path, or external URL).
- **Download** metadata per platform: `fileUrl`, optional `storeUrl`, `storeLabel`, and `enabled`.

Set `enabled: true` when a build or URL is live. Paths under `/downloads/...` map to `public/downloads/...`.

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

---

## Building for production

```bash
npm run build
```

Output: **`dist/`** — static HTML, JS, CSS, and hashed assets suitable for any static host (GitHub Pages, Netlify, Vercel, S3, etc.).

---

## Deployment notes

- **SPA deep links:** Hosts must serve **`index.html`** for unknown paths (e.g. `/privacy`), or direct visits to `/privacy` will 404. Configure your host’s **rewrite rules** or use the **GitHub Pages SPA `404.html` pattern** if applicable.
- **Custom domain + HTTPS:** Configure DNS per your provider; enable **Enforce HTTPS** in GitHub Pages when using that platform.
- **Repository:** Ensure `git remote` points at your canonical GitHub URL and branch (e.g. `main`).

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
| `/privacy` 404 on refresh | Configure host SPA fallback to `index.html`. |
| Screenshots missing in mockup | Add matching PNGs or adjust globs in `PrecisionPilotDevice.jsx`. |
| Fonts look wrong | Confirm font files exist under `src/assets/fonts/` and paths in `fonts.css`. |
| Hero video doesn’t play | Add `public/hero-video.mp4`; ensure codec is web-friendly (e.g. H.264 + AAC). |

---

## Maintenance checklist

- [ ] Replace placeholder **mailto** and download URLs in `precisionPilot.js`.
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
