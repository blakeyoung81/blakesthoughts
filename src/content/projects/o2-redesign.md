---
title: "O2 Student Portal Redesign"
description: "A complete visual and functional overhaul of the legacy OASIS student portal, featuring a modern glassmorphism UI, real-time search, and mobile responsiveness."
pubDate: "2025-12-16"
repo: "https://github.com/blakeyoung81/O2-Redesign"
tech: ["HTML5", "CSS3", "JavaScript", "Glassmorphism", "Responsive Design"]
cover: "/images/projects/o2-redesign-hero.png"
---

# O2 Student Portal Redesign

The **O2 Student Portal** (formerly OASIS) is a comprehensive redesign project aimed at modernizing the digital experience for medical students. The original system suffered from an outdated table-based layout, lack of mobile support, and clunky navigation. This redesign transforms it into a premium, user-centric application.

## ✨ Key Features

### Premium User Interface
- **Modern Aesthetic**: Replaced the 1990s-era design with a clean, "Glassmorphism" inspired UI using deep blues (`#0B1120`), crisp whites, and subtle shadows.
- **Typography**: Standardized on 'Plus Jakarta Sans' for optimal readability across devices.
- **Visual Hierarchy**: Clear separation of content using card-based layouts for schedules, notices, and academic stats.

### Enhanced Functionality
- **Dashboard**: A data-rich landing page displaying active courses, GPA/Credit stats, and urgent notices (e.g., "Requirement Checklist").
- **Smart Navigation**: A collapsible sidebar that works seamlessly on desktop and mobile, with instant access to Schedule, Advising, Catalog, Grades, and Evaluations.
- **Interactive Tools**:
    - **Real-time Search**: instantly filter the Course Catalog by course name or code.
    - **Tabbed Interfaces**: Easily switch between Pending and Completed evaluations.
    - **Quick Actions**: Direct access to "Reselect Year" and "Log Out".

### Mobile-First Responsiveness
- **Full Compatibility**: The interface adapts fluidly to tablets and smartphones.
- **Mobile Menu**: A floating toggle button ensures navigation is always accessible without cluttering the screen.

## 🛠️ Technical Implementation

The project was built using a "Clean Code" approach, removing all dependency on legacy libraries like Prototype and Scriptaculous.

- **Stack**: Pure HTML5, Vanilla CSS3 (Custom Properties/Variables), and Vanilla JavaScript.
- **Architecture**: Separated concerns with a centralized `style.css` for the design system and `main.js` for interaction logic.
- **Performance**: Optimized asset loading and removed blocking legacy scripts, resulting in instant page loads.

## 🚀 Live Demo

You can explore the live deployment of the prototype here:
[**View Live Demo**](https://o2-redesign-kb57hceqk-blakeyoung81s-projects.vercel.app/OASIS2.html)
