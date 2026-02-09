// script.js - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize everything
    initLoadingScreen();
    initCustomCursor();
    initNavigation();
    initThemeToggle();
    initAnimations();
    initProjects();
    initContactForm();
    initFAQ();
    initBackToTop();
    initScrollProgress();
    initStatsCounter();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Initialize animations after loading
            document.body.classList.add('loaded');
        }, 500);
    }, 1500);
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Add hover effect
        const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .service-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
    } else {
        cursor.style.display = 'none';
    }
}

// Navigation
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Active navigation on scroll
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.3,
        rootMargin: '0px 0px -50% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, options);
    
    sections.forEach(section => observer.observe(section));
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Animations
function initAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger animation to child elements
                const staggerItems = entry.target.querySelectorAll('.stagger-item');
                staggerItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.text-reveal, .fade-in, .scale-in, .slide-left, .slide-right');
    animatedElements.forEach(el => observer.observe(el));
    
    // Text reveal animation for hero
    const titleLines = document.querySelectorAll('.title-line');
    titleLines.forEach((line, index) => {
        line.style.setProperty('--line-index', index);
        
        const textReveal = line.querySelector('.text-reveal');
        setTimeout(() => {
            textReveal.classList.add('visible');
        }, index * 300);
    });
}

// Projects
function initProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Sample projects data
    const projects = [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "Full-featured online store with shopping cart, payment integration, and admin dashboard.",
            tags: ["React", "Node.js", "MongoDB", "Stripe"],
            category: "fullstack",
            image: "images/project1.png",
            demo: "#",
            github: "https://github.com/Echoesrule",
            date: "2024-03"
        },
        {
            id: 2,
            title: "Task Management App",
            description: "Collaborative task management application with real-time updates and team features.",
            tags: ["Vue.js", "Firebase", "PWA"],
            category: "web",
            image: "images/project2.png",
            demo: "#",
            github: "https://github.com/Echoesrule",
            date: "2024-02"
        },
        {
            id: 3,
            title: "Weather Forecast Mobile App",
            description: "Mobile application providing detailed weather forecasts with beautiful UI and location tracking.",
            tags: ["React Native", "API Integration", "UI/UX"],
            category: "mobile",
            image: "images/project3.png",
            demo: "#",
            github: "https://github.com/Echoesrule",
            date: "2024-01"
        },
        {
            id: 4,
            title: "Portfolio Website",
            description: "Modern portfolio website with animations, 3D effects, and responsive design.",
            tags: ["HTML/CSS", "JavaScript", "GSAP"],
            category: "web",
            image: "images/project1.png",
            demo: "#",
            github: "https://github.com/Echoesrule",
            date: "2023-12"
        },
        {
            id: 5,
            title: "RESTful API for Blog",
            description: "Scalable backend API for a blogging platform with authentication and CRUD operations.",
            tags: ["Express.js", "JWT", "PostgreSQL", "REST"],
            category: "backend",
            image: "images/project2.png",
            demo: "#",
            github: "https://github.com/Echoesrule",
            date: "2023-11"
        },
        {
            id: 6,
            title: "UI/UX Design System",
            description: "Comprehensive design system with components, guidelines, and documentation.",
            tags: ["Figma", "Design System", "UI/UX"],
            category: "design",
            image: "images/project3.png",
            demo: "#",
            github: "#",
            date: "2023-10"
        }
    ];
    
    // Render projects
    function renderProjects(filter = 'all') {
        projectsGrid.innerHTML = '';
        
        const filteredProjects = filter === 'all' 
            ? projects 
            : projects.filter(project => project.category === filter);
        
        filteredProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card fade-in';
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                    <div class="project-overlay">
                        <a href="${project.demo}" target="_blank" title="Live Demo">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                        <a href="${project.github}" target="_blank" title="View Code">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                </div>
                <div class="project-content">
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-meta">
                        <span class="project-category">${project.category}</span>
                        <span class="project-date">
                            <i class="far fa-calendar"></i> ${project.date}
                        </span>
                    </div>
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        });
        
        // Observe new project cards
        const projectCards = projectsGrid.querySelectorAll('.project-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        projectCards.forEach(card => observer.observe(card));
    }
    
    // Initial render
    renderProjects();
    
    // Filter projects
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            const filter = btn.getAttribute('data-filter');
            renderProjects(filter);
        });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Validate form
            if (!formData.name || !formData.email || !formData.message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Form validation
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.style.borderBottomColor = 'var(--danger)';
            } else {
                input.style.borderBottomColor = 'var(--primary)';
            }
        });
        
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.style.borderBottomColor = 'var(--primary)';
            }
        });
    });
}

// FAQ
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');
            
            // Close all other FAQs
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });
            
            // Toggle current FAQ
            if (!isActive) {
                question.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
}

// Back to Top
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Progress
function initScrollProgress() {
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// Stats Counter
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        statNumber.textContent = target;
                        clearInterval(timer);
                    } else {
                        statNumber.textContent = Math.floor(current);
                    }
                }, 16);
                
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(number => observer.observe(number));
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles if not already added
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                background: var(--bg-card);
                border: 1px solid var(--border-light);
                border-radius: var(--radius-md);
                display: flex;
                align-items: center;
                gap: 1rem;
                z-index: 10000;
                transform: translateX(150%);
                transition: transform 0.3s ease;
                max-width: 400px;
                box-shadow: var(--shadow-lg);
            }
            
            .notification.visible {
                transform: translateX(0);
            }
            
            .notification-success {
                border-left: 4px solid var(--secondary);
            }
            
            .notification-error {
                border-left: 4px solid var(--danger);
            }
            
            .notification-info {
                border-left: 4px solid var(--primary);
            }
            
            .notification-close {
                background: transparent;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                padding: 0.25rem;
                border-radius: var(--radius-sm);
                transition: all 0.2s ease;
            }
            
            .notification-close:hover {
                color: var(--text-primary);
                background: rgba(255, 255, 255, 0.1);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show notification
    setTimeout(() => notification.classList.add('visible'), 100);
    
    // Auto remove
    setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('visible');
        setTimeout(() => notification.remove(), 300);
    });
}

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initLoadingScreen,
        initCustomCursor,
        initNavigation,
        initThemeToggle,
        initAnimations,
        initProjects,
        initContactForm,
        initFAQ,
        initBackToTop,
        initScrollProgress,
        initStatsCounter,
        showNotification,
        debounce,
        throttle
    };
}// Add this function to initSkills section
function initSkillsAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItem = entry.target;
                const progressBar = skillItem.querySelector('.progress-bar');
                const targetWidth = skillItem.getAttribute('data-level') + '%';
                
                // Set custom property for animation
                progressBar.style.setProperty('--target-width', targetWidth);
                
                // Add animation class
                skillItem.classList.add('in-view');
                
                // Animate width
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 300);
                
                observer.unobserve(skillItem);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    skillItems.forEach(item => observer.observe(item));
}

// Call this function in your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    initSkillsAnimations();
});