---
title: "PokéAI Reenactor & Tactics Engine"
description: "A live in-game AI tactical assistant Chrome extension and automated Python video synthesis pipeline for Pokémon Showdown battles."
pubDate: "2026-03-15"
repo: "https://github.com/blakeyoung81/Pokemon_AI_Reenactor"
tech: ["FastAPI", "Python", "Chrome Extension", "TypeScript", "Minimax", "@pkmn/engine", "Remotion", "ElevenLabs", "Gemini API"]
cover: "/images/projects/pokemon-ai-hero.png"
featured: true
category: "AI / Chrome Extension"
color: "from-cyan-500 to-blue-600"
order: 11
---

# PokéAI Reenactor & Tactics Engine

PokéAI is a dual-system project designed to assist Pokémon Showdown players with live in-game AI calculations and to automatically synthesize post-battle explainer videos. The codebase features a TypeScript-based Chrome Extension client that hooks into live play/replay pages, a FastAPI backend server hosting minimax heuristic calculations, and an automated multi-stage rendering pipeline that outputs fully compiled tactical breakdowns.

---

## Technical Architecture

The PokéAI system partitions heavy heuristic calculation and rendering routines to a local backend, maintaining a light, responsive overlay client in the browser:

```
┌──────────────────────────────────────┐
│       Showdown Web Interface         │
│  (play/replay.pokemonshowdown.com)   │
└──────────────────┬───────────────────┘
                   │
                   │ Scrapes Battle Log & Calcdex
                   ▼
┌──────────────────────────────────────┐
│       PokeAI Chrome Extension        │
│   (TypeScript Content Scripts, UI)   │
└──────────────────┬───────────────────┘
                   │
                   │ JSON Payloads (Port 5030)
                   ▼
┌──────────────────────────────────────┐
│        FastAPI Python Server         │
└──────┬────────────────────────┬──────┘
       │                        │
       │ Predicts Move          │ Triggers Reenactment
       ▼                        ▼
┌──────────────┐        ┌────────────────────────┐
│  Tactics AI  │        │   Video Pipeline       │
│  (Minimax &  │        │   (run_pokemon.py)     │
│  ps-ppo RL)  │        └───────────┬────────────┘
└──────────────┘                    │
                                    │ Generates Assets
                                    ▼
                        ┌────────────────────────┐
                        │ - Narration (Eleven)   │
                        │ - Visuals (Gemini)     │
                        │ - Presenter (Wavespeed)│
                        │ - Clips (Kling 3.0)    │
                        └───────────┬────────────┘
                                    │
                                    │ Composes Video
                                    ▼
                        ┌────────────────────────┐
                        │   FFmpeg / Remotion    │
                        │  (1920x1080 MP4 video) │
                        └────────────────────────┘
```

---

## Key Core Features

### 🎮 1. Live AI Tactical Overlay (Chrome Extension)
* **Real-time DOM scraping**: Dynamically extracts active Battle Logs and the opponent's team composition directly from the Pokémon Showdown browser view.
* **Calcdex Integration**: Hooking into Showdex/Calcdex calculations, it gathers live damage percentages (expected minimum and maximum ranges) for every active move.
* **Sleek HUD Overlay**: Renders a glassmorphic dashboard overlay showing:
  - Estimated win probability trends.
  - Recommended active play (e.g., `"Best active play: Giga Drain for up to 36.3%"`).
  - Swapping recommendations to avoid critical opponent threats.

### 🧠 2. Tactics Heuristic & Predictive Engine
* **Minimax-Style Lookahead**: Runs chess-engine-style predictive lines based on Calcdex outputs, mapping out counter-switches and expected damage.
* **Simulation-Driven AI**: Interfaces with the `@pkmn/engine` Pokémon Showdown simulator to execute turns ahead of time.
* **ps-ppo Transformer**: Designed to feed turn history into a pre-trained Transformer network (utilizing proximal policy optimization) to forecast opponent choices.

### 🎬 3. Automated Battle Reenactment Pipeline
* **Turn-by-Turn Scripting**: The Python script parses replay logs and automatically writes a structured educational script complete with visual cues (e.g., `[MODE: overlay] [VISUAL: Metagross uses Meteor Mash]`).
* **Parallel Media Generation**:
  - **Narrator Voice**: ElevenLabs TTS synthesizes natural explainer commentary.
  - **Thematic Visuals**: Gemini Pro renders high-fidelity custom battle/pokemon illustrations.
  - **Presenter Avatar**: Wavespeed InfiniteTalk animates a lip-synced talking head avatar using the narrator audio.
  - **Scene Motion**: Kling 3.0 adds cinematic motion effects to static illustrations.
* **Multi-Composer Render**: Renders final explainer videos to MP4 using either a Python-native FFmpeg layer or a frame-accurate, CSS-styled Remotion timeline.
