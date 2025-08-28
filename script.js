// Enhanced 3D Website with Advanced Interactions
class IncodeWebsite {
    constructor() {
        this.scenes = {};
        this.renderers = {};
        this.animationFrameId = null;
        this.isAnimating = false;
        this.interactiveLogo = null;
        this.cursor = { x: 0, y: 0 };
        this.targetCursor = { x: 0, y: 0 };
        this.customCursor = null;
        this.magneticElements = [];
        this.rippleElements = [];
        
        this.init();
    }

    init() {
        this.initCustomCursor();
        this.initCursorInteractions();
        this.initBackgroundScene();
        this.initSectionScenes();
        this.initNavigation();
        this.initScrollAnimations();
        this.initContactForm();
        this.initMobileMenu();
        this.initMagneticEffects();
        this.initRippleEffects();
        this.initReactiveButtons();
        this.initParallaxEffects();
        this.initAdvancedLighting();
        this.hideLoadingScreen();
        
        // Event listeners
        window.addEventListener('resize', () => this.onWindowResize());
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        window.addEventListener('scroll', () => this.onScroll());
        window.addEventListener('click', (e) => this.onMouseClick(e));
    }

    // Background particle system with advanced effects
    initBackgroundScene() {
        const canvas = document.getElementById('bg-canvas');
        this.scenes.background = new THREE.Scene();
        
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderers.background = new THREE.WebGLRenderer({ 
            canvas, 
            alpha: true, 
            antialias: true 
        });
        
        this.renderers.background.setSize(window.innerWidth, window.innerHeight);
        this.renderers.background.setPixelRatio(window.devicePixelRatio);
        
        this.createAdvancedParticleSystem();
        this.createFloatingElements();
        
        this.camera.position.z = 5;
        this.animate();
    }

    createAdvancedParticleSystem() {
        // Main particle system
        const particleCount = 2000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        const colorPalette = [
            new THREE.Color(0x6366f1),
            new THREE.Color(0x8b5cf6),
            new THREE.Color(0xf59e0b),
            new THREE.Color(0x3b82f6)
        ];
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Positions
            positions[i3] = (Math.random() - 0.5) * 50;
            positions[i3 + 1] = (Math.random() - 0.5) * 50;
            positions[i3 + 2] = (Math.random() - 0.5) * 50;
            
            // Colors
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
            
            // Sizes
            sizes[i] = Math.random() * 0.03 + 0.01;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        const material = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scenes.background.add(this.particles);
        
        // Add particle connections
        this.createParticleConnections(positions, particleCount);
    }

