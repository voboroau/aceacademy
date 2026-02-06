<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Pulmonary Embolism — ED Click-through Wizard</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
body {
  font-family: Arial, sans-serif;
  background: #f5f7fa;
  margin: 0;
}
.container {
  max-width: 900px;
  margin: auto;
  background: #fff;
  padding: 24px;
}
h1, h2 {
  color: #1a3c6e;
}
.step {
  display: none;
}
.step.active {
  display: block;
}
label {
  display: block;
  margin-top: 12px;
  font-weight: bold;
}
input[type="checkbox"] {
  margin-right: 8px;
}
button {
  margin-top: 20px;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.next {
  background: #1a73e8;
  color: white;
}
.back {
  background: #666;
  color: white;
}
.info {
  background: #eef4ff;
  padding: 12px;
  border-left: 4px solid #1a73e8;
  margin-top: 10px;
}
.redflag {
  background: #ffecec;
  padding: 12px;
  border-left: 4px solid #d93025;
  margin-top: 10px;
}
textarea {
  width: 100%;
  min-height: 120px;
  margin-top: 10px;
}
.footer {
  margin-top: 30px;
  font-size: 0.9em;
  color: #666;
}
</style>
</head>

<body>
<div class="container">

<h1>Pulmonary Embolism</h1>
<p>Emergency Department — Step-by-step Clinical Reasoning</p>

<!-- STEP 1 -->
<div class="step active">
  <h2>Step 1 — Presenting Features</h2>

  <label><input type="checkbox"> Sudden onset dyspnoea</label>
  <label><input type="checkbox"> Pleuritic chest pain</label>
  <label><input type="checkbox"> Tachycardia</label>
  <label><input type="checkbox"> Haemoptysis</label>
  <label><input type="checkbox"> Syncope / collapse</label>

  <div class="info">
    <strong>Why this matters:</strong><br>
    Pulmonary embolism is often subtle and easily missed. Sudden dyspnoea or chest pain without clear cause should always prompt consideration of PE.
  </div>

  <button class="next" onclick="nextStep()">Next →</button>
</div>

<!-- STEP 2 -->
<div class="step">
  <h2>Step 2 — Immediate Stability Check</h2>

  <label><input type="checkbox"> Hypotension or shock</label>
  <label><input type="checkbox"> Oxygen saturation &lt; 90%</label>
  <label><input type="checkbox"> Altered consciousness</label>

  <div class="redflag">
    <strong>Red flag:</strong><br>
    Haemodynamic instability suggests massive PE and requires immediate senior review and urgent imaging / treatment.
  </div>

  <button class="back" onclick="prevStep()">← Back</button>
  <button class="next" onclick="nextStep()">Next →</button>
</div>

<!-- STEP 3 -->
<div class="step">
  <h2>Step 3 — Wells Risk Stratification</h2>

  <label><input type="checkbox"> Clinical signs of DVT</label>
  <label><input type="checkbox"> PE more likely than alternative diagnosis</label>
  <label><input type="checkbox"> Heart rate &gt; 100</label>
  <label><input type="checkbox"> Recent surgery or immobilisation</label>
  <label><input type="checkbox"> Previous DVT / PE</label>
  <label><input type="checkbox"> Haemoptysis</label>
  <label><input type="checkbox"> Active malignancy</label>

  <div class="info">
    <strong>Why this matters:</strong><br>
    Wells score guides investigation strategy and avoids unnecessary CT pulmonary angiography.
  </div>

  <button class="back" onclick="prevStep()">← Back</button>
  <button class="next" onclick="nextStep()">Next →</button>
</div>

<!-- STEP 4 -->
<div class="step">
  <h2>Step 4 — Initial Investigations</h2>

  <div class="info">
    <ul>
      <li>ECG (sinus tachycardia, right heart strain)</li>
      <li>D-dimer (if low/intermediate risk)</li>
      <li>CTPA (if high risk or positive D-dimer)</li>
      <li>Troponin / BNP if risk stratifying</li>
      <li>ABG if hypoxic</li>
    </ul>
  </div>

  <textarea id="investigations" placeholder="Investigations ordered..."></textarea>

  <button class="back" onclick="prevStep()">← Back</button>
  <button class="next" onclick="nextStep()">Next →</button>
</div>

<!-- STEP 5 -->
<div class="step">
  <h2>Step 5 — Initial Management</h2>

  <div class="info">
    <ul>
      <li>Oxygen if hypoxic</li>
      <li>Analgesia</li>
      <li>Anticoagulation unless contraindicated</li>
      <li>Consider thrombolysis if massive PE</li>
      <li>Early senior / ICU involvement if unstable</li>
    </ul>
  </div>

  <textarea id="management" placeholder="Immediate management..."></textarea>

  <button class="back" onclick="prevStep()">← Back</button>
  <button class="next" onclick="nextStep()">Next →</button>
</div>

<!-- STEP 6 -->
<div class="step">
  <h2>Step 6 — ED Summary</h2>

  <textarea id="summary"></textarea>

  <button class="back" onclick="prevStep()">← Back</button>
  <button class="next" onclick="generateSummary()">Generate Summary</button>
</div>

<div class="footer">
  Educational tool — Australian ED practice aligned
</div>

</div>

<script>
let current = 0;
const steps = document.querySelectorAll(".step");

function showStep(n) {
  steps.forEach(s => s.classList.remove("active"));
  steps[n].classList.add("active");
}

function nextStep() {
  if (current < steps.length - 1) {
    current++;
    showStep(current);
  }
}

function prevStep() {
  if (current > 0) {
    current--;
    showStep(current);
  }
}

function generateSummary() {
  const summaryText = `
Diagnosis considered: Pulmonary Embolism

Risk stratification performed (Wells criteria applied).

Investigations:
${document.getElementById("investigations").value}

Initial Management:
${document.getElementById("management").value}

Plan:
CTPA as indicated, anticoagulation commenced if appropriate, senior review arranged.
`;
  document.getElementById("summary").value = summaryText;
}
</script>

</body>
</html>
