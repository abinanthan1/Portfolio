# Abinanthan T — Portfolio

Personal portfolio website for Abinanthan T, Data Analyst.  
Plain HTML · CSS · Vanilla JavaScript. No build step, no frameworks.

---

## How to run

1. Open `index.html` in any modern browser — that's it.  
   Double-click the file, or right-click → *Open with* → your browser of choice.

2. For local development with live-reload, any static file server works:

   ```bash
   # Python (built-in)
   python -m http.server 5500

   # Node (npx, no install)
   npx serve .

   # VS Code
   Install the "Live Server" extension, then click "Go Live" in the status bar.
   ```

   Then open `http://localhost:5500` in your browser.

---

## File structure

```
Portfolio/
├── index.html          # All markup — single page
├── styles.css          # All styles (responsive, 720 px breakpoint)
├── script.js           # All interactivity (no dependencies)
├── assets/             # Static files — add your own here
│   ├── Abinanthan_T_Resume.pdf   ← place your resume PDF here
│   ├── njiwa-1.jpg               ← Njiwa dashboard overview screenshot
│   ├── njiwa-2.jpg               ← Njiwa cost-analysis screenshot
│   ├── carsales-1.jpg            ← Car Sales overview screenshot
│   └── carsales-2.jpg            ← Car Sales breakdown screenshot
└── README.md
```

---

## Adding your assets

### Resume
Drop your resume as **`assets/Abinanthan_T_Resume.pdf`**.  
The "Download resume" button in the hero already points to this path.

### Project screenshots
Save four images into `assets/` with these exact names:

| File | Used in |
|------|---------|
| `njiwa-1.png` | Njiwa Water Project — dashboard overview |
| `njiwa-2.png` | Njiwa Water Project — report dashboard |
| `carsales-1.png` | Car Sales Analysis — sales overview |
| `carsales-2.png` | Car Sales Analysis — BMW company view |

Any image format the browser supports (PNG, JPG, WebP) works — just keep the filenames matching, or update the `src` and `data-src` attributes in `index.html` to match your filenames.  
Recommended size: **1200 × 750 px** or similar 16:9-ish ratio for best display in the lightbox.

---

## Features at a glance

| Feature | How it works |
|---------|-------------|
| Hero heading animation | CSS `@keyframes slideUp` on page load |
| Tagline / terminal fade-in | CSS `@keyframes fadeUp` with staggered delays |
| SQL typewriter | Vanilla JS character-by-character timer |
| Dot-grid spotlight | `<canvas>` + `mousemove`, drawn every rAF frame |
| Skills marquee | CSS `@keyframes marquee`; pauses on hover |
| Section heading lines | `IntersectionObserver` toggles `scaleX` CSS transform |
| Scroll reveal | `IntersectionObserver` adds `.visible` class |
| Stat counters | Ease-out quad counter, fires once on scroll into view |
| Project cards | Native `<details>` / `<summary>` + JS smooth-height animation |
| Screenshot lightbox | Focus-trapped dialog; close via Esc, close button, or backdrop click |
| Mobile nav | Hamburger toggle; closes on link click or Esc |
| Reduced motion | All animations/transitions disabled via `prefers-reduced-motion` |

---

## Customisation tips

- **Colours / spacing** — all tokens live in `:root` at the top of `styles.css`.
- **Fonts** — swap the Google Fonts `<link>` in `index.html` and update `--font-head` / `--font-body` in `:root`.
- **Content** — everything is plain HTML in `index.html`; no template engine or CMS needed.
- **New sections** — copy an existing `<section class="section …">` block as a starting point; the reveal animation picks up `.reveal` elements automatically.

---

© Abinanthan T
