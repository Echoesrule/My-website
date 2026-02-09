// effects.js - Special Effects and Animations

// Matrix Rain Effect
function initMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.id = 'matrixRain';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.3';
    
    document.body.appendChild(canvas);
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Matrix characters
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);
    const drops = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
    }
    
    // Draw function
    function draw() {
        // Semi-transparent black background for trail effect
        ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#10b981';
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const char = charArray[Math.floor(Math.random() * charArray.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            // Draw character
            ctx.fillText(char, x, y);
            
            // Reset drop if it reaches bottom or randomly
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Move drop down
            drops[i]++;
        }
    }
    
    // Animation loop
    let animationId;
    function animate() {
        draw();
        animationId = requestAnimationFrame(animate);
    }
    
    // Initialize
    resizeCanvas();
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        drops.length = Math.floor(window.innerWidth / fontSize);
        for (let i = 0; i < drops.length; i++) {
            drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
        }
    });
    
    // Cleanup function
    return function cleanup() {
        cancelAnimationFrame(animationId);
        canvas.remove();
    };
}

// Parallax Effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (!parallaxElements.length) return;
    
    function updateParallax() {
        const scrollY = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax-speed') || 0.5);
            const yPos = -(scrollY * speed);
            
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Throttle the parallax update
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial update
    updateParallax();
}

// Particle System
function initParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.id = 'particles';
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '0';
    
    document.body.appendChild(particleContainer);
    
    const particles = [];
    const particleCount = 50;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Apply styles
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = 'rgba(99, 102, 241, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        // Animation
        particle.style.animation = `float ${duration}s ease-in-out infinite`;
        particle.style.animationDelay = `${delay}s`;
        
        particleContainer.appendChild(particle);
        particles.push({
            element: particle,
            x, y, size, duration, delay
        });
    }
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(20px, -20px) rotate(90deg); }
            50% { transform: translate(0, -40px) rotate(180deg); }
            75% { transform: translate(-20px, -20px) rotate(270deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Cleanup function
    return function cleanup() {
        particleContainer.remove();
        style.remove();
    };
}

// Typing Effect
function initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');
    
    typingElements.forEach(element => {
        const texts = JSON.parse(element.getAttribute('data-typing'));
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;
        
        function type() {
            if (isPaused) return;
            
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            // Set typing speed
            let typeSpeed = 100;
            
            if (isDeleting) {
                typeSpeed = 50;
            }
            
            // If word is complete
            if (!isDeleting && charIndex === currentText.length) {
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                    type();
                }, 1500);
                return;
            }
            
            // If word is deleted
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
            
            setTimeout(type, typeSpeed);
        }
        
        // Start typing after a delay
        setTimeout(type, 1000);
    });
}

// Glitch Effect
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('[data-glitch]');
    
    glitchElements.forEach(element => {
        let isGlitching = false;
        
        function glitch() {
            if (isGlitching) return;
            
            isGlitching = true;
            element.classList.add('glitch');
            
            // Random glitch duration
            const duration = Math.random() * 200 + 100;
            
            setTimeout(() => {
                element.classList.remove('glitch');
                isGlitching = false;
                
                // Schedule next glitch
                const nextGlitch = Math.random() * 5000 + 3000;
                setTimeout(glitch, nextGlitch);
            }, duration);
        }
        
        // Start glitching
        setTimeout(glitch, Math.random() * 3000);
    });
}

