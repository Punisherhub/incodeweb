# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Incode Academy Website - A modern, futuristic website with a preloader entry page and interactive Python course showcase. Built with vanilla HTML, CSS, and JavaScript, featuring advanced 3D animations powered by Three.js and GSAP with ScrollTrigger.

## Commands

Since this is a vanilla HTML/CSS/JS project without a build system, there are no specific build commands. The project can be served using:

### Development
- Open `index.html` directly in a browser for development
- Use a local server like `python -m http.server 8000` or `live-server` for better development experience with CORS support for Three.js
- For quick testing: `python -m http.server 8000` then visit `http://localhost:8000`
- No build process required - all files are served directly

### Testing
- Manual testing by opening the website in multiple browsers (Chrome, Firefox, Safari, Edge)
- Test responsive design using browser dev tools device emulation
- Verify 3D animations and interactions work properly
- Check console for any JavaScript errors

## Architecture

### Project Structure
```
incode/
├── index.html              # Main HTML file with preloader and main website structure
├── style.css               # Complete stylesheet with futuristic design system
├── script.js               # Main JavaScript application with class-based architecture
└── assets/
    └── LogoInCode.png      # Logo image asset (444KB PNG)
```

### File Dependencies and Loading Order
1. **HTML Structure**: `index.html` contains all markup for both preloader and main website
2. **External CDN Dependencies** (loaded in head):
   - Three.js r128 for 3D graphics
   - GSAP 3.12.2 for animations
   - ScrollTrigger plugin for scroll-based animations
   - Google Fonts: Inter, JetBrains Mono, Orbitron
3. **Local Files** (loaded in order):
   - `style.css` - Complete stylesheet with CSS custom properties
   - `script.js` - Main application logic in single IncodeWebsite class

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

The website uses a single main class `IncodeWebsite` in `script.js:2-530` that manages all functionality:

#### Core Systems (JavaScript Methods)
- **Preloader Management** (`initPreloader:40-61`): Logo interactions, particle generation, transition animations
- **3D Background Scene** (`initBackgroundScene:197-224`): Three.js particle systems with 80 floating particles
- **Course Card System** (`initCourseCard:261-298`): Interactive flip functionality with 3D CSS transforms
- **Progression Animation** (`initProgressionAnimation:388-421`): ScrollTrigger-based timeline with dynamic path animation
- **Scroll Effects** (`onScroll:491-512`): Parallax movement, element visibility, and progress tracking

#### Key Implementation Details
- **Initialization Flow**: DOM ready → initializeComponents → preloader → main website transition
- **Animation Performance**: Uses `requestAnimationFrame` for 3D particle animation loop
- **Memory Management**: Proper cleanup methods (`destroy:518-529`) to prevent memory leaks
- **Error Handling**: Try-catch blocks around Three.js operations with fallback warnings

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
- ScrollTrigger plugin registration handled automatically (`initScrollTrigger:384-386`)
- Event listeners properly managed with cleanup methods in `destroy()` method
- Mobile-responsive timeline switches to single-column layout via CSS media queries
- Debug access available through `window.incodeWebsite` (set at `script.js:540`)
- Console logging throughout for debugging: uses emoji prefixes (🚀, ✅, ❌, ⚠️)

### CSS Architecture
- **CSS Custom Properties**: All colors, fonts, and gradients defined in `:root` for consistent theming
- **Design Tokens**: Incode brand colors (`--incode-primary: #00D4AA`, `--incode-secondary: #8B5CF6`)
- **Responsive Breakpoints**: Mobile-first approach with breakpoints at 768px and 480px
- **Animation System**: Keyframe animations for floating, pulsing, shimmering effects
- **Performance**: Hardware-accelerated transforms and optimized CSS animations

### Styling Conventions
- CSS custom properties for consistent theming across all elements
- Futuristic design with neon accents and glow effects
- Advanced CSS animations with keyframes for complex movements
- 3D CSS transforms for card flips and hover effects
- Gradient backgrounds and animated placeholder elements

### Content Structure
- **Language**: Portuguese (pt-BR) language content focused on Python programming education
- **Educational Focus**: Hard skills and soft skills emphasis for job market preparation
- **Career Journey**: 5-step progression from course entry to job market
- **Social Media**: Instagram integration (@incodeacademy) for course enrollment
- **Contact Info**: Email (contato@incodeacademy.com) and phone placeholder content

### Browser Support and Performance
- **Modern Browser Requirements**: Requires ES6+ support for classes, arrow functions
- **3D Graphics**: Requires WebGL support for Three.js particle systems
- **Fallback Handling**: Graceful degradation when 3D features fail
- **Performance Optimizations**:
  - Reduced particle count (80 particles) for mobile performance
  - Hardware-accelerated CSS transforms
  - Efficient ScrollTrigger usage with minimal reflows

### Hosting Considerations
- **Static Hosting Ready**: Designed for static hosting (Hostinger compatible)
- **CDN Dependencies**: All external dependencies loaded via CDN (no npm/build process)
- **No Server Requirements**: Pure client-side application
- **CORS Considerations**: Local server needed for development due to Three.js texture loading