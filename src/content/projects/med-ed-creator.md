---
title: "Medical Education Content Ecosystem"
description: "A medical education content ecosystem reaching over 10k followers on Instagram and 5k subscribers on YouTube. Educates the next generation of medical students with high-yield study resources, video explainers, and interactive med-tech streaming overlays."
pubDate: "2026-05-19"
liveDemo: "https://instagram.com/blakeoncall"
url: "https://instagram.com/blakeoncall"
featured: true
category: "Medical Ed-Tech / Content"
tech: ["Content Creation", "Video Production", "Community Building", "Medical Education"]
cover: "/images/projects/med-ed-creator-hero.png"
order: 8
---

# Medical Education Content Ecosystem

Through active content creation, Blake's medical education ecosystem has built a dedicated community of aspiring healthcare professionals and medical students, reaching **10,000+ followers on Instagram** and **5,000+ subscribers on YouTube**.

---

## The Problem

Preclinical medical education is notoriously dense. Traditional textbooks (like First Aid or Robbins Pathology) present lists of information that are hard to retain during prolonged study sessions. High-yield concept explainers are often hidden behind expensive school course portals. Students benefit significantly from:
1. Short-form, micro-learning video explainers.
2. Dynamic visual graphics illustrating disease pathways.
3. Co-studying spaces to stay accountable.

---

## The Solution: A Cross-Platform Micro-Learning Network

This content ecosystem resolves this by delivering free, high-yield clinical education:
- **Micro-Video Explainers (Instagram Reels)**: Focused, 60-second reviews covering high-yield USMLE Step 1 topics, diagnostic loops, and mnemonic maps.
- **System-Based Reviews (YouTube)**: In-depth breakdowns of complex physiology systems (e.g. renal physiology, cardiology murmurs).
- **Interactive Live Study Sessions (Twitch)**: Uses the **BoardBuddy** platform to overlay real-time Pomodoro timers, collaborative tomato gardens, and live AI tutor Q&A to gamify study streams.

---

## Content Production Workflow

The content pipeline utilizes standard professional software and custom automated tools to speed up editing:

```
┌────────────────────────────────────────────────────────┐
│                  Concept & Scripting                   │
├────────────────────────────────────────────────────────┤
│  Extract high-yield topics from USMLE Step 1 lists     │
└───────────────────────────┬────────────────────────────┘
                            │ Script Draft
                            ▼
┌────────────────────────────────────────────────────────┐
│                   Recording & Assets                   │
│  - Raw video capture (Mirrorless Camera + Mic)         │
│  - Automated B-Roll generation using Python scripts     │
└───────────────────────────┬────────────────────────────┘
                            │ Raw Assets
                            ▼
┌────────────────────────────────────────────────────────┐
│                Post-Production (Editing)               │
│  - Adobe Premiere: Cuts, transcript overlay, animations│
│  - Photoshop / Figma: High-contrast title thumbnails   │
└───────────────────────────┬────────────────────────────┘
                            │ Final Export
                            ▼
┌────────────────────────────────────────────────────────┐
│                  Distribution Core                     │
│  - YouTube: Long-form conceptual system reviews        │
│  - Instagram: Micro-learning Reels & Story Q&As        │
│  - Twitch: Interactive, bot-guided study streams       │
└────────────────────────────────────────────────────────┘
```

### 🛠️ Production Stack

- **Editing & Design**: Adobe Premiere Pro for short-form pacing and transcription, After Effects for kinetic text animations, and Figma/Photoshop for clean graphic assets.
- **Stream Overlay Integrations**: OBS Studio connected via WebSockets to Node.js backend controllers to sync study timers and viewer leaderboards.
- **Asset Automation**: Automated pipelines that call image generation APIs to render anatomical structures.
