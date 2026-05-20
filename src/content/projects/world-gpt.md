---
title: "UWorld GPT - AI Clinical Assistant"
description: "A specialized Chrome extension that overlays medical board questions with real-time AI clinical reasoning and interactive study guides."
pubDate: "2025-06-20"
repo: "https://github.com/blakeyoung81/InteractiveUWORLD"
tech: ["JavaScript", "Chrome Extensions API", "OpenAI API", "CSS Grid", "JSON Schema"]
cover: "/images/projects/world-gpt-hero.png"
featured: true
category: "Chrome Extension"
color: "from-teal-500 to-emerald-600"
order: 16
---

# UWorld GPT - AI Clinical Assistant

UWorld GPT is a premium productivity Chrome extension built to supercharge the study process for medical students preparing for licensing exams. By injecting an AI assistant overlay directly into the board review interface, the extension analyzes medical vignettes in real-time, offering instant diagnostic trees, clinical reasoning critiques, and reference lookups.

## The Concept

Medical board questions (vignettes) are complex puzzles containing distractors, secondary clues, and multi-step diagnostic paths. Often, when a student gets a question wrong, the standard answer explanation is lengthy and difficult to navigate. 

UWorld GPT acts as an on-demand clinical tutor, immediately summarizing the patient presentation, explaining why specific distractors are incorrect, and suggesting mnemonics.

```
+-----------------------------------------------------------+
|                  UWorld Board Interface                   |
|  [Clinical Vignette Text...]                              |
|  (A) Choice A   (B) Choice B                              |
+-----------------------------------------------------------+
                       |
               [DOM Parser Engine]
                       |
                       v
         +---------------------------+
         |    Isolated Chrome runtime|
         |  - Structured Vignette    |
         |  - Option parsing         |
         +---------------------------+
                       |
               [Secure Proxy API]
                       | (System Prompts & Schema)
                       v
            +---------------------+
            |   OpenAI / Claude   |
            +---------------------+
                       |
               [JSON Response]
                       |
                       v
+-----------------------------------------------------------+
|               UWorld GPT Floating Panel                   |
|  * High-Yield Clinical Summary                             |
|  * Differential Diagnosis Chart                           |
|  * Distractor Excluder                                    |
+-----------------------------------------------------------+
```

## Technical Breakdown

### 1. Robust DOM Scraping & Parsing
Because medical testing websites employ highly interactive interfaces and active session monitoring, traditional scraper tools trigger security alarms. UWorld GPT uses a lightweight, client-side observer script that listens for text selection and question container updates. It parses the vignette text and multiple-choice answers using strict regular expressions and class selectors without triggering page security rules.

### 2. Structured AI Schema & System Prompting
The extension communicates with LLMs using strict JSON Schemas to guarantee structured, predictable formats. The custom system prompt instructs the AI to behave as an elite residency director, structuring its analysis into:
* **The Patient Profile**: Age, sex, chief complaint, key vitals, and lab abnormalities.
* **The Clinical Climax**: The core question being asked (e.g., mechanism of action, first-line drug).
* **The Differential Grid**: A table explaining what diseases are in play.
* **The "Why You Got This Wrong" Guide**: Tailored feedback based on the user's selected choice.

### 3. Sleek Floating UI Overlay
Designed to feel like a native feature of the study platform, the extension injects a glassmorphic sidebar. Built with modern CSS Grid and custom variables, it animates smoothly when a keyboard shortcut is pressed, blending into the existing dark or light theme.

## Future Plans

Planned features include linking the generated explanations directly to the student's personal Anki database, letting them instantly search for or create new flashcards based on the question they are currently reviewing.
