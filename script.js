const GEMINI_API_KEY = "AIzaSyAXNh6mrThNgMgKYxSy_sDk37U2_nMVAX0";

async function callGemini(prompt) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    }
  );
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
}

// Proposal Generator
async function generateProposal() {
  const input = document.getElementById("proposalInput").value;
  const output = document.getElementById("proposalOutput");
  output.innerHTML = "Generating...";
  output.innerHTML = await callGemini(`Create a marketing proposal outline for: ${input}`);
}

// Copy Generator
async function generateCopy() {
  const product = document.getElementById("copyProduct").value;
  const audience = document.getElementById("copyAudience").value;
  const tone = document.getElementById("copyTone").value;
  const words = document.getElementById("copyWords").value;
  const output = document.getElementById("copyOutput");
  output.innerHTML = "Generating...";
  output.innerHTML = await callGemini(`Write a ${words}-word ${tone} tagline for ${product} targeting ${audience}.`);
}

// Chat Assistant
async function sendChat() {
  const input = document.getElementById("chatInput").value;
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML += `<p><b>You:</b> ${input}</p>`;
  const reply = await callGemini(input);
  chatBox.innerHTML += `<p><b>AI:</b> ${reply}</p>`;
  document.getElementById("chatInput").value = "";
}

// Case Studies
function openCaseStudy(id) {
  window.location.href = `case-study.html?id=${id}`;
}

async function loadCaseStudy() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const title = document.getElementById("caseTitle");
  const content = document.getElementById("caseContent");

  if (id) {
    title.innerText = "Case Study: " + id;
    content.innerText = "Loading AI-generated case study...";
    content.innerText = await callGemini(`Generate a detailed marketing case study for: ${id}`);
  }
}

if (window.location.pathname.endsWith("case-study.html")) {
  loadCaseStudy();
}


