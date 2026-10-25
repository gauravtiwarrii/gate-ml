/* ============================================================

   GATE ML Study Companion — Interactive Study Suite

   Highlights, Multi-Unit Notes, Active Recall Flashcards,

   Formula Quick-Reference, Pomodoro Timer, Reading Progress,

   and Distraction-Free Zen Mode.

   ============================================================ */

(function () {

  "use strict";



  // Storage Keys

  var HL_KEY = "gateda.ml-guide.highlights.v2";

  var NOTES_KEY = "gateda.ml-guide.notes.v2";

  var UNIT_NOTES_KEY = "gateda.ml-guide.unit_notes.v2";

  var BOOKMARK_KEY = "gateda.ml-guide.bookmark.v2";

  var POMO_KEY = "gateda.ml-guide.pomo.v2";

  var FLASHCARDS_KEY = "gateda.ml-guide.flashcards.v2";

  var SETTINGS_KEY = "gateda.ml-guide.settings.v2";

  var CHECKLIST_KEY = "gateda.ml-guide.units_done.v2";

  var MARKER_KEY = "gateda.ml-guide.marker_strokes.v1";

  var WAND_KEY = "gateda.ml-guide.wand_mode.v1";

  var MARKER_KEY = "gateda.ml-guide.marker_strokes.v1";

  var WAND_KEY = "gateda.ml-guide.wand_mode.v1";



  // Units metadata

  var UNITS = [

    { id: "u1", name: "Unit 1: Introduction to ML" },

    { id: "u2", name: "Unit 2: Workflow & Data Prep" },

    { id: "u3", name: "Unit 3: Regression" },

    { id: "u4", name: "Unit 4: Classification" },

    { id: "u5", name: "Unit 5: Evaluation & Ensembles" },

    { id: "u6", name: "Unit 6: Unsupervised Learning" },

    { id: "u7", name: "Unit 7: Neural Networks" },

    { id: "u8", name: "Unit 8: Model Selection & Tuning" },

    { id: "u9", name: "Unit 9: Applied ML" },

    { id: "u10", name: "Unit 10: Deployment & Responsible AI" },

    { id: "appA", name: "Appendix A: Mathematics Refresher" },

    { id: "appB", name: "Appendix B: Formula Cheat Sheet" },

    { id: "appC", name: "Appendix C: Glossary" },

    { id: "appD", name: "Appendix D: Interview Question Bank" },

    { id: "plan", name: "Closing: 90-Day Study Plan" }

  ];



  // Curated GATE ML Flashcard Deck

  var FLASHCARD_DECK = [

    {

      id: "fc1",

      unit: "Unit 3: Regression",

      topic: "Bias-Variance Tradeoff",

      prompt: "What is the Bias-Variance Decomposition formula for expected test MSE?",

      answer: "Expected Test MSE = Bias(f̂)² + Var(f̂) + σ²\nwhere σ² is the irreducible Bayes error of the true underlying process.",

      code: "MSE = [E(f̂) - f]² + E[(f̂ - E(f̂))²] + Var(ε)"

    },

    {

      id: "fc2",

      unit: "Unit 3: Regression",

      topic: "OLS Normal Equation",

      prompt: "What is the closed-form Normal Equation solution for Ordinary Least Squares (OLS)?",

      answer: "θ = (XᵀX)⁻¹ Xᵀ y.\nIf (XᵀX) is singular (non-invertible due to multicollinearity or p > n), Ridge regularization makes (XᵀX + λI) strictly invertible.",

      code: "θ = (X^T X)^{-1} X^T y"

    },

    {

      id: "fc3",

      unit: "Unit 3: Regression",

      topic: "Ridge vs Lasso Regularization",

      prompt: "Why does Lasso (L1) produce sparse models (exact zeroes) while Ridge (L2) only shrinks weights toward zero?",

      answer: "L1 penalty |w| has diamond-shaped contours with sharp corners on axes. The spherical contours of MSE touch the L1 diamond at the axes, forcing coefficients to exactly 0. Ridge L2 has smooth circular contours with no sharp corners.",

      code: "Ridge: MSE + λ||w||₂²   |   Lasso: MSE + λ||w||₁"

    },

    {

      id: "fc4",

      unit: "Unit 4: Classification",

      topic: "Logistic Sigmoid & Cross-Entropy",

      prompt: "Why is Mean Squared Error (MSE) NOT used with Logistic Regression?",

      answer: "With non-linear Sigmoid σ(z), MSE loss becomes non-convex with multiple local minima. Binary Cross-Entropy (Log-Loss) guarantees a strictly convex loss surface with a unique global optimum.",

      code: "L = - [y·log(p) + (1-y)·log(1-p)]"

    },

    {

      id: "fc5",

      unit: "Unit 4: Classification",

      topic: "Decision Trees — Splitting Criteria",

      prompt: "What are the formulas for Entropy and Gini Impurity? What are their maximum values for binary classification?",

      answer: "Entropy: H(S) = -∑ pᵢ log₂(pᵢ). Max = 1.0 (when p = 0.5).\nGini Impurity: Gini(S) = 1 - ∑ pᵢ². Max = 0.5 (when p = 0.5).\nGini is computationally faster because it avoids logarithmic operations.",

      code: "H = -p·log₂(p) - (1-p)·log₂(1-p)  |  Gini = 1 - p² - (1-p)² = 2p(1-p)"

    },

    {

      id: "fc6",

      unit: "Unit 5: Ensembles",

      topic: "Random Forest Decorrelation",

      prompt: "How does Random Forest de-correlate individual decision trees compared to plain Bagging?",

      answer: "At each split, Random Forest randomly subsamples m features (typically m = √p for classification, p/3 for regression). This prevents strong dominant features from being selected at the top of every tree.",

      code: "m ≈ √p (classification) | m ≈ p/3 (regression)"

    },

    {

      id: "fc7",

      unit: "Unit 5: Ensembles",

      topic: "Gradient Boosting vs AdaBoost",

      prompt: "What is the core mathematical difference between AdaBoost and Gradient Boosting?",

      answer: "AdaBoost reweights individual misclassified training data points. Gradient Boosting fits each subsequent weak learner directly to the pseudo-residuals (negative gradient of the loss) of the previous ensemble.",

      code: "Residual r_im = -[∂L(y_i, F(x_i)) / ∂F(x_i)]"

    },

    {

      id: "fc8",

      unit: "Unit 4: Classification",

      topic: "Support Vector Machines (SVM)",

      prompt: "What is the geometric margin width between parallel hyperplanes wᵀx + b = ±1 in Hard-Margin SVM?",

      answer: "The margin width is 2 / ||w||₂. Maximizing margin 2 / ||w|| is equivalent to minimizing ½ ||w||² subject to yᵢ(wᵀxᵢ + b) ≥ 1 for all samples.",

      code: "Margin = 2 / ||w||  →  min ½ ||w||² s.t. y_i(w^T x_i + b) ≥ 1"

    },

    {

      id: "fc9",

      unit: "Unit 5: Evaluation",

      topic: "Precision, Recall, and F1",

      prompt: "What are Precision, Recall, and F1-score? When is Recall prioritized over Precision?",

      answer: "Precision = TP / (TP + FP) (correct positive predictions).\nRecall = TP / (TP + FN) (fraction of actual positives detected).\nF1 = 2·(P·R) / (P + R) (harmonic mean).\nRecall is prioritized when False Negatives are catastrophic (e.g. disease screening, fraud detection).",

      code: "Precision = TP/(TP+FP) | Recall = TP/(TP+FN) | F1 = 2PR/(P+R)"

    },

    {

      id: "fc10",

      unit: "Unit 5: Evaluation",

      topic: "ROC-AUC Curve",

      prompt: "What are the X-axis and Y-axis of an ROC curve? What is the AUC for a completely random classifier?",

      answer: "Y-axis: True Positive Rate (TPR = Sensitivity = Recall).\nX-axis: False Positive Rate (FPR = 1 - Specificity = FP / (FP + TN)).\nRandom guessing yields AUC = 0.5. Perfect discrimination gives AUC = 1.0.",

      code: "Y = TPR = TP / (TP+FN) | X = FPR = FP / (FP+TN)"

    },

    {

      id: "fc11",

      unit: "Unit 6: Unsupervised",

      topic: "k-Means Objective & Convergence",

      prompt: "What is the exact objective function (WCSS) minimized by k-Means? Does it guarantee global optimum?",

      answer: "WCSS = ∑ₖ ∑_{x ∈ Cₖ} ||x - μₖ||². Lloyd's algorithm alternates between cluster assignment and centroid recalculation. It is guaranteed to converge to a local minimum, but NOT necessarily the global minimum (hence k-means++ initialization).",

      code: "J = ∑_{k=1}^K ∑_{x ∈ C_k} ||x - μ_k||²"

    },

    {

      id: "fc12",

      unit: "Unit 6: Unsupervised",

      topic: "PCA Covariance & Variance",

      prompt: "How does PCA extract principal components from standardized data matrix X (n × p)?",

      answer: "PCA computes the sample covariance matrix Σ = (1/n) XᵀX, then performs eigendecomposition Σ vᵢ = λᵢ vᵢ. The eigenvectors vᵢ are orthogonal principal directions; the eigenvalues λᵢ indicate the variance captured along each axis.",

      code: "Σ v = λ v | Explained Variance Ratio = λ_i / ∑ λ_j"

    },

    {

      id: "fc13",

      unit: "Unit 7: Neural Networks",

      topic: "Activation Functions & Vanishing Gradient",

      prompt: "Why did ReLU f(x) = max(0, x) largely replace Sigmoid in hidden layers of deep neural networks?",

      answer: "The derivative of Sigmoid is σ(x)(1 - σ(x)) ≤ 0.25. Multiplying many gradients < 0.25 via chain rule causes vanishing gradients in deep networks. ReLU derivative is exactly 1 for x > 0, allowing gradients to propagate without diminishing.",

      code: "ReLU: f'(x) = 1 (x > 0), 0 (x < 0) | Sigmoid: f'(x) ≤ 0.25"

    },

    {

      id: "fc14",

      unit: "Unit 8: Model Tuning",

      topic: "Data Leakage Prevention",

      prompt: "Why must feature scaling (StandardScaler, MinMax) and imputer fitting occur ONLY on the training split?",

      answer: "If you compute μ and σ on the whole dataset before splitting, information from the test set leaks into the training pipeline. The test set must represent completely unseen future data to obtain unbiased validation.",

      code: "scaler.fit_transform(X_train) -> scaler.transform(X_test)"

    }

  ];



  // Curated Formula Sheet

  var FORMULAS = [

    {

      name: "Normal Equation (OLS)",

      unit: "Unit 3",

      math: "θ = (XᵀX)⁻¹ Xᵀ y",

      desc: "Closed-form analytical solution for unregularized linear regression.",

      section: "u3"

    },

    {

      name: "Ridge Regression Loss (L2)",

      unit: "Unit 3",

      math: "J(θ) = MSE + λ ||θ||₂² = (1/n)||y - Xθ||² + λ ∑ θⱼ²",

      desc: "Shrinks weights continuously towards 0; solves non-invertibility of XᵀX.",

      section: "u3"

    },

    {

      name: "Lasso Regression Loss (L1)",

      unit: "Unit 3",

      math: "J(θ) = MSE + λ ||θ||₁ = (1/n)||y - Xθ||² + λ ∑ |θⱼ|",

      desc: "Forces redundant feature weights to exact zero (sparse feature selection).",

      section: "u3"

    },

    {

      name: "Sigmoid / Logistic Function",

      unit: "Unit 4",

      math: "σ(z) = 1 / (1 + e⁻ᶻ), where z = wᵀx + b",

      desc: "Maps any real value z ∈ (-∞, +∞) to probability p ∈ (0, 1). Derivative: σ(z)(1 - σ(z)).",

      section: "u4"

    },

    {

      name: "Binary Cross-Entropy (Log-Loss)",

      unit: "Unit 4",

      math: "L(y, p) = - [ y·log(p) + (1 - y)·log(1 - p) ]",

      desc: "Convex loss for logistic classification. Heavily penalizes confident wrong predictions.",

      section: "u4"

    },

    {

      name: "Gini Impurity (CART)",

      unit: "Unit 4",

      math: "Gini(S) = 1 - ∑_{i=1}^C pᵢ²",

      desc: "Probability of misclassifying a randomly chosen element from set S.",

      section: "u4"

    },

    {

      name: "Shannon Entropy & Information Gain",

      unit: "Unit 4",

      math: "H(S) = - ∑ pᵢ log₂(pᵢ)  |  IG(S, A) = H(S) - ∑ (|Sᵥ|/|S|) H(Sᵥ)",

      desc: "Measures uncertainty in data. Information Gain is the reduction in entropy after split.",

      section: "u4"

    },

    {

      name: "SVM Geometric Margin",

      unit: "Unit 4",

      math: "Margin = 2 / ||w||₂  →  min ½ ||w||² s.t. yᵢ(wᵀxᵢ + b) ≥ 1",

      desc: "Distance between canonical support hyperplanes. Soft margin adds C ∑ ξᵢ slack penalty.",

      section: "u4"

    },

    {

      name: "Precision, Recall & F1-Score",

      unit: "Unit 5",

      math: "P = TP/(TP+FP) | R = TP/(TP+FN) | F₁ = 2·(P·R) / (P+R)",

      desc: "Evaluation metrics for classification under class imbalance.",

      section: "u5"

    },

    {

      name: "k-Means WCSS Objective",

      unit: "Unit 6",

      math: "J = ∑_{k=1}^K ∑_{x ∈ C_k} ||x - μ_k||²",

      desc: "Sum of squared Euclidean distances of samples to assigned cluster centroid μₖ.",

      section: "u6"

    },

    {

      name: "PCA Covariance & Projection",

      unit: "Unit 6",

      math: "Σ = (1/n) XᵀX  |  Σ v = λ v  |  Z = X V_k",

      desc: "Projects centered matrix X onto top k orthogonal eigenvectors of covariance matrix Σ.",

      section: "u6"

    },

    {

      name: "Softmax Probability",

      unit: "Unit 7",

      math: "pᵢ = e^(zᵢ) / ∑_{j=1}^K e^(zⱼ)",

      desc: "Multi-class generalization of sigmoid; normalizes raw logits into valid probability distribution.",

      section: "u7"

    }

  ];



  // Helper utilities

  function readStorage(key, fallback) {

    try {

      var item = localStorage.getItem(key);

      return item ? JSON.parse(item) : fallback;

    } catch (e) {

      return fallback;

    }

  }



  function writeStorage(key, value) {

    try {

      localStorage.setItem(key, JSON.stringify(value));

      return true;

    } catch (e) {

      return false;

    }

  }



  function escapeHtml(str) {

    if (!str) return "";

    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  }



  // Audio Chime using Web Audio API (No external file needed)

  function playChime() {

    try {

      var AudioCtx = window.AudioContext || window.webkitAudioContext;

      if (!AudioCtx) return;

      var ctx = new AudioCtx();

      var now = ctx.currentTime;

      var osc1 = ctx.createOscillator();

      var gain1 = ctx.createGain();

      osc1.type = "sine";

      osc1.frequency.setValueAtTime(587.33, now); // D5

      osc1.frequency.setValueAtTime(880, now + 0.18); // A5

      gain1.gain.setValueAtTime(0.15, now);

      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc1.connect(gain1);

      gain1.connect(ctx.destination);

      osc1.start(now);

      osc1.stop(now + 0.8);

    } catch (e) {}

  }



  // Detect which unit an element or position belongs to

  function detectUnitFromNode(node) {

    var el = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;

    if (!el) return "General Guide";

    var unitEl = el.closest(".unit") || el.closest("section") || el.closest("[id]");

    if (unitEl && unitEl.id) {

      for (var i = 0; i < UNITS.length; i++) {

        if (UNITS[i].id === unitEl.id) return UNITS[i].name;

      }

    }

    // Search backward for preceding h2 or h3

    var prev = el;

    while (prev) {

      if (prev.previousElementSibling) {

        prev = prev.previousElementSibling;

        if (/^H[1-3]$/i.test(prev.tagName)) return prev.textContent.trim().slice(0, 35);

      } else {

        prev = prev.parentElement;

      }

    }

    return "General Guide";

  }



  // ------------------------------------------------------------

  // State Initialization

  // ------------------------------------------------------------

  var highlights = readStorage(HL_KEY, []);

  // Migrate v1 highlights if empty and v1 exists

  if (!highlights.length) {

    var oldHl = readStorage("gateda.ml-guide.highlights.v1", null);

    if (oldHl && oldHl.length) {

      // old format was range offsets; keep clean state

    }

  }



  var unitNotes = readStorage(UNIT_NOTES_KEY, { general: readStorage("gateda.ml-guide.notes.v1", "") });

  var masteredCards = readStorage(FLASHCARDS_KEY, []);

  var completedUnits = readStorage(CHECKLIST_KEY, []);

  var readerSettings = readStorage(SETTINGS_KEY, { size: "normal", font: "sans", zen: false });



  // Pomodoro State

  var pomoState = {

    mode: "focus", // focus (25m), short (5m), long (15m)

    timeLeft: 25 * 60,

    totalTime: 25 * 60,

    running: false,

    intervalId: null,

    sessionsCompleted: readStorage(POMO_KEY, { sessions: 0 }).sessions || 0

  };



  // Currently active highlight being edited in popover

  var activeHlTarget = null;



  // ------------------------------------------------------------

  // UI Builder: Inject Elements into DOM

  // ------------------------------------------------------------

  function mountUI() {

    // 1. Reading Progress Bar at top

    var progressBar = document.createElement("div");

    progressBar.id = "studyProgressBar";

    progressBar.setAttribute("aria-hidden", "true");

    document.body.appendChild(progressBar);



        // 1d. Floating Zen Focus HUD
    var zenHud = document.createElement("div");
    zenHud.id = "studyZenHud";
    zenHud.className = "study-zen-hud";
    zenHud.setAttribute("aria-label", "Zen Focus Control Bar");
    zenHud.innerHTML =
      '<button type="button" class="study-zen-hud__btn study-zen-hud__btn--exit" id="zenHudExitBtn" title="Exit Zen Mode (Esc or Z)">✕ Exit Zen</button>' +
      '<div class="study-zen-hud__sep"></div>' +
      '<button type="button" class="study-zen-hud__btn" id="zenHudWidthBtn" title="Cycle column width">↔ <span id="zenHudWidthLabel">820px</span></button>' +
      '<div class="study-zen-hud__sep"></div>' +
      '<button type="button" class="study-zen-hud__btn" id="zenHudLensBtn" title="Paragraph Spotlight Lens (L)">🔍 Lens</button>' +
      '<button type="button" class="study-zen-hud__btn" id="zenHudRulerBtn" title="Reading Focus Ruler (R)">📏 Ruler</button>' +
      '<button type="button" class="study-zen-hud__btn" id="zenHudBionicBtn" title="Bionic Fast Reading (B)">⚡ Bionic</button>' +
      '<button type="button" class="study-zen-hud__btn" id="zenHudMarkerBtn" title="Screen Pen / Annotator (M)">✏️ Pen</button>' +
      '<div class="study-zen-hud__sep"></div>' +
      '<button type="button" class="study-zen-hud__btn" id="zenHudHelpBtn" title="Keyboard Shortcuts (?)">❓ Help</button>';
    document.body.appendChild(zenHud);

    // 1e. Horizontal Reading Focus Ruler
    var ruler = document.createElement("div");
    ruler.id = "studyReadingRuler";
    ruler.setAttribute("aria-hidden", "true");
    document.body.appendChild(ruler);

    // 1f. Keyboard Shortcuts Cheat Sheet Modal
    var shortcutsModal = document.createElement("div");
    shortcutsModal.id = "studyShortcutsModal";
    shortcutsModal.className = "study-modal-backdrop";
    shortcutsModal.setAttribute("role", "dialog");
    shortcutsModal.setAttribute("aria-modal", "true");
    shortcutsModal.setAttribute("aria-label", "Keyboard Shortcuts");
    shortcutsModal.innerHTML =
      '<div class="study-modal-card">' +
      '<div class="study-modal-head">' +
      '<h3>⚡ GATE ML Study Shortcuts</h3>' +
      '<button type="button" class="study-modal-close" id="studyShortcutsClose" aria-label="Close shortcuts modal">&times;</button>' +
      '</div>' +
      '<div class="study-shortcut-row"><span>Toggle No Distraction / Zen Mode</span><kbd>Z</kbd></div>' +
      '<div class="study-shortcut-row"><span>Toggle Paragraph Focus Lens (Spotlight)</span><kbd>L</kbd></div>' +
      '<div class="study-shortcut-row"><span>Toggle Reading Focus Ruler</span><kbd>R</kbd></div>' +
      '<div class="study-shortcut-row"><span>Toggle Bionic Reading Mode</span><kbd>B</kbd></div>' +
      '<div class="study-shortcut-row"><span>Toggle Screen Marker / Pen Drawing</span><kbd>M</kbd></div>' +
      '<div class="study-shortcut-row"><span>Toggle Instant Highlighter Wand</span><kbd>H</kbd></div>' +
      '<div class="study-shortcut-row"><span>Exit Zen / Close Modal / Erase</span><kbd>Esc</kbd></div>' +
      '<div class="study-shortcut-row"><span>Open Keyboard Shortcuts Help</span><kbd>?</kbd></div>' +
      '</div>';
    document.body.appendChild(shortcutsModal);

    // 1b. Interactive Screen Marker Canvas

    var drawCanvas = document.createElement("canvas");

    drawCanvas.id = "studyMarkerCanvas";

    drawCanvas.className = "study-marker-canvas hidden-ink";

    document.body.appendChild(drawCanvas);



    // 1c. Floating Screen Marker Toolbar

    var markerToolbar = document.createElement("div");

    markerToolbar.id = "studyMarkerToolbar";

    markerToolbar.className = "study-marker-toolbar";

    markerToolbar.innerHTML =

      '<div class="study-marker-group">' +

      '<button type="button" class="study-marker-btn active" data-tool="pen" title="Fine Pen (P)">✏️ Pen</button>' +

      '<button type="button" class="study-marker-btn" data-tool="highlighter" title="Broad Highlighter (H)">🖍️ Highlight</button>' +

      '<button type="button" class="study-marker-btn" data-tool="arrow" title="Draw Arrow">➡️ Arrow</button>' +

      '<button type="button" class="study-marker-btn" data-tool="box" title="Draw Box">🔲 Box</button>' +

      '<button type="button" class="study-marker-btn" data-tool="eraser" title="Eraser (E)">🧽 Eraser</button>' +

      '</div>' +

      '<div class="study-marker-group">' +

      '<button type="button" class="study-marker-color-btn active" data-marker-color="#fde047" style="background:#fde047;" title="Neon Yellow"></button>' +

      '<button type="button" class="study-marker-color-btn" data-marker-color="#4ade80" style="background:#4ade80;" title="Mint Green"></button>' +

      '<button type="button" class="study-marker-color-btn" data-marker-color="#38bdf8" style="background:#38bdf8;" title="Electric Cyan"></button>' +

      '<button type="button" class="study-marker-color-btn" data-marker-color="#c084fc" style="background:#c084fc;" title="Purple"></button>' +

      '<button type="button" class="study-marker-color-btn" data-marker-color="#f87171" style="background:#f87171;" title="Coral Red"></button>' +

      '<button type="button" class="study-marker-color-btn" data-marker-color="#ffffff" style="background:#ffffff;" title="White"></button>' +

      '</div>' +

      '<div class="study-marker-group">' +

      '<select class="study-stroke-select" id="markerStrokeSelect" title="Stroke Thickness">' +

      '<option value="2.5">Thin</option>' +

      '<option value="5" selected>Medium</option>' +

      '<option value="12">Bold</option>' +

      '</select>' +

      '</div>' +

      '<div class="study-marker-group">' +

      '<button type="button" class="study-marker-btn" id="markerUndoBtn" title="Undo Last Stroke (Ctrl+Z)">↩️ Undo</button>' +

      '<button type="button" class="study-marker-btn" id="markerToggleInkBtn" title="Hide/Show Ink">👁️ Ink</button>' +

      '<button type="button" class="study-marker-btn" id="markerClearBtn" title="Clear All Drawings">🗑️ Clear</button>' +

      '<button type="button" class="study-marker-btn" id="markerSnapshotBtn" title="Download Screenshot">📸 Save</button>' +

      '</div>' +

      '<button type="button" class="study-marker-btn" id="markerCloseBtn" style="color:#ef4444;" title="Exit Marker Mode (Esc)">&times; Close</button>';

    document.body.appendChild(markerToolbar);



    



    // 2. Floating Selection Tooltip / Toolbar

    var selectionBar = document.createElement("div");

    selectionBar.className = "study-selection-bar";

    selectionBar.id = "studySelectionBar";

    selectionBar.innerHTML =

      '<div class="study-selection-bar__colors">' +

      '<button type="button" class="study-color-btn study-color-btn--yellow" data-color="yellow" title="Key Concept (Yellow)"></button>' +

      '<button type="button" class="study-color-btn study-color-btn--green" data-color="green" title="Formula & Math (Green)"></button>' +

      '<button type="button" class="study-color-btn study-color-btn--purple" data-color="purple" title="GATE Exam Point (Purple)"></button>' +

      '<button type="button" class="study-color-btn study-color-btn--coral" data-color="coral" title="Important Caution (Coral)"></button>' +

      '</div>' +

      '<button type="button" class="study-sel-action-btn" id="studySelAddNote">📝 Note</button>' +

      '<button type="button" class="study-sel-action-btn" id="studySelCopy">📋 Copy</button>';

    document.body.appendChild(selectionBar);



    // 3. Highlight Context Popover (for editing clicked highlights)

    var hlPopover = document.createElement("div");

    hlPopover.className = "study-hl-popover";

    hlPopover.id = "studyHlPopover";

    hlPopover.innerHTML =

      '<div class="study-hl-popover__head">' +

      '<span id="studyHlPopoverUnit">Highlight Note</span>' +

      '<div class="study-selection-bar__colors" style="border:none;padding:0;">' +

      '<button type="button" class="study-color-btn study-color-btn--yellow" data-hl-color="yellow"></button>' +

      '<button type="button" class="study-color-btn study-color-btn--green" data-hl-color="green"></button>' +

      '<button type="button" class="study-color-btn study-color-btn--purple" data-hl-color="purple"></button>' +

      '<button type="button" class="study-color-btn study-color-btn--coral" data-hl-color="coral"></button>' +

      '</div>' +

      '</div>' +

      '<textarea id="studyHlPopoverText" placeholder="Add a note or exam tip for this passage..."></textarea>' +

      '<div class="study-hl-popover__actions">' +

      '<button type="button" class="study-hl-popover__btn study-hl-popover__btn--delete" id="studyHlPopoverDelete">Delete</button>' +

      '<div style="display:flex;gap:6px;">' +

      '<button type="button" class="study-hl-popover__btn" id="studyHlPopoverClose">Close</button>' +

      '<button type="button" class="study-hl-popover__btn study-hl-popover__btn--primary" id="studyHlPopoverSave">Save</button>' +

      '</div>' +

      '</div>';

    document.body.appendChild(hlPopover);



    // 4. Floating Study Dock (Bottom-Right)

    var dock = document.createElement("div");

    dock.className = "study-dock";

    dock.id = "studyDock";

    dock.innerHTML =

      '<button type="button" class="study-dock__btn" id="studyDockZenBtn" title="No Distraction / Zen Focus Mode (Shortcut: Z)">🔕 Focus</button>' +
      '<button type="button" class="study-dock__btn" id="studyDockMarkerBtn" title="Screen Marker / Pen Annotator (Shortcut: M)">' +

      '✏️ Marker' +

      '</button>' +

      '<button type="button" class="study-dock__btn" id="studyDockWandBtn" title="Instant Highlighter Wand (Shortcut: H)">' +

      '🖍️ Wand' +

      '</button>' +

      '<button type="button" class="study-dock__btn" id="studyDockPomoBtn" title="Toggle Pomodoro Timer">' +

      '⏱️ <span class="study-dock__timer-badge" id="studyDockPomoTime">25:00</span>' +

      '</button>' +

      '<button type="button" class="study-dock__btn study-dock__btn--primary" id="studyDockHubBtn" title="Open Study Companion Hub">' +

      '📚 Study Hub <span class="study-dock__badge" id="studyDockCount">0</span>' +

      '</button>';

    document.body.appendChild(dock);



    // 5. Drawer Backdrop & Slide-Over Panel

    var backdrop = document.createElement("div");

    backdrop.className = "study-backdrop";

    backdrop.id = "studyBackdrop";

    document.body.appendChild(backdrop);



    var drawer = document.createElement("div");

    drawer.className = "study-drawer";

    drawer.id = "studyDrawer";

    drawer.setAttribute("role", "dialog");

    drawer.setAttribute("aria-label", "GATE ML Study Companion");



    var unitOptions = '<option value="general">General Guide Notebook</option>';

    UNITS.forEach(function (u) {

      unitOptions += '<option value="' + u.id + '">' + u.name + '</option>';

    });



    drawer.innerHTML =

      '<div class="study-drawer__head">' +

      '<div class="study-drawer__title">' +

      '<h3>Study Companion</h3>' +

      '<span>GATE DA</span>' +

      '</div>' +

      '<button type="button" class="study-drawer__close" id="studyDrawerClose" aria-label="Close Study Companion">&times;</button>' +

      '</div>' +



      '<div class="study-drawer__tabs">' +

      '<button type="button" class="study-tab-btn active" data-tab="notes">📝 Notes <span class="badge" id="studyTabNotesCount">0</span></button>' +

      '<button type="button" class="study-tab-btn" data-tab="highlights">🖍️ Highlights <span class="badge" id="studyTabHlCount">0</span></button>' +

      '<button type="button" class="study-tab-btn" data-tab="flashcards">🃏 Flashcards <span class="badge" id="studyTabFcCount">14</span></button>' +

      '<button type="button" class="study-tab-btn" data-tab="formulas">📐 Formulas</button>' +

      '<button type="button" class="study-tab-btn" data-tab="pomo">⏱️ Focus Timer</button>' +

      '<button type="button" class="study-tab-btn" data-tab="tools">🧮 Tools &amp; Calc</button>' +

      '<button type="button" class="study-tab-btn" data-tab="checklist">✅ Readiness <span class="badge" id="studyTabCheckCount">0/15</span></button>' +
      '<button type="button" class="study-tab-btn" data-tab="reader">⚙️ Reader</button>' +

      '</div>' +



      '<div class="study-drawer__body">' +

      // Tab 1: Notes Panel

      '<div class="study-panel active" id="tabPanelNotes">' +

      '<div class="study-notes-toolbar">' +

      '<select class="study-select" id="studyUnitSelect">' + unitOptions + '</select>' +

      '<div class="study-btn-row">' +

      '<button type="button" class="study-btn" id="studyExportNotesBtn" title="Download all notes as Markdown file">📥 Export</button>' +

      '<button type="button" class="study-btn" id="studyCopyNotesBtn" title="Copy all notes to clipboard">📋 Copy</button>' +

      '</div>' +

      '</div>' +

      '<div class="study-textarea-wrapper">' +

      '<textarea class="study-textarea" id="studyUnitTextarea" placeholder="Write personal study notes, derivations, or summaries for this section..."></textarea>' +

      '<div class="study-notes-footer">' +

      '<span id="studyNotesSaveStatus">Autosaves locally</span>' +

      '<span id="studyNotesWordCount">0 words</span>' +

      '</div>' +

      '</div>' +

      '<div class="study-annotations-heading">' +

      '<span>Annotated Excerpts &amp; Quotes</span>' +

      '<span id="studyAnnotationCount">0 items</span>' +

      '</div>' +

      '<div class="study-card-list" id="studyAnnotationsList"></div>' +

      '</div>' +



      // Tab 2: Highlights Panel

      '<div class="study-panel" id="tabPanelHighlights">' +

      '<div class="study-filter-bar">' +

      '<button type="button" class="study-filter-pill active" data-filter="all">All (<span id="hlFilterAllCount">0</span>)</button>' +

      '<button type="button" class="study-filter-pill" data-filter="yellow">🟡 Key Points (<span id="hlFilterYellowCount">0</span>)</button>' +

      '<button type="button" class="study-filter-pill" data-filter="green">🟢 Formulas (<span id="hlFilterGreenCount">0</span>)</button>' +

      '<button type="button" class="study-filter-pill" data-filter="purple">🟣 Exam Points (<span id="hlFilterPurpleCount">0</span>)</button>' +

      '<button type="button" class="study-filter-pill" data-filter="coral">🔴 Cautions (<span id="hlFilterCoralCount">0</span>)</button>' +

      '</div>' +

      '<div class="study-card-list" id="studyHighlightsList"></div>' +

      '<div style="margin-top:10px;text-align:right;">' +

      '<button type="button" class="study-action-link study-action-link--danger" id="studyClearAllHlBtn">Clear all highlights</button>' +

      '</div>' +

      '</div>' +



      // Tab 3: Flashcards Panel

      '<div class="study-panel" id="tabPanelFlashcards">' +

      '<div class="study-flashcard-wrap">' +

      '<div class="study-flashcard-header">' +

      '<span style="font-size:12px;color:#9ca3af;font-family:var(--font-mono, monospace);" id="fcProgress">Card 1 of 14</span>' +

      '<button type="button" class="study-btn" id="fcShuffleBtn">🔀 Shuffle</button>' +

      '</div>' +

      '<div class="study-flashcard" id="fcCard" tabindex="0" role="button" aria-label="Flashcard. Click or press space to flip.">' +

      '<div class="study-flashcard__inner">' +

      '<div class="study-flashcard__face study-flashcard__front">' +

      '<span class="study-flashcard__unit-tag" id="fcUnitTag">Unit 3</span>' +

      '<h4 class="study-flashcard__prompt" id="fcPrompt">Question prompt</h4>' +

      '<span class="study-flashcard__hint">Click or press Space to reveal answer ↺</span>' +

      '</div>' +

      '<div class="study-flashcard__face study-flashcard__back">' +

      '<span class="study-flashcard__ans-title">Answer &amp; Concept</span>' +

      '<p class="study-flashcard__ans-body" id="fcAnswer">Answer details</p>' +

      '<code class="study-flashcard__code" id="fcCode" style="display:none;"></code>' +

      '</div>' +

      '</div>' +

      '</div>' +

      '<div class="study-flashcard-controls">' +

      '<button type="button" class="study-btn" id="fcPrevBtn">&larr; Prev</button>' +

      '<button type="button" class="study-btn study-btn--accent" id="fcFlipBtn">Flip Card ↺</button>' +

      '<button type="button" class="study-btn" id="fcNextBtn">Next &rarr;</button>' +

      '</div>' +

      '<div class="study-flashcard-rating">' +

      '<button type="button" class="study-rate-btn study-rate-btn--again" id="fcRateAgain">Review Again</button>' +

      '<button type="button" class="study-rate-btn study-rate-btn--mastered" id="fcRateMastered">✓ Mastered (<span id="fcMasteredCount">0</span>)</button>' +

      '</div>' +

      '</div>' +

      '</div>' +



      // Tab 4: Formula Sheet Panel

      '<div class="study-panel" id="tabPanelFormulas">' +

      '<input type="text" class="study-search-input" id="formulaSearchInput" placeholder="Search formulas (e.g. Gini, Ridge, Sigmoid, WCSS)..." />' +

      '<div class="study-formula-grid" id="studyFormulaGrid"></div>' +

      '</div>' +



      // Tab 5: Pomodoro Timer Panel

      '<div class="study-panel" id="tabPanelPomo">' +

      '<div class="study-pomo-wrap">' +

      '<div class="study-pomo-modes">' +

      '<button type="button" class="study-pomo-mode-btn active" data-pomo-mode="focus">Focus (25m)</button>' +

      '<button type="button" class="study-pomo-mode-btn" data-pomo-mode="short">Short Break (5m)</button>' +

      '<button type="button" class="study-pomo-mode-btn" data-pomo-mode="long">Long Break (15m)</button>' +

      '</div>' +

      '<div class="study-pomo-dial">' +

      '<svg viewBox="0 0 100 100">' +

      '<circle class="study-pomo-circle-bg" cx="50" cy="50" r="42"></circle>' +

      '<circle class="study-pomo-circle-fg" id="pomoCircleFg" cx="50" cy="50" r="42" stroke-dasharray="264" stroke-dashoffset="0"></circle>' +

      '</svg>' +

      '<div class="study-pomo-time-display">' +

      '<strong id="pomoMainDisplay">25:00</strong>' +

      '<span id="pomoStatusLabel">Study Session</span>' +

      '</div>' +

      '</div>' +

      '<div class="study-pomo-controls">' +

      '<button type="button" class="study-btn study-btn--accent" id="pomoStartBtn" style="padding:10px 24px;font-size:13px;">Start Timer</button>' +

      '<button type="button" class="study-btn" id="pomoResetBtn" style="padding:10px 18px;">Reset</button>' +

      '</div>' +

      '<div class="study-pomo-stats">' +

      '<div class="study-pomo-stat-box"><strong id="pomoSessionsCount">0</strong><span>Sessions Today</span></div>' +

      '<div class="study-pomo-stat-box"><strong id="pomoTotalMinutes">0</strong><span>Minutes Focused</span></div>' +

      '</div>' +

      '</div>' +

      '</div>' +



      // Tab 7: Tools, Math Calculators, Ambient Sound & Speech

      '<div class="study-panel" id="tabPanelTools">' +

      '<div class="study-reader-group">' +

      '<label>🎧 Read Aloud (Text-to-Speech)</label>' +

      '<div class="study-tts-banner">' +

      '<span id="ttsStatusText" style="font-size:12px;color:#9ca3af;">Ready to listen to this guide</span>' +

      '<div style="display:flex;gap:6px;">' +

      '<button type="button" class="study-btn study-btn--accent" id="ttsPlayBtn">▶ Play</button>' +

      '<button type="button" class="study-btn" id="ttsStopBtn">■ Stop</button>' +

      '</div>' +

      '</div>' +

      '<div style="display:flex;align-items:center;justify-content:space-between;font-size:12px;color:#9ca3af;">' +

      '<span>Reading Speed:</span>' +

      '<div class="study-segmented-btn" id="ttsSpeedBtns">' +

      '<button type="button" data-speed="1.0" class="active">1x</button>' +

      '<button type="button" data-speed="1.25">1.25x</button>' +

      '<button type="button" data-speed="1.5">1.5x</button>' +

      '</div>' +

      '</div>' +

      '</div>' +



      '<div class="study-reader-group">' +

      '<label>🌧️ Ambient Study Soundscapes (Offline Focus)</label>' +

      '<div class="study-audio-grid">' +

      '<div class="study-audio-tile" data-sound="rain">' +

      '<div class="study-audio-tile-head"><span>🌧️ Rain Shower</span><span class="study-sound-state">Off</span></div>' +

      '<div class="study-audio-wave"></div>' +

      '</div>' +

      '<div class="study-audio-tile" data-sound="brown">' +

      '<div class="study-audio-tile-head"><span>🌊 Deep Ocean</span><span class="study-sound-state">Off</span></div>' +

      '<div class="study-audio-wave"></div>' +

      '</div>' +

      '<div class="study-audio-tile" data-sound="gamma">' +

      '<div class="study-audio-tile-head"><span>🧠 40Hz Gamma Focus</span><span class="study-sound-state">Off</span></div>' +

      '<div class="study-audio-wave"></div>' +

      '</div>' +

      '<div class="study-audio-tile" data-sound="pink">' +

      '<div class="study-audio-tile-head"><span>☕ Pink Noise Cafe</span><span class="study-sound-state">Off</span></div>' +

      '<div class="study-audio-wave"></div>' +

      '</div>' +

      '</div>' +

      '</div>' +



      '<div class="study-calc-card">' +

      '<h4>📊 Confusion Matrix &amp; Classification Metrics</h4>' +

      '<div class="study-calc-inputs">' +

      '<div class="study-calc-field"><label>TP (True Pos)</label><input type="number" id="calcTP" value="85" min="0" /></div>' +

      '<div class="study-calc-field"><label>FP (False Pos)</label><input type="number" id="calcFP" value="15" min="0" /></div>' +

      '<div class="study-calc-field"><label>FN (False Neg)</label><input type="number" id="calcFN" value="10" min="0" /></div>' +

      '<div class="study-calc-field"><label>TN (True Neg)</label><input type="number" id="calcTN" value="90" min="0" /></div>' +

      '</div>' +

      '<div class="study-calc-results">' +

      '<div class="study-calc-pill"><span>Accuracy</span><strong id="outAccuracy">92.0%</strong></div>' +

      '<div class="study-calc-pill"><span>Precision</span><strong id="outPrecision">85.0%</strong></div>' +

      '<div class="study-calc-pill"><span>Recall (Sens.)</span><strong id="outRecall">89.5%</strong></div>' +

      '<div class="study-calc-pill"><span>Specificity</span><strong id="outSpecificity">85.7%</strong></div>' +

      '<div class="study-calc-pill"><span>F1-Score</span><strong id="outF1">0.872</strong></div>' +

      '</div>' +

      '</div>' +



      '<div class="study-calc-card">' +

      '<h4>🌲 Decision Tree Gini &amp; Entropy</h4>' +

      '<div class="study-calc-inputs">' +

      '<div class="study-calc-field" style="grid-column:1/-1;">' +

      '<label>Class Samples (comma-separated, e.g. 10, 25 or 40, 40, 20)</label>' +

      '<input type="text" id="calcTreeCounts" value="30, 20" />' +

      '</div>' +

      '</div>' +

      '<div class="study-calc-results">' +

      '<div class="study-calc-pill"><span>Gini Impurity</span><strong id="outGini">0.480</strong></div>' +

      '<div class="study-calc-pill"><span>Shannon Entropy</span><strong id="outEntropy">0.971 bits</strong></div>' +

      '</div>' +

      '</div>' +



      '<div class="study-calc-card">' +

      '<h4>📈 Sigmoid &amp; Binary Cross-Entropy Loss</h4>' +

      '<div class="study-calc-inputs">' +

      '<div class="study-calc-field"><label>Logit z (wᵀx + b)</label><input type="number" id="calcLogitZ" value="1.5" step="0.1" /></div>' +

      '<div class="study-calc-field"><label>True Label y (0 or 1)</label><input type="number" id="calcTrueY" value="1" min="0" max="1" /></div>' +

      '</div>' +

      '<div class="study-calc-results">' +

      '<div class="study-calc-pill"><span>σ(z) Probability</span><strong id="outSigmoid">0.818</strong></div>' +

      '<div class="study-calc-pill"><span>Binary CE Loss</span><strong id="outLoss">0.201</strong></div>' +

      '</div>' +

      '</div>' +

      '</div>' +



      // Tab 7: Tools, Math Calculators, Ambient Sound & Speech

      '<div class="study-panel" id="tabPanelTools">' +

      '<div class="study-reader-group">' +

      '<label>🎧 Read Aloud (Text-to-Speech)</label>' +

      '<div class="study-tts-banner">' +

      '<span id="ttsStatusText" style="font-size:12px;color:#9ca3af;">Ready to listen to this guide</span>' +

      '<div style="display:flex;gap:6px;">' +

      '<button type="button" class="study-btn study-btn--accent" id="ttsPlayBtn">▶ Play</button>' +

      '<button type="button" class="study-btn" id="ttsStopBtn">■ Stop</button>' +

      '</div>' +

      '</div>' +

      '<div style="display:flex;align-items:center;justify-content:space-between;font-size:12px;color:#9ca3af;">' +

      '<span>Reading Speed:</span>' +

      '<div class="study-segmented-btn" id="ttsSpeedBtns">' +

      '<button type="button" data-speed="1.0" class="active">1x</button>' +

      '<button type="button" data-speed="1.25">1.25x</button>' +

      '<button type="button" data-speed="1.5">1.5x</button>' +

      '</div>' +

      '</div>' +

      '</div>' +



      '<div class="study-reader-group">' +

      '<label>🌧️ Ambient Study Soundscapes (Offline Focus)</label>' +

      '<div class="study-audio-grid">' +

      '<div class="study-audio-tile" data-sound="rain">' +

      '<div class="study-audio-tile-head"><span>🌧️ Rain Shower</span><span class="study-sound-state">Off</span></div>' +

      '<div class="study-audio-wave"></div>' +

      '</div>' +

      '<div class="study-audio-tile" data-sound="brown">' +

      '<div class="study-audio-tile-head"><span>🌊 Deep Ocean</span><span class="study-sound-state">Off</span></div>' +

      '<div class="study-audio-wave"></div>' +

      '</div>' +

      '<div class="study-audio-tile" data-sound="gamma">' +

      '<div class="study-audio-tile-head"><span>🧠 40Hz Gamma Focus</span><span class="study-sound-state">Off</span></div>' +

      '<div class="study-audio-wave"></div>' +

      '</div>' +

      '<div class="study-audio-tile" data-sound="pink">' +

      '<div class="study-audio-tile-head"><span>☕ Pink Noise Cafe</span><span class="study-sound-state">Off</span></div>' +

      '<div class="study-audio-wave"></div>' +

      '</div>' +

      '</div>' +

      '</div>' +



      '<div class="study-calc-card">' +

      '<h4>📊 Confusion Matrix &amp; Classification Metrics</h4>' +

      '<div class="study-calc-inputs">' +

      '<div class="study-calc-field"><label>TP (True Pos)</label><input type="number" id="calcTP" value="85" min="0" /></div>' +

      '<div class="study-calc-field"><label>FP (False Pos)</label><input type="number" id="calcFP" value="15" min="0" /></div>' +

      '<div class="study-calc-field"><label>FN (False Neg)</label><input type="number" id="calcFN" value="10" min="0" /></div>' +

      '<div class="study-calc-field"><label>TN (True Neg)</label><input type="number" id="calcTN" value="90" min="0" /></div>' +

      '</div>' +

      '<div class="study-calc-results">' +

      '<div class="study-calc-pill"><span>Accuracy</span><strong id="outAccuracy">92.0%</strong></div>' +

      '<div class="study-calc-pill"><span>Precision</span><strong id="outPrecision">85.0%</strong></div>' +

      '<div class="study-calc-pill"><span>Recall (Sens.)</span><strong id="outRecall">89.5%</strong></div>' +

      '<div class="study-calc-pill"><span>Specificity</span><strong id="outSpecificity">85.7%</strong></div>' +

      '<div class="study-calc-pill"><span>F1-Score</span><strong id="outF1">0.872</strong></div>' +

      '</div>' +

      '</div>' +



      '<div class="study-calc-card">' +

      '<h4>🌲 Decision Tree Gini &amp; Entropy</h4>' +

      '<div class="study-calc-inputs">' +

      '<div class="study-calc-field" style="grid-column:1/-1;">' +

      '<label>Class Samples (comma-separated, e.g. 10, 25 or 40, 40, 20)</label>' +

      '<input type="text" id="calcTreeCounts" value="30, 20" />' +

      '</div>' +

      '</div>' +

      '<div class="study-calc-results">' +

      '<div class="study-calc-pill"><span>Gini Impurity</span><strong id="outGini">0.480</strong></div>' +

      '<div class="study-calc-pill"><span>Shannon Entropy</span><strong id="outEntropy">0.971 bits</strong></div>' +

      '</div>' +

      '</div>' +



      '<div class="study-calc-card">' +

      '<h4>📈 Sigmoid &amp; Binary Cross-Entropy Loss</h4>' +

      '<div class="study-calc-inputs">' +

      '<div class="study-calc-field"><label>Logit z (wᵀx + b)</label><input type="number" id="calcLogitZ" value="1.5" step="0.1" /></div>' +

      '<div class="study-calc-field"><label>True Label y (0 or 1)</label><input type="number" id="calcTrueY" value="1" min="0" max="1" /></div>' +

      '</div>' +

      '<div class="study-calc-results">' +

      '<div class="study-calc-pill"><span>σ(z) Probability</span><strong id="outSigmoid">0.818</strong></div>' +

      '<div class="study-calc-pill"><span>Binary CE Loss</span><strong id="outLoss">0.201</strong></div>' +

      '</div>' +

      '</div>' +

      '</div>' +



            // Tab 8: Syllabus Progress & Exam Readiness Gauge
      '<div class="study-panel" id="tabPanelChecklist">' +
      '<div class="study-readiness-card">' +
      '<div class="study-readiness-meter">' +
      '<span style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#9ca3af;">GATE DA Readiness</span>' +
      '<span class="study-readiness-val" id="studyReadinessPct">0%</span>' +
      '<span class="study-readiness-desc" id="studyReadinessStatus">Novice (Get Started)</span>' +
      '</div>' +
      '<div style="flex:1;max-width:200px;">' +
      '<div class="study-readiness-bar-wrap">' +
      '<div class="study-readiness-bar-fill" id="studyReadinessBar"></div>' +
      '</div>' +
      '<div style="display:flex;justify-content:space-between;font-size:10.5px;color:#9ca3af;margin-top:6px;">' +
      '<span id="studyReadinessCoreCount">0/10 Core Units</span>' +
      '<span id="studyReadinessAppCount">0/5 Review</span>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="study-check-group-title">Core Syllabus Units (GATE DA)</div>' +
      '<div id="checklistCoreContainer"></div>' +
      '<div class="study-check-group-title">Appendices, Formulas &amp; 90-Day Plan</div>' +
      '<div id="checklistAppContainer"></div>' +
      '</div>' +

      // Tab 6: Reader Controls & Zen Mode

      '<div class="study-panel" id="tabPanelReader">' +

      '<div class="study-reader-group">' +

      '<label>Text Size</label>' +

      '<div class="study-segmented-btn" id="studySizeBtns">' +

      '<button type="button" data-size="sm">Small</button>' +

      '<button type="button" class="active" data-size="normal">Default</button>' +

      '<button type="button" data-size="lg">Large</button>' +

      '<button type="button" data-size="xl">Extra</button>' +

      '</div>' +

      '</div>' +

      '<div class="study-reader-group">' +

      '<label>Typography Font</label>' +

      '<div class="study-segmented-btn" id="studyFontBtns">' +

      '<button type="button" class="active" data-font="sans">Clean Sans</button>' +

      '<button type="button" data-font="serif">Book Serif</button>' +

      '<button type="button" data-font="mono">Mono</button>' +

      '</div>' +

      '</div>' +

      '<div class="study-reader-group">' +

      '<label>Zen Reading Mode</label>' +

      '<p style="font-size:12px;color:#9ca3af;margin:0 0 10px;">Hides header, sidebar, and all distractions for deep focus reading.</p>' +

      '<button type="button" class="study-btn study-btn--accent" id="studyZenToggle" style="justify-content:center;padding:10px;">Enter Zen Focus Mode</button>' +

      '</div>' +

      '<div class="study-reader-group">' +

      '<label>Reading Bookmark</label>' +

      '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">' +

      '<span id="studyBookmarkText" style="font-size:12px;color:#9ca3af;">No bookmark saved</span>' +

      '<button type="button" class="study-btn" id="studySaveBookmarkBtn">Save Position</button>' +

      '</div>' +

      '<button type="button" class="study-btn" id="studyResumeBookmarkBtn" style="display:none;margin-top:8px;justify-content:center;">Resume at Saved Spot &rarr;</button>' +

      '</div>' +

      '<div class="study-reader-group">' +

      '<label>Unit Completion Checklist (<span id="unitCheckCount">0/10</span>)</label>' +

      '<div class="study-checklist" id="unitChecklist"></div>' +

      '</div>' +

      '</div>' +



      '</div>'; // end drawer body



    document.body.appendChild(drawer);

  }



  // ------------------------------------------------------------

  // Highlighting Engine

  // ------------------------------------------------------------

  function initHighlightEngine() {

    var selectionBar = document.getElementById("studySelectionBar");

    var currentRange = null;



    // Detect text selection

    function handleSelection() {

      var sel = window.getSelection();

      if (!sel || sel.isCollapsed || !sel.rangeCount) {

        if (selectionBar) selectionBar.classList.remove("active");

        currentRange = null;

        return;

      }



      var text = sel.toString().trim();

      if (!text || text.length < 2) {

        if (selectionBar) selectionBar.classList.remove("active");

        currentRange = null;

        return;

      }



      var range = sel.getRangeAt(0);

      // Ensure selection is inside main content

      var main = document.getElementById("main") || document.querySelector(".shell") || document.body;

      if (!main.contains(range.commonAncestorContainer)) {

        if (selectionBar) selectionBar.classList.remove("active");

        return;

      }



      currentRange = range.cloneRange();

      var rect = range.getBoundingClientRect();

      if (rect.width === 0 || rect.height === 0) return;



      var top = rect.top + window.scrollY;

      var left = rect.left + rect.width / 2;



      selectionBar.style.top = top + "px";

      selectionBar.style.left = left + "px";

      selectionBar.classList.add("active");

    }



    document.addEventListener("mouseup", function (e) {

      if (selectionBar && selectionBar.contains(e.target)) return;

      setTimeout(handleSelection, 20);

    });



    document.addEventListener("touchend", function (e) {

      if (selectionBar && selectionBar.contains(e.target)) return;

      setTimeout(handleSelection, 50);

    });



    document.addEventListener("mousedown", function (e) {

      if (selectionBar && !selectionBar.contains(e.target)) {

        selectionBar.classList.remove("active");

      }

    });



    // Color buttons on floating bar

    selectionBar.querySelectorAll("[data-color]").forEach(function (btn) {

      btn.addEventListener("click", function (e) {

        e.preventDefault();

        e.stopPropagation();

        var color = btn.getAttribute("data-color");

        applyHighlight(color, "");

      });

    });



    // Add Note button on floating bar

    var addNoteBtn = document.getElementById("studySelAddNote");

    if (addNoteBtn) {

      addNoteBtn.addEventListener("click", function (e) {

        e.preventDefault();

        var hl = applyHighlight("yellow", "");

        if (hl) {

          openHlPopover(hl.id);

        }

      });

    }



    // Copy Quote button

    var copyQuoteBtn = document.getElementById("studySelCopy");

    if (copyQuoteBtn) {

      copyQuoteBtn.addEventListener("click", function (e) {

        e.preventDefault();

        var sel = window.getSelection();

        if (!sel) return;

        var text = sel.toString().trim();

        var unit = detectUnitFromNode(sel.anchorNode);

        var formatted = '"' + text + '" — GATE ML Study Guide (' + unit + ')';

        navigator.clipboard.writeText(formatted).then(function () {

          copyQuoteBtn.textContent = "Copied!";

          setTimeout(function () { copyQuoteBtn.textContent = "📋 Copy"; }, 1500);

        });

      });

    }



    function applyHighlight(color, initialNote) {

      if (!currentRange) return null;

      var text = currentRange.toString().trim();

      if (!text) return null;



      var hlId = "hl_" + Date.now() + "_" + Math.floor(Math.random() * 1000);

      var unit = detectUnitFromNode(currentRange.startContainer);



      var mark = document.createElement("mark");

      mark.className = "study-hl study-hl--" + color;

      mark.setAttribute("data-hl-id", hlId);

      mark.title = initialNote || "Click to add note or change color";



      try {

        currentRange.surroundContents(mark);

      } catch (err) {

        // Selection crossed DOM boundary, extractContents fallback

        var frag = currentRange.extractContents();

        mark.appendChild(frag);

        currentRange.insertNode(mark);

      }



      var newHl = {

        id: hlId,

        text: text,

        color: color,

        note: initialNote || "",

        unit: unit,

        createdAt: new Date().toISOString()

      };



      highlights.push(newHl);

      writeStorage(HL_KEY, highlights);



      updateCounts();

      renderHighlightsList();

      renderAnnotationsList();



      if (selectionBar) selectionBar.classList.remove("active");

      window.getSelection().removeAllRanges();

      currentRange = null;



      wireMarkClicks(mark);

      return newHl;

    }

  }



  // Click on rendered highlight in text

  function wireMarkClicks(mark) {

    mark.addEventListener("click", function (e) {

      e.preventDefault();

      e.stopPropagation();

      var id = mark.getAttribute("data-hl-id");

      openHlPopover(id, mark);

    });

  }



  function openHlPopover(id, targetMark) {

    var popover = document.getElementById("studyHlPopover");

    var textarea = document.getElementById("studyHlPopoverText");

    var unitLabel = document.getElementById("studyHlPopoverUnit");

    if (!popover || !textarea) return;



    var hl = highlights.find(function (h) { return h.id === id; });

    if (!hl) return;



    activeHlTarget = hl;

    textarea.value = hl.note || "";

    unitLabel.textContent = hl.unit || "Highlight";



    var mark = targetMark || document.querySelector('[data-hl-id="' + id + '"]');

    if (mark) {

      var rect = mark.getBoundingClientRect();

      popover.style.top = (rect.bottom + window.scrollY + 6) + "px";

      popover.style.left = (rect.left + rect.width / 2) + "px";

    }



    popover.classList.add("active");

    textarea.focus();

  }



  function initPopoverActions() {

    var popover = document.getElementById("studyHlPopover");

    var textarea = document.getElementById("studyHlPopoverText");

    var saveBtn = document.getElementById("studyHlPopoverSave");

    var closeBtn = document.getElementById("studyHlPopoverClose");

    var delBtn = document.getElementById("studyHlPopoverDelete");



    if (closeBtn) {

      closeBtn.addEventListener("click", function () {

        popover.classList.remove("active");

        activeHlTarget = null;

      });

    }



    if (saveBtn) {

      saveBtn.addEventListener("click", function () {

        if (!activeHlTarget) return;

        activeHlTarget.note = textarea.value.trim();

        writeStorage(HL_KEY, highlights);

        var mark = document.querySelector('[data-hl-id="' + activeHlTarget.id + '"]');

        if (mark) mark.title = activeHlTarget.note || "Click to edit note";

        popover.classList.remove("active");

        updateCounts();

        renderHighlightsList();

        renderAnnotationsList();

      });

    }



    if (delBtn) {

      delBtn.addEventListener("click", function () {

        if (!activeHlTarget) return;

        deleteHighlight(activeHlTarget.id);

        popover.classList.remove("active");

        activeHlTarget = null;

      });

    }



    // Color switcher in popover

    popover.querySelectorAll("[data-hl-color]").forEach(function (btn) {

      btn.addEventListener("click", function () {

        if (!activeHlTarget) return;

        var newColor = btn.getAttribute("data-hl-color");

        activeHlTarget.color = newColor;

        writeStorage(HL_KEY, highlights);



        var mark = document.querySelector('[data-hl-id="' + activeHlTarget.id + '"]');

        if (mark) {

          mark.className = "study-hl study-hl--" + newColor;

        }

        renderHighlightsList();

        renderAnnotationsList();

      });

    });

  }



  function deleteHighlight(id) {

    highlights = highlights.filter(function (h) { return h.id !== id; });

    writeStorage(HL_KEY, highlights);



    var mark = document.querySelector('[data-hl-id="' + id + '"]');

    if (mark) {

      var parent = mark.parentNode;

      while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);

      parent.removeChild(mark);

      parent.normalize();

    }



    updateCounts();

    renderHighlightsList();

    renderAnnotationsList();

  }



  // Restore highlights across reloads by searching text in DOM

  function restoreHighlights() {

    if (!highlights.length) return;

    var container = document.getElementById("main") || document.body;



    highlights.forEach(function (h) {

      if (!h.text || h.text.length < 2) return;

      var mark = document.querySelector('[data-hl-id="' + h.id + '"]');

      if (mark) {

        wireMarkClicks(mark);

        return;

      }



      // Find first occurrence of text

      var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);

      var node;

      while ((node = walker.nextNode())) {

        var idx = node.nodeValue.indexOf(h.text);

        if (idx !== -1) {

          try {

            var range = document.createRange();

            range.setStart(node, idx);

            range.setEnd(node, idx + h.text.length);



            var m = document.createElement("mark");

            m.className = "study-hl study-hl--" + h.color;

            m.setAttribute("data-hl-id", h.id);

            m.title = h.note || "Click to add note or change color";

            range.surroundContents(m);

            wireMarkClicks(m);

            break;

          } catch (e) {}

        }

      }

    });

  }



  // ------------------------------------------------------------

  // Drawer & Tab Management

  // ------------------------------------------------------------

  function initDrawer() {

    var drawer = document.getElementById("studyDrawer");

    var backdrop = document.getElementById("studyBackdrop");

    var openBtn = document.getElementById("studyDockHubBtn");

    var closeBtn = document.getElementById("studyDrawerClose");



    function openDrawer(tabToOpen) {

      if (tabToOpen) switchTab(tabToOpen);

      drawer.classList.add("open");

      backdrop.classList.add("active");

      document.body.style.overflow = "hidden";

    }



    function closeDrawer() {

      drawer.classList.remove("open");

      backdrop.classList.remove("active");

      document.body.style.overflow = "";

    }



    if (openBtn) openBtn.addEventListener("click", function () { openDrawer(); });

    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);

    if (backdrop) backdrop.addEventListener("click", closeDrawer);



    document.addEventListener("keydown", function (e) {

      if (e.key === "Escape" && drawer.classList.contains("open")) {

        closeDrawer();

      }

    });



    // Tab buttons

    drawer.querySelectorAll(".study-tab-btn").forEach(function (btn) {

      btn.addEventListener("click", function () {

        var tab = btn.getAttribute("data-tab");

        switchTab(tab);

      });

    });



    // Dock pomodoro button opens Pomo tab

    var dockPomo = document.getElementById("studyDockPomoBtn");

    if (dockPomo) {

      dockPomo.addEventListener("click", function () {

        openDrawer("pomo");

      });

    }



    return { open: openDrawer, close: closeDrawer };

  }



  function switchTab(tabName) {

    var drawer = document.getElementById("studyDrawer");

    if (!drawer) return;



    drawer.querySelectorAll(".study-tab-btn").forEach(function (btn) {

      btn.classList.toggle("active", btn.getAttribute("data-tab") === tabName);

    });



    var panelMap = {

      notes: "tabPanelNotes",

      highlights: "tabPanelHighlights",

      flashcards: "tabPanelFlashcards",

      formulas: "tabPanelFormulas",

      pomo: "tabPanelPomo",

      tools: "tabPanelTools",

      reader: "tabPanelReader"

    };



    drawer.querySelectorAll(".study-panel").forEach(function (p) {

      p.classList.remove("active");

    });



    var targetId = panelMap[tabName];

    if (targetId) {

      var panel = document.getElementById(targetId);

      if (panel) panel.classList.add("active");

    }

  }



  // ------------------------------------------------------------

  // Notes Tab Logic

  // ------------------------------------------------------------

  function initNotes() {

    var select = document.getElementById("studyUnitSelect");

    var textarea = document.getElementById("studyUnitTextarea");

    var status = document.getElementById("studyNotesSaveStatus");

    var wordCount = document.getElementById("studyNotesWordCount");

    var exportBtn = document.getElementById("studyExportNotesBtn");

    var copyBtn = document.getElementById("studyCopyNotesBtn");



    function updateWordCount() {

      var txt = textarea.value.trim();

      var count = txt ? txt.split(/\s+/).length : 0;

      wordCount.textContent = count + " word" + (count === 1 ? "" : "s");

    }



    function loadUnitNote() {

      var uId = select.value;

      textarea.value = unitNotes[uId] || "";

      updateWordCount();

    }



    select.addEventListener("change", loadUnitNote);

    loadUnitNote();



    textarea.addEventListener("input", function () {

      var uId = select.value;

      unitNotes[uId] = textarea.value;

      writeStorage(UNIT_NOTES_KEY, unitNotes);

      status.textContent = "Saved locally";

      updateWordCount();

      setTimeout(function () { status.textContent = "Autosaves locally"; }, 2000);

    });



    // Export all notes as a clean Markdown file

    exportBtn.addEventListener("click", function () {

      var md = "# GATE ML — My Study Notes & Annotations\n\n";

      md += "_Generated on " + new Date().toLocaleDateString() + " via hellogaurav.me/ml-guide_\n\n---\n\n";



      // Unit notes

      md += "## 1. Unit & Topic Notebooks\n\n";

      var hasUnitNotes = false;

      Object.keys(unitNotes).forEach(function (key) {

        var val = unitNotes[key];

        if (val && val.trim()) {

          hasUnitNotes = true;

          var title = key === "general" ? "General Guide Notes" : (UNITS.find(function(u){return u.id===key;}) || {name: key}).name;

          md += "### " + title + "\n\n" + val.trim() + "\n\n";

        }

      });

      if (!hasUnitNotes) md += "_No unit scratchpad notes written yet._\n\n";



      // Highlights and quotes

      md += "---\n\n## 2. Highlighted Excerpts & Formulas\n\n";

      if (highlights.length) {

        highlights.forEach(function (h) {

          md += "> " + h.text + "\n\n";

          md += "**Section:** " + (h.unit || "General") + "  \n";

          if (h.note) md += "**My Note:** " + h.note + "  \n";

          md += "\n";

        });

      } else {

        md += "_No highlights saved yet._\n\n";

      }



      var blob = new Blob([md], { type: "text/markdown;charset=utf-8" });

      var url = URL.createObjectURL(blob);

      var a = document.createElement("a");

      a.href = url;

      a.download = "gate-ml-study-notes.md";

      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);

      URL.revokeObjectURL(url);

    });



    // Copy all notes to clipboard

    copyBtn.addEventListener("click", function () {

      var fullText = "";

      Object.keys(unitNotes).forEach(function (key) {

        var val = unitNotes[key];

        if (val && val.trim()) {

          fullText += "=== " + key + " ===\n" + val.trim() + "\n\n";

        }

      });

      highlights.forEach(function (h) {

        if (h.note) {

          fullText += 'Quote: "' + h.text + '"\nNote: ' + h.note + '\n\n';

        }

      });



      if (!fullText.trim()) {

        copyBtn.textContent = "Empty";

        setTimeout(function () { copyBtn.textContent = "📋 Copy"; }, 1500);

        return;

      }



      navigator.clipboard.writeText(fullText).then(function () {

        copyBtn.textContent = "Copied!";

        setTimeout(function () { copyBtn.textContent = "📋 Copy"; }, 1500);

      });

    });

  }



  function renderAnnotationsList() {

    var container = document.getElementById("studyAnnotationsList");

    var countLabel = document.getElementById("studyAnnotationCount");

    if (!container) return;



    var annotated = highlights.filter(function (h) { return h.note && h.note.trim().length > 0; });

    if (countLabel) countLabel.textContent = annotated.length + " item" + (annotated.length === 1 ? "" : "s");



    if (!annotated.length) {

      container.innerHTML = '<div class="study-empty-state">No annotated notes yet.<br>Select any text in the guide and click "Note" to attach personal thoughts here!</div>';

      return;

    }



    var html = "";

    annotated.forEach(function (h) {

      html +=

        '<div class="study-note-card study-note-card--' + h.color + '">' +

        '<div class="study-note-card__meta">' +

        '<strong>' + escapeHtml(h.unit || "Guide") + '</strong>' +

        '<span>' + new Date(h.createdAt || Date.now()).toLocaleDateString() + '</span>' +

        '</div>' +

        '<p class="study-note-card__quote">&ldquo;' + escapeHtml(h.text) + '&rdquo;</p>' +

        '<p class="study-note-card__text">' + escapeHtml(h.note) + '</p>' +

        '<div class="study-note-card__actions">' +

        '<button type="button" class="study-action-link" data-jump-id="' + h.id + '">Jump to text</button>' +

        '<button type="button" class="study-action-link" data-edit-note="' + h.id + '">Edit</button>' +

        '<button type="button" class="study-action-link study-action-link--danger" data-del-note="' + h.id + '">Delete</button>' +

        '</div>' +

        '</div>';

    });

    container.innerHTML = html;



    // Jump to text

    container.querySelectorAll("[data-jump-id]").forEach(function (btn) {

      btn.addEventListener("click", function () {

        var id = btn.getAttribute("data-jump-id");

        jumpToHighlight(id);

      });

    });



    // Edit note

    container.querySelectorAll("[data-edit-note]").forEach(function (btn) {

      btn.addEventListener("click", function () {

        var id = btn.getAttribute("data-edit-note");

        openHlPopover(id);

      });

    });



    // Delete note only

    container.querySelectorAll("[data-del-note]").forEach(function (btn) {

      btn.addEventListener("click", function () {

        var id = btn.getAttribute("data-del-note");

        var hl = highlights.find(function (h) { return h.id === id; });

        if (hl) {

          hl.note = "";

          writeStorage(HL_KEY, highlights);

          renderAnnotationsList();

        }

      });

    });

  }



  function jumpToHighlight(id) {

    var mark = document.querySelector('[data-hl-id="' + id + '"]');

    if (!mark) {

      alert("This passage could not be found in the active view.");

      return;

    }

    // Close drawer to see text

    var drawer = document.getElementById("studyDrawer");

    var backdrop = document.getElementById("studyBackdrop");

    if (drawer) drawer.classList.remove("open");

    if (backdrop) backdrop.classList.remove("active");

    document.body.style.overflow = "";



    mark.scrollIntoView({ behavior: "smooth", block: "center" });

    mark.classList.add("study-hl--pulse");

    setTimeout(function () { mark.classList.remove("study-hl--pulse"); }, 2000);

  }



  // ------------------------------------------------------------

  // Highlights Tab Logic

  // ------------------------------------------------------------

  var activeHlFilter = "all";



  function initHighlightsTab() {

    var filterBar = document.querySelector(".study-filter-bar");

    if (filterBar) {

      filterBar.querySelectorAll(".study-filter-pill").forEach(function (btn) {

        btn.addEventListener("click", function () {

          filterBar.querySelectorAll(".study-filter-pill").forEach(function (b) { b.classList.remove("active"); });

          btn.classList.add("active");

          activeHlFilter = btn.getAttribute("data-filter");

          renderHighlightsList();

        });

      });

    }



    var clearBtn = document.getElementById("studyClearAllHlBtn");

    if (clearBtn) {

      clearBtn.addEventListener("click", function () {

        if (!highlights.length) return;

        if (confirm("Are you sure you want to remove all saved highlights?")) {

          highlights.forEach(function (h) {

            var m = document.querySelector('[data-hl-id="' + h.id + '"]');

            if (m) {

              var parent = m.parentNode;

              while (m.firstChild) parent.insertBefore(m.firstChild, m);

              parent.removeChild(m);

            }

          });

          highlights = [];

          writeStorage(HL_KEY, []);

          updateCounts();

          renderHighlightsList();

          renderAnnotationsList();

        }

      });

    }

  }



  function renderHighlightsList() {

    var container = document.getElementById("studyHighlightsList");

    if (!container) return;



    var filtered = highlights;

    if (activeHlFilter !== "all") {

      filtered = highlights.filter(function (h) { return h.color === activeHlFilter; });

    }



    if (!filtered.length) {

      container.innerHTML = '<div class="study-empty-state">No highlights match this filter.<br>Select any text in the guide to highlight key concepts!</div>';

      return;

    }



    var html = "";

    filtered.forEach(function (h) {

      var noteHtml = h.note ? '<p class="study-note-card__text" style="font-size:12px;color:#cbd5e1;">📝 ' + escapeHtml(h.note) + '</p>' : '';

      html +=

        '<div class="study-note-card study-note-card--' + h.color + '">' +

        '<div class="study-note-card__meta">' +

        '<strong>' + escapeHtml(h.unit || "Guide") + '</strong>' +

        '<span>' + new Date(h.createdAt || Date.now()).toLocaleDateString() + '</span>' +

        '</div>' +

        '<p class="study-note-card__quote">&ldquo;' + escapeHtml(h.text) + '&rdquo;</p>' +

        noteHtml +

        '<div class="study-note-card__actions">' +

        '<button type="button" class="study-action-link" data-jump-id="' + h.id + '">Jump to text</button>' +

        '<button type="button" class="study-action-link" data-add-note="' + h.id + '">' + (h.note ? 'Edit note' : '+ Add note') + '</button>' +

        '<button type="button" class="study-action-link study-action-link--danger" data-del-hl="' + h.id + '">Delete</button>' +

        '</div>' +

        '</div>';

    });

    container.innerHTML = html;



    container.querySelectorAll("[data-jump-id]").forEach(function (btn) {

      btn.addEventListener("click", function () {

        jumpToHighlight(btn.getAttribute("data-jump-id"));

      });

    });



    container.querySelectorAll("[data-add-note]").forEach(function (btn) {

      btn.addEventListener("click", function () {

        openHlPopover(btn.getAttribute("data-add-note"));

      });

    });



    container.querySelectorAll("[data-del-hl]").forEach(function (btn) {

      btn.addEventListener("click", function () {

        deleteHighlight(btn.getAttribute("data-del-hl"));

      });

    });

  }



  function updateCounts() {

    var totalHl = highlights.length;

    var notesCount = highlights.filter(function (h) { return h.note && h.note.trim(); }).length;



    var dockBadge = document.getElementById("studyDockCount");

    if (dockBadge) dockBadge.textContent = totalHl + (notesCount ? " • " + notesCount + " 📝" : "");



    var tabHlCount = document.getElementById("studyTabHlCount");

    if (tabHlCount) tabHlCount.textContent = totalHl;



    var tabNotesCount = document.getElementById("studyTabNotesCount");

    if (tabNotesCount) tabNotesCount.textContent = notesCount;



    // Highlight filter counters

    var cAll = document.getElementById("hlFilterAllCount");

    if (cAll) cAll.textContent = totalHl;

    var cY = document.getElementById("hlFilterYellowCount");

    if (cY) cY.textContent = highlights.filter(function (h) { return h.color === "yellow"; }).length;

    var cG = document.getElementById("hlFilterGreenCount");

    if (cG) cG.textContent = highlights.filter(function (h) { return h.color === "green"; }).length;

    var cP = document.getElementById("hlFilterPurpleCount");

    if (cP) cP.textContent = highlights.filter(function (h) { return h.color === "purple"; }).length;

    var cC = document.getElementById("hlFilterCoralCount");

    if (cC) cC.textContent = highlights.filter(function (h) { return h.color === "coral"; }).length;

  }



  // ------------------------------------------------------------

  // Active Recall Flashcards Logic

  // ------------------------------------------------------------

  var curFcIndex = 0;

  var shuffledDeck = FLASHCARD_DECK.slice();



  function initFlashcards() {

    var cardEl = document.getElementById("fcCard");

    var promptEl = document.getElementById("fcPrompt");

    var answerEl = document.getElementById("fcAnswer");

    var codeEl = document.getElementById("fcCode");

    var unitTagEl = document.getElementById("fcUnitTag");

    var progressEl = document.getElementById("fcProgress");

    var masteredCountEl = document.getElementById("fcMasteredCount");



    var prevBtn = document.getElementById("fcPrevBtn");

    var nextBtn = document.getElementById("fcNextBtn");

    var flipBtn = document.getElementById("fcFlipBtn");

    var shuffleBtn = document.getElementById("fcShuffleBtn");

    var againBtn = document.getElementById("fcRateAgain");

    var masteredBtn = document.getElementById("fcRateMastered");



    function renderCard() {

      if (!shuffledDeck.length) return;

      var card = shuffledDeck[curFcIndex];

      cardEl.classList.remove("flipped");



      promptEl.textContent = card.prompt;

      answerEl.textContent = card.answer;

      unitTagEl.textContent = card.unit + " · " + card.topic;



      if (card.code) {

        codeEl.style.display = "block";

        codeEl.textContent = card.code;

      } else {

        codeEl.style.display = "none";

      }



      var isMastered = masteredCards.indexOf(card.id) !== -1;

      progressEl.textContent = "Card " + (curFcIndex + 1) + " of " + shuffledDeck.length + (isMastered ? " (Mastered ✓)" : "");

      masteredCountEl.textContent = masteredCards.length;

    }



    function flipCard() {

      cardEl.classList.toggle("flipped");

    }



    cardEl.addEventListener("click", flipCard);

    flipBtn.addEventListener("click", flipCard);

    cardEl.addEventListener("keydown", function (e) {

      if (e.key === " " || e.key === "Enter") {

        e.preventDefault();

        flipCard();

      }

    });



    nextBtn.addEventListener("click", function () {

      curFcIndex = (curFcIndex + 1) % shuffledDeck.length;

      renderCard();

    });



    prevBtn.addEventListener("click", function () {

      curFcIndex = (curFcIndex - 1 + shuffledDeck.length) % shuffledDeck.length;

      renderCard();

    });



    shuffleBtn.addEventListener("click", function () {

      for (var i = shuffledDeck.length - 1; i > 0; i--) {

        var j = Math.floor(Math.random() * (i + 1));

        var temp = shuffledDeck[i];

        shuffledDeck[i] = shuffledDeck[j];

        shuffledDeck[j] = temp;

      }

      curFcIndex = 0;

      renderCard();

    });



    masteredBtn.addEventListener("click", function () {

      var card = shuffledDeck[curFcIndex];

      if (masteredCards.indexOf(card.id) === -1) {

        masteredCards.push(card.id);

        writeStorage(FLASHCARDS_KEY, masteredCards);

      }

      curFcIndex = (curFcIndex + 1) % shuffledDeck.length;

      renderCard();

    });



    againBtn.addEventListener("click", function () {

      var card = shuffledDeck[curFcIndex];

      masteredCards = masteredCards.filter(function (id) { return id !== card.id; });

      writeStorage(FLASHCARDS_KEY, masteredCards);

      curFcIndex = (curFcIndex + 1) % shuffledDeck.length;

      renderCard();

    });



    renderCard();

  }



  // ------------------------------------------------------------

  // Formula Sheet Tab Logic

  // ------------------------------------------------------------

  function initFormulaSheet() {

    var searchInput = document.getElementById("formulaSearchInput");

    var grid = document.getElementById("studyFormulaGrid");



    function renderFormulas(query) {

      var q = (query || "").toLowerCase().trim();

      var filtered = FORMULAS.filter(function (f) {

        return (

          f.name.toLowerCase().indexOf(q) !== -1 ||

          f.math.toLowerCase().indexOf(q) !== -1 ||

          f.desc.toLowerCase().indexOf(q) !== -1 ||

          f.unit.toLowerCase().indexOf(q) !== -1

        );

      });



      if (!filtered.length) {

        grid.innerHTML = '<div class="study-empty-state">No matching formulas found for "' + escapeHtml(query) + '".</div>';

        return;

      }



      var html = "";

      filtered.forEach(function (f) {

        html +=

          '<div class="study-formula-card">' +

          '<div class="study-formula-card__head">' +

          '<strong>' + escapeHtml(f.name) + '</strong>' +

          '<span>' + escapeHtml(f.unit) + '</span>' +

          '</div>' +

          '<div class="study-formula-card__math">' + escapeHtml(f.math) + '</div>' +

          '<div class="study-formula-card__desc">' + escapeHtml(f.desc) + '</div>' +

          '<div class="study-formula-card__foot">' +

          '<button type="button" class="study-action-link" data-copy-math="' + escapeHtml(f.math) + '">Copy LaTeX</button>' +

          '<a href="#' + f.section + '" class="study-action-link" data-close-drawer="true">Jump to section &rarr;</a>' +

          '</div>' +

          '</div>';

      });

      grid.innerHTML = html;



      grid.querySelectorAll("[data-copy-math]").forEach(function (btn) {

        btn.addEventListener("click", function () {

          var math = btn.getAttribute("data-copy-math");

          navigator.clipboard.writeText(math).then(function () {

            btn.textContent = "Copied!";

            setTimeout(function () { btn.textContent = "Copy LaTeX"; }, 1500);

          });

        });

      });



      grid.querySelectorAll("[data-close-drawer]").forEach(function (link) {

        link.addEventListener("click", function () {

          var drawer = document.getElementById("studyDrawer");

          var backdrop = document.getElementById("studyBackdrop");

          if (drawer) drawer.classList.remove("open");

          if (backdrop) backdrop.classList.remove("active");

          document.body.style.overflow = "";

        });

      });

    }



    searchInput.addEventListener("input", function () {

      renderFormulas(searchInput.value);

    });



    renderFormulas("");

  }



  // ------------------------------------------------------------

  // Pomodoro Focus Timer Logic

  // ------------------------------------------------------------

  function initPomodoro() {

    var startBtn = document.getElementById("pomoStartBtn");

    var resetBtn = document.getElementById("pomoResetBtn");

    var mainDisplay = document.getElementById("pomoMainDisplay");

    var circleFg = document.getElementById("pomoCircleFg");

    var dockTime = document.getElementById("studyDockPomoTime");

    var sessionsLabel = document.getElementById("pomoSessionsCount");

    var minutesLabel = document.getElementById("pomoTotalMinutes");

    var statusLabel = document.getElementById("pomoStatusLabel");



    var DURATIONS = {

      focus: 25 * 60,

      short: 5 * 60,

      long: 15 * 60

    };



    function updateDisplay() {

      var mins = Math.floor(pomoState.timeLeft / 60);

      var secs = pomoState.timeLeft % 60;

      var str = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;



      mainDisplay.textContent = str;

      if (dockTime) {

        dockTime.textContent = str;

        dockTime.classList.toggle("running", pomoState.running);

      }



      // SVG circle dashoffset (total circumference = 2 * PI * 42 ≈ 264)

      var ratio = pomoState.timeLeft / pomoState.totalTime;

      var offset = 264 * (1 - ratio);

      if (circleFg) circleFg.style.strokeDashoffset = offset;



      if (sessionsLabel) sessionsLabel.textContent = pomoState.sessionsCompleted;

      if (minutesLabel) minutesLabel.textContent = pomoState.sessionsCompleted * 25;

    }



    function tick() {

      if (pomoState.timeLeft > 0) {

        pomoState.timeLeft--;

        updateDisplay();

      } else {

        clearInterval(pomoState.intervalId);

        pomoState.running = false;

        startBtn.textContent = "Start Timer";

        playChime();



        if (pomoState.mode === "focus") {

          pomoState.sessionsCompleted++;

          writeStorage(POMO_KEY, { sessions: pomoState.sessionsCompleted });

          alert("🎉 Great focus session! Time for a well-deserved 5-minute break.");

          setMode("short");

        } else {

          alert("🔔 Break completed! Ready to tackle the next machine learning unit?");

          setMode("focus");

        }

      }

    }



    function toggleStart() {

      if (pomoState.running) {

        clearInterval(pomoState.intervalId);

        pomoState.running = false;

        startBtn.textContent = "Resume";

      } else {

        pomoState.running = true;

        startBtn.textContent = "Pause";

        pomoState.intervalId = setInterval(tick, 1000);

      }

      updateDisplay();

    }



    function reset() {

      clearInterval(pomoState.intervalId);

      pomoState.running = false;

      pomoState.timeLeft = DURATIONS[pomoState.mode];

      pomoState.totalTime = DURATIONS[pomoState.mode];

      startBtn.textContent = "Start Timer";

      updateDisplay();

    }



    function setMode(mode) {

      clearInterval(pomoState.intervalId);

      pomoState.running = false;

      pomoState.mode = mode;

      pomoState.timeLeft = DURATIONS[mode];

      pomoState.totalTime = DURATIONS[mode];

      startBtn.textContent = "Start Timer";



      document.querySelectorAll("[data-pomo-mode]").forEach(function (btn) {

        btn.classList.toggle("active", btn.getAttribute("data-pomo-mode") === mode);

      });



      if (statusLabel) {

        statusLabel.textContent = mode === "focus" ? "Study Session" : "Rest & Recharge";

      }

      updateDisplay();

    }



    document.querySelectorAll("[data-pomo-mode]").forEach(function (btn) {

      btn.addEventListener("click", function () {

        setMode(btn.getAttribute("data-pomo-mode"));

      });

    });



    startBtn.addEventListener("click", toggleStart);

    resetBtn.addEventListener("click", reset);



    updateDisplay();

  }



  // ------------------------------------------------------------

  // Reading Comfort, Bookmark, and Zen Mode Logic

  // ------------------------------------------------------------

  function initReaderControls() {

    // 1. Text Size

    var sizeBtns = document.getElementById("studySizeBtns");

    if (sizeBtns) {

      sizeBtns.querySelectorAll("button").forEach(function (b) {

        b.addEventListener("click", function () {

          sizeBtns.querySelectorAll("button").forEach(function (x) { x.classList.remove("active"); });

          b.classList.add("active");

          var s = b.getAttribute("data-size");

          readerSettings.size = s;

          writeStorage(SETTINGS_KEY, readerSettings);

          applyReaderSettings();

        });

      });

    }



    // 2. Font Family

    var fontBtns = document.getElementById("studyFontBtns");

    if (fontBtns) {

      fontBtns.querySelectorAll("button").forEach(function (b) {

        b.addEventListener("click", function () {

          fontBtns.querySelectorAll("button").forEach(function (x) { x.classList.remove("active"); });

          b.classList.add("active");

          var f = b.getAttribute("data-font");

          readerSettings.font = f;

          writeStorage(SETTINGS_KEY, readerSettings);

          applyReaderSettings();

        });

      });

    }



    // 3. Zen Mode Toggle

    var zenBtn = document.getElementById("studyZenToggle");

    if (zenBtn) {

      zenBtn.addEventListener("click", function () {

        var isZen = document.body.classList.toggle("study-zen-mode");

        readerSettings.zen = isZen;

        writeStorage(SETTINGS_KEY, readerSettings);

        zenBtn.textContent = isZen ? "Exit Zen Mode (Esc)" : "Enter Zen Focus Mode";



        // Close drawer to enjoy Zen view

        if (isZen) {

          var drawer = document.getElementById("studyDrawer");

          var backdrop = document.getElementById("studyBackdrop");

          if (drawer) drawer.classList.remove("open");

          if (backdrop) backdrop.classList.remove("active");

          document.body.style.overflow = "";

        }

      });



      document.addEventListener("keydown", function (e) {

        if (e.key === "Escape" && document.body.classList.contains("study-zen-mode")) {

          document.body.classList.remove("study-zen-mode");

          zenBtn.textContent = "Enter Zen Focus Mode";

        }

      });

    }



    // 4. Bookmark & Resume

    var saveBmBtn = document.getElementById("studySaveBookmarkBtn");

    var resumeBmBtn = document.getElementById("studyResumeBookmarkBtn");

    var bmText = document.getElementById("studyBookmarkText");



    function updateBookmarkUI() {

      var saved = readStorage(BOOKMARK_KEY, null);

      if (saved && saved.pos) {

        bmText.textContent = saved.label + " (" + new Date(saved.time).toLocaleDateString() + ")";

        resumeBmBtn.style.display = "flex";

      } else {

        bmText.textContent = "No bookmark saved";

        resumeBmBtn.style.display = "none";

      }

    }



    if (saveBmBtn) {

      saveBmBtn.addEventListener("click", function () {

        var pos = window.scrollY;

        // Detect current unit near top

        var el = document.elementFromPoint(window.innerWidth / 2, 100);

        var label = el ? detectUnitFromNode(el) : "Reading spot";

        var bm = { pos: pos, label: label, time: Date.now() };

        writeStorage(BOOKMARK_KEY, bm);

        updateBookmarkUI();

        saveBmBtn.textContent = "Saved ✓";

        setTimeout(function () { saveBmBtn.textContent = "Save Position"; }, 1500);

      });

    }



    if (resumeBmBtn) {

      resumeBmBtn.addEventListener("click", function () {

        var saved = readStorage(BOOKMARK_KEY, null);

        if (saved && saved.pos) {

          var drawer = document.getElementById("studyDrawer");

          var backdrop = document.getElementById("studyBackdrop");

          if (drawer) drawer.classList.remove("open");

          if (backdrop) backdrop.classList.remove("active");

          document.body.style.overflow = "";

          window.scrollTo({ top: saved.pos, behavior: "smooth" });

        }

      });

    }



    // 5. Unit Checklist

    var checklistEl = document.getElementById("unitChecklist");

    var checkCountEl = document.getElementById("unitCheckCount");



    function renderChecklist() {

      if (!checklistEl) return;

      var html = "";

      var doneCount = 0;

      var coreUnits = UNITS.slice(0, 10);



      coreUnits.forEach(function (u) {

        var isDone = completedUnits.indexOf(u.id) !== -1;

        if (isDone) doneCount++;

        html +=

          '<label class="study-check-item ' + (isDone ? "done" : "") + '">' +

          '<input type="checkbox" data-unit-chk="' + u.id + '" ' + (isDone ? "checked" : "") + ' />' +

          '<span>' + u.name + '</span>' +

          '</label>';

      });



      checklistEl.innerHTML = html;

      if (checkCountEl) checkCountEl.textContent = doneCount + "/" + coreUnits.length;



      checklistEl.querySelectorAll("[data-unit-chk]").forEach(function (chk) {

        chk.addEventListener("change", function () {

          var uId = chk.getAttribute("data-unit-chk");

          if (chk.checked) {

            if (completedUnits.indexOf(uId) === -1) completedUnits.push(uId);

          } else {

            completedUnits = completedUnits.filter(function (id) { return id !== uId; });

          }

          writeStorage(CHECKLIST_KEY, completedUnits);

          renderChecklist();

        });

      });

    }



    applyReaderSettings();

    updateBookmarkUI();

    renderChecklist();

  }



  function applyReaderSettings() {

    if (readerSettings.size) {

      document.body.setAttribute("data-study-size", readerSettings.size);

    }

    if (readerSettings.font) {

      document.body.setAttribute("data-study-font", readerSettings.font);

    }

    if (readerSettings.zen) {

      document.body.classList.add("study-zen-mode");

    }

  }



  // ------------------------------------------------------------

  // Scroll Progress Bar (Top)

  // ------------------------------------------------------------

  function initScrollProgress() {

    var progressBar = document.getElementById("studyProgressBar");

    if (!progressBar) return;



    var ticking = false;

    window.addEventListener("scroll", function () {

      if (!ticking) {

        window.requestAnimationFrame(function () {

          var h = document.documentElement.scrollHeight - window.innerHeight;

          var pct = h > 0 ? (window.scrollY / h) * 100 : 0;

          progressBar.style.width = Math.min(100, Math.max(0, pct)) + "%";

          ticking = false;

        });

        ticking = true;

      }

    });

  }



  // ------------------------------------------------------------

  // Bootstrapping

  // ------------------------------------------------------------



  // ------------------------------------------------------------

  // Interactive Screen Marker & Freehand Annotator

  // ------------------------------------------------------------

  var markerStrokes = readStorage(MARKER_KEY, []);

  var wandActive = readStorage(WAND_KEY, false);



  var markerState = {

    active: false,

    tool: "pen", // pen, highlighter, arrow, box, eraser

    color: "#fde047",

    size: 5,

    inkVisible: true,

    drawing: false,

    startX: 0,

    startY: 0,

    currentPoints: []

  };



  function initScreenMarker() {

    var canvas = document.getElementById("studyMarkerCanvas");

    var toolbar = document.getElementById("studyMarkerToolbar");

    var dockMarkerBtn = document.getElementById("studyDockMarkerBtn");

    if (!canvas || !toolbar) return;



    var ctx = canvas.getContext("2d");



    function resizeCanvas() {

      var w = window.innerWidth;

      var h = window.innerHeight;

      if (canvas.width !== w || canvas.height !== h) {

        canvas.width = w;

        canvas.height = h;

        redrawStrokes();

      }

    }



    var resizeTicking = false;
    window.addEventListener("resize", function () {
      if (!resizeTicking) {
        resizeTicking = true;
        window.requestAnimationFrame(function () {
          resizeCanvas();
          resizeTicking = false;
        });
      }
    }, { passive: true });

    setTimeout(resizeCanvas, 500);



    function redrawStrokes() {

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!markerState.inkVisible) return;



      markerStrokes.forEach(function (stroke) {

        drawStrokeItem(ctx, stroke);

      });

    }



    function hexToRgba(hex, alpha) {

      var c = hex.replace("#", "");

      if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];

      var num = parseInt(c, 16);

      return "rgba(" + ((num >> 16) & 255) + "," + ((num >> 8) & 255) + "," + (num & 255) + "," + alpha + ")";

    }



    function drawStrokeItem(c, s) {

      c.save();

      if (s.tool === "eraser") {

        c.globalCompositeOperation = "destination-out";

        c.lineWidth = s.size * 3;

        c.lineCap = "round";

        c.lineJoin = "round";

      } else if (s.tool === "highlighter") {

        c.globalCompositeOperation = "source-over";

        c.strokeStyle = hexToRgba(s.color, 0.35);

        c.lineWidth = s.size * 3.5;

        c.lineCap = "square";

        c.lineJoin = "miter";

      } else {

        c.globalCompositeOperation = "source-over";

        c.strokeStyle = s.color;

        c.lineWidth = s.size;

        c.lineCap = "round";

        c.lineJoin = "round";

      }



      if (s.tool === "arrow") {

        var p0 = s.points[0];

        var p1 = s.points[s.points.length - 1];

        if (p0 && p1) {

          c.beginPath();

          c.moveTo(p0.x, p0.y);

          c.lineTo(p1.x, p1.y);

          c.stroke();

          // Arrowhead

          var angle = Math.atan2(p1.y - p0.y, p1.x - p0.x);

          var headLen = Math.max(12, s.size * 3);

          c.beginPath();

          c.moveTo(p1.x, p1.y);

          c.lineTo(p1.x - headLen * Math.cos(angle - Math.PI / 6), p1.y - headLen * Math.sin(angle - Math.PI / 6));

          c.lineTo(p1.x - headLen * Math.cos(angle + Math.PI / 6), p1.y - headLen * Math.sin(angle + Math.PI / 6));

          c.closePath();

          c.fillStyle = s.color;

          c.fill();

        }

      } else if (s.tool === "box") {

        var p0 = s.points[0];

        var p1 = s.points[s.points.length - 1];

        if (p0 && p1) {

          c.beginPath();

          c.strokeRect(Math.min(p0.x, p1.x), Math.min(p0.y, p1.y), Math.abs(p1.x - p0.x), Math.abs(p1.y - p0.y));

        }

      } else {

        // Freehand line / highlighter / eraser

        if (!s.points || !s.points.length) return;

        c.beginPath();

        c.moveTo(s.points[0].x, s.points[0].y);

        for (var i = 1; i < s.points.length; i++) {

          c.lineTo(s.points[i].x, s.points[i].y);

        }

        c.stroke();

      }

      c.restore();

    }



    function toggleMarker(active) {

      markerState.active = typeof active === "boolean" ? active : !markerState.active;

      toolbar.classList.toggle("active", markerState.active);

      canvas.classList.toggle("active", markerState.active);

      if (markerState.active) {

        canvas.classList.remove("hidden-ink");

        resizeCanvas();

        if (dockMarkerBtn) dockMarkerBtn.classList.add("active");

      } else {

        if (dockMarkerBtn) dockMarkerBtn.classList.remove("active");

      }

    }



    if (dockMarkerBtn) {

      dockMarkerBtn.addEventListener("click", function () {

        toggleMarker();

      });

    }



    // Keyboard shortcut 'M' toggles marker mode

    document.addEventListener("keydown", function (e) {

      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      if (e.key === "m" || e.key === "M") {

        e.preventDefault();

        toggleMarker();

      } else if (e.key === "Escape" && markerState.active) {

        toggleMarker(false);

      } else if ((e.ctrlKey || e.metaKey) && (e.key === "z" || e.key === "Z") && markerState.active) {

        e.preventDefault();

        undoStroke();

      }

    });



    // Tool selectors on toolbar

    toolbar.querySelectorAll("[data-tool]").forEach(function (btn) {

      btn.addEventListener("click", function () {

        toolbar.querySelectorAll("[data-tool]").forEach(function (b) { b.classList.remove("active"); });

        btn.classList.add("active");

        markerState.tool = btn.getAttribute("data-tool");

        canvas.classList.toggle("tool-eraser", markerState.tool === "eraser");

      });

    });



    // Color swatches

    toolbar.querySelectorAll("[data-marker-color]").forEach(function (btn) {

      btn.addEventListener("click", function () {

        toolbar.querySelectorAll("[data-marker-color]").forEach(function (b) { b.classList.remove("active"); });

        btn.classList.add("active");

        markerState.color = btn.getAttribute("data-marker-color");

      });

    });



    // Stroke size

    var strokeSelect = document.getElementById("markerStrokeSelect");

    if (strokeSelect) {

      strokeSelect.addEventListener("change", function () {

        markerState.size = parseFloat(strokeSelect.value);

      });

    }



    function undoStroke() {

      if (!markerStrokes.length) return;

      markerStrokes.pop();

      writeStorage(MARKER_KEY, markerStrokes);

      redrawStrokes();

    }



    document.getElementById("markerUndoBtn").addEventListener("click", undoStroke);



    document.getElementById("markerToggleInkBtn").addEventListener("click", function () {

      markerState.inkVisible = !markerState.inkVisible;

      canvas.classList.toggle("hidden-ink", !markerState.inkVisible);

      this.textContent = markerState.inkVisible ? "👁️ Ink" : "🙈 Hidden";

      redrawStrokes();

    });



    document.getElementById("markerClearBtn").addEventListener("click", function () {

      if (!markerStrokes.length) return;

      if (confirm("Clear all screen drawings?")) {

        markerStrokes = [];

        writeStorage(MARKER_KEY, []);

        redrawStrokes();

      }

    });



    document.getElementById("markerCloseBtn").addEventListener("click", function () {

      toggleMarker(false);

    });



    document.getElementById("markerSnapshotBtn").addEventListener("click", function () {

      var btn = this;

      var link = document.createElement("a");

      link.download = "gate-ml-screen-notes.png";

      link.href = canvas.toDataURL("image/png");

      link.click();

      btn.textContent = "Saved ✓";

      setTimeout(function () { btn.textContent = "📸 Save"; }, 1500);

    });



    // Pointer events on canvas

    function getCanvasPos(e) {

      return {

        x: e.clientX,

        y: e.clientY

      };

    }



    canvas.addEventListener("pointerdown", function (e) {

      if (!markerState.active) return;

      e.preventDefault();

      markerState.drawing = true;

      var pos = getCanvasPos(e);

      markerState.startX = pos.x;

      markerState.startY = pos.y;

      markerState.currentPoints = [pos];

    });



    canvas.addEventListener("pointermove", function (e) {

      if (!markerState.active || !markerState.drawing) return;

      e.preventDefault();

      var pos = getCanvasPos(e);

      markerState.currentPoints.push(pos);



      // Live drawing preview

      if (markerState.tool === "arrow" || markerState.tool === "box") {

        redrawStrokes();

        drawStrokeItem(ctx, {

          tool: markerState.tool,

          color: markerState.color,

          size: markerState.size,

          points: [markerState.currentPoints[0], pos]

        });

      } else {

        // Continuous drawing

        var pts = markerState.currentPoints;

        if (pts.length >= 2) {

          drawStrokeItem(ctx, {

            tool: markerState.tool,

            color: markerState.color,

            size: markerState.size,

            points: [pts[pts.length - 2], pts[pts.length - 1]]

          });

        }

      }

    });



    function finishStroke() {

      if (!markerState.drawing) return;

      markerState.drawing = false;

      if (markerState.currentPoints.length > 0) {

        var completedStroke = {

          tool: markerState.tool,

          color: markerState.color,

          size: markerState.size,

          points: markerState.currentPoints.slice()

        };

        markerStrokes.push(completedStroke);

        writeStorage(MARKER_KEY, markerStrokes);

        redrawStrokes();

      }

      markerState.currentPoints = [];

    }



    canvas.addEventListener("pointerup", finishStroke);

    canvas.addEventListener("pointercancel", finishStroke);



    // Initial load

    if (markerStrokes.length) {

      canvas.classList.remove("hidden-ink");

      setTimeout(function () {

        resizeCanvas();

        redrawStrokes();

      }, 400);

    }

  }



  // ------------------------------------------------------------

  // Instant Highlighter Wand Mode

  // ------------------------------------------------------------

  function initInstantWand() {

    var dockWandBtn = document.getElementById("studyDockWandBtn");

    if (!dockWandBtn) return;



    function setWand(active) {

      wandActive = active;

      writeStorage(WAND_KEY, wandActive);

      dockWandBtn.classList.toggle("wand-active", wandActive);

      document.body.classList.toggle("study-wand-active", wandActive);

    }



    setWand(wandActive);



    dockWandBtn.addEventListener("click", function () {

      setWand(!wandActive);

    });



    document.addEventListener("keydown", function (e) {

      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      if (e.key === "h" || e.key === "H") {

        setWand(!wandActive);

      }

    });



    // When wand is active, text selection automatically applies highlight without popover

    document.addEventListener("mouseup", function () {

      if (!wandActive) return;

      var sel = window.getSelection();

      if (!sel || sel.isCollapsed) return;

      var text = sel.toString().trim();

      if (text.length < 2) return;



      var range = sel.getRangeAt(0);

      var main = document.getElementById("main") || document.body;

      if (!main.contains(range.commonAncestorContainer)) return;



      var hlId = "hl_" + Date.now() + "_" + Math.floor(Math.random() * 1000);

      var unit = detectUnitFromNode(range.startContainer);



      var mark = document.createElement("mark");

      mark.className = "study-hl study-hl--yellow";

      mark.setAttribute("data-hl-id", hlId);

      mark.title = "Highlighted via Wand";



      try {

        range.surroundContents(mark);

      } catch (err) {

        var frag = range.extractContents();

        mark.appendChild(frag);

        range.insertNode(mark);

      }



      var newHl = {

        id: hlId,

        text: text,

        color: "yellow",

        note: "",

        unit: unit,

        createdAt: new Date().toISOString()

      };



      highlights.push(newHl);

      writeStorage(HL_KEY, highlights);

      updateCounts();

      renderHighlightsList();

      wireMarkClicks(mark);

      sel.removeAllRanges();

    });

  }



  // ------------------------------------------------------------

  // GATE ML Math Calculators & Tools

  // ------------------------------------------------------------

  function initCalculatorAndTools() {

    // 1. Confusion Matrix

    var tpIn = document.getElementById("calcTP");

    var fpIn = document.getElementById("calcFP");

    var fnIn = document.getElementById("calcFN");

    var tnIn = document.getElementById("calcTN");



    function updateConfusionMetrics() {

      if (!tpIn || !fpIn || !fnIn || !tnIn) return;

      var tp = parseFloat(tpIn.value) || 0;

      var fp = parseFloat(fpIn.value) || 0;

      var fn = parseFloat(fnIn.value) || 0;

      var tn = parseFloat(tnIn.value) || 0;

      var total = tp + fp + fn + tn;



      var acc = total > 0 ? (tp + tn) / total : 0;

      var prec = (tp + fp) > 0 ? tp / (tp + fp) : 0;

      var rec = (tp + fn) > 0 ? tp / (tp + fn) : 0;

      var spec = (tn + fp) > 0 ? tn / (tn + fp) : 0;

      var f1 = (prec + rec) > 0 ? (2 * prec * rec) / (prec + rec) : 0;



      document.getElementById("outAccuracy").textContent = (acc * 100).toFixed(1) + "%";

      document.getElementById("outPrecision").textContent = (prec * 100).toFixed(1) + "%";

      document.getElementById("outRecall").textContent = (rec * 100).toFixed(1) + "%";

      document.getElementById("outSpecificity").textContent = (spec * 100).toFixed(1) + "%";

      document.getElementById("outF1").textContent = f1.toFixed(3);

    }



    [tpIn, fpIn, fnIn, tnIn].forEach(function (inp) {

      if (inp) inp.addEventListener("input", updateConfusionMetrics);

    });



    // 2. Decision Tree Gini & Entropy

    var treeCountsIn = document.getElementById("calcTreeCounts");

    function updateTreeMetrics() {

      if (!treeCountsIn) return;

      var parts = treeCountsIn.value.split(",").map(function (s) { return parseFloat(s.trim()) || 0; }).filter(function (n) { return n > 0; });

      var total = parts.reduce(function (a, b) { return a + b; }, 0);

      if (total === 0 || !parts.length) {

        document.getElementById("outGini").textContent = "0.000";

        document.getElementById("outEntropy").textContent = "0.000 bits";

        return;

      }



      var giniSum = 0;

      var entropySum = 0;

      parts.forEach(function (p) {

        var prob = p / total;

        giniSum += prob * prob;

        entropySum += prob * Math.log2(prob);

      });



      var gini = 1 - giniSum;

      var entropy = -entropySum;



      document.getElementById("outGini").textContent = gini.toFixed(3);

      document.getElementById("outEntropy").textContent = entropy.toFixed(3) + " bits";

    }



    if (treeCountsIn) treeCountsIn.addEventListener("input", updateTreeMetrics);



    // 3. Sigmoid & Cross-Entropy

    var logitIn = document.getElementById("calcLogitZ");

    var trueYIn = document.getElementById("calcTrueY");



    function updateSigmoidLoss() {

      if (!logitIn || !trueYIn) return;

      var z = parseFloat(logitIn.value) || 0;

      var y = parseFloat(trueYIn.value) > 0.5 ? 1 : 0;

      var p = 1 / (1 + Math.exp(-z));

      p = Math.min(Math.max(p, 1e-7), 1 - 1e-7); // clamp



      var loss = -(y * Math.log(p) + (1 - y) * Math.log(1 - p));



      document.getElementById("outSigmoid").textContent = p.toFixed(3);

      document.getElementById("outLoss").textContent = loss.toFixed(3);

    }



    if (logitIn) logitIn.addEventListener("input", updateSigmoidLoss);

    if (trueYIn) trueYIn.addEventListener("input", updateSigmoidLoss);

  }



  // ------------------------------------------------------------

  // Ambient Focus Audio Generator (Pure Web Audio API)

  // ------------------------------------------------------------

  var ambientAudioState = {

    activeSound: null,

    audioCtx: null,

    sourceNode: null,

    gainNode: null

  };



  function initAmbientSounds() {

    var tiles = document.querySelectorAll(".study-audio-tile");

    if (!tiles.length) return;



    function stopSound() {

      if (ambientAudioState.sourceNode) {

        try { ambientAudioState.sourceNode.stop(); } catch (e) {}

        ambientAudioState.sourceNode = null;

      }

      ambientAudioState.activeSound = null;

      tiles.forEach(function (t) {

        t.classList.remove("playing");

        t.querySelector(".study-sound-state").textContent = "Off";

      });

    }



    function playSound(soundType) {

      stopSound();



      var AudioCtx = window.AudioContext || window.webkitAudioContext;

      if (!AudioCtx) return;

      if (!ambientAudioState.audioCtx) ambientAudioState.audioCtx = new AudioCtx();

      var ctx = ambientAudioState.audioCtx;

      if (ctx.state === "suspended") ctx.resume();



      var bufferSize = ctx.sampleRate * 2;

      var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);

      var output = buffer.getChannelData(0);



      if (soundType === "brown" || soundType === "rain") {

        var lastOut = 0.0;

        for (var i = 0; i < bufferSize; i++) {

          var white = Math.random() * 2 - 1;

          output[i] = (lastOut + 0.02 * white) / 1.02;

          lastOut = output[i];

          output[i] *= 2.8; // boost

        }

      } else if (soundType === "pink" || soundType === "gamma") {

        var b0 = 0, b1 = 0, b2 = 0;

        for (var i = 0; i < bufferSize; i++) {

          var white = Math.random() * 2 - 1;

          b0 = 0.99886 * b0 + white * 0.0555179;

          b1 = 0.99332 * b1 + white * 0.0750759;

          b2 = 0.96900 * b2 + white * 0.1538520;

          output[i] = (b0 + b1 + b2 + white * 0.5362) * 0.11;

        }

      }



      var whiteNoise = ctx.createBufferSource();

      whiteNoise.buffer = buffer;

      whiteNoise.loop = true;



      var gain = ctx.createGain();

      gain.gain.setValueAtTime(0.2, ctx.currentTime);



      whiteNoise.connect(gain);

      gain.connect(ctx.destination);

      whiteNoise.start();



      ambientAudioState.sourceNode = whiteNoise;

      ambientAudioState.gainNode = gain;

      ambientAudioState.activeSound = soundType;



      var activeTile = document.querySelector('[data-sound="' + soundType + '"]');

      if (activeTile) {

        activeTile.classList.add("playing");

        activeTile.querySelector(".study-sound-state").textContent = "Playing ♪";

      }

    }



    tiles.forEach(function (tile) {

      tile.addEventListener("click", function () {

        var sound = tile.getAttribute("data-sound");

        if (ambientAudioState.activeSound === sound) {

          stopSound();

        } else {

          playSound(sound);

        }

      });

    });

  }



  // ------------------------------------------------------------

  // Text-To-Speech (Read Aloud)

  // ------------------------------------------------------------

  function initTextToSpeech() {

    var playBtn = document.getElementById("ttsPlayBtn");

    var stopBtn = document.getElementById("ttsStopBtn");

    var statusText = document.getElementById("ttsStatusText");

    var speedBtns = document.getElementById("ttsSpeedBtns");

    var curRate = 1.0;



    if (!playBtn || !("speechSynthesis" in window)) {

      if (statusText) statusText.textContent = "Audio speech unavailable in browser";

      return;

    }



    if (speedBtns) {

      speedBtns.querySelectorAll("button").forEach(function (b) {

        b.addEventListener("click", function () {

          speedBtns.querySelectorAll("button").forEach(function (x) { x.classList.remove("active"); });

          b.classList.add("active");

          curRate = parseFloat(b.getAttribute("data-speed"));

          if (window.speechSynthesis.speaking) {

            window.speechSynthesis.cancel();

            speakCurrent();

          }

        });

      });

    }



    function speakCurrent() {

      window.speechSynthesis.cancel();



      // Read selected text or current visible section

      var textToRead = "";

      var sel = window.getSelection();

      if (sel && !sel.isCollapsed && sel.toString().trim()) {

        textToRead = sel.toString().trim();

      } else {

        var el = document.elementFromPoint(window.innerWidth / 2, 200);

        var unitEl = el ? (el.closest(".unit") || el.closest("p")) : null;

        textToRead = unitEl ? unitEl.innerText : "Machine Learning Study Guide. Select any section to listen.";

      }



      var utter = new SpeechSynthesisUtterance(textToRead.slice(0, 1000));

      utter.rate = curRate;

      utter.onstart = function () {

        statusText.textContent = "Speaking... ♫";

        playBtn.textContent = "❚❚ Pause";

      };

      utter.onend = function () {

        statusText.textContent = "Finished reading";

        playBtn.textContent = "▶ Play";

      };

      utter.onerror = function () {

        statusText.textContent = "Audio paused";

        playBtn.textContent = "▶ Play";

      };

      window.speechSynthesis.speak(utter);

    }



    playBtn.addEventListener("click", function () {

      if (window.speechSynthesis.speaking) {

        if (window.speechSynthesis.paused) {

          window.speechSynthesis.resume();

          playBtn.textContent = "❚❚ Pause";

          statusText.textContent = "Speaking... ♫";

        } else {

          window.speechSynthesis.pause();

          playBtn.textContent = "▶ Resume";

          statusText.textContent = "Paused";

        }

      } else {

        speakCurrent();

      }

    });



    if (stopBtn) {

      stopBtn.addEventListener("click", function () {

        window.speechSynthesis.cancel();

        playBtn.textContent = "▶ Play";

        statusText.textContent = "Stopped";

      });

    }

  }






  // ------------------------------------------------------------
  // No-Distraction Zen Suite, Focus Lens, Ruler, Bionic & Readiness
  // ------------------------------------------------------------
  function initZenAndFocusSuite() {
    var zenWidths = ["narrow", "balanced", "wide"];
    var zenWidthLabels = { narrow: "680px", balanced: "820px", wide: "980px" };
    var currentWidthIdx = 1; // "balanced" default

    // Helper: update all Zen buttons state across UI
    function updateZenModeUI(isZen) {
      if (isZen) {
        document.body.classList.add("study-zen-mode");
        if (!document.body.getAttribute("data-zen-width")) {
          document.body.setAttribute("data-zen-width", zenWidths[currentWidthIdx]);
        }
      } else {
        document.body.classList.remove("study-zen-mode");
      }

      var zenToggleBtn = document.getElementById("studyZenToggle");
      if (zenToggleBtn) {
        zenToggleBtn.textContent = isZen ? "Exit Zen Mode (Esc)" : "Enter Zen Focus Mode";
      }

      var dockZenBtn = document.getElementById("studyDockZenBtn");
      if (dockZenBtn) {
        if (isZen) dockZenBtn.classList.add("active");
        else dockZenBtn.classList.remove("active");
      }

      var widthLabel = document.getElementById("zenHudWidthLabel");
      if (widthLabel) {
        var curW = document.body.getAttribute("data-zen-width") || "balanced";
        widthLabel.textContent = zenWidthLabels[curW] || "820px";
      }
    }

    function toggleZenMode(forceState) {
      var isCurrentlyZen = document.body.classList.contains("study-zen-mode");
      var nextState = typeof forceState === "boolean" ? forceState : !isCurrentlyZen;
      readerSettings.zen = nextState;
      writeStorage(SETTINGS_KEY, readerSettings);
      updateZenModeUI(nextState);

      // Close drawer and popover when entering Zen
      if (nextState) {
        var drawer = document.getElementById("studyDrawer");
        var backdrop = document.getElementById("studyBackdrop");
        if (drawer) drawer.classList.remove("open");
        if (backdrop) backdrop.classList.remove("active");
        document.body.style.overflow = "";
      }
    }

    // 1. Zen HUD buttons
    var zenExitBtn = document.getElementById("zenHudExitBtn");
    if (zenExitBtn) {
      zenExitBtn.addEventListener("click", function () {
        toggleZenMode(false);
      });
    }

    var zenWidthBtn = document.getElementById("zenHudWidthBtn");
    if (zenWidthBtn) {
      zenWidthBtn.addEventListener("click", function () {
        currentWidthIdx = (currentWidthIdx + 1) % zenWidths.length;
        var nextWidth = zenWidths[currentWidthIdx];
        document.body.setAttribute("data-zen-width", nextWidth);
        var label = document.getElementById("zenHudWidthLabel");
        if (label) label.textContent = zenWidthLabels[nextWidth];
      });
    }

    // Study Dock Zen button
    var dockZenBtn = document.getElementById("studyDockZenBtn");
    if (dockZenBtn) {
      dockZenBtn.addEventListener("click", function () {
        toggleZenMode();
      });
    }

    // Reader Tab Zen Toggle button
    var zenToggle = document.getElementById("studyZenToggle");
    if (zenToggle) {
      zenToggle.addEventListener("click", function () {
        toggleZenMode();
      });
    }

    // 2. Paragraph Focus Lens (Spotlight)
    var isLensActive = false;
    var currentLensEl = null;

    function updateLensFocus(target) {
      if (!isLensActive) return;
      var candidate = target ? target.closest(".guide-main p, .guide-main li, .guide-main .box, .guide-main .formula, .guide-main .worked, .guide-main figure") : null;
      if (candidate && candidate !== currentLensEl) {
        if (currentLensEl) currentLensEl.classList.remove("study-lens-focus");
        currentLensEl = candidate;
        currentLensEl.classList.add("study-lens-focus");
      }
    }

    function toggleFocusLens() {
      isLensActive = !isLensActive;
      document.body.classList.toggle("study-lens-active", isLensActive);
      var lensBtn = document.getElementById("zenHudLensBtn");
      if (lensBtn) lensBtn.classList.toggle("active", isLensActive);

      if (!isLensActive && currentLensEl) {
        currentLensEl.classList.remove("study-lens-focus");
        currentLensEl = null;
      } else if (isLensActive) {
        var midEl = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
        updateLensFocus(midEl);
      }
    }

    var zenHudLensBtn = document.getElementById("zenHudLensBtn");
    if (zenHudLensBtn) zenHudLensBtn.addEventListener("click", toggleFocusLens);

// mousemove unified below with requestAnimationFrame

    // 3. Reading Focus Ruler
    var isRulerActive = false;
    var rulerEl = document.getElementById("studyReadingRuler");

    function toggleReadingRuler() {
      isRulerActive = !isRulerActive;
      document.body.classList.toggle("study-ruler-active", isRulerActive);
      var rulerBtn = document.getElementById("zenHudRulerBtn");
      if (rulerBtn) rulerBtn.classList.toggle("active", isRulerActive);
    }

    var zenHudRulerBtn = document.getElementById("zenHudRulerBtn");
    if (zenHudRulerBtn) zenHudRulerBtn.addEventListener("click", toggleReadingRuler);

    var mouseTicking = false;
    var lastMouseTarget = null;
    var lastMouseY = 0;

    document.addEventListener("mousemove", function (e) {
      if (!isLensActive && !isRulerActive) return;
      lastMouseTarget = e.target;
      lastMouseY = e.pageY;
      if (!mouseTicking) {
        mouseTicking = true;
        window.requestAnimationFrame(function () {
          if (isLensActive && lastMouseTarget) {
            updateLensFocus(lastMouseTarget);
          }
          if (isRulerActive && rulerEl) {
            rulerEl.style.top = (lastMouseY - 19) + "px";
          }
          mouseTicking = false;
        });
      }
    }, { passive: true });

    // 4. Bionic Reading Mode
    var isBionicActive = false;

    function applyBionicToNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        var text = node.textContent;
        if (!text.trim()) return node;
        var words = text.split(/(\s+)/);
        var frag = document.createDocumentFragment();
        for (var i = 0; i < words.length; i++) {
          var word = words[i];
          if (/^\s+$/.test(word) || !word.length) {
            frag.appendChild(document.createTextNode(word));
          } else {
            var len = word.length;
            var cut = len <= 3 ? 1 : Math.ceil(len * 0.45);
            var boldPart = word.slice(0, cut);
            var restPart = word.slice(cut);
            var span = document.createElement("span");
            span.className = "bionic-bold";
            span.textContent = boldPart;
            frag.appendChild(span);
            if (restPart) {
              frag.appendChild(document.createTextNode(restPart));
            }
          }
        }
        return frag;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (/^(CODE|PRE|SCRIPT|STYLE|SVG|MATH)$/i.test(node.tagName)) return node;
        var childNodes = Array.prototype.slice.call(node.childNodes);
        for (var j = 0; j < childNodes.length; j++) {
          var rep = applyBionicToNode(childNodes[j]);
          if (rep !== childNodes[j]) {
            node.replaceChild(rep, childNodes[j]);
          }
        }
      }
      return node;
    }

    function toggleBionicReading() {
      isBionicActive = !isBionicActive;
      document.body.classList.toggle("study-bionic-active", isBionicActive);
      var bionicBtn = document.getElementById("zenHudBionicBtn");
      if (bionicBtn) bionicBtn.classList.toggle("active", isBionicActive);

      var targets = document.querySelectorAll(".guide-main p, .guide-main li");
      if (isBionicActive) {
        targets.forEach(function (el) {
          if (!el.hasAttribute("data-orig-html")) {
            el.setAttribute("data-orig-html", el.innerHTML);
          }
          applyBionicToNode(el);
        });
      } else {
        targets.forEach(function (el) {
          if (el.hasAttribute("data-orig-html")) {
            el.innerHTML = el.getAttribute("data-orig-html");
            el.removeAttribute("data-orig-html");
          }
        });
      }
    }

    var zenHudBionicBtn = document.getElementById("zenHudBionicBtn");
    if (zenHudBionicBtn) zenHudBionicBtn.addEventListener("click", toggleBionicReading);

    // 5. Screen Marker button on Zen HUD
    var zenHudMarkerBtn = document.getElementById("zenHudMarkerBtn");
    if (zenHudMarkerBtn) {
      zenHudMarkerBtn.addEventListener("click", function () {
        var markerDockBtn = document.getElementById("studyDockMarkerBtn");
        if (markerDockBtn) markerDockBtn.click();
      });
    }

    // 6. Keyboard Shortcuts Modal & Help
    var shortcutsModal = document.getElementById("studyShortcutsModal");
    var shortcutsClose = document.getElementById("studyShortcutsClose");
    var zenHudHelpBtn = document.getElementById("zenHudHelpBtn");

    function toggleShortcutsModal(forceState) {
      if (!shortcutsModal) return;
      var isActive = shortcutsModal.classList.contains("active");
      var nextState = typeof forceState === "boolean" ? forceState : !isActive;
      if (nextState) {
        shortcutsModal.classList.add("active");
      } else {
        shortcutsModal.classList.remove("active");
      }
    }

    if (zenHudHelpBtn) zenHudHelpBtn.addEventListener("click", function () { toggleShortcutsModal(true); });
    if (shortcutsClose) shortcutsClose.addEventListener("click", function () { toggleShortcutsModal(false); });
    if (shortcutsModal) {
      shortcutsModal.addEventListener("click", function (e) {
        if (e.target === shortcutsModal) toggleShortcutsModal(false);
      });
    }

    // 7. Global Keyboard Shortcuts Handler
    document.addEventListener("keydown", function (e) {
      var activeTag = document.activeElement ? document.activeElement.tagName : "";
      if (activeTag === "INPUT" || activeTag === "TEXTAREA" || activeTag === "SELECT" || (document.activeElement && document.activeElement.isContentEditable)) {
        return;
      }

      var key = e.key.toLowerCase();

      if (e.key === "Escape") {
        if (shortcutsModal && shortcutsModal.classList.contains("active")) {
          toggleShortcutsModal(false);
          e.preventDefault();
        } else if (document.body.classList.contains("study-zen-mode")) {
          toggleZenMode(false);
          e.preventDefault();
        }
        return;
      }

      if (key === "z") {
        toggleZenMode();
        e.preventDefault();
      } else if (key === "l") {
        toggleFocusLens();
        e.preventDefault();
      } else if (key === "r") {
        toggleReadingRuler();
        e.preventDefault();
      } else if (key === "b") {
        toggleBionicReading();
        e.preventDefault();
      } else if (e.key === "?" || (e.shiftKey && key === "/")) {
        toggleShortcutsModal();
        e.preventDefault();
      }
    });

    // 8. Exam Readiness & Syllabus Checklist
    function renderReadinessAndChecklist() {
      var totalUnits = UNITS.length;
      var coreUnits = UNITS.slice(0, 10);
      var appUnits = UNITS.slice(10);

      var doneCount = 0;
      var coreDoneCount = 0;
      var appDoneCount = 0;

      UNITS.forEach(function (u) {
        if (completedUnits.indexOf(u.id) !== -1) {
          doneCount++;
          if (coreUnits.some(function (c) { return c.id === u.id; })) coreDoneCount++;
          else appDoneCount++;
        }
      });

      var pct = Math.round((doneCount / totalUnits) * 100);

      var pctEl = document.getElementById("studyReadinessPct");
      var barEl = document.getElementById("studyReadinessBar");
      var statusEl = document.getElementById("studyReadinessStatus");
      var tabCheckBadge = document.getElementById("studyTabCheckCount");
      var coreCountEl = document.getElementById("studyReadinessCoreCount");
      var appCountEl = document.getElementById("studyReadinessAppCount");

      if (pctEl) pctEl.textContent = pct + "%";
      if (barEl) barEl.style.width = pct + "%";
      if (tabCheckBadge) tabCheckBadge.textContent = doneCount + "/" + totalUnits;
      if (coreCountEl) coreCountEl.textContent = coreDoneCount + "/10 Core Units";
      if (appCountEl) appCountEl.textContent = appDoneCount + "/" + appUnits.length + " Review";

      if (statusEl) {
        if (pct === 100) statusEl.textContent = "🏆 Exam Master (Full Syllabus)";
        else if (pct >= 75) statusEl.textContent = "🔥 GATE Ready (High Preparedness)";
        else if (pct >= 40) statusEl.textContent = "📈 Accelerating (Solid Progress)";
        else if (pct > 0) statusEl.textContent = "🌱 Foundation Building";
        else statusEl.textContent = "Novice (Begin Checklist)";
      }

      function buildRowHtml(u) {
        var isDone = completedUnits.indexOf(u.id) !== -1;
        return (
          '<div class="study-checklist-row ' + (isDone ? "checked" : "") + '">' +
          '<input type="checkbox" id="chk_' + u.id + '" data-unit-chk="' + u.id + '" ' + (isDone ? "checked" : "") + ' />' +
          '<label for="chk_' + u.id + '">' + escapeHtml(u.name) + '</label>' +
          '<a href="#' + u.id + '" class="study-action-link" style="font-size:11px;" title="Jump to section">Jump &rarr;</a>' +
          '</div>'
        );
      }

      var coreContainer = document.getElementById("checklistCoreContainer");
      if (coreContainer) {
        var coreHtml = "";
        coreUnits.forEach(function (u) { coreHtml += buildRowHtml(u); });
        coreContainer.innerHTML = coreHtml;
      }

      var appContainer = document.getElementById("checklistAppContainer");
      if (appContainer) {
        var appHtml = "";
        appUnits.forEach(function (u) { appHtml += buildRowHtml(u); });
        appContainer.innerHTML = appHtml;
      }

      // Bind click listeners
      document.querySelectorAll("[data-unit-chk]").forEach(function (chk) {
        chk.addEventListener("change", function () {
          var uId = chk.getAttribute("data-unit-chk");
          if (chk.checked) {
            if (completedUnits.indexOf(uId) === -1) completedUnits.push(uId);
          } else {
            completedUnits = completedUnits.filter(function (id) { return id !== uId; });
          }
          writeStorage(CHECKLIST_KEY, completedUnits);
          renderReadinessAndChecklist();
          var unitCheckCount = document.getElementById("unitCheckCount");
          if (unitCheckCount) {
            var cDone = completedUnits.filter(function (id) { return coreUnits.some(function (c) { return c.id === id; }); }).length;
            unitCheckCount.textContent = cDone + "/10";
          }
        });
      });
    }

    renderReadinessAndChecklist();

    // URL parameter check for direct zen focus link (?zen=1 or ?focus=1)
    try {
      var urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("zen") === "1" || urlParams.get("focus") === "1") {
        readerSettings.zen = true;
      }
    } catch (e) {}

    // Initial state setup from readerSettings
    if (readerSettings.zen) {
      updateZenModeUI(true);
    }
  }

  function boot() {

    mountUI();

    initHighlightEngine();

    initPopoverActions();

    restoreHighlights();

    initDrawer();

    initNotes();

    initHighlightsTab();

    initFlashcards();

    initFormulaSheet();

    initPomodoro();

    initReaderControls();

    initScrollProgress();

    initScreenMarker();

    initInstantWand();

    initCalculatorAndTools();

    initAmbientSounds();

    initTextToSpeech();
    initZenAndFocusSuite();

    updateCounts();

    renderHighlightsList();

    renderAnnotationsList();

  }



  if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", boot);

  } else {

    boot();

  }

})();

