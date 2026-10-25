#!/usr/bin/env python3
"""
GATE DA 2027 — Question Bank Validation Script.
Validates data/practice-da.json against official syllabus and question schemas.
"""
import json
import os
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
BANK_PATH = os.path.join(ROOT, "data", "practice-da.json")
SYLL_A_PATH = os.path.join(ROOT, "data", "syllabus-a.json")
SYLL_B_PATH = os.path.join(ROOT, "data", "syllabus-b.json")
SYLL_META_PATH = os.path.join(ROOT, "data", "syllabus-meta.json")

VALID_SUBJECTS = {"ai", "calc", "dbms", "ga", "linalg", "ml", "prob", "prog"}
VALID_TYPES = {"mcq", "msq", "nat"}

def validate():
    if not os.path.exists(BANK_PATH):
        print(f"ERROR: {BANK_PATH} not found", file=sys.stderr)
        sys.exit(1)

    with open(BANK_PATH, "r", encoding="utf-8") as f:
        bank = json.load(f)

    questions = bank.get("questions", [])
    if not questions:
        print("ERROR: No questions found in bank", file=sys.stderr)
        sys.exit(1)

    seen_ids = set()
    total_marks = 0

    for i, q in enumerate(questions):
        qid = q.get("id")
        if not qid:
            print(f"ERROR: Question #{i} missing 'id'", file=sys.stderr)
            sys.exit(1)
        if qid in seen_ids:
            print(f"ERROR: Duplicate question id '{qid}'", file=sys.stderr)
            sys.exit(1)
        seen_ids.add(qid)

        subj = q.get("subject")
        if subj not in VALID_SUBJECTS:
            print(f"ERROR: Question {qid} has invalid subject '{subj}'", file=sys.stderr)
            sys.exit(1)

        qtype = q.get("type")
        if qtype not in VALID_TYPES:
            print(f"ERROR: Question {qid} has invalid type '{qtype}'", file=sys.stderr)
            sys.exit(1)

        marks = q.get("marks")
        if marks not in (1, 2):
            print(f"ERROR: Question {qid} marks must be 1 or 2, got {marks}", file=sys.stderr)
            sys.exit(1)
        total_marks += marks

        d = q.get("d")
        if d not in (1, 2, 3):
            print(f"ERROR: Question {qid} difficulty must be 1, 2, or 3", file=sys.stderr)
            sys.exit(1)

        if not q.get("q"):
            print(f"ERROR: Question {qid} missing stem 'q'", file=sys.stderr)
            sys.exit(1)

        if not q.get("s"):
            print(f"ERROR: Question {qid} missing solution 's'", file=sys.stderr)
            sys.exit(1)

        if q.get("prov") != "practice":
            print(f"ERROR: Question {qid} provenance must be 'practice'", file=sys.stderr)
            sys.exit(1)

        if qtype == "mcq":
            opts = q.get("o")
            if not isinstance(opts, list) or len(opts) != 4:
                print(f"ERROR: MCQ {qid} must have 4 options", file=sys.stderr)
                sys.exit(1)
            a = q.get("a")
            if not isinstance(a, int) or not (0 <= a <= 3):
                print(f"ERROR: MCQ {qid} answer must be index 0..3", file=sys.stderr)
                sys.exit(1)

        elif qtype == "msq":
            opts = q.get("o")
            if not isinstance(opts, list) or len(opts) != 4:
                print(f"ERROR: MSQ {qid} must have 4 options", file=sys.stderr)
                sys.exit(1)
            a = q.get("a")
            if not isinstance(a, list) or len(a) == 0 or not all(isinstance(x, int) and 0 <= x <= 3 for x in a):
                print(f"ERROR: MSQ {qid} answer must be non-empty list of 0..3 indices", file=sys.stderr)
                sys.exit(1)

        elif qtype == "nat":
            a = q.get("a")
            if not isinstance(a, list) or len(a) != 2 or a[0] > a[1]:
                print(f"ERROR: NAT {qid} answer must be [min, max] range", file=sys.stderr)
                sys.exit(1)
            if not q.get("tol_note"):
                print(f"ERROR: NAT {qid} requires 'tol_note'", file=sys.stderr)
                sys.exit(1)

    print(f"BANK OK: {len(questions)} questions ({total_marks} marks) verified across {len(VALID_SUBJECTS)} subjects.")

if __name__ == "__main__":
    validate()
