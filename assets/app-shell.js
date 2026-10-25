/* ============================================================
   GATE DA — shared application shell
   Injects a consistent header + footer on every app page,
   marks the active route, wires the mobile menu and the
   light/dark theme toggle. Pure vanilla JS, no dependencies.
   Usage: <script src="../assets/app-shell.js" defer></script>
   Optional depth override: <html data-root="..">
   ============================================================ */
(function () {
  "use strict";

  var rootAttr = document.documentElement.getAttribute("data-root");
  var R = rootAttr || computeRoot();
  // Normalise: ensure the root always ends with a single slash so that
  // href("dashboard") => "<root>/dashboard" regardless of authoring.
  if (R && R.slice(-1) !== "/") R = R + "/";

  function computeRoot() {
    var path = location.pathname.replace(/\/index\.html$/, "/");
    var depth = (path.match(/\//g) || []).length - 1;
    if (depth <= 0) return "./";
    var r = "";
    for (var i = 0; i < depth; i++) r += "../";
    return r;
  }

  function href(route) { return R + route; }

  var LOGO =
    '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true">' +
    '<path d="M7 23 L16 9 L25 23" stroke="var(--accent)" stroke-width="1.7"/>' +
    '<path d="M7 9 L25 9" stroke="var(--line-strong)" stroke-width="1.7"/>' +
    '<circle cx="7" cy="9" r="2.4" fill="var(--text)"/>' +
    '<circle cx="16" cy="9" r="2.4" fill="var(--text)"/>' +
    '<circle cx="25" cy="9" r="2.4" fill="var(--text)"/>' +
    '<circle cx="7" cy="23" r="2.4" fill="var(--accent)"/>' +
    '<circle cx="25" cy="23" r="2.4" fill="var(--accent)"/>' +
    "</svg>";

  var NAV = [
    { label: "Dashboard", route: "dashboard", match: "dashboard" },
    { label: "Syllabus", route: "syllabus", match: "syllabus" },
    { label: "Learn", route: "learn/calculus", match: "learn/" },
    { label: "ML Guide", route: "ml-guide", match: "ml-guide" },
    { label: "Practice", route: "practice-da", match: "practice-da" },
    { label: "Mocks", route: "mock-da", match: "mock-da" },
    { label: "PYQ Guide", route: "pyq", match: "pyq" },
    { label: "Coverage", route: "coverage", match: "coverage" }
  ];

  var here = location.pathname;
  function isActive(match) {
    var p = here.replace(/\/$/, "");
    if (match === "learn/") return p.indexOf("/learn") === p.length - 6 || p.indexOf("/learn/") !== -1;
    if (match === "ml-guide") return p === "/ml-guide" || p === "/ml-guide.html" || p.indexOf("/ml-guide") !== -1;
    return p === "/" + match || p.slice(-(match.length + 1)) === "/" + match;
  }

  function buildHeader() {
    var nav = NAV.map(function (n) {
      var cur = isActive(n.match) ? ' aria-current="page"' : "";
      return '<a href="' + href(n.route) + '"' + cur + ">" + n.label + "</a>";
    }).join("");
    return (
      '<a class="skip-link" href="#main">Skip to content</a>' +
      '<header class="app-header">' +
      '<div class="app-header__inner">' +
      '<a class="brand" href="' + R + 'index.html" aria-label="GATE DA home">' + LOGO +
      "<span>GATE DA <em>2027</em></span></a>" +
      '<nav class="app-nav" aria-label="Primary">' + nav + "</nav>" +
      '<div class="app-actions">' +
      '<button class="theme-toggle" id="themeToggle" type="button" aria-label="Switch theme" title="Toggle light/dark theme">\u263D</button>' +
      '<a class="btn btn--primary btn--header" href="' + href("practice-da") + '">Practice</a>' +
      '<button class="nav-toggle" id="navToggle" type="button" aria-expanded="false" aria-controls="mobileMenu" aria-label="Open menu"><span></span><span></span></button>' +
      "</div></div></header>" +
      buildMobileMenu()
    );
  }

  function buildMobileMenu() {
    var items = NAV.map(function (n, i) {
      var cur = isActive(n.match) ? ' aria-current="page"' : "";
      var num = ("0" + (i + 1)).slice(-2);
      return '<a class="m-link" href="' + href(n.route) + '"' + cur + '><span>' + num + "</span>" + n.label + "</a>";
    }).join("");
    return (
      '<div class="mobile-menu" id="mobileMenu" aria-label="Mobile navigation">' +
      items +
      '<div class="m-group">More</div>' +
      '<a class="m-link" href="' + href("faq") + '"><span>09</span>FAQ</a>' +
      '<a class="m-link" href="' + href("about") + '"><span>10</span>About</a>' +
      '<a class="m-link" href="' + href("contact") + '"><span>11</span>Contact</a>' +
      "</div>"
    );
  }

  function buildFooter() {
    var year = new Date().getFullYear();
    return (
      '<footer class="app-footer">' +
      '<div class="app-footer__grid">' +
      '<div class="app-footer__brand">' +
      '<a class="brand" href="' + R + 'index.html" aria-label="GATE DA home">' + LOGO + "<span>GATE DA <em>2027</em></span></a>" +
      "<p>Free GATE Data Science &amp; AI preparation. Syllabus, practice, mocks and revision \u2014 all in your browser, no account.</p>" +
      "</div>" +
      "<div><h3>Study</h3><ul>" +
      '<li><a href="' + href("dashboard") + '">Dashboard</a></li>' +
      '<li><a href="' + href("syllabus") + '">Syllabus tracker</a></li>' +
      '<li><a href="' + href("practice-da") + '">Practice</a></li>' +
      '<li><a href="' + href("mock-da") + '">Mock tests</a></li>' +
      '<li><a href="' + href("revision") + '">Revision</a></li>' +
      '<li><a href="' + href("planner") + '">Planner</a></li>' +
      "</ul></div>" +
      "<div><h3>Learn</h3><ul>" +
      '<li><a href="' + href("ml-guide") + '">ML Guide</a></li>' +
      '<li><a href="' + href("learn/calculus") + '">Calculus</a></li>' +
      '<li><a href="' + href("learn/programming") + '">Programming</a></li>' +
      '<li><a href="' + href("learn/dbms") + '">DBMS</a></li>' +
      '<li><a href="' + href("learn/ai") + '">AI &amp; ML</a></li>' +
      '<li><a href="' + href("learn/aptitude") + '">Aptitude</a></li>' +
      '<li><a href="' + href("coverage") + '">Coverage</a></li>' +
      "</ul></div>" +
      "<div><h3>About</h3><ul>" +
      '<li><a href="' + href("about") + '">Founder</a></li>' +
      '<li><a href="' + href("product") + '">Product</a></li>' +
      '<li><a href="' + href("faq") + '">FAQ</a></li>' +
      '<li><a href="' + href("contact") + '">Contact</a></li>' +
      '<li><a href="' + href("privacy-policy") + '">Privacy</a></li>' +
      '<li><a href="' + href("cookie-policy") + '">Cookie Policy</a></li>' +
      '<li><a href="' + href("terms") + '">Terms</a></li>' +
      '<li><button class="link-btn" id="gateConsentReset" type="button" data-open-consent="1" style="background:none;border:none;padding:0;color:inherit;font:inherit;cursor:pointer;text-decoration:underline">Cookie Preferences</button></li>' +
      "</ul></div>" +
      "</div>" +
      '<div class="app-footer__base">' +
      "<span>\u00A9 " + year + " Gaurav Tiwari \u00B7 hellogaurav.me</span>" +
      "<span>Unofficial practice \u00B7 Not affiliated with IIT Madras / GATE</span>" +
      "</div></footer>"
    );
  }

  function ensureConsent() {
    if (document.querySelector('script[src*="consent.js"]') || window.GateConsent) return;
    var s = document.createElement("script");
    s.src = href("assets/consent.js");
    s.defer = true;
    document.head.appendChild(s);
  }

  function mount() {
    if (!document.body) return;
    var head = document.createElement("div");
    head.innerHTML = buildHeader();
    var frag = document.createDocumentFragment();
    while (head.firstChild) frag.appendChild(head.firstChild);
    document.body.insertBefore(frag, document.body.firstChild);

    var foot = document.createElement("div");
    foot.innerHTML = buildFooter();
    while (foot.firstChild) document.body.appendChild(foot.firstChild);

    wireMenu();
    wireTheme();
    ensureConsent();
  }

  function wireMenu() {
    var toggle = document.getElementById("navToggle");
    var menu = document.getElementById("mobileMenu");
    if (!toggle || !menu) return;
    function close() { menu.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); document.body.classList.remove("menu-open"); }
    toggle.addEventListener("click", function () {
      if (menu.classList.contains("open")) close();
      else { menu.classList.add("open"); toggle.setAttribute("aria-expanded", "true"); document.body.classList.add("menu-open"); }
    });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    window.addEventListener("resize", function () { if (window.innerWidth > 900) close(); });
  }

  function wireTheme() {
    var KEY = "gateda.v1.theme";
    var btn = document.getElementById("themeToggle");
    function current() { return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark"; }
    function paint() {
      var t = current();
      if (btn) {
        btn.textContent = t === "light" ? "\u2600" : "\u263D";
        btn.setAttribute("aria-label", t === "light" ? "Switch to dark theme" : "Switch to light theme");
      }
    }
    if (btn) {
      btn.addEventListener("click", function () {
        var next = current() === "light" ? "dark" : "light";
        if (next === "light") document.documentElement.setAttribute("data-theme", "light");
        else document.documentElement.removeAttribute("data-theme");
        try { localStorage.setItem(KEY, next); } catch (e) {}
        paint();
      });
    }
    paint();
  }

  function initTheme() {
    var KEY = "gateda.v1.theme";
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    if (saved === "light") document.documentElement.setAttribute("data-theme", "light");
    else if (!saved && window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }

  initTheme();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();

