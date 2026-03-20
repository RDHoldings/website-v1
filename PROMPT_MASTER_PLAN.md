# RED DOMINO HOLDINGS - MASTER BUILD PLAN

---

## 1. Project Overview & Role

You are an expert Frontend Architect and UI/UX Designer. Your task is to build a highly modern, premium, responsive Single Page Application (SPA) landing page for "Red Domino Holdings."

The tone of the copy must be **highly modern corporate, authoritative, and focused on aggressive growth.** The language must imply that all parent divisions and sub-companies are currently active and scaling.

---

## 2. Technology Stack

* **Framework:** React (initialized via Vite for speed).
* **Styling:** Tailwind CSS (for all utility styling, layout, and responsiveness).
* **Animations:** Framer Motion (for all scroll animations, page transitions, and hover states).
* **Icons:** Lucide React (for clean, modern SVG iconography).

---

## 3. Brand Design System

Strictly adhere to the following branding guidelines. Do not deviate from these gradients, colors, or fonts.

### Typography

* **Primary Brand Font (Red Domino):** 'Pirulen' (Ensure fallback is a clean sans-serif like 'Inter').
* **Secondary Brand Font (Holdings):** 'Felix Titling' (Ensure fallback is a premium serif like 'Playfair Display').
* **Body/UI Font:** 'Inter' or 'Geist' (Clean, highly legible modern sans-serif).
* **Rule:** Ensure correct spacing and strict formatting for all corporate naming conventions across the site.

### Color Palette

* **Background:** Premium Onyx (`#0A0A0A`). Do not use pure black. Sections can alternate with subtle dark grays (e.g., `#111111`) to create depth.
* **Crimson Gradient:** `linear-gradient(to top, #390000 0%, #990000 70%, #420000 100%)`
* **Gold Gradient:** `linear-gradient(to top, #3b2f1a 0%, #7a5a2e 12%, #c49a3a 28%, #f2d675 45%, #fff2c7 62%, #d9b44a 78%, #8a6a2a 100%)`
* **Text Colors:** Primary text should be off-white (`#F3F4F6`), secondary text muted gray (`#9CA3AF`).

---

## 4. Architecture & Directory Structure

Implement the following scalable directory structure to allow for easy transition to a multi-page routing system in the future:

```text
/src
  /assets         (Logos, images, background videos)
  /components     (Reusable UI elements: Buttons, Cards, Nav)
    /sections     (Major page sections: Hero, Divisions, Tech, Footer)
  /styles         (Global CSS, Tailwind config, font imports)
  /utils          (Animation variants, helper functions)
  App.jsx         (Main SPA assembly)
  main.jsx        (Entry point)
```

---

## 5. UI/UX Layout & Requirements

### A. Global Header (Sticky)

* **Layout:** Centered logo configuration.
* **Visuals:** Use the "Long Logo" (RD Holdings Logo.png) centered at the top.
* **Navigation:** Centered below the logo. Links: [ Our Divisions | Proprietary Tech | Leadership | Contact ].
* **Behavior:** Navbar should have a glassmorphism effect (blur) when scrolling down.

### B. Hero Section

* **Visuals:** Abstract, slow-moving particle background or sleek dark geometry to represent a tech-forward management firm.
* **Copy (H1):** "Strategic Scaling. Infinite Potential." (Use Gold gradient for text clipping on "Infinite Potential").
* **Subtext:** "Red Domino Holdings is a premier management firm architecting the future of logistics, transportation, and digital media through proprietary technology and aggressive market expansion."
* **Animation:** Smooth fade-up on text mount.

### C. Our Divisions (The Core Portfolio)

* **Layout:** Side-by-side premium card grid (stacking on mobile). Card borders should feature a subtle 1px gold or crimson gradient stroke.
* **Animation:** Cards should scale up slightly (1.02x) and illuminate a subtle background glow on hover.

#### Card 1: Red Domino Logistics

* **Copy:** Overseeing a massive footprint in over-the-road freight, specialized equipment, and dedicated carrier operations.
* **Active Entities:** Highlight Red Domino Precision Freight Lines, Red Domino Equipment, and Red Domino Expedited.
* **Action:** "View Operations" button.

#### Card 2: Red Domino Media Group

* **Copy:** A powerhouse digital agency driving brand architecture, full-stack development, and professional-grade audio and video production.
* **Active Entities:** Highlight Sunflower Studios, Sunbound Productions, Phantom Development, and HarriHouse Publishing.
* **Action:** "Explore Media" button.

### D. Proprietary Technology (Precision Freight App)

* **Layout:** Split section. Left side: Copy and feature list. Right side: Floating, animated mockup of a mobile app interface.
* **Headline:** "Vertical Integration Through Custom Tech."
* **Copy:** Highlight the proprietary Precision Freight application powering the logistics division.

**Key Features to Highlight (Pulling from internal specs):**

* **Driver-Centric Management:** Real-time load lifecycles, appointment tracking, and automated assignments.
* **The "Money Brain" Analytics:** Live settlement views, CPM tracking, and advanced profit/loss spread analytics for fleet owners.
* **Intelligent Routing:** Commercial truck routing integrated with live fuel optimizers and IFTA state mile tracking.
* **Compliance & Fleet Health:** Built-in Tax Hub, automated MACRS depreciation tracking, and predictive maintenance logs.

### E. Global Footer

* **Layout:** Clean, expansive footer.
* **Visuals:** Use the "Short Logo" (RD Holdings Logo (Short Logo) 2.png) aligned to the left or centered.
* **Links:** Repeat navigation, add "Privacy Policy" and "Terms of Service".
* **Legal:** "© [Current Year] Red Domino Holdings. All Rights Reserved."

---

## 6. Execution Instructions for Cursor

1. Initialize the Vite + React + Tailwind project.
2. Set up `tailwind.config.js` with the exact gradient color codes provided.
3. Import and configure the Pirulen and Felix Titling fonts (instruct the user on how to load these locally if they are custom .ttf/.otf files).
4. Build the components sequentially from Header to Footer.
5. Apply Framer Motion `initial`, `whileInView`, and `viewport={{ once: true }}` props to ensure elegant reveal animations as the user scrolls down the page.
6. Ensure the entire layout is flawlessly responsive using standard Tailwind breakpoints (sm, md, lg, xl).
