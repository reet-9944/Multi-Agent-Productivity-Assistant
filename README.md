# NEXUS — Multi-Agent AI Productivity Platform

> Hackathon Submission | H2S HackSkills | April 2026

---

## Problem Statement

Modern professionals juggle multiple disconnected tools — one app for tasks, another for notes, another for calendar, and yet another for knowledge management. Switching between them kills focus and productivity.

**NEXUS solves this** by unifying everything into a single AI-powered platform where you talk to one interface and six specialized agents handle the rest — intelligently, instantly, and in real time.

---

## Our Solution

NEXUS is a multi-agent AI productivity platform where each agent is a domain expert:

- You type a natural language command once
- The **Router Agent** understands your intent
- It dispatches to the right specialist (Task / Notes / Calendar / Knowledge / Weather)
- The result reflects instantly across your live dashboard

No switching apps. No learning syntax. Just results.

---

## Key Outcomes

- 10x faster task and note management via natural language
- Unified dashboard replacing 4–5 separate productivity tools
- Scalable multi-agent architecture powered by Gemini 1.5 Pro
- Zero-friction UX — works in the browser, no install needed

---

A single-page web app that puts six specialized AI agents at your fingertips through one clean interface. Manage tasks, notes, calendar events, and a knowledge base using natural language commands — all powered by Gemini AI and a FastAPI backend.

---

## Features

### 6 Specialized Agents

| Agent | Endpoint | What it does |
|---|---|---|
| Task Agent | `POST /add-task` | Create, prioritize, and track tasks |
| Notes Agent | `POST /add-note` | Capture and retrieve notes |
| Calendar Agent | `POST /add-event` | Schedule events with natural language |
| Knowledge Agent | `POST /add-knowledge` | Build a queryable knowledge base |
| Weather Agent | `GET /weather` | Real-time weather in your workflow |
| Router Agent | `POST /ai-command` | Routes commands to the right specialist |

### Core Sections

- **AI Chat** — Natural language interface connected to all 6 agents
- **Live Dashboard** — Real-time overview of tasks, notes, events, weather, and knowledge
- **Task Manager** — Add, complete, and delete tasks with priority and due date
- **Notes Manager** — Create and browse notes in a card grid
- **Knowledge Base** — Store tagged knowledge items and retrieve them instantly

---

## Tech Stack

- **Frontend** — Vanilla HTML/CSS/JS, Three.js (hero 3D animation)
- **Fonts** — Syne, Space Mono, DM Sans (Google Fonts)
- **Backend (expected)** — FastAPI + Google Gemini API (`google-generativeai`)
- **AI Model** — Gemini 1.5 Pro

---

## Getting Started

### Frontend only

Just open `index.html` in a browser — no build step required. The UI runs fully client-side with a local state simulation.

### With FastAPI backend

1. Install dependencies:
   ```bash
   pip install fastapi uvicorn google-generativeai
   ```

2. Set your Gemini API key:
   ```bash
   export GOOGLE_API_KEY=your_key_here
   ```

3. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

4. Open `index.html` and point the chat commands at your running API.

---

## Chat Commands

```
add task [name]       → Creates a new task via Task Agent
add note [content]    → Saves a note via Notes Agent
schedule [event]      → Adds a calendar event via Calendar Agent
show tasks            → Lists all active tasks
show notes            → Shows note count
weather               → Fetches current weather
help                  → Shows all available commands
```

---

## Project Structure

```
nexus-ai/
├── index.html          ← Frontend (HTML structure)
├── style.css           ← All styles
├── script.js           ← Frontend logic + API calls + offline fallback
├── main.py             ← FastAPI backend with all 6 agents
├── requirements.txt    ← Python dependencies
├── Dockerfile          ← Container config for Cloud Run
├── .dockerignore       ← Keeps Docker image clean
├── .env.example        ← Environment variable template
├── .gitignore          ← Git ignore rules
└── README.md           ← This file
```

---

## Deployment — Google Cloud Run

This project is deployed on **Google Cloud Run** for public access.

### Live Demo
> 🔗 **Cloud Run URL:** `https://nexus-ai-XXXXXXXX-uc.a.run.app` ← replace with your deployed URL

### Deploy to Cloud Run (steps)

1. **Containerize the app** — create a `Dockerfile`:
   ```dockerfile
   FROM python:3.11-slim
   WORKDIR /app
   COPY . .
   RUN pip install fastapi uvicorn google-generativeai
   EXPOSE 8080
   CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
   ```

2. **Build and push the image:**
   ```bash
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/nexus-ai
   ```

3. **Deploy to Cloud Run:**
   ```bash
   gcloud run deploy nexus-ai \
     --image gcr.io/YOUR_PROJECT_ID/nexus-ai \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars GOOGLE_API_KEY=your_key_here
   ```

4. Copy the generated service URL and use it as your **Cloud Run Deployment Link**.

---

## Hackathon Submission Links

| Item | Link |
|---|---|
| Cloud Run Deployment | `https://nexus-ai-XXXXXXXX-uc.a.run.app` |
| GitHub Repository | `https://github.com/YOUR_USERNAME/nexus-ai` |
| Demo Video | `https://youtu.be/YOUR_VIDEO_ID` |
| Project PPT | `https://drive.google.com/YOUR_PPT_LINK` |

> Replace all placeholder links above with your actual submission links before submitting.

---

## License

© 2026 NEXUS AI. All rights reserved.
