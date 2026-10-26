#!/usr/bin/env node
/**
 * Test Suite: Official GATE DA PYQ Database Integrity
 * Validates data/pyq-da.json covering GATE 2024, 2025, and 2026.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PYQ_PATH = path.join(ROOT, 'data', 'pyq-da.json');

const VALID_SUBJECTS = new Set([
  'ga', 'prob', 'linalg', 'calc', 'prog', 'dbms', 'ml', 'ai'
]);
const VALID_TYPES = new Set(['mcq', 'msq', 'nat']);

test('PYQ 1: file exists and parses as valid JSON', () => {
  assert.ok(fs.existsSync(PYQ_PATH), 'data/pyq-da.json must exist');
  const raw = fs.readFileSync(PYQ_PATH, 'utf-8');
  const data = JSON.parse(raw);
  assert.ok(data && typeof data === 'object');
  assert.ok(Array.isArray(data.papers), 'papers array must be present');
  assert.ok(Array.isArray(data.questions), 'questions array must be present');
});

test('PYQ 2: papers metadata has 2024, 2025, 2026 with 65 questions and 100 marks each', () => {
  const data = JSON.parse(fs.readFileSync(PYQ_PATH, 'utf-8'));
  assert.strictEqual(data.papers.length, 3, 'Must contain 3 papers');

  const paperMap = new Map(data.papers.map(p => [p.year, p]));
  for (const year of [2024, 2025, 2026]) {
    assert.ok(paperMap.has(year), `Missing paper metadata for year ${year}`);
    const p = paperMap.get(year);
    assert.strictEqual(p.total_questions, 65, `${year} must have 65 questions`);
    assert.strictEqual(p.total_marks, 100, `${year} must have exactly 100 marks`);
    assert.ok(p.institute && p.institute.length > 0, `${year} institute must be specified`);
  }
});

test('PYQ 3: total question count is 195 and unique IDs', () => {
  const data = JSON.parse(fs.readFileSync(PYQ_PATH, 'utf-8'));
  assert.strictEqual(data.questions.length, 195, 'Total questions across 3 papers must be 195');

  const ids = new Set();
  for (const q of data.questions) {
    assert.ok(q.id, 'Question must have id');
    assert.ok(!ids.has(q.id), `Duplicate question id found: ${q.id}`);
    ids.add(q.id);
  }
});

test('PYQ 4: each paper has exactly 65 questions numbered 1 through 65', () => {
  const data = JSON.parse(fs.readFileSync(PYQ_PATH, 'utf-8'));
  for (const year of [2024, 2025, 2026]) {
    const yearQs = data.questions.filter(q => q.year === year);
    assert.strictEqual(yearQs.length, 65, `Year ${year} must have 65 questions`);
    const qnos = yearQs.map(q => q.qno).sort((a, b) => a - b);
    for (let i = 1; i <= 65; i++) {
      assert.strictEqual(qnos[i - 1], i, `Year ${year} missing qno ${i}`);
    }

    // Check GA: Q1-Q10 must be subject 'ga'
    const gaQs = yearQs.filter(q => q.qno <= 10);
    assert.strictEqual(gaQs.length, 10);
    for (const q of gaQs) {
      assert.strictEqual(q.subject, 'ga', `Q${q.qno} of ${year} must be 'ga'`);
    }

    // Check marks: Q1-Q5 = 1 mark, Q6-Q10 = 2 marks, Q11-Q35 = 1 mark, Q36-Q65 = 2 marks
    for (const q of yearQs) {
      if ((q.qno >= 1 && q.qno <= 5) || (q.qno >= 11 && q.qno <= 35)) {
        assert.strictEqual(q.marks, 1, `Q${q.qno} of ${year} must be 1 mark`);
      } else {
        assert.strictEqual(q.marks, 2, `Q${q.qno} of ${year} must be 2 marks`);
      }
    }

    const totalMarks = yearQs.reduce((sum, q) => sum + q.marks, 0);
    assert.strictEqual(totalMarks, 100, `Year ${year} total marks must be 100`);
  }
});

test('PYQ 5: valid subject, type, and detailed solution on every question', () => {
  const data = JSON.parse(fs.readFileSync(PYQ_PATH, 'utf-8'));
  for (const q of data.questions) {
    assert.ok(VALID_SUBJECTS.has(q.subject), `Invalid subject: ${q.subject} in ${q.id}`);
    assert.ok(VALID_TYPES.has(q.type), `Invalid type: ${q.type} in ${q.id}`);
    assert.ok(q.s && q.s.trim().length >= 20, `Solution too short in ${q.id}`);
    assert.ok(q.q && q.q.trim().length >= 10, `Question text too short in ${q.id}`);

    if (q.type === 'mcq') {
      assert.ok(Array.isArray(q.o) && q.o.length === 4, `MCQ ${q.id} must have 4 options`);
      assert.ok(Number.isInteger(q.a) && q.a >= 0 && q.a < 4, `MCQ ${q.id} answer index must be 0..3`);
    } else if (q.type === 'msq') {
      assert.ok(Array.isArray(q.o) && q.o.length === 4, `MSQ ${q.id} must have 4 options`);
      assert.ok(Array.isArray(q.a) && q.a.length >= 1 && q.a.length <= 4, `MSQ ${q.id} must have 1-4 answers`);
      for (const idx of q.a) {
        assert.ok(Number.isInteger(idx) && idx >= 0 && idx < 4, `MSQ ${q.id} answer index ${idx} out of range`);
      }
    } else if (q.type === 'nat') {
      assert.ok(Array.isArray(q.a) && q.a.length === 2, `NAT ${q.id} answer must be [min, max]`);
      assert.ok(typeof q.a[0] === 'number' && typeof q.a[1] === 'number', `NAT ${q.id} bounds must be numbers`);
      assert.ok(q.a[0] <= q.a[1], `NAT ${q.id} min bound must be <= max bound`);
    }
  }
});
