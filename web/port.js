// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // ===================
  // 1. NAVIGATION
  // ===================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('links');
  const navItems = document.querySelectorAll('.links a');
  
  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.querySelector('i').classList.toggle('fa-bars');
    hamburger.querySelector('i').classList.toggle('fa-times');
  });
  
  // Close mobile menu when clicking a link
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.querySelector('i').classList.add('fa-bars');
      hamburger.querySelector('i').classList.remove('fa-times');
    });
  });
  
  // Add scroll effect to navigation
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navigations');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
  
  // ===================
  // 2. TYPING EFFECT
  // ===================
  const typedTextSpan = document.querySelector('.typed-text');
  const cursorSpan = document.querySelector('.cursor');
  
  const textArray = ["Full Stack Developer", "UI/UX Designer", "Problem Solver", "Tech Enthusiast"];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 1500; // Delay between current and next text
  let textArrayIndex = 0;
  let charIndex = 0;
  
  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      setTimeout(erase, newTextDelay);
    }
  }
  
  function erase() {
    if (charIndex > 0) {
      if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      textArrayIndex++;
      if(textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }
  
  // Start typing effect
  setTimeout(type, newTextDelay + 250);
  
  // ===================
  // 3. SKILLS ANIMATION
  // ===================
  const skillProgressBars = document.querySelectorAll('.skill-progress');
  
  function animateSkills() {
    skillProgressBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      if (isElementInViewport(bar)) {
        bar.style.width = width + '%';
      }
    });
  }
  
  // Initial check
  animateSkills();
  
  // Check on scroll
  window.addEventListener('scroll', animateSkills);
  
  // ===================
  // 4. PORTFOLIO FILTER
  // ===================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || filterValue === category) {
          card.style.display = 'block';
          // Add animation
          card.style.animation = 'fadeIn 0.5s forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // ===================
  // 5. FAQ ACCORDION
  // ===================
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      // Toggle active class on clicked question
      question.classList.toggle('active');
      
      // Toggle answer visibility
      const answer = question.nextElementSibling;
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
      
      // Close other answers
      faqQuestions.forEach(otherQuestion => {
        if (otherQuestion !== question) {
          otherQuestion.classList.remove('active');
          const otherAnswer = otherQuestion.nextElementSibling;
          otherAnswer.style.maxHeight = null;
        }
      });
    });
  });
  
  // ===================
  // 6. CONTACT FORM
  // ===================
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Simple validation
      if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Here you would typically send the data to a server
      // For now, we'll just show a success message
      alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
      
      // Reset form
      contactForm.reset();
    });
  }
  
  // ===================
  // 7. SCROLL ANIMATIONS
  // ===================
  // Check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }
  
  // Animate elements on scroll
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  function checkScroll() {
    animatedElements.forEach(el => {
      if (isElementInViewport(el)) {
        el.classList.add('visible');
      }
    });
  }
  
  // Initial check
  checkScroll();
  
  // Check on scroll
  window.addEventListener('scroll', checkScroll);
  
  // ===================
  // 8. BACK TO TOP BUTTON
  // ===================
  const backToTopButton = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // ===================
  // 9. SET CURRENT YEAR IN FOOTER
  // ===================
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
  
  // ===================
  // 10. PARTICLES BACKGROUND
  // ===================
  function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random size, position, and animation delay
      const size = Math.random() * 5 + 2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 5;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.animationDelay = `${delay}s`;
      
      // Add gradient background
      particle.style.background = `radial-gradient(circle, rgba(251, 144, 57, 0.6) 0%, rgba(100, 108, 121, 0.3) 100%)`;
      
      particlesContainer.appendChild(particle);
    }
  }
  
  // Create particles
  createParticles();
  
  // ===================
  // 11. NEWSLETTER FORM
  // ===================
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;
      
      if (email && validateEmail(email)) {
        alert(`Thank you for subscribing with ${email}! You'll receive updates soon.`);
        emailInput.value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }
  
  // Email validation helper
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  // ===================
  // 12. PROJECT CARD HOVER EFFECTS
  // ===================
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
  
  // ===================
  // 13. SMOOTH SCROLL FOR ANCHOR LINKS
  // ===================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ===================
  // 14. INITIALIZE ALL ANIMATIONS
  // ===================
  // Make all project cards animate on scroll
  projectCards.forEach(card => {
    card.classList.add('animate-on-scroll');
  });
  
  // Initial check for animations
  setTimeout(() => {
    checkScroll();
  }, 100);
});