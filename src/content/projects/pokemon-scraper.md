---
title: "Pokémon Origin of Species Scraper"
description: "A custom Python scraper that parses daystareld.com to compile the rationalist fiction 'Pokémon: The Origin of Species' into clean reading formats."
pubDate: "2025-05-11"
repo: "https://github.com/blakeyoung81/PokemonOriginOfSpeciesScraper"
tech: ["Python", "BeautifulSoup", "HTML Parser", "E-Reader Formatting"]
cover: "/images/projects/pokemon-scraper-hero.png"
featured: true
category: "Utility"
color: "from-amber-600 to-red-500"
order: 22
---

# Pokémon Origin of Species Scraper

The Pokémon Origin of Species Scraper is an automated Python crawler designed to download, clean, and consolidate chapters of the famous web fiction *Pokémon: The Origin of Species* by Daystar Eld. The scraper crawls the author's blog, extracts text while filtering out widgets, navigation links, and formatting noise, and compiles them into a single, clean text file or E-Reader compatible ebook format.

## The Motivation

*Pokémon: The Origin of Species* is a highly popular work of "rationalist fiction" that applies scientific thinking, probability, and cognitive science concepts to the Pokémon universe. Because the chapters are published sequentially as blog entries on a WordPress-based website, reading the entire work on an e-reader (like a Kindle) normally requires visiting dozens of web pages manually or copying text into documents. 

This script automates the compiling process, converting the web novel into a distraction-free, offline-friendly e-book format.

```
+-----------------------------------------------------------+
|                   DaystarEld.com Page                     |
|  - Title: <h1 class="entry-title">                        |
|  - Story text: <div class="entry-content">                |
|  - Non-story: <div class="jp-relatedposts">               |
+-----------------------------------------------------------+
                             |
                   [BeautifulSoup Parser]
                             |
                             v
+-----------------------------------------------------------+
|                   Content Sanitizer Layer                 |
|  - Excludes social sharing widgets & author announcements |
|  - Strips matching chapter headings in body               |
|  - Formats paragraphs with double line-breaks             |
+-----------------------------------------------------------+
                             |
                             v
+-----------------------------------------------------------+
|                   File Consolidation Engine               |
|  - Enforces polite request delays (1s/request)            |
|  - Formats Chapter indexes and page titles                |
|  - Outputs sanitized UTF-8 text file                      |
+-----------------------------------------------------------+
```

## Key Technical Features

### 1. Granular DOM Filtering
Standard text crawlers pull all paragraph tags on a page, which leads to clutter like footer links, sidebar widgets, cookie banners, and sharing buttons. This scraper filters paragraph selections by examining parent nodes, explicitly omitting elements belonging to blacklisted WordPress class names (such as `navigation`, `mistape_caption`, `sharedaddy`, `jp-relatedposts`, and `wp-block-buttons`).

### 2. Polite Crawling Engine
To prevent overloading the author's web hosting server or triggering automated rate-limiting firewalls, the script implements a polite request cycle. It waits for a configured delay of one second between each chapter download and applies a strict connection timeout of 15 seconds to ensure the crawler fails gracefully in case of packet loss.

### 3. Smart Header Matching
In many chapters of the web fiction, the title is repeated both in the page's main `<h1>` header and inside the first paragraph tag of the body. The scraper compares body text strings with the page title, dropping identical duplicates to prevent double-rendering in the final document.

## How to Run

1. Make sure you have python installed along with dependencies:
   ```bash
   pip install requests beautifulsoup4
   ```
2. Run the scraper script:
   ```bash
   python scraper.py
   ```
The output will be saved as `pokemon_origin_of_species_chapters_1_to_140.txt` in your current working directory.
