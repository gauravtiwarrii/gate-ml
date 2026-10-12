/* GATE ML shared SEO/analytics/AdSense helper (vanilla). Part 1/2. */
(function () {
  "use strict";
  var cfg = (window.GATE_ML_CONFIG = window.GATE_ML_CONFIG || {});
  cfg.SITE_URL = cfg.SITE_URL || "https://hellogaurav.me";
  cfg.AD_SLOTS = cfg.AD_SLOTS || {};
  var path = window.location.pathname || "/index.html";
  var isFile = window.location.protocol === "file:";
  window.__gateMlNoindex = false;

  function canonicalFor() {
    var p = path;
    if (p === "/" || p === "") p = "/index.html";
    var map = {
      "/": "/index.html",
      "/practice": "/gate-ml-practice.html",
      "/guide": "/ml-guide.html",
      "/ml-guide": "/ml-guide.html",
      "/topics": "/topics/index.html",
      "/questions": "/questions/index.html",
      "/mock-test": "/mock-test/index.html",
      "/resources": "/resources/index.html",
      "/about": "/about/index.html",
      "/contact": "/contact/index.html",
      "/privacy-policy": "/privacy-policy/index.html",
      "/terms": "/terms/index.html",
      "/disclaimer": "/disclaimer/index.html",
      "/cookie-policy": "/cookie-policy/index.html",
      "/product": "/product/index.html",
      "/claude": "/claude/index.html",
      "/faq": "/faq/index.html",
      "/changelog": "/changelog/index.html",
      "/readiness": "/readiness/index.html",
      "/syllabus": "/syllabus/index.html",
      "/dashboard": "/dashboard/index.html",
      "/practice-da": "/practice-da/index.html",
      "/mock-da": "/mock-da/index.html",
      "/pyq": "/pyq/index.html",
      "/revision": "/revision/index.html",
      "/planner": "/planner/index.html",
      "/tutor": "/tutor/index.html"
    };
    if (map[p]) p = map[p];
    return cfg.SITE_URL.replace(/\/$/, "") + (p.charAt(0) === "/" ? p : "/" + p);
  }
  function ensureCanonical() {
    if (isFile) return;
    var link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalFor());
  }
  function maybeNoindex() {
    var qs = window.location.search || "";
    var noindex = isFile || /[?&](m|t|q|page|sort|filter|ref|source|utm_)=/i.test(qs);
    window.__gateMlNoindex = noindex;
    if (!noindex) return false;
    var meta = document.querySelector('meta[name="robots"]');
    if (meta) meta.setAttribute("content", "noindex,nofollow");
    var m = document.createElement("meta");
    m.setAttribute("name", "googlebot");
    m.setAttribute("content", "noindex,nofollow");
    document.head.appendChild(m);
    return true;
  }
  function injectGSC() {
    if (!cfg.GSC_TOKEN || isFile) return;
    if (document.querySelector('meta[name="google-site-verification"]')) return;
    var m = document.createElement("meta");
    m.setAttribute("name", "google-site-verification");
    m.setAttribute("content", cfg.GSC_TOKEN);
    document.head.appendChild(m);
  }
  var gaLoaded = false;
  function dnt() {
    return navigator.doNotTrack === "1" || window.doNotTrack === "1";
  }
  function loadGA() {
    if (gaLoaded || !cfg.GA_ID || isFile || dnt()) return;
    gaLoaded = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(cfg.GA_ID);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", cfg.GA_ID, { anonymize_ip: true });
  }
  function track(name, params) {
    try {
      if (window.gtag && cfg.GA_ID && !dnt()) window.gtag("event", name, params || {});
    } catch (e) {}
    try {
      document.dispatchEvent(new CustomEvent("gate-ml:analytics", { detail: { name: name, params: params || {} } }));
    } catch (e) {}
  }
  window.GateMLTrack = track;
  window.__gateMlHelpers = { cfg: cfg, path: path, isFile: isFile, track: track,
    canonicalFor: canonicalFor, ensureCanonical: ensureCanonical,
    maybeNoindex: maybeNoindex, injectGSC: injectGSC, loadGA: loadGA };
})();
