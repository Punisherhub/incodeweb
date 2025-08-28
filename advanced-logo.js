// Advanced Interactive 3D Logo - Soul.io Style
class InteractiveLogo3D {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        
        this.logoFragments = [];
        this.mousePos = { x: 0, y: 0 };
        this.targetMousePos = { x: 0, y: 0 };
        this.fragmentationLevel = 0;
        this.particles = null;
        
        this.init();
    }
    
    init() {
        this.setupRenderer();
        this.setupLighting();
        this.createLogo();
        this.createParticleField();
        this.setupEventListeners();
        this.animate();
    }
    
    setupRenderer() {
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);
        
        this.camera.position.z = 8;
    }
    
    createLogo() {
        // Create concentric rings inspired by your logo
        const outerRingSegments = this.createRingSegments(3.5, 0.3, 16, 0x8b5cf6);
        const middleRingSegments = this.createRingSegments(2.8, 0.25, 12, 0x6366f1);  
        const innerRingSegments = this.createRingSegments(2.2, 0.2, 8, 0x00d4ff);
        
        this.createDottedElements();
        this.createCenterLetter();
        
        this.logoFragments = [...outerRingSegments, ...middleRingSegments, ...innerRingSegments];
    }
    
    createRingSegments(radius, thickness, segments, color) {
        const segmentFragments = [];
        const angleStep = (Math.PI * 2) / segments;
        
        for (let i = 0; i < segments; i++) {
            const startAngle = i * angleStep;
            const endAngle = (i + 1) * angleStep;
            
            // Create gaps between segments
            const gapSize = angleStep * 0.15;
            const adjustedEndAngle = endAngle - gapSize;
            
            const geometry = new THREE.RingGeometry(radius - thickness/2, radius + thickness/2, 8, 1, startAngle, adjustedEndAngle - startAngle);
            
            const material = new THREE.MeshPhongMaterial({ 
                color: color,
                transparent: true,
                opacity: 0.9,
                shininess: 100
            });
            
            const segment = new THREE.Mesh(geometry, material);
            
            // Store original position for reassembly
            segment.userData = {
                originalPosition: { x: 0, y: 0, z: 0 },
                originalRotation: { x: 0, y: 0, z: 0 },
                targetPosition: { x: 0, y: 0, z: 0 },
                velocity: { x: 0, y: 0, z: 0 },
                fragmentDirection: {
                    x: Math.cos(startAngle + (adjustedEndAngle - startAngle) / 2) * 2,
                    y: Math.sin(startAngle + (adjustedEndAngle - startAngle) / 2) * 2,
                    z: (Math.random() - 0.5) * 1
                },
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.1,
                    y: (Math.random() - 0.5) * 0.1,
                    z: (Math.random() - 0.5) * 0.1
                }
            };
            
            this.scene.add(segment);
            segmentFragments.push(segment);
        }
        
        return segmentFragments;
    }
    
    createDottedElements() {
        // Create dotted segments
        const dotRadius = 3.2;
        const dots = 24;
        
        for (let i = 0; i < dots; i++) {
            const angle = (i / dots) * Math.PI * 2;
            const x = Math.cos(angle) * dotRadius;
            const y = Math.sin(angle) * dotRadius;
            
            const geometry = new THREE.BoxGeometry(0.15, 0.08, 0.05);
            const material = new THREE.MeshPhongMaterial({ 
                color: i % 3 === 0 ? 0x00d4ff : (i % 3 === 1 ? 0x8b5cf6 : 0x6366f1),
                transparent: true,
                opacity: 0.8
            });
            
            const dot = new THREE.Mesh(geometry, material);
            dot.position.set(x, y, 0);
            dot.rotation.z = angle;
            
            // Store fragment data
            dot.userData = {
                originalPosition: { x, y, z: 0 },
                originalRotation: { x: 0, y: 0, z: angle },
                targetPosition: { x, y, z: 0 },
                velocity: { x: 0, y: 0, z: 0 },
                fragmentDirection: {
                    x: Math.cos(angle) * 3,
                    y: Math.sin(angle) * 3,
                    z: (Math.random() - 0.5) * 2
                },
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.2,
                    y: (Math.random() - 0.5) * 0.2,
                    z: (Math.random() - 0.5) * 0.2
                }
            };
            
            this.scene.add(dot);
            this.logoFragments.push(dot);
        }
    }
    
    createCenterLetter() {
        // Create geometric "IN"
        this.createGeometricIN();
    }
    
    createGeometricIN() {
        // Create "I"
        const iGeometry = new THREE.BoxGeometry(0.2, 1.2, 0.1);
        const letterMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x4a5568,
            shininess: 100
        });
        
        const letterI = new THREE.Mesh(iGeometry, letterMaterial);
        letterI.position.set(-0.4, 0, 0.05);
        
        // Create "N"
        const nGeometry1 = new THREE.BoxGeometry(0.15, 1.2, 0.1);
        const nGeometry2 = new THREE.BoxGeometry(0.15, 1.2, 0.1);
        const nGeometry3 = new THREE.BoxGeometry(0.8, 0.15, 0.1);
        
        const nPart1 = new THREE.Mesh(nGeometry1, letterMaterial);
        const nPart2 = new THREE.Mesh(nGeometry2, letterMaterial);
        const nPart3 = new THREE.Mesh(nGeometry3, letterMaterial);
        
        nPart1.position.set(0.1, 0, 0.05);
        nPart2.position.set(0.7, 0, 0.05);
        nPart3.position.set(0.4, 0, 0.05);
        nPart3.rotation.z = Math.PI / 4;
        
        // Store center elements
        [letterI, nPart1, nPart2, nPart3].forEach(part => {
            part.userData = {
                originalPosition: { x: part.position.x, y: part.position.y, z: part.position.z },
                originalRotation: { x: part.rotation.x, y: part.rotation.y, z: part.rotation.z },
                targetPosition: { x: part.position.x, y: part.position.y, z: part.position.z },
                velocity: { x: 0, y: 0, z: 0 },
                fragmentDirection: {
                    x: (Math.random() - 0.5) * 4,
                    y: (Math.random() - 0.5) * 4,
                    z: (Math.random() - 0.5) * 2
                },
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.15,
                    y: (Math.random() - 0.5) * 0.15,
                    z: (Math.random() - 0.5) * 0.15
                }
            };
            
            this.scene.add(part);
            this.logoFragments.push(part);
        });
    }
    
    createParticleField() {
        const particleCount = 500;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        const colorPalette = [
            new THREE.Color(0x6366f1),
            new THREE.Color(0x8b5cf6),
            new THREE.Color(0x00d4ff),
            new THREE.Color(0x4ade80)
        ];
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            positions[i3] = (Math.random() - 0.5) * 20;
            positions[i3 + 1] = (Math.random() - 0.5) * 20;
            positions[i3 + 2] = (Math.random() - 0.5) * 10;
            
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.03,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }
    
    setupLighting() {
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
    }
    
    setupEventListeners() {
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            this.targetMousePos.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            this.targetMousePos.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            
            const distance = Math.sqrt(this.targetMousePos.x ** 2 + this.targetMousePos.y ** 2);
            this.fragmentationLevel = Math.min(distance * 2, 1);
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.fragmentationLevel = 0;
        });
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Smooth movement
        this.mousePos.x += (this.targetMousePos.x - this.mousePos.x) * 0.1;
        this.mousePos.y += (this.targetMousePos.y - this.mousePos.y) * 0.1;
        
        this.renderer.render(this.scene, this.camera);
    }
    
    destroy() {
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

// Export for use
window.InteractiveLogo3D = InteractiveLogo3D;