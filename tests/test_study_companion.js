/* ============================================================
   Tests for Study Companion (Highlights, Notes, Flashcards,
   Formula Sheet, Pomodoro, and Reader Settings)
   ============================================================ */
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const jsCode = fs.readFileSync(path.join(__dirname, "../assets/study-companion.js"), "utf8");
const cssCode = fs.readFileSync(path.join(__dirname, "../assets/study-companion.css"), "utf8");
const htmlCode = fs.readFileSync(path.join(__dirname, "../ml-guide.html"), "utf8");

test("Study Companion assets are linked in ml-guide.html", () => {
  assert.ok(htmlCode.includes("assets/study-companion.css"), "study-companion.css is linked in ml-guide.html");
  assert.ok(htmlCode.includes("assets/study-companion.js"), "study-companion.js is linked in ml-guide.html");
  assert.ok(!htmlCode.includes(".study-tools {"), "old rudimentary study-tools style is removed");
});

test("HTML nesting is valid in ml-guide.html (no duplicated main tags)", () => {
  const openMainCount = (htmlCode.match(/<main\b/gi) || []).length;
  const closeMainCount = (htmlCode.match(/<\/main>/gi) || []).length;
  assert.strictEqual(openMainCount, 1, "Exactly one <main> tag should be opened");
  assert.strictEqual(closeMainCount, 1, "Exactly one </main> tag should be closed");
});

test("Study Companion JS syntax is valid", () => {
  assert.doesNotThrow(() => {
    new Function(jsCode);
  }, "study-companion.js parses without syntax error");
});

test("Study Companion CSS contains all necessary components", () => {
  assert.ok(cssCode.includes("#studyProgressBar"), "contains #studyProgressBar");
  assert.ok(cssCode.includes(".study-hl"), "contains .study-hl");
  assert.ok(cssCode.includes(".study-selection-bar"), "contains .study-selection-bar");
  assert.ok(cssCode.includes(".study-dock"), "contains .study-dock");
  assert.ok(cssCode.includes(".study-drawer"), "contains .study-drawer");
  assert.ok(cssCode.includes(".study-flashcard"), "contains .study-flashcard");
  assert.ok(cssCode.includes(".study-pomo-wrap"), "contains .study-pomo-wrap");
  assert.ok(cssCode.includes(".study-zen-mode"), "contains .study-zen-mode");
});

test("Flashcards deck is populated and valid", () => {
  assert.ok(jsCode.includes("FLASHCARD_DECK"), "Deck defined");
  assert.ok(jsCode.includes("Bias-Variance Tradeoff"), "Bias-Variance in deck");
  assert.ok(jsCode.includes("OLS Normal Equation"), "Normal Equation in deck");
  assert.ok(jsCode.includes("Ridge vs Lasso Regularization"), "Ridge vs Lasso in deck");
  assert.ok(jsCode.includes("Decision Trees — Splitting Criteria"), "Decision Trees in deck");
  assert.ok(jsCode.includes("Precision, Recall, and F1"), "Precision Recall F1 in deck");
  assert.ok(jsCode.includes("k-Means Objective & Convergence"), "k-Means in deck");
  assert.ok(jsCode.includes("PCA Covariance & Variance"), "PCA in deck");
});

test("Formula cheat sheet is populated and valid", () => {
  assert.ok(jsCode.includes("FORMULAS"), "Formulas array defined");
  assert.ok(jsCode.includes("Normal Equation (OLS)"), "Normal equation formula included");
  assert.ok(jsCode.includes("Binary Cross-Entropy (Log-Loss)"), "Log-loss formula included");
  assert.ok(jsCode.includes("Gini Impurity (CART)"), "Gini Impurity formula included");
  assert.ok(jsCode.includes("SVM Geometric Margin"), "SVM margin formula included");
});

test("On-screen marker & drawing engine is implemented", () => {
  assert.ok(jsCode.includes("studyMarkerCanvas"), "Canvas element ID exists");
  assert.ok(jsCode.includes("studyMarkerToolbar"), "Marker toolbar ID exists");
  assert.ok(jsCode.includes("toggleMarker"), "toggleMarker function exists");
  assert.ok(cssCode.includes(".study-marker-canvas"), "Marker canvas CSS defined");
  assert.ok(cssCode.includes(".study-marker-toolbar"), "Marker toolbar CSS defined");
  assert.ok(jsCode.includes("markerSnapshotBtn") && jsCode.includes("toDataURL"), "Screenshot export function exists");
  assert.ok(jsCode.includes("undoStroke"), "Undo stroke function exists");
});

test("Highlighter wand mode and keyboard shortcuts are supported", () => {
  assert.ok(jsCode.includes("initInstantWand"), "initInstantWand function exists");
  assert.ok(cssCode.includes(".study-wand-active"), "Wand active cursor CSS defined");
  assert.ok(jsCode.includes("studyDockWandBtn"), "Wand dock button exists");
  assert.ok(jsCode.includes('e.key === "m"') || jsCode.includes("key === 'm'"), "Key M marker shortcut handled");
  assert.ok(jsCode.includes('e.key === "h"') || jsCode.includes("key === 'h'"), "Key H wand shortcut handled");
});

test("Interactive ML Calculators are implemented", () => {
  assert.ok(jsCode.includes("initCalculatorAndTools"), "Calculator initializer exists");
  assert.ok(jsCode.includes("calcTP") && jsCode.includes("calcFP"), "Confusion matrix calculator inputs exist");
  assert.ok(jsCode.includes("calcTreeCounts"), "Decision tree impurity calculator exists");
  assert.ok(jsCode.includes("calcLogitZ"), "Sigmoid / Log-Loss calculator exists");
  assert.ok(jsCode.includes("outAccuracy") && jsCode.includes("outF1"), "Accuracy and F1 outputs exist");
  assert.ok(jsCode.includes("outGini") && jsCode.includes("outEntropy"), "Gini and Entropy outputs exist");
});

