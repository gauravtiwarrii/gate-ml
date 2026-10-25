# ML Guide — Prioritized Improvement Plan

**Phase 1 output.** Do not implement until explicitly approved.  
**Stack constraint:** vanilla HTML/CSS/JS, Vercel static hosting, existing `app-shell` / tokens.  
**Priority:** P0 blockers → P1 reading/SEO/nav → P2 learning aids → P3 polish.

Effort: **Small** < half day, **Medium** 1–2 days, **Large** multi-day / multi-file curriculum work.

---

## Roadmap overview

| Phase | Goal | Findings |
| --- | --- | --- |
| **A — Indexability & honesty** | Canonical/sitemap/nav/identity | F-SEO-01, F-SEO-02, F-NAV-01, F-SEO-03, F-ADS-02 |
| **B — First-read UX** | Compact hero, chrome cleanup, consent | F-UX-01, F-UX-02, F-UX-03, F-A11Y-02 |
| **C — Accessibility & companion** | Shortcuts, landmarks, motion | F-A11Y-01, F-A11Y-03, F-A11Y-04, F-PERF-03 |
| **D — Teaching gaps** | Framing, citations, transformers, outputs | F-EDU-01 … F-EDU-05 |
| **E — Performance** | Fonts, HTML/CSS split, cache | F-PERF-01, F-PERF-02, F-PERF-04 |
| **F — Optional learning features** | Copy, search, quizzes | F-FEAT-* |

---

## Finding register

### F-SEO-01 — Canonical / redirect conflict

| Field | Value |
| --- | --- |
| Category | Technical SEO |
| Current state | Live URL `https://www.hellogaurav.me/ml-guide` returns 200. `ml-guide.html` **308s to** `/ml-guide`. Canonical, `og:url`, JSON-LD, and sitemap still use `…/ml-guide.html`. `assets/seo.js` maps `/ml-guide` → `/ml-guide.html`. |
| Severity | **High** (indexability hygiene; not `noindex`) |
| Class | Confirmed |
| Recommended change | Set static canonical/OG/JSON-LD/sitemap to `/ml-guide`. Change `canonicalFor()` so clean routes stay clean (`/ml-guide` not rewritten to `.html`). Keep Vercel `cleanUrls`. |
| User benefit | Consistent sharing URL; crawlers not given a canonical that immediately redirects |
| SEO / monetization | Directly relevant to indexing; AdSense wants crawlable, consistent URLs |
| Files | `ml-guide.html`, `assets/seo.js`, `sitemap.xml` |
| Dependencies | Decision that `/ml-guide` is the permanent public URL |
| Effort | Small |
| Validation | curl 200/308 as in test plan; view-source canonical; Rich Results Test |
| Acceptance | No production HTML advertises `/ml-guide.html` as canonical |

### F-SEO-02 — `/guide` 404

| Field | Value |
| --- | --- |
| Category | Technical SEO / routing |
| Current state | `vercel.json` rewrites `/guide` → `/ml-guide.html`. Live `GET /guide` = **404**. |
| Severity | Medium |
| Class | Confirmed (live) |
| Recommended change | Either 301 `/guide` → `/ml-guide` and verify the rewrite in the deployed `vercel.json`, or remove `/guide` from any remaining links. Do not leave a documented alias that 404s. |
| User benefit | Old/short links work |
| SEO | Avoid 404s |
| Files | `vercel.json`, inbound links if any |
| Dependencies | F-SEO-01 |
| Effort | Small |
| Validation | `curl -sI https://www.hellogaurav.me/guide` |
| Acceptance | 301/308 to `/ml-guide` or zero references to `/guide` |

### F-SEO-03 — Social image and metadata identity

| Field | Value |
| --- | --- |
| Category | Technical SEO |
| Current state | `og:image` / Twitter image = SVG 848 bytes. `author` meta = “GATE ML”. Article author = Organization “GATE ML”. `dateModified` 2026-10-06. No `datePublished`. `html lang=en` vs `inLanguage en-IN`. |
| Severity | Medium |
| Class | Confirmed (SVG/author); social debugger **unverified** |
| Recommended change | Add a PNG OG image (≥1200×630) exported from brand artwork. Set author to Gaurav Tiwari where that is accurate. Add `datePublished` only if a real first-publish date is known. Align `lang` with inLanguage. Do not add ratings. |
| User benefit | Accurate previews when sharing |
| SEO / monetization | Social CTR; clearer E-E-A-T signals |
| Files | `ml-guide.html`, `assets/og-cover.svg` (+ new PNG), possibly `index.html` later |
| Dependencies | Brand decision in design spec |
| Effort | Medium |
| Validation | Facebook/LinkedIn sharing debugger (manual) |
| Acceptance | PNG OG URL 200 `image/png`; JSON-LD still valid without fake fields |

