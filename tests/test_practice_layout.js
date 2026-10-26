#!/usr/bin/env node
/**
 * Test Suite: gate-ml-practice.html Layout Integrity Test
 * Ensures the practice page is not wrapped in an outer .shell grid that would squish content.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'gate-ml-practice.html');

test('Practice Layout 1: .topbar is not wrapped in .shell', () => {
  const html = fs.readFileSync(FILE, 'utf-8');
  assert.ok(!html.includes('<div class="shell"><header class="topbar">'), 'topbar must not be inside .shell');
  assert.ok(!html.includes('<main class="app-main" id="main"><div class="shell">'), 'body must not wrap topbar and view in .shell');
});

test('Practice Layout 2: main#view exists as top-level content container', () => {
  const html = fs.readFileSync(FILE, 'utf-8');
  assert.match(html, /<main id="view"><\/main>/, 'main#view container must exist');
});

test('Practice Layout 3: no broken .site lines in inline css', () => {
  const html = fs.readFileSync(FILE, 'utf-8');
  assert.ok(!html.includes('.site\n.site'), 'Broken .site CSS artifact must not be present');
});