test("Ambient focus sounds and speech synthesis are implemented", () => {
  assert.ok(jsCode.includes("initAmbientSounds"), "Web Audio ambient sounds function exists");
  assert.ok(jsCode.includes("gamma") && jsCode.includes("rain"), "Ambient focus sound options supported");
  assert.ok(jsCode.includes("initTextToSpeech"), "Speech synthesis read-aloud function exists");
  assert.ok(cssCode.includes(".study-audio-tile"), "Ambient sound tile CSS defined");
});

test("No-distraction Zen Focus mode and HUD controls", () => {
  assert.ok(cssCode.includes(".study-zen-hud"), "Zen HUD CSS defined");
  assert.ok(jsCode.includes("studyZenHud"), "Zen HUD element mounted");
  assert.ok(jsCode.includes("zenHudExitBtn"), "Zen HUD exit button exists");
  assert.ok(jsCode.includes("zenHudWidthBtn"), "Zen HUD width toggle button exists");
  assert.ok(jsCode.includes("studyDockZenBtn"), "Study Dock Zen button exists");
  assert.ok(cssCode.includes('body.study-zen-mode[data-zen-width="narrow"]'), "Narrow Zen column defined");
  assert.ok(cssCode.includes('body.study-zen-mode[data-zen-width="wide"]'), "Wide Zen column defined");
  assert.ok(cssCode.includes("body.study-zen-mode .study-dock"), "Hides dock in Zen mode");
  assert.ok(cssCode.includes("body.study-zen-mode .guide-aside"), "Hides sidebar in Zen mode");
});

test("Paragraph Focus Lens and Reading Ruler are implemented", () => {
  assert.ok(cssCode.includes(".study-lens-active"), "Focus lens active CSS defined");
  assert.ok(cssCode.includes(".study-lens-focus"), "Spotlight focus CSS defined");
  assert.ok(jsCode.includes("toggleFocusLens"), "toggleFocusLens function exists");
  assert.ok(jsCode.includes("studyReadingRuler"), "Reading ruler element exists");
  assert.ok(cssCode.includes("#studyReadingRuler"), "Reading ruler CSS defined");
  assert.ok(jsCode.includes("toggleReadingRuler"), "toggleReadingRuler function exists");
});

test("Bionic Reading mode and non-destructive typography", () => {
  assert.ok(cssCode.includes(".bionic-bold"), "Bionic bold CSS defined");
  assert.ok(jsCode.includes("toggleBionicReading"), "toggleBionicReading function exists");
  assert.ok(jsCode.includes("data-orig-html"), "Lossless original HTML storage attribute used");
  assert.ok(jsCode.includes("applyBionicToNode"), "Node-level bionic word parser implemented");
});

test("GATE DA Exam Readiness Gauge and Syllabus Checklist", () => {
  assert.ok(jsCode.includes("tabPanelChecklist"), "Checklist panel exists in drawer");
  assert.ok(jsCode.includes("studyReadinessPct"), "Readiness percentage output exists");
  assert.ok(jsCode.includes("studyReadinessBar"), "Readiness progress bar exists");
  assert.ok(jsCode.includes("studyReadinessStatus"), "Readiness badge status exists");
  assert.ok(jsCode.includes("checklistCoreContainer"), "Core syllabus units container exists");
  assert.ok(jsCode.includes("checklistAppContainer"), "Appendices container exists");
  assert.ok(cssCode.includes(".study-readiness-card"), "Readiness card CSS defined");
  assert.ok(cssCode.includes(".study-checklist-row"), "Checklist row CSS defined");
});

test("Keyboard shortcuts cheat sheet modal and global keybindings", () => {
  assert.ok(jsCode.includes("studyShortcutsModal"), "Shortcuts modal element mounted");
  assert.ok(cssCode.includes(".study-modal-backdrop"), "Modal backdrop CSS defined");
  assert.ok(cssCode.includes(".study-shortcut-row"), "Shortcut row styling defined");
  assert.ok(jsCode.includes('key === "z"'), "Key Z shortcut handled");
  assert.ok(jsCode.includes('key === "l"'), "Key L shortcut handled");
  assert.ok(jsCode.includes('key === "r"'), "Key R shortcut handled");
  assert.ok(jsCode.includes('key === "b"'), "Key B shortcut handled");
  assert.ok(jsCode.includes('key === "?"') || jsCode.includes('e.key === "?"'), "Key ? shortcuts help handled");
  assert.ok(jsCode.includes('e.key === "Escape"'), "Escape key exit handled");
});

test("ML Guide rendering and scroll performance optimizations", () => {
  assert.ok(htmlCode.includes("content-visibility: auto"), "content-visibility optimization present in ml-guide.html");
  assert.ok(htmlCode.includes("contain-intrinsic-size"), "contain-intrinsic-size placeholder height present");
  assert.ok(htmlCode.includes("data:image/svg+xml"), "Inline SVG favicon present to prevent 404 roundtrip");
  assert.ok(htmlCode.includes("dns-prefetch"), "DNS prefetch hints present");
  assert.ok(htmlCode.includes("overflow-x: auto"), "Responsive table overflow handling present");
  assert.ok(jsCode.includes("mouseTicking"), "Unified mousemove loop throttled with requestAnimationFrame");
  assert.ok(jsCode.includes("resizeTicking"), "Window resize handler throttled with requestAnimationFrame");
});