### F-NAV-01 — ML Guide not in primary navigation

| Field | Value |
| --- | --- |
| Category | UI/UX / SEO internal linking |
| Current state | `app-shell.js` NAV omits the guide. Footer Learn omits it. Cover is a full-page resource but Discoverability depends on homepage modules. |
| Severity | **High** |
| Class | Confirmed |
| Recommended change | Add “ML Guide” to header NAV and footer Learn. Mark `aria-current` on `/ml-guide`. |
| User benefit | Learners can find the notes from any app page |
| SEO | Internal PageRank-like flow; reduces orphan risk |
| Files | `assets/app-shell.js` |
| Dependencies | None |
| Effort | Small |
| Validation | Open `/dashboard` and `/ml-guide`; keyboard to nav link |
| Acceptance | Guide is reachable in header on desktop and mobile menu |

### F-UX-01 — Oversized hero

| Field | Value |
| --- | --- |
| Category | UI/UX |
| Current state | Cover ~849 px tall; stat pills; six badges; three CTAs before unit content. |
| Severity | **High** |
| Class | Confirmed |
| Recommended change | Compact hero per `ML_GUIDE_DESIGN_SPEC.md`. Move print bar out of the first screen’s critical path. |
| User benefit | Faster path to teaching |
| SEO | More of the real H2 outline above the fold for users; no ranking promise |
| Files | `ml-guide.html` (markup + cover CSS) |
| Dependencies | Design spec approval |
| Effort | Medium |
| Validation | Desktop screenshot: How-to or outcomes visible without a full scroll on 900px-high window |
| Acceptance | Hero < ~320 px content height on desktop; one primary CTA |

### F-UX-02 — Duplicate breadcrumbs and footers

| Field | Value |
| --- | --- |
| Category | UI/UX / a11y landmarks |
| Current state | PDF-bar crumbs, cover crumbs, bottom crumbs (Home/Topics/ML guide), in-page footer, `app-footer`. |
| Severity | Medium |
| Class | Confirmed |
| Recommended change | One breadcrumb matching schema. Remove the in-page mini-footer; keep `app-footer` for policy links. Keep “Continue learning” as a section, not a second footer. |
| User benefit | Less repeated chrome |
| SEO | BreadcrumbList matches UI |
| Files | `ml-guide.html` |
| Dependencies | F-SEO-01 |
| Effort | Small |
| Validation | Snapshot: one `nav[aria-label=Breadcrumb]`, one `footer.app-footer` |
| Acceptance | Landmark counts documented in audit drop |

### F-UX-03 — First-visit consent overlay

| Field | Value |
| --- | --- |
| Category | UX / AdSense / a11y |
| Current state | Banner after 600 ms, `role=dialog`, covers hero on mobile. Primary action “Accept All” while `AD_SERVING_ENABLED` is false. |
| Severity | Medium |
| Class | Confirmed |
| Recommended change | While ads are off: default to a smaller bar (“Essential storage only”) or delay until scroll; rename primary action to “OK” / “Continue”. Do not enable AdSense on this dialog. Keep Customize → policy links. |
| User benefit | Can read the H1 immediately |
| Monetization | Honest consent; still **not** a certified CMP |
| Files | `assets/consent.js` |
| Dependencies | Legal copy on cookie-policy |
| Effort | Small |
| Validation | Fresh profile mobile screenshot |
| Acceptance | H1 remains readable; no AdSense request |

### F-A11Y-01 — Character key shortcuts

| Field | Value |
| --- | --- |
| Category | Accessibility (WCAG 2.1.4) |
| Current state | `m` `h` `z` `l` `r` `b` `?` in `study-companion.js`; some handlers ignore only INPUT/TEXTAREA. |
| Severity | **High** |
| Class | Confirmed |
| Recommended change | Require a modifier **or** provide a persistent “Disable shortcuts” setting (companion settings already have a storage key). Include `contentEditable` and `role=textbox`. Document shortcuts in the existing `?` modal only. |
| User benefit | Assistive-tech and keyboard users not hijacked |
| SEO | Indirect (quality) |
| Files | `assets/study-companion.js`, tests |
| Dependencies | None |
| Effort | Medium |
| Validation | Keyboard test plan §3.8 |
| Acceptance | Single letters do nothing unless shortcuts enabled |

### F-A11Y-02 — Hinglish / SVG / pre names

| Field | Value |
| --- | --- |
| Category | Accessibility |
| Current state | Hinglish boxes have no `lang`. 12 SVGs unnamed. `<pre>` unlabelled. Footer uses `h3`. |
| Severity | Medium |
| Class | Confirmed |
| Recommended change | `lang` on Hinglish; `<title>` on instructional SVG; figure/captions for code; footer headings to `p`/`h2` with a visually hidden “Site” if needed — but **don’t** create a second H1. |
| User benefit | Screen-reader accuracy |
| Files | `ml-guide.html`, `app-shell.js` |
| Dependencies | None |
| Effort | Medium |
| Validation | Accessibility checklist |
| Acceptance | Sample SR pass on one Hinglish box and one diagram |

### F-A11Y-03 — `content-visibility` side effects

| Field | Value |
| --- | --- |
| Category | A11y / performance |
| Current state | `.unit { content-visibility: auto; contain-intrinsic-size: 1px 1100px; }` Live `innerText` of off-screen units was 0. |
| Severity | Medium |
| Class | Likely (a11y tree / CLS) |
| Recommended change | Raise intrinsic size or limit `content-visibility` to below-fold units after first two; verify find-in-page and SR. |
| User benefit | Find-in-page and fewer layout jumps |
| Files | `ml-guide.html` CSS |
| Dependencies | F-PERF measurement |
| Effort | Small |
| Validation | Ctrl+F for a Unit 10 phrase; SR jump list |
| Acceptance | Phrase is findable; no large scrollbar jump on load |

### F-A11Y-04 — Focus / reduced motion on consent

| Field | Value |
| --- | --- |
| Category | Accessibility |
| Current state | Banner animation `gateSlideUp`; dialog without `aria-modal` on banner (modal has it). |
| Severity | Low–Medium |
| Class | Confirmed |
| Recommended change | `prefers-reduced-motion: reduce { animation: none }`; `aria-modal="true"` only if focus is trapped; otherwise use `role="region"` for a non-modal bar. |
| Files | `assets/consent.js` |
| Effort | Small |
| Validation | Motion setting + Tab cycle |
| Acceptance | No animation under reduced motion; Tab not lost behind banner |

### F-EDU-01 — Audience and prerequisite framing

| Field | Value |
| --- | --- |
| Category | Educational content |
| Current state | “You do not need calculus…” vs GATE DA 2027 branding vs Appendix A. |
| Severity | Medium |
| Class | Confirmed |
| Recommended change | Two-sentence framing: general ML path vs GATE path; link Appendix A and `learn/calculus` / `topics/linear-algebra` for GATE candidates. Do not add a full math course on this page. |
| User benefit | Learners know if they are in the right place |
| Files | `ml-guide.html` how-to + hero |
| Effort | Small |
| Validation | Editorial review |
| Acceptance | GATE math expectation is explicit; beginner claim is scoped |

### F-EDU-02 — No citations / further reading on the guide

| Field | Value |
| --- | --- |
| Category | Educational / E-E-A-T / AdSense quality |
| Current state | Zero bibliography in `ml-guide.html`. About page claims verification against Bishop, ESL, CLRS, Ross **without** those citations appearing here. |
| Severity | Medium |
| Class | Confirmed |
| Recommended change | Add a short Further reading list **only for works actually used**. Soften or remove the About sentence if it cannot be evidenced. Do not fabricate a reading list to look prestigious. |
| User benefit | Trust and next steps |
| Monetization | Original + well-sourced educational content |
| Files | `ml-guide.html`, possibly `about/index.html` |
| Effort | Medium |
| Validation | Each listed work is cited in at least one unit or clearly “general reference” |
| Acceptance | About page does not overclaim; guide has honest references |

### F-EDU-03 — Transformers / LLM depth vs TOC promise

| Field | Value |
| --- | --- |
| Category | Educational |
| Current state | §7.15 is a good attention primer; no tokenizer, encoder/decoder, pretraining vs prompting. TOC says “transformers”. |
| Severity | Medium |
| Class | Confirmed (coverage gap, not an error in the attention math as sampled) |
| Recommended change | Add ~1–2 screens: diagram, positional encoding recap, why LLMs are pretrained transformers. Link out rather than a new unit. Optional later article. |
| User benefit | TOC matches content |
| Files | `ml-guide.html` §7.15 |
| Effort | Medium |
| Validation | Editorial; one diagram named for a11y |
| Acceptance | Reader can explain attention vs “what is an LLM” at a basic level |

### F-EDU-04 — Code listings without copy or outputs

