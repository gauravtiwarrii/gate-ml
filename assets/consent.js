/* ============================================================
   GATE ML — local privacy preferences and Google Consent Mode v2.
   A Google-certified CMP is still required before personalized AdSense
   advertising is enabled for EEA, UK, or Swiss visitors.
   ============================================================ */
(function () {
  "use strict";

  var STORAGE_KEY = "gate_ml_consent_pref";
  var cfg = window.GATE_ML_CONFIG || {};
  var adServingEnabled = cfg.AD_SERVING_ENABLED === true;

  // 1. Initialize Google Consent Mode v2 dataLayer & defaults early
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  var saved = null;
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (raw) saved = JSON.parse(raw);
  } catch (e) {
    saved = null;
  }

  // Set default consent state before ad scripts fire
  if (adServingEnabled && saved && saved.ad === true) {
    gtag("consent", "default", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: saved.analytics ? "granted" : "denied"
    });
  } else {
    gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: (saved && saved.analytics) ? "granted" : "denied"
    });
    try {
      (window.adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1;
    } catch (e) {}
  }

  function applyConsent(adAllowed, analyticsAllowed) {
    var pref = {
      ad: adServingEnabled && !!adAllowed,
      analytics: !!analyticsAllowed,
      timestamp: new Date().toISOString()
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pref));
    } catch (e) {}

    gtag("consent", "update", {
      ad_storage: pref.ad ? "granted" : "denied",
      ad_user_data: pref.ad ? "granted" : "denied",
      ad_personalization: pref.ad ? "granted" : "denied",
      analytics_storage: analyticsAllowed ? "granted" : "denied"
    });

    try {
      (window.adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = pref.ad ? 0 : 1;
    } catch (e) {}

    // Dispatch event for other modules
    try {
      document.dispatchEvent(new CustomEvent("gate-ml:consent-updated", { detail: pref }));
    } catch (e) {}
  }

  function getRoot() {
    var attr = document.documentElement.getAttribute("data-root");
    if (attr) return attr.slice(-1) === "/" ? attr : attr + "/";
    var depth = (location.pathname.replace(/\/index\.html$/, "/").match(/\//g) || []).length - 1;
    if (depth <= 0) return "./";
    var r = "";
    for (var i = 0; i < depth; i++) r += "../";
    return r;
  }

  // 2. Banner and Modal UI injection
  function injectStyles() {
    if (document.getElementById("gate-consent-styles")) return;
    var style = document.createElement("style");
    style.id = "gate-consent-styles";
    style.textContent = [
      ".gate-consent-banner {",
      "  position: fixed; bottom: 16px; left: 16px; right: 16px; max-width: 680px; margin: 0 auto; z-index: 99999;",
      "  background: #141414; color: #f5f3ee; border: 1px solid rgba(245, 243, 238, 0.22); border-radius: 12px;",
      "  padding: 18px 22px; box-shadow: 0 12px 36px rgba(0,0,0,0.65);",
      "  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;",
      "  animation: gateSlideUp 0.24s cubic-bezier(0.16, 1, 0.3, 1);",
      "}",
      "@keyframes gateSlideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }",
      ".gate-consent-banner h3 { margin: 0 0 8px; font-size: 1.05rem; font-weight: 700; color: #f5f3ee; display: flex; align-items: center; gap: 8px; }",
      ".gate-consent-banner p { margin: 0 0 14px; font-size: 0.88rem; line-height: 1.5; color: #c9c6bf; }",
      ".gate-consent-banner a { color: #e2601f; text-decoration: underline; }",
      ".gate-consent-actions { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }",
      ".gate-consent-btn {",
      "  padding: 8px 16px; border-radius: 999px; font-size: 0.86rem; font-weight: 600; cursor: pointer;",
      "  border: 1px solid transparent; transition: all 0.15s ease;",
      "}",
      ".gate-consent-btn--primary { background: #e2601f; color: #ffffff; }",
      ".gate-consent-btn--primary:hover { background: #d05315; }",
      ".gate-consent-btn--secondary { background: #222222; color: #f5f3ee; border-color: rgba(245,243,238,0.2); }",
      ".gate-consent-btn--secondary:hover { background: #2d2d2d; border-color: rgba(245,243,238,0.4); }",
      ".gate-consent-btn--text { background: transparent; color: #a9a59d; text-decoration: underline; padding: 6px 10px; }",
      ".gate-consent-btn--text:hover { color: #f5f3ee; }",
      ".gate-consent-modal-backdrop {",
      "  position: fixed; inset: 0; background: rgba(0,0,0,0.72); z-index: 100000;",
      "  display: flex; align-items: center; justify-content: center; padding: 16px;",
      "}",
      ".gate-consent-modal {",
      "  background: #141414; color: #f5f3ee; border: 1px solid rgba(245, 243, 238, 0.22); border-radius: 14px;",
      "  max-width: 540px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 24px; box-shadow: 0 16px 48px rgba(0,0,0,0.8);",
      "  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;",
      "}",
      ".gate-consent-modal h2 { margin: 0 0 12px; font-size: 1.25rem; }",
      ".gate-consent-group { border-top: 1px solid rgba(245, 243, 238, 0.12); padding: 14px 0; }",
      ".gate-consent-group-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }",
      ".gate-consent-group-title { font-weight: 600; font-size: 0.96rem; }",
      ".gate-consent-group-badge { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; padding: 3px 8px; border-radius: 4px; background: rgba(226,96,31,0.2); color: #e2601f; }",
      ".gate-consent-group-desc { font-size: 0.85rem; color: #a9a59d; margin: 0; line-height: 1.45; }"
    ].join("\n");
    document.head.appendChild(style);
  }

  function showBanner() {
    if (document.getElementById("gateConsentBanner")) return;
    injectStyles();

    var R = getRoot();
    var banner = document.createElement("aside");
    banner.id = "gateConsentBanner";
    banner.className = "gate-consent-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie and Privacy Consent");
    banner.setAttribute("aria-describedby", "gateConsentDesc");

    banner.innerHTML = [
      "<h3><span>🛡️</span> Cookie &amp; Privacy Preferences</h3>",
      "<p id='gateConsentDesc'>We use browser storage to preserve your study progress. Advertising is disabled while we complete the Google-certified consent setup required before serving AdSense ads in regulated regions.</p>",
      "<div class='gate-consent-actions'>",
      "  <button type='button' class='gate-consent-btn gate-consent-btn--primary' id='gateBtnAcceptAll'>Accept All</button>",
      "  <button type='button' class='gate-consent-btn gate-consent-btn--secondary' id='gateBtnRejectAll'>Reject Non-Essential</button>",
      "  <button type='button' class='gate-consent-btn gate-consent-btn--text' id='gateBtnCustomize'>Customize</button>",
      "  <a href='" + R + "cookie-policy' style='margin-left:auto;font-size:0.84rem'>Cookie Policy</a>",
      "</div>"
    ].join("");

    document.body.appendChild(banner);

    document.getElementById("gateBtnAcceptAll").addEventListener("click", function () {
      applyConsent(true, true);
      banner.remove();
    });

    document.getElementById("gateBtnRejectAll").addEventListener("click", function () {
      applyConsent(false, false);
      banner.remove();
    });

    document.getElementById("gateBtnCustomize").addEventListener("click", function () {
      banner.remove();
      showModal();
    });
  }

  function showModal() {
    if (document.getElementById("gateConsentModalBackdrop")) return;
    injectStyles();

    var current = null;
    try {
      var r = localStorage.getItem(STORAGE_KEY);
      if (r) current = JSON.parse(r);
    } catch (e) {}

    var adChecked = adServingEnabled && current ? !!current.ad : false;
    var anaChecked = current ? !!current.analytics : false;

    var backdrop = document.createElement("div");
    backdrop.id = "gateConsentModalBackdrop";
    backdrop.className = "gate-consent-modal-backdrop";
    backdrop.setAttribute("role", "dialog");
    backdrop.setAttribute("aria-modal", "true");
    backdrop.setAttribute("aria-labelledby", "gateModalTitle");

    backdrop.innerHTML = [
      "<div class='gate-consent-modal'>",
      "  <h2 id='gateModalTitle'>Privacy &amp; Cookie Preferences</h2>",
      "  <p style='font-size:0.88rem;color:#c9c6bf;margin-bottom:16px'>Manage how GATE ML uses cookies and client-side storage on your device. For full details on third-party cookies, review our <a href='" + getRoot() + "cookie-policy' style='color:#e2601f;text-decoration:underline'>Cookie Policy</a>.</p>",
      "  <div class='gate-consent-group'>",
      "    <div class='gate-consent-group-head'>",
      "      <span class='gate-consent-group-title'>Essential &amp; Local Storage</span>",
      "      <span class='gate-consent-group-badge'>Always Active</span>",
      "    </div>",
      "    <p class='gate-consent-group-desc'>Required to save question attempts, syllabus bookmarks, and exam countdown state in your browser's localStorage. No personal data is stored on our servers.</p>",
      "  </div>",
      "  <div class='gate-consent-group'>",
      "    <div class='gate-consent-group-head'>",
      "      <label style='display:flex;align-items:center;gap:8px;cursor:pointer' for='chkAnalytics'>",
      "        <input type='checkbox' id='chkAnalytics'" + (anaChecked ? " checked" : "") + ">",
      "        <span class='gate-consent-group-title'>Analytics &amp; Performance</span>",
      "      </label>",
      "    </div>",
      "    <p class='gate-consent-group-desc'>Measures anonymous page views and user flows to help improve practice materials. Respects Do Not Track.</p>",
      "  </div>",
      "  <div class='gate-consent-group'>",
      "    <div class='gate-consent-group-head'>",
      "      <label style='display:flex;align-items:center;gap:8px;cursor:pointer' for='chkAds'>",
      "        <input type='checkbox' id='chkAds'" + (adChecked ? " checked" : "") + (adServingEnabled ? "" : " disabled") + ">",
      "        <span class='gate-consent-group-title'>Advertising &amp; Personalization (Google AdSense)</span>",
      "      </label>",
      "    </div>",
      "    <p class='gate-consent-group-desc'>" + (adServingEnabled ? "Allows Google and certified advertising partners to deliver personalized educational ads based on previous visits." : "Advertising is currently disabled until a Google-certified CMP is configured in the AdSense account.") + "</p>",
      "  </div>",
      "  <div style='display:flex;gap:10px;justify-content:flex-end;margin-top:20px'>",
      "    <button type='button' class='gate-consent-btn gate-consent-btn--secondary' id='gateModalRejectAll'>Reject All</button>",
      "    <button type='button' class='gate-consent-btn gate-consent-btn--primary' id='gateModalSave'>Save Preferences</button>",
      "  </div>",
      "</div>"
    ].join("");

    document.body.appendChild(backdrop);

    document.getElementById("gateModalSave").addEventListener("click", function () {
      var ad = document.getElementById("chkAds").checked;
      var ana = document.getElementById("chkAnalytics").checked;
      applyConsent(ad, ana);
      backdrop.remove();
    });

    document.getElementById("gateModalRejectAll").addEventListener("click", function () {
      applyConsent(false, false);
      backdrop.remove();
    });

    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) backdrop.remove();
    });
  }

  // Expose global controller
  window.GateConsent = {
    open: showModal,
    acceptAll: function () { applyConsent(true, true); },
    rejectAll: function () { applyConsent(false, false); },
    get: function () {
      try {
        var d = localStorage.getItem(STORAGE_KEY);
        return d ? JSON.parse(d) : null;
      } catch (e) { return null; }
    },
    isAdServingEnabled: function () { return adServingEnabled; }
  };

  // Wire automatic trigger on load
  function init() {
    if (!saved) {
      // Delay slightly for smooth page entrance
      setTimeout(showBanner, 600);
    }

    // Attach click delegate for buttons linking to consent preferences
    document.addEventListener("click", function (e) {
      var target = e.target && e.target.closest ? e.target.closest("[data-open-consent], #gateConsentReset, #btnManageConsent, #btnFooterConsent") : null;
      if (target) {
        e.preventDefault();
        showModal();
      }
    });
    try { document.dispatchEvent(new CustomEvent("gate-ml:consent-ready")); } catch (e) {}
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
