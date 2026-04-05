// ============ STATE ============
const state = {
  tasks: [
    {
      id: 1,
      name: "Complete AI integration",
      priority: "high",
      due: "2025-07-20",
      done: false,
    },
    {
      id: 2,
      name: "Review project proposal",
      priority: "medium",
      due: "2025-07-22",
      done: true,
    },
    {
      id: 3,
      name: "Update documentation",
      priority: "low",
      due: "2025-07-25",
      done: false,
    },
  ],
  notes: [
    {
      id: 1,
      title: "Meeting Notes",
      content: "Discussed Q3 roadmap and agent architecture decisions.",
      date: "Jul 15",
    },
    {
      id: 2,
      title: "AI Research",
      content:
        "Gemini 1.5 Pro supports 1M token context window — ideal for knowledge retrieval.",
      date: "Jul 14",
    },
    {
      id: 3,
      title: "Design Thoughts",
      content:
        "Glassmorphism + neon accents work well for futuristic SaaS dashboards.",
      date: "Jul 13",
    },
    {
      id: 4,
      title: "Project Ideas",
      content:
        "Multi-agent system with specialized agents per domain seems most scalable.",
      date: "Jul 12",
    },
  ],
  knowledge: [
    {
      id: 1,
      title: "Gemini API Setup",
      content:
        "Use google-generativeai Python SDK. Set GOOGLE_API_KEY env variable before initializing.",
      tags: ["gemini", "api", "setup"],
    },
    {
      id: 2,
      title: "FastAPI Best Practices",
      content:
        "Use async endpoints, Pydantic models for validation, and dependency injection for shared services.",
      tags: ["fastapi", "python", "backend"],
    },
  ],
  events: [
    { id: 1, title: "Team Standup", date: "2025-07-21", time: "10:00 AM" },
    { id: 2, title: "Product Demo", date: "2025-07-23", time: "2:00 PM" },
  ],
  chatHistory: [],
};

// ============ CURSOR ============
const cursor = document.getElementById("cursor");
const cursorRing = document.getElementById("cursor-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 6 + "px";
  cursor.style.top = my - 6 + "px";
});
function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx - 20 + "px";
  cursorRing.style.top = ry - 20 + "px";
  requestAnimationFrame(animRing);
}
animRing();