    createParticleConnections(positions, particleCount) {
        const connections = new THREE.BufferGeometry();
        const connectionPositions = [];
        const connectionColors = [];
        
        for (let i = 0; i < particleCount; i += 10) {
            const i3 = i * 3;
            const nextIndex = ((i + 10) % particleCount) * 3;
            
            if (Math.random() > 0.7) {
                connectionPositions.push(
                    positions[i3], positions[i3 + 1], positions[i3 + 2],
                    positions[nextIndex], positions[nextIndex + 1], positions[nextIndex + 2]
                );
                
                connectionColors.push(0.4, 0.4, 0.9, 0.4, 0.4, 0.9);
            }
        }
        
        connections.setAttribute('position', new THREE.Float32BufferAttribute(connectionPositions, 3));
        connections.setAttribute('color', new THREE.Float32BufferAttribute(connectionColors, 3));
        
        const connectionMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.2,
            blending: THREE.AdditiveBlending
        });
        
        const connectionLines = new THREE.LineSegments(connections, connectionMaterial);
        this.scenes.background.add(connectionLines);
    }

    createFloatingElements() {
        // Add floating geometric shapes
        const shapes = [
            new THREE.BoxGeometry(0.2, 0.2, 0.2),
            new THREE.SphereGeometry(0.15, 12, 8),
            new THREE.OctahedronGeometry(0.15),
        ];
        
        const materials = [
            new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.3, wireframe: true }),
            new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.3, wireframe: true }),
            new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.3, wireframe: true })
        ];
        
        this.floatingElements = [];
        
        for (let i = 0; i < 20; i++) {
            const geometry = shapes[Math.floor(Math.random() * shapes.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10
            );
            
            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            this.scenes.background.add(mesh);
            this.floatingElements.push(mesh);
        }
    }

    // Initialize all section-specific 3D scenes
    initSectionScenes() {
        setTimeout(() => {
            this.initInteractiveLogo();
            this.initAboutScene();
            this.initCourseScene();
            this.initTimelineScenes();
        }, 100);
    }

    initInteractiveLogo() {
        const container = document.getElementById('particles-overlay');
        if (!container) {
            console.warn('Particles overlay container not found');
            return;
        }
        
        // Try to initialize advanced fragmentation system first
        if (window.LogoFragmentation) {
            try {
                this.logoFragmentation = new window.LogoFragmentation('particles-overlay', './img/LogoInCode.png?v=' + Date.now());
                console.log('Advanced logo fragmentation initialized successfully');
                
                // Hide fallback after image loads
                setTimeout(() => {
                    container.classList.add('loaded');
                }, 2000);
                
                return;
            } catch (error) {
                console.error('Error initializing logo fragmentation:', error);
            }
        }
        
        // Fallback to 3D logo if available
        if (window.InteractiveLogo3D) {
            try {
                this.interactiveLogo = new window.InteractiveLogo3D('particles-overlay');
                console.log('Interactive logo initialized successfully');
                
                setTimeout(() => {
                    container.classList.add('loaded');
                }, 1000);
                
                return;
            } catch (error) {
                console.error('Error initializing interactive logo:', error);
            }
        }
        
        console.log('Using fallback logo with enhanced interactions');
        // Enhanced fallback will remain visible
    }
    
    initFallbackHeroScene() {
        const container = document.getElementById('particles-overlay');
        if (!container) return;
        
        this.scenes.hero = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        this.renderers.hero = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        this.renderers.hero.setSize(container.clientWidth, container.clientHeight);
        this.renderers.hero.setPixelRatio(window.devicePixelRatio);
        container.appendChild(this.renderers.hero.domElement);
        
        // Create dynamic code visualization
        this.createCodeVisualization(this.scenes.hero);
        
        // Add ambient lighting
        const ambientLight = new THREE.AmbientLight(0x6366f1, 0.6);
        this.scenes.hero.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0x8b5cf6, 1, 100);
        pointLight.position.set(5, 5, 5);
        this.scenes.hero.add(pointLight);
        
        camera.position.z = 6;
        
        // Animation loop for fallback hero scene
        const animateHero = () => {
            requestAnimationFrame(animateHero);
            
            this.scenes.hero.children.forEach((child, index) => {
                if (child.geometry && child.geometry.type === 'BoxGeometry') {
                    child.rotation.x += 0.005 + index * 0.001;
                    child.rotation.y += 0.005 + index * 0.001;
                    child.position.y += Math.sin(Date.now() * 0.001 + index) * 0.0005;
                }
            });
            
            this.renderers.hero.render(this.scenes.hero, camera);
        };
        
        animateHero();
    }

    createCodeVisualization(scene) {
        // Create floating code blocks representing different programming concepts
        const codeElements = [
            { color: 0x6366f1, size: [0.6, 0.4, 0.2] },
            { color: 0x8b5cf6, size: [0.4, 0.6, 0.3] },
            { color: 0xf59e0b, size: [0.5, 0.3, 0.4] },
            { color: 0x3b82f6, size: [0.3, 0.5, 0.2] }
        ];
        
        codeElements.forEach((element, index) => {
            const geometry = new THREE.BoxGeometry(...element.size);
            const material = new THREE.MeshLambertMaterial({ 
                color: element.color, 
                transparent: true, 
                opacity: 0.7 
            });
            const mesh = new THREE.Mesh(geometry, material);
            
            const angle = (index / codeElements.length) * Math.PI * 2;
            mesh.position.set(
                Math.cos(angle) * 3,
                Math.sin(angle) * 2 + Math.random() * 2,
                Math.random() * 4 - 2
            );
            
            scene.add(mesh);
        });
    }

    initAboutScene() {
        const container = document.getElementById('about-3d-container');
        if (!container) return;
        
        this.scenes.about = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        this.renderers.about = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        this.renderers.about.setSize(container.clientWidth, container.clientHeight);
        this.renderers.about.setPixelRatio(window.devicePixelRatio);
        container.appendChild(this.renderers.about.domElement);
        
        // Create network visualization
        this.createNetworkVisualization(this.scenes.about);
        
        camera.position.z = 8;
        
        const animateAbout = () => {
            requestAnimationFrame(animateAbout);
            
            this.scenes.about.rotation.y += 0.002;
            
            this.renderers.about.render(this.scenes.about, camera);
        };
        
        animateAbout();
    }

    createNetworkVisualization(scene) {
        // Create interconnected network representing connections
        const nodes = [];
        const nodeGeometry = new THREE.SphereGeometry(0.15, 12, 8);
        
        // Create nodes
        for (let i = 0; i < 12; i++) {
            const nodeMaterial = new THREE.MeshBasicMaterial({ 
                color: i % 2 ? 0x6366f1 : 0x8b5cf6,
                transparent: true,
                opacity: 0.8
            });
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
            
            const phi = Math.acos(-1 + (2 * i) / 12);
            const theta = Math.sqrt(12 * Math.PI) * phi;
            
            node.position.setFromSphericalCoords(3, phi, theta);
            scene.add(node);
            nodes.push(node);
        }
        
        // Create connections
        nodes.forEach((node, i) => {
            const connections = Math.floor(Math.random() * 3) + 1;
            for (let j = 0; j < connections; j++) {
                const targetIndex = Math.floor(Math.random() * nodes.length);
                if (targetIndex !== i) {
                    const points = [node.position, nodes[targetIndex].position];
                    const geometry = new THREE.BufferGeometry().setFromPoints(points);
                    const material = new THREE.LineBasicMaterial({ 
                        color: 0x8b5cf6, 
                        transparent: true, 
                        opacity: 0.4 
                    });
                    const line = new THREE.Line(geometry, material);
                    scene.add(line);
                }
            }
        });
        
        // Add center hub
        const hubMaterial = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
        const hub = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 12), hubMaterial);
        scene.add(hub);
    }

    initCourseScene() {
        const container = document.getElementById('course-3d-container');
        if (!container) return;
        
        this.scenes.course = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        this.renderers.course = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        this.renderers.course.setSize(container.clientWidth, container.clientHeight);
        this.renderers.course.setPixelRatio(window.devicePixelRatio);
        container.appendChild(this.renderers.course.domElement);
        
        // Create Python ecosystem visualization
        this.createPythonEcosystem(this.scenes.course);
        
        camera.position.z = 8;
        
        const animateCourse = () => {
            requestAnimationFrame(animateCourse);
            
            // Animate orbital elements
            this.scenes.course.children.forEach((child, index) => {
                if (child.userData && child.userData.orbital) {
                    child.userData.angle += child.userData.speed;
                    child.position.x = Math.cos(child.userData.angle) * child.userData.radius;
                    child.position.z = Math.sin(child.userData.angle) * child.userData.radius;
                    child.rotation.y += 0.01;
                }
            });
            
            this.renderers.course.render(this.scenes.course, camera);
        };
        
        animateCourse();
    }

    createPythonEcosystem(scene) {
        // Central Python symbol
        const centerGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
        const centerMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x6366f1, 
            wireframe: true 
        });
        const center = new THREE.Mesh(centerGeometry, centerMaterial);
        scene.add(center);
        
        // Orbiting application areas
        const applications = [
            { name: 'AI/ML', color: 0xf59e0b, radius: 3, speed: 0.02 },
            { name: 'Web Dev', color: 0x8b5cf6, radius: 3.5, speed: 0.015 },
            { name: 'Data Science', color: 0x3b82f6, radius: 4, speed: 0.01 },
            { name: 'Automation', color: 0xef4444, radius: 2.5, speed: 0.025 }
        ];
        
        applications.forEach((app, index) => {
            const geometry = new THREE.SphereGeometry(0.3, 12, 8);
            const material = new THREE.MeshBasicMaterial({ color: app.color });
            const sphere = new THREE.Mesh(geometry, material);
            
            sphere.userData = {
                orbital: true,
                angle: index * (Math.PI * 2 / applications.length),
                radius: app.radius,
                speed: app.speed
            };
            
            scene.add(sphere);
        });
    }

    initTimelineScenes() {
        // Initialize 3D scenes for timeline items
        const timelineContainers = ['timeline-1-3d', 'timeline-2-3d', 'timeline-3-3d', 'timeline-4-3d'];
        
        timelineContainers.forEach((containerId, index) => {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            container.appendChild(renderer.domElement);
            
            this.scenes[`timeline-${index + 1}`] = scene;
            this.renderers[`timeline-${index + 1}`] = renderer;
            
            // Create specific visualization for each timeline step
            this.createTimelineVisualization(scene, index);
            
            camera.position.z = 3;
            
            const animate = () => {
                requestAnimationFrame(animate);
                
                scene.children.forEach(child => {
                    if (child.rotation) {
                        child.rotation.y += 0.01;
                    }
                });
                
                renderer.render(scene, camera);
            };
            
            animate();
        });
    }

    createTimelineVisualization(scene, step) {
        const colors = [0x6366f1, 0x8b5cf6, 0xf59e0b, 0x3b82f6];
        const geometries = [
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.SphereGeometry(0.3, 12, 8),
            new THREE.OctahedronGeometry(0.3),
            new THREE.TorusGeometry(0.3, 0.1, 8, 16)
        ];
        
        const geometry = geometries[step];
        const material = new THREE.MeshBasicMaterial({ 
            color: colors[step], 
            transparent: true, 
            opacity: 0.8,
            wireframe: step === 3
        });
        const mesh = new THREE.Mesh(geometry, material);
        
        scene.add(mesh);
        
        // Add particle effects
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 50;
        const positions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 3;
            positions[i3 + 1] = (Math.random() - 0.5) * 3;
            positions[i3 + 2] = (Math.random() - 0.5) * 3;
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            color: colors[step],
            size: 0.02,
            transparent: true,
            opacity: 0.6
        });
        
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);
    }


    // Navigation and scroll handling
    initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const progressFill = document.querySelector('.nav-progress-fill');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    this.updateActiveNavLink(link);
                }
            });
        });
        
        this.updateNavigationProgress();
    }

    updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    updateNavigationProgress() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        const progressFill = document.querySelector('.nav-progress-fill');
        
        const sectionOffsets = Array.from(sections).map(section => ({
            id: section.id,
            offsetTop: section.offsetTop,
            offsetHeight: section.offsetHeight
        }));
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / documentHeight) * 100;
            
            if (progressFill) {
                progressFill.style.width = `${scrollPercent}%`;
            }
            
            // Update active navigation link
            let activeSection = '';
            sectionOffsets.forEach(section => {
                if (scrollTop >= section.offsetTop - 100) {
                    activeSection = section.id;
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === activeSection) {
                    link.classList.add('active');
                }
            });
        });
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger specific animations
                    if (entry.target.classList.contains('timeline-item')) {
                        entry.target.style.animationDelay = `${Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.2}s`;
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const elementsToAnimate = document.querySelectorAll('.timeline-item, .differential-card');
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    }


    // Contact form handling
    initContactForm() {
        const form = document.querySelector('.form');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitButton = form.querySelector('button[type=\"submit\"]');
            const originalText = submitButton.querySelector('span').textContent;
            
            submitButton.querySelector('span').textContent = 'Enviando...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.querySelector('span').textContent = 'Mensagem Enviada!';
                setTimeout(() => {
                    submitButton.querySelector('span').textContent = originalText;
                    submitButton.disabled = false;
                    form.reset();
                }, 2000);
            }, 1500);
        });
        
        // Enhanced form interactions
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    // Mobile menu
    initMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Close menu when clicking on links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    // Main animation loop
    animate() {
        this.animationFrameId = requestAnimationFrame(() => this.animate());
        
        if (this.particles) {
            this.particles.rotation.x += 0.0005;
            this.particles.rotation.y += 0.0008;
            
            // Mouse interaction
            if (window.mouseX !== undefined && window.mouseY !== undefined) {
                const mouseX = (window.mouseX / window.innerWidth - 0.5) * 2;
                const mouseY = (window.mouseY / window.innerHeight - 0.5) * 2;
                
                this.particles.rotation.x += mouseY * 0.0001;
                this.particles.rotation.y += mouseX * 0.0001;
            }
        }
        
        // Animate floating elements
        if (this.floatingElements) {
            this.floatingElements.forEach((element, index) => {
                element.rotation.x += 0.002 + index * 0.0001;
                element.rotation.y += 0.003 + index * 0.0001;
                element.position.y += Math.sin(Date.now() * 0.001 + index) * 0.0002;
            });
        }
        
        this.renderers.background.render(this.scenes.background, this.camera);
    }

    // Event handlers
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderers.background.setSize(window.innerWidth, window.innerHeight);
        
        // Resize interactive logo
        if (this.interactiveLogo && this.interactiveLogo.renderer) {
            const container = document.getElementById('particles-overlay');
            if (container) {
                this.interactiveLogo.camera.aspect = container.clientWidth / container.clientHeight;
                this.interactiveLogo.camera.updateProjectionMatrix();
                this.interactiveLogo.renderer.setSize(container.clientWidth, container.clientHeight);
            }
        }
        
        // Resize individual scene renderers
        Object.keys(this.renderers).forEach(key => {
            if (key !== 'background') {
                const container = document.getElementById(`${key}-3d-container`) || 
                                document.getElementById(`${key.replace('-', '-3d-')}`);
                if (container && this.renderers[key]) {
                    this.renderers[key].setSize(container.clientWidth, container.clientHeight);
                }
            }
        });
    }

    onMouseMove(event) {
        window.mouseX = event.clientX;
        window.mouseY = event.clientY;
        
        // Update target cursor position
        this.targetCursor.x = event.clientX;
        this.targetCursor.y = event.clientY;
    }
    
    onMouseClick(event) {
        // Add click effect to cursor
        if (this.customCursor) {
            this.customCursor.classList.add('click');
            setTimeout(() => {
                this.customCursor.classList.remove('click');
            }, 200);
        }
    }

    onScroll() {
        // Handle scroll-based animations and effects
        const scrollY = window.pageYOffset;
        
        // Parallax effect for floating elements
        if (this.floatingElements) {
            this.floatingElements.forEach((element, index) => {
                element.position.z = Math.sin(scrollY * 0.001 + index) * 2;
            });
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 2500);
        }
    }

    // Cleanup
    destroy() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        
        // Cleanup logo fragmentation system
        if (this.logoFragmentation && this.logoFragmentation.destroy) {
            this.logoFragmentation.destroy();
            this.logoFragmentation = null;
        }
        
        // Cleanup 3D logo
        if (this.interactiveLogo && this.interactiveLogo.destroy) {
            this.interactiveLogo.destroy();
        }
        
        Object.values(this.renderers).forEach(renderer => {
            if (renderer && renderer.dispose) {
                renderer.dispose();
            }
        });
        
        Object.values(this.scenes).forEach(scene => {
            if (scene && scene.clear) {
                scene.clear();
            }
        });
    }
}

