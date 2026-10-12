/* GATE ML ads + click tracking. Part 2/2. Requires assets/seo.js. */
(function () {
  "use strict";
  var H = window.__gateMlHelpers || {};
  var cfg = H.cfg || (window.GATE_ML_CONFIG = window.GATE_ML_CONFIG || {});
  var track = H.track || window.GateMLTrack || function () {};
  var isFile = !!H.isFile;

  function wireTracking() {
    document.addEventListener("click", function (e) {
      var a = e.target && e.target.closest ? e.target.closest("a,[data-track]") : null;
      if (!a) return;
      var explicit = a.getAttribute("data-track");
      var href = (a.getAttribute("href") || "").toLowerCase();
      if (explicit) { track(explicit, { href: a.getAttribute("href") }); return; }
      if (/gate-ml-practice|practice|mock-test/.test(href)) track("cta_clicked", { href: a.getAttribute("href") });
      else if (/ml-guide|topics\/|guide/.test(href)) track("topic_opened", { href: a.getAttribute("href") });
      else if (/resources|questions/.test(href)) track("resource_opened", { href: a.getAttribute("href") });
    }, { passive: true });
  }
  function loadAdSense() {
    if (!cfg.ADSENSE_CLIENT || cfg.ADSENSE_CLIENT.indexOf("XXXX") !== -1) return false;
    if (isFile || window.__gateMlNoindex) return false;
    /* Verification snippet in <head> is the single loader — never inject a second copy. */
    if (document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) return true;
    if (document.querySelector("script[data-gate-ml-adsense]")) return true;
    var s = document.createElement("script");
    s.async = true;
    s.setAttribute("data-gate-ml-adsense", "1");
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(cfg.ADSENSE_CLIENT);
    s.setAttribute("crossorigin", "anonymous");
    document.head.appendChild(s);
    return true;
  }
  function hydrateSlots() {
    var slots = document.querySelectorAll(".ad-slot[data-ad-slot]");
    if (!slots.length) return;
    var live = loadAdSense();
    Array.prototype.forEach.call(slots, function (el) {
      var slotId = (cfg.AD_SLOTS || {})[el.getAttribute("data-ad-slot")] || "";
      if (live && slotId) {
        if (el.querySelector("ins.adsbygoogle")) return;
        var ins = document.createElement("ins");
        ins.className = "adsbygoogle";
        ins.style.display = "block";
        ins.setAttribute("data-ad-client", cfg.ADSENSE_CLIENT);
        ins.setAttribute("data-ad-slot", slotId);
        ins.setAttribute("data-ad-format", "auto");
        ins.setAttribute("data-full-width-responsive", "true");
        el.appendChild(ins);
        try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
        el.classList.add("is-live");
      } else if (!el.querySelector(".ad-slot__note")) {
        var n = document.createElement("p");
        n.className = "ad-slot__note";
        n.textContent = "Advertisement space — AdSense activates here after approval.";
        el.appendChild(n);
      }
    });
  }
  function lazyAds() {
    var slots = document.querySelectorAll(".ad-slot[data-ad-slot]");
    if (!slots.length) return;
    hydrateSlots();
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        var vis = entries.some(function (en) { return en.isIntersecting; });
        if (vis) { hydrateSlots(); io.disconnect(); }
      }, { rootMargin: "600px 0px" });
      Array.prototype.forEach.call(slots, function (s) { io.observe(s); });
    }
  }
  if (H.maybeNoindex) H.maybeNoindex();
  if (H.ensureCanonical) H.ensureCanonical();
  if (H.injectGSC) H.injectGSC();
  if (H.loadGA) H.loadGA();
  track("page_view", { path: H.path || location.pathname });
  wireTracking();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", lazyAds);
  else lazyAds();
})();
