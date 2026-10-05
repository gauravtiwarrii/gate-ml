# Machine Learning for GATE DA

A machine learning study guide written from scratch in plain language, and a practice
app that mimics the GATE computer-based-test interface. Both are single, self-contained
HTML files: no build step, no dependencies, no network calls, no accounts.

Open `index.html` and everything else is one click away.

## What's in here

| File | What it is |
| --- | --- |
| `index.html` | Landing page. Links into each unit of the guide and each topic of the practice app. |
| `ml-guide.html` | The study guide: 10 units, 4 appendices, worked numerical examples, scikit-learn listings, inline SVG diagrams. Has a print banner for saving it as a PDF. |
| `gate-ml-practice.html` | The practice app: 150 questions, 60 flashcards, four modes. |
| `vercel.json` | Adds `/practice` and `/guide` as short URLs. Nothing else. |

The practice app covers the ten units of the guide only — not the whole GATE Data
Science & AI syllabus.

## The practice app

Four modes:

- **Mock test** — 20, 35 or 65 questions against a countdown, with the GATE question
  palette and its five states, mark-for-review, and a report at the end broken down by
  topic with your weakest topics first.
- **Practice** — filter by topic and difficulty, check each answer as you go, read the
  worked solution immediately.
- **Review** — everything you got wrong, plus everything you bookmarked.
- **Flashcards** — 60 cards on a light spaced-repetition queue; cards you rate "again"
  come back a few cards later.

Question types and marking follow the real paper: MCQ (one correct, negative marking of
one third of the question's marks), MSQ (more than one correct, no negative marking),
and NAT (type a number, judged against a tolerance range, no negative marking).

Keyboard: `A`–`D` or `1`–`4` to answer, `Enter` to check or save-and-next, `N` and `P`
or the arrow keys to move, `M` to mark for review, `F` to flag a question for later.
In flashcards, `Space` flips and `1` / `2` rate.

Progress is kept in `localStorage` in your own browser. It is never uploaded anywhere.
If a browser blocks storage the app falls back to memory for the session and says so on
the home screen.

### Deep links

The landing page uses these, and you can bookmark them too:

```
gate-ml-practice.html?t=reg          practice, filtered to Regression
gate-ml-practice.html?m=mock         straight to the mock-test setup
gate-ml-practice.html?t=nn&m=cards   flashcards, Neural networks
```

Topic keys: `found` `prep` `reg` `clf` `evl` `uns` `nn` `tune` `app` `dep` (units 1–10 in
order). Mode keys: `home` `practice` `mock` `review` `cards`.

## Running it locally

Double-click `index.html`. That's it — every link is relative and every asset is inline,
so it works straight off the disk over `file://`, with the wi-fi off.

## Deploying to Vercel

### 1. Put it on GitHub

Create a new repository at [github.com/new](https://github.com/new). Give it a name such
as `gate-ml`, set it to **Public**, and do **not** tick "Add a README" — there is one in
this folder already.

Then either drag the files in through the browser (on the empty repository page, use the
"uploading an existing file" link and drop all of them in at once), or push from a
terminal in this folder:

```bash
git init
git add .
git commit -m "ML study guide and GATE practice app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/gate-ml.git
git push -u origin main
```

### 2. Import it into Vercel

Go to [vercel.com/new](https://vercel.com/new), sign in with GitHub, and import the
repository you just created.

On the configuration screen:

- **Framework Preset** — `Other`
- **Build Command** — leave empty
- **Output Directory** — leave empty (the repository root *is* the site)
- **Install Command** — leave empty

Press **Deploy**. It takes about twenty seconds, because there is nothing to build.

You'll get a URL like `gate-ml.vercel.app`, with `/practice` and `/guide` working as
shortcuts thanks to `vercel.json`. Every later `git push` to `main` redeploys on its own.

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
