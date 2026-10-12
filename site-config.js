/* ============================================================
   GATE ML — public site configuration (static-site equivalent
   of environment variables). No secrets here.
   Fill the real IDs when they exist; leave placeholders empty.
   ============================================================ */
window.GATE_ML_CONFIG = window.GATE_ML_CONFIG || {
  /* Canonical production origin (no trailing slash). */
  SITE_URL: "https://hellogaurav.me",

  /* Google Search Console verification token (meta name=
     "google-site-verification"). Empty = tag omitted. */
  GSC_TOKEN: "",

  /* Google Analytics 4 measurement ID, e.g. "G-XXXXXXX".
     Empty = analytics disabled. Respects Do-Not-Track. */
  GA_ID: "",

  /* Google AdSense publisher ID — verified for hellogaurav.me / gate-ml.
     Live ID enables Auto Ads + verification snippet in <head>. */
  ADSENSE_CLIENT: "ca-pub-7955473428553830",

  /* Per-slot AdSense ad-slot IDs (empty = slot renders a
     reserved, labelled house placeholder, never a fake ad). */
  AD_SLOTS: {
    banner: "",
    inArticle: "",
    sidebar: "",
    footer: "",
    results: ""
  }
};

