---
title: "Globe Proof"
description: "A stunning, interactive 3D visualization of planet Earth, featuring realistic atmospheric rendering, cloud layers, and smooth orbital controls. Built to demonstrate high-performance WebGL capabilities."
pubDate: "2026-01-02"
liveDemo: "https://globe-proof.vercel.app/earth"
tech: ["Three.js", "React Three Fiber", "WebGL", "Interactive 3D"]
cover: "/images/projects/globe-proof-hero.png"
featured: true
category: "Interactive 3D"
color: "from-blue-600 to-indigo-500"
order: 1
---

# Globe Proof

**Globe Proof** is an immersive 3D Earth visualization project that pushes the boundaries of web-based graphics. It provides a realistic, physically based model of our planet rendered in real-time directly inside the web browser.

---

## The Problem

Traditional web-based maps (like Google Maps or Mapbox) are either flat 2D maps that distort geographic proportions or are computationally expensive 3D globes that suffer from slow frame rates, flat textures, and unrealistic lighting. Creating a smooth, high-fidelity 3D globe that runs at **60 FPS** on both mobile devices and high-end desktops requires fine-tuned WebGL shader optimization and asset loading strategies.

---

## The Solution: Physically Based WebGL Rendering

Globe Proof implements a modular 3D pipeline that balances visual authenticity with lightweight GPU compute:
- **Atmospheric Rayleigh Scattering**: Uses custom GLSL shaders to render a realistic blue-to-violet atmospheric halo. The halo's brightness and angle scale dynamically based on the Sun's position vector relative to the camera.
- **Multi-Texture Material Composition**:
  - **Color Map**: High-resolution landmass mapping showing true colors.
  - **Specular Map**: Dynamically reflects sunlight off the ocean surfaces while maintaining matte reflections on land.
  - **Normal Map**: Adds realistic physical shadows to mountain ranges and valleys.
- **Decoupled Cloud Dynamics**: Renders a separate cloud mesh orbiting slightly above the Earth's surface with its own rotational speed vector.

---

## Technical Architecture

The application is structured around a declarative 3D layout using React Three Fiber:

```
┌────────────────────────────────────────────────────────┐
│                   React Application                    │
├────────────────────────────────────────────────────────┤
│  Canvas Wrapper & Lighting Setup                       │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Three.js Group (Earth Sphere + Clouds Sphere)    │  │
│  │ - Custom GLSL Shader (Rayleigh Scattering)       │  │
│  │ - Specular/Normal Materials Mapping              │  │
│  └────────────────────────▲─────────────────────────┘  │
└───────────────────────────┼────────────────────────────┘
                            │ OrbitControls (Rot/Zoom)
                            ▼
┌────────────────────────────────────────────────────────┐
│                 GPU Shader Pipelines                   │
│  - GLSL Vertex Shader: Calculates scattering vectors   │
│  - GLSL Fragment Shader: Blends atmospheric gradient    │
└────────────────────────────────────────────────────────┘
```

### 🛠️ Tech Stack & Shaders

- **Three.js & React Three Fiber (R3F)**: Enables component-driven 3D scene construction with automatic lifecycle management of materials and geometries.
- **Custom GLSL (OpenGL Shading Language)**: Written directly to compute vertex positions and fragment colors for the atmospheric glow, yielding maximum performance by using raw GPU calculations.
- **OrbitControls**: Provides inertia-based pan, zoom, and rotation controls for a tactile user experience.
