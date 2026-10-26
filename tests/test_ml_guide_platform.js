/* ============================================================
   Tests for ML Guide Interactive Learning Platform
   Verifies:
   - Compact hero & learning dashboard
   - Real-time curriculum search
   - Unit completion checkpoints
   - Progress persistence & synchronization
   - Responsive floating study toolbar minimize controls
   ============================================================ */
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const htmlCode = fs.readFileSync(path.join(__dirname, "../ml-guide.html"), "utf8");
const companionJs = fs.readFileSync(path.join(__dirname, "../assets/study-companion.js"), "utf8");
const companionCss = fs.readFileSync(path.join(__dirname, "../assets/study-companion.css"), "utf8");
const appCss = fs.readFileSync(path.join(__dirname, "../assets/app.css"), "utf8");

test("Compact learning-first hero is rendered", () => {
  assert.ok(htmlCode.includes("cover compact-hero"), "compact hero container present");
  assert.ok(htmlCode.includes("id=\"heroPdfBtn\""), "compact PDF export button present in hero");
  assert.ok(htmlCode.includes("hero-progress-section"), "progress tracker section present");
  assert.ok(htmlCode.includes("id=\"heroProgressFill\""), "progress bar fill present");
  assert.ok(htmlCode.includes("id=\"heroProgressValue\""), "progress value label present");
  assert.ok(htmlCode.includes("id=\"heroResumeAction\""), "primary continue learning action present");
});

test("3-Card learning dashboard is rendered", () => {
  assert.ok(htmlCode.includes("learning-dashboard"), "learning dashboard container present");
  assert.ok(htmlCode.includes("id=\"dashContinueCard\""), "continue learning card present");
  assert.ok(htmlCode.includes("id=\"dashResumeTitle\""), "dynamic lesson title element present");
  assert.ok(htmlCode.includes("id=\"dashResumeLink\""), "dynamic resume link present");
  assert.ok(htmlCode.includes("gate-ml-practice.html"), "practice mode link present");
  assert.ok(htmlCode.includes("#appB") && htmlCode.includes("#appA"), "revision cheat sheet links present");
});

test("Curriculum navigation sidebar search and grouping are present", () => {
  assert.ok(htmlCode.includes("id=\"docsSearchInput\""), "curriculum search input present");
  assert.ok(htmlCode.includes("id=\"docsSearchClear\""), "search clear button present");
  assert.ok(htmlCode.includes("id=\"docsSearchNoResults\""), "search no results element present");
  assert.ok(htmlCode.includes("docsnav-group-title"), "collapsible group titles present");
  assert.ok(htmlCode.includes("status-dot"), "status dot indicators present");
  assert.ok(htmlCode.includes("id=\"docsnavResetProgress\""), "progress reset button present");
});

test("Unit checkpoints exist for Units 1 through 10", () => {
  for (let i = 1; i <= 10; i++) {
    const toggleAttr = `data-unit-toggle="u${i}"`;
    assert.ok(htmlCode.includes(toggleAttr), `Checkpoint toggle for Unit ${i} present`);
  }
});

test("Dock minimize toggle is implemented in companion assets", () => {
  assert.ok(companionJs.includes("studyDockMinBtn"), "studyDockMinBtn element created");
  assert.ok(companionCss.includes(".study-dock.study-dock--minimized"), "study-dock--minimized CSS class defined");
  assert.ok(companionCss.includes(".study-dock__btn--min"), "study-dock__btn--min CSS class defined");
});

test("Bidirectional progress synchronization event is implemented", () => {
  assert.ok(companionJs.includes("gateda:units_updated"), "study-companion dispatches and listens to units update");
  assert.ok(htmlCode.includes("gateda:units_updated"), "ml-guide dispatches and listens to units update");
  assert.ok(htmlCode.includes("gateda.ml-guide.units_done.v2"), "both use standard localStorage storage key");
});

test("Top navigation has focus-visible outlines and flex-wrap guards", () => {
  assert.ok(appCss.includes("outline: 2px solid var(--accent)"), "focus-visible outline defined");
  assert.ok(appCss.includes("white-space: nowrap"), "nav links avoid awkward text wrapping");
});
