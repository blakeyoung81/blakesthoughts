---
title: "Ivy Tutoring"
description: "Premium tutoring services connecting students with top-tier educators for personalized learning experiences."
pubDate: "2024-03-12"
liveDemo: "https://ivytutoring.net"
url: "https://ivytutoring.net"
featured: true
category: "Education Platform"
tech: ["Next.js", "React", "Node.js", "PostgreSQL"]
cover: "/images/projects/ivy-tutoring-hero.png"
order: 4
---

# Ivy Tutoring

**Ivy Tutoring** is a custom-built digital tutor matching and administration system that connects students with expert, top-tier tutors.

---

## The Problem

Traditional tutoring agencies rely on manual matching, email coordination, and excel spreadsheets to pair students with tutors. This approach causes:
1. Significant delays between a student's request and scheduling their first session.
2. Inefficient schedule overlaps and calendar coordination issues.
3. Lack of a unified space where parents, students, and tutors can share homework files, session notes, and log hourly progress.

---

## The Solution: Automated Matchmaking & Administration

Ivy Tutoring automates matching and administrative workloads:
- **Tutor Matching Engine**: An algorithmic matching process that calculates compatibility scores based on subject specialty, student age, grade level, schedule availability, and price tier.
- **Unified Client-Tutor Portal**: A dashboard for students (and parents) to book sessions, download study resources, and view detailed tutor feedback.
- **Administrative Control Deck**: A command panel for agency admins to monitor matches, track billing histories, and manage tutor onboarding documents.

---

## Technical Architecture

The platform uses a classic decoupled Next.js web portal linked to a robust relational database:

```
┌────────────────────────────────────────────────────────┐
│                   Next.js Web Client                   │
├────────────────────────────────────────────────────────┤
│  Client Dashboards, Matching Forms, Scheduling Calendar│
└───────────────────────────┬────────────────────────────┘
                            │ API Request (OAuth/JSON)
                            ▼
┌────────────────────────────────────────────────────────┐
│                   Node.js API Server                   │
│  - Handles auth, matches tutors, and relays emails     │
└───────────────────────────┬────────────────────────────┘
                            │ SQL Queries
                            ▼
┌────────────────────────────────────────────────────────┐
│                  PostgreSQL Database                   │
│  - Relational tables: users, sessions, qualifications  │
└────────────────────────────────────────────────────────┘
```

### 🛠️ Stack & Architecture

- **Next.js & React**: Front-end framework supporting page routes and interactive client states.
- **Node.js Express Server**: Handles session booking calculations, payment relays, and matching logic.
- **PostgreSQL**: Stores relational tables representing student logs, tutor qualifications, session availability blocks, and billing invoices.