// ============ THREE.JS HERO ============
(function () {
  const canvas = document.getElementById("three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );
  camera.position.set(0, 0, 5);

  // Ambient + directional lights
  scene.add(new THREE.AmbientLight(0x001133, 2));
  const light1 = new THREE.PointLight(0x00d4ff, 4, 20);
  light1.position.set(3, 3, 3);
  scene.add(light1);
  const light2 = new THREE.PointLight(0x7c3aed, 3, 20);
  light2.position.set(-3, -2, 2);
  scene.add(light2);
  const light3 = new THREE.PointLight(0x00ff9d, 2, 15);
  light3.position.set(0, 4, -2);
  scene.add(light3);

  // Central sphere
  const sGeo = new THREE.IcosahedronGeometry(1.2, 4);
  const sMat = new THREE.MeshPhongMaterial({
    color: 0x001a33,
    wireframe: false,
    emissive: 0x001133,
    shininess: 100,
    transparent: true,
    opacity: 0.9,
  });
  const sphere = new THREE.Mesh(sGeo, sMat);
  scene.add(sphere);

  // Wireframe overlay
  const wMat = new THREE.MeshBasicMaterial({
    color: 0x00d4ff,
    wireframe: true,
    transparent: true,
    opacity: 0.12,
  });
  const wSphere = new THREE.Mesh(new THREE.IcosahedronGeometry(1.22, 2), wMat);
  scene.add(wSphere);

  // Outer ring
  const rGeo = new THREE.TorusGeometry(2.2, 0.015, 8, 120);
  const rMat = new THREE.MeshBasicMaterial({
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.3,
  });
  const ring1 = new THREE.Mesh(rGeo, rMat);
  ring1.rotation.x = Math.PI / 4;
  scene.add(ring1);
  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(1.8, 0.01, 8, 100),
    new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.25,
    }),
  );
  ring2.rotation.x = -Math.PI / 3;
  ring2.rotation.y = Math.PI / 6;
  scene.add(ring2);

  // Floating nodes (neural network style)
  const nodes = [];
  const nodeGeo = new THREE.SphereGeometry(0.04, 8, 8);
  for (let i = 0; i < 30; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const r = 2.5 + Math.random() * 1.5;
    const m = new THREE.MeshBasicMaterial({
      color: i % 3 === 0 ? 0x00d4ff : i % 3 === 1 ? 0xa855f7 : 0x00ff9d,
      transparent: true,
      opacity: 0.7,
    });
    const n = new THREE.Mesh(nodeGeo, m);
    n.position.set(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi),
    );
    n._theta = theta;
    n._phi = phi;
    n._r = r;
    n._speed = 0.001 + Math.random() * 0.002;
    scene.add(n);
    nodes.push(n);
  }

  // Lines between nodes
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.06,
  });
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].position.distanceTo(nodes[j].position) < 2) {
        const pts = [nodes[i].position.clone(), nodes[j].position.clone()];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
        scene.add(new THREE.Line(lineGeo, lineMat));
      }
    }
  }

  let mouse = { x: 0, y: 0 };
  document.addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  });
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.008;
    sphere.rotation.y = t * 0.3;
    sphere.rotation.x = t * 0.1;
    wSphere.rotation.y = -t * 0.2;
    wSphere.rotation.z = t * 0.15;
    ring1.rotation.z = t * 0.4;
    ring2.rotation.y = t * 0.3;
    light1.position.x = Math.sin(t) * 4;
    light1.position.z = Math.cos(t) * 4;
    light2.position.x = Math.sin(t + 2) * 3;
    light2.position.y = Math.cos(t + 2) * 3;
    nodes.forEach((n, i) => {
      n._theta += n._speed;
      n.position.x = n._r * Math.sin(n._phi) * Math.cos(n._theta);
      n.position.z = n._r * Math.sin(n._phi) * Math.sin(n._theta);
    });
    camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.04;
    camera.position.y += (mouse.y * 0.6 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  animate();
})();

// ============ FEATURES DATA ============
const features = [
  {
    icon: "🤖",
    color: "rgba(0,212,255,0.15)",
    title: "Task Agent",
    desc: "Intelligent task creation, prioritization, and tracking. Never miss a deadline with AI-powered reminders.",
    tag: "POST /add-task",
  },
  {
    icon: "📝",
    color: "rgba(124,58,237,0.15)",
    title: "Notes Agent",
    desc: "Capture, organize, and retrieve notes with semantic search. Your second brain, powered by AI.",
    tag: "POST /add-note",
  },
  {
    icon: "📅",
    color: "rgba(0,255,157,0.15)",
    title: "Calendar Agent",
    desc: "Smart scheduling that understands context. Book meetings with natural language commands.",
    tag: "POST /add-event",
  },
  {
    icon: "🧠",
    color: "rgba(255,107,53,0.15)",
    title: "Knowledge Agent",
    desc: "Build a queryable knowledge base from any information. Retrieve insights in seconds.",
    tag: "POST /add-knowledge",
  },
  {
    icon: "🌦️",
    color: "rgba(255,215,0,0.15)",
    title: "Weather Agent",
    desc: "Real-time weather data integrated directly into your productivity workflow.",
    tag: "GET /weather",
  },
  {
    icon: "⚡",
    color: "rgba(255,45,120,0.15)",
    title: "Router Agent",
    desc: "Master coordinator that understands intent and routes commands to the right specialist agent.",
    tag: "POST /ai-command",
  },
];

