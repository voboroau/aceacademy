const pathways = [
  {
    title: "Chronic Rhinosinusitis (Nasal Polyps) — Click-through",
    href: "./pathways/crs-nasal-polyps/",
    tags: ["ENT", "CRS", "Asthma"],
    summary: "Assessment → saline + intranasal steroid → review → escalation → CT/ENT referral + safety-net."
  },
  {
    title: "COPD Exacerbation — Click-through",
    href: "./pathways/copd-exacerbation/",
    tags: ["Resp", "COPD", "Acute"],
    summary: "Triage → severity → SABA/SAMA + steroids → antibiotics criteria → escalation/ED criteria → follow-up."
  },
  {
  title: "Hyperthyroidism / Thyrotoxicosis — Click-through",
  href: "./pathways/hyperthyroidism-thyrotoxicosis/",
  tags: ["Endocrine", "Thyroid"],
  summary: "Confirm biochemistry → triage emergencies → determine cause → β-blocker → referral and follow-up."
},
  {
  title: "Acute Diarrhoea / Gastroenteritis — Click-through",
  href: "./pathways/acute-diarrhoea-gastroenteritis/",
  tags: ["GI", "Infectious", "Acute"],
  summary: "Triage dehydration and red flags → selective stool testing → supportive care → antibiotics only when indicated → safety-net and public health."
},
  {
  title: "Atrial Fibrillation — Click-through",
  href: "./pathways/atrial-fibrillation/",
  tags: ["Cardiology", "AF", "Stroke"],
  summary: "Confirm AF → assess stability → rate control → CHA₂DS₂-VA → anticoagulation → ongoing follow-up and referral."
},
  {
  title: "Atrial Fibrillation — Exam Mode (Click-through)",
  href: "./pathways/atrial-fibrillation-exam/",
  tags: ["Cardiology", "AF", "Exam"],
  summary: "Exam mode: make a decision first → then reveal guidance. Great for PESCI/AMC-style practice."
},
{
  title: "STEMI (ST-Elevation MI) — Click-through",
  href: "./pathways/stemi/",
  tags: ["Cardiology", "Emergency", "ACS"],
  summary: "Recognise STEMI → activate 000/PCI network → ECG + aspirin → supportive care → reperfusion plan (PCI vs lysis) → structured handover."
}

];

const grid = document.getElementById("grid");
const search = document.getElementById("search");
const chips = document.getElementById("chips");
let activeTag = "All";

function uniqueTags() {
  const set = new Set();
  pathways.forEach(p => p.tags.forEach(t => set.add(t)));
  return ["All", ...Array.from(set).sort()];
}

function renderChips() {
  chips.innerHTML = "";
  uniqueTags().forEach(tag => {
    const el = document.createElement("div");
    el.className = "chip" + (tag === activeTag ? " active" : "");
    el.textContent = tag;
    el.addEventListener("click", () => {
      activeTag = tag;
      renderChips();
      render();
    });
    chips.appendChild(el);
  });
}

function matches(p, q) {
  const hay = (p.title + " " + p.summary + " " + p.tags.join(" ")).toLowerCase();
  return hay.includes(q.toLowerCase());
}

function tagPass(p) {
  return activeTag === "All" || p.tags.includes(activeTag);
}

function render() {
  const q = (search.value || "").trim();
  const filtered = pathways.filter(p => tagPass(p) && (q === "" || matches(p, q)));

  grid.innerHTML = "";
  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${p.title}</h3>
      <div class="meta">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      <p>${p.summary}</p>
      <a href="${p.href}">Open pathway →</a>
    `;
    grid.appendChild(card);
  });

  if (filtered.length === 0) {
    const empty = document.createElement("div");
    empty.className = "card";
    empty.innerHTML = `<h3>No matches</h3><p>Try a different search term or tag.</p>`;
    grid.appendChild(empty);
  }
}

search.addEventListener("input", render);
renderChips();
render();
