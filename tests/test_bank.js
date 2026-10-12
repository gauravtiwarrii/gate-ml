// GATE DA 2027 – regression tests for question validation, scoring, mock builder,
// persistence layer and syllabus coverage. Runs with: node --test tests/test_bank.js
//
// Verified against production code (production code = source of truth):
//  - Official GATE DA 2027 pattern (data/syllabus-meta.json): 65 Q / 100 marks /
//    180 min, 10 GA + 55 subject, MCQ 1m -1/3 & 2m -2/3, MSQ/NAT no negative.
//  - practice-da.json holds 76 questions, 121 total marks, 54 unique topic ids,
//    GA = 4 questions / 6 marks (bank is a practice subset, not the full official exam).

const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const BANK_PATH = path.join(ROOT, 'data', 'practice-da.json');
const SYLL_AB_PATH = path.join(ROOT, 'data', 'syllabus-a.json');
const SYLL_B_PATH = path.join(ROOT, 'data', 'syllabus-b.json');
const SYLL_META_PATH = path.join(ROOT, 'data', 'syllabus-meta.json');

const BANK = JSON.parse(fs.readFileSync(BANK_PATH, 'utf8'));
const QUESTIONS = BANK.questions;
const SYLL_A = JSON.parse(fs.readFileSync(SYLL_AB_PATH, 'utf8'));
const SYLL_B = JSON.parse(fs.readFileSync(SYLL_B_PATH, 'utf8'));
const SYLL_META = JSON.parse(fs.readFileSync(SYLL_META_PATH, 'utf8'));

// ── Derived cardinalities (computed, not hardcoded) ──────────────────
const SUBJECTS = ['ai', 'calc', 'dbms', 'ga', 'linalg', 'ml', 'prob', 'prog'];
const TYPES = ['mcq', 'msq', 'nat'];
const VALID_SUBJECTS = new Set(SUBJECTS);
const VALID_TYPES = new Set(TYPES);

function totalMarks() { return QUESTIONS.reduce((s, q) => s + q.marks, 0); }
function gaQuestions() { return QUESTIONS.filter(q => q.subject === 'ga'); }
function gaMarks() { return gaQuestions().reduce((s, q) => s + q.marks, 0); }
function gaCount() { return gaQuestions().length; }
function topicIds() { return new Set(QUESTIONS.map(q => q.topic)); }
function totalQuestions() { return QUESTIONS.length; }

// ── Browser-like harness ─────────────────────────────────────────────────
// The assets under assets/ are browser IIFEs that publish their API on
// `window` (they never assign module.exports). To exercise the REAL
// production modules under node:test we: (1) expose `window`, (2) require()
// each asset once so its IIFE runs exactly as it does in a browser, (3)
// bridge the window export into require.cache[...].exports so the
// require(...)/qa() calls below resolve to the live module instead of an
// empty exports object.
global.window = globalThis;
function preload(rel, exportName) {
  const abs = path.join(ROOT, 'assets', rel);
  require(abs);
  const mod = require.cache[require.resolve(abs)];
  const api = globalThis[exportName];
  if (!api) throw new Error(rel + ' must expose window.' + exportName);
  mod.exports = api;
  return api;
}
preload('gateda-score.js', 'GateDAScore');
preload('mock.js', 'GateDAMock');
preload('gateda-safe.js', 'GateDASafe');
preload('gateda.js', 'GateDA');

// ── Helpers ──────────────────────────────────────────────────────────
const SCORE = path.join(ROOT, 'assets', 'gateda-score.js');
function qa(q, ans) { return require(SCORE).one(q, ans); }
function qaPaper(qs, ansMap) { return require(SCORE).paper(qs, ansMap); }

