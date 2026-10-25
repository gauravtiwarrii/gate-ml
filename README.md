# GATE DA 2027 — Question Bank Expansion & Practice App

GATE Data Science & AI (DA) 2027 practice question bank, fully schema-normalized and
validated, with a static practice app, scoring engine and coverage tooling.

- **Bank:** `data/practice-da.json` — `76 practice questions`, all schema-validated
- **Syllabus:** `data/syllabus-a.json`, `data/syllabus-b.json`, `data/syllabus-meta.json`
- **Validator:** `python _validate_bank.py` → prints `BANK OK`
- **Stack:** plain HTML/CSS/JS, served statically; no build step, no dependencies

## Architecture

```
root/
├── data/
│   ├── practice-da.json          schema-normalized question bank
│   ├── syllabus-a.json           GATE DA syllabus part-A (units/subjects)
│   ├── syllabus-b.json           GATE DA syllabus part-B
│   └── syllabus-meta.json        meta (years, names, marks config)
├── assets/
│   ├── gateda.js                 core app + localStorage progress store
│   ├── gateda-score.js           scoring engine (MCQ/MSQ/NAT official rules)
│   ├── gateda-safe.js            corruption-safe get/set/topicState
│   ├── mock.js                   seeded mock builder (GateDAMock)
│   ├── review.js                 per-question explanation + revision panel
│   ├── syllabus.js               syllabus cross-linking + coverage
│   ├── validators.js             client-side schema validation
│   ├── seo.css                   shared SEO styles
│   └── seo.js                    dynamic <title>/<meta> injection
├── practice-da/                  practice drill UI
├── mock-da/                      timed mock engine
├── syllabus/                     syllabus browse
├── coverage/                     coverage matrix page
├── dashboard/, planner/, tutor/, learn/, pyq/, revision/
└── _validate_bank.py             test harness: schema + schema check
```

## Running locally

```bash
# Option A — double-click index.html (works over file://, no server)
# Option B — any static server
python -m http.server 8080
# then open http://localhost:8080
```

## Question-bank schema (normalized)

Every question has the same shape (all required fields):

```json
{
  "id": "DA-D1",                 "subject": "dbms", "topic": "er",
  "type": "mcq", "marks": 1, "d": 1,
  "q": "Question text",
  "o": ["opt1", "opt2", "opt3", "opt4"],
  "a": 1,
  "s": "Solution / worked answer",
  "why_wrong": "Why the common distractors are wrong",
  "prov": "practice",            // platform-authored, no PYQ claims
  "tol_note": "units/rounding"   // required for nat; optional for mcq/msq
}
```

Rules enforced by `_validate_bank.py`:
- `prov` is literally `"practice"` (no fabricated PYQ/analytics claims)
- `type` ∈ {`mcq`, `msq`, `nat`}; `marks` ∈ {1, 2}; `d` ∈ {1, 2, 3}
- `mcq` needs 4 options, `a` ∈ 0..3; `msq` needs 4 options, `a` non-empty list 0..3;
  `nat` has no options, `a` = [lo, hi], `tol_note` required
- `subject`/`topic` map to the official syllabus-a/b topics

## Coverage

- 55 official syllabus topics covered; 76 practice questions total
- 61 GA marks (≈6.2% of total GA) distributed as 2-mark GA questions plus 1-mark GA
- 61 GA marks — all schemas validated, see `/coverage` for per-topic status

## Test harness

```bash
# Python schema validator
python _validate_bank.py      # schema + question format check → BANK OK

# Full test suite (75 automated regression tests)
node tests/test_bank.js            # 46 tests: question validation, scoring, coverage
node tests/test_mock_e2e.js        # 11 tests: mock engine and scoring accuracy
node tests/test_mock_runtime.js    # 2 tests: runtime initialization and guards
node tests/test_study_companion.js # 16 tests: study companion tools and UI
```

## Deploying to Vercel

This is a static site. On Vercel: Framework Preset `Other`, empty build command, empty
output directory. `vercel.json` maps short routes: `/practice-da` → `practice-da/index.html`,
`/mock-da` → `mock-da/index.html`, `/syllabus` → `syllabus/index.html`,
`/coverage` → `coverage/index.html`.

```bash
git init && git add . && git commit -m "GATE DA 2027 practice bank"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/gate-ml.git
git push -u origin main
# then Import → Other → Deploy on vercel.com
```

## Privacy

- All state (`topic.*`, `attempts`, `mocks`, `plan`, `tasks`) lives in `localStorage`
- No analytics, no ads, no data leaves the browser (except CDN-served static assets)
- No secrets, no keys, no build step

If you'd rather not use GitHub at all, the Vercel new-project page also accepts a folder
dragged straight onto it — but then you lose the automatic redeploy on push.

## Saving the guide as a PDF

Open `ml-guide.html` and use the banner at the top. The guide runs to roughly 150 pages,
which is enough to make Chrome's print engine give up and write a 0 KB file, so the
banner splits it into four parts that print reliably one at a time. In the print dialog,
choose **Save as PDF**, paper **A4**, and turn on **Background graphics** under "More
settings" — without it the coloured boxes and diagrams come out blank.

## Editing the question bank

Questions live in a plain array near the top of `gate-ml-practice.html`, between
`const QUESTIONS = [` and the `/*--QEND--*/` marker. Flashcards sit in `CARDS`, ending at
`/*--CEND--*/`. Append new entries just above the marker.

```js
{ id:151,
  t:"reg",
  type:"nat",
  d:2,
  m:2,
  q:"A line fitted by least squares ...",
  a:[2.45,2.55],
  s:"Working shown here." },
```

- `id` — unique integer
- `t` — topic key (see the list above)
- `type` — `"mcq"`, `"msq"` or `"nat"`
- `d` — difficulty, 1 to 3
- `m` — marks, 1 or 2
- `q` — the question stem; HTML is allowed
- `o` — array of exactly four options (MCQ and MSQ only)
- `a` — the answer: an index for MCQ, an array of indexes for MSQ, `[min, max]` for NAT
- `s` — the worked solution; HTML is allowed

Keep one field per line and use HTML entities rather than raw double quotes inside any
string. Flashcards use `f` (front), `b` (back) and `t` (topic).

## A note on licensing

There is no licence file in this repository, which in a public repo means the default:
everyone can see the code, but nobody has been granted permission to reuse it. If you
want other people to be able to copy or build on it, add a `LICENSE` file — GitHub can
generate one for you from the "Add file" menu.
