// Gallery functionality will be handled by HTML links

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Dropdown Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Desktop dropdown behavior (hover)
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        // Desktop hover behavior
        if (window.innerWidth > 768) {
            dropdown.addEventListener('mouseenter', () => {
                dropdownMenu.style.opacity = '1';
                dropdownMenu.style.visibility = 'visible';
                dropdownMenu.style.transform = 'translateY(0)';
            });
            
            dropdown.addEventListener('mouseleave', () => {
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                dropdownMenu.style.transform = 'translateY(-10px)';
            });
        }
        
        // Mobile click behavior
        if (window.innerWidth <= 768) {
            dropdownToggle.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        dropdowns.forEach(dropdown => {
            if (window.innerWidth > 768) {
                dropdown.classList.remove('active');
            }
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (window.scrollY > 100) {
            if (isDarkMode) {
                header.style.background = 'rgba(26, 26, 26, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(255, 255, 255, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        } else {
            if (isDarkMode) {
                header.style.background = 'rgba(26, 26, 26, 0.95)';
                header.style.boxShadow = 'none';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        }
    }
});

// Enhanced Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const formGroups = contactForm.querySelectorAll('.form-group');
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    // Form validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-ZöçşğüıÖÇŞĞÜİ\s]+$/,
            message: 'Geçerli bir ad soyad giriniz (en az 2 karakter)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Geçerli bir e-posta adresi giriniz'
        },
        phone: {
            required: false,
            pattern: /^[\d\s\-\+\(\)]+$/,
            message: 'Geçerli bir telefon numarası giriniz'
        },
        subject: {
            required: true,
            message: 'Lütfen bir konu seçiniz'
        },
        message: {
            required: true,
            minLength: 10,
            message: 'Mesajınız en az 10 karakter olmalıdır'
        }
    };

    // Real-time validation
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        if (!input) return;

        input.addEventListener('input', () => validateField(input, group));
        input.addEventListener('blur', () => validateField(input, group));
        input.addEventListener('focus', () => {
            group.classList.add('focused');
            clearValidationMessage(group);
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                group.classList.remove('focused');
            }
        });
    });

    // Form submission
    contactForm.addEventListener('submit', handleFormSubmit);

    function validateField(input, group) {
        const fieldName = input.name;
        const value = input.value.trim();
        const rules = validationRules[fieldName];
        
        if (!rules) return true;

        // Clear previous states
        group.classList.remove('error', 'success');
        clearValidationMessage(group);

        // Required validation
        if (rules.required && !value) {
            showFieldError(group, 'Bu alan zorunludur');
            return false;
        }

        // Skip other validations if field is empty and not required
        if (!value && !rules.required) {
            return true;
        }

        // Pattern validation
        if (rules.pattern && !rules.pattern.test(value)) {
            showFieldError(group, rules.message);
            return false;
        }

        // Min length validation
        if (rules.minLength && value.length < rules.minLength) {
            showFieldError(group, rules.message);
            return false;
        }

        // Field is valid
        showFieldSuccess(group);
        return true;
    }

    function showFieldError(group, message) {
        group.classList.add('error');
        
        let validationMsg = group.querySelector('.validation-message');
        if (!validationMsg) {
            validationMsg = document.createElement('div');
            validationMsg.className = 'validation-message';
            group.appendChild(validationMsg);
        }
        
        validationMsg.textContent = message;
    }

    function showFieldSuccess(group) {
        group.classList.add('success');
    }

    function clearValidationMessage(group) {
        const validationMsg = group.querySelector('.validation-message');
        if (validationMsg) {
            validationMsg.textContent = '';
        }
        group.classList.remove('error');
    }

    function validateForm() {
        let isValid = true;
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea, select');
            if (input && !validateField(input, group)) {
                isValid = false;
            }
        });

        return isValid;
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            showFormMessage('Lütfen tüm alanları doğru şekilde doldurunuz.', 'error');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            formGroups.forEach(group => {
                group.classList.remove('focused', 'error', 'success');
                clearValidationMessage(group);
            });

            // Reset button
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;

            // Show success message
            showFormMessage('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
        }, 2000);
    }

    function showFormMessage(message, type) {
        // Remove existing message
        const existingMessage = contactForm.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;

        // Insert at the beginning of the form
        contactForm.insertBefore(messageDiv, contactForm.firstChild);

        // Show message
        setTimeout(() => {
            messageDiv.classList.add('show');
        }, 100);

        // Auto hide after 5 seconds
        setTimeout(() => {
            messageDiv.classList.remove('show');
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 300);
        }, 5000);
    }
}

// Initialize enhanced contact form
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

// Project filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease-in';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// FAQ functionality
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('i');
        
        // Close all other FAQ items
        faqQuestions.forEach(otherQuestion => {
            if (otherQuestion !== question) {
                const otherAnswer = otherQuestion.nextElementSibling;
                const otherIcon = otherQuestion.querySelector('i');
                otherAnswer.classList.remove('active');
                otherIcon.style.transform = 'rotate(0deg)';
            }
        });
        
        // Toggle current FAQ item
        answer.classList.toggle('active');
        icon.style.transform = answer.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.product-card, .category-card, .team-member, .testimonial-card, .project-item, .contact-card, .feature-item, .social-card, .stat-item, .mv-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Product card hover effects