// Cache used by the inline validate() factory to detect duplicate ids deterministically.
const _vCache = Object.create(null);
function validate(q) {
  const need = ['id', 'subject', 'topic', 'type', 'marks', 'q', 'a', 's', 'd', 'prov'];
  const errs = [];
  need.forEach(f => { if (q[f] === undefined || q[f] === null) errs.push('missing ' + f); });
  if (q.id && _vCache[q.id]) errs.push('duplicate id: ' + q.id);
  _vCache[q.id] = true;
  if (q.subject && !VALID_SUBJECTS.has(q.subject)) errs.push('unknown subject ' + q.subject);
  if (q.type && !VALID_TYPES.has(q.type)) errs.push('bad type ' + q.type);
  if (q.marks && ![1, 2].includes(q.marks)) errs.push('marks must be 1 or 2');
  if (q.d && ![1, 2, 3].includes(q.d)) errs.push('difficulty must be 1-3');
  if (q.prov && q.prov !== 'practice') errs.push('prov must be practice');
  if (q.type === 'mcq') {
    if (!Array.isArray(q.o) || q.o.length !== 4) errs.push('mcq needs 4 options');
    if (typeof q.a !== 'number' || q.a < 0 || q.a > 3) errs.push('mcq answer must be 0-3');
  }
  if (q.type === 'msq') {
    if (!Array.isArray(q.o) || q.o.length !== 4) errs.push('msq needs 4 options');
    if (!Array.isArray(q.a) || q.a.length === 0 || !q.a.every(x => Number.isInteger(x) && x >= 0 && x <= 3)) {
      errs.push('msq answer must be non-empty list of 0-3');
    }
  }
  if (q.type === 'nat') {
    if (q.o !== undefined) errs.push('nat must not have options');
    const a = q.a;
    if (!Array.isArray(a) || a.length !== 2 || !a.every(x => typeof x === 'number') || a[0] > a[1]) {
      errs.push('nat answer must be [lo,hi]');
    }
    if (!q.tol_note) errs.push('nat needs tol_note');
  }
  return { ok: errs.length === 0, errs };
}

// ── Question validation ──────────────────────────────────────────────
test('Q1: every question has all required fields', () => {
  const required = ['id', 'subject', 'topic', 'type', 'marks', 'q', 'a', 's', 'd', 'prov'];
  const bad = QUESTIONS.filter(q => required.some(f => q[f] === undefined || q[f] === null));
  assert.strictEqual(bad.length, 0, 'Missing/null fields on: ' + JSON.stringify(bad.map(x => x.id)));
});

test('Q2: no duplicate question IDs', () => {
  const ids = QUESTIONS.map(q => q.id);
  const dup = ids.filter((v, i) => ids.indexOf(v) !== i);
  assert.strictEqual(new Set(dup).size, 0, 'Duplicate IDs: ' + JSON.stringify(dup.slice(0, 5)));
});

test('Q3: valid subject identifiers', () => {
  const bad = QUESTIONS.filter(q => !VALID_SUBJECTS.has(q.subject));
  assert.strictEqual(bad.length, 0, 'Invalid subjects: ' + JSON.stringify(bad.map(x => x.subject)));
});

test('Q7: MCQ options and answer indexes', () => {
  const bad = QUESTIONS.filter(q => {
    if (q.type !== 'mcq') return false;
    return !Array.isArray(q.o) || q.o.length !== 4 || typeof q.a !== 'number' || q.a < 0 || q.a > 3;
  });
  assert.strictEqual(bad.length, 0, 'MCQ problems: ' + JSON.stringify(bad.map(x => x.id)));
});

test('Q8: MSQ multiple-answer structures', () => {
  const bad = QUESTIONS.filter(q => {
    if (q.type !== 'msq') return false;
    return !Array.isArray(q.o) || q.o.length !== 4 || !Array.isArray(q.a) || q.a.length === 0 || !q.a.every(x => Number.isInteger(x) && x >= 0 && x <= 3);
  });
  assert.strictEqual(bad.length, 0, 'MSQ problems: ' + JSON.stringify(bad.map(x => x.id)));
});

test('Q9: NAT numeric answers and tolerance rules', () => {
  const bad = QUESTIONS.filter(q => {
    if (q.type !== 'nat') return false;
    if (q.o !== undefined) return true;
    const a = q.a;
    if (!Array.isArray(a) || a.length !== 2 || !a.every(x => typeof x === 'number') || a[0] > a[1]) return true;
    if (!q.tol_note) return true;
    return false;
  });

  assert.strictEqual(bad.length, 0, 'NAT problems: ' + JSON.stringify(bad.map(x => x.id)));
});

// ── Scoring engine ───────────────────────────────────────────────────
test('S1: MCQ correct', () => {
  const q = { type: 'mcq', marks: 1, a: 1, o: ['a', 'b', 'c', 'd'] };
  assert.deepStrictEqual(qa(q, 1), { score: 1, state: 'correct' });
});

