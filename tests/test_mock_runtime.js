// Runtime exam-flow test for mock-da: boots the inline script under a minimal
// DOM stub and drives the real start -> render -> submit -> double-submit path.
// Guards three things the engine-only tests can't see:
//   1. the exam-start path runs with no ReferenceError (helpers must be
//      IIFE-scoped, not nested inside tick()/render()),
//   2. displayed totals match GateDAScore.paper(),
//   3. submitting twice does not duplicate the logged attempt.
// Not a browser test — a Node-level execution check (no browser automation is
// installed in this environment).
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.join(__dirname, '..');

function makeEl(tag) {
  return {
    tagName: tag, innerHTML: '', textContent: '', hidden: false, disabled: false,
    className: '', value: '', type: '', name: '', id: '', step: '', placeholder: '',
    style: {}, dataset: {}, children: [], _handlers: {},
    classList: { add() {}, remove() {}, contains() { return false; } },
    setAttribute() {}, getAttribute() { return null; },
    appendChild(c) { this.children.push(c); return c; },
    addEventListener(t, fn) { (this._handlers[t] = this._handlers[t] || []).push(fn); },
    scrollIntoView() {},
  };
}

// Boot the whole page (assets + inline script) and return the live context.
function bootExam() {
  const elements = Object.create(null);
  const store = Object.create(null);
  const sandbox = {
    console, Math, Date, JSON, Object, Array, Set, Boolean, String, Number,
    parseInt, parseFloat, isNaN, Promise, Error,
    setTimeout: () => 1, clearTimeout: () => {},
    location: { reload() {} },
    fetch: () => Promise.resolve({ ok: true, json: () => Promise.resolve({ questions: [] }) }),
    document: {
      getElementById(id) { if (!elements[id]) elements[id] = makeEl('div'); return elements[id]; },
      createElement(tag) { return makeEl(tag); },
      querySelector() { return null; },
      querySelectorAll() { return []; },
      addEventListener() {}, dispatchEvent() {},
    },
    localStorage: {
      getItem: k => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v); },
      removeItem: k => { delete store[k]; },
    },
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);

  for (const a of ['gateda.js', 'mock.js', 'gateda-score.js']) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'assets', a), 'utf8'), sandbox, { filename: a });
  }

  // Seed a saved paper so boot takes the begin(savedQuestions) path.
  const BANK = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'practice-da.json'), 'utf8'));
  store['gateda.v1.mockq'] = JSON.stringify({ questions: BANK.questions.slice(0, 6) });

  const html = fs.readFileSync(path.join(ROOT, 'mock-da', 'index.html'), 'utf8');
  const m = html.match(/<script>([\s\S]*?)<\/script>/);
  assert.ok(m, 'mock-da must have an inline <script>');
  vm.runInContext(m[1], sandbox, { filename: 'mock-da/index.html' });

  return { sandbox, store, elements, BANK };
}

test('mock-da: exam-start path renders with no ReferenceError', () => {
  const { elements } = bootExam();
  assert.ok(elements['stage'].innerHTML.length > 0, 'render() wrote question HTML');
  assert.ok(/Q1/.test(elements['stage'].innerHTML), 'render() shows the first question');
  assert.ok(elements['pal'].children.length > 0, 'buildPal() populated the palette');
  assert.ok(/\d+ min/.test(elements['cfg-row'].textContent), 'begin() wrote the config summary');
  assert.notStrictEqual(elements['timer'].textContent, '', 'tick() rendered the timer');
});

test('mock-da: displayed totals match engine + double-submit is guarded', () => {
  const { sandbox, store, elements, BANK } = bootExam();
  const qs = BANK.questions.slice(0, 6);
  const expectScore = sandbox.window.GateDAScore.paper(qs, {});
  assert.strictEqual(expectScore.score, 0, 'empty paper scores 0');
  assert.strictEqual(expectScore.unanswered, qs.length, 'all unanswered');

  const submitBtn = elements['submit'];
  assert.ok(submitBtn._handlers.click && submitBtn._handlers.click.length, 'submit wired');
  submitBtn._handlers.click[0]();                       // showConfirm()
  const yesBtn = elements['confirmYes'];
  assert.ok(yesBtn._handlers.click && yesBtn._handlers.click.length, 'confirmYes wired');

  yesBtn._handlers.click[0]();                          // doSubmit() #1
  const res = elements['res'].innerHTML;
  assert.ok(res.includes('/ ' + expectScore.total), 'displayed total matches engine total');
  assert.ok(res.includes('>' + expectScore.unanswered + '<'), 'displayed unanswered matches engine');
  let mocks = JSON.parse(store['gateda.v1.mocks'] || '[]');
  assert.strictEqual(mocks.length, 1, 'one attempt logged after first submit');
  assert.strictEqual(mocks[0].total, expectScore.total, 'logged total matches engine');

  yesBtn._handlers.click[0]();                          // doSubmit() #2 (must be guarded)
  mocks = JSON.parse(store['gateda.v1.mocks'] || '[]');
  assert.strictEqual(mocks.length, 1, 'second submit must NOT duplicate the attempt');
});
