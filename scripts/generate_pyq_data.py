#!/usr/bin/env python3
"""
Generates comprehensive data/pyq-da.json containing all 195 questions from:
- GATE 2024 DA (Official Paper by IISc Bengaluru - 65 Questions)
- GATE 2025 DA (Official Paper by IIT Roorkee - 65 Questions)
- GATE 2026 DA (Official Model Paper by IIT Guwahati - 65 Questions)
Includes complete questions, mathematical notation, options, correct answers,
difficulty, topic, subject categorization matching GATE DA 2027 syllabus,
and step-by-step worked explanations.
"""
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_PATH = os.path.join(ROOT, "data", "pyq-da.json")
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

def build_pyq_database():
    from build_pyq import get_2024_questions
    q2024 = get_2024_questions()
    
    # Import 2025 and 2026 generators
    import build_pyq_2025
    import build_pyq_2026
    
    q2025 = build_pyq_2025.get_2025_questions()
    q2026 = build_pyq_2026.get_2026_questions()
    
    all_qs = q2024 + q2025 + q2026
    
    data = {
        "version": "2024-2026-v1",
        "title": "GATE Data Science & Artificial Intelligence (DA) Official Previous Year Questions",
        "description": "Complete collection of official GATE DA previous year questions (2024, 2025) and official model paper (2026) with detailed worked solutions, topic mapping, and exam marking rules.",
        "papers": [
            {
                "id": "gate-2025",
                "year": 2025,
                "institute": "IIT Roorkee",
                "name": "GATE 2025 Official Question Paper",
                "total_questions": len(q2025),
                "total_marks": sum(q["marks"] for q in q2025)
            },
            {
                "id": "gate-2024",
                "year": 2024,
                "institute": "IISc Bengaluru",
                "name": "GATE 2024 Official Question Paper (Inaugural)",
                "total_questions": len(q2024),
                "total_marks": sum(q["marks"] for q in q2024)
            },
            {
                "id": "gate-2026",
                "year": 2026,
                "institute": "IIT Guwahati",
                "name": "GATE 2026 Official Model Paper",
                "total_questions": len(q2026),
                "total_marks": sum(q["marks"] for q in q2026)
            }
        ],
        "questions": all_qs
    }
    
    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        
    print(f"Successfully generated {OUT_PATH}")
    print(f"Total Papers: {len(data['papers'])}")
    print(f"Total Questions: {len(all_qs)}")
    for p in data["papers"]:
        print(f"  - {p['name']}: {p['total_questions']} Questions, {p['total_marks']} Marks")

if __name__ == "__main__":
    build_pyq_database()
