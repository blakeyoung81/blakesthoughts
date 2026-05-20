---
title: "BlakeHuman - Automation Humanizer"
description: "A specialized browser extension implementing mathematical models for realistic mouse movements, typing patterns, and reading delays."
pubDate: "2025-05-15"
repo: "https://github.com/blakeyoung81/Facebook_Marketplace_Repost"
tech: ["JavaScript", "Bezier Math", "Chrome Extensions API", "DOM Automation"]
cover: "/images/projects/blake-human-hero.png"
featured: false
category: "Utility"
color: "from-emerald-500 to-green-600"
order: 17
---

# BlakeHuman - Automation Humanizer

BlakeHuman is an advanced browser utility designed to solve a major challenge in testing and browser automation: the immediate detection of automated scripts by bot-mitigation services (such as Cloudflare, Akamai, or Datadome). 

By replacing instant programmatic clicks and inputs with mathematically modeled human behaviors, BlakeHuman enables seamless integration tests and automated browser tasks.

## The Challenge

Modern websites use advanced telemetry scripts to record mouse coordinate paths, mouse speed, keyboard key-up/key-down durations, and window scrolling accelerations. Standard Selenium or Puppeteer scripts trigger immediate red flags because their inputs are mathematically perfect:
- Clicks occur exactly at the center coordinates of buttons.
- Mouse cursors move in straight lines with uniform speed.
- Typing speed is perfectly constant (e.g., exactly 50ms per keypress).
- Window scroll positions jump instantaneously.

## The Solution

BlakeHuman wraps web page interactions in an emulator layer that injects micro-jitters, natural curves, and variable timing into all inputs.

```
+-----------------------------------------------------------+
|                   BlakeHuman Simulator                    |
+-----------------------------------------------------------+
         |                                           |
         v                                           v
  [Mouse Controller]                        [Keyboard Controller]
  - Bezier curve motion                     - Gaussian delay models
  - Target coordinate offset                - Key-up/down micro-jitter
         \                                           /
          v                                         v
     +-------------------------------------------------+
     |             Browser Telemetry Interface         |
     |  - Realistic scroll accelerations               |
     |  - Random pauses & reading rhythm               |
     +-------------------------------------------------+
```

## Key Capabilities

### 1. Bezier Curve Mouse Interceptions
Rather than moving a mouse cursor from point A to point B in a straight line, BlakeHuman uses cubic Bezier curves. The control points of the curves are randomly offset using a normal distribution, creating natural arcs. The speed of the cursor follows a bell curve (accelerating out of point A and decelerating as it approaches point B), mimicking physical human muscle movement.

### 2. Gaussian Keyboard Delays
When typing text, the engine calculates variable keypress durations. It models typing speed using a Gaussian distribution, with additional lag introduced for complex characters, capital letters (requiring Shift), and randomized mistakes that are immediately backspaced and corrected.

### 3. Coordinate Offsetting
Human users rarely click the exact center pixel of a button. BlakeHuman implements a bivariate normal distribution to scatter clicks across a button's surface area, clustering near the center but realistically spreading out to the edges.

### 4. Reading Rhythms & Page Pauses
To replicate human reading, BlakeHuman analyzes the text volume of a page and introduces scrolling pauses. It scrolls dynamically, speeding up through images and slowing down when encountering text blocks, simulating active engagement.

## Use Cases

BlakeHuman is utilized in a variety of automated testing environments, scraping pipelines, and browser macros where native human verification makes standard tools unusable.
