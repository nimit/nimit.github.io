# Next Steps — Website Improvements

Implementation plan for nimit.github.io portfolio enhancements.

**Design:** Minimalist Luxury (see `design-doc.md`)  
**Data Sources:** `cv.json` + `/src/content/blog/*.md` only

---

## Phase 1: Core Infrastructure

### 1. Static Blog Generation
- [ ] Create Vite plugin (`scripts/vite-plugin-blog.ts`) to pre-render markdown at build time
- [ ] Generate `blog-manifest.json` with post metadata
- [ ] Refactor `src/utils/blog.ts` to fetch pre-rendered HTML

### 2. Fix Direct URL Loading
- [ ] Create `public/404.html` with path-preserving redirect
- [ ] Clean up redirect script in `index.html`

---

## Phase 2: Design Refresh

### 3. Homepage Redesign (Minimalist Luxury)
- [ ] Add hero section with refined typography and subtle entrance animation
- [ ] Enhance visual hierarchy with generous spacing
- [ ] Add scroll-triggered fade-in for timeline sections
- [ ] Update `index.css` with design system CSS variables

### 4. Blog Post Improvements
- [ ] Add scroll progress bar at top of page
- [ ] Add estimated reading time
- [ ] Create `src/styles/blog-content.css` for markdown styling
- [ ] **Preserve:** light/dark mode image switching functionality
- [ ] Style: headings, blockquotes, code blocks, lists, tables, images

---

## Phase 3: Polish & Features

### 5. SEO & Meta Tags
- [ ] Add Open Graph meta tags to `index.html`
- [ ] Add Twitter Card meta tags

### 6. Performance Optimizations
- [ ] Preload critical fonts
- [ ] Add lazy loading for images

### 7. Accessibility
- [ ] Add ARIA labels to interactive elements
- [ ] Verify keyboard navigation
- [ ] Ensure focus states are visible

### 8. Project Detail Pages
- [ ] Create `src/pages/Project.tsx` for individual project views
- [ ] Add route `/projects/:slug`
- [ ] Content from `cv.json` projects array

### 9. Skills Visualization
- [ ] Create `src/components/Skills.tsx`
- [ ] Visual representation of skills from `cv.json`
- [ ] Add to homepage or dedicated section

---

## Principles

1. **Single source of truth** — All content from `cv.json` or blog markdown
2. **React best practices** — Proper component composition, hooks, memoization where beneficial
3. **Design consistency** — Follow `design-doc.md` for all UI decisions
4. **Clean code** — No hardcoded content in components
