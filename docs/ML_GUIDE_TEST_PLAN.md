# ML Guide — Test Plan

**Phase:** Validation plan only. No new testing libraries unless a later implementation phase justifies them.

The repository has **no** `package.json` scripts, ESLint, TypeScript, or CI workflow. Use the commands that already exist, plus browser checks and a small number of extra Node assertions in `tests/test_study_companion.js` (or a new `tests/test_ml_guide.js` using the same `node:test` runner).

---

## 1. Exact commands available today

From `README.md`:

```bash
python -m http.server 8080
python _validate_bank.py
node tests/test_bank.js
node tests/test_mock_e2e.js
node tests/test_mock_runtime.js
node tests/test_study_companion.js
```

Local guide URL after the static server:

`http://localhost:8080/ml-guide.html`  
(Production clean URL is `/ml-guide` via Vercel.)

There is no production build command. “Production build” for this project means: deploy the static tree unchanged and confirm Vercel serves it.

---

## 2. Automated checks to add (optional, same runner)

Prefer extending Node tests that **read files** (already the pattern in `test_study_companion.js`):

| Assertion | Rationale |
| --- | --- |
| Canonical in `ml-guide.html` is `https://www.hellogaurav.me/ml-guide` | Prevents canonical/redirect regression |
| `sitemap.xml` `<loc>` for the guide matches that URL | Same |
| `vercel.json` contains `/ml-guide` rewrite | Routing |
| Exactly one `<h1>` and one `<main>` | Already partly tested |
| `app-shell.js` NAV includes an ML Guide route | Discoverability |
| No `ml-guide.html` left as canonical/OG URL | Clean URLs |
| Companion keyboard shortcuts are ignored when `contentEditable` **and** offer a disable setting once implemented | A11y 2.1.4 |

Do **not** add Playwright/Cypress unless you later accept that dependency. Manual browser steps below cover interaction.

Do **not** add Lighthouse CI until a Node toolchain exists.

---

## 3. Checklist

### 3.1 Production / static integrity

- [ ] `ml-guide.html` opens via `python -m http.server` without console syntax errors
- [ ] After deploy: `curl -sI https://www.hellogaurav.me/ml-guide` → 200
- [ ] `curl -sI https://www.hellogaurav.me/ml-guide.html` → 308 or 301 to `/ml-guide` (not the reverse)
- [ ] `GET /guide` either 301/308 to `/ml-guide` or is removed from docs/nav (today: **404**)
- [ ] Shared header/footer still render on `/`, `/syllabus`, `/practice-da`

### 3.2 Existing test suite

- [ ] `python _validate_bank.py` → `BANK OK`
- [ ] `node tests/test_bank.js`
- [ ] `node tests/test_mock_e2e.js`
- [ ] `node tests/test_mock_runtime.js`
- [ ] `node tests/test_study_companion.js`

### 3.3 Lint / types

- [ ] N/A — no project linter. Do not fail the plan on missing ESLint.

### 3.4 Links

- [ ] In-page TOC hashes (`#howto` … `#plan`) resolve
- [ ] `gate-ml-practice.html` / clean practice URL
- [ ] `index.html`, `topics/*`, `mock-test`, `about`, `contact`, `privacy-policy`, `terms`, `disclaimer`, `cookie-policy`
- [ ] Footer Cookie Preferences opens the consent modal
- [ ] No remaining in-content canonical links to `/ml-guide.html` except as redirects

### 3.5 Metadata and canonical

- [ ] View-source **and** live DOM canonical = `https://www.hellogaurav.me/ml-guide`
- [ ] `og:url` matches
- [ ] Title ≤ ~60 characters preferred but not mandatory; unique
- [ ] Meta description unique and accurate (no “150 questions” unless that bank is what you mean)
- [ ] `robots` still `index,follow` on the clean URL
- [ ] Querystring noindex helper does not fire on `/ml-guide`

### 3.6 Structured data

- [ ] Paste JSON-LD into [Google Rich Results Test](https://search.google.com/test/rich-results) after implementation
- [ ] Article/TechArticle URLs match canonical
- [ ] BreadcrumbList matches visible crumbs
- [ ] No `aggregateRating`, no review count, no invented `datePublished`
- [ ] Author is truthful (Person Gaurav Tiwari and/or Organization only if that is the public entity)

### 3.7 Layout

Desktop (~1280×800):

- [ ] TOC visible, does not cover text
- [ ] Hero does not consume a full viewport before “How to use”
- [ ] Header does not hide unit titles when jumping to `#u7`
- [ ] Code blocks scroll horizontally rather than stretching the page

Tablet (~768):

- [ ] TOC overlay opens/closes; Escape and veil close it
- [ ] Tables scroll inside the column

Mobile (~390×844):

- [ ] TOC button usable
- [ ] Cookie banner does not hide H1 + primary CTA simultaneously after first visit preference is set; on first visit it must still leave a path to dismiss
- [ ] Companion dock does not block TOC or theme controls
- [ ] No horizontal page scroll except inside `<pre>`/tables

### 3.8 Keyboard

- [ ] Skip link appears on first Tab and moves focus to `#main`
- [ ] Tab order: header → TOC (or toggle) → content → footer
- [ ] Theme, TOC, print, companion dock, consent buttons reachable
- [ ] Visible `:focus-visible` on custom buttons
- [ ] Escape closes TOC overlay, consent modal, companion drawer, zen mode
- [ ] Letter shortcuts do not fire in inputs **or** are disabled by a setting (WCAG 2.1.4)
- [ ] Marker canvas not a keyboard trap

### 3.9 Accessibility

- [ ] One H1; H2 units in order; no skipped levels inside a unit
- [ ] Hinglish regions have appropriate `lang` if implemented
- [ ] SVG diagrams that teach have a name
- [ ] Contrast: body text, muted text, links, badges — both themes (use a checker; do not guess)
- [ ] 200% zoom: text reflows, no clipping of H1
- [ ] `prefers-reduced-motion`: no consent slide, `scroll-behavior: auto`
- [ ] Screen reader (VoiceOver or NVDA) sample: page title, H1, first insight box, one code listing, TOC

### 3.10 Code copy (if implemented)

- [ ] Button labelled “Copy code”
- [ ] Copies plain text (no HTML spans)
- [ ] Announces “Copied” via `aria-live`
- [ ] Keyboard operable
- [ ] Failure path if clipboard permission denied

### 3.11 Table of contents

- [ ] Click jumps to unit; focus or scroll-margin accounts for sticky header
- [ ] Scrollspy updates without marking every unit active at once
- [ ] Mobile overlay does not leave `body.docs-open` stuck after resize > 900px (resize handler already closes mobile **site** menu; verify **docs** overlay too)

### 3.12 Console and network

- [ ] No JS exceptions on load
- [ ] No failed local assets (404 CSS/JS)
- [ ] With `AD_SERVING_ENABLED` false: **no** `adsbygoogle.js` request
- [ ] With empty `GA_ID`: **no** gtag request
- [ ] Google Fonts: only if still used; after self-host, fonts must be first-party

### 3.13 Failure modes

- [ ] `localStorage` blocked: theme, companion, consent fail closed without throwing
- [ ] Offline after first load: page still readable (no CMS fetch)
- [ ] Print parts 1–4: hidden units restore on `afterprint`

### 3.14 Performance (measure after visual/JS changes)

Record in the implementation PR; do not invent numbers now.

- [ ] Chrome DevTools Lighthouse mobile + desktop (LCP, INP, CLS, TTFB)
- [ ] Network: HTML size, JS size, font CSS
- [ ] Disable companion mentally: note cost of `study-companion.js` on this route
- [ ] Compare before/after `content-visibility` if touched

### 3.15 SEO crawlability

- [ ] View-source contains full unit HTML (not empty shells)
- [ ] Fetch as Google / URL inspection after canonical fix (requires Search Console — `GSC_TOKEN` currently empty)
- [ ] `robots.txt` still allows `/` and points at sitemap
- [ ] Sitemap fetches 200 as `application/xml` and lists `/ml-guide` once

### 3.16 Shared-component regression

- [ ] Home, syllabus, practice-da, about, privacy: header/footer/theme/consent
- [ ] Learn pages still resolve `data-root`
- [ ] Ad placeholders still hidden when serving disabled

---

## 4. Acceptance criteria (release of an implementation phase)

A phase may ship only if:

1. Relevant automated Node tests pass.
2. Canonical, sitemap, and live URL agree on `/ml-guide`.
3. No new console errors on the guide.
4. Keyboard skip-link + TOC overlay still work.
5. Ads/GA remain unloaded while flags are off.
6. Visual checks on desktop and one mobile width are recorded (screenshot or notes).
7. No fabricated schema fields were added.

---

## 5. Out of scope for this plan

- Load testing
- SEO rank tracking
- AdSense approval
- Legal review of privacy text (editorial, not automated)