// Custom Cursor System - Enhanced
IncodeWebsite.prototype.initCustomCursor = function() {
    // Create custom cursor element
    this.customCursor = document.createElement('div');
    this.customCursor.className = 'custom-cursor';
    document.body.appendChild(this.customCursor);
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Start cursor animation loop
    this.animateCursor();
};

// Cursor Animation Loop
IncodeWebsite.prototype.animateCursor = function() {
    this.cursor.x += (this.targetCursor.x - this.cursor.x) * 0.15;
    this.cursor.y += (this.targetCursor.y - this.cursor.y) * 0.15;
    
    if (this.customCursor) {
        this.customCursor.style.left = this.cursor.x - 10 + 'px';
        this.customCursor.style.top = this.cursor.y - 10 + 'px';
    }
    
    requestAnimationFrame(() => this.animateCursor());
};

// Initialize Cursor Interactions
IncodeWebsite.prototype.initCursorInteractions = function() {
    const interactiveElements = document.querySelectorAll('button, .nav-link, .differential-card, .timeline-item, .contact-method, .cta-button');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            this.customCursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            this.customCursor.classList.remove('hover');
        });
        
        element.addEventListener('mousedown', () => {
            this.customCursor.classList.add('click');
        });
        
        element.addEventListener('mouseup', () => {
            this.customCursor.classList.remove('click');
        });
    });
};

