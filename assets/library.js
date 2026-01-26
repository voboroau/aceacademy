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