document.querySelectorAll('.product-card, .category-card, .project-item, .contact-card, .feature-item, .social-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Back to top button functionality
// Eski scroll to top butonu kaldırıldı - sadece modern floating action button kullanılıyor

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat h3, .stat-item h3, .stat-card h3');
    
    counters.forEach(counter => {
        const text = counter.textContent;
        const number = parseInt(text.replace(/[^0-9]/g, ''));
        const suffix = text.replace(/[0-9]/g, '');
        
        if (!isNaN(number)) {
            const increment = number / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < number) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + suffix;
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = number + suffix;
                }
            };
            
            updateCounter();
        }
    });
};

// Trigger counter animation when stats section is visible
const statsSections = document.querySelectorAll('.stats-section, .project-stats-section, .quick-about-stats');
statsSections.forEach(section => {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(section);
});

// Add loading states to buttons
document.querySelectorAll('button, .cta-button, .submit-btn').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.classList.remove('loading');
                this.style.pointerEvents = 'auto';
            }, 2000);
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add CSS for loading states and animations
const style = document.createElement('style');
style.textContent = `
    .loading {
        position: relative;
        overflow: hidden;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        animation: loading 1.5s infinite;
    }
    
    @keyframes loading {
        0% { left: -100%; }
        100% { left: 100%; }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fa-spin {
        animation: fa-spin 1s infinite linear;
    }
    
    @keyframes fa-spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Active navigation highlighting
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
        link.classList.add('active');
    }
});

// Social media links functionality
document.querySelectorAll('.social-card').forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        // Add your social media URLs here
        const platform = card.querySelector('h3').textContent.toLowerCase();
        alert(`${platform} sayfamız yakında açılacak!`);
    });
});

// Map placeholder click functionality
const mapPlaceholder = document.querySelector('.map-placeholder');
if (mapPlaceholder) {
    mapPlaceholder.addEventListener('click', () => {
        // You can integrate Google Maps or OpenStreetMap here
        alert('Harita özelliği yakında eklenecek!');
    });
}

// Product feature tooltips
document.querySelectorAll('.product-feature').forEach(feature => {
    feature.addEventListener('mouseenter', function() {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDarkMode) {
            this.style.background = 'rgba(74, 144, 226, 0.3)';
            this.style.color = 'var(--primary-color)';
            this.style.borderColor = 'var(--primary-color)';
        } else {
            this.style.background = '#007bff';
            this.style.color = 'white';
        }
    });
    
    feature.addEventListener('mouseleave', function() {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDarkMode) {
            this.style.background = 'rgba(255, 255, 255, 0.1)';
            this.style.color = 'var(--text-secondary)';
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        } else {
            this.style.background = '#f8f9fa';
            this.style.color = '#666';
        }
    });
});

// Category features hover effect
document.querySelectorAll('.category-features li').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.color = '#007bff';
        this.style.paddingLeft = '2rem';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.color = '#666';
        this.style.paddingLeft = '1.5rem';
    });
});

// Transport item hover effect
document.querySelectorAll('.transport-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.background = '#e9ecef';
        this.style.transform = 'translateX(10px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.background = '#f8f9fa';
        this.style.transform = 'translateX(0)';
    });
});

// Project stats hover effect
document.querySelectorAll('.project-stats .stat').forEach(stat => {
    stat.addEventListener('mouseenter', function() {
        this.style.background = '#007bff';
        this.style.color = 'white';
    });
    
    stat.addEventListener('mouseleave', function() {
        this.style.background = '#f8f9fa';
        this.style.color = 'inherit';
    });
});

// Initialize all interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add any additional initialization code here
    
    // Smooth reveal animation for page content
    const pageContent = document.querySelector('body');
    if (pageContent) {
        pageContent.style.opacity = '0';
        setTimeout(() => {
            pageContent.style.transition = 'opacity 0.5s ease';
            pageContent.style.opacity = '1';
        }, 100);
    }
});

// --- HERO SLIDER ---
(function() {
    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-btn-prev');
    const nextBtn = document.querySelector('.slider-btn-next');
    const pauseBtn = document.querySelector('.slider-pause');
    let current = 0;
    let interval = null;
    let paused = false;
    let titleTimeout = null;

    // Video tamamlanma kontrolü için event listener ekle
    slides.forEach((slide, index) => {
        const video = slide.querySelector('.slider-video');
        if (video) {
            video.addEventListener('ended', () => {
                if (!paused) {
                    nextSlide();
                }
            });
        }
    });

    // Başlığı göster/gizle fonksiyonu
    function toggleTitle(slide, show) {
        const content = slide.querySelector('.slider-content');
        if (content) {
            content.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            if (show) {
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            } else {
                content.style.opacity = '0';
                content.style.transform = 'translateY(20px)';
            }
        }
    }

    function showSlide(idx) {
        // Önceki timeout'u temizle
        if (titleTimeout) {
            clearTimeout(titleTimeout);
        }

        slides.forEach((slide, i) => {
            const video = slide.querySelector('.slider-video');
            if (video) {
                if (i === idx) {
                    video.currentTime = 0;
                    video.play();
                    // Aktif slide'ın başlığını göster
                    toggleTitle(slide, true);
                    // 10 saniye sonra başlığı gizle
                    titleTimeout = setTimeout(() => {
                        if (!paused) {
                            toggleTitle(slide, false);
                        }
                    }, 10000);
                } else {
                    video.pause();
                    // Diğer slide'ların başlıklarını gizle
                    toggleTitle(slide, false);
                }
            }
            slide.classList.toggle('active', i === idx);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === idx);
        });
        current = idx;
    }

    function nextSlide() {
        let next = (current + 1) % slides.length;
        showSlide(next);
    }

    function prevSlide() {
        let prev = (current - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    function pauseSlider() {
        paused = !paused;
        const currentVideo = slides[current].querySelector('.slider-video');
        const currentSlide = slides[current];
        
        if (paused) {
            pauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            if (currentVideo) currentVideo.pause();
            // Duraklatıldığında başlığı göster
            toggleTitle(currentSlide, true);
            // Timeout'u temizle
            if (titleTimeout) {
                clearTimeout(titleTimeout);
            }
        } else {
            pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            if (currentVideo) currentVideo.play();
            // Devam edildiğinde 10 saniye sayacı yeniden başlat
            if (titleTimeout) {
                clearTimeout(titleTimeout);
            }
            titleTimeout = setTimeout(() => {
                toggleTitle(currentSlide, false);
            }, 10000);
        }
    }

    // Event Listeners
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); });
    if (pauseBtn) pauseBtn.addEventListener('click', pauseSlider);
    
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlide(i);
        });
    });

    // Swipe support for mobile
    let startX = null;
    document.querySelector('.slider-container')?.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    document.querySelector('.slider-container')?.addEventListener('touchend', (e) => {
        if (startX === null) return;
        let endX = e.changedTouches[0].clientX;
        if (endX - startX > 50) { prevSlide(); }
        else if (startX - endX > 50) { nextSlide(); }
        startX = null;
    });

    // İlk videoyu başlat
    showSlide(0);

    // Otomatik geçiş için interval başlat
    interval = setInterval(() => {
        if (!paused) {
            nextSlide();
        }
    }, 18000); // 18 saniye

    // Mouse hover özelliği kaldırıldı
})();

// --- /HERO SLIDER ---

// Feature Modal İçerikleri
const featureContents = {
    lighting: {
        title: 'Lighting',
        desc: 'From stadium-filling concerts to private parties, theme parks to church services, our range of lighting consoles puts powerful, expressive lighting control at your fingertips. With full networking across the range, as well as our unique Synergy integration with Ai, we have all the power you\'ll ever need.',
        img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
        btn: 'View Lighting Products',
        link: '#'
    },
    media: {
        title: 'Media',
        desc: 'Our AI media server range is unique in that we combine an intuitive and beautiful interface with the flexibility required for the most demanding shows.',
        img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
        btn: 'View Media Products',
        link: '#'
    },
    network: {
        title: 'Network',
        desc: 'Today\'s lighting systems are all about connectivity and collaboration, with mission-critical reliability. Our network products provide increased processing.',
        img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        btn: 'View Network Products',
        link: '#'
    },
    dimming: {
        title: 'Dimming',
        desc: 'We\'ve been producing industry-standard touring dimming and power distribution systems since 1976. Our latest generation is built around reliability and flexibility.',
        img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
        btn: 'View Dimming Products',
        link: '#'
    }
};

const featureCardsViz = document.querySelectorAll('.feature-card-viz');
const featureModal = document.getElementById('feature-modal');
const featureModalBody = document.getElementById('feature-modal-body');
const featureModalClose = document.querySelector('.feature-modal-close');

featureCardsViz.forEach(card => {
    card.addEventListener('click', function() {
        const key = this.getAttribute('data-feature');
        const content = featureContents[key];
        if (content) {
            featureModalBody.innerHTML = `
                <img src="${content.img}" alt="${content.title}" style="width:100%;max-height:260px;object-fit:cover;border-radius:12px 12px 0 0;margin-bottom:18px;">
                <h2 style="margin-bottom:12px;">${content.title}</h2>
                <p style="font-size:1.15rem;line-height:1.6;">${content.desc}</p>
                <a href="${content.link}" class="feature-modal-btn">${content.btn}</a>
            `;
            featureModal.classList.add('active');
        }
    });
});

if (featureModalClose) {
    featureModalClose.addEventListener('click', function() {
        featureModal.classList.remove('active');
    });
}

window.addEventListener('click', function(e) {
    if (e.target === featureModal) {
        featureModal.classList.remove('active');
    }
});

// Sayaç animasyonu (Quick About Stats)
function animateCounter(el, target, duration = 1500) {
    let start = 0;
    let startTime = null;
    const plus = target.toString().includes('+');
    target = parseInt(target);
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = Math.floor(progress * (target - start) + start);
        el.textContent = value + (plus ? '+' : '');
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            el.textContent = target + (plus ? '+' : '');
        }
    }
    requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.quick-about-stats .stat-number').forEach(el => {
        const value = el.textContent.trim();
        const target = value.replace(/\D/g, '') + (value.includes('+') ? '+' : '');
        animateCounter(el, target);
    });
});

// Project Details Data
const projectDetails = {
    'Büyükyalı Performance Hall': {
        title: 'Büyükyalı Performance Hall',
        date: 'Eylül, 2022',
        client: 'Büyükyalı',
        tags: ['Case Sistemleri', 'Altyapı Sistemleri'],
        gallery: [
            'https://argostr.com/wp-content/uploads/2023/09/2-1.jpeg',
            'https://argostr.com/wp-content/uploads/2023/09/3-1.jpeg'
        ]
    },
    'Cumhurbaşkanlığı Külliyesi': {
        title: 'Cumhurbaşkanlığı Külliyesi',
        date: 'Ocak, 2015',
        client: 'AKM',
        tags: ['Güç Sistemleri', 'Altyapı Sistemleri'],
        gallery: [
            'https://argostr.com/wp-content/uploads/2023/09/2.jpg',
            'https://argostr.com/wp-content/uploads/2023/09/1-3.jpg',
            'https://argostr.com/wp-content/uploads/2023/09/3.jpg',
            'https://argostr.com/wp-content/uploads/2023/10/1.jpg'
        ]
    },
    'Zorlu Performans Sanatları Merkezi PSM': {
        title: 'Zorlu Performans Sanatları Merkezi PSM',
        date: 'Haziran, 2018',
        client: 'Zorlu PSM',
        tags: ['Case Sistemleri', 'Güç Sistemleri'],
        gallery: [
            'https://argostr.com/wp-content/uploads/2023/09/1-3.jpeg',
            'https://argostr.com/wp-content/uploads/2023/09/2-3.jpeg',
            'https://argostr.com/wp-content/uploads/2023/09/4-2.jpeg'
        ]
    },
    'Kuğu Gölü Davet': {
        title: 'Kuğu Gölü Davet',
        date: 'Temmuz, 2021',
        client: 'Kuğu Gölü',
        tags: ['Altyapı Sistemleri', 'Case Sistemleri'],
        gallery: [
            'https://argostr.com/wp-content/uploads/2023/09/4-1.jpeg',
            'https://argostr.com/wp-content/uploads/2023/09/K1.jpeg',
            'https://argostr.com/wp-content/uploads/2023/09/3-2.jpeg'
        ]
    },
    'Atatürk Kültür Merkezi': {
        title: 'Atatürk Kültür Merkezi',
        date: 'Ocak, 2015',
        client: 'AKM',
        tags: ['Case Sistemleri', 'Güç Sistemleri', 'Sahne & Podyum Sistemleri', 'Truss & Hareketli Motor Sistemleri'],
        gallery: [
            'https://argostr.com/wp-content/uploads/2023/10/1-2.jpeg',
            'https://argostr.com/wp-content/uploads/2023/10/2-1.jpeg',
            'https://argostr.com/wp-content/uploads/2023/10/3-1.jpeg',
            'https://argostr.com/wp-content/uploads/2023/10/4.jpeg',
            'https://argostr.com/wp-content/uploads/2023/10/5-1.jpeg',
            'https://argostr.com/wp-content/uploads/2023/10/6-1.jpeg',
            'https://argostr.com/wp-content/uploads/2023/10/7.jpeg',
            'https://argostr.com/wp-content/uploads/2023/10/8.jpeg'
        ]
    }
};

// Project modal init function
function initProjectModals() {
    // Test için basit bir alert ekleyelim
    console.log('Modal fonksiyonu çağrıldı');
    
    // Elementleri bul
    const projectModal = document.getElementById('project-modal');
    const projectModalBody = document.getElementById('project-modal-body');
    const projectModalClose = document.querySelector('.project-modal-close');
    
    // Eğer elementler yoksa fonksiyonu sonlandır
    if (!projectModal || !projectModalBody) {
        console.error('Modal elementleri bulunamadı');
        return;
    }
    
    // Proje kartlarını bul ve click event ekle
    document.querySelectorAll('.project-item').forEach(function(card) {
        card.style.cursor = 'pointer'; // Hover efekti için
                 card.addEventListener('click', function() {
             const title = this.querySelector('h3').textContent.trim();
            const detail = projectDetails[title];
            
            if (detail) {
                projectModalBody.innerHTML = `
                    <h2>${detail.title}</h2>
                    <div class="project-modal-info">
                        <div class="project-modal-meta">
                            <span><span class="meta-label">Tarih:</span> ${detail.date}</span>
                            <span><span class="meta-label">Müşteri:</span> ${detail.client}</span>
                            <div class="project-modal-tags">
                                ${detail.tags.map(tag => `<span class="project-modal-tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="project-modal-gallery">
                        ${detail.gallery.map(img => `<img src="${img}" alt="${detail.title}">`).join('')}
                    </div>
                `;
                projectModal.classList.add('active');
            }
        });
    });
    
    // Modal kapatma
    if (projectModalClose) {
        projectModalClose.addEventListener('click', function() {
            projectModal.classList.remove('active');
        });
    }
    
    // Overlay'e tıklandığında modal'ı kapat
    window.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            projectModal.classList.remove('active');
        }
    });
}