| Field | Value |
| --- | --- |
| Category | Educational / UX |
| Current state | 12 `<pre>` blocks; no listing copy buttons; few expected outputs. |
| Severity | Medium |
| Class | Confirmed |
| Recommended change | Lightweight copy button (see features). Add output notes where the snippet prints. Do not add a live Python kernel. |
| User benefit | Learners can run and compare |
| Files | `ml-guide.html`, small JS in guide or companion |
| Effort | Medium |
| Validation | Test plan §3.10 |
| Acceptance | Every listing has caption + copy; printed listings have a stated result or “illustrative” |

### F-EDU-05 — Python / NumPy / pandas not taught here

| Field | Value |
| --- | --- |
| Category | Educational IA |
| Current state | Assumed via sklearn listings. `learn/programming` exists. |
| Severity | Low (enhancement) |
| Class | Confirmed gap |
| Recommended change | Link from How-to and Unit 2 to `learn/programming`. Do **not** paste a Python textbook into `ml-guide.html`. |
| Files | `ml-guide.html` |
| Effort | Small |
| Acceptance | Two contextual internal links |

### F-EDU-06 — Projects only in the 90-day essay

| Field | Value |
| --- | --- |
| Category | Educational |
| Current state | Closing unit tells readers to build; no briefs. |
| Severity | Low |
| Class | Enhancement |
| Recommended change | Three short project cards (tabular baseline, imbalanced classifier, wrap-a-model) pointing at Unit 2/5/10. No fake datasets hosted unless they exist. |
| Files | `ml-guide.html` `#plan` |
| Effort | Medium |
| Acceptance | Each card lists goal, unit, done-when |

### F-PERF-01 — 557 KB HTML + blocking fonts

| Field | Value |
| --- | --- |
| Category | Performance |
| Current state | Entire guide + huge `<style>` in one document; Google Fonts CSS in head. |
| Severity | High (unmeasured CWV, confirmed weight) |
| Class | Confirmed size; CWV unverified |
| Recommended change | `font-display: swap` or self-host subset; consider moving screen CSS to `assets/ml-guide.css` (cacheable). Do **not** split units across routes in phase A unless necessary — crawlability of one article is a feature. |
| Files | `ml-guide.html`, new CSS file, maybe `vercel.json` cache |
| Effort | Medium |
| Validation | Lighthouse after change |
| Acceptance | Fonts not render-blocking; CSS cacheable; HTML smaller or CSS split |

### F-PERF-02 — Immutable cache on unhashed `/assets/*`

| Field | Value |
| --- | --- |
| Category | Performance / maintainability |
| Current state | `vercel.json` sets `max-age=31536000, immutable` on `/assets/(.*)` including `app-shell.js`. |
| Severity | Medium |
| Class | Confirmed header policy; stale-client **likely** |
| Recommended change | Shorten cache for unhashed JS/CSS **or** add query/hash on deploy. Do not leave `immutable` on files whose names never change. |
| Files | `vercel.json` |
| Effort | Small |
| Validation | Response headers after deploy |
| Acceptance | HTML or asset policy cannot pin old `app-shell.js` for a year |

### F-PERF-03 — Study companion cost on a reading page

| Field | Value |
| --- | --- |
| Category | Performance |
| Current state | 135 KB JS + 44 KB CSS always on the guide. Drawing canvas, flashcards, pomodoro, bionic reading. |
| Severity | Medium |
| Class | Confirmed weight; INP unverified |
| Recommended change | Lazy-init companion on first dock click **or** split marker/wand behind `requestIdleCallback`. Keep progress bar if cheap. |
| Files | `study-companion.js`, `ml-guide.html` |
| Effort | Medium |
| Validation | Network panel: JS parse after interaction |
| Acceptance | First contentful read does not require marker engine |

### F-PERF-04 — Header blur / many observers

| Field | Value |
| --- | --- |
| Category | Performance |
| Current state | `backdrop-filter` on header; IntersectionObserver scrollspy + ads IO + companion. |
| Severity | Low |
| Class | Likely |
| Recommended change | Solid header background; keep one scrollspy. |
| Files | `app.css`, guide JS |
| Effort | Small |
| Acceptance | Visual parity without blur on low-end |

### F-ADS-01 — AdSense serving still correctly off

| Field | Value |
| --- | --- |
| Category | AdSense |
| Current state | `AD_SERVING_ENABLED: false`; privacy policy matches; ads.txt present. |
| Severity | Info / keep |
| Class | Confirmed |
| Recommended change | Do **not** flip the flag in the UI phase. Complete Google-certified CMP in the AdSense account before any live ads, especially for EEA/UK/CH. |
| Effort | n/a (policy) |
| Acceptance | No `adsbygoogle.js` while flag is false |

### F-ADS-02 — Public inventory claims

