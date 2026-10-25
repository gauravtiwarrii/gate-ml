# ML Guide — Design Specification

**Status:** Proposal only. Do not implement until approved.  
**Constraint:** Stay on vanilla HTML/CSS/JS. Do **not** introduce React, a CSS framework, or a new component library. Extend `app.css` tokens, `app-shell.js`, and page-level guide CSS.

---

## 1. Brand and visual principles

Inspected sources of truth:

- `assets/app.css` — dark-first GATE DA system, accent `#e2601f` / light `#c4541a`, paper `#f5f3ee`, ink `#141310`
- `assets/app-shell.js` — “GATE DA 2027” wordmark
- `ml-guide.html` — editorial cover, Manrope, callout boxes, formula blocks

**Direction:** Premium technical textbook in a modern docs shell — not a SaaS landing page.

Do:

- Keep the orange accent as a rare signal (links, active TOC, one CTA).
- Keep generous paragraph measure (`max-width: 76ch` already).
- Keep callout vocabulary (Insight, Analogy, Common Mistake, Hinglish).
- Prefer hairlines over cards-in-cards.
- Prefer typographic hierarchy over gradients, glass, floating stats.

Avoid (matches current risks):

- Full-viewport hero
- Extra glassmorphism on the header (`backdrop-filter` should be optional / reduced)
- Badge clouds and unverifiable counters
- Constant companion animation
- Generic “AI product” marketing layout

### Identity (needs an editorial decision)

Pick one public name and use it in header, title, schema, and footer:

- **Recommended public name:** HelloGaurav / Gaurav Tiwari’s GATE DA notes  
- **Product line:** GATE DA 2027  
- **This page title pattern:** `Machine Learning Guide — GATE DA 2027 | HelloGaurav`

Do not invent student counts, ratings, or “complete curriculum” guarantees.

---

## 2. Proposed page architecture

Adapt existing sections; do not force empty new chapters.

```
[Skip link]
[Site header — compact, ML Guide marked current in Learn]
[Guide layout]
  [Sticky contents rail — desktop]
  [Main column]
    Breadcrumb: Home / Learn / Machine Learning Guide
    Compact hero
      H1
      One-paragraph audience statement (GATE DA + independent ML learners)
      Learning outcomes (4–6 factual bullets from existing units)
      Meta row: level, prereqs, how to use (no fake duration unless counted)
      Primary CTA: Start at Unit 1   Secondary: How to use
    How to use (existing, slightly tightened)
    On-page contents grid (existing TOC cards)
    Units 1–10 (existing)
    Appendices A–D (existing)
    90-day plan (existing)
    Further reading (new, only real citations)
    Related internal links (topics/, learn/, practice)
    Author line pointing to /about (no new credentials)
[Site footer — single]
```

Print/PDF bar remains, collapsed by default, not in the hero.

Study companion remains optional and must not cover the H1 on first paint.

---

## 3. Compact hero (replace the current cover)

**Goal:** H1 and first paragraph visible without scrolling on a 900×700 laptop window.

Content (from existing copy, shortened):

- Eyebrow: GATE Data Science & AI · Machine Learning notes
- H1: keep recognizable wording; prefer sentence case over full small-caps shout
- Lede: the current tagline, one block
- Outcomes (examples, only if they match the page):
  - Frame a supervised problem and split data without leakage
  - Fit and interpret linear and tree models
  - Choose metrics beyond accuracy
  - Explain bias–variance, CV, and regularisation
  - Outline a path from notebook to a monitored service
- **Do not** show “100+” unless you count formulas in a script and display the real number
- Remove or demote EN+HI to a small note: “Hard ideas also explained in Hinglish”

CTAs:

1. `Start reading` → `#u1` or `#howto`
2. `Practice questions` → existing practice URL (clean path)

---

## 4. Information hierarchy and typography

| Role | Spec |
| --- | --- |
| Page H1 | One only. `clamp(28px, 4vw, 40px)`, weight 750–800, letter-spacing ≤ `-0.03em`, color `--text` |
| Unit H2 | Existing unit-head; keep kicker (“Unit 03”) |
| Section H3 | Numbered as now (`3.1 …`) |
| Body | 16–17px, line-height 1.65–1.75, measure 60–76ch |
| Captions / codecap | 13px, `--muted` |
| Code | DM Mono or `app.css` `--font-mono`; do not load two competing sans families long-term |
| Alignment | Left, not justify (screen). Print may justify |

**Fonts:** Either self-host Manrope **or** drop it and use the `app.css` system stack. Do not keep both philosophies.

---

## 5. Color and callouts

Reuse existing box types; restyle lightly for contrast:

| Box | Use | Notes |
| --- | --- | --- |
| Insight | One takeaway | Green/ok token, not neon |
| Analogy | Scaffolding | Keep purple if contrast passes |
| Common mistake | Errors | `--err` |
| Hinglish | Hard ideas | Set `lang="hi"` on the Hindi-dominant paragraphs if they are substantially Hindi; otherwise `lang="en"` with a visible “Hinglish” label |

Check WCAG 2.2 AA for `--muted` on `--bg` in **both** themes before shipping light-theme copy tweaks.

---

## 6. Navigation

### Global

Add **Guide** (or nest under Learn) in `NAV` inside `assets/app-shell.js`:

- Label: `ML Guide`
- Route: `ml-guide` (clean URL)
- `aria-current="page"` when path contains `ml-guide`

Do not remove existing items. If space is tight on tablet, keep Guide visible and move Coverage into overflow.

### In-page TOC

Keep `#docsnav`. Improvements:

- `nav` landmark wrapping the links (currently a labelled `aside`)
- Active link: accent hairline + `aria-current="location"`
- Mobile: bottom sheet or existing overlay; button label **Contents**, not a wrapping sentence
- Do not duplicate a second sticky TOC on the right

### Breadcrumb

One trail only:

`Home > Learn > Machine Learning Guide`

JSON-LD `BreadcrumbList` must match the visible trail and the canonical URL `/ml-guide`.

---

## 7. Code, figures, tables

- Wrap each `<pre>` in a figure: caption (existing `.codecap`), optional “Copy” button, `tabindex="0"` for keyboard scroll
- Language in caption (“Python · scikit-learn”), not a fake terminal window
- Expected output in a following `<pre class="output">` or a short prose line (Listing 1.1 already does this)
- SVG diagrams: add `<title>` and `role="img"` when the diagram teaches; `aria-hidden="true"` when decorative
- Tables: keep overflow-x on small screens (already started at 820px)

---

## 8. Responsive behavior

| Width | Behavior |
| --- | --- |
| ≥ 1100px | 270px rail + main; rail `position: sticky` under header (`top: var(--nav-h)`) rather than `fixed` if it currently overlaps oddly |
| 821–1099px | Narrower rail or collapsible |
| ≤ 820px | Rail overlay; compact hero; companion dock must not hide the TOC button |
| ≤ 360px | Stack meta row; hide print bar behind a single icon; cookie banner must not exceed ~40% of viewport height |

Print: keep four-part split; hide shell, companion, ads, cookie banner (`display: none !important`).

---

## 9. Component specifications (reuse, don’t reinvent)

| Component | Exists | Change |
| --- | --- | --- |
| `app-header` / `app-footer` | `app-shell.js` | Add Guide link; one footer only |
| Theme toggle | `app-shell.js` | Keep; align guide CSS variables with `app.css` tokens |
| Skip link | shell | Keep |
| `#docsnav` | `ml-guide.html` | Landmark + current page |
| Cover | `ml-guide.html` | Shrink |
| Unit / callout / formula / qa | `ml-guide.html` | Visual polish only |
| PDF bar | `ml-guide.html` | Keep collapsed |
| Study companion | `study-companion.js` | Optional; fix shortcuts; do not expand scope |
| Cookie banner | `consent.js` | Don’t cover H1; don’t say “Accept All” if ads are off |
| Ad slot | `ads.js` | Keep at end, never inside a unit |

No new UI kit.

---

## 10. Motion

- Default: none except `scroll-behavior` which already respects `prefers-reduced-motion`
- Companion marker/wand: no autoplay
- Consent: remove slide-up animation when reduced motion is set (banner CSS currently animates)

---

## 11. Content design rules

- One idea per H3.
- Keep answers in notes mode **or** add a later optional `<details>` — do not do both inconsistently.
- New “Further reading” only with works actually used while editing (do not paste a prestige bibliography to match the About page).
- Link out to `learn/programming`, `topics/probability`, `topics/linear-algebra` instead of duplicating primers.
- Transformers: deepen §7.15 slightly (encoder/decoder one diagram, tokenization one paragraph). Do not add an LLM product chapter.

---

## 12. Dark / light

Keep dark as default (exam-study context). Light theme must use the **same** token names as `app.css` so injected header/footer and guide body do not drift (`ml-guide.html` currently redeclares `--night`, `--paper`, etc.).

---

## 13. What not to build

- Auth, accounts, streaks, leaderboards
- Fake completion percentages
- Chat tutor on this page
- New CSS framework
- Auto-playing demos
- Ad-like orange buttons that are not ads and not primary CTAs