// Lightbox (slayt) modal
let lightboxModal = document.getElementById('lightbox-modal');
if (!lightboxModal) {
    lightboxModal = document.createElement('div');
    lightboxModal.id = 'lightbox-modal';
    lightboxModal.className = 'lightbox-modal';
    lightboxModal.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-img" src="" alt="">
        <div class="lightbox-nav">
            <button class="lightbox-prev">&#10094;</button>
            <button class="lightbox-next">&#10095;</button>
        </div>
    `;
    document.body.appendChild(lightboxModal);
}
const lightboxImg = lightboxModal.querySelector('.lightbox-img');
const lightboxClose = lightboxModal.querySelector('.lightbox-close');
const lightboxPrev = lightboxModal.querySelector('.lightbox-prev');
const lightboxNext = lightboxModal.querySelector('.lightbox-next');
let lightboxImages = [];
let lightboxIndex = 0;

function openLightbox(images, index) {
    lightboxImages = images;
    lightboxIndex = index;
    lightboxImg.src = images[index];
    lightboxModal.classList.add('active');
}
function showLightbox(idx) {
    if (idx < 0) idx = lightboxImages.length - 1;
    if (idx >= lightboxImages.length) idx = 0;
    lightboxIndex = idx;
    lightboxImg.src = lightboxImages[lightboxIndex];
}
lightboxPrev.onclick = () => showLightbox(lightboxIndex - 1);
lightboxNext.onclick = () => showLightbox(lightboxIndex + 1);
lightboxClose.onclick = () => lightboxModal.classList.remove('active');
lightboxModal.onclick = (e) => { if (e.target === lightboxModal) lightboxModal.classList.remove('active'); };

document.addEventListener('click', function(e) {
    if (e.target.closest('.project-modal-gallery img')) {
        const imgs = Array.from(e.target.closest('.project-modal-gallery').querySelectorAll('img'));
        const idx = imgs.indexOf(e.target);
        openLightbox(imgs.map(img => img.src), idx);
    }
});

// Modern Animation & Interaction Script



// Apply scroll animations to elements
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.section-title, .section-desc, .feature-card-viz, .product-card, .stat-box, .category-card');
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        scrollObserver.observe(el);
    });
}

// Counter Animation for Statistics (duplicate removed)

// Enhanced Statistics Counter with Intersection Observer
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Apply stats animation
function initStatsAnimation() {
    const statsSection = document.querySelector('.quick-about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// Smooth Scrolling for Internal Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Parallax Effect for Background Elements
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    });
}

// Enhanced Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            header.style.transform = 'translateY(0)';
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scrolling Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
            header.style.transform = 'translateY(-100%)';
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scrolling Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// Interactive Hover Effects for Cards
function initCardInteractions() {
    const cards = document.querySelectorAll('.feature-card-viz, .product-card, .category-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
}

// Dynamic Gradient Text Animation
function initGradientText() {
    const titles = document.querySelectorAll('.section-title');
    titles.forEach(title => {
        if (!title.classList.contains('gradient-text')) {
            title.classList.add('gradient-text');
        }
    });
}

// Loading Animation for Images
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (!img.complete) {
            img.classList.add('shimmer');
            img.addEventListener('load', function() {
                this.classList.remove('shimmer');
            });
        }
    });
}

// Enhanced Button Ripple Effect
function initButtonRipple() {
    const buttons = document.querySelectorAll('.cta-button, .slider-btn, .learn-more-btn, .submit-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Form Enhancement
function initFormEnhancements() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Floating label effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Auto-expand textarea
        if (input.tagName.toLowerCase() === 'textarea') {
            input.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = this.scrollHeight + 'px';
            });
        }
    });
}

// Mouse Follow Effect - Disabled (removed by user request)



// Dark Mode Sistemi
function initDarkMode() {
    console.log('Dark mode sistemi başlatılıyor...');
    
    // LocalStorage'dan tema tercihini al
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // İlk tema ayarı
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    
    // Toggle butonu oluştur
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Tema değiştir');
    themeToggle.title = 'Açık/Koyu tema değiştir';
    
    // Navigation'a ekle
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.appendChild(themeToggle);
    }
    
    // Toggle butonuna click event ekle
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
    
    console.log('Dark mode sistemi kuruldu!');
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Header background'ını güncelle
    updateHeaderBackground(theme);
    
    // Duman efektini dark mode'a göre ayarla
    updateSmokeEffect(theme);
    
    // Background image'ları dark mode'da zorla göster
    forceBackgroundImages(theme);
    
    console.log(`Tema ${theme} olarak ayarlandı`);
}

// Header background'ını tema değişikliği sırasında güncelle
function updateHeaderBackground(theme) {
    const header = document.querySelector('.header');
    if (header) {
        const isDarkMode = theme === 'dark';
        
        if (window.scrollY > 100) {
            if (isDarkMode) {
                header.style.background = 'rgba(26, 26, 26, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(255, 255, 255, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        } else {
            if (isDarkMode) {
                header.style.background = 'rgba(26, 26, 26, 0.95)';
                header.style.boxShadow = 'none';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        }
    }
}

// Background image'ları dark mode'da zorla görünür yap
function forceBackgroundImages(theme) {
    if (theme === 'dark') {
        // Feature card'ları bul ve background image'ları zorla ayarla
        const featureCards = document.querySelectorAll('.feature-card-viz[style*="background-image"]');
        
        featureCards.forEach(card => {
            const originalStyle = card.getAttribute('style');
            if (originalStyle && originalStyle.includes('background-image')) {
                // Background image URL'sini çıkar
                const bgImageMatch = originalStyle.match(/background-image:\s*url\(['"]?([^'"]*?)['"]?\)/);
                if (bgImageMatch) {
                    const imageUrl = bgImageMatch[1];
                    
                    // Inline style ile zorla ayarla
                    card.style.setProperty('background-image', `url('${imageUrl}')`, 'important');
                    card.style.setProperty('background-size', 'cover', 'important');
                    card.style.setProperty('background-position', 'center', 'important');
                    card.style.setProperty('background-repeat', 'no-repeat', 'important');
                    
                    console.log(`Background image zorla ayarlandı: ${imageUrl}`);
                }
            }
        });
        
        // Slider slide'ları da kontrol et
        const sliderSlides = document.querySelectorAll('.slider-slide[style*="background-image"]');
        sliderSlides.forEach(slide => {
            const originalStyle = slide.getAttribute('style');
            if (originalStyle && originalStyle.includes('background-image')) {
                const bgImageMatch = originalStyle.match(/background-image:\s*url\(['"]?([^'"]*?)['"]?\)/);
                if (bgImageMatch) {
                    const imageUrl = bgImageMatch[1];
                    slide.style.setProperty('background-image', `url('${imageUrl}')`, 'important');
                    slide.style.setProperty('background-size', 'cover', 'important');
                    slide.style.setProperty('background-position', 'center', 'important');
                    console.log(`Slider background image zorla ayarlandı: ${imageUrl}`);
                }
            }
        });
    }
}

function updateSmokeEffect(theme) {
    const smokeParticles = document.querySelectorAll('.smoke-particle');
    smokeParticles.forEach(particle => {
        if (theme === 'dark') {
            // Dark mode'da daha açık gri duman
            const width = parseInt(particle.style.width);
            const height = parseInt(particle.style.height);
            const opacity1 = (Math.random() * 0.4 + 0.2).toFixed(2); // 0.2-0.6 arası
            const opacity2 = (Math.random() * 0.3 + 0.1).toFixed(2); // 0.1-0.4 arası
            const opacity3 = (Math.random() * 0.2 + 0.05).toFixed(2); // 0.05-0.25 arası
            
            particle.style.background = `
                radial-gradient(ellipse ${width*0.8}px ${height*0.6}px at 30% 20%, rgba(220,220,220,${opacity1}) 0%, transparent 60%),
                radial-gradient(ellipse ${width*0.6}px ${height*0.5}px at 70% 60%, rgba(200,200,200,${opacity2}) 0%, transparent 50%),
                radial-gradient(ellipse ${width*0.4}px ${height*0.3}px at 50% 80%, rgba(180,180,180,${opacity3}) 0%, transparent 40%)
            `;
        } else {
            // Light mode'da daha koyu gri duman
            const width = parseInt(particle.style.width);
            const height = parseInt(particle.style.height);
            const opacity1 = (Math.random() * 0.3 + 0.1).toFixed(2); // 0.1-0.4 arası
            const opacity2 = (Math.random() * 0.2 + 0.05).toFixed(2); // 0.05-0.25 arası
            const opacity3 = (Math.random() * 0.15 + 0.02).toFixed(2); // 0.02-0.17 arası
            
            particle.style.background = `
                radial-gradient(ellipse ${width*0.8}px ${height*0.6}px at 30% 20%, rgba(160,160,160,${opacity1}) 0%, transparent 60%),
                radial-gradient(ellipse ${width*0.6}px ${height*0.5}px at 70% 60%, rgba(140,140,140,${opacity2}) 0%, transparent 50%),
                radial-gradient(ellipse ${width*0.4}px ${height*0.3}px at 50% 80%, rgba(120,120,120,${opacity3}) 0%, transparent 40%)
            `;
        }
    });
}

// Duman Efekti İnisialisasyonu
function initSmokeEffect() {
    console.log('Duman efekti başlatılıyor...');
    
    const smokeContainer = document.createElement('div');
    smokeContainer.className = 'smoke-container';
    document.body.appendChild(smokeContainer);
    
    console.log('Duman container oluşturuldu');
    
    // 15 adet organik duman partiküsü oluştur
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'smoke-particle';
        
        // Rastgele pozisyon ve organik boyutlar
        const leftPos = Math.random() * 100;
        const width = Math.random() * 80 + 60; // 60-140px arası genişlik
        const height = Math.random() * 40 + 30; // 30-70px arası yükseklik (daha az)
        const delay = Math.random() * 15; // 0-15s arası gecikme
        
        particle.style.left = leftPos + '%';
        particle.style.width = width + 'px';
        particle.style.height = height + 'px';
        particle.style.animationDelay = `-${delay}s`;
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's'; // 15-25s arası (daha yavaş)
        
        // Organik duman görünümü
        const opacity1 = (Math.random() * 0.3 + 0.1).toFixed(2); // 0.1-0.4 arası
        const opacity2 = (Math.random() * 0.2 + 0.05).toFixed(2); // 0.05-0.25 arası
        const opacity3 = (Math.random() * 0.15 + 0.02).toFixed(2); // 0.02-0.17 arası
        
        particle.style.background = `
            radial-gradient(ellipse ${width*0.8}px ${height*0.6}px at 30% 20%, rgba(160,160,160,${opacity1}) 0%, transparent 60%),
            radial-gradient(ellipse ${width*0.6}px ${height*0.5}px at 70% 60%, rgba(140,140,140,${opacity2}) 0%, transparent 50%),
            radial-gradient(ellipse ${width*0.4}px ${height*0.3}px at 50% 80%, rgba(120,120,120,${opacity3}) 0%, transparent 40%)
        `;
        
        // Organik border-radius
        const r1 = Math.random() * 30 + 20;
        const r2 = Math.random() * 20 + 10;
        const r3 = Math.random() * 25 + 15;
        const r4 = Math.random() * 15 + 5;
        particle.style.borderRadius = `${r1}px ${r2}px ${r3}px ${r4}px`;
        
        smokeContainer.appendChild(particle);
        console.log(`Organik duman partiküsü ${i+1} oluşturuldu`);
    }
    
    console.log('Duman efekti başarıyla oluşturuldu!');
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', function() {
    initDarkMode(); // Dark mode'u ilk önce başlat
    
    // Sayfa yüklendiğinde mevcut tema ile background image'ları kontrol et
    const currentTheme = localStorage.getItem('theme') || 'light';
    setTimeout(() => {
        forceBackgroundImages(currentTheme);
    }, 100);
    
    initScrollAnimations();
    initStatsAnimation();
    initSmoothScrolling();
    initParallax();
    initHeaderScroll();
    initCardInteractions();
    initGradientText();
    initImageLoading();
    initButtonRipple();
    initFormEnhancements();

    initProjectModals();
    initSmokeEffect(); // Duman efektini başlat
    initHighlightsCarousel(); // Öne Çıkanlar carousel'i başlat
    
    console.log('🚀 Argos - Tüm modern özellikler yüklendi!');
});

// Performance Optimization
if ('IntersectionObserver' in window) {
    // Use Intersection Observer for better performance
} else {
    // Fallback for older browsers
    console.warn('Intersection Observer desteklenmiyor, temel animasyonlar kullanılıyor.');
}

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Magnetic Button Effect
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.magnetic-btn, .cta-button, .slider-btn');
    
    magneticButtons.forEach(button => {
        if (window.innerWidth <= 768) return; // Skip on mobile
        
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 50;
            
            if (distance < maxDistance) {
                const strength = (maxDistance - distance) / maxDistance;
                const moveX = x * strength * 0.3;
                const moveY = y * strength * 0.3;
                
                button.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0px, 0px)';
        });
    });
}

// Notification System
function showNotification(message, type = 'info', duration = 5000) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto hide
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, duration);
}

// Enhanced FAQ Functionality
function initAdvancedFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;
        
        question.addEventListener('click', () => {
            const isActive = answer.classList.contains('active');
            
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                otherItem.querySelector('.faq-answer').classList.remove('active');
                otherItem.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
            });
            
            // Toggle current FAQ
            if (!isActive) {
                answer.classList.add('active');
                question.querySelector('i').style.transform = 'rotate(180deg)';
            }
        });
    });
}

// Image Lazy Loading with Intersection Observer
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('skeleton');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.classList.add('skeleton');
        imageObserver.observe(img);
    });
}

// Floating Action Button
function initFloatingActionButton() {
    const fab = document.createElement('div');
    fab.innerHTML = `
        <div class="floating-action-btn" style="
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background: var(--primary-gradient);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            cursor: pointer;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            transform: scale(0);
            transition: all 0.3s ease;
        ">
            <i class="fas fa-arrow-up"></i>
        </div>
    `;
    
    document.body.appendChild(fab);
    
    const fabButton = document.querySelector('.floating-action-btn');
    
    // Show/hide based on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            fabButton.style.transform = 'scale(1)';
        } else {
            fabButton.style.transform = 'scale(0)';
        }
    });
    
    // Scroll to top functionality
    fabButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Text Animation on Scroll
function initTextAnimations() {
    const animatedTexts = document.querySelectorAll('.section-title, .hero-title');
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('text-reveal');
                textObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    animatedTexts.forEach(text => {
        textObserver.observe(text);
    });
}

// Load testimonials from dataset
function loadTestimonials() {
    const testimonialsContainer = document.getElementById('testimonials-container');
    
    if (!testimonialsContainer || typeof dataset === 'undefined') return;
    
    // Clear existing content
    testimonialsContainer.innerHTML = '';
    
    // Create testimonial cards from dataset
    dataset.customerMessages.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        
        testimonialCard.innerHTML = `
            <div class="testimonial-content">
                <p>"${testimonial.description}"</p>
            </div>
            <div class="testimonial-author">
                <h4>${testimonial.owner}</h4>
                <span>${testimonial.company} - ${testimonial.title}</span>
            </div>
        `;
        
        testimonialsContainer.appendChild(testimonialCard);
    });
}

// Load project stats from dataset
function loadProjectStats() {
    const statsContainer = document.getElementById('project-stats-container');
    
    if (!statsContainer || typeof dataset === 'undefined' || !dataset.projects || !dataset.projects.counters) return;
    
    // Clear existing content
    statsContainer.innerHTML = '';
    
    // Stats configuration with icons and labels
    const statsConfig = [
        {
            key: 'completedProjects',
            icon: 'fas fa-project-diagram',
            label: 'Tamamlanan Proje'
        },
        {
            key: 'cities',
            icon: 'fas fa-map-marker-alt',
            label: 'Şehir'
        },
        {
            key: 'capacity',
            icon: 'fas fa-users',
            label: 'Toplam Kapasite'
        },
        {
            key: 'satisfiedCustomers',
            icon: 'fas fa-star',
            label: 'Müşteri Memnuniyeti'
        }
    ];
    
    // Create stat cards from dataset
    statsConfig.forEach(stat => {
        const statValue = dataset.projects.counters[stat.key];
        
        if (statValue) {
            const statCard = document.createElement('div');
            statCard.className = 'stat-card';
            
            statCard.innerHTML = `
                <div class="stat-icon">
                    <i class="${stat.icon}"></i>
                </div>
                <h3>${statValue}</h3>
                <p>${stat.label}</p>
            `;
            
            statsContainer.appendChild(statCard);
        }
    });
}

// Initialize all advanced features
document.addEventListener('DOMContentLoaded', function() {
    initScrollProgress();
    initMagneticButtons();
    initAdvancedFAQ();
    initLazyLoading();
    initFloatingActionButton();
    initTextAnimations();
    initProjectModals();
    loadTestimonials(); // Load testimonials from dataset
    loadProjectStats(); // Load project stats from dataset
    
    // Welcome notification disabled (removed by user request)
});

// Öne Çıkanlar Carousel İşlevselliği
function initHighlightsCarousel() {
    const highlightsGrid = document.querySelector('.highlights-grid');
    const prevBtn = document.querySelector('.highlight-prev');
    const nextBtn = document.querySelector('.highlight-next');
    
    if (!highlightsGrid || !prevBtn || !nextBtn) return;
    
    const cards = highlightsGrid.querySelectorAll('.highlight-card');
    const cardWidth = 315; // Kart genişliği + gap (300 + 15)
    let currentIndex = 0;
    let isScrolling = false;
    
    // Responsive kontrol
    function isMobile() {
        return window.innerWidth <= 600;
    }
    
    function updateCarousel() {
        if (isMobile()) {
            // Mobil cihazlarda normal grid layout
            highlightsGrid.style.transform = '';
            highlightsGrid.style.scrollBehavior = 'smooth';
            return;
        }
        
        // Desktop'ta carousel işlevselliği - tek kart kaydırma
        const visibleCards = 4;
        const maxIndex = Math.max(0, cards.length - visibleCards);
        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
        
        // Her adımda bir kart kaydır
        const translateX = -(currentIndex * cardWidth);
        highlightsGrid.style.transform = `translateX(${translateX}px)`;
        
        // Buton durumları
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        if (!isScrolling && currentIndex > 0) {
            isScrolling = true;
            currentIndex--;
            updateCarousel();
            setTimeout(() => { isScrolling = false; }, 300);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const maxIndex = Math.max(0, cards.length - 4);
        if (!isScrolling && currentIndex < maxIndex) {
            isScrolling = true;
            currentIndex++;
            updateCarousel();
            setTimeout(() => { isScrolling = false; }, 300);
        }
    });
    
    // Responsive güncelleme
    window.addEventListener('resize', () => {
        updateCarousel();
    });
    
    // İlk yükleme
    updateCarousel();
    
    console.log('Öne Çıkanlar carousel sistemi başlatıldı');
}

// Resim galerisi için görsel dizisi
const productImages = {
    'abs-rack-case': [
        'https://argostr.com/wp-content/uploads/2023/10/1.jpeg.webp',
        'https://argostr.com/wp-content/uploads/2023/10/2.jpeg.webp',
        'https://argostr.com/wp-content/uploads/2023/10/3.jpeg.webp'
    ]
};

let currentImageIndex = 0;

// Resim değiştirme fonksiyonu
function changeImage(productId, direction) {
    const images = productImages[productId];
    if (!images) return;
    
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
    const modal = document.getElementById(`modal-${productId}`);
    const mainImage = modal.querySelector('.modal-main-image');
    mainImage.src = images[currentImageIndex];
}

// Modal işlevselliği
document.addEventListener('DOMContentLoaded', function() {
    // Modal açma
    const galleryCards = document.querySelectorAll('.gallery-card');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    // Kartlara tıklama
    galleryCards.forEach(card => {
        card.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Scroll'u kapat
            }
        });
    });

    // Kapatma butonları
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Scroll'u aç
            }
        });
    });

    // Modal dışına tıklama
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = "none";
            document.body.style.overflow = "auto"; // Scroll'u aç
        }
    });

    // Modal içindeki küçük resimlere tıklama
    modals.forEach(modal => {
        const mainImage = modal.querySelector('.modal-main-image');
        const thumbnails = modal.querySelectorAll('.gallery-grid img');
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Ana resmi güncelle
                mainImage.src = this.src;
                mainImage.alt = this.alt;
                
                // Aktif thumbnail'i güncelle
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    });
});

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
    document.body.style.overflow = "auto";
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// Close modal with escape key
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        const modals = document.getElementsByClassName('modal');
        for (let modal of modals) {
            if (modal.style.display === "flex") {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        }
    }
});

// Accordion işlevselliği
document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.accordion-item.active');
            
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            
            item.classList.toggle('active');
        });
    });
});

// Dark mode varsayılan olarak ayarla
document.addEventListener('DOMContentLoaded', function() {
    // Sayfa yüklendiğinde dark mode'u etkinleştir
    document.documentElement.setAttribute('data-theme', 'dark');
    
    // Local storage'a dark mode tercihini kaydet
    localStorage.setItem('theme', 'dark');
}); 