# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/landing site for UBC's Cognitive Systems Society (CSS) club. React 19 + TypeScript, built with Vite. Single-page site (no router) — header/nav, a hero section, and a scroll-revealed folder showcase; new page sections should become new components under `src/components/`, composed into `App.tsx`.

## Commands

```bash
npm run dev       # start Vite dev server with HMR
npm run build     # type-check (tsc -b) then production build via Vite
npm run lint      # eslint .
npm run preview   # preview the production build locally
```

There is no test suite configured in this repo.

## Architecture

- `src/main.tsx` mounts `App` into `#root` in `index.html`.
- `src/App.tsx` is a thin composition root: the `site-shell` wrapper (pointer-tracking for a CSS spotlight effect) rendering `<Cursor /> <Header /> <Hero /> <FolderShowcase /> <ScrollCue />`. It has no markup of its own beyond that shell.
- Each component lives in its own folder under `src/components/<Name>/` with its markup and stylesheet together (`<Name>.tsx` + `<Name>.css`, imported by the component itself). New page sections should follow the same pattern: a new `src/components/<Section>/` folder composed into `App.tsx`, using the existing kebab-case BEM-ish class naming style (`hero-stage`, `hero-copy`, `mascot-frame`, etc).
- `src/components/Header/Header.tsx` owns the `navContent` JSX (nav links + dropdowns + CTA) as one fragment rendered twice: once inside `<nav className="site-nav desktop-only">`, once passed as children to `<MobileNav>`. When editing nav links/dropdowns, edit `navContent` once — both desktop and mobile pick it up.
- `src/components/NavDropdown/NavDropdown.tsx` — reusable hover/click dropdown for nav items (`label` + `items: {label, href}[]` props). On touch devices (`hover: hover` media query fails) it falls back to click-to-toggle instead of CSS hover. Used by both `Header` (desktop) and `MobileNav` (mobile), so `NavDropdown.css` has both a base ruleset and mobile-specific overrides live in `MobileNav.css` (scoped under `.mobile-nav-links`).
- `src/components/MobileNav/MobileNav.tsx` — hamburger button + slide-out panel, rendered via `createPortal` directly into `document.body` (so it isn't affected by header stacking/overflow). Toggles `document.body.style.overflow` while open to lock background scroll.
- `src/components/Cursor/Cursor.tsx` — custom animated cursor (dot + trailing ring) driven by `requestAnimationFrame`, attached via `window` pointer listeners. Self-disables when `matchMedia('(hover: hover) and (pointer: fine)')` is false (touch devices). `Cursor.css` also carries the global `* { cursor: none }` override (and per-element opt-outs) that hides the native cursor everywhere hover is supported — that's a consequence of this feature, not dead code.
- Desktop vs. mobile UI is switched with the `desktop-only` / `mobile-only` CSS classes (defined in `Header.css`), not JS breakpoint checks, except where `matchMedia` is needed to change behavior (cursor, dropdown hover support).
- `App.tsx` tracks pointer position on the root `<main>` via `onPointerMove`, writing `--pointer-x` / `--pointer-y` CSS custom properties onto the element for use in CSS (e.g. gradient/spotlight effects in `App.css`).
- `src/hooks/useInView.ts` — reusable `IntersectionObserver` hook (`{ ref, isInView }`, reveal-once, threshold configurable) for scroll-triggered entrance animations. `src/components/FolderPreview/FolderPreview.tsx` is the reference usage: it toggles an `is-visible` class from `isInView` and does all the actual animation in CSS transitions. Reuse this hook rather than writing a new observer for the next scroll-reveal section.
- `src/components/FolderPreview/FolderPreview.tsx` + `FolderShowcase.tsx` — the folder-shaped previews below the hero. `FolderShowcase.tsx` owns the data (title/description/href/photos per folder); `FolderPreview.tsx` is the presentational, data-driven single folder. The folder and its 3 photos are absolutely positioned in one shared `.folder-stage` so the photos can start tucked exactly behind the (higher z-index) folder and travel out from underneath it. Each folder's `align: 'left' | 'right'` prop sets a `--dir` CSS custom property that flips both which edge the folder anchors to and the sign of the photos' scatter transform — that's how left/right mirroring is done without duplicating the scatter math. Photos are placeholders (`{ alt }`) until a real image is wanted: add `src` to that photo's data entry in `FolderShowcase.tsx` and it renders an `<img>` instead of the placeholder box, no other changes needed.
- The photo reveal trigger branches on *input capability*, not just viewport width: `(hover: hover) and (pointer: fine)` gets the desktop hover-triggered reveal (plus the pulsing "Hover to explore" `.hover-hint` badge, hidden everywhere else); anything without real hover — phones (`max-width: 980px`) or a desktop-sized touchscreen (`min-width: 981px) and (hover: none)`) — falls back to the same `useInView`-driven scroll reveal, just with different fall directions. `prefers-reduced-motion: reduce` disables all of it by default and then explicitly re-enables the photo transition only for the hover-capable case, since that one is a deliberate user-initiated interaction rather than automatic motion.
- `<section className="folder-showcase" id="folder-showcase">` (in `FolderShowcase.tsx`) is the shared scroll target for "jump to the sections below the hero": both `src/components/ScrollCue/ScrollCue.tsx` (the bouncing bottom-center arrow, shown only while `window.scrollY < 40`, tracked via a plain `scroll` listener rather than `useInView` since it needs continuous position, not a one-shot reveal) and the hero's "Learn what CSS does" link are just plain `<a href="#folder-showcase">`s — the smooth animation is native `scroll-behavior: smooth` on `html` in `index.css`, gated under `@media (prefers-reduced-motion: no-preference)`. No JS scroll handler; a custom `requestAnimationFrame`-eased version was tried and deliberately reverted in favor of the native behavior.

## Styling

- No CSS modules/Tailwind/styled-components — plain CSS, one stylesheet per component, imported by that component (`import './Header.css'` in `Header.tsx`, etc). `App.css` only holds the root `site-shell` background/grid-overlay layers. Base/reset styles and site-wide color variables are global, in `src/index.css`.
- Color palette and fonts are defined as CSS custom properties on `:root` in `src/index.css` (`--color-*` variables; fonts are Fraunces for headings, Manrope for body, loaded via Google Fonts `@import`). Reuse these variables rather than hardcoding colors.
- Responsive behavior is handled with plain `@media` queries colocated in each component's own CSS file (main breakpoint at `980px`, plus `hover`/`pointer` and `prefers-reduced-motion` queries) — there is no CSS framework.
- `src/styles/future-sections.css` holds styling for nav items that don't have a built page section yet (Events/Merch/Resources/About — things like `.join-strip`, `.mini-stats`, `.info-grid`, `.stream-list`). **This file is intentionally not imported anywhere.** When you build one of those sections, pull the relevant rules out into that new component's own CSS file rather than importing this file wholesale.

## TypeScript config notes

- `noUnusedLocals` / `noUnusedParameters` / `noFallthroughCasesInSwitch` are enabled — unused variables/params will fail `tsc -b` (and thus `npm run build`).
- `verbatimModuleSyntax` is on — type-only imports must use `import type { ... }`.