const fg = document.getElementById("features-grid");
features.forEach((f, i) => {
  const el = document.createElement("div");
  el.className = "feature-card";
  el.style.animationDelay = i * 0.1 + "s";
  el.innerHTML = `<div class="feature-icon" style="background:${f.color}">${f.icon}</div><div class="feature-title">${f.title}</div><div class="feature-desc">${f.desc}</div><div class="feature-tag">${f.tag}</div>`;
  fg.appendChild(el);
});

// ============ AGENT PILLS ============
const pills = [
  { name: "Task Agent", color: "#00d4ff" },
  { name: "Notes Agent", color: "#a855f7" },
  { name: "Calendar Agent", color: "#00ff9d" },
  { name: "Knowledge Agent", color: "#ff6b35" },
  { name: "Weather Agent", color: "#ffd700" },
  { name: "Router Agent", color: "#ff2d78" },
];
const ap = document.getElementById("agent-pills");
pills.forEach((p) => {
  const el = document.createElement("div");
  el.className = "agent-pill";
  el.innerHTML = `<span class="agent-pill-dot" style="background:${p.color}"></span>${p.name}`;
  ap.appendChild(el);
});

// ============ STATS COUNTER ANIMATION ============
function animateCounter(el, target, suffix = "") {
  let v = 0;
  const step = target / 60;
  const iv = setInterval(() => {
    v = Math.min(v + step, target);
    el.textContent = Math.floor(v) + suffix;
    if (v >= target) clearInterval(iv);
  }, 25);
}
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCounter(
          document.getElementById("sv1"),
          state.tasks.length + 1200,
          "+",
        );
        animateCounter(
          document.getElementById("sv2"),
          state.notes.length + 840,
          "+",
        );
        animateCounter(
          document.getElementById("sv3"),
          state.events.length + 600,
          "+",
        );
        animateCounter(
          document.getElementById("sv4"),
          state.knowledge.length + 300,
          "+",
        );
        statsObserver.disconnect();
      }
    });
  },
  { threshold: 0.3 },
);
statsObserver.observe(document.getElementById("stats"));

// ============ CHAT SYSTEM ============
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");

const initialMessages = [
  {
    role: "ai",
    text: "Hello! I'm NEXUS, your multi-agent AI assistant. I manage 6 specialized agents ready to help you.",
    delay: 0,
  },
  { role: "user", text: "add task review project proposal", delay: 800 },
  {
    role: "ai",
    text:
      '✅ Task added: "Review project proposal" — set to Medium priority. You now have ' +
      state.tasks.length +
      " active tasks.",
    delay: 1600,
  },
];

function addMessage(role, text) {
  const msg = document.createElement("div");
  msg.className = `msg ${role}`;
  msg.innerHTML = `<div class="msg-avatar">${role === "ai" ? "🤖" : "👤"}</div><div class="msg-bubble">${text}</div>`;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
  const t = document.createElement("div");
  t.className = "msg ai";
  t.id = "typing";
  t.innerHTML = `<div class="msg-avatar">🤖</div><div class="msg-bubble"><div class="typing-indicator"><span></span><span></span><span></span></div></div>`;
  chatMessages.appendChild(t);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return t;
}

initialMessages.forEach((m) => {
  setTimeout(() => addMessage(m.role, m.text), m.delay);
});

function processCommand(cmd) {
  const c = cmd.toLowerCase().trim();
  if (c.startsWith("add task ")) {
    const name = cmd.slice(9);
    const task = {
      id: Date.now(),
      name,
      priority: "medium",
      due: "",
      done: false,
    };
    state.tasks.push(task);
    renderTasks();
    updateDashboard();
    return `✅ Task added: "${name}" — I've routed this to your Task Agent. Total active tasks: ${state.tasks.filter((t) => !t.done).length}`;
  }
  if (c.startsWith("add note ")) {
    const content = cmd.slice(9);
    const note = {
      id: Date.now(),
      title: "Quick Note",
      content,
      date: new Date().toLocaleDateString("en", {
        month: "short",
        day: "numeric",
      }),
    };
    state.notes.push(note);
    renderNotes();
    updateDashboard();
    return `📝 Note saved: "${content.slice(0, 50)}..." — Notes Agent has stored this in your knowledge base.`;
  }
  if (c.startsWith("schedule ") || c.startsWith("add event ")) {
    const title = c.startsWith("schedule ") ? cmd.slice(9) : cmd.slice(10);
    state.events.push({
      id: Date.now(),
      title,
      date: "2025-07-24",
      time: "3:00 PM",
    });
    updateDashboard();
    return `📅 Event scheduled: "${title}" — Calendar Agent has added this to your schedule.`;
  }
  if (c.includes("show tasks") || c.includes("list tasks")) {
    const active = state.tasks.filter((t) => !t.done);
    return `📋 You have ${active.length} active tasks:\n${active.map((t, i) => `${i + 1}. ${t.name}`).join("\n")}`;
  }
  if (c.includes("show notes") || c.includes("list notes")) {
    return `📝 You have ${state.notes.length} notes stored in your knowledge base.`;
  }
  if (c.includes("weather")) {
    return `🌦️ Weather Agent: Currently 24°C, Partly Cloudy in your area. Humidity 68%, Wind 12 km/h. Good conditions for outdoor activities!`;
  }
  if (c.includes("hello") || c.includes("hi ")) {
    return `👋 Hello! I'm NEXUS with 6 agents at your service. Try commands like "add task [name]", "add note [content]", "schedule [event]", or "show tasks".`;
  }
  if (c.includes("help")) {
    return `🤖 Available commands:\n• add task [name]\n• add note [content]\n• schedule [event]\n• show tasks\n• show notes\n• weather\n\nAll powered by Gemini AI via FastAPI.`;
  }
  return `🤖 Command understood. Routing to appropriate agent... For best results, try:\n"add task [name]" | "add note [text]" | "schedule [event]" | "show tasks"`;
}

async function sendChat() {
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage("user", text);
  chatInput.value = "";
  const typing = showTyping();
  await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));
  typing.remove();
  const response = processCommand(text);
  addMessage("ai", response);
}

document.getElementById("chat-send").addEventListener("click", sendChat);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendChat();
});

// ============ DASHBOARD ============
function buildDashboard() {
  const grid = document.getElementById("dashboard-grid");
  grid.innerHTML = "";

  // Featured: Tasks overview
  const taskCard = document.createElement("div");
  taskCard.className = "dash-card featured";
  const active = state.tasks.filter((t) => !t.done).length;
  taskCard.innerHTML = `
    <div class="dash-card-label"><span>TASKS OVERVIEW</span><span style="color:var(--green)">● LIVE</span></div>
    <div class="dash-stat cyan">${active}</div>
    <div style="color:var(--text2);font-size:13px;margin:8px 0 20px;">Active tasks of ${state.tasks.length} total</div>
    <div class="task-list">
      ${state.tasks
        .slice(0, 5)
        .map(
          (t) => `
        <div class="task-item">
          <div class="task-check ${t.done ? "done" : "pending"}">${t.done ? "✓" : ""}</div>
          <span style="font-size:13px;${t.done ? "text-decoration:line-through;color:var(--text3)" : ""}">${t.name}</span>
          <span class="task-pri ${t.priority === "high" ? "pri-high" : t.priority === "medium" ? "pri-med" : "pri-low"}">${t.priority.toUpperCase()}</span>
        </div>
      `,
        )
        .join("")}
    </div>`;
  grid.appendChild(taskCard);

  // Notes count
  const notesCard = document.createElement("div");
  notesCard.className = "dash-card";
  notesCard.innerHTML = `
    <div class="dash-card-label">NOTES STORED</div>
    <div class="dash-stat purple">${state.notes.length}</div>
    <div style="color:var(--text2);font-size:13px;margin-top:8px;">Notes in base</div>
    <div class="mini-chart">${[60, 45, 80, 55, 90, 70, 85].map((h) => `<div class="bar" style="height:${h}%"></div>`).join("")}</div>`;
  grid.appendChild(notesCard);

  // Events
  const evCard = document.createElement("div");
  evCard.className = "dash-card";
  evCard.innerHTML = `
    <div class="dash-card-label">CALENDAR</div>
    <div class="dash-stat green">${state.events.length}</div>
    <div style="color:var(--text2);font-size:13px;margin-top:8px;">Upcoming events</div>
    <div style="margin-top:16px;display:flex;flex-direction:column;gap:8px;">
      ${state.events.map((ev) => `<div style="font-size:12px;color:var(--text2);border:1px solid var(--border);border-radius:8px;padding:8px 12px;font-family:var(--font-mono);">📅 ${ev.title}</div>`).join("")}
    </div>`;
  grid.appendChild(evCard);

  // Weather
  const wCard = document.createElement("div");
  wCard.className = "dash-card";
  wCard.innerHTML = `
    <div class="dash-card-label">WEATHER</div>
    <div class="weather-widget">
      <div class="weather-main">
        <div class="weather-icon">⛅</div>
        <div>
          <div class="weather-temp">24°C</div>
          <div style="color:var(--text2);font-size:13px;">Partly Cloudy</div>
        </div>
      </div>
      <div class="weather-details">
        <span>💧 68%</span><span>💨 12 km/h</span><span>👁 10 km</span>
      </div>
    </div>`;
  grid.appendChild(wCard);

  // Knowledge
  const kbCard = document.createElement("div");
  kbCard.className = "dash-card";
  kbCard.innerHTML = `
    <div class="dash-card-label">KNOWLEDGE BASE</div>
    <div class="dash-stat" style="background:linear-gradient(135deg,var(--orange),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;">${state.knowledge.length}</div>
    <div style="color:var(--text2);font-size:13px;margin-top:8px;">Items stored</div>
    <div style="margin-top:16px;">
      ${state.knowledge
        .slice(0, 2)
        .map(
          (k) =>
            `<div style="font-size:12px;color:var(--text3);margin-bottom:8px;font-family:var(--font-mono);">📚 ${k.title}</div>`,
        )
        .join("")}
    </div>`;
  grid.appendChild(kbCard);
}

function updateDashboard() {
  buildDashboard();
}
buildDashboard();

// ============ TASKS ============
function renderTasks() {
  const list = document.getElementById("tasks-list");
  document.getElementById("task-count").textContent = state.tasks.length;
  if (state.tasks.length === 0) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">📋</div>No tasks yet. Add your first task!</div>`;
    return;
  }
  list.innerHTML = state.tasks
    .map(
      (t) => `
    <div class="task-card ${t.done ? "done-card" : ""}" id="tc-${t.id}">
      <div class="task-check ${t.done ? "done" : "pending"}" onclick="toggleTask(${t.id})" style="cursor:none;">${t.done ? "✓" : ""}</div>
      <div class="task-body">
        <div class="task-name">${t.name}</div>
        <div class="task-meta">${t.due ? "Due: " + t.due : ""} ${t.due && t.priority ? "·" : ""} ${t.priority ? t.priority.toUpperCase() : ""}</div>
      </div>
      <span class="task-pri ${t.priority === "high" ? "pri-high" : t.priority === "medium" ? "pri-med" : "pri-low"}">${t.priority.toUpperCase()}</span>
      <button class="task-del" onclick="deleteTask(${t.id})">✕</button>
    </div>`,
    )
    .join("");
}

function addTask() {
  const name = document.getElementById("task-name").value.trim();
  if (!name) {
    showToast("⚠️", "Please enter a task name");
    return;
  }
  state.tasks.unshift({
    id: Date.now(),
    name,
    priority: document.getElementById("task-priority").value,
    due: document.getElementById("task-due").value,
    done: false,
  });
  document.getElementById("task-name").value = "";
  renderTasks();
  updateDashboard();
  showToast("✅", `Task "${name}" added!`);
}

function toggleTask(id) {
  const t = state.tasks.find((t) => t.id === id);
  if (t) {
    t.done = !t.done;
    renderTasks();
    updateDashboard();
  }
}

function deleteTask(id) {
  state.tasks = state.tasks.filter((t) => t.id !== id);
  renderTasks();
  updateDashboard();
  showToast("🗑️", "Task deleted");
}
renderTasks();

// ============ NOTES ============
function renderNotes() {
  const grid = document.getElementById("notes-grid");
  if (state.notes.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">📝</div>No notes yet!</div>`;
    return;
  }
  grid.innerHTML = state.notes
    .map(
      (n) => `
    <div class="note-card">
      <div class="note-title">${n.title}</div>
      <div class="note-content">${n.content}</div>
      <div class="note-date">${n.date}</div>
    </div>`,
    )
    .join("");
}

function addNote() {
  const title = document.getElementById("note-title").value.trim();
  const content = document.getElementById("note-content").value.trim();
  if (!content) {
    showToast("⚠️", "Please enter note content");
    return;
  }
  state.notes.unshift({
    id: Date.now(),
    title: title || "Quick Note",
    content,
    date: new Date().toLocaleDateString("en", {
      month: "short",
      day: "numeric",
    }),
  });
  document.getElementById("note-title").value = "";
  document.getElementById("note-content").value = "";
  renderNotes();
  updateDashboard();
  showToast("📝", "Note saved!");
}
renderNotes();

// ============ KNOWLEDGE ============
function renderKnowledge() {
  const list = document.getElementById("kb-list");
  if (state.knowledge.length === 0) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">🧠</div>Knowledge base empty. Add your first item!</div>`;
    return;
  }
  list.innerHTML = state.knowledge
    .map(
      (k) => `
    <div class="kb-item">
      <div class="kb-title">${k.title}</div>
      <div class="kb-content">${k.content}</div>
      <div class="kb-tags">${k.tags.map((tag) => `<span class="kb-tag">${tag}</span>`).join("")}</div>
    </div>`,
    )
    .join("");
}

function addKnowledge() {
  const title = document.getElementById("kb-title").value.trim();
  const content = document.getElementById("kb-content").value.trim();
  const tags = document
    .getElementById("kb-tags")
    .value.split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  if (!title || !content) {
    showToast("⚠️", "Fill in topic and knowledge");
    return;
  }
  state.knowledge.unshift({ id: Date.now(), title, content, tags });
  document.getElementById("kb-title").value = "";
  document.getElementById("kb-content").value = "";
  document.getElementById("kb-tags").value = "";
  renderKnowledge();
  updateDashboard();
  showToast("🧠", "Knowledge stored!");
}
renderKnowledge();

// ============ TOAST ============
function showToast(icon, msg) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = `<span class="toast-icon">${icon}</span><span>${msg}</span>`;
  document.body.appendChild(t);
  setTimeout(() => {
    t.style.transition = "opacity 0.4s";
    t.style.opacity = "0";
    setTimeout(() => t.remove(), 400);
  }, 3000);
}

// ============ SCROLL ANIMATIONS ============
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting)
        e.target.style.animation = "fadeUp 0.7s ease forwards";
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".feature-card,.step,.dash-card").forEach((el) => {
  el.style.opacity = "0";
  observer.observe(el);
});

// ============ FLOATING PARTICLES ============
for (let i = 0; i < 15; i++) {
  const p = document.createElement("div");
  p.className = "particle";
  const size = 2 + Math.random() * 4;
  p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}vw;animation-duration:${8 + Math.random() * 12}s;animation-delay:${Math.random() * 8}s;`;
  document.body.appendChild(p);
}

console.log(
  "%cNEXUS AI — Multi-Agent Productivity Platform",
  "color:#00d4ff;font-size:18px;font-weight:bold;font-family:monospace;",
);
console.log(
  "%c6 Agents Online ● Gemini Powered ● FastAPI Backend",
  "color:#a855f7;font-family:monospace;",
);
