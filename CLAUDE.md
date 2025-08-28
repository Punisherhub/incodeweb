# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Incode Academy landing page - a modern, interactive website for a programming education platform. The site features advanced 3D graphics, interactive animations, and a sophisticated visual design focused on showcasing Python programming education for high school and technical students.

## Architecture & Technologies

### Core Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript ES6+
- **3D Graphics**: Three.js for interactive logos and particle systems
- **Animation**: GSAP for smooth transitions and scroll-triggered animations
- **Styling**: CSS custom properties with dark theme and neon color palette

### Key Components

1. **Advanced Interactive Logo System** (`advanced-logo.js`)
   - 3D fragmenting logo inspired by Soul.io design
   - Mouse-controlled particle disintegration and reassembly
   - 500+ ambient particles with physics simulation
   - Lighting system with dynamic color changes

2. **Main Website Controller** (`script.js`)
   - Central `IncodeWebsite` class managing all 3D scenes
   - Background particle system with 2000+ particles
   - Section-specific 3D containers for different page areas
   - Advanced mouse interactions and scroll animations

3. **Visual Design System** (`style.css`)
   - Custom cursor system with hover states
   - CSS custom properties for brand colors (Purple #6366f1, Violet #8b5cf6, Cyan #00d4ff)
   - Advanced loading screen with animated progress
   - Responsive design with mobile navigation

### Site Structure
- **Hero**: Interactive 3D logo with fragmentation effects
- **About**: Brand mission and values with 3D visuals
- **Course**: Python curriculum details with interactive elements
- **Differentials**: Feature grid highlighting academy benefits
- **Journey**: Timeline showcasing learning progression
- **Contact**: Form with interactive styling and 3D background

## Development Commands

### Local Development
- **Serve locally**: Use XAMPP or any local server pointing to the project root
- **Access**: Navigate to `http://localhost/incode` (if using XAMPP in htdocs)

### Browser Testing
- **Chrome DevTools**: Essential for Three.js debugging and performance monitoring
- **Responsive Testing**: Site is optimized for desktop, tablet, and mobile viewports

## Key Technical Details

### 3D Scene Management
- Each major section has its own Three.js scene managed by the main controller
- Scenes are initialized lazily to improve performance
- Particle systems use BufferGeometry for optimal rendering

### Animation Architecture
- GSAP ScrollTrigger for section-based animations
- Three.js animation loop for continuous 3D rendering
- Custom easing functions for premium feel interactions

### Performance Considerations
- Particle count varies by device capability
- Renderer pixel ratio adjusts to device specs
- Animation frame throttling for smooth 60fps performance

### Color System
Brand colors derived from the Incode logo:
- Primary: `#6366f1` (Purple)
- Secondary: `#8b5cf6` (Violet) 
- Accent: `#f59e0b` (Amber)
- Background: `#0f0f23` (Dark)

### Interactive Features
- Logo fragmentation controlled by mouse proximity
- Custom cursor with state changes
- Magnetic card effects following mouse movement
- Dynamic lighting responding to user interaction

## File Dependencies

- `advanced-logo.js` must load before main script
- Three.js CDN required for all 3D functionality
- GSAP CDN for animations
- Google Fonts (Inter, JetBrains Mono) for typography

## Mobile Considerations

The site includes comprehensive mobile optimizations:
- Reduced particle counts on mobile devices
- Touch-friendly navigation menu
- Responsive 3D scene scaling
- Performance-optimized animations for mobile browsers