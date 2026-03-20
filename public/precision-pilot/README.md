# Precision Pilot — static files for production (`/precision-pilot/...`)

## How this repo deploys these paths

1. **Marketing shell (React)**  
   The URL **`/precision-pilot`** is a **client-side route** in this Vite app. It is **built from `src/`** on every `npm run build` and deployed as part of **`dist/index.html`** + JS/CSS (same as the rest of the site).

2. **Everything in this `public/precision-pilot/` folder**  
   Vite copies **`public/`** → **`dist/`** as-is. Any file you commit here is **included in every build** and **deployed with GitHub Actions** (no extra workflow step needed).

## Hosting the embedded web client on the same site

The shell page can load your Precision Pilot SPA in an **iframe** via `precisionPilotWebApp.productionEmbedUrl` in `src/config/precisionPilot.js`.

**Do not** place an `index.html` at **`public/precision-pilot/index.html`**. On static hosts, a real file at that path can **override** the React shell for `/precision-pilot/`.

Instead, output your separate web app with **`base: '/precision-pilot/app/'`** (or similar) and deploy its build into:

**`public/precision-pilot/app/`**  
→ live URL: **`https://your-domain/precision-pilot/app/`**  
→ set `productionEmbedUrl: '/precision-pilot/app/'` (trailing slash recommended).

Then commit and push; the next deploy ships those assets automatically.

**Bundled placeholder:** `app/index.html` is a temporary in-iframe page so the shell works before your real build exists. Replace it when you publish the production SPA.
