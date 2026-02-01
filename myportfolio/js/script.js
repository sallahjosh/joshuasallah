document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('#current-year');
    yearElements.forEach(el => {
        if (el) el.textContent = currentYear;
    });

    // Typing effect (only on homepage)
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const words = [
            'Web Developer',
            'Python Enthusiast',
            'Problem Solver',
            'Tech Lover',
            'Lifelong Learner'
        ];
        
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;
        
        function type() {
            const currentWord = words[wordIndex];
            const currentChar = currentWord.substring(0, charIndex);
            
            typingText.textContent = `> ${currentChar}`;
            
            if (!isDeleting && charIndex < currentWord.length) {
                // Typing
                charIndex++;
                setTimeout(type, 100);
            } else if (isDeleting && charIndex > 0) {
                // Deleting
                charIndex--;
                setTimeout(type, 50);
            } else {
                // Change word
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    wordIndex = (wordIndex + 1) % words.length;
                }
                setTimeout(type, isDeleting ? 1000 : 500);
            }
        }
        
        // Start typing effect after a delay
        setTimeout(type, 1000);
    }
    
    // Create particles
    function createParticles() {
        const particlesContainer = document.getElementById('particles-js');
        if (!particlesContainer) return;
        
        const particleCount = 30;
        const particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size between 2px and 6px
            const size = Math.random() * 4 + 2;
            
            // Random position
            const posX = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;
            
            // Random opacity
            const opacity = Math.random() * 0.5 + 0.1;
            
            // Set styles
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.bottom = '0';
            particle.style.opacity = opacity;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            // Add some random code symbols
            const symbols = ['{}', '()', '[]', ';', '=', '=>', '//', '/*', '*/', '${}'];
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            
            // Only add text to some particles
            if (Math.random() > 0.7) {
                const text = document.createElement('span');
                text.textContent = randomSymbol;
                text.style.fontFamily = 'monospace';
                text.style.fontSize = '0.8rem';
                text.style.color = 'rgba(255, 255, 255, 0.5)';
                particle.appendChild(text);
            }
            
            particlesContainer.appendChild(particle);
            particles.push(particle);
        }
    }
    
    // Initialize particles
    createParticles();
    
    // Add scroll down animation
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.querySelector('a').getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    // Optimize background images based on device pixel ratio
    function optimizeBackgroundImages() {
        const heroBgs = document.querySelectorAll('.hero-bg');
        heroBgs.forEach(heroBg => {
            if (!heroBg.dataset.bg) return;
            
            const bgSources = heroBg.dataset.bg.split(',').map(src => src.trim());
            let selectedSrc = bgSources[0].split(' ')[0];
            
            // Check for higher DPI screens
            const dpr = window.devicePixelRatio || 1;
            if (dpr >= 2 && bgSources.length > 1) {
                selectedSrc = bgSources[1].split(' ')[0];
            }
            if (dpr >= 3 && bgSources.length > 2) {
                selectedSrc = bgSources[2].split(' ')[0];
            }
            
            // Only update if different to prevent unnecessary repaints
            if (heroBg.style.backgroundImage !== `url('${selectedSrc}')`) {
                heroBg.style.backgroundImage = `url('${selectedSrc}')`;
            }
        });
    }

    // Run on load and if window is resized
    window.addEventListener('load', optimizeBackgroundImages);
    window.addEventListener('resize', optimizeBackgroundImages);

    // Mobile menu toggle with animation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const body = document.body;
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('is-active');
            navLinks.classList.toggle('active');
            body.classList.toggle('nav-open');
            
            // Toggle aria-expanded for accessibility
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
            
            // Toggle aria-label
            this.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('is-active');
                navLinks.classList.remove('active');
                body.classList.remove('nav-open');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.setAttribute('aria-label', 'Open menu');
            }
        });
        
        // Close menu when clicking on a nav link
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('is-active');
                navLinks.classList.remove('active');
                body.classList.remove('nav-open');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.setAttribute('aria-label', 'Open menu');
                
                // Add active class to clicked link
                navItems.forEach(navItem => navItem.classList.remove('active'));
                item.classList.add('active');
            });
        });
        
        // Add keyboard navigation for menu
        navLinks.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hamburger.click();
                hamburger.focus();
            }
        });
    }

    // Smooth scrolling for anchor links with offset for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Skip if it's a different page link
        if (anchor.getAttribute('href').startsWith('#') && 
            anchor.getAttribute('href').length > 1 && 
            window.location.pathname === anchor.pathname) {
            
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Calculate the position to scroll to
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    // Smooth scroll to the target
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without adding to history
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    } else {
                        window.location.hash = targetId;
                    }
                }
            });
        }
    });
    
    // Handle back/forward navigation for anchor links
    window.addEventListener('popstate', function(e) {
        const hash = window.location.hash;
        if (hash) {
            const target = document.querySelector(hash);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });

    // Navbar scroll effect with shadow and hide on scroll down
    const header = document.querySelector('header');
    if (header) {
        let lastScroll = 0;
        const headerHeight = header.offsetHeight;
        
        // Add shadow when scrolled
        function updateHeader() {
            const currentScroll = window.pageYOffset;
            
            // Always show header at top of page
            if (currentScroll <= 10) {
                header.style.transform = 'translateY(0)';
                header.style.boxShadow = 'none';
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                return;
            }
            
            // Add shadow when scrolled past header
            if (currentScroll > headerHeight) {
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.boxShadow = 'none';
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
            
            // Hide header when scrolling down, show when scrolling up
            if (currentScroll > lastScroll && currentScroll > headerHeight) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        }
        
        // Throttle scroll events for better performance
        let isScrolling;
        window.addEventListener('scroll', function() {
            window.cancelAnimationFrame(isScrolling);
            isScrolling = window.requestAnimationFrame(updateHeader);
        }, false);
        
        // Run once on load
        updateHeader();
    }

    // Contact forms submission (works on all pages)
    const contactForms = document.querySelectorAll('.contact-form');
    if (contactForms.length) {
        contactForms.forEach(form => {
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn ? submitBtn.innerHTML : '';
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                }

                try {
                    const action = this.getAttribute('action') || 'contact.php';
                    const formData = new FormData(this);

                    const res = await fetch(action, {
                        method: 'POST',
                        body: formData
                    });

                    // Read as text first, then try JSON to avoid parsing errors from stray output
                    const raw = await res.text();
                    let data;
                    try {
                        data = JSON.parse(raw);
                    } catch (_) {
                        data = { ok: false, error: 'Unexpected server response.' };
                    }

                    if (res.ok && data && data.ok) {
                        alert(data.message || 'Thank you! Your message has been sent.');
                        this.reset();
                    } else {
                        const errorMsg = (data && data.error) ? data.error : 'Unable to send your message right now. Please try again later.';
                        alert(errorMsg);
                    }
                } catch (err) {
                    alert('Network error. Please check your connection and try again.');
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                    }
                }
            });
        });
    }

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-category, .project-card, .education-item, .experience-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    document.addEventListener('DOMContentLoaded', () => {
        const elements = document.querySelectorAll('.skill-category, .project-card, .education-item, .experience-item');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Trigger animation on load
        setTimeout(animateOnScroll, 100);
    });

    // Animate on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section');
    
    const highlightNav = () => {
        if (!navItems.length) { return; }
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav);

    // Back-to-top button behavior
    const backToTopBtn = document.querySelector('.back-to-top');
    const toggleBackToTop = () => {
        if (!backToTopBtn) return;
        const threshold = 400;
        if (window.pageYOffset > threshold) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    };

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        // Initialize state
        toggleBackToTop();
        window.addEventListener('scroll', toggleBackToTop);
    }
});
