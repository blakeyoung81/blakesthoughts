---
title: "BoardBuddy Streaming Overlay & AI Tutor"
description: "Medical study stream overlay and interactive chatbot platform featuring Pomodoro timers, tomato garden gamification, and an AI-powered ChatGPT-4 medical tutor."
pubDate: "2025-10-27"
repo: "https://github.com/blakeyoung81/BoardBuddy"
tech: ["Vanilla JS", "Node.js", "Express", "Supabase", "TMI.js", "OpenAI API", "Python"]
cover: "/images/projects/board-buddy-hero.png"
featured: true
category: "Med-Tech / Software"
color: "from-indigo-500 to-purple-600"
order: 9
---

# BoardBuddy - Medical Study Stream Platform

BoardBuddy is a comprehensive streaming overlay and chatbot system designed specifically for medical study streams on platforms like Twitch and YouTube. It combines Pomodoro timers, shared and personal task management, interactive gamification elements (an animated tomato garden), study streak tracking, and an AI-powered medical tutor to create an engaging and cooperative learning environment for medical students worldwide.

**Live on Twitch:** [Twitch.tv/blakeoncall](https://twitch.tv/blakeoncall)

---

## Key Core Features

### 🎮 Dynamic Stream Overlays
* **Pomodoro Timer**: Work and break tracking with real-time visual overlays synced across the stream.
* **Tomato Garden (Gamification)**: A visual panel showing the top 10 leaderboard of viewers ranked by "tomatoes earned" (1 tomato is awarded per completed Pomodoro session). The panel features custom-designed SVG growth stages where plants grow dynamically from seeds to ripe tomatoes through **21 distinct animation stages**.
* **Break Garden**: Tracks viewer engagement during break sessions with **15 stages** of growth animations.
* **Community & Personal Task Panels**: Separate overlays separating the host's current task checklist from the shared viewer task checklist, keeping everyone aligned.
* **debt Progress Bar**: A visual bar showing transparent donation progress toward a $60k medical school debt goal, triggering custom sparkle animations upon new contributions.
* **Interactive World Map**: A command-triggered visual map overlay that plots viewer locations with pulsing geolocation pins, highlighting the global reach of the study group.

### 🤖 Twitch & YouTube Chat Bots
* **Task Controls**: Viewers manage their tasks in real-time using chatbot commands: `!task [description]`, `!done`, and `!now`.
* **Engagement Stats**: Stream participants can query their individual statistics with `!stats` and check their daily streaks using `!streak`.
* **Streak Tracking**: Encourages daily engagement by tracking consecutive study days. Active chat participants earn progressive fire emojis: 🔥 → 🔥🔥 → 🔥🔥🔥.

### 🎓 AI Medical Tutor (IvyTutor)
Integrated directly into the streaming chatbot ecosystem, **IvyTutor** (powered by OpenAI's GPT-4 API) serves as a dedicated USMLE Step 1 medical tutor. 
* **Mechanisms-Focused Q&A**: Responds to complex medical queries (`!ivytutor [question]`) in chat.
* **High-Yield Explanations**: Specially prompted to deliver highly concise, mechanism-based medical answers (2-4 sentences max) suited for fast-paced streams.
* **Medical Study Overlay**: Generates anatomical diagrams and reference visuals using Pollinations.AI in parallel to accompany student study materials.

---

## Technical Architecture

BoardBuddy uses a modern, lightweight, and highly reactive stack to ensure near-zero latency overlays:

```
                  ┌───────────────────────┐
                  │   Twitch / YouTube    │
                  └───────────┬───────────┘
                              │ Chat Commands
                              ▼
┌──────────────┐    ┌───────────────────┐    ┌─────────────────┐
│              │◄───┤    TMI.js Bot     ├───►│  OpenAI API     │
│   Supabase   │    │  (Node.js Server) │    │  (IvyTutor AI)  │
│  (Realtime   │    └───────────────────┘    └─────────────────┘
│   Database)  │              │
│              │              │ Syncs State
└──────┬───────┘              ▼
       │            ┌───────────────────┐
       └───────────►│ Streaming Overlay │
       Realtime Push│ (HTML5/CSS3/SVG)  │
                    └───────────────────┘
```

* **Frontend Overlays**: Built with pure Vanilla JS, CSS3 transitions, and SVGs, ensuring clean layouts and high performance during live rendering.
* **Backend Services**: A Node.js Express server manages static resources, Twitch API/TMI.js connections, and YouTube Live Chat API interactions.
* **Real-time Synchronization**: Configured with **Supabase PostgreSQL and Realtime Subscriptions** to instantly broadcast timer states, tomato counts, locations, and tasks from Twitch chat to the OBS overlay window.
* **Image Automation**: An image pipeline written in Python utilizing PIL and DuckDuckGo search queries automates the retrieval and processing of medical reference pictures.
