(() => {
  // -----------------------------
  // Configuration
  // -----------------------------
  const TITLE_OVERRIDES = {
    "crs-nasal-polyps": "Chronic Rhinosinusitis (Nasal Polyps)",
    "hyperthyroidism-thyrotoxicosis": "Hyperthyroidism / Thyrotoxicosis",
    "acute-diarrhoea-gastroenteritis": "Acute Diarrhoea / Gastroenteritis",
    "copd-exacerbation": "COPD Exacerbation"
  };

  const CATEGORY_MAP = [
    { match: ["crs", "sinus", "rhinosinusitis"], category: "ENT" },
    { match: ["copd", "asthma", "pneum", "resp"], category: "Respiratory" },
    { match: ["hyperthyroidism", "thyroid", "diabetes", "endo"], category: "Endocrine" },
    { match: ["diarr", "gastro", "gi", "ibd", "ibs", "hepat", "biliary"], category: "GI" },
    { match: ["af", "atrial", "heart", "cardio"], category: "Cardiology" },
    { match: ["bcc", "melan", "skin", "derm"], category: "Dermatology" },
    { match: ["neuro", "migraine", "stroke"], category: "Neurology" }
  ];

  // -----------------------------
  // Helpers
  // -----------------------------
  const pathname = window.location.pathname; // e.g. /<repo>/pathways/<slug>/
  const parts = pathname.split("/").filter(Boolean);

  // Find slug: the folder just before the trailing "index.html" (or last folder)
  // Works for URLs ending in /pathways/slug/ OR /pathways/slug/index.html
  let slug = "";
  if (parts.length >= 2) {
    // If last part is index.html, slug is previous. Else slug is last.
    slug = (parts[parts.length - 1].toLowerCase() === "index.html")
      ? parts[parts.length - 2]
      : parts[parts.length - 1];
  }

  function getHomeHref() {
    // Home should be the repo root, i.e. everything before "/pathways/"
    const idx = pathname.indexOf("/pathways/");
    if (idx === -1) return "../../"; // fallback
    const root = pathname.slice(0, idx + 1); // keep trailing slash
    return root;
  }

  function humaniseSlug(s) {
    if (!s) return "Pathway";
    // Overrides first
    if (TITLE_OVERRIDES[s]) return TITLE_OVERRIDES[s];

    // Otherwise: title-case hyphen words
    const words = s.split("-").filter(Boolean).map(w => {
      const low = w.toLowerCase();
      // Small tweaks for common acronyms/terms
      if (low === "crs") return "CRS";
      if (low === "copd") return "COPD";
      if (low === "af") return "AF";
      if (low === "ibd") return "IBD";
      if (low === "ibs") return "IBS";
      return low.charAt(0).toUpperCase() + low.slice(1);
    });
    return words.join(" ");
  }

  function inferCategory(s) {
    const low = (s || "").toLowerCase();
    for (const rule of CATEGORY_MAP) {
      for (const m of rule.match) {
        if (low.includes(m)) return rule.category;
      }
    }
    return "General";
  }

  function ensureStyles() {
    if (document.getElementById("aaPathwayNavStyles")) return;

    const style = document.createElement("style");
    style.id = "aaPathwayNavStyles";
    style.textContent = `
      .aa-nav-wrap{
        position: fixed;
        top: 14px;
        left: 14px;
        right: 14px;
        z-index: 9999;
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: space-between;
        pointer-events: none;
      }
      .aa-nav-left, .aa-nav-right{
        display: flex;
        gap: 10px;
        align-items: center;
        pointer-events: auto;
      }
      .aa-btn{
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 999px;
        border: 1px solid rgba(255,255,255,.2);
        background: rgba(0,0,0,.55);
        backdrop-filter: blur(6px);
        color: #eef4ff;
        text-decoration: none;
        font-weight: 800;
        font-size: 13px;
        line-height: 1;
        cursor: pointer;
        user-select: none;
      }
      .aa-btn:hover{ background: rgba(0,0,0,.75); }
      .aa-breadcrumbs{
        display:flex;
        align-items:center;
        gap: 6px;
        padding: 7px 10px;
        border-radius: 12px;
        background: rgba(0,0,0,.45);
        backdrop-filter: blur(6px);
        border: 1px solid rgba(255,255,255,.18);
        font-size: 12px;
        font-weight: 800;
        color: #eef4ff;
        pointer-events: auto;
      }
      .aa-breadcrumbs a{
        color: #67e8f9;
        text-decoration: none;
      }
      .aa-breadcrumbs a:hover{ text-decoration: underline; }
      .aa-sep{ opacity: .65; }
      .aa-cat{ color: #a78bfa; }
      .aa-current{ color: #eef4ff; }

      @media (max-width: 600px){
        .aa-nav-wrap{ top: 10px; left: 10px; right: 10px; }
        .aa-btn{ font-size: 12px; padding: 7px 10px; }
        .aa-breadcrumbs{ font-size: 11px; padding: 6px 8px; }
      }
      @media print{
        .aa-nav-wrap{ display:none !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function removeOldManualNav() {
    // If you previously added manual elements, this prevents duplicates.
    // Removes old elements by common IDs/classes used earlier.
    const ids = ["crumbCategory", "crumbCurrent"];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        // remove the whole breadcrumb container if present
        const nav = el.closest("nav");
        if (nav) nav.remove();
      }
    });

    const oldBack = document.querySelector(".back-to-library");
    if (oldBack) oldBack.remove();
  }

  function injectNav() {
    // Avoid injecting twice
    if (document.getElementById("aaPathwayNav")) return;

    const homeHref = getHomeHref();
    const title = humaniseSlug(slug);
    const category = inferCategory(slug);

    const wrap = document.createElement("div");
    wrap.className = "aa-nav-wrap";
    wrap.id = "aaPathwayNav";

    wrap.innerHTML = `
      <div class="aa-nav-left">
        <a class="aa-btn" href="${homeHref}">← Library</a>
        <div class="aa-breadcrumbs" aria-label="Breadcrumb">
          <a href="${homeHref}">Home</a>
          <span class="aa-sep">›</span>
          <span class="aa-cat">${category}</span>
          <span class="aa-sep">›</span>
          <span class="aa-current">${title}</span>
        </div>
      </div>
      <div class="aa-nav-right">
        <button class="aa-btn" type="button" id="aaPrintBtn">Print</button>
      </div>
    `;

    // Insert at top of body
    document.body.insertBefore(wrap, document.body.firstChild);

    // Print button
    const printBtn = document.getElementById("aaPrintBtn");
    if (printBtn) {
      printBtn.addEventListener("click", () => window.print());
    }
  }

  // -----------------------------
  // Run
  // -----------------------------
  function run() {
    // Only inject on pathway pages (optional safety)
    if (pathname.indexOf("/pathways/") === -1) return;
    ensureStyles();
    removeOldManualNav();
    injectNav();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