// Ripple Effect
function initRippleEffect() {
    document.addEventListener('click', function(e) {
        const target = e.target;
        
        // Only apply to buttons and links
        if (!target.matches('.btn, .btn-primary, .btn-outline, a[href]')) {
            return;
        }
        
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        // Add animation keyframes if not already added
        if (!document.getElementById('ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        target.style.position = 'relative';
        target.style.overflow = 'hidden';
        target.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Scroll Reveal with GSAP-like effect
function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const revealType = element.getAttribute('data-reveal');
                
                switch(revealType) {
                    case 'fade-up':
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                        break;
                    case 'fade-left':
                        element.style.opacity = '1';
                        element.style.transform = 'translateX(0)';
                        break;
                    case 'fade-right':
                        element.style.opacity = '1';
                        element.style.transform = 'translateX(0)';
                        break;
                    case 'scale':
                        element.style.opacity = '1';
                        element.style.transform = 'scale(1)';
                        break;
                    default:
                        element.style.opacity = '1';
                }
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Set initial styles based on reveal type
    revealElements.forEach(element => {
        const revealType = element.getAttribute('data-reveal');
        
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        switch(revealType) {
            case 'fade-up':
                element.style.transform = 'translateY(50px)';
                break;
            case 'fade-left':
                element.style.transform = 'translateX(-50px)';
                break;
            case 'fade-right':
                element.style.transform = 'translateX(50px)';
                break;
            case 'scale':
                element.style.transform = 'scale(0.8)';
                break;
        }
        
        observer.observe(element);
    });
}

// Mouse Trail Effect
function initMouseTrail() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    
    const trailContainer = document.createElement('div');
    trailContainer.id = 'mouse-trail';
    trailContainer.style.position = 'fixed';
    trailContainer.style.top = '0';
    trailContainer.style.left = '0';
    trailContainer.style.width = '100%';
    trailContainer.style.height = '100%';
    trailContainer.style.pointerEvents = 'none';
    trailContainer.style.zIndex = '9998';
    
    document.body.appendChild(trailContainer);
    
    const trail = [];
    const trailLength = 10;
    
    // Create trail dots
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.position = 'absolute';
        dot.style.width = '10px';
        dot.style.height = '10px';
        dot.style.background = 'var(--primary)';
        dot.style.borderRadius = '50%';
        dot.style.opacity = '0';
        dot.style.transform = 'translate(-50%, -50%)';
        dot.style.transition = 'opacity 0.3s, transform 0.3s';
        
        trailContainer.appendChild(dot);
        trail.push({
            element: dot,
            x: 0,
            y: 0
        });
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let trailIndex = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateTrail() {
        // Update trail positions
        for (let i = 0; i < trailLength; i++) {
            const dot = trail[i];
            const nextDot = trail[i === trailLength - 1 ? 0 : i + 1];
            
            // Move dot towards next dot's position
            dot.x += (nextDot.x - dot.x) * 0.3;
            dot.y += (nextDot.y - dot.y) * 0.3;
            
            dot.element.style.left = dot.x + 'px';
            dot.element.style.top = dot.y + 'px';
            
            // Calculate opacity based on position in trail
            const opacity = 1 - (i / trailLength);
            dot.element.style.opacity = opacity.toString();
            
            // Calculate size based on position
            const size = 10 - (i * 0.8);
            dot.element.style.width = size + 'px';
            dot.element.style.height = size + 'px';
        }
        
        // Update first dot with mouse position
        trail[trailIndex].x = mouseX;
        trail[trailIndex].y = mouseY;
        
        // Move to next position in trail
        trailIndex = (trailIndex + 1) % trailLength;
        
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
    
    // Cleanup function
    return function cleanup() {
        trailContainer.remove();
    };
}

// Initialize all effects
function initAllEffects() {
    // Only initialize effects if not in reduced motion mode
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        console.log('Reduced motion mode detected. Skipping effects.');
        return;
    }
    
    const cleanups = [];
    
    // Initialize effects based on user preference or device capability
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        // Desktop with mouse
        cleanups.push(initMatrixRain());
        cleanups.push(initParticles());
        cleanups.push(initMouseTrail());
    }
    
    // Effects for all devices
    cleanups.push(initParallax());
    initTypingEffect();
    initGlitchEffect();
    initRippleEffect();
    initScrollReveal();
    
    // Return cleanup function
    return function cleanupAllEffects() {
        cleanups.forEach(cleanup => {
            if (typeof cleanup === 'function') {
                cleanup();
            }
        });
    };
}

// Export if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMatrixRain,
        initParallax,
        initParticles,
        initTypingEffect,
        initGlitchEffect,
        initRippleEffect,
        initScrollReveal,
        initMouseTrail,
        initAllEffects
    };
}