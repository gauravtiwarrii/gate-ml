#!/usr/bin/env node
/**
 * Test Suite: PYQ Interactive Page Validation
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PYQ_HTML = path.join(ROOT, 'pyq', 'index.html');

test('PYQ Page 1: HTML structure and meta tags exist', () => {
  assert.ok(fs.existsSync(PYQ_HTML), 'pyq/index.html must exist');
  const html = fs.readFileSync(PYQ_HTML, 'utf-8');
  assert.match(html, /<title>GATE DA Previous Year Questions/, 'Title must reference GATE DA PYQs');
  assert.match(html, /data-root="\.\.\/"/, 'Root attribute must be configured');
  assert.match(html, /id="viewPractice"/, 'Practice interactive view must exist');
  assert.match(html, /id="viewGuide"/, 'Guide view must exist');
});

test('PYQ Page 2: Paper selection buttons exist for 2024, 2025, and 2026', () => {
  const html = fs.readFileSync(PYQ_HTML, 'utf-8');
  assert.match(html, /data-year="all"/);
  assert.match(html, /data-year="2025"/);
  assert.match(html, /data-year="2024"/);
  assert.match(html, /data-year="2026"/);
});

test('PYQ Page 3: Live scorecard components exist', () => {
  const html = fs.readFileSync(PYQ_HTML, 'utf-8');
  assert.match(html, /id="statAttempted"/);
  assert.match(html, /id="statCorrect"/);
  assert.match(html, /id="statWrong"/);
  assert.match(html, /id="statScore"/);
  assert.match(html, /id="statAccuracy"/);
});

test('PYQ Page 4: Interactive filters exist for subject, type, and search', () => {
  const html = fs.readFileSync(PYQ_HTML, 'utf-8');
  assert.match(html, /id="filterSubject"/);
  assert.match(html, /id="filterType"/);
  assert.match(html, /id="filterMarks"/);
  assert.match(html, /id="filterSearch"/);
  assert.match(html, /id="pyqQuestionList"/);
});

test('PYQ Page 5: Script fetches data/pyq-da.json with negative marking rules', () => {
  const html = fs.readFileSync(PYQ_HTML, 'utf-8');
  assert.match(html, /fetch\("\.\.\/data\/pyq-da\.json"\)/, 'Must fetch pyq-da.json');
  assert.match(html, /q\.marks \/ 3/, 'Must apply 1/3 negative marking formula for MCQs');
  assert.match(html, /Detailed Solution &amp; Working/, 'Must include solution toggle');
});
