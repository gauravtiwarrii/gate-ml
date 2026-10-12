// Regression tests for the mock exam pipeline: question builder + scoring
// engine + the answer-shape produced by the redesigned mock-da UI.
// Runs with: node --test tests/test_mock_e2e.js
//
// Why this file exists: tests/test_bank.js only executes its 13 top-level Q*
// tests (the S*/M*/P*/C* tests are nested inside an unclosed callback — a
// pre-existing bug), so scoring was never actually exercised by the suite.
// This file loads the browser IIFE modules in a `vm` sandbox (providing
// `window`) exactly as the browser does, then drives them end-to-end.
//
// The hard invariant guarded here: the redesigned mock UI collects answers as
// { q.id: index | [indices] | number } and passes them to GateDAScore.paper().
// Scoring logic, data schema and localStorage keys must remain unchanged.

const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.join(__dirname, '..');

// Load a browser IIFE asset in a sandbox exposing `window`, then return the
// named export it attached to `window`. Mirrors how the page consumes it.
function loadBrowserAsset(file, exportName) {
  const sandbox = {
    window: {}, console, Math, Date, JSON, Object, Array,
    parseInt, parseFloat, isNaN, String, Number, Set, Boolean,
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  const code = fs.readFileSync(path.join(ROOT, 'assets', file), 'utf8');
  vm.runInContext(code, sandbox, { filename: file });
  const exported = sandbox.window[exportName];
  assert.ok(exported, file + ' must expose window.' + exportName);
  return exported;
}

const GateDAScore = loadBrowserAsset('gateda-score.js', 'GateDAScore');
const GateDAMock = loadBrowserAsset('mock.js', 'GateDAMock');
const BANK = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'practice-da.json'), 'utf8'));

// Same exam configuration the mock-da page uses.
const CFG = {
  totalQuestions: 65,
  subjectWeights: { ga: 15, calc: 9, prob: 10, prog: 8, dbms: 8, linalg: 9, ml: 10, ai: 8 },
  gaMarks: 15, techMarks: 85, durationMin: 180,
};

// ── Mock builder ──────────────────────────────────────────────────────
test('M1: buildMock returns a non-empty paper with valid questions', () => {
  const Q = GateDAMock.buildMock(BANK, CFG, 12345).questions;
  assert.ok(Array.isArray(Q) && Q.length > 0, 'paper must be non-empty');
  assert.ok(Q.every(q => typeof q.id === 'string' && q.id.length), 'every question needs an id');
  assert.ok(Q.every(q => q.marks > 0), 'every question needs marks > 0');
  assert.strictEqual(new Set(Q.map(q => q.id)).size, Q.length, 'question ids must be unique');
});

test('M2: buildMock is deterministic for a fixed seed', () => {
  const a = GateDAMock.buildMock(BANK, CFG, 42).questions.map(q => q.id);
  const b = GateDAMock.buildMock(BANK, CFG, 42).questions.map(q => q.id);
  assert.deepStrictEqual(a, b, 'same seed must yield same paper');
});


// ── Answer shape produced by the mock-da UI ───────────────────────────
// The UI's currentAnswer() returns: mcq -> index, msq -> sorted [indices],
// nat -> number. Build the correct-answer map in that exact shape.
function correctAnswerFor(q) {
  if (q.type === 'mcq') return q.a;
  if (q.type === 'msq') return q.a.slice().sort();
  if (q.type === 'nat') return (q.a[0] + q.a[1]) / 2; // midpoint is within tolerance
  return undefined;
}
function allCorrectMap(Q) {
  const m = {};
  Q.forEach(q => { const a = correctAnswerFor(q); if (a !== undefined) m[q.id] = a; });
  return m;
}

test('S1: all-correct answers (UI shape) score full marks', () => {
  const Q = GateDAMock.buildMock(BANK, CFG, 7).questions;
  const maxMarks = Q.reduce((s, q) => s + q.marks, 0);
  const r = GateDAScore.paper(Q, allCorrectMap(Q));
  assert.strictEqual(r.score, maxMarks, 'perfect paper must equal total marks');
  assert.strictEqual(r.correct, Q.length);
  assert.strictEqual(r.wrong, 0);
  assert.strictEqual(r.unanswered, 0);
});

test('S2: empty answer map scores 0 and marks all unanswered', () => {
  const Q = GateDAMock.buildMock(BANK, CFG, 7).questions;
  const r = GateDAScore.paper(Q, {});
  assert.strictEqual(r.score, 0);
  assert.strictEqual(r.unanswered, Q.length);
});

test('S3: wrong 1-mark MCQ applies -1/3 negative marking', () => {
  const q = { id: 'x', type: 'mcq', marks: 1, a: 0, o: ['a', 'b', 'c', 'd'] };
  const r = GateDAScore.paper([q], { x: 1 });
  assert.ok(Math.abs(r.score - (-1 / 3)) < 0.005, 'expected ~-1/3, got ' + r.score);
  assert.strictEqual(r.wrong, 1);
});

