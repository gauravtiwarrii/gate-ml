#!/usr/bin/env python3
"""
Questions for GATE 2026 DA (IIT Guwahati) — Official Model Paper (Complete 65 Questions)
"""

def get_2026_questions():
    qs = []
    # Q1-Q5 GA 1-mark
    qs.append({
        "id": "DA-2026-Q01", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 1,
        "subject": "ga", "topic": "verbal-analogy", "type": "mcq", "marks": 1, "d": 1, "prov": "gate-2026",
        "q": "Verbosity : Brevity :: Insolence : ___________\nChoose the word that best fills the blank.",
        "o": ["Innocence", "Respect", "Solace", "Wealth"], "a": 1,
        "s": "'Verbosity' (using excessive words) is the antonym of 'Brevity' (conciseness). Similarly, 'Insolence' (rude and disrespectful behavior) is the antonym of 'Respect'."
    })
    qs.append({
        "id": "DA-2026-Q02", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 2,
        "subject": "ga", "topic": "number-properties", "type": "mcq", "marks": 1, "d": 1, "prov": "gate-2026",
        "q": "The product of the digits of a three-digit number is 70. The sum of the digits of this three-digit number is:",
        "o": ["12", "14", "16", "18"], "a": 1,
        "s": "Prime factorize 70 = 2 * 5 * 7. Since each digit of a three-digit number must be an integer between 1 and 9, the digits must be 2, 5, and 7. The sum of the digits is 2 + 5 + 7 = 14."
    })
    qs.append({
        "id": "DA-2026-Q03", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 3,
        "subject": "ga", "topic": "spatial-puzzles", "type": "mcq", "marks": 1, "d": 2, "prov": "gate-2026",
        "q": "The four pieces of a puzzle are shown (consisting of geometric shapes with notches, arcs, and triangular cuts). Which one of the figures labelled as P, Q, R, and S can be constructed by using each of the four pieces only once without overlaps?",
        "o": ["P", "Q", "R", "S"], "a": 1,
        "s": "Analyzing the complementary contours and interior angles of the four puzzle pieces, only figure Q accommodates the arc cutout, triangular wedge, and angled base seamlessly without any overlap or missing area."
    })
    qs.append({
        "id": "DA-2026-Q04", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 4,
        "subject": "ga", "topic": "logarithms", "type": "mcq", "marks": 1, "d": 1, "prov": "gate-2026",
        "q": "Consider two distinct positive real numbers m, n, with m > n. Let x = n^(log10(m)) and y = m^(log10(n)). The relation between x and y is:",
        "o": ["x > y", "x < y", "x = y", "x = log10(y)"], "a": 2,
        "s": "Taking base-10 logarithm of both sides: log10(x) = log10(m) * log10(n) and log10(y) = log10(n) * log10(m). Because real multiplication is commutative, log10(x) = log10(y), which strictly yields x = y."
    })
    qs.append({
        "id": "DA-2026-Q05", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 5,
        "subject": "ga", "topic": "verbal-deduction", "type": "mcq", "marks": 1, "d": 1, "prov": "gate-2026",
        "q": "'If his latest movie had been a commercial success, the actor would have made enough money to sponsor his next movie.' Based only on the above sentence, which one of the following statements is true?",
        "o": [
            "The actor will certainly sponsor his next movie.",
            "His latest movie was a commercial success.",
            "The actor made enough money from his latest movie.",
            "His latest movie was not commercially successful."
        ], "a": 3,
        "s": "The grammatical construction 'If X had been ..., Y would have ...' is a third conditional (counterfactual), which directly implies that condition X did not take place in reality. Therefore, his latest movie was not commercially successful."
    })

    # Q6-Q10 GA 2-mark
    qs.append({
        "id": "DA-2026-Q06", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 6,
        "subject": "ga", "topic": "grammar-prepositions", "type": "mcq", "marks": 2, "d": 1, "prov": "gate-2026",
        "q": "'My friend and I parted __ the door __ the cabin that I had rented __ the night.' Choose the option with the correct sequence of words to fill the blanks.",
        "o": ["at; of; for", "for; at; of", "of; for; in", "in; of; for"], "a": 0,
        "s": "The idiomatic prepositions are: 'parted at the door' (point of location), 'of the cabin' (possessive belonging), and 'rented for the night' (duration of purpose). Sequence: at; of; for."
    })
    qs.append({
        "id": "DA-2026-Q07", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 7,
        "subject": "ga", "topic": "statistics-measures", "type": "mcq", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "Five integers are picked from 0 to 20, with possible repetitions, such that their mean is 12, median is 18, and they have a single mode of 20. Ignoring permutations, the number of ways to pick these five integers is:",
        "o": ["0", "1", "2", "3"], "a": 1,
        "s": "Let sorted integers be x1 <= x2 <= x3 <= x4 <= x5. Mean = 12 => sum = 60. Median x3 = 18. Mode is unique and equals 20, so 20 must appear at least twice: x4 = 20, x5 = 20. Then x1 + x2 + 18 + 20 + 20 = 60 => x1 + x2 = 2. Since 0 <= x1 <= x2: possible pairs are (0, 2) and (1, 1). If {1, 1, 18, 20, 20}, both 1 and 20 appear twice, resulting in a bimodal distribution (contradicting 'single mode'). Hence only {0, 2, 18, 20, 20} is valid, giving exactly 1 way."
    })
    qs.append({
        "id": "DA-2026-Q08", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 8,
        "subject": "ga", "topic": "logic-puzzle", "type": "mcq", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "Rishi and Swathi are students of Class 5. Pavan and Tanvi are students of Class 4. Rishi and Pavan are boys. Swathi and Tanvi are girls. The four students played a total of three games of chess one after another. A player who lost a game did not participate in any more games. It was observed that:\n(i) the first game was the only game where two students of the same class played against each other,\n(ii) the students of Class 5 won more games than the students of Class 4, and\n(iii) the boys won two games and the girls won one game.\nThe student who did not lose any game is:",
        "o": ["Pavan", "Rishi", "Swathi", "Tanvi"], "a": 1,
        "s": "In a 3-game elimination, the undefeated player wins Game 2 and Game 3. Condition (ii) means Class 5 won 2 games and Class 4 won 1 game. Condition (iii) means boys won 2 games and girls won 1 game. Since the champion won 2 games, both wins belong to the same person. Thus the champion must be a boy from Class 5, which uniquely identifies Rishi."
    })
    qs.append({
        "id": "DA-2026-Q09", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 9,
        "subject": "ga", "topic": "number-theory", "type": "mcq", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "P, Q, R, S, X, and Y are distinct single-digit whole numbers taking values from 0 to 9. PQ is a two-digit number with Q in the units place and P in the tens place. Similarly, RS is a two-digit number. It is known that PQ and RS are consecutive numbers and (PQ)^2 + (RS)^2 = XYP, with XYP being a three-digit number. The value of Y is:",
        "o": ["4", "5", "6", "7"], "a": 2,
        "s": "Testing consecutive two-digit integers: 19^2 + 20^2 = 361 + 400 = 761. Here PQ = 19 (P=1, Q=9), RS = 20 (R=2, S=0), and XYP = 761 (X=7, Y=6, P=1). The digits {1, 9, 2, 0, 7, 6} are all distinct whole numbers from 0 to 9. Therefore, Y = 6."
    })
    qs.append({
        "id": "DA-2026-Q10", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 10,
        "subject": "ga", "topic": "geometry-circles", "type": "mcq", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "In a circle of radius 10 cm with center O, points P, Q, and R lie on the circle such that PQ = RQ and angle PQR = 45 deg. The area of the shaded region PQRO is:",
        "o": ["50", "25*sqrt(2)", "50*sqrt(2)", "100"], "a": 2,
        "s": "Because angle PQR = 45 deg at the circumference, central angle POR = 2 * 45 = 90 deg. Quadrilateral PQRO is divided into two congruent triangles OPQ and OQR. In triangle OPQ, OP = OQ = 10 and the angle POQ = 135 deg. Area(OPQ) = (1/2) * 10 * 10 * sin(135 deg) = 50 * (1/sqrt(2)) = 25*sqrt(2). By symmetry, Area(OQR) = 25*sqrt(2). Total area of PQRO = 25*sqrt(2) + 25*sqrt(2) = 50*sqrt(2) cm^2."
    })

    # Q11-Q35 Technical 1-mark
    qs.append({
        "id": "DA-2026-Q11", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 11,
        "subject": "ml", "topic": "pca", "type": "mcq", "marks": 1, "d": 1, "prov": "gate-2026",
        "q": "For a classification problem, Principal Component Analysis (PCA) has been used to reduce the dimensionality of a feature space from 100 to 10. Which of the following options is true about the angle theta between the first and the tenth principal components?",
        "o": ["theta = 0 deg", "theta = 90 deg", "90 deg < theta <= 180 deg", "0 < theta < 90 deg"], "a": 1,
        "s": "Principal components are the eigenvectors of the symmetric empirical covariance matrix corresponding to distinct eigenvalues. By the Spectral Theorem, distinct eigenvectors of a real symmetric matrix are mutually orthogonal, so theta = 90 deg."
    })
    qs.append({
        "id": "DA-2026-Q12", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 12,
        "subject": "ml", "topic": "cross-validation", "type": "mcq", "marks": 1, "d": 1, "prov": "gate-2026",
        "q": "Consider that you are training a classifier for a 10-class classification problem. Each input is represented as a 512-dimensional vector. There are 1000 samples, out of which first 100 will be used for testing. Let Leave-One-Out-Cross-Validation (LOOCV) be used for selection of the classifier model before testing. Which of the following options is the correct number of validation splits that will be generated?",
        "o": ["10", "512", "900", "1000"], "a": 2,
        "s": "The model selection dataset excludes the 100 test samples, leaving 1000 - 100 = 900 training/validation samples. LOOCV on a dataset of size N partitions it into N folds where each fold leaves exactly 1 sample for validation, yielding exactly 900 splits."
    })
    qs.append({
        "id": "DA-2026-Q13", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 13,
        "subject": "ai", "topic": "search-algorithms", "type": "mcq", "marks": 1, "d": 1, "prov": "gate-2026",
        "q": "Which of the following algorithms is NOT an example of uninformed search?",
        "o": ["Breadth First Search", "Depth First Search", "A* Search", "Depth-limited Search"], "a": 2,
        "s": "BFS, DFS, and Depth-limited Search explore state spaces using only step costs and topology without domain knowledge (uninformed). A* uses an evaluation function f(n) = g(n) + h(n) with heuristic h(n), making it an informed search algorithm."
    })
    qs.append({
        "id": "DA-2026-Q14", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 14,
        "subject": "ai", "topic": "first-order-logic", "type": "mcq", "marks": 1, "d": 1, "prov": "gate-2026",
        "q": "Which of the following statements is NOT true? (The names of the predicates are intuitive.)",
        "o": [
            "forall x forall y Classmate(x, y) => Classmate(y, x)",
            "forall x Likes(x, Icecream) => not exists x not Likes(x, Icecream)",
            "\"Each king is a person\" is equivalent to forall x IsKing(x) and IsPerson(x)",
            "\"All humans are mortal\" is equivalent to forall x IsHuman(x) => IsMortal(x)"
        ], "a": 2,
        "s": "\"Each king is a person\" asserts that if anyone is a king, that entity must be a person: forall x (IsKing(x) => IsPerson(x)). Using conjunction 'forall x (IsKing(x) and IsPerson(x))' incorrectly claims every entity in the entire universe is both a king and a person."
    })
    qs.append({
        "id": "DA-2026-Q15", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 15,
        "subject": "prog", "topic": "quicksort-recurrence", "type": "mcq", "marks": 1, "d": 2, "prov": "gate-2026",
        "q": "Consider that the quick sort algorithm is used to sort an array of n distinct randomly ordered elements. In every call, the pivot is chosen as the first element of the current subarray. Let T(n) denote the expected time to sort the array. Assume that the time to partition is linear in the size of the current subarray. Which recurrence correctly represents T(n)?",
        "o": [
            "T(n) = T(1) + T(n - 1) + O(n)",
            "T(n) = T(n/4) + T(3n/4) + O(n)",
            "T(n) = 2T(n/2) + O(n)",
            "T(n) = (1/n) * sum_{k=0}^{n-1} [T(k) + T(n - k - 1)] + O(n)"
        ], "a": 3,
        "s": "With random ordering, the rank of the first element is equally likely to be any integer k in {0, 1, ..., n-1} with probability 1/n. Partitioning leaves subarrays of sizes k and n - k - 1. Taking the expectation yields T(n) = (1/n) sum_{k=0}^{n-1} [T(k) + T(n - k - 1)] + O(n)."
    })
    qs.append({
        "id": "DA-2026-Q16", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 16,
        "subject": "prog", "topic": "python-defaults", "type": "mcq", "marks": 1, "d": 1, "prov": "gate-2026",
        "q": "Consider the given Python program:\ndef append_to_lst(val, lst=[]):\n    lst.append(val)\n    return lst\nprint(append_to_lst(1))\nprint(append_to_lst(2))\nprint(append_to_lst(3, []))\nWhich of the following is the correct output?",
        "o": [
            "[1]\n[2]\n[3]",
            "[1]\n[1, 2]\n[3]",
            "[1]\n[2]\n[1, 2, 3]",
            "[1]\n[1, 2]\n[1, 3]"
        ], "a": 1,
        "s": "In Python, default parameter values are evaluated once when the function is defined. The default list `lst=[]` persists across successive calls that don't pass an argument. Call 1 appends 1 -> [1]. Call 2 appends 2 to the same list -> [1, 2]. Call 3 explicitly passes a new list `[]`, giving [3]."
    })
    qs.append({
        "id": "DA-2026-Q17", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 17,
        "subject": "dbms", "topic": "functional-dependencies", "type": "mcq", "marks": 1, "d": 2, "prov": "gate-2026",
        "q": "Let R(A,B,C,D,E) be a relational schema with functional dependency set F={A -> BC, CD -> E, E -> A}. Which of the following statements is correct?",
        "o": [
            "AD, ED and CD are the only candidate keys of R.",
            "AD and ED are the only candidate keys of R.",
            "A, E and CD are the only candidate keys of R.",
            "A and CD are the only candidate keys of R."
        ], "a": 0,
        "s": "Attribute D does not appear on the right side of any functional dependency, so D must be present in every candidate key. Computing attribute closures: (AD)+ = {A, D, B, C, E} = R; (ED)+ = {E, D, A, B, C} = R; (CD)+ = {C, D, E, A, B} = R. None of their proper subsets contains D and determines R. Hence AD, ED, and CD are the only candidate keys."
    })
    qs.append({
        "id": "DA-2026-Q18", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 18,
        "subject": "dbms", "topic": "data-warehousing", "type": "mcq", "marks": 1, "d": 1, "prov": "gate-2026",
        "q": "Consider that the visualization of a 3-dimensional data cube is showing Sales Quantity for each combination of the attributes Product Type, Month and Country. From this, if we want to further visualize the Sales Quantity for each combination of Product Type, Month and State, which OLAP operation should be performed?",
        "o": ["Slicing", "Dicing", "Roll-up", "Drill-down"], "a": 3,
        "s": "State is a lower (more granular) level of aggregation within the geographic concept hierarchy (Country -> State -> City). Moving from a higher-level summary (Country) to a more detailed level (State) is the Drill-down operation."
    })
    qs.append({
        "id": "DA-2026-Q19", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 19,
        "subject": "prob", "topic": "probability-subsets", "type": "mcq", "marks": 1, "d": 2, "prov": "gate-2026",
        "q": "Let M be a randomly chosen non-empty subset of S = {1, 2, 3, ..., 2026}. Which of the following is the probability that the product of all the elements of M is even?",
        "o": [
            "2^1013(2^1013 - 1)/2^2026",
            "2^1013/2^2026",
            "2^1013(2^1013 - 1)/(2^2026 - 1)",
            "1/(2^2026 - 1)"
        ], "a": 2,
        "s": "S contains 1013 odd numbers and 1013 even numbers. Total non-empty subsets = 2^2026 - 1. The product of elements is odd if and only if all chosen elements are odd; the number of such non-empty subsets is 2^1013 - 1. Thus subsets with even product = (2^2026 - 1) - (2^1013 - 1) = 2^2026 - 2^1013 = 2^1013(2^1013 - 1). Probability = 2^1013(2^1013 - 1) / (2^2026 - 1)."
    })
    qs.append({
        "id": "DA-2026-Q20", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 20,
        "subject": "prob", "topic": "combinatorics", "type": "mcq", "marks": 1, "d": 2, "prov": "gate-2026",
        "q": "Suppose that a computer program provides a non-negative and integer-valued random solution to the equation n1 + n2 + n3 + n4 = 20. Which of the following is the probability that all of n1, n2, n3, n4 in the provided solution are positive?",
        "o": ["C(19, 3) / C(23, 3)", "C(20, 4) / C(24, 4)", "C(20, 3) / C(23, 3)", "C(19, 4) / C(24, 4)"], "a": 0,
        "s": "By stars-and-bars, total non-negative integer solutions to n1 + n2 + n3 + n4 = 20 is C(20 + 4 - 1, 4 - 1) = C(23, 3). For strictly positive integer solutions (ni >= 1), substitute ni = yi + 1 with yi >= 0, giving y1 + y2 + y3 + y4 = 16, which has C(16 + 4 - 1, 4 - 1) = C(19, 3) solutions. Probability = C(19, 3) / C(23, 3)."
    })
    qs.append({
        "id": "DA-2026-Q21", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 21,
        "subject": "linalg", "topic": "matrices-rotation", "type": "mcq", "marks": 1, "d": 1, "prov": "gate-2026",
        "q": "Let M = [[cos theta, -sin theta], [sin theta, cos theta]] be a 2x2 matrix, where theta = 2*pi/5, and I2 is the 2x2 identity matrix. Which of the following options is equal to M^2026?",
        "o": ["M^2", "M", "M^(-1)", "I2"], "a": 1,
        "s": "M represents a 2D counter-clockwise rotation by angle theta. M^k represents rotation by k*theta. For theta = 2*pi/5, M^5 is rotation by 2*pi, so M^5 = I2. 2026 = 5 * 405 + 1, so M^2026 = (M^5)^405 * M^1 = I2 * M = M."
    })
    qs.append({
        "id": "DA-2026-Q22", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 22,
        "subject": "linalg", "topic": "subspaces-geometry", "type": "mcq", "marks": 1, "d": 1, "prov": "gate-2026",
        "q": "Consider a set S1 = {x = (x1, x2, x3)^T in R^3 | x^T x <= 16}. Let S2 be another set which is a subspace of R^3 with dimension two. Which of the following gives the area of S1 intersect S2?",
        "o": ["16*pi", "4*pi", "4*pi^2", "16*pi^2"], "a": 0,
        "s": "S1 is a closed solid sphere of radius r = sqrt(16) = 4 centered at the origin. S2 is a 2D subspace, which geometrically is a plane passing through the origin. The intersection of a sphere centered at the origin with a plane passing through the origin is a circular disk of the exact same radius r = 4. Area = pi * r^2 = pi * 4^2 = 16*pi."
    })
    qs.append({
        "id": "DA-2026-Q23", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 23,
        "subject": "ml", "topic": "algorithm-matching", "type": "mcq", "marks": 1, "d": 1, "prov": "gate-2026",
        "q": "Match each machine learning task with its corresponding algorithm:\nTask:\nT1 - Clustering\nT2 - Classification\nT3 - Sampling\nT4 - Feature Extraction\nAlgorithm:\nA1 - Markov Chain Monte Carlo\nA2 - K-Medoid\nA3 - Linear Discriminant Analysis\nA4 - Naive Bayes",
        "o": [
            "T1:A4, T2:A3, T3:A1, T4:A2",
            "T1:A2, T2:A4, T3:A1, T4:A3",
            "T1:A3, T2:A4, T3:A1, T4:A2",
            "T1:A4, T2:A2, T3:A1, T4:A3"
        ], "a": 1,
        "s": "Clustering (T1) -> K-Medoid (A2). Classification (T2) -> Naive Bayes (A4). Sampling (T3) -> MCMC (A1). Feature Extraction / Dimensionality Reduction (T4) -> LDA (A3). Correct match: T1:A2, T2:A4, T3:A1, T4:A3."
    })
    qs.append({
        "id": "DA-2026-Q24", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 24,
        "subject": "ai", "topic": "propositional-entailment", "type": "msq", "marks": 1, "d": 1, "prov": "gate-2026",
        "q": "Sentence X is said to entail Sentence Y if whenever X is TRUE, Y also must hold TRUE. Which of the following statements is/are correct if X entails Y?",
        "o": ["X => Y", "X and not Y is FALSE", "if X then Y", "if Y then X"], "a": [0, 1, 2],
        "s": "By definition of semantic entailment (X |= Y): whenever X is true, Y is true. Thus the implication X => Y is valid (always true), which means X and not Y is unsatisfiable (FALSE). In natural language, this translates to 'if X then Y'. 'if Y then X' denotes the converse, which is not guaranteed."
    })
    qs.append({
        "id": "DA-2026-Q25", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 25,
        "subject": "prog", "topic": "binary-trees", "type": "msq", "marks": 1, "d": 2, "prov": "gate-2026",
        "q": "You are given the following Pre-order and In-order traversals of a Binary Tree T with nodes E, F, G, P, Q, R, S:\nPre-order: P Q S E R F G\nIn-order: S Q E P F R G\nWhich of the following statements is/are true about the Binary Tree T?",
        "o": [
            "Node P is the root of T",
            "The Post-order traversal of T is: S E Q F G R P",
            "Node Q has only one child",
            "The left subtree of node R contains the node G"
        ], "a": [0, 1],
        "s": "Root is P (first in pre-order). In-order partitions: Left subtree {S, Q, E}, Right subtree {F, R, G}. For left subtree: pre-order Q S E, in-order S Q E -> Q is root, S is left child, E is right child (Q has two children, so (C) is false). For right subtree: pre-order R F G, in-order F R G -> R is root, F is left child, G is right child (G is in right subtree, so (D) is false). Post-order traversal visits left-right-root: S E Q F G R P. Statements (A) and (B) are true."
    })
    qs.append({
        "id": "DA-2026-Q26", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 26,
        "subject": "dbms", "topic": "integrity-constraints", "type": "msq", "marks": 1, "d": 1, "prov": "gate-2026",
        "q": "Consider two relations r and s defined on the relational schemas R(A,B) and S(E,C), respectively. A is the primary key of R and E is a foreign key of S referencing A in R. Which of the following operations will NEVER violate the foreign key constraint?",
        "o": [
            "Inserting records into relation r",
            "Deleting records from relation s",
            "Deleting records from relation r",
            "Inserting records into relation s"
        ], "a": [0, 1],
        "s": "Inserting into the referenced relation r only adds potential target keys, which cannot violate referential integrity. Deleting from the referencing relation s removes child references, which also cannot violate foreign key constraints. In contrast, deleting from r or inserting into s can create dangling references."
    })
    qs.append({
        "id": "DA-2026-Q27", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 27,
        "subject": "calc", "topic": "functions-extrema", "type": "msq", "marks": 1, "d": 2, "prov": "gate-2026",
        "q": "Let f(x) = x^3 - 3x^2 + 2 be a function defined on (-1, 3]. Which of the following statements is/are correct?",
        "o": [
            "f(x) has exactly two roots in [-0.9, 0].",
            "f(x) has a minimum at 2 only.",
            "f(x) has maximum at 0 only.",
            "f(x) has a root at 1."
        ], "a": [1, 2, 3],
        "s": "f'(x) = 3x^2 - 6x = 3x(x - 2) = 0 => critical points at x = 0 and x = 2. f''(0) = -6 < 0 (local maximum at 0 with f(0)=2); f''(2) = 6 > 0 (local minimum at 2 with f(2)=-2). f(1) = 1 - 3 + 2 = 0, so 1 is a root. In [-0.9, 0], f'(x) > 0 so f is strictly increasing; f(-0.9) < 0 and f(0) = 2 > 0 implies exactly ONE root, not two."
    })
    qs.append({
        "id": "DA-2026-Q28", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 28,
        "subject": "prob", "topic": "distributions", "type": "msq", "marks": 1, "d": 2, "prov": "gate-2026",
        "q": "Suppose a random variable Z follows Normal(mu = 0, sigma^2 = 1) with pdf g(z) and cdf G(z). Another random variable Y follows t1 distribution (standard Cauchy) with pdf h(y) and cdf H(y). Let c be the positive real number for which g(c) = h(c). Which of the following statements is/are correct?",
        "o": ["G(0) = H(0)", "G(c) < H(c)", "G(-c) < H(-c)", "g(0) = h(0)"], "a": [0, 2],
        "s": "Both distributions are symmetric about 0, so G(0) = H(0) = 0.5. At 0, g(0) = 1/sqrt(2*pi) ~= 0.3989 while h(0) = 1/pi ~= 0.3183, so g(0) != h(0). For 0 < x < c, g(x) > h(x), so G(c) > H(c). By symmetry G(-c) = 1 - G(c) < 1 - H(c) = H(-c). Statements (A) and (C) are correct."
    })
    qs.append({
        "id": "DA-2026-Q29", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 29,
        "subject": "ml", "topic": "sgd-updates", "type": "nat", "marks": 1, "d": 1, "prov": "gate-2026",
        "q": "Consider that for a supervised learning task, the objective function being minimized is fw(x) = wx, where x in R is the input and w in R is the parameter. Stochastic Gradient Descent with learning rate of 0.10 is used for parameter updates. Suppose that at the end of iteration i, the value of w becomes 10.00. Let x = 10.00 be the input for iteration (i + 1). The value of w at the end of iteration (i + 1) is: (Rounded off to two decimal places)",
        "a": [9.0, 9.0],
        "s": "The gradient of fw(x) with respect to w is d(wx)/dw = x. The SGD update rule is w_{i+1} = w_i - eta * x. Given w_i = 10.00, eta = 0.10, and x = 10.00: w_{i+1} = 10.00 - 0.10 * 10.00 = 10.00 - 1.00 = 9.00."
    })
    qs.append({
        "id": "DA-2026-Q30", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 30,
        "subject": "ai", "topic": "minimax", "type": "nat", "marks": 1, "d": 1, "prov": "gate-2026",
        "q": "Consider the game tree for a two-player turn-taking minimax game. MAX starts at root with strategies 1, 2, 3. MIN then plays with strategies 1, 2, 3. Terminal utilities: under branch 1: (8, 6, -1); under branch 2: (1, 5, 7); under branch 3: (-4, -3, -12). Both players choose optimal strategies. At the root, the best strategy for MAX is: (Answer in integer)",
        "a": [2, 2],
        "s": "MIN minimizes utility: Branch 1 evaluates to min(8, 6, -1) = -1. Branch 2 evaluates to min(1, 5, 7) = 1. Branch 3 evaluates to min(-4, -3, -12) = -12. MAX chooses the branch maximizing value: max(-1, 1, -12) = 1, which corresponds to strategy 2."
    })
    qs.append({
        "id": "DA-2026-Q31", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 31,
        "subject": "prog", "topic": "binary-search", "type": "nat", "marks": 1, "d": 1, "prov": "gate-2026",
        "q": "Let A be a sorted array containing 1000 distinct integers. You perform a recursive binary search on A to find an element y. Suppose each comparison checks whether the middle element computed during the current recursive step is equal to, less than, or greater than y. The maximum number of comparisons that may have to be performed if y is not an element of A is: (Answer in integer)",
        "a": [10, 10],
        "s": "The maximum recursion depth for binary search on an array of size n = 1000 is ceil(log2(n + 1)) = ceil(log2(1001)) = 10. An unsuccessful search reaches the deepest leaf of the decision tree, requiring exactly 10 comparisons."
    })
    qs.append({
        "id": "DA-2026-Q32", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 32,
        "subject": "dbms", "topic": "b-plus-trees", "type": "nat", "marks": 1, "d": 2, "prov": "gate-2026",
        "q": "In a relational database, a B+ Tree Index is constructed on a key field. Node size = 4096 bytes, Node Pointer size = 10 bytes, Search Key Field size = 11 bytes and Data Record Pointer size = 12 bytes. The maximum number of Node Pointers that can be present in a non-leaf node of the B+ Tree is: (Answer in integer)",
        "a": [195, 195],
        "s": "In a non-leaf node of order p, there are p node pointers and (p - 1) search keys. Data record pointers are only stored in leaf nodes. The constraint is: p * 10 + (p - 1) * 11 <= 4096 => 21p - 11 <= 4096 => 21p <= 4107 => p <= 195.57. Hence maximum node pointers = 195."
    })
    qs.append({
        "id": "DA-2026-Q33", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 33,
        "subject": "prob", "topic": "involutions", "type": "nat", "marks": 1, "d": 2, "prov": "gate-2026",
        "q": "The number of bijections f(.) from the set S = {1, 2, 3, 4} to itself such that f(f(n)) = n for all n in S, is: (Answer in integer)",
        "a": [10, 10],
        "s": "A bijection with f(f(n)) = n is an involution (permutation whose square is identity). Its cycle decomposition contains only 1-cycles (fixed points) and 2-cycles (transpositions): (1) 0 transpositions: 1 way. (2) 1 transposition: C(4, 2) = 6 ways. (3) 2 disjoint transpositions: 4! / (2! * 2! * 2!) = 3 ways. Total = 1 + 6 + 3 = 10."
    })
    qs.append({
        "id": "DA-2026-Q34", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 34,
        "subject": "prob", "topic": "exponential-memoryless", "type": "nat", "marks": 1, "d": 1, "prov": "gate-2026",
        "q": "Let X be an exponentially distributed random variable with mean lambda (> 0). If P(X > 5) = 0.35, then the conditional probability P(X > 10 | X > 5) is: (Rounded off to two decimal places)",
        "a": [0.35, 0.35],
        "s": "By the memoryless property of the exponential distribution, P(X > s + t | X > t) = P(X > s) for all s, t >= 0. Here t = 5 and s = 5, so P(X > 10 | X > 5) = P(X > 5) = 0.35."
    })
    qs.append({
        "id": "DA-2026-Q35", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 35,
        "subject": "calc", "topic": "infinite-series", "type": "nat", "marks": 1, "d": 1, "prov": "gate-2026",
        "q": "The value of sum_{i=0}^infinity sum_{j=1}^infinity 2^(-i) * 3^(-j) is: (Answer in integer)",
        "a": [1, 1],
        "s": "The double sum separates into product of two geometric series: (sum_{i=0}^infinity (1/2)^i) * (sum_{j=1}^infinity (1/3)^j). The first series = 1 / (1 - 1/2) = 2. The second series = (1/3) / (1 - 1/3) = (1/3) / (2/3) = 1/2. Product = 2 * (1/2) = 1."
    })

    # Q36-Q65 Technical 2-mark
    qs.append({
        "id": "DA-2026-Q36", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 36,
        "subject": "ml", "topic": "hierarchical-clustering", "type": "mcq", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "Let four points in three-dimensional space be: P1: [2, 3, -1], P2: [3, 1, 1], P3: [5, -2, 3] and P4: [3, 3, 3]. Hierarchical Agglomerative Clustering is used to cluster the above points. If Manhattan Distance is used as the distance metric during clustering, which of the following options indicates the two points that will be merged first?",
        "o": ["P1, P2", "P2, P3", "P3, P4", "P2, P4"], "a": 3,
        "s": "Pairwise Manhattan distances: d(P1, P2) = |2-3|+|3-1|+|-1-1| = 1+2+2 = 5. d(P1, P4) = |2-3|+|3-3|+|-1-3| = 1+0+4 = 5. d(P2, P4) = |3-3|+|1-3|+|1-3| = 0+2+2 = 4. d(P2, P3) = 2+3+2 = 7; d(P3, P4) = 2+5+0 = 7. The minimum distance is d(P2, P4) = 4, so P2 and P4 are merged first."
    })
    qs.append({
        "id": "DA-2026-Q37", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 37,
        "subject": "ml", "topic": "ridge-regression", "type": "mcq", "marks": 2, "d": 1, "prov": "gate-2026",
        "q": "Which of the following statements is true for Ridge Regression?",
        "o": [
            "The regularizer in the objective function of Ridge Regression is used to guard against scenarios where the model works well for the test data, but poorly for the training data.",
            "The regularizer of Ridge Regression uses L1 norm.",
            "Ridge Regression aims to reduce the number of parameters that have negative values.",
            "The regularizer of Ridge Regression may increase the bias of the model, but it helps in reducing the variance in predictions."
        ], "a": 3,
        "s": "Ridge regression introduces an L2 penalty on the weights (lambda * ||w||_2^2). By shrinking coefficient magnitudes towards zero, it trades off a slight increase in model bias for a substantial decrease in variance, preventing overfitting and mitigating multicollinearity."
    })
    qs.append({
        "id": "DA-2026-Q38", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 38,
        "subject": "ai", "topic": "propositional-logic", "type": "mcq", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "Assume that a Creative (C) person will Succeed (S) if the person is also Disciplined (D), but will not succeed otherwise. Now, consider the following statements:\n(i) C and S <=> D\n(ii) C => (S <=> D)\n(iii) C <=> ((D => S) or not S)\nWhich of the following options is correct?",
        "o": ["Both (i) and (ii) are TRUE", "Only (ii) is TRUE", "Both (ii) and (iii) are TRUE", "Only (iii) is TRUE"], "a": 1,
        "s": "Given premise: For a creative person (C is True), they succeed if and only if they are disciplined, so S <=> D. When C is False, success is unspecified or not tied to D. Thus C => (S <=> D) accurately captures the conditional behavior. Statement (i) falsely restricts D when C is False. Hence only (ii) is TRUE."
    })
    qs.append({
        "id": "DA-2026-Q39", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 39,
        "subject": "prog", "topic": "recursion-stack", "type": "mcq", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "A recursive function in Python is given:\ndef mystery(n):\n    if n <= 0:\n        return 1\n    else:\n        return mystery(n-1) + mystery(n-2)\nWhich option denotes the total number of function calls (including the initial call) to compute mystery(4)?",
        "o": ["5", "9", "15", "17"], "a": 2,
        "s": "Let C(n) be the number of calls for mystery(n). For n <= 0, C(n) = 1. For n > 0, C(n) = 1 + C(n-1) + C(n-2). C(1) = 1 + C(0) + C(-1) = 1 + 1 + 1 = 3. C(2) = 1 + C(1) + C(0) = 1 + 3 + 1 = 5. C(3) = 1 + C(2) + C(1) = 1 + 5 + 3 = 9. C(4) = 1 + C(3) + C(2) = 1 + 9 + 5 = 15 calls."
    })
    qs.append({
        "id": "DA-2026-Q40", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 40,
        "subject": "prog", "topic": "graph-reachability", "type": "mcq", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "Consider a directed graph G = (V, E) without self-loops. Let G^R be the graph obtained by reversing the directions of all edges in G. Which of the following statements must always be true, regardless of the structure of G?",
        "o": [
            "If u is a reachable vertex in the BFS of G^R from v, then u is also a reachable vertex in the DFS of G from v.",
            "In G^R, the BFS traversal from v will visit exactly the same set of vertices as the DFS from v in G.",
            "The order of vertices visited in the BFS of G^R from v is the reverse of the order of vertices visited in the DFS of G from v.",
            "If u is a reachable vertex in the DFS of G from v, then v is also a reachable vertex in the BFS of G^R from u."
        ], "a": 3,
        "s": "If u is reachable from v in G, there exists a directed path v = w0 -> w1 -> ... -> wk = u in G. In G^R, every edge is reversed, so wk -> ... -> w1 -> w0 is a valid directed path from u to v in G^R. BFS from u in G^R explores all reachable vertices, so it will always visit v."
    })
    qs.append({
        "id": "DA-2026-Q41", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 41,
        "subject": "dbms", "topic": "b-plus-tree-insert", "type": "mcq", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "Consider a B+ Tree where max keys per leaf is 2 and max pointers per non-leaf is 3. Root contains keys [5, 8] with leaves [1, 5], [7, 8], [9, 12]. Which option denotes the key value(s) stored in the root node after inserting key 3?",
        "o": ["5", "8", "3 and 5", "3, 5 and 8"], "a": 0,
        "s": "Inserting 3 into leaf [1, 5] causes overflow ([1, 3, 5]). Leaf splits into [1, 3] and [5], pushing 3 to the parent. The root already contains [5, 8], so adding 3 makes it [3, 5, 8] (overflow, max keys is 2). The root splits: middle key 5 is pushed up to become the new single-key root [5]."
    })
    qs.append({
        "id": "DA-2026-Q42", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 42,
        "subject": "dbms", "topic": "relational-algebra", "type": "mcq", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "Consider relations X(P,Q,R), Y(P,Q,S) and Z(P,T). Expression: Pi_{P,R,S}[(sigma_{Q='Q3' or R='R2'}[X |><| Y]) |><| (sigma_{S > 1}[Y |><| Z])]. Which option is the correct output?",
        "o": [
            "Two rows (P1, R1, 2) and (P1, R1, 5)",
            "Three rows (P1, R1, 2), (P1, R1, 5) and (P2, R2, 6)",
            "One row (P1, R1, 2)",
            "Zero rows"
        ], "a": 0,
        "s": "From Y |><| Z: Z contains P1, P3, P4. P2 is not in Z, so P2 is eliminated from (sigma_{S > 1}[Y |><| Z]). For P1: Y has (P1, Q1, 2) and (P1, Q2, 5), both S > 1. In X |><| Y, condition Q='Q3' or R='R2' matches P3 (Q3) and P2/P3 (R2), but the subsequent natural join on (P, Q, S) filters to consistent P-tuples. Evaluating across the relations yields exactly two rows: (P1, R1, 2) and (P1, R1, 5)."
    })
    qs.append({
        "id": "DA-2026-Q43", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 43,
        "subject": "dbms", "topic": "concept-hierarchies", "type": "mcq", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "Consider three concept hierarchies: Time (Year -> Month -> Day), Location (Country -> State -> City), and Item (Category -> Type -> Item). Which option denotes the total number of possible data cuboids?",
        "o": ["4^3", "2^3", "2!", "4!"], "a": 0,
        "s": "Each dimension hierarchy has 3 explicit levels plus the top 'ALL' level, giving 3 + 1 = 4 levels per dimension. In a lattice of cuboids, a cuboid corresponds to selecting one level from each dimension independently. Total cuboids = 4 * 4 * 4 = 4^3 = 64."
    })
    qs.append({
        "id": "DA-2026-Q44", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 44,
        "subject": "prob", "topic": "variance-transform", "type": "mcq", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "Let X and Y be two independent random variables. X follows Bernoulli(p = 0.3) and Y follows Normal(mu = 0, sigma^2 = 100). Which of the following options is the variance of (2X - 1)Y?",
        "o": ["100", "90", "49", "21"], "a": 0,
        "s": "Notice that for any Bernoulli variable X in {0, 1}, the expression 2X - 1 takes values in {-1, +1}. Therefore (2X - 1)^2 = 1 with probability 1! Because X and Y are independent: Var((2X - 1)Y) = E[((2X - 1)Y)^2] - (E[(2X - 1)Y])^2 = E[(2X - 1)^2] * E[Y^2] - (E[2X - 1] * E[Y])^2 = 1 * 100 - 0 = 100."
    })
    qs.append({
        "id": "DA-2026-Q45", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 45,
        "subject": "calc", "topic": "limits-clt", "type": "mcq", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "Evaluate L = lim_{n -> infinity} sum_{k=0}^n (e^(-n) * n^k) / k!. Which of the following is the value of L?",
        "o": ["0.5", "1.0", "0", "e^(-1)"], "a": 0,
        "s": "The term sum_{k=0}^n (e^(-n) * n^k) / k! equals P(Kn <= n) where Kn ~ Poisson(n). Mean of Kn is n and variance is n. By the Central Limit Theorem, (Kn - n)/sqrt(n) converges in distribution to standard normal N(0, 1). Thus lim_{n -> infinity} P(Kn <= n) = lim P((Kn - n)/sqrt(n) <= 0) = Phi(0) = 0.5."
    })
    qs.append({
        "id": "DA-2026-Q46", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 46,
        "subject": "linalg", "topic": "eigenvalues-trace", "type": "mcq", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "Let gamma1, gamma2, gamma3 be the eigenvalues of the matrix [[1, 0, 0], [0, cos t, sin t], [0, -sin t, cos t]], where t in [-pi, pi]. Which option lists all possible values of t satisfying gamma1 + gamma2 + gamma3 = 1 + sqrt(2)?",
        "o": [
            "{pi/3, -pi/4}",
            "{pi/4, -pi/3}",
            "{pi/4, -pi/4}",
            "{pi/3, -pi/3}"
        ], "a": 2,
        "s": "The sum of the eigenvalues of any matrix equals its trace. Trace = 1 + cos t + cos t = 1 + 2 cos t. Equating to 1 + sqrt(2): 1 + 2 cos t = 1 + sqrt(2) => cos t = sqrt(2)/2 = 1/sqrt(2). For t in [-pi, pi], the solutions are t = pi/4 and t = -pi/4."
    })
    qs.append({
        "id": "DA-2026-Q47", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 47,
        "subject": "ml", "topic": "classification-metrics", "type": "msq", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "20 stories of Author X and 10 stories of Author Y were classified. Out of X's stories, 6 were classified as Y (14 classified as X). Out of Y's stories, 2 were classified as X (8 classified as Y). Which statements are true?",
        "o": [
            "Accuracy of the classifier is 11/15.",
            "Precision of Class X is higher than the Precision of Class Y.",
            "Recall of Class X is higher than the Recall of Class Y.",
            "Accuracy of the classifier is 14/15."
        ], "a": [0, 1],
        "s": "Total stories = 30. Correct predictions = 14 + 8 = 22. Accuracy = 22/30 = 11/15. Precision(X) = 14 / (14 + 2) = 14/16 = 0.875. Precision(Y) = 8 / (8 + 6) = 8/14 = 0.571, so Precision(X) > Precision(Y). Recall(X) = 14/20 = 0.70 while Recall(Y) = 8/10 = 0.80, so Recall(X) < Recall(Y). Statements (A) and (B) are true."
    })
    qs.append({
        "id": "DA-2026-Q48", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 48,
        "subject": "ai", "topic": "fol-validity", "type": "msq", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "Let P(x) be a predicate. Which of the following statements is/are NOT valid in first-order logic?",
        "o": [
            "forall x P(x) => exists x P(x)",
            "exists x P(x) => forall x P(x)",
            "exists x P(x) <=> forall x P(x)",
            "forall x P(x) => exists x not P(x)"
        ], "a": [1, 2, 3],
        "s": "In FOL with non-empty domains, 'forall x P(x) => exists x P(x)' is valid. However, existence does not imply universality (exists x P(x) does not imply forall x P(x)), so (B) and (C) are invalid. 'forall x P(x) => exists x not P(x)' is self-contradictory and invalid. Hence (B), (C), and (D) are NOT valid."
    })
    qs.append({
        "id": "DA-2026-Q49", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 49,
        "subject": "prog", "topic": "sorting-comparisons", "type": "msq", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "Consider sorting array P = [1, 2, 3, 5, 4] using Bubble Sort (N1 comparisons) and Insertion Sort (N2 comparisons). Which of the following options is/are correct?",
        "o": [
            "N1 = 10, N2 = 4",
            "N1 > N2",
            "IS on P will perform only one swap",
            "Both BS and IS on P will make at least one unnecessary comparison (i.e., comparing elements that are already in correct order)"
        ], "a": [1, 2, 3],
        "s": "Standard Bubble Sort performs n(n-1)/2 = 10 comparisons. Insertion Sort inserts 1 (0), 2 (1), 3 (1), 5 (1), and 4 (2 comparisons: 4 < 5, 4 > 3), giving N2 = 5 comparisons. Thus N1 > N2. Only elements 5 and 4 are swapped once in IS. Both algorithms compare already-sorted elements (e.g., 1 with 2, 2 with 3). Statements (B), (C), (D) are correct."
    })
    qs.append({
        "id": "DA-2026-Q50", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 50,
        "subject": "prog", "topic": "python-closures", "type": "msq", "marks": 2, "d": 1, "prov": "gate-2026",
        "q": "Consider the given Python program:\ndef outer():\n    x = []\n    def inner(val):\n        x.append(val)\n        return x\n    return inner\nf1 = outer()\nf2 = outer()\nprint(f1(10)) # Line P\nprint(f1(20)) # Line Q\nprint(f2(30)) # Line R\nprint(f1(40)) # Line S\nWhich of the following options is/are correct?",
        "o": [
            "f1 and f2 share the same list x",
            "Output of Line Q is [10, 20]",
            "Output of Line R is [10, 20, 30]",
            "Output of Line S is [10, 20, 40]"
        ], "a": [1, 3],
        "s": "Each invocation of outer() creates a distinct closure with its own fresh list x. f1 maintains its own list: f1(10) -> [10], f1(20) -> [10, 20], f1(40) -> [10, 20, 40]. f2 maintains a separate list: f2(30) -> [30]. Therefore, statements (B) and (D) are correct."
    })
    qs.append({
        "id": "DA-2026-Q51", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 51,
        "subject": "dbms", "topic": "sql-queries", "type": "mcq", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "Given Employee(EmpID, TeamID), display EmpID and the size of their team (TeamSize). Which SQL query correctly produces this result?",
        "o": [
            "SELECT E.EmpID, B.TeamSize FROM Employee AS E, (SELECT TeamID, COUNT(TeamID) AS TeamSize FROM Employee GROUP BY TeamID) AS B WHERE E.TeamID = B.TeamID",
            "SELECT A.EmpID, COUNT(B.TeamID) AS TeamSize FROM Employee AS A, Employee AS B WHERE A.TeamID = B.TeamID AND A.EmpID = B.EmpID GROUP BY A.EmpID",
            "SELECT B.EmpID, B.TeamSize FROM (SELECT EmpID, COUNT(TeamID) AS TeamSize FROM Employee GROUP BY EmpID) AS B",
            "SELECT A.EmpID, B.TeamSize FROM Employee AS A, (SELECT COUNT(TeamID) AS TeamSize FROM Employee GROUP BY TeamID) AS B WHERE A.TeamID = B.TeamID"
        ], "a": 0,
        "s": "Query (A) pre-aggregates team counts by grouping by TeamID in derived table B, and joins it back to the original Employee table on TeamID, correctly outputting each employee's ID alongside their team's total size."
    })
    qs.append({
        "id": "DA-2026-Q52", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 52,
        "subject": "linalg", "topic": "projection-centering", "type": "msq", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "Let M = (In - (1/n) * 1 1^T) where 1 = (1, 1, ..., 1)^T in R^n and In is identity. Which of the following options is/are correct?",
        "o": ["M^T = M", "M^2 = In", "Trace(M) = n", "M is a projection matrix"], "a": [0, 3],
        "s": "M is the centering matrix. (1) M is symmetric: M^T = M. (2) M is idempotent: M^2 = M (it projects onto the orthogonal complement of the all-ones vector), so M is an orthogonal projection matrix. Trace(M) = Trace(In) - (1/n)Trace(1 1^T) = n - (1/n)(n) = n - 1 != n. Statements (A) and (D) are correct."
    })
    qs.append({
        "id": "DA-2026-Q53", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 53,
        "subject": "prob", "topic": "normal-chi-square", "type": "msq", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "Let X1, ..., Xn be n independent N(0, 1) random variables. Let X_bar = (1/n) sum X_i. Which statements are correct?",
        "o": [
            "sum_{i=1}^n X_i^2 follows Chi-square distribution with n degrees of freedom.",
            "sum_{i=1}^n (X_i - X_bar)^2 follows Chi-square distribution with (n - 1) degrees of freedom.",
            "X1^2 + Xn^2 follows exponential distribution with mean 2.",
            "(sqrt(n) * X_bar)^2 follows Chi-square distribution with 2 degrees of freedom."
        ], "a": [0, 1, 2],
        "s": "Sum of squares of n standard normals is Chi-square(n). By Cochran's theorem, sum (X_i - X_bar)^2 is Chi-square(n-1). X1^2 + Xn^2 is Chi-square(2), which is identical to an Exponential distribution with parameter lambda = 1/2 and mean 1/lambda = 2. (sqrt(n) * X_bar)^2 is Chi-square with 1 degree of freedom, not 2."
    })
    qs.append({
        "id": "DA-2026-Q54", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 54,
        "subject": "prob", "topic": "discrete-cdf", "type": "msq", "marks": 2, "d": 1, "prov": "gate-2026",
        "q": "Let X be a discrete valued random variable with cumulative distribution function F(x). Which of the following statements is/are correct?",
        "o": [
            "F(x) is always a positive function.",
            "F(x) is a non-decreasing function.",
            "F(x) has jump discontinuity.",
            "F(x) is a left continuous function."
        ], "a": [1, 2],
        "s": "Every CDF is non-decreasing: x1 <= x2 => F(x1) <= F(x2). For a discrete random variable, F(x) is a step function with jump discontinuities at each point in the support where P(X = x) > 0. By convention, CDFs are right-continuous, not left-continuous, and F(x) can be 0 for values below the support."
    })
    qs.append({
        "id": "DA-2026-Q55", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 55,
        "subject": "ml", "topic": "ridge-mae", "type": "nat", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "Linear Ridge Regression is used with prediction function y_pred = w^T x, with Mean Absolute Error (MAE) and regularizer weight 0.20. Parameter w = [-3.00, 4.00]^T and test input x = [1.00, 2.00]^T. The true relation is y_true = x1 + x2. The value of the overall regularized loss function for this instance is: (Rounded off to two decimal places)",
        "a": [7.0, 7.0],
        "s": "y_pred = (-3.00)(1.00) + (4.00)(2.00) = -3 + 8 = 5.00. y_true = 1.00 + 2.00 = 3.00. MAE loss = |y_true - y_pred| = |3.00 - 5.00| = 2.00. Ridge regularizer penalty = lambda * ||w||_2^2 = 0.20 * ((-3)^2 + 4^2) = 0.20 * 25 = 5.00. Total regularized loss = 2.00 + 5.00 = 7.00."
    })
    qs.append({
        "id": "DA-2026-Q56", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 56,
        "subject": "ml", "topic": "mlp-parameters", "type": "nat", "marks": 2, "d": 1, "prov": "gate-2026",
        "q": "Consider a fully-connected feed-forward multi-layer perceptron. It has 30 neurons in the input layer, followed by two hidden layers and an output layer. The first hidden layer has 4 neurons and the second hidden layer has 3 neurons. The output layer has only one neuron. Assume that no bias parameters are used. The number of learnable parameters is: (Answer in integer)",
        "a": [135, 135],
        "s": "Layer weights with no bias: Input to Hidden 1: 30 * 4 = 120 weights. Hidden 1 to Hidden 2: 4 * 3 = 12 weights. Hidden 2 to Output: 3 * 1 = 3 weights. Total learnable parameters = 120 + 12 + 3 = 135."
    })
    qs.append({
        "id": "DA-2026-Q57", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 57,
        "subject": "prob", "topic": "bayes-theorem", "type": "nat", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "A clinic specializes in testing for disease D. P(D) = 0.30. If a person has D, test is positive 80% of the time. If not suffering from D, test is positive 10% of the time. If a person tests positive, the probability that they actually suffer from D is: (Rounded off to two decimal places)",
        "a": [0.77, 0.77],
        "s": "By Bayes' theorem: P(+) = P(D)P(+|D) + P(D')P(+|D') = 0.30 * 0.80 + 0.70 * 0.10 = 0.24 + 0.07 = 0.31. P(D|+) = (P(D)P(+|D)) / P(+) = 0.24 / 0.31 = 24 / 31 ~= 0.7742. Rounded to two decimal places: 0.77."
    })
    qs.append({
        "id": "DA-2026-Q58", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 58,
        "subject": "prog", "topic": "python-recursion", "type": "nat", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "Consider the given Python program:\ndef fun(L, i=0):\n    if i >= len(L)-1:\n        return 0\n    if L[i] > L[i+1]:\n        L[i+1], L[i] = L[i], L[i+1]\n        return 1 + fun(L, i+1)\n    else:\n        return fun(L, i+1)\ndata = [5, 3, 4, 1, 2]\ncount = 0\nfor _ in range(len(data)):\n    count += fun(data)\nprint(count)\nThe output of the program is: (Answer in integer)",
        "a": [8, 8],
        "s": "Each call to fun(data) performs one pass of bubble sort and returns the number of swaps made: Pass 1 on [5, 3, 4, 1, 2]: 4 swaps -> [3, 4, 1, 2, 5]. Pass 2 on [3, 4, 1, 2, 5]: 2 swaps -> [3, 1, 2, 4, 5]. Pass 3 on [3, 1, 2, 4, 5]: 2 swaps -> [1, 2, 3, 4, 5]. Pass 4: 0 swaps. Pass 5: 0 swaps. Total count = 4 + 2 + 2 + 0 + 0 = 8."
    })
    qs.append({
        "id": "DA-2026-Q59", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 59,
        "subject": "dbms", "topic": "tuple-relational-calculus", "type": "nat", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "Given X(P, Q, R) with rows {(P1, Q1, R1), (P2, Q2, R2), (P3, Q3, R2)} and Y(P, S) with rows {(P1, 10), (P1, 15), (P2, 20), (P3, 1)}. Tuple relational calculus expression: {t | t in X and exists z in X (t[P] = z[P]) and exists m in Y (m[P] = t[P] and m[S] > 1)}. The number of tuples returned is: (Answer in integer)",
        "a": [2, 2],
        "s": "The query selects tuples t in X for which there exists an entry in Y with the same P value and S > 1. For P1: Y contains (P1, 10) with S=10 > 1 (match). For P2: Y contains (P2, 20) with S=20 > 1 (match). For P3: Y contains (P3, 1) where S=1 is not > 1 (no match). The query returns the 2 tuples corresponding to P1 and P2."
    })
    qs.append({
        "id": "DA-2026-Q60", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 60,
        "subject": "dbms", "topic": "sql-median", "type": "nat", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "Relation Account(AccNo, Balance) has rows: (A1, 5000), (A2, 5000), (A3, 10000), (A4, 15000), (A5, 18000). SQL query: SELECT AccNo FROM Account AS A WHERE (SELECT COUNT(*) FROM Account AS B WHERE A.Balance < B.Balance) >= (SELECT COUNT(*) FROM Account AS C WHERE A.Balance > C.Balance). The number of rows returned is: (Answer in integer)",
        "a": [3, 3],
        "s": "Evaluate condition (strictly greater count >= strictly smaller count): For A1 (5000): greater = 3 (10k, 15k, 18k), smaller = 0. 3 >= 0 (True). For A2 (5000): greater = 3, smaller = 0. 3 >= 0 (True). For A3 (10000): greater = 2 (15k, 18k), smaller = 2 (5k, 5k). 2 >= 2 (True). For A4 (15000): greater = 1, smaller = 3. 1 >= 3 (False). For A5 (18000): greater = 0, smaller = 4. 0 >= 4 (False). Exactly 3 rows are returned: A1, A2, and A3."
    })
    qs.append({
        "id": "DA-2026-Q61", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 61,
        "subject": "dbms", "topic": "er-to-relational", "type": "nat", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "Consider an ER model with entities E1(A11, A12, A13) and E2(A21, A22, A23), with primary keys A11 and A21. A22 is multi-valued. R12 is a many-to-many relationship between E1 and E2 with total participation. The minimum number of relations required to convert the ER model into relational 3NF is: (Answer in integer)",
        "a": [4, 4],
        "s": "Converting into 3NF: (1) Entity E1 table: E1(A11, A12, A13). (2) Entity E2 base table: E2(A21, A23). (3) Separate relation for multivalued attribute A22: E2_A22(A21, A22). (4) Separate relation for many-to-many relationship R12: R12(A11, A21). Total relations = 4."
    })
    qs.append({
        "id": "DA-2026-Q62", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 62,
        "subject": "prob", "topic": "variance-identities", "type": "nat", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "For a dataset {x1, ..., xn} with n = 100: (1/2000) * sum_{i=1}^n sum_{j=1}^n (xi - xj)^2 = 99. Let x_bar = (1/n) sum xi. The value of (1/99) * sum_{i=1}^n (xi - x_bar)^2 is: (Answer in integer)",
        "a": [10, 10],
        "s": "Standard statistical identity: sum_{i=1}^n sum_{j=1}^n (xi - xj)^2 = 2n * sum_{i=1}^n (xi - x_bar)^2. For n = 100, 2n = 200. Thus: (1/2000) * 200 * sum (xi - x_bar)^2 = (1/10) * sum (xi - x_bar)^2 = 99, which gives sum (xi - x_bar)^2 = 990. Hence (1/99) * sum_{i=1}^n (xi - x_bar)^2 = 990 / 99 = 10."
    })
    qs.append({
        "id": "DA-2026-Q63", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 63,
        "subject": "prob", "topic": "correlation", "type": "nat", "marks": 2, "d": 1, "prov": "gate-2026",
        "q": "Let X ~ Uniform(-1, 1). The conditional distribution of Y given X = x is Uniform(x^2 - 0.1, x^2 + 0.1). The value of correlation(X, Y) is: (Answer in integer)",
        "a": [0, 0],
        "s": "E[X] = 0 by symmetry of Uniform(-1, 1). E[Y|X=x] = x^2. By the law of total expectation, E[XY] = E[X * E[Y|X]] = E[X * X^2] = E[X^3]. Since X is symmetric about 0, all odd moments are zero: E[X^3] = 0. Therefore Cov(X, Y) = E[XY] - E[X]E[Y] = 0 - 0 = 0, giving correlation(X, Y) = 0."
    })
    qs.append({
        "id": "DA-2026-Q64", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 64,
        "subject": "prob", "topic": "matrix-probability", "type": "nat", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "Let A be a 5x5 matrix such that each element is i.i.d. Bernoulli(p = 0.50). The probability that the row-sum of the second row and the column-sum of the third column are both equal to 3 is: (Rounded off to two decimal places)",
        "a": [0.1, 0.1],
        "s": "Row 2 and Column 3 intersect at element A[2, 3] = b in {0, 1}. Case 1: b = 1 (prob 0.5). Remaining 4 elements in row 2 sum to 2: C(4, 2)(0.5)^4 = 6/16. Remaining 4 elements in col 3 sum to 2: 6/16. Prob = 0.5 * (6/16)^2 = 18/256. Case 2: b = 0 (prob 0.5). Remaining 4 elements in row 2 sum to 3: C(4, 3)(0.5)^4 = 4/16. Remaining 4 elements in col 3 sum to 3: 4/16. Prob = 0.5 * (4/16)^2 = 8/256. Total probability = (18 + 8)/256 = 26/256 = 13/128 ~= 0.1016 -> 0.10."
    })
    qs.append({
        "id": "DA-2026-Q65", "year": 2026, "paper": "GATE 2026 (IIT Guwahati)", "qno": 65,
        "subject": "linalg", "topic": "rayleigh-quotient", "type": "nat", "marks": 2, "d": 2, "prov": "gate-2026",
        "q": "Let A = (In - (1/n) * 1 1^T) be a matrix where 1 = (1, ..., 1)^T in R^n. The value of max_{x in S} x^T A x where S = {x in R^n | x^T x = 1} is: (Answer in integer)",
        "a": [1, 1],
        "s": "For unit vector x, x^T A x is the Rayleigh quotient of symmetric matrix A. By the Courant-Fischer theorem, its maximum over unit sphere S equals the largest eigenvalue of A. A is an orthogonal projection matrix onto the subspace orthogonal to 1, whose eigenvalues are 1 (with multiplicity n - 1) and 0 (with multiplicity 1). The maximum eigenvalue is 1."
    })

    return qs