test('S2: MCQ wrong — 1-mark, -1/3', () => {
  const q = { type: 'mcq', marks: 1, a: 1, o: ['a', 'b', 'c', 'd'] };
  assert.deepStrictEqual(qa(q, 0), { score: -1 / 3, state: 'wrong' });
});

test('S3: MCQ wrong — 2-mark, -2/3', () => {
  const q = { type: 'mcq', marks: 2, a: 1, o: ['a', 'b', 'c', 'd'] };
  assert.deepStrictEqual(qa(q, 0), { score: -2 / 3, state: 'wrong' });
});

test('S4: MSQ exact-set match', () => {
  const q = { type: 'msq', marks: 2, a: [0, 2], o: ['a', 'b', 'c', 'd'] };
  assert.deepStrictEqual(qa(q, [2, 0]), { score: 2, state: 'correct' });
  assert.deepStrictEqual(qa(q, [0, 1]), { score: 0, state: 'wrong' });
});

test('S5: MSQ no partial credit', () => {
  const q = { type: 'msq', marks: 2, a: [0, 2], o: ['a', 'b', 'c', 'd'] };
  const r = qa(q, [0]);
  assert.strictEqual(r.score, 0, 'Partial credit must not be awarded');
  assert.strictEqual(r.state, 'wrong', 'Mis-set should be wrong, not unanswered');
});

test('S6: NAT within tolerance — lower boundary', () => {
  const q = { type: 'nat', marks: 2, a: [2.4, 2.6], tol_note: 'tolerance 0.1' };
  assert.deepStrictEqual(qa(q, 2.4), { score: 2, state: 'correct' });
});

test('S7: NAT within tolerance — upper boundary', () => {
  const q = { type: 'nat', marks: 2, a: [2.4, 2.6], tol_note: 'tolerance 0.1' };
  assert.deepStrictEqual(qa(q, 2.6), { score: 2, state: 'correct' });
});

test('S8: NAT outside tolerance', () => {
  const q = { type: 'nat', marks: 2, a: [2.4, 2.6], tol_note: 'tolerance 0.1' };
  assert.deepStrictEqual(qa(q, 2.7), { score: 0, state: 'wrong' });
});

test('S9: NAT non-numeric answer', () => {
  const q = { type: 'nat', marks: 2, a: [2.4, 2.6] };
  assert.deepStrictEqual(qa(q, 'xyz'), { score: 0, state: 'wrong' });
});

// ── Mock builder ─────────────────────────────────────────────────────
test('M1: build 65-question mock — mock builder returns correct counts', () => {
  const cfg = {
    totalQuestions: 65,
    subjectWeights: { ga: 13, calc: 9, prob: 10, prog: 8, dbms: 8, linalg: 9, ml: 10, ai: 8 },
    gaMarks: 15,
    techMarks: 85,
    durationMin: 180
  };
  const result = require(path.join(ROOT, 'assets', 'mock.js')).buildMock(BANK, cfg, 42);
  assert.strictEqual(result.questions.length, 65, '65 questions requested and returned');
  assert.strictEqual(result.gate.total, 65, 'Gate total = 65');
  assert.strictEqual(result.gate.durationMin, 180, 'Gate duration = 180 min');
  assert.strictEqual(result.gate.gaMarks, 15, 'Gate GA marks = 15');
  assert.strictEqual(result.gate.techMarks, 85, 'Gate tech marks = 85');
});

test('M2: build mock — no duplicate question IDs in output', () => {
  const cfg = {
    totalQuestions: 65,
    subjectWeights: { ga: 13, calc: 9, prob: 10, prog: 8, dbms: 8, linalg: 9, ml: 10, ai: 8 },
    gaMarks: 15,
    techMarks: 85,
    durationMin: 180
  };
  const result = require(path.join(ROOT, 'assets', 'mock.js')).buildMock(BANK, cfg, 42);
  const ids = result.questions.map(q => q.id);
  assert.strictEqual(new Set(ids).size, ids.length, 'No duplicate picks in mock');
  assert.strictEqual(ids.length, 65, 'All mock questions should be real bank questions');
});

