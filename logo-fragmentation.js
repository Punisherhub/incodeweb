// Clean Canvas-Based Logo Fragmentation System
class LogoFragmentation {
    constructor(containerId, imageSrc) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Container not found:', containerId);
            return;
        }
        
        this.imageSrc = imageSrc;
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.isMouseOver = false;
        
        // Physics properties
        this.mouseRadius = 150;
        this.mouseForce = 0.5;
        this.returnForce = 0.02;
        this.friction = 0.98;
        
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.loadImage();
        this.setupEventListeners();
        this.animate();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);
        
        console.log('✅ Canvas created:', this.canvas.width, 'x', this.canvas.height);
    }
    
    loadImage() {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
            console.log('✅ Image loaded:', this.imageSrc);
            console.log('Image dimensions:', img.width, 'x', img.height);
            this.processImage(img);
        };
        
        img.onerror = () => {
            console.error('❌ Failed to load image:', this.imageSrc);
        };
        
        console.log('🔄 Loading image:', this.imageSrc);
        img.src = this.imageSrc;
    }
    
    processImage(img) {
        // Calculate size and position for logo
        const logoSize = Math.min(this.canvas.width, this.canvas.height) * 0.3;
        const logoX = (this.canvas.width - logoSize) / 2;
        const logoY = (this.canvas.height - logoSize) / 2;
        
        // Calculate actual scaled dimensions maintaining aspect ratio
        const scale = Math.min(logoSize / img.width, logoSize / img.height);
        const scaledWidth = Math.floor(img.width * scale);
        const scaledHeight = Math.floor(img.height * scale);
        
        // Create temporary canvas with exact scaled dimensions
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = scaledWidth;
        tempCanvas.height = scaledHeight;
        
        // Draw image at exact size
        tempCtx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
        
        // Get image data and create particles
        const imageData = tempCtx.getImageData(0, 0, scaledWidth, scaledHeight);
        
        // Center the logo on screen
        const centeredX = logoX + (logoSize - scaledWidth) / 2;
        const centeredY = logoY + (logoSize - scaledHeight) / 2;
        
        this.createParticles(imageData, centeredX, centeredY, scaledWidth);
        
        console.log('🎨 Image processed, creating particles...');
        console.log('Scaled dimensions:', scaledWidth, 'x', scaledHeight);
        console.log('Position:', centeredX.toFixed(0), ',', centeredY.toFixed(0));
    }
    
    createParticles(imageData, startX, startY, size) {
        const data = imageData.data;
        const step = 4; // Sample every 4th pixel for performance
        const width = imageData.width; // Use actual image data width
        
        this.particles = [];
        
        for (let y = 0; y < imageData.height; y += step) {
            for (let x = 0; x < imageData.width; x += step) {
                const index = (y * width + x) * 4; // Use correct width for index calculation
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                const a = data[index + 3];
                
                // Only create particles for non-transparent pixels
                if (a > 50) {
                    const particle = {
                        // Original position
                        homeX: startX + x,
                        homeY: startY + y,
                        
                        // Current position
                        x: startX + x,
                        y: startY + y,
                        
                        // Velocity
                        vx: 0,
                        vy: 0,
                        
                        // Visual properties
                        color: `rgba(${r}, ${g}, ${b}, ${a / 255})`,
                        size: Math.random() * 2 + 2,
                        
                        // State
                        isDisplaced: false
                    };
                    
                    this.particles.push(particle);
                }
            }
        }
        
        console.log(`✨ Created ${this.particles.length} particles from LogoInCode.png`);
    }
    
    setupEventListeners() {
        // Mouse move on entire document
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.isMouseOver = true;
        });
        
        // Mouse leave detection
        document.addEventListener('mouseleave', () => {
            this.isMouseOver = false;
        });
        
        // Resize handler
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Calculate distance to mouse
            const dx = particle.x - this.mouse.x;
            const dy = particle.y - this.mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (this.isMouseOver && distance < this.mouseRadius) {
                // Mouse is close - push particle away
                const force = (this.mouseRadius - distance) / this.mouseRadius;
                const angle = Math.atan2(dy, dx);
                
                particle.vx += Math.cos(angle) * force * this.mouseForce;
                particle.vy += Math.sin(angle) * force * this.mouseForce;
                particle.isDisplaced = true;
                
            } else {
                // Return to home position
                const homeDistanceX = particle.homeX - particle.x;
                const homeDistanceY = particle.homeY - particle.y;
                
                particle.vx += homeDistanceX * this.returnForce;
                particle.vy += homeDistanceY * this.returnForce;
                
                // Check if close to home
                if (Math.abs(homeDistanceX) < 1 && Math.abs(homeDistanceY) < 1) {
                    particle.isDisplaced = false;
                }
            }
            
            // Apply friction
            particle.vx *= this.friction;
            particle.vy *= this.friction;
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
        });
    }
    
    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw all particles
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }
    
    animate() {
        this.updateParticles();
        this.render();
        requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Export to global scope
window.LogoFragmentation = LogoFragmentation;