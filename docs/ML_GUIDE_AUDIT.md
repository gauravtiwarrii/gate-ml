# ML Guide — Phase 1 Audit

**Page:** https://www.hellogaurav.me/ml-guide  
**Source:** `ml-guide.html` (static HTML)  
**Audit date:** 25 October 2026  
**Scope:** Read-only repository inspection plus live-page inspection. No application files were modified.

Evidence classes used throughout:

| Class | Meaning |
| --- | --- |
| **Confirmed** | Observed in source, live HTTP, or the live DOM |
| **Likely** | Strong signal, needs a targeted verification in implementation |
| **Enhancement** | Not a defect; would improve the product |
| **Unverified** | Could not be measured with available tools |

Secrets, `.env` files, and API keys were not inspected. Public identifiers such as the AdSense publisher ID in `ads.txt` / `site-config.js` are treated as non-secret configuration.

---

## 1. Repository architecture discovered

The site is **not** a React/Next/Vite app. It is a **static HTML/CSS/JS site** deployed on **Vercel**.

| Item | Finding |
| --- | --- |
| Framework | None. Vanilla HTML, CSS, and JavaScript |
| Package manager / lockfile | None. `.kilo/.gitignore` ignores `package.json` / lockfiles. No npm/pip app dependencies |
| Build step | None. README: Framework Preset `Other`, empty build command |
| Hosting | Vercel (`vercel.json`, live `Server: Vercel`) |
| Routing | File-based pages + `vercel.json` `cleanUrls: true`, `trailingSlash: false`, and explicit rewrites |
| `/ml-guide` implementation | Single page `ml-guide.html` (~566 KB local, 557,282 bytes live). Rewrite `{ "source": "/ml-guide", "destination": "/ml-guide.html" }` |
| Alternate route `/guide` | Present in `vercel.json`; **live HTTP 404** |
| Shared chrome | `assets/app-shell.js` injects header, mobile menu, footer, theme toggle; `assets/app.css` + `assets/seo.css` |
| Guide-only UI | Large `<style>` block in `ml-guide.html`; sidebar `#docsnav`; print helper; `assets/study-companion.js` (~135 KB) + `assets/study-companion.css` |
| Fonts | Google Fonts **Manrope** + **DM Mono** on the guide; shared `app.css` comments that the design system prefers a system stack |
| Design tokens | CSS custom properties in `app.css` (`--bg`, `--text`, `--accent` `#e2601f`, `--nav-h` 60px). Guide page redefines overlapping tokens inside `@media screen` |
| SEO helper | `assets/seo.js` (canonical rewrite, querystring noindex, optional GSC/GA) |
| Ads | `assets/ads.js` + `site-config.js`. `AD_SERVING_ENABLED: false` |
| Consent | `assets/consent.js` — local preferences + Consent Mode v2 defaults. Comments state a Google-certified CMP is still required before personalized ads in EEA/UK/CH |
| CMS / data fetching | None for the guide. Content is authored HTML. JSON banks exist only for practice (`data/practice-da.json`) |
| Tests | Node `node:test` files under `tests/` plus `python _validate_bank.py`. No linter, no TypeScript, no CI config in-repo |
| Local serve | `python -m http.server 8080` or open files directly |

### Application entry points

- Site home: `index.html`
- ML Guide: `ml-guide.html` → live `/ml-guide`
- Practice (older ML bank): `gate-ml-practice.html`
- GATE DA 2027 app pages: `dashboard/`, `syllabus/`, `practice-da/`, `mock-da/`, `learn/*`, etc.
- Legal: `about/`, `contact/`, `privacy-policy/`, `terms/`, `disclaimer/`, `cookie-policy/`

Header/footer are **client-injected**. The guide HTML itself starts at `<main id="main">`. Search engines that execute JavaScript see the shell; the educational body is in the initial HTML (good for crawlability of content).

### Primary navigation (from `app-shell.js`)

Dashboard, Syllabus, Learn (`learn/calculus`), Practice (`practice-da`), Mocks, PYQ Guide, Coverage. **The ML Guide is not a primary nav item.** Footer “Learn” lists calculus/programming/DBMS/AI/aptitude/coverage — not the ML Guide.

---

## 2. Live-page inspection

| Check | Result | Class |
| --- | --- | --- |
| `GET /ml-guide` | **200** `text/html`, Vercel HIT, ~557 KB | Confirmed |
| `GET /ml-guide.html` | **308** → `/ml-guide` (Vercel `cleanUrls`) | Confirmed |
| `GET /guide` | **404** | Confirmed |
| `robots.txt` | **200**, `Allow: /`, sitemap declared | Confirmed |
| `sitemap.xml` HEAD | **200**; lists `https://www.hellogaurav.me/ml-guide.html` | Confirmed |
| `ads.txt` | Present in repo and listed in architecture | Confirmed in repo |
| Document title | `GATE Machine Learning Notes – Complete ML Guide with Formulas` | Confirmed |
| Visible URL | `https://www.hellogaurav.me/ml-guide` | Confirmed |
| Canonical (live DOM) | `https://www.hellogaurav.me/ml-guide.html` | Confirmed |
| `meta robots` | `index,follow,max-image-preview:large` | Confirmed |
| H1 count | 1 | Confirmed |
| H2 count | 18 | Confirmed |
| H3 count | 150 | Confirmed |
| `<img>` elements | 0 | Confirmed |
| Decorative/content SVG without name | 12 without `title`/`aria-label` and not `aria-hidden` | Confirmed |
| Code `<pre>` blocks | 12; sampled blocks had **no adjacent copy button** | Confirmed |
| Study companion | Progress bar, dock (Focus / Marker / Wand), cookie banner on first visit | Confirmed |
| Theme | Default dark (`data-theme` unset) | Confirmed |
| Hero height (desktop viewport used) | ~849 px | Confirmed |
| TOC | `#docsnav` `position: fixed`, width 270 px | Confirmed |
| Consent banner | Present; Accept All / Reject / Customize | Confirmed |
| Ad slots in DOM | 1 (`.ad-slot`), not live-filled (`AD_SERVING_ENABLED` false) | Confirmed |
| Header/footer landmarks | 1 header, 2 footers, 3 navs, 1 main, 2 asides | Confirmed |
| Lighthouse / CrUX / CWV | Not run | Unverified |
| Google Search Console coverage | `GSC_TOKEN` empty — not verified | Unverified |
| Structured-data rich-result test | Not submitted to Google’s tester | Unverified (markup inspected) |

`content-visibility: auto` on `.unit` made `innerText` of off-screen units report length 0 in the live DOM. That is a rendering optimisation, not missing HTML. Source contains the full units.

---

## 3. A. UI/UX and visual design

### What already works

- Distinct two-column docs layout: sticky contents rail + long-form main column.
- Shared GATE DA chrome (skip link, sticky header, theme toggle, footer policy links).
- Strong cover typography, numbered units, kicker labels, insight/analogy/mistake/Hinglish callouts.
- Print/PDF split into four parts (acknowledges Chrome’s large-print failure mode).
- Mobile TOC toggle (`#tocBtn`) and overlay veil.
- Light/dark tokens exist; `app-shell.js` honors `gateda.v1.theme` and `prefers-color-scheme`.
- `prefers-reduced-motion` rules exist in the guide stylesheet and `app.css`.

### Confirmed issues

1. **Oversized hero.** Cover block measured ~849 px tall on the inspected desktop viewport. Primary teaching content (“How to Use This Guide”) is below a full-viewport marketing panel, badges, stat pills, and three CTAs.
2. **Guide absent from global nav.** Learners using Dashboard/Learn/Practice never see “ML Guide” in the primary header.
3. **Duplicate page chrome.** In-page PDF breadcrumb (“Back to Study Hub”), in-page crumbs, a mini footer, then the injected `app-footer`. Two breadcrumb navs disagree (Home → ML guide vs Home → Topics → ML guide).
4. **Brand split.** Header: “GATE DA 2027”. Title/schema: “GATE ML”. Domain: hellogaurav.me. Author meta: “GATE ML”. About page: Gaurav Tiwari. The page does not present a single public identity.
5. **Cookie banner covers the first screen** on a new visit (confirmed on mobile screenshot), sitting on top of the H1 and CTAs.
6. **Font systems compete.** Guide loads Manrope/DM Mono; `app.css` documents a system stack and “no blocking external fonts.”
7. **Print CSS vs screen CSS duplication.** Large print-oriented rules sit outside `@media screen` (including `p { text-align: justify }`, hardcoded heading colors `#101827`). Screen overrides exist, but the dual-theme file is fragile.
8. **Stat pills are marketing, not learning outcomes.** “10 / 4 / 100+ / EN+HI” do not state what the reader will be able to do.
9. **Code presentation.** Twelve listings, token-colored spans, no language label on `<pre>`, no copy control on the listing itself. Companion “Copy LaTeX” is for the formula drawer, not the sklearn listings.
10. **Mobile density.** TOC label “Table of Contents (Units 1–10)” wraps; companion dock occupies bottom-right; cookie banner + print bar + mobile TOC stack vertically before any unit text.

### Likely issues

- **CLS from late-injected header/footer/consent/companion** (`defer` scripts). Unmeasured.
- **`content-visibility: auto` with `contain-intrinsic-size: 1px 1100px`** can cause scrollbar jump and skip off-screen content in the accessibility tree until near the viewport.
- Light theme contrast of muted orange-on-cream and code red (`#b91c1c` in print/base rules) was not fully measured with a contrast checker.

### Enhancements

- Compact editorial hero (title, one-sentence audience, 4–6 outcome bullets, start CTA).
- Sticky TOC with clearer active state (scrollspy already exists).
- Reading width already capped at `76ch` for paragraphs — keep it; avoid full-bleed cards.
- Reduce glass/blur on header (`backdrop-filter`) if it fights readability or performance.

---

## 4. B. Educational value and content

The guide is a **single long-form GATE-oriented ML notes page**, not a course platform. Quality of the sampled units is high: plain-language openings, formulas with “where” clauses, Hinglish for hard ideas, common-mistake boxes, hand-worked numericals, sklearn snippets, and end-of-unit Q&A with answers visible (not hidden quizzes).

### Curriculum map vs requested areas

| Area | Coverage | Notes |
| --- | --- | --- |
| 1. Prerequisites / Python | **Thin / incidental** | Unit 1 says calculus/LA/stats are not required. Python appears only inside listings. No dedicated Python primer. `learn/programming` exists as a separate route and is not linked from the cover. |
| 2. NumPy / pandas / data prep | **Partial** | Unit 2 is a strong workflow/cleaning/encoding/scaling/leakage unit. pandas appears in listings; NumPy is not taught as a skill. |
| 3. Mathematics for ML | **Appendix, not a path** | Appendix A: notation, four linear-algebra ideas, derivatives, probability/stats. Useful refresher, not a full math course. |
| 4. Probability and statistics | **Appendix + in-unit** | Naive Bayes, evaluation, bias–variance use probability language. Dedicated probability lives on `/topics/probability` (linked only at the end). |
| 5. Supervised learning | **Strong** | Units 3–5: regression, classification, evaluation, ensembles. |
| 6. Unsupervised learning | **Strong** | Unit 6: k-means (hand iterations), hierarchical, DBSCAN, PCA, t-SNE/UMAP. |
| 7. Feature engineering | **Inside Unit 2** | Encoding, scaling, creating features. Not a standalone unit — acceptable. |
| 8. Evaluation and validation | **Strong** | Units 5 and 8 (metrics, CV, learning curves, nested CV). |
| 9. Neural nets / deep learning | **Strong conceptual** | Unit 7 from neuron through CNN/RNN; NumPy-from-scratch listing. |
| 10. Transformers / LLMs | **Shallow relative to claim** | §7.15 explains attention, multi-head analogy, O(n²), positional encodings. No tokenizer, encoder vs decoder, pretraining vs instruction-tuning, or LLM-specific practice. TOC promises “transformers”. |
| 11. Practical projects / deployment | **Narrative, not briefs** | 90-day plan tells the reader to build things. No project spec, dataset, rubric, or expected artifact beyond Unit 10’s FastAPI/drift/model-card mention. |
| 12. MLOps and monitoring | **Good survey** | Unit 10: packaging, serving, drift, monitoring, fairness, privacy. |
| 13. Interview preparation | **Present** | Appendix D: 60 Q&As grouped by topic. |

Do **not** add Python-from-zero, a full LLM course, or extra units solely to lengthen the page. Prefer links to existing `learn/` and `topics/` pages, plus modest deepening of transformers and a short “further reading” list.

### Per-topic pedagogical checklist (guide-wide pattern)

| Element | Status |
| --- | --- |
| Learning objectives | Cover badges/abstracts exist; **measurable objectives are missing** |
| Prerequisites | Informal (“basic arithmetic”); **conflicts with GATE DA math reality** |
| Intuitive explanations | Strong (callout system) |
| Mathematical explanations | Strong where used; HTML/CSS formulas, not LaTeX |
| Runnable Python | Present in 12 listings; **not every unit**; **expected output often missing** (Listing 1.1 does give “about 0.97”) |
| Practical use cases | Present |
| Common mistakes | Present (red boxes) |
| Exercises | End-of-unit Q&A; answers shown immediately — good for notes, weak as self-test |
| Further reading / citations | **Absent in `ml-guide.html`** (no Bishop/Hastie/etc. on this page) |

### Accuracy / claim flags (evidence-based only)

- **Unsupported textbook-verification claim is on `/about`, not in the guide.** About states every topic is verified against Bishop, ESL, CLRS, and Ross. The ML Guide contains **no bibliography**. Do not treat that About sentence as demonstrated for this page.
- **“Copy LaTeX”** in the study companion labels escaped plain-text formulas as LaTeX. Misleading.
- **Audience tension:** “You do not need calculus” vs GATE DA 2027 branding vs Appendix A. The page should say clearly whether it is a GATE notes pack, a general ML primer, or both, and what GATE still requires.
- **Hinglish** is a genuine differentiator for the intended audience; keep it, and mark language switches for accessibility (`lang` on those boxes is currently absent).

Outdated-library claims (sklearn APIs) were **not** executed in a Python runtime during this audit.

---

## 5. C. Technical SEO

### Confirmed

| Issue | Evidence |
| --- | --- |
| **Canonical points at a URL that 308s back to the live URL** | Live page `/ml-guide` (200). Canonical + OG URL + JSON-LD `mainEntityOfPage` = `.../ml-guide.html`. That URL **308 Permanent Redirect** → `/ml-guide`. `seo.js` `canonicalFor()` maps `/ml-guide` → `/ml-guide.html`, reinforcing the loop. |
| **Sitemap loc is the redirecting URL** | `sitemap.xml` `<loc>https://www.hellogaurav.me/ml-guide.html</loc>` |
| **`/guide` rewrite 404s in production** | `vercel.json` rewrite exists; live `/guide` = 404 |
| Title / description | Unique, relevant, not empty |
| Indexable robots | `index,follow` |
| Single H1 | Yes |
| Heading outline | Logical unit/H3 structure; extra H2 “Continue learning” after closing unit |
| Internal links | End section links to practice, mock-test, topics. Primary nav does not link here |
| Images alt | No content `<img>`; OG image is SVG |
| Open Graph | Present but `og:url` uses `.html`; `og:image` is **SVG** (`assets/og-cover.svg`, 848 bytes). Many social crawlers expect PNG/JPG ≥ 1200×630 |
| Article JSON-LD | `Article` + `BreadcrumbList`. Author is Organization “GATE ML”, not Person. `dateModified` 2026-10-06. **No `datePublished`**. `isPartOf` points at homepage `#website` (defined on `index.html`) |
| Breadcrumb schema vs UI | Schema: Home → ML guide (`…/ml-guide.html`). Visible crumbs also include a Topics variant at the bottom |
| Client rendering | Body content is in HTML (crawlable). Header/footer/companion depend on JS |
| Thin content | Not thin. HTML ~550 KB of notes |
| Duplicate URL forms | `/ml-guide` vs `/ml-guide.html` vs intended `/guide` |

### Likely

- Google may ignore or recanonicalize the `.html` canonical because it redirects. This is a **self-referential canonical anti-pattern**, not a `noindex` bug.
- `html lang="en"` vs schema `inLanguage: en-IN`.
- Querystring noindex in `seo.js` is reasonable for practice filters; not an issue on this URL.

### Enhancements

- Canonical, OG, JSON-LD, and sitemap should all use `https://www.hellogaurav.me/ml-guide`.
- Optional `TechArticle` only if you keep Article-level facts accurate (author, dates). Do **not** add ratings, review counts, or fake `datePublished`.
- Person markup for Gaurav Tiwari belongs on `/about` if used at all; reuse via `@id` rather than inventing credentials.
- Add the guide to internal nav and homepage as a first-class Learn target.
- PNG Open Graph image.

Do **not** promise rankings or indexing.

---

## 6. D. Google AdSense readiness

**Technical readiness (site + this page) is incomplete. Approval is Google’s independent decision and is not implied by any finding below.**

### Already in place

- Original long-form educational notes (not a doorway page).
- `ads.txt` with `pub-7955473428553830`.
- Publisher ID in `site-config.js` (identifier, not a secret).
- Ad serving **explicitly off** until CMP work is done.
- Privacy, cookie, terms, disclaimer, contact, about pages exist and are linked from the injected footer.
- Ownership: About names Gaurav Tiwari; email `hello@hellogaurav.me`; GitHub linked on About/Contact.
- House ad slot at end of guide is labelled `aria-label="Advertisement"` and hidden when not live (`ads.js` sets `display: none` without slot IDs).

### Gaps that affect an application (page + site)

| Topic | Assessment |
| --- | --- |
| Content usefulness | Strong notes; missing citations and some curriculum depth (transformers, projects) |
| Navigation UX | Guide hard to discover from primary nav |
| Contact / ownership | Present |
| Privacy / cookies | Present; last updated 25 Oct 2026 on privacy/cookie pages |
| CMP | Local dialog is **not** a Google-certified CMP. Repo comments already say this. EEA/UK/CH personalized ads must not be enabled on this dialog alone |
| Misleading controls | Banner **Accept All** while advertising is disabled. Cookie copy is honest; the primary button is still easy to misread |
| Copyright | No licence statement on the guide; diagrams are inline SVG (good vs stock photos); no third-party image hotlinking observed on this page |
| Broken / unfinished | Live `/guide` 404; some sitemap URLs may lag clean URLs |
| Ad placement risk | When enabled, in-article slot sits in “Continue learning”. Avoid placing ads inside unit Q&A or mimicking CTAs. Do not insert ads that look like “Practice Mode” buttons |
| Inflating content | **Do not** generate hundreds of thin AI articles. Existing `topics/` and `learn/` pages should be improved in place |
| Site-level claim consistency | Homepage/product/FAQ still market “150 exam-pattern questions”; `data/practice-da.json` contains 76 items; `gate-ml-practice.html` appears to contain a separate 150-item bank. Two inventories need a truthful public number |

### Cannot be evaluated from `/ml-guide` alone

- Full-site broken-link sweep
- AdSense policy review of every `learn/` and `topics/` page
- Traffic thresholds, identity verification, and publisher account standing

---

## 7. E. Performance and Core Web Vitals

**No Lighthouse, WebPageTest, or CrUX data was collected. LCP/INP/CLS numbers are unmeasured.**

### Confirmed implementation risks

| Risk | Evidence |
| --- | --- |
| Large HTML document | Live `Content-Length: 557282` for `/ml-guide` |
| Extra JS on this route | `study-companion.js` 135,202 bytes + `study-companion.css` 43,943 + shell/seo/ads/consent |
| Render-blocking fonts | `fonts.googleapis.com` stylesheet in `<head>` (not `media` swap / self-host) |
| `unsafe-inline` scripts | Required by current architecture; parser still pays for several inline blocks (print helper, scrollspy) |
| Header backdrop blur | `backdrop-filter` on `.app-header` |
| `content-visibility: auto` | Can help or hurt LCP/CLS depending on intrinsic size accuracy (`1px 1100px` vs real unit heights of tens of thousands of HTML characters) |
| Third-party ads/GA | Currently **not loaded** (`AD_SERVING_ENABLED` false, `GA_ID` empty) — good for current CWV |
| Caching | HTML `max-age=3600, must-revalidate`; `/assets/*` `max-age=31536000, immutable` — hashed filenames are **not** used, so “immutable” on `app-shell.js` is **Likely** stale-asset risk after deploys |
| CORS `Access-Control-Allow-Origin: *` on HTML | Observed on live HTML responses; not in the checked `vercel.json` snippet — origin may be a Vercel project setting. Unverified impact |

### Potential CWV (unmeasured)

- **LCP:** H1 text after 557 KB HTML + Google Fonts. Hero is large but text-based (no hero image).
- **INP:** Companion drawing canvas, wand, scrollspy, IntersectionObserver, many listeners; plus single-letter shortcuts calling `preventDefault`.
- **CLS:** Injected header (60 px), consent banner, companion dock, `content-visibility` intrinsic-size mismatch.

---

## 8. F. Accessibility (WCAG 2.2 AA principles)

### Confirmed positives

- `lang="en"` on `<html>`
- Skip link to `#main`
- One `<main>`
- TOC `aside` has `aria-label="Guide contents"`
- Theme toggle has a meaningful `aria-label` after paint
- TOC button `aria-expanded` / `aria-controls`
- Print toggle `aria-expanded`
- Reduced-motion media query on the guide
- Focus-visible styles in `app.css`
- Companion notes path uses `escapeHtml` for user text in several list renderers

### Confirmed issues

1. **WCAG 2.1.4 Character Key Shortcuts.** Keys `m`, `h`, `z`, `l`, `r`, `b`, `?` fire globally (input/textarea skipped for some handlers; `contentEditable` only skipped on the zen handler). No documented user-facing way to disable them besides not using the companion.
2. **Hinglish boxes lack `lang`.** Screen readers will pronounce Hindi–English mix as English.
3. **Q&A is not interactive.** Answers are always visible — fine for notes; if quizzes are added later they need buttons, `aria-expanded`, and focus management.
4. **Duplicate landmarks.** Two `<footer>`s; two breadcrumb `<nav>`s; cookie banner `role="dialog"` without `aria-modal` (modal variant sets `aria-modal`).
5. **Unnamed SVGs** (12) may be announced as graphics.
6. **`<pre>` without accessible name or copy control.**
7. **Emoji in controls** (print, companion, consent) as the only extra cue — decorative for some users, noisy for others.
8. **Footer injected headings are `<h3>`** (“Study / Learn / About”), competing with the document outline.

### Likely

- Off-screen units with `content-visibility: auto` omitted from the accessibility tree until nearby.
- Keyboard trap risk in marker canvas / zen mode — not fully exercised.
- Contrast of `--muted` `#95918a` on `#0a0a0a` is probably OK; light-theme muted on cream needs a checker.
- Zoom/reflow at 200% / 320 px: mobile CSS exists (`max-width: 820px`); 320 px not screenshotted.

### Unverified

- Full keyboard-only pass, screen-reader pass, automated axe scan.

---

## 9. G. Security and maintainability

### Confirmed

| Topic | Finding |
| --- | --- |
| Secrets in source | No secrets found in inspected JS/HTML. `site-config.js` holds public IDs and empty tokens |
| XSS | Companion uses `innerHTML` extensively for chrome; user notes/highlights are escaped in the inspected list builders. **Likely residual risk** anywhere `innerHTML` concatenates unsanitised highlight HTML (`data-orig-html` restore around line 5455) |
| `innerHTML` for shell | `app-shell.js` injects trusted static strings — acceptable |
| External links | No `target=_blank` on the guide page itself |
| CSP | Present; `script-src` includes `'unsafe-inline'` and Google ad/analytics hosts **before** ads are enabled |
| Third-party | Google Fonts always; AdSense/GA gated |
| Fragile content | Entire curriculum in one 9,000-line HTML file with duplicated CSS. Hard to review, test, and update |
| Tests | `tests/test_study_companion.js` asserts presence of companion hooks and syntax of the JS file — **not** content/SEO/a11y of the guide |
| Disclaimer HTML | `disclaimer/index.html` appears to close `</main>` twice — site-level maintainability issue |
| README vs live | README still says “No analytics, no ads”; advertising infrastructure exists but is disabled |

No destructive security testing was performed.

---

## 10. Existing testing and commands (do not guess)

From `README.md`:

```bash
python -m http.server 8080
python _validate_bank.py
node tests/test_bank.js
node tests/test_mock_e2e.js
node tests/test_mock_runtime.js
node tests/test_study_companion.js
```

There is **no** `npm test`, `npm run build`, ESLint, or TypeScript check in this repository.

---

## 11. Summary table of findings

See `ML_GUIDE_IMPROVEMENT_PLAN.md` for IDs, severity, effort, and acceptance criteria.

Highest-confidence P0/P1 themes:

1. Canonical / sitemap / redirect mismatch for `/ml-guide`
2. Guide missing from global navigation
3. Canonical/OG/social image and author identity cleanup
4. Compact the hero and first-read path
5. Character-key shortcuts and consent-banner first-load UX
6. Citations + honest curriculum framing (not extra fluff units)
7. Performance: HTML weight, font loading, immutable cache on unhashed assets
