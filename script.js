// Incode Website - Versão Limpa e Otimizada
class IncodeWebsite {
    constructor() {
        this.scenes = {};
        this.renderers = {};
        this.animationFrameId = null;
        this.isPreloaderActive = true;
        this.particles = null;
        this.camera = null;

        this.init();
    }

    init() {
        console.log('🚀 Iniciando Incode Website');

        // Aguarda DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        this.initPreloader();
        this.initScrollTrigger();

        // Event listeners
        window.addEventListener('resize', () => this.onWindowResize());
        window.addEventListener('scroll', () => this.onScroll());

        console.log('✅ Componentes inicializados');
    }

    // ==========================================================================
    // PRELOADER
    // ==========================================================================

    initPreloader() {
        const preloaderLogo = document.getElementById('preloader-logo');
        const preloader = document.getElementById('preloader');
        const mainWebsite = document.getElementById('main-website');

        if (!preloaderLogo || !preloader || !mainWebsite) {
            console.error('❌ Elementos do preloader não encontrados');
            return;
        }

        console.log('✅ Preloader inicializado');

        // Adiciona partículas simples
        this.createSimpleParticles();

        // Click event para transição
        preloaderLogo.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('🎯 Clique no logo - iniciando transição');
            this.transitionToMainSite(preloader, mainWebsite);
        });
    }

    createSimpleParticles() {
        const particlesContainer = document.querySelector('.logo-particles');
        if (!particlesContainer) return;

        // Limpa partículas existentes
        particlesContainer.innerHTML = '';

        // Criar 12 partículas simples
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${3 + Math.random() * 3}px;
                height: ${3 + Math.random() * 3}px;
                background: #4A90E2;
                border-radius: 50%;
                opacity: ${0.3 + Math.random() * 0.4};
                left: ${Math.random() * 160 - 80}px;
                top: ${Math.random() * 160 - 80}px;
                pointer-events: none;
                animation: simpleFloat ${2 + Math.random() * 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            particlesContainer.appendChild(particle);
        }

        // CSS para animação simples
        if (!document.getElementById('simple-particles-style')) {
            const style = document.createElement('style');
            style.id = 'simple-particles-style';
            style.textContent = `
                @keyframes simpleFloat {
                    0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
                    50% { transform: translateY(-15px) scale(1.1); opacity: 0.7; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    transitionToMainSite(preloader, mainWebsite) {
        if (!this.isPreloaderActive) return;
        this.isPreloaderActive = false;

        console.log('🎬 Iniciando transição para site principal');

        // Animação de transição simplificada
        const tl = gsap.timeline();

        tl.to('.logo-image', {
            scale: 1.3,
            rotation: 360,
            duration: 0.8,
            ease: 'power2.inOut'
        })
        .to('.logo-text-container', {
            scale: 1.2,
            y: -20,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.4')
        .to('.logo-glow', {
            scale: 3,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.6')
        .to(preloader, {
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
                preloader.style.display = 'none';
                mainWebsite.classList.remove('hidden');
                this.initMainWebsite();
            }
        }, '-=0.2');
    }

    initMainWebsite() {
        console.log('🌟 Inicializando site principal');

        // Inicializar componentes do site principal
        setTimeout(() => {
            this.initBackgroundScene();
            this.initCourseCard();
            this.initProgressionAnimation();
            this.initPilaresAnimation();
            this.initFooterCards();
            this.initFixedLogo();
            this.animateEntrance();
        }, 500);
    }

    animateEntrance() {
        console.log('🎨 Iniciando animações de entrada');

        // Primeiro garantir que tudo está visível
        gsap.set('.hero-title', { opacity: 1, visibility: 'visible' });
        gsap.set('.hero-title .title-line', { opacity: 1, visibility: 'visible' });
        gsap.set('.pilares-container', { opacity: 1, visibility: 'visible' });
        gsap.set('.pilar', { opacity: 1, visibility: 'visible' });
        gsap.set('.course-card-wrapper', { opacity: 1, visibility: 'visible' });

        const tl = gsap.timeline();

        tl.from('.navbar', {
            y: -30,
            opacity: 0.5,
            duration: 0.6,
            ease: 'power2.out'
        })
        .from('.hero-title .title-line', {
            y: 30,
            opacity: 0.3,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.3')
        .from('.pilar', {
            y: 20,
            opacity: 0.2,
            scale: 0.98,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.2');

        console.log('✨ Animações de entrada completadas');
    }

    // ==========================================================================
    // BACKGROUND 3D SCENE
    // ==========================================================================

    initBackgroundScene() {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) {
            console.warn('❌ Canvas de fundo não encontrado');
            return;
        }

        try {
            this.scenes.background = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.renderers.background = new THREE.WebGLRenderer({
                canvas,
                alpha: true,
                antialias: true
            });

            this.renderers.background.setSize(window.innerWidth, window.innerHeight);
            this.renderers.background.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            this.createSimpleParticleSystem();
            this.camera.position.z = 5;
            this.animate();

            console.log('✅ Background 3D inicializado');
        } catch (error) {
            console.warn('⚠️ Erro ao inicializar 3D:', error);
        }
    }

    createSimpleParticleSystem() {
        const particleCount = 80; // Reduzido para performance
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

            velocities[i * 3] = (Math.random() - 0.5) * 0.01;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0x4A90E2,
            size: 0.03,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.particles.userData = { velocities };
        this.scenes.background.add(this.particles);
    }

    // ==========================================================================
    // COURSE CARD
    // ==========================================================================

    initCourseCard() {
        const courseCard = document.getElementById('course-card');
        if (!courseCard) {
            console.warn('❌ Course card não encontrado');
            return;
        }

        console.log('✅ Course card inicializado', courseCard);
        console.log('📍 Course card visível:', courseCard.offsetWidth, 'x', courseCard.offsetHeight);

        // Reset card state when page loads
        this.resetCardState(courseCard);

        // Reset card state when page becomes visible again (after back navigation)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.resetCardState(courseCard);
            }
        });

        // Reset on page focus (additional safety)
        window.addEventListener('focus', () => {
            this.resetCardState(courseCard);
        });

        // Prevenir flip quando clicar no botão INSCREVA-SE
        const ctaButton = courseCard.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Impede que o evento chegue ao card pai
                console.log('🔗 Botão INSCREVA-SE clicado - não flipando card');
            });
        }

        // Click event para flip
        courseCard.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('🎯 Card clicado!', e.target);
            this.flipCard(courseCard);
        });

        // Hover effects simples
        courseCard.addEventListener('mouseenter', () => {
            if (!courseCard.classList.contains('flipping')) {
                gsap.to(courseCard, {
                    y: -10,
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });

        courseCard.addEventListener('mouseleave', () => {
            if (!courseCard.classList.contains('flipping')) {
                gsap.to(courseCard, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    }

    resetCardState(card) {
        // Remove todas as classes de estado do card
        card.classList.remove('flipped', 'flipping', 'redirecting');
        // Reabilitar interação completamente
        card.style.pointerEvents = 'auto';
        card.style.cursor = 'pointer';
        // Força reflow para garantir que as mudanças sejam aplicadas
        card.offsetHeight;
        console.log('🔄 Card state resetado e reabilitado para cliques');
    }

    flipCard(card) {
        if (card.classList.contains('flipping') || card.classList.contains('redirecting')) return;

        card.classList.add('flipping');
        const isFlipped = card.classList.contains('flipped');

        console.log('🔄 Flipping card, estava:', isFlipped ? 'virado' : 'normal');
        console.log('📋 Classes antes:', card.className);

        // Toggle classe
        if (isFlipped) {
            card.classList.remove('flipped');
            console.log('➡️ Removendo classe flipped');
        } else {
            card.classList.add('flipped');
            console.log('➡️ Adicionando classe flipped');
        }

        console.log('📋 Classes depois:', card.className);

        // Efeito visual e redirecionamento
        gsap.timeline()
            .to(card, {
                scale: 1.05,
                duration: 0.1,
                ease: 'power2.out'
            })
            .to(card, {
                scale: 1,
                duration: 0.1,
                ease: 'power2.in',
                onComplete: () => {
                    card.classList.remove('flipping');
                    // Se flipou para o verso, redireciona após delay
                    if (!isFlipped) {
                        card.classList.add('redirecting');
                        // Desabilitar completamente o card
                        card.style.pointerEvents = 'none';

                        // Após delay menor, flip de volta e depois redireciona
                        setTimeout(() => {
                            // Flip de volta para o estado inicial
                            card.classList.remove('flipped');
                            console.log('🔄 Voltando card para estado inicial antes do redirect');
                        }, 600);

                        setTimeout(() => {
                            window.location.href = 'curso.html';
                        }, 800);
                    }
                }
            });
    }

    // ==========================================================================
    // PILARES ANIMATION
    // ==========================================================================

    initPilaresAnimation() {
        const pilares = document.querySelectorAll('.pilar');
        if (pilares.length === 0) {
            console.warn('❌ Pilares não encontrados');
            return;
        }

        console.log('✅ Pilares animação inicializada');

        pilares.forEach((pilar) => {
            pilar.addEventListener('mouseenter', () => {
                gsap.to(pilar, {
                    y: -10,
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });

                gsap.to(pilar.querySelector('.pilar-icon'), {
                    scale: 1.2,
                    rotation: 10,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            pilar.addEventListener('mouseleave', () => {
                gsap.to(pilar, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });

                gsap.to(pilar.querySelector('.pilar-icon'), {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }

    // ==========================================================================
    // FOOTER CARDS
    // ==========================================================================

    initFooterCards() {
        const footerCards = document.querySelectorAll('.contact-card');
        if (footerCards.length === 0) {
            console.warn('❌ Footer cards não encontrados');
            return;
        }

        console.log('✅ Footer cards inicializados');

        footerCards.forEach((card, index) => {
            // Definir os links para cada card
            let targetUrl = '';

            if (card.querySelector('.contact-value').textContent.includes('@gmail.com')) {
                targetUrl = `mailto:${card.querySelector('.contact-value').textContent}`;
            } else if (card.querySelector('.contact-value').textContent.includes('99860-9680')) {
                targetUrl = `https://api.whatsapp.com/send/?phone=5542998609680`;
            } else if (card.querySelector('.instagram-link')) {
                targetUrl = card.querySelector('.instagram-link').href;
            } else if (card.querySelector('.website-link')) {
                targetUrl = card.querySelector('.website-link').href;
            }

            if (targetUrl) {
                // Tornar o card clicável
                card.style.cursor = 'pointer';

                card.addEventListener('click', (e) => {
                    // Verificar se o clique foi diretamente em um link
                    if (e.target.tagName === 'A') {
                        return; // Deixar o link funcionar normalmente
                    }

                    e.preventDefault();
                    console.log(`🔗 Card ${index + 1} clicado - redirecionando para:`, targetUrl);

                    if (targetUrl.startsWith('mailto:')) {
                        window.location.href = targetUrl;
                    } else {
                        window.open(targetUrl, '_blank');
                    }
                });

                // Efeito visual adicional no hover
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-8px)';
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(-5px)';
                });
            }
        });
    }

    // ==========================================================================
    // SCROLL TRIGGER & PROGRESSION
    // ==========================================================================

    initScrollTrigger() {
        gsap.registerPlugin(ScrollTrigger);
    }

    initProgressionAnimation() {
        const progressionSteps = document.querySelectorAll('.progression-step');
        if (progressionSteps.length === 0) return;

        console.log('✅ Progression animation inicializada');

        progressionSteps.forEach((step, index) => {
            gsap.set(step, { opacity: 0, y: 50 });

            ScrollTrigger.create({
                trigger: step,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to(step, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: 'power3.out'
                    });

                    gsap.from(step.querySelector('.step-icon'), {
                        scale: 0,
                        rotation: -90,
                        duration: 0.5,
                        delay: index * 0.1 + 0.2,
                        ease: 'back.out(1.5)'
                    });
                }
            });
        });

        this.animateTimelinePath();
    }

    animateTimelinePath() {
        const timelinePath = document.querySelector('.timeline-path');
        if (!timelinePath) return;

        gsap.set(timelinePath, { height: 0 });

        ScrollTrigger.create({
            trigger: '.progression-timeline',
            start: 'top 80%',
            end: 'bottom 30%',
            scrub: 1,
            onUpdate: (self) => {
                gsap.to(timelinePath, {
                    height: `${self.progress * 100}%`,
                    duration: 0.1,
                    ease: 'none'
                });
            }
        });
    }

    // ==========================================================================
    // ANIMATION LOOP
    // ==========================================================================

    animate() {
        if (!this.renderers.background) return;

        this.animationFrameId = requestAnimationFrame(() => this.animate());

        // Animar partículas
        if (this.particles && this.particles.userData.velocities) {
            const positions = this.particles.geometry.attributes.position.array;
            const velocities = this.particles.userData.velocities;

            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += velocities[i];
                positions[i + 1] += velocities[i + 1];
                positions[i + 2] += velocities[i + 2];

                // Reposicionar partículas que saem dos limites
                if (Math.abs(positions[i]) > 8) velocities[i] *= -1;
                if (Math.abs(positions[i + 1]) > 8) velocities[i + 1] *= -1;
                if (Math.abs(positions[i + 2]) > 8) velocities[i + 2] *= -1;
            }

            this.particles.geometry.attributes.position.needsUpdate = true;
        }

        try {
            this.renderers.background.render(this.scenes.background, this.camera);
        } catch (error) {
            console.warn('⚠️ Erro no render 3D:', error);
        }
    }

    // ==========================================================================
    // EVENT HANDLERS
    // ==========================================================================

    onWindowResize() {
        if (this.camera && this.renderers.background) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderers.background.setSize(window.innerWidth, window.innerHeight);
        }
    }

    onScroll() {
        const scrollY = window.scrollY;

        if (this.camera) {
            this.camera.position.y = scrollY * 0.0005;
        }

        this.updateScrollIndicator();
    }

    updateScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;

        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);

        if (scrollPercent > 0.1) {
            gsap.to(scrollIndicator, { opacity: 0, duration: 0.3 });
        } else {
            gsap.to(scrollIndicator, { opacity: 1, duration: 0.3 });
        }
    }

    // ==========================================================================
    // CLEANUP
    // ==========================================================================

    destroy() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }

        Object.values(this.renderers).forEach(renderer => {
            if (renderer.dispose) renderer.dispose();
        });

        window.removeEventListener('resize', this.onWindowResize);
        window.removeEventListener('scroll', this.onScroll);
    }

    // ==========================================================================
    // FIXED LOGO CONTROL
    // ==========================================================================

    initFixedLogo() {
        const fixedLogo = document.getElementById('fixed-logo');
        if (!fixedLogo) {
            console.warn('❌ Fixed logo não encontrado');
            return;
        }

        console.log('✅ Fixed logo inicializado');

        // Controla a visibilidade baseado no scroll
        this.updateLogoVisibility();
        window.addEventListener('scroll', () => this.updateLogoVisibility());
    }

    updateLogoVisibility() {
        const fixedLogo = document.getElementById('fixed-logo');
        if (!fixedLogo) return;

        const heroSection = document.querySelector('.course-hero');
        const overviewSection = document.querySelector('.course-overview-section');

        let shouldShow = false;

        // Verifica se estamos nas seções onde a logo DEVE aparecer: Hero e Course Overview
        [heroSection, overviewSection].forEach(section => {
            if (section) {
                const rect = section.getBoundingClientRect();
                // Logo aparece se a seção está visível na viewport
                if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                    shouldShow = true;
                }
            }
        });

        // Adiciona ou remove a classe show baseado na lógica positiva
        if (shouldShow) {
            fixedLogo.classList.add('show');
            console.log('🎯 Logo visível - seção detectada');
        } else {
            fixedLogo.classList.remove('show');
            console.log('🚫 Logo escondida');
        }
    }
}

// ==========================================================================
// INITIALIZATION
// ==========================================================================

// Aguardar carregamento
document.addEventListener('DOMContentLoaded', () => {
    try {
        const incodeWebsite = new IncodeWebsite();
        window.incodeWebsite = incodeWebsite;
        console.log('🎉 Incode Academy Website carregado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao inicializar website:', error);
    }

});

// Smooth scrolling para links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

