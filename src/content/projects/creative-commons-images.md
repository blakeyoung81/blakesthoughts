---
title: "CC Medical Image Harvester"
description: "A Python automation tool querying the Wikimedia Commons API to search, download, and catalog Creative Commons pathology and musculoskeletal illustrations."
pubDate: "2025-12-17"
repo: "https://github.com/blakeyoung81/creative-commons-images-maker"
tech: ["Python", "Wikimedia API", "Image Processing", "JSON Scraper"]
cover: "/images/projects/creative-commons-images-hero.png"
featured: false
category: "Medical Education"
color: "from-rose-600 to-pink-500"
order: 26
---

# CC Medical Image Harvester

The CC Medical Image Harvester is a Python automation tool developed to help medical educators, students, and content creators safely acquire media assets for study flashcards and test question databases. By querying the Wikimedia Commons API, the script searches for, filters, and downloads high-quality, Creative Commons-licensed medical diagrams, anatomy drawings, and pathology slides.

## The Problem

When creating educational materials for medical exams (like USMLE, MCAT, or anatomy tests), visual context is crucial. For example, questions about renal pathology are much clearer when accompanied by a high-resolution slide of glomeruli. 

However, searching search engines for medical images is risky:
- Many images are copyrighted, making them illegal to use in public decks or commercial courses.
- Finding specific categories (such as "musculoskeletal" or "neurology") requires digging through unorganized search returns.
- Tracking proper attribution (the author, license, and source link) manually for hundreds of files is extremely tedious.

## The Solution

The Harvester acts as a command-line interface (CLI) that automates the entire process: querying the Wikimedia Commons API with specific medical terms, verifying the Creative Commons licensing parameters, downloading the high-resolution files, and auto-generating an attribution catalog in JSON or Markdown format.

```
+-----------------------------------------------------------+
|                   Harvester CLI Query                     |
|  - Topic: e.g., "Glomerulonephritis" or "Carpal Tunnel"   |
|  - Category filter: "Anatomy", "Pathology"                |
+-----------------------------------------------------------+
                             |
                [Wikimedia Commons API Interface]
                             |
                             v
+-----------------------------------------------------------+
|                   License & Quality Filter                |
|  - Verifies CC status (e.g. CC-BY, CC-BY-SA, CC0)         |
|  - Filters minimum resolution (e.g. 1024x768 px)           |
+-----------------------------------------------------------+
                             |
                             v
+-----------------------------------------------------------+
|                     Local Asset Catalog                   |
|  - Downloads image to structured folders (/neurology, etc) |
|  - Saves metadata.json (Attribution, License, Page URL)    |
+-----------------------------------------------------------+
```

## Core Functions

### 1. Wikimedia API Search Gateway
The script queries the MediaWiki action API using search strings and category parameters. It requests metadata returns containing:
- File URLs and image resolutions.
- Detailed file descriptions and categorizations.
- Exact license templates associated with the files.

### 2. Strict License Validation
The harvester parses file license fields, explicitly rejecting files with restrictive licenses while permitting those that allow redistribution and adaptation (such as CC0, CC-BY, and CC-BY-SA).

### 3. Automatic Attribution Captions
To ensure legal compliance, the script automatically formats attribution strings. It compiles the photographer/creator's name, source link, and license type into a caption that can be directly pasted underneath the image in flashcard software or slides.

## Tech Details

- **Language**: Python 3.
- **Libraries**: `requests` (for REST API calls), `json` (for cataloging), and `pathlib` (for file organization).
