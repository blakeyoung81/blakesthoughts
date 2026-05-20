---
title: "StepSync USMLE Study Synchronizer"
description: "A sophisticated study scheduling and synchronization dashboard that coordinates Anki cards, UWorld progress, and board prep schedules."
pubDate: "2025-08-10"
repo: "https://github.com/blakeyoung81/boardbuddy-workspace"
tech: ["Python", "SQLite", "AnkiConnect API", "React", "USMLE"]
cover: "/images/projects/step-sync-hero.png"
featured: true
category: "Medical Education"
color: "from-indigo-600 to-blue-500"
order: 15
---

# StepSync USMLE Study Synchronizer

StepSync is a powerful desktop companion and study orchestrator designed to resolve one of the most frustrating problems facing medical students: scheduling and coordinating board preparation materials across multiple siloed platforms. 

By integrating directly with Anki, tracking question bank progress, and modeling retention curves, StepSync automates the tedious task of study scheduling, letting students focus entirely on learning.

## The Problem

Preparing for USMLE Step 1 and Step 2 CK is a multi-month marathon. Students must juggle thousands of active Anki flashcards and thousands of practice questions from platforms like UWorld and Amboss. Traditionally, students manually coordinate these resources on spreadsheets—estimating how many new cards to unlock, matching flashcards to question topics, and guessing their actual board readiness.

## The Solution

StepSync bridges these platforms by creating a centralized database of study progress. Using Anki's local API and custom scrapers, StepSync aggregates card metrics (intervals, ease factors, lapse counts) and correlates them with question bank stats to generate an optimized, dynamic study calendar.

```
+-----------------------------------------------------------+
|                      StepSync Engine                      |
+-----------------------------------------------------------+
         |                                           |
         v                                           v
  [AnkiConnect API]                         [Q-Bank Scrapers]
  - Card intervals & logs                   - Incorrect tags
  - Deck structures                         - Category tracking
         \                                           /
          v                                         v
     +-------------------------------------------------+
     |            SQLite Synchronization DB            |
     +-------------------------------------------------+
                            |
                            v
     +-------------------------------------------------+
     |            Dynamic Scheduler & UI               |
     | - Predictive review calculator                  |
     | - Automatic card unlocks by Q-Bank topic        |
     +-------------------------------------------------+
```

## Key Architectural Pillars

### 1. Unified Progress Synchronization
Using the `AnkiConnect` API and direct SQLite queries to the local Anki database, StepSync maps study status across tags, decks, and sub-decks. It matches these card sets with specific USMLE sub-categories (e.g., Renal Pathology, Cardiology Physiology).

### 2. Predictive Review Calculator
Instead of relying on basic linear projections, StepSync builds a simulation of future Anki reviews based on the user's current card intervals and historical retention rate (using SuperMemo-derived algorithm intervals). It warns students if their upcoming review load will exceed their daily capacity.

### 3. Smart Unlock Automation
When a student finishes a test block in their question bank, StepSync analyzes the incorrect question categories and automatically unlocks relevant Anki flashcards. This eliminates the manual search-and-unlock workflow, targeting weak areas immediately.

## Impact & Results

StepSync transformed the board prep workflow from a guessing game into a data-driven science. By removing the administrative overhead of scheduling:
- Automated the unlocking of over **10,000+ board-relevant flashcards**.
- Predicted "review pileups" up to **2 weeks in advance**, allowing for preventative spacing.
- Provided students with precise, category-level heatmaps of their strongest and weakest organ systems.