| Field | Value |
| --- | --- |
| Category | AdSense / trust |
| Current state | Marketing “150 questions” on home/product/FAQ; `practice-da.json` has 76; `gate-ml-practice.html` appears to hold another bank. |
| Severity | Medium (site-level) |
| Class | Confirmed inconsistency across files |
| Recommended change | Publish one accurate count per product surface. Out of scope to rewrite the whole site in the guide-only phase, but **do not repeat 150 on the ML Guide** unless it links to that bank. |
| Files | Prefer not `ml-guide.html`; later `index.html`, `product/`, `faq/`, `about/` |
| Effort | Medium (site) |
| Acceptance | Guide doesn’t inherit unverified stats |

### F-SEC-01 — Companion `innerHTML` restore

| Field | Value |
| --- | --- |
| Category | Security |
| Current state | `data-orig-html` round-trip in wand/bionic paths. Notes lists escape. |
| Severity | Medium |
| Class | Likely |
| Recommended change | Treat highlight wrapping as DOM APIs (`Range`) not HTML string parse; keep `escapeHtml` for all user notes. |
| Files | `study-companion.js` |
| Effort | Medium |
| Validation | Paste `<img onerror>` into a note; must display as text |
| Acceptance | No HTML execution from notes/highlights |

### F-MAINT-01 — Monolithic `ml-guide.html`

| Field | Value |
| --- | --- |
| Category | Maintainability |
| Current state | ~9,100 lines mixing print CSS, screen CSS, content, print JS, scrollspy. |
| Severity | Medium |
| Class | Confirmed |
| Recommended change | After visual freeze, extract CSS/JS only. Splitting units into multiple URLs is a **later** SEO IA project (can help CWV, can dilute this article). |
| Effort | Large if split content; Medium if extract assets |
| Acceptance | Content unchanged; tests still see companion hooks |

---

## Functional enhancements (evaluate, don’t auto-add)

| ID | Feature | Benefit | Complexity | Perf | A11y | Priority |
| --- | --- | --- | --- | --- | --- | --- |
| F-FEAT-01 | Sticky TOC | Already exists | — | — | Improve current | **Essential** (fix, don’t rebuild) |
| F-FEAT-02 | Mobile section nav | Exists (`#tocBtn`) | Small polish | Neutral | Label, focus trap | **Essential** polish |
| F-FEAT-03 | Reading progress | Exists (`#studyProgressBar`) | — | Low | `role=progressbar` values | Keep / label |
| F-FEAT-04 | In-guide search | Jump to headings | Medium | Filter 150 H3s is fine | Combobox pattern | **Optional** P2 |
| F-FEAT-05 | Copy code | High for learners | Small | Tiny | Live region | **Essential** P1 |
| F-FEAT-06 | Syntax highlighting lib | Color exists via spans | Avoid Prism/Highlight.js CDN | Extra JS | — | **Skip** unless spans regress |
| F-FEAT-07 | Collapsible deep dives | `<details>` for long proofs | Small | Helps page length | Native is OK | Optional P2 |
| F-FEAT-08 | Quizzes | Hide answers until activate | Medium | Low | Must not be the red boxes only | Optional P2 |
| F-FEAT-09 | Checkpoints | Companion checklist exists | — | localStorage | Labels exist | Keep |
| F-FEAT-10 | Related topics | End links exist; nav missing | Small | — | Link purpose | P1 with F-NAV-01 |
| F-FEAT-11 | Reading time | Only if counted from words | Small | — | Don’t invent | Optional; compute or omit |
| F-FEAT-12 | Print CSS | Exists; four-part split | — | — | Hide a11y-only chrome | Keep |
| F-FEAT-13 | Light/dark | Exists | Align tokens | — | Contrast audit | P1 alignment |

**Do not add:** auth, databases, payments, extra analytics, chat widgets, or hundreds of generated articles.

---

## Suggested first implementation phase (after approval)

Ship **Phase A + compact hero + nav** only:

1. F-SEO-01, F-SEO-02, F-NAV-01  
2. F-UX-01, F-UX-02  
3. F-UX-03 copy tweak (no CMP theatre)  
4. F-EDU-01 framing sentences  
5. F-FEAT-05 copy buttons if time  

Leave companion lazy-load, transformer essay, OG PNG, and CSS extraction for the next approval.

---

## Explicit non-goals for the first coding phase

- Enabling AdSense  
- Filling `GA_ID` / `GSC_TOKEN`  
- Rewriting units 1–10  
- Introducing a framework  
- Changing Vercel project env in the dashboard (only `vercel.json` in git if required for cache/canonical)  