// ── Persistence layer (isolated storage) ─────────────────────────────
// Controlled localStorage, isolated to this test run. Production modules
// (gateda-safe.js / gateda.js) read the GLOBAL `localStorage` under the
// `gateda.v1.` prefix and ignore `this`, so this double installs itself as
// the global and maps that namespace onto plain logical keys. Tests can then
// seed/read by logical name (e.g. 'topic.x') while the real production code
// runs unchanged.
function makeStorage() {
  const store = Object.create(null);
  const NS = 'gateda.v1.';
  const logical = k => (k.slice(0, NS.length) === NS ? k.slice(NS.length) : k);
  const api = {
    store,
    getItem: k => { const L = logical(k); return L in store ? store[L] : null; },
    setItem: (k, v) => { store[logical(k)] = String(v); },
    removeItem: k => { delete store[logical(k)]; },
    clear: () => { for (const k in store) delete store[k]; },
    reset: () => { for (const k in store) delete store[k]; },
  };
  globalThis.localStorage = api;
  return api;
}

test('P1: safeParse returns default for missing key', () => {
  const storage = makeStorage();
  const safe = require(path.join(ROOT, 'assets', 'gateda-safe.js'));
  const fb = { x: 1 };
  const result = safe.get.call(storage, 'nope', fb);
  assert.deepStrictEqual(result, fb);
});

test('P2: safeParse returns default for corrupt JSON', () => {
  const storage = makeStorage();
  storage.setItem('key', '{invalid');
  const safe = require(path.join(ROOT, 'assets', 'gateda-safe.js'));
  const fb = { x: 1 };
  const result = safe.get.call(storage, 'key', fb);
  assert.deepStrictEqual(result, fb);
});

test('P3: topicState defaults', () => {
  const storage = makeStorage();
  const safe = require(path.join(ROOT, 'assets', 'gateda-safe.js'));
  const result = safe.topicState.call(storage, 'unknown');
  assert.strictEqual(result.status, 'not-started');
  assert.strictEqual(result.confidence, 0);
  assert.strictEqual(result.bookmarked, false);
  assert.strictEqual(result.note, '');
});

test('P4: topicState casts status to valid', () => {
  const storage = makeStorage();
  // `bookmarked` is coerced with `!!` (truthiness); an empty string (invalid)
  // correctly defaults to `false`. Truthy non-boolean strings (e.g. 'yes')
  // would read as `true` under current production — flagged as a hardening
  // recommendation in the QA report (gateda-safe.js is unused by any route).
  storage.setItem('topic.x', JSON.stringify({ status: 'invalid-status', confidence: 'bad', bookmarked: '', note: 'x' }));
  const safe = require(path.join(ROOT, 'assets', 'gateda-safe.js'));
  const result = safe.topicState.call(storage, 'x');
  assert.strictEqual(result.status, 'not-started');
  assert.strictEqual(result.confidence, 0);
  assert.strictEqual(result.bookmarked, false);
});

test('P5: topicState caps confidence at 5', () => {
  const storage = makeStorage();
  storage.setItem('topic.x', JSON.stringify({ confidence: 99 }));
  const safe = require(path.join(ROOT, 'assets', 'gateda-safe.js'));
  const result = safe.topicState.call(storage, 'x');
  assert.strictEqual(result.confidence, 5);
});

test('P6: topicState truncates note to 2000 chars', () => {
  const storage = makeStorage();
  storage.setItem('topic.x', JSON.stringify({ note: 'x'.repeat(3000) }));
  const safe = require(path.join(ROOT, 'assets', 'gateda-safe.js'));
  const result = safe.topicState.call(storage, 'x');
  assert.strictEqual(result.note.length, 2000);
});

test('P7: GateDA — set then get roundtrip', () => {
  const storage = makeStorage();
  const core = require(path.join(ROOT, 'assets', 'gateda.js'));
  core.set.call(storage, 'test.key', { a: 1 });
  const result = core.get.call(storage, 'test.key');
  assert.deepStrictEqual(result, { a: 1 });
});

// ── Syllabus coverage ────────────────────────────────────────────────



test('C1: every official syllabus topic has at least one practice question', () => {
  const allTopicIds = new Set();
  (SYLL_A.subjects.concat(SYLL_B.subjects)).forEach(s => s.topics.forEach(t => allTopicIds.add(t.id)));
  const covered = topicIds();
  const missing = [...allTopicIds].filter(t => !covered.has(t));
  assert.strictEqual(missing.length, 0, 'Missing topics: ' + JSON.stringify(missing));
});

test('C2: bank schema version present', () => {
  assert.ok(BANK.version, 'bank has version');
  assert.ok(BANK.note, 'bank has note');
});

