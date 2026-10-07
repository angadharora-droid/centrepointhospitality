# Centre Point Hospitality — corporate website

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
npm run lint
```

In development, press **Shift+G** to toggle the column-grid overlay.

## Structure

```
src/
  app/            routes, root layout, globals.css (all design tokens)
  components/
    brand/        Logo
    layout/       Header, Container, Grid, SkipLink
    navigation/   DesktopNav, MobileMenu, MenuToggle, NavLink, ContactLink
    motion/       MotionProvider (LazyMotion + reduced-motion config)
    dev/          GridOverlay (development only)
  content/        site facts, navigation, content types (CMS-ready)
  hooks/          useScrolled, usePageLock
  lib/            motion presets, cn()
public/brand/     logo artwork cropped from the official files
```

## Conventions

- **Tokens** live in `src/app/globals.css` under `@theme`; the palette and type
  scale are closed, so only brand utilities exist (`bg-paper`, `text-magenta`,
  `text-display-xl`, `px-gutter`, `py-section`, `max-w-site` …).
- **Grid:** `<Container>` + `<Grid>` give 4 / 8 / 12 columns at mobile / md / lg.
- **Header over a hero:** render an element with `data-header-overlay` at the
  top of the page; the header starts transparent above it and turns solid on
  scroll. Pages without one get a solid header and are offset automatically.
- **Motion:** use `m.*` components with presets from `src/lib/motion.ts`.
  Reduced motion is respected by CSS and by `MotionConfig`.
- **Content:** components read typed data from `src/content/*` — no copy
  hard-coded in components, no invented facts.
# centrepointhospitality
