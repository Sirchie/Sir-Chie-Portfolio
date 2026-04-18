# My Interactive Portfolio — CLAUDE.md

## Project Overview
An interactive personal portfolio website. The goal is a production-grade, visually memorable experience that avoids every "AI slop" cliché. Every page should feel genuinely designed, not generated.

---

## Design System Baseline

| Dial              | Value | Meaning                                      |
|-------------------|-------|----------------------------------------------|
| DESIGN_VARIANCE   | 8     | Asymmetric layouts, masonry, fractional grids |
| MOTION_INTENSITY  | 6     | Fluid CSS transitions + Framer Motion spring physics |
| VISUAL_DENSITY    | 4     | Daily-app spacing — breathable but not sparse |

These are global defaults. Override them per-section when context demands it (e.g., a hero needs more motion, a contact form needs less variance).

---

## Stack & Architecture

- **Framework:** Next.js (App Router). Default to Server Components; isolate interactivity into leaf `'use client'` components.
- **Styling:** Tailwind CSS — check `package.json` for v3 vs v4 before writing config. Never mix v3/v4 syntax.
- **Animation:** Framer Motion for UI interactions. GSAP/ThreeJS only for isolated full-page scroll sequences or canvas backgrounds — never mix with Framer Motion in the same tree.
- **Icons:** `@phosphor-icons/react` or `@radix-ui/react-icons` — verify installed package before importing. Standardize `strokeWidth` to `1.5` globally.
- **State:** `useState`/`useReducer` for local UI. Global state only to avoid deep prop-drilling.

**Dependency rule:** Before importing any third-party library, check `package.json`. If missing, output the install command first.

---

## Typography Rules

- **Display/Headlines:** `text-4xl md:text-6xl tracking-tighter leading-none`
- **Body:** `text-base text-gray-600 leading-relaxed max-w-[65ch]`
- **Allowed fonts:** `Geist`, `Outfit`, `Cabinet Grotesk`, `Satoshi` — paired with `Geist Mono` or `JetBrains Mono` for code/data.
- **Banned fonts:** `Inter`, `Roboto`, `Arial`, `Space Grotesk`, any system-font stack for creative sections.
- Serif fonts are allowed **only** for editorial/creative sections. Never on dashboards or UI-heavy pages.

---

## Color Rules

- Max **1 accent color** per page. Saturation < 80%.
- Neutral base: `Zinc` or `Slate` scale.
- Allowed accents: Emerald, Electric Blue, Deep Rose, Amber — anything but purple/violet gradients.
- **Banned:** The "AI Purple/Blue" aesthetic — no purple glows, no neon gradients, no `#000000` pure black (use Zinc-950).
- Never fluctuate between warm and cool grays within the same page.

---

## Layout Rules

- Full-height sections: always `min-h-[100dvh]` — never `h-screen`.
- Page containers: `max-w-[1400px] mx-auto` or `max-w-7xl`.
- Grids over flex-math: use `grid grid-cols-1 md:grid-cols-N gap-N` — never `w-[calc(33%-1rem)]`.
- **No centered hero sections** (DESIGN_VARIANCE = 8). Use Split Screen (50/50), Left-aligned content + Right asset, or Asymmetric whitespace.
- **No 3-equal-card rows.** Use 2-column zig-zag, asymmetric Bento, or horizontal scroll instead.
- Mobile collapse is mandatory for any asymmetric layout: `w-full px-4 py-8` below `md:`.

---

## Motion Rules

- Animate only `transform` and `opacity` — never `top`, `left`, `width`, `height`.
- Spring physics everywhere interactive: `type: "spring", stiffness: 100, damping: 20`.
- Staggered load-ins: `staggerChildren` (Framer) or CSS `animation-delay: calc(var(--index) * 100ms)`.
- Perpetual micro-animations (pulse, float, typewriter, shimmer) must be isolated in their own memoized `React.memo` Client Components.
- Grain/noise overlays: apply only to `fixed inset-0 pointer-events-none` pseudo-elements — never to scrolling containers.
- No `window.addEventListener('scroll')` — use Framer Motion scroll hooks or GSAP ScrollTrigger.

---

## Component Quality Checklist

Every interactive component must include:
- **Loading state:** Skeletal loaders matching the layout shape — no generic spinners.
- **Empty state:** Composed empty state with a clear call to action.
- **Error state:** Inline error reporting (forms: error text below the field, label above).
- **Tactile feedback:** On `:active`, use `scale-[0.98]` or `-translate-y-[1px]`.

---

## Glassmorphism (when used)

Go beyond `backdrop-blur`. Add:
- `border border-white/10` (inner edge refraction)
- `shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]` (inner top highlight)

---

## Banned Patterns (AI Tells)

| Category     | Banned                                                                 |
|--------------|------------------------------------------------------------------------|
| Fonts        | Inter, Roboto, Arial, Space Grotesk, system fonts for creative UI      |
| Colors       | Purple/violet gradients, neon outer glows, pure `#000000`              |
| Layout       | Centered hero, 3-equal-card rows, `h-screen`, flex percentage math     |
| Content      | "John Doe", "Acme", "Nexus", "99.99%", generic SVG user avatars        |
| Copy         | "Elevate", "Seamless", "Unleash", "Next-Gen", "Cutting-edge"           |
| Images       | Unsplash URLs (broken) — use `https://picsum.photos/seed/{slug}/W/H`   |
| CSS          | Arbitrary `z-50` spam, outer box-shadow glows, gradient text on H1s    |
| Performance  | `useState` for continuous animations — use `useMotionValue` instead    |
| Code         | Emojis anywhere in markup, code, or alt text                           |

---

## Bento Grid Standard (for feature/dashboard sections)

- Background: `#f9fafb`. Cards: `#ffffff` with `border border-slate-200/50`.
- Corners: `rounded-[2.5rem]` on major containers.
- Shadow: `shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]` — diffusion, not hard drop.
- Labels/captions: **outside and below** cards for gallery-style cleanliness.
- Padding: `p-8` or `p-10` inside cards.
- Every card must have a perpetual micro-interaction (loop, pulse, typewriter, or carousel).

---

## Creative Arsenal (preferred patterns for this portfolio)

Pull from these when building sections rather than defaulting to generic layouts:

- **Hero:** Asymmetric split — text left/right, background image with stylistic fade.
- **Navigation:** Magnetic buttons, floating pill nav, or Mac-dock magnification.
- **Feature sections:** Bento grid with Framer Motion perpetual animations.
- **Typography moments:** Text scramble effect on load, kinetic marquee for tags/skills.
- **Backgrounds:** Mesh gradient (animated color blobs), grain overlay, geometric patterns.
- **Cards:** Spotlight border, parallax tilt, glassmorphism panel.
- **Scroll:** Sticky scroll stack, zoom parallax, scroll-progress SVG path.

---

## Code Quality

- No comments unless the **why** is non-obvious (hidden constraint, workaround, subtle invariant).
- No docstrings or multi-line comment blocks.
- No error handling for impossible scenarios — trust framework guarantees.
- `useEffect` animations must have strict cleanup functions.
- Mark tasks done as soon as completed — don't batch.