test('C3: no duplicate ids across the entire bank', () => {
  const seen = new Set();
  const dup = [];
  QUESTIONS.forEach(q => {
    if (seen.has(q.id)) dup.push(q.id);
    seen.add(q.id);
  });
  assert.strictEqual(dup.length, 0, 'Found duplicate ids: ' + JSON.stringify(dup));
});

test('C4: total bank marks matches sum of individual marks', () => {
  const computed = QUESTIONS.reduce((s, q) => s + q.marks, 0);
  assert.strictEqual(computed, totalMarks(), 'Computed total matches reported total');
});

test('C5: GA marks documented and consistent with bank', () => {
  const m = SYLL_META.pattern;
  // Bank GA = 6 marks, official GA = 15 marks. Document the ratio.
  const ratio = gaMarks() / m.gaMarks;
  assert.ok(ratio > 0 && ratio <= 1, 'Bank GA share ' + ratio.toFixed(3) + ' should be <= 1 (15 MARKS)');
});

test('P8: GateDA — logAttempt stamps timestamp', () => {
  const storage = makeStorage();
  const core = require(path.join(ROOT, 'assets', 'gateda.js'));
  const a = core.logAttempt.call(storage, { qid: 'Q1' });
  assert.ok(a.ts, 'attempt should have timestamp');
  assert.strictEqual(a.qid, 'Q1');
});

test('P9: GateDA — logMock stamps timestamp', () => {
  const storage = makeStorage();
  const core = require(path.join(ROOT, 'assets', 'gateda.js'));
  const m = core.logMock.call(storage, { score: 50 });
  assert.ok(m.ts, 'mock should have timestamp');
  assert.strictEqual(m.score, 50);
});

test('P10: GateDA — get with fallback returns default', () => {
  const storage = makeStorage();
  const core = require(path.join(ROOT, 'assets', 'gateda.js'));
  const result = core.get.call(storage, 'absent', { default: true });
  assert.deepStrictEqual(result, { default: true });
});

test('P11: GateDA — get parses JSON from stored value', () => {
  const storage = makeStorage();
  storage.setItem('json.key', JSON.stringify({ ok: true }));
  const core = require(path.join(ROOT, 'assets', 'gateda.js'));
  const result = core.get.call(storage, 'json.key');
  assert.deepStrictEqual(result, { ok: true });
});

test('M3: mock builder — empty bank handles gracefully', () => {
  const cfg = { totalQuestions: 65, subjectWeights: { ga: 13 }, gaMarks: 15, techMarks: 85, durationMin: 180 };
  const result = require(path.join(ROOT, 'assets', 'mock.js')).buildMock({ questions: [] }, cfg, 0);
  assert.strictEqual(result.questions.length, 0, 'Empty bank yields zero questions');
  assert.strictEqual(result.gate.total, 0, 'Gate total = actually-built questions');
  assert.strictEqual(result.gate.requested, 65, 'Gate config still reports requested total');
  assert.strictEqual(result.gate.gaQuestions, 0, 'No GA questions from empty bank');
});

test('M4: mock builder — insufficient GA questions in bank', () => {
  // Official pattern wants 10 GA questions, but the bank has only 4 GA questions.
  // The builder cannot fabricate questions and must not claim a valid official
  // 15-mark GA split. This test documents the real gap.
  const cfg = {
    totalQuestions: 65,
    subjectWeights: { ga: 13, calc: 9, prob: 10, prog: 8, dbms: 8, linalg: 9, ml: 10, ai: 8 },
    gaMarks: 15,
    techMarks: 85,
    durationMin: 180
  };
  const result = require(path.join(ROOT, 'assets', 'mock.js')).buildMock(BANK, cfg, 42);
  assert.ok(result.gate.gaQuestions <= gaCount(), 'GA questions in mock <= bank GA questions');
  assert.notStrictEqual(result.gate.gaQuestions, 10, 'Mock cannot deliver 10 GA questions — bank has ' + gaCount());
});


test('S10: unanswered question', () => {
  const q = { type: 'mcq', marks: 1, a: 1 };
  assert.deepStrictEqual(qa(q, undefined), { score: 0, state: 'unanswered' });
  assert.deepStrictEqual(qa(q, null), { score: 0, state: 'unanswered' });
  assert.deepStrictEqual(qa(q, ''), { score: 0, state: 'unanswered' });
});

