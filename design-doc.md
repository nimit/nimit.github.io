# Design System — nimit.github.io

## Aesthetic Direction: Minimalist Luxury

A refined, intentional aesthetic characterized by:
- **Generous whitespace** — breathing room elevates content
- **Refined typography** — deliberate font choices, clear hierarchy
- **Subtle animations** — purposeful motion, never distracting
- **Restrained color palette** — muted tones with selective accents

---

## Typography

### Font Families
| Role | Font | Fallback |
|------|------|----------|
| Body / UI | Liberation Mono | ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace |
| Display / Branding | Newsreader | Georgia, serif |

### Type Scale
- **Hero name:** 2rem (32px), Newsreader
- **Section headings:** 1.125rem (18px), Liberation Mono, medium weight
- **Body text:** 0.9375rem (15px), Liberation Mono, regular
- **Small / Meta:** 0.8125rem (13px), Liberation Mono

### Line Heights
- Body: 1.6
- Headings: 1.3

---

## Color Palette

### Light Mode
| Role | Value |
|------|-------|
| Background | `#fafafa` |
| Surface | `#ffffff` |
| Text Primary | `#1a1a1a` |
| Text Secondary | `#6b7280` (gray-500) |
| Accent | `#2563eb` (blue-600) |
| Accent Hover | `#1d4ed8` (blue-700) |
| Border | `#e5e7eb` (gray-200) |

### Dark Mode
| Role | Value |
|------|-------|
| Background | `#1a1a1a` |
| Surface | `#242424` |
| Text Primary | `#f9fafb` (gray-100) |
| Text Secondary | `#9ca3af` (gray-400) |
| Accent | `#3b82f6` (blue-500) |
| Accent Hover | `#60a5fa` (blue-400) |
| Border | `#374151` (gray-700) |

---

## Spacing

Use Tailwind's default spacing scale. Key patterns:
- **Page max-width:** `max-w-3xl` (48rem / 768px)
- **Page padding:** `px-6`
- **Section gap:** `mb-16` between major sections
- **Component gap:** `space-y-8` for timeline items
- **Card padding:** `p-4`

---

## Animation

### Principles
- Subtle, purposeful motion only
- CSS transitions preferred over JS animations
- Duration: 150-300ms for micro-interactions
- Easing: `ease-out` for entrances, `ease-in-out` for state changes

### Standard Transitions
```css
/* Hover states */
transition-colors duration-200

/* Reveals on scroll */
transition-all duration-500 ease-out

/* Scale transforms */
transition-transform duration-200
```

### Current Animations
- **Shine effect:** Used on "CURRENT" and "Active" badges
- **Underline reveal:** Navigation link hover

---

## Components

### Cards (Timeline items)
- Subtle hover: elevate with `hover:bg-white dark:hover:bg-[#242424] hover:shadow-sm`
- Rounded corners: `rounded-lg`

### Pills / Badges
- Small: `px-2.5 py-0.5 rounded-full text-xs font-medium`
- Status colors: yellow for active/current, blue for tags

### Links
- Body links: accent color with underline
- Nav links: underline reveal on hover

---

## Data Sources

**Single source of truth** — all displayed content derives from:
1. `cv.json` — Work experience, projects, skills, profiles
2. `/src/content/blog/*.md` — Blog posts with frontmatter

No hardcoded content in components.

---

## Theme-Aware Images

Blog post images support automatic light/dark mode switching:
- Images named with `-light` suffix display in light mode
- Images named with `-dark` suffix display in dark mode
- The `BlogPost.tsx` component handles automatic switching via DOM manipulation

---

## Changelog

| Date | Change |
|------|--------|
| 2026-01-26 | Initial design system established |
