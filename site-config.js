/* ============================================================
   GATE ML — public site configuration (static-site equivalent
   of environment variables). No secrets here.
   Fill the real IDs when they exist; leave placeholders empty.
   ============================================================ */
window.GATE_ML_CONFIG = window.GATE_ML_CONFIG || {
  /* Canonical production origin (no trailing slash). */
  SITE_URL: "https://www.hellogaurav.me",

  /* Google Search Console verification token (meta name=
     "google-site-verification"). Empty = tag omitted. */
  GSC_TOKEN: "",

  /* Google Analytics 4 measurement ID, e.g. "G-XXXXXXX".
     Empty = analytics disabled. Respects Do-Not-Track. */
  GA_ID: "",

  /* Google AdSense publisher ID. Keep this value in sync with ads.txt.
     It is an identifier, not a secret. */
  ADSENSE_CLIENT: "ca-pub-7955473428553830",

  /* Safety switch: advertising stays off until Google Privacy & Messaging,
     or another Google-certified CMP, is configured in the AdSense account.
     Do not enable this switch merely because a visitor accepted the local
     preferences dialog. */
  AD_SERVING_ENABLED: false,

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