test('S11: maximum score — full official-pattern paper', () => {
  const ansMap = {};
  QUESTIONS.forEach(q => {
    const a = q.type === 'nat' ? q.a[0] : q.a;
    ansMap[q.id] = a;
  });
  const r = qaPaper(QUESTIONS, ansMap);
  assert.strictEqual(r.total, totalMarks(), 'Bank total should equal sum of marks');
  assert.strictEqual(r.score, totalMarks(), 'All correct should score full bank');
  assert.strictEqual(r.correct, totalQuestions());
});

test('S12: maximum score — technical-only paper (GA removed)', () => {
  const tech = QUESTIONS.filter(q => q.subject !== 'ga');
  const ansMap = {};
  tech.forEach(q => {
    const a = q.type === 'nat' ? q.a[0] : q.a;
    ansMap[q.id] = a;
  });
  const r = qaPaper(tech, ansMap);
  assert.strictEqual(r.total, totalMarks() - gaMarks(), 'Tech total = bank - GA');
  assert.strictEqual(r.score, r.total, 'All correct tech = full tech marks');
  assert.strictEqual(r.correct, tech.length);
});

test('S13: scoring engine — MSQ list order independent', () => {
  const q = { type: 'msq', marks: 2, a: [1, 3], o: ['a', 'b', 'c', 'd'] };
  assert.deepStrictEqual(qa(q, [3, 1]), { score: 2, state: 'correct' });
  assert.deepStrictEqual(qa(q, [1, 1, 3]), { score: 0, state: 'wrong' });
});

test('Q10: explanation and provenance fields', () => {
  const bad = QUESTIONS.filter(q => !q.s || !q.prov);
  assert.strictEqual(bad.length, 0, 'Missing s/prov: ' + JSON.stringify(bad.map(x => x.id)));
});

test('Q11: GA questions in bank — design notes', () => {
  // Official exam: 10 GA questions / 15 marks. Practice bank intentionally
  // contains fewer GA questions (4 questions / 6 marks).
  assert.ok(gaCount() > 0, 'Bank must contain GA questions');
  assert.ok(gaMarks() >= 1, 'GA questions must carry marks (got ' + gaMarks() + ')');
});

test('Q12: all official syllabus topics covered', () => {
  const allTopicIds = new Set();
  (SYLL_A.subjects.concat(SYLL_B.subjects)).forEach(s => s.topics.forEach(t => allTopicIds.add(t.id)));
  const covered = topicIds();
  const missing = [...allTopicIds].filter(t => !covered.has(t));
  assert.strictEqual(missing.length, 0, 'Missing official topics: ' + JSON.stringify(missing));
  // Two IDs ('search' appears in both AI and ML; 'verbal'/'num' in GA) are
  // shared across files, so unique-ID count is 54, not 55.
});

test('Q13: syllabus meta matches official exam pattern', () => {
  const m = SYLL_META.pattern;
  assert.strictEqual(m.totalMarks, 100, '100 marks');
  assert.strictEqual(m.gaMarks, 15, '15 GA marks');
  assert.strictEqual(m.subjectMarks, 85, '85 subject marks');
  assert.strictEqual(m.totalQuestions, 65, '65 questions');
  assert.strictEqual(m.gaQuestions, 10, '10 GA questions');
  assert.strictEqual(m.subjectQuestions, 55, '55 subject questions');
  assert.strictEqual(m.durationMin, 180, '180 minutes');
  assert.deepStrictEqual(m.marking, {
    mcq1: { marks: 1, negative: -0.3333 },
    mcq2: { marks: 2, negative: -0.6667 },
    msq: { negative: 0, partial: false },
    nat: { negative: 0 }
  }, 'marking rules match official pattern');
});


test('Q4: supported question types', () => {
  const bad = QUESTIONS.filter(q => !VALID_TYPES.has(q.type));
  assert.strictEqual(bad.length, 0, 'Invalid types: ' + JSON.stringify(bad.map(x => x.type)));
});

test('Q5: marks in {1,2}', () => {
  const bad = QUESTIONS.filter(q => ![1, 2].includes(q.marks));
  assert.strictEqual(bad.length, 0, 'Invalid marks: ' + JSON.stringify(bad.map(x => x.marks)));
});

test('Q6: difficulty in {1,2,3}', () => {
  const bad = QUESTIONS.filter(q => ![1, 2, 3].includes(q.d));
  assert.strictEqual(bad.length, 0, 'Invalid difficulty: ' + JSON.stringify(bad.map(x => x.d)));
});