// Magnetic Effects for Cards
IncodeWebsite.prototype.initMagneticEffects = function() {
    const magneticElements = document.querySelectorAll('.differential-card, .feature-item, .contact-method, .timeline-content');
    
    magneticElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            this.customCursor.classList.add('hover');
            element.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.320, 1)';
            element.style.transform = 'translateZ(20px) scale(1.02)';
            element.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';
        });
        
        element.addEventListener('mouseleave', () => {
            this.customCursor.classList.remove('hover');
            element.style.transform = '';
            element.style.boxShadow = '';
        });
        
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
            
            element.style.transform = `translate3d(${x}px, ${y}px, 20px) rotateY(${x * 0.3}deg) rotateX(${-y * 0.3}deg) scale(1.02)`;
        });
    });
};

// Ripple Effects System
IncodeWebsite.prototype.initRippleEffects = function() {
    const rippleElements = document.querySelectorAll('.cta-button, .nav-link, .contact-method, .differential-card');
    
    rippleElements.forEach(element => {
        element.addEventListener('click', (e) => {
            this.createRipple(e, element);
        });
    });
};

IncodeWebsite.prototype.createRipple = function(e, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, rgba(139, 92, 246, 0.3) 40%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
        animation: rippleEffect 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 800);
};

// Reactive Button Backgrounds
IncodeWebsite.prototype.initReactiveButtons = function() {
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        let glowElement = button.querySelector('.button-glow');
        if (!glowElement) {
            glowElement = document.createElement('div');
            glowElement.className = 'button-glow';
            button.appendChild(glowElement);
        }
        
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            glowElement.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(99, 102, 241, 0.8) 0%, rgba(139, 92, 246, 0.4) 40%, rgba(0, 212, 255, 0.2) 70%, transparent 100%)`;
            glowElement.style.opacity = '1';
            glowElement.style.transform = `scale(1.1)`;
        });
        
        button.addEventListener('mouseleave', () => {
            glowElement.style.opacity = '0';
            glowElement.style.transform = 'scale(1)';
        });
    });
};

// Parallax Effects System
IncodeWebsite.prototype.initParallaxEffects = function() {
    const parallaxElements = document.querySelectorAll('.section-title, .hero-title, .timeline-content, .about-block');
    
    parallaxElements.forEach(element => {
        element.style.transform = 'translateZ(0)';
        element.style.willChange = 'transform';
    });
    
    let ticking = false;
    
    const updateParallax = () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const rate = scrolled * (0.05 + index * 0.01);
            const yPos = -(rate / 12);
            const scale = 1 + (scrolled * 0.0001);
            
            element.style.transform = `translate3d(0, ${yPos}px, 0) scale(${Math.min(scale, 1.05)})`;
        });
        
        ticking = false;
    };
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
};

// Advanced Lighting System
IncodeWebsite.prototype.initAdvancedLighting = function() {
    const ambientLights = document.querySelectorAll('.ambient-light');
    
    // Mouse-based lighting effects
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) * 100;
        const mouseY = (e.clientY / window.innerHeight) * 100;
        
        ambientLights.forEach((light, index) => {
            const intensity = Math.sin(Date.now() * 0.001 + index * 2) * 0.3 + 0.7;
            const offsetX = Math.cos(Date.now() * 0.0005 + index) * 50;
            const offsetY = Math.sin(Date.now() * 0.0007 + index) * 30;
            
            light.style.transform = `translate(${offsetX + mouseX * 0.1}px, ${offsetY + mouseY * 0.1}px) scale(${intensity})`;
            light.style.opacity = intensity * 0.6;
        });
    });
    
    // Section-based lighting
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionIndex = Array.from(sections).indexOf(entry.target);
                this.updateSectionLighting(sectionIndex);
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => observer.observe(section));
};

IncodeWebsite.prototype.updateSectionLighting = function(sectionIndex) {
    const colors = [
        'rgba(99, 102, 241, 0.4)',  // Hero - Primary Blue
        'rgba(139, 92, 246, 0.3)',  // About - Purple
        'rgba(0, 212, 255, 0.2)',   // Course - Cyan
        'rgba(245, 158, 11, 0.3)',  // Differentials - Amber
        'rgba(99, 102, 241, 0.2)'   // Contact - Back to primary
    ];
    
    const ambientLights = document.querySelectorAll('.ambient-light');
    
    ambientLights.forEach((light, index) => {
        const color = colors[(sectionIndex + index) % colors.length];
        light.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
    });
};

IncodeWebsite.prototype.initAdvancedInteractions = function() {
    // Magnetic effect for cards
    const cards = document.querySelectorAll('.differential-card, .timeline-content');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.05;
            const moveY = y * 0.05;
            
            card.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translate(0, 0) scale(1)';
        });
    });
    
    // Advanced button interactions
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            button.style.setProperty('--mouse-x', x + '%');
            button.style.setProperty('--mouse-y', y + '%');
        });
    });
    
    // Add advanced button styles
    if (!document.getElementById('advanced-styles')) {
        const style = document.createElement('style');
        style.id = 'advanced-styles';
        style.textContent = `
            .cta-button {
                --mouse-x: 50%;
                --mouse-y: 50%;
                background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.2) 0%, transparent 50%), var(--gradient-primary);
            }
        `;
        document.head.appendChild(style);
    }
};

// Simple fallback interaction for hero logo
function initFallbackInteraction(logoElement) {
    const container = logoElement.parentElement.parentElement;
    
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        
        logoElement.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
    });
    
    container.addEventListener('mouseleave', () => {
        logoElement.style.transform = '';
    });
    
    // Add click pulse effect
    logoElement.addEventListener('click', () => {
        logoElement.style.animation = 'none';
        logoElement.style.transform = 'scale(1.2)';
        
        setTimeout(() => {
            logoElement.style.animation = 'logoFloat 3s ease-in-out infinite';
            logoElement.style.transform = '';
        }, 300);
    });
}

// Initialize the website when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing website...');
    
    // Check if logos are loaded
    const navLogo = document.querySelector('.nav-logo-img');
    const footerLogo = document.querySelector('.footer-logo-img');
    const fallbackLogo = document.querySelector('.fallback-logo-img');
    
    if (navLogo) {
        navLogo.onload = () => console.log('Navigation logo loaded successfully');
        navLogo.onerror = () => console.error('Failed to load navigation logo');
    }
    
    if (footerLogo) {
        footerLogo.onload = () => console.log('Footer logo loaded successfully');
        footerLogo.onerror = () => console.error('Failed to load footer logo');
    }
    
    if (fallbackLogo) {
        fallbackLogo.onload = () => {
            console.log('Hero fallback logo loaded successfully');
            // Add simple interaction to fallback logo
            initFallbackInteraction(fallbackLogo);
        };
        fallbackLogo.onerror = () => console.error('Failed to load hero fallback logo');
    }
    
    // Check if 3D libraries and fragmentation system are loaded
    console.log('THREE.js available:', typeof THREE !== 'undefined');
    console.log('InteractiveLogo3D available:', typeof InteractiveLogo3D !== 'undefined');
    console.log('LogoFragmentation available:', typeof LogoFragmentation !== 'undefined');
    
    window.incodeWebsite = new IncodeWebsite();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.incodeWebsite) {
        window.incodeWebsite.destroy();
    }
});