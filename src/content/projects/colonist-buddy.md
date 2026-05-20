---
title: "Colonist Buddy"
description: "Track dice rolls, resource counts, and game statistics while playing Catan on Colonist.io. Enhance your gameplay with real-time analytics and insights."
pubDate: "2024-11-05"
liveDemo: "https://chromewebstore.google.com/detail/colonist-buddy/mkbpkhkcggpopakinkdcbigocdjjbogp"
url: "https://chromewebstore.google.com/detail/colonist-buddy/mkbpkhkcggpopakinkdcbigocdjjbogp"
featured: true
category: "Chrome Extension"
tech: ["Chrome Extension", "JavaScript", "Catan", "Game Analytics"]
cover: "/images/projects/colonist-buddy-hero.png"
order: 10
---

# Colonist Buddy

**Colonist Buddy** is a specialized companion utility Chrome extension built for players of Catan on Colonist.io. It captures real-time gameplay metrics and dice distributions to help players optimize their strategies.

---

## The Problem

In high-level competitive Catan matches, tracking the exact flow of resource cards and analyzing statistical dice deviations is crucial for winning. Players need to keep mental tabs on:
1. What resources each opponent is holding after trades and steals.
2. How far the actual dice roll distribution is deviating from the theoretical normal distribution (the bell curve) to adjust building plans.
3. Historical log patterns of player behaviors and trades.

Keeping track of this mentally while plotting moves is extremely taxing and prone to errors.

---

## The Solution: Real-Time DOM Scraper & Analytics

Colonist Buddy acts as a non-intrusive assistant that:
- Automatically tracks and logs every dice roll.
- Computes real-time resource tallies for each player based on board settlements, card generation, trades, and steals.
- Evaluates dice roll distributions and overlays them onto a mathematical bell curve using Canvas/Chart.js.
- Saves historical game logs for post-game performance analysis.

---

## Technical Architecture

Colonist Buddy is built using a modern, lightweight Manifest V3 architecture that parses Colonist.io interface updates on the fly:

```
┌────────────────────────────────────────────────────────┐
│                      Colonist.io                       │
└───────────────────────────┬────────────────────────────┘
                            │ Mutates DOM
                            ▼
┌────────────────────────────────────────────────────────┐
│             Injected Content Script (DOM)              │
│  - MutationObserver watches chat logs and card changes │
└───────────────────────────┬────────────────────────────┘
                            │ Send Message (JSON)
                            ▼
┌────────────────────────────────────────────────────────┐
│             Background Service Worker (MV3)            │
│  - Tracks game state, logs rolls, and resource metrics  │
└───────────────────────────┬────────────────────────────┘
                            │ Syncs Realtime Data
                            ▼
┌────────────────────────────────────────────────────────┐
│                    Extension Popup UI                  │
│  - Displays Canvas-based Chart.js bell curves         │
│  - Lists active opponent resource card counts          │
└────────────────────────────────────────────────────────┘
```

### 🛠️ Stack & Architecture

- **Manifest V3 Extensions Architecture**: Fully compliant with modern Chrome security standards.
- **Vanilla JavaScript & Content Scripts**: Uses high-performance `MutationObserver` APIs to monitor game chat text strings without introducing lag or game loop interference.
- **Chart.js / HTML5 Canvas**: Renders smooth, interactive overlays illustrating active dice roll counts compared to ideal probability curves.