test('S4: wrong 2-mark MCQ applies -2/3 negative marking', () => {
  const q = { id: 'y', type: 'mcq', marks: 2, a: 0, o: ['a', 'b', 'c', 'd'] };
  const r = GateDAScore.paper([q], { y: 1 });
  assert.ok(Math.abs(r.score - (-2 / 3)) < 0.005, 'expected ~-2/3, got ' + r.score);
});

test('S5: MSQ scores full marks on exact set match regardless of order', () => {
  const q = { id: 'm', type: 'msq', marks: 2, a: [0, 2], o: ['a', 'b', 'c', 'd'] };
  assert.strictEqual(GateDAScore.paper([q], { m: [2, 0] }).score, 2);
  assert.strictEqual(GateDAScore.paper([q], { m: [0, 2] }).score, 2);
});

test('S6: MSQ gives no partial credit for a subset selection', () => {
  const q = { id: 'm', type: 'msq', marks: 2, a: [0, 2], o: ['a', 'b', 'c', 'd'] };
  const r = GateDAScore.paper([q], { m: [0] });
  assert.strictEqual(r.score, 0);
  assert.strictEqual(r.wrong, 1, 'mis-set selection is wrong, not unanswered');
});

test('S7: NAT accepts a value inside the tolerance band', () => {
  const q = { id: 'n', type: 'nat', marks: 2, a: [2.4, 2.6], tol_note: 'tol 0.1' };
  assert.strictEqual(GateDAScore.paper([q], { n: 2.5 }).score, 2);
  assert.strictEqual(GateDAScore.paper([q], { n: 2.4 }).score, 2, 'lower boundary inclusive');
  assert.strictEqual(GateDAScore.paper([q], { n: 2.6 }).score, 2, 'upper boundary inclusive');
});

test('S8: NAT rejects a value outside tolerance and non-numeric input', () => {
  const q = { id: 'n', type: 'nat', marks: 2, a: [2.4, 2.6], tol_note: 'tol 0.1' };
  assert.strictEqual(GateDAScore.paper([q], { n: 2.7 }).score, 0);
  assert.strictEqual(GateDAScore.paper([q], { n: 'xyz' }).score, 0);
});

// Regression guard for a misplaced-brace defect found in mock-da during QA: the
// exam helpers (render/buildPal/nav/showConfirm/...) were accidentally nested
// inside tick()'s `if (el)` block and inside render()'s forEach callback, which
// made them unreachable from begin()/wire() — a ReferenceError on exam start.
// Function declarations hoist to their TRUE enclosing scope, so probing `typeof`
// at the very top of the IIFE (before any statement runs) reports 'function'
// only when the helper is genuinely IIFE-scoped.
test('mock-da: exam helpers are IIFE-scoped, not nested inside tick()/render()', () => {
  const html = fs.readFileSync(path.join(ROOT, 'mock-da', 'index.html'), 'utf8');
  const m = html.match(/<script>([\s\S]*?)<\/script>/);
  assert.ok(m, 'mock-da must contain an inline <script>');
  const helpers = ['tick', 'startTimer', 'currentAnswer', 'saveCurrent', 'isChecked',
    'render', 'buildPal', 'paintPal', 'nav', 'goto', 'showConfirm',
    'loadBank', 'doSubmit', 'reset', 'begin', 'start', 'wire'];
  const probe = 'window.__scope = {' + helpers.map(h => h + ': typeof ' + h).join(', ') + '};';
  const injected = m[1].replace('(function () {', '(function () {\n  ' + probe);
  assert.notStrictEqual(injected, m[1], 'probe must inject into the IIFE opener');

  const sandbox = {
    window: null, console, Math, Date, JSON, Object, Array, Set, String, Number,
    parseInt, parseFloat, isNaN, Promise, Error,
    setTimeout: () => 1, clearTimeout() {},
    location: { reload() {} },
    fetch: () => Promise.resolve({ ok: true, json: () => Promise.resolve({ questions: [] }) }),
    document: {
      getElementById: () => null, createElement: () => ({}),
      querySelector: () => null, querySelectorAll: () => [],
      addEventListener() {}, dispatchEvent() {},
    },
    localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  try { vm.runInContext(injected, sandbox, { filename: 'mock-da' }); }
  catch (e) { /* boot may throw on the stub DOM; the top-of-IIFE probe already ran */ }

  const scope = sandbox.window.__scope;
  assert.ok(scope, 'probe captured scope at the top of the IIFE');
  const nested = helpers.filter(h => scope[h] !== 'function');
  assert.deepStrictEqual(nested, [],
    'helpers not visible at IIFE scope (nested in another function): ' + nested.join(', '));
});
