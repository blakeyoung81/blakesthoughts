---
title: "Image Finder & Definer"
description: "View images and definitions related to highlighted text. Generates an image and defines whatever you highlight or right click and ask it to. Very clean extension."
pubDate: "2024-06-15"
liveDemo: "https://chromewebstore.google.com/detail/image-finder/ivytutoring.net"
url: "https://chromewebstore.google.com/detail/image-finder/ivytutoring.net"
featured: true
category: "Chrome Extension"
tech: ["Chrome Extension", "JavaScript", "OpenAI API", "Education"]
cover: "https://lh3.googleusercontent.com/VJcOZYMPjyt_VRWYe9K6-m1cCTMA5ajDyLupYEsDuDt9gjoBwmOKJwwo9UF5gfbf357ePgJGi1IAv58vNSE_kQFp6A=s1280-w1280-h800"
order: 11
---

# Image Finder & Definer

**Image Finder & Definer** is an educational Chrome utility that helps users learn new vocabulary and study complex texts by dynamically retrieving visual definitions and context on highlight.

## 🔍 Extension Capabilities

- **Context Menu Lookup**: Highlight any word or sentence, right-click, and retrieve instant text definitions and context-relevant images.
- **AI Image Generation**: Leverages text-to-image pipelines to generate contextual visuals for rare, abstract, or highly specialized medical terminology.
- **Smart Storing**: Saves searched definitions and words to a personal study dictionary for flashcard-like review.

## 🛠️ Stack & Architecture

- **Chrome Extension APIs**: Leverages service workers and contextMenus APIs to intercept highlight actions.
- **OpenAI API (GPT & DALL-E)**: Drives definition parsing and custom illustration rendering.
- **HTML5 & CSS3 Overlay Panels**: Injects neat, glassmorphism modal widgets on the active page without disrupting native page layouts.
