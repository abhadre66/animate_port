# Animate Port — Build Pipeline (v2)

Award-level cinematic developer portfolio inspired by david-hckh.com.
Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4,
Framer Motion, GSAP, Three.js / React Three Fiber / Drei, Lenis, Zustand.

Journey: Loading → Hero → About → Projects → Skills → Experience → Contact → Outro.

## Phase 0 — Foundation
- [x] Wipe previous implementation, scaffold fresh `src/` structure
- [x] Install gsap, lenis, zustand
- [x] Recreate `src/data/resumeData.ts` from resume content
- [x] Dark/futuristic theme in `globals.css` (Tailwind v4 `@theme inline`)
- [x] Root layout: fonts (Space Grotesk + JetBrains Mono), noise overlay,
      custom cursor, Lenis smooth scroll provider, loading screen

## Phase 1 — Loading Experience
- [x] Particle field background
- [x] Letter-by-letter name reveal
- [x] 0→100 progress counter (GSAP timeline)
- [x] Glowing sphere expand transition into Hero
- [x] Fade to black + unmount via Zustand store

## Phase 2 — Custom Cursor
- [x] Inner dot, outer ring, glow layer (spring physics via Framer Motion)
- [x] Magnetic/hover expansion on links & buttons (`data-cursor="link"`)

## Phase 3 — Hero Section
- [x] R3F particle field + glowing sphere scene
- [x] Mouse-reactive camera rig
- [x] Staggered text reveal (name, tagline, intro) with Expo easing

## Phase 4 — About Section
- [x] Left: rotating wireframe/morph 3D shape (R3F), parallax on scroll
- [x] Right: bio from resumeData.basics.summary, focus-area chips

## Phase 5 — Projects Section
- [x] Immersive glass cards w/ tilt, glow, scale on hover
- [x] Click → fullscreen modal (shared layoutId transition, blurred backdrop)
- [x] Full bullet details, stack tags, GitHub/live links

## Phase 6 — Skills Section
- [x] Central "Stack" node with technologies arranged radially
- [x] Animated SVG connection lines, floating + glow-on-hover nodes

## Phase 7 — Experience Section
- [x] Scroll-driven timeline (work + education), animated progress line
- [x] Cards slide in with illuminated nodes

## Phase 8 — Contact Section
- [x] Terminal UI with typewriter commands (`> contact`, `> email`, `> github`,
      `> linkedin`, `> resume`) and blinking cursor
- [x] Links to email, GitHub, LinkedIn, resume

## Phase 9 — Outro Section
- [x] Scroll-linked converging particles + reforming glow sphere
- [x] "Thanks for visiting." message, fade to black

## Phase 10 — QA / Polish (remaining)
- [x] `tsc --noEmit` clean
- [x] `next build` succeeds
- [ ] Add `public/resume.pdf` (Contact "resume" link currently points to /resume.pdf)
- [ ] Update `resumeData.basics.links.linkedin` with real profile URL
- [ ] Manual visual QA in browser across desktop/mobile breakpoints
- [ ] Performance pass (FPS check on 3D scenes, lazy-load tuning)
- [ ] Deploy (Vercel)
