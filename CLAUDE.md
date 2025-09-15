# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Incode Academy Website - A modern, futuristic website with a preloader entry page and interactive Python course showcase. Built with vanilla HTML, CSS, and JavaScript, featuring advanced 3D animations powered by Three.js and GSAP with ScrollTrigger.

## Commands

Since this is a vanilla HTML/CSS/JS project without a build system, there are no specific build commands. The project can be served using:

### Development
- Open `index.html` directly in a browser for development
- Use a local server like `python -m http.server` or `live-server` for better development experience with CORS support for Three.js
- No build process required - all files are served directly

## Architecture

### Project Structure
```
incode-website/
├── index.html              # Main HTML file with preloader and main website structure
├── style.css               # Complete stylesheet with futuristic design system
├── script.js               # Main JavaScript application with class-based architecture
├── advanced-logo.js        # Legacy file (not currently used in new structure)
└── assets/
    └── LogoInCode.png      # Logo image asset
```

### Key Technologies
- **Vanilla HTML5** - Semantic structure with preloader and main website sections
- **CSS3** - Custom properties, animations, 3D transforms, advanced gradients
- **Vanilla JavaScript (ES6+)** - Classes, modules, event handling
- **Three.js r128** - 3D graphics, particle systems, and background animations
- **GSAP 3.12.2** - Advanced animations, timelines, and transitions
- **ScrollTrigger** - Scroll-based animations and timeline progression
- **Google Fonts** - Inter, JetBrains Mono, and Orbitron font families

### Design System
- **Colors**: Dark futuristic theme with primary (#6366f1), secondary (#8b5cf6), cyan (#06b6d4), and pink (#ec4899)
- **Typography**: Inter for body text, JetBrains Mono for code elements, Orbitron for display text
- **Animations**: Complex 3D effects, card flips, scroll-triggered progressions, particle systems
- **Responsive**: Mobile-first approach with sophisticated breakpoints

### Website Structure

#### 1. Preloader (Entry Page)
- Interactive logo with click-to-enter functionality
- Animated background grid pattern
- Particle effects around logo on hover
- Futuristic transition animation to main website

#### 2. Main Website Sections
- **Hero Section**: "Domine Python com a Incode Academy" title with 3 pillars (Crie, Inove, Programe)
- **Course Card**: Interactive flip card for "Programação em Python" with front/back sides
- **Career Progression**: Scroll-triggered timeline showing student journey from course entry to job market
- **Footer**: Contact information including Instagram link

### Component Architecture

The website uses a single main class `IncodeWebsite` that manages all functionality:

#### Core Systems
- **Preloader Management**: Logo interactions, particle generation, transition animations
- **3D Background Scene**: Three.js particle systems and floating geometric elements
- **Course Card System**: Interactive flip functionality with 3D CSS transforms
- **Progression Animation**: ScrollTrigger-based timeline with dynamic path animation
- **Scroll Effects**: Parallax movement, element visibility, and progress tracking

#### Animation Patterns
- **Entry Animations**: Staggered element appearances after preloader transition
- **Hover Effects**: 3D transforms, scaling, and color transitions on interactive elements
- **Scroll Triggers**: Progressive timeline reveal and step-by-step career progression
- **Background Effects**: Continuous particle movement and floating element rotation
- **Card Interactions**: Smooth flip animations with visual feedback

### Key Features

#### Interactive Preloader
- Click-to-enter logo with hover effects
- Animated particle generation around logo
- Smooth transition with GSAP timeline
- Background grid animation

#### 3 Pillars Showcase
- "CRIE", "INOVE", "PROGRAME" with animated cards
- Hover effects with glow and transform animations
- Responsive grid layout

#### Course Card System
- Interactive flip card showing Python course
- Front: Course title and "Hard Skills & Soft Skills"
- Back: Placeholder for future content (duration, modules, certification)
- Smooth 3D CSS transform animations

#### Career Progression Timeline
- 5-step journey: Course Entry → Knowledge → Projects → Graduation → Job Market
- Scroll-triggered animations with staggered reveals
- Dynamic timeline path that grows with scroll progress
- Alternating left/right layout on desktop

### Performance Considerations
- Optimized Three.js rendering with efficient particle systems
- GSAP animations use hardware acceleration
- ScrollTrigger optimized for smooth performance
- Responsive design ensures good mobile performance
- Proper cleanup methods to prevent memory leaks

### Development Notes
- All animations are controlled through the main `IncodeWebsite` class
- ScrollTrigger plugin registration handled automatically
- Event listeners properly managed with cleanup methods
- Mobile-responsive timeline switches to single-column layout
- Debug access available through `window.incodeWebsite`

### Styling Conventions
- CSS custom properties for consistent theming across all elements
- Futuristic design with neon accents and glow effects
- Advanced CSS animations with keyframes for complex movements
- 3D CSS transforms for card flips and hover effects
- Gradient backgrounds and animated placeholder elements

### Content Structure
- Portuguese language content focused on Python programming education
- Hard skills and soft skills emphasis for job market preparation
- Career progression from student to professional
- Contact information with Instagram social media integration

### Hosting Considerations
- Designed for static hosting (Hostinger compatible)
- All dependencies loaded via CDN
- No server-side requirements
- Cross-browser compatibility with modern browsers