// DOM Elements
const discoverBtn = document.getElementById('discover-btn');
const formOverlay = document.getElementById('form-overlay');
const closeFormBtn = document.getElementById('close-form');
const vibrationForm = document.getElementById('vibration-form');
const resultOverlay = document.getElementById('result-overlay');
const closeResultBtn = document.getElementById('close-result');
const symbolDisplay = document.getElementById('symbol-display');
const symbolName = document.getElementById('symbol-name');
const message = document.getElementById('message');
const productImage = document.getElementById('product-image');
const particlesContainer = document.getElementById('particles');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

// Mystical Symbols Database
const mysticalSymbols = [
    {
        name: 'The Seeker',
        description: 'You are on a path of discovery. The universe rewards those who are willing to explore its mysteries.',
        symbol: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" stroke="#C1A162" stroke-width="1" fill="none" /><path d="M30,50 L70,50 M50,30 L50,70" stroke="#C1A162" stroke-width="1" /><circle cx="50" cy="50" r="10" stroke="#C1A162" stroke-width="1" fill="none" /></svg>',
        productImage: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="60" height="60" fill="#1C1C1C" /><circle cx="50" cy="50" r="20" stroke="#C1A162" stroke-width="1" fill="none" /><path d="M40,50 L60,50 M50,40 L50,60" stroke="#C1A162" stroke-width="1" /></svg>'
    },
    {
        name: 'The Flame',
        description: 'Your inner light burns brightly. Let it guide you through darkness and illuminate others on their journey.',
        symbol: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,20 C60,40 70,50 50,80 C30,50 40,40 50,20" stroke="#C1A162" stroke-width="1" fill="none" /><circle cx="50" cy="60" r="5" stroke="#C1A162" stroke-width="1" fill="none" /></svg>',
        productImage: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="60" height="60" fill="#1C1C1C" /><path d="M50,30 C55,40 60,45 50,70 C40,45 45,40 50,30" stroke="#C1A162" stroke-width="1" /></svg>'
    },
    {
        name: 'The Mirror',
        description: 'You reflect the truth of existence. In your reflection, others find their authentic selves.',
        symbol: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="35" y="30" width="30" height="40" stroke="#C1A162" stroke-width="1" fill="none" /><path d="M35,70 L30,75 L70,75 L65,70" stroke="#C1A162" stroke-width="1" fill="none" /></svg>',
        productImage: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="60" height="60" fill="#1C1C1C" /><rect x="40" y="35" width="20" height="30" stroke="#C1A162" stroke-width="1" fill="none" /></svg>'
    },
    {
        name: 'The Vessel',
        description: 'You are a conduit for universal energy. Your capacity to receive and transform energy is boundless.',
        symbol: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M40,30 L40,70 C40,80 60,80 60,70 L60,30" stroke="#C1A162" stroke-width="1" fill="none" /><path d="M40,30 C40,20 60,20 60,30" stroke="#C1A162" stroke-width="1" fill="none" /></svg>',
        productImage: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="60" height="60" fill="#1C1C1C" /><path d="M40,35 L40,65 C40,70 60,70 60,65 L60,35" stroke="#C1A162" stroke-width="1" fill="none" /></svg>'
    },
    {
        name: 'The Compass',
        description: 'You have an innate sense of direction. Even in the most uncertain times, you find your true north.',
        symbol: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="30" stroke="#C1A162" stroke-width="1" fill="none" /><path d="M50,20 L50,80 M20,50 L80,50" stroke="#C1A162" stroke-width="1" /><path d="M50,50 L60,40" stroke="#C1A162" stroke-width="2" /></svg>',
        productImage: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="60" height="60" fill="#1C1C1C" /><circle cx="50" cy="50" r="20" stroke="#C1A162" stroke-width="1" fill="none" /><path d="M50,50 L60,40" stroke="#C1A162" stroke-width="1" /></svg>'
    }
];

// Motivational quotes
const motivationalQuotes = [
    "The journey within is the most sacred odyssey one can undertake.",
    "To understand the universe, look within yourself; for you are a microcosm of all that is.",
    "Your vibration attracts your reality. Raise your frequency to elevate your existence.",
    "The symbols that speak to you are reflections of your soul's deepest wisdom.",
    "In stillness, we find the language of the cosmos speaking through us.",
    "The greatest mysteries are not hidden from us, but waiting to be discovered within us.",
    "Your energy is your signature in the universal tapestry of consciousness."
];

// Create particles
function createParticles() {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random styles for each particle
        particle.style.width = `${Math.random() * 4 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(${193 + Math.random() * 20}, ${161 + Math.random() * 20}, ${98 + Math.random() * 20}, ${Math.random() * 0.5 + 0.1})`;
        
        // Random positioning
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.left = `${Math.random() * 100}vw`;
        
        // Animation properties
        const duration = Math.random() * 50 + 30;
        const delay = Math.random() * 10;
        
        particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;
        
        particlesContainer.appendChild(particle);
    }
}

// Event Listeners
discoverBtn.addEventListener('click', () => {
    formOverlay.classList.add('active');
    setTimeout(() => {
        document.querySelector('.form-container').style.opacity = '1';
        document.querySelector('.form-container').style.transform = 'translateY(0)';
    }, 10);
});

closeFormBtn.addEventListener('click', () => {
    document.querySelector('.form-container').style.opacity = '0';
    document.querySelector('.form-container').style.transform = 'translateY(30px)';
    setTimeout(() => {
        formOverlay.classList.remove('active');
    }, 500);
});

vibrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    processForm();
});

closeResultBtn.addEventListener('click', () => {
    document.querySelector('.result-container').style.opacity = '0';
    document.querySelector('.result-container').style.transform = 'translateY(30px)';
    setTimeout(() => {
        resultOverlay.classList.remove('active');
    }, 500);
});

// Process form and display results
function processForm() {
    // Get a random symbol
    const randomSymbol = mysticalSymbols[Math.floor(Math.random() * mysticalSymbols.length)];
    
    // Get a random quote
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    
    // Update the result display
    symbolDisplay.innerHTML = randomSymbol.symbol;
    symbolName.textContent = randomSymbol.name;
    message.textContent = randomSymbol.description + " " + randomQuote;
    productImage.innerHTML = randomSymbol.productImage;
    
    // Hide form and show result
    document.querySelector('.form-container').style.opacity = '0';
    document.querySelector('.form-container').style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        formOverlay.classList.remove('active');
        resultOverlay.classList.add('active');
        
        setTimeout(() => {
            document.querySelector('.result-container').style.opacity = '1';
            document.querySelector('.result-container').style.transform = 'translateY(0)';
        }, 10);
    }, 500);
}

// Add CSS for particles
function addParticleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
        }
        
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 0.2;
            }
            25% {
                transform: translate(100px, 50px) rotate(90deg);
                opacity: 0.5;
            }
            50% {
                transform: translate(50px, 100px) rotate(180deg);
                opacity: 0.3;
            }
            75% {
                transform: translate(-50px, 50px) rotate(270deg);
                opacity: 0.4;
            }
        }
    `;
    document.head.appendChild(style);
}

// Mobile Menu Toggle - Enhanced version
function toggleMobileMenu() {
    const mainNav = document.querySelector('.main-nav');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileMenu) {
        createMobileMenu();
        return;
    }
    
    mainNav.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Toggle icon between bars and X
    if (mobileMenu.classList.contains('active')) {
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Enhanced Mobile Menu Creation
function createMobileMenu() {
    const mainNav = document.querySelector('.main-nav');
    const leftLinks = document.querySelector('.left-links');
    const rightLinks = document.querySelector('.right-links');
    
    // Create mobile menu container
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');
    document.body.appendChild(mobileMenu);
    
    // Clone navigation links for mobile menu
    const allLinks = [];
    
    if (leftLinks) {
        const leftLinkItems = leftLinks.querySelectorAll('a, .dropdown');
        leftLinkItems.forEach(item => allLinks.push(item.cloneNode(true)));
    }
    
    if (rightLinks) {
        const rightLinkItems = rightLinks.querySelectorAll('a');
        rightLinkItems.forEach(item => allLinks.push(item.cloneNode(true)));
    }
    
    // Add links to mobile menu
    allLinks.forEach(item => {
        if (item.classList.contains('dropdown')) {
            const dropdownContainer = document.createElement('div');
            dropdownContainer.classList.add('dropdown');
            
            const trigger = item.querySelector('a').cloneNode(true);
            const content = item.querySelector('.dropdown-content').cloneNode(true);
            
            dropdownContainer.appendChild(trigger);
            dropdownContainer.appendChild(content);
            mobileMenu.appendChild(dropdownContainer);
            
            // Add click event for dropdown
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                dropdownContainer.classList.toggle('active');
                const icon = trigger.querySelector('i');
                if (icon) {
                    icon.style.transform = dropdownContainer.classList.contains('active') ? 'rotate(180deg)' : '';
                }
            });
        } else {
            mobileMenu.appendChild(item);
        }
    });
    
    // Toggle mobile menu after creation
    toggleMobileMenu();
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileMenu) return;
    
    const isMenuOpen = mobileMenu.classList.contains('active');
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnMenuButton = mobileMenuBtn.contains(event.target);
    
    if (isMenuOpen && !isClickInsideMenu && !isClickOnMenuButton) {
        toggleMobileMenu();
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (!mobileMenu) return;
    
    if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// Dropdown functionality for mobile
function initMobileDropdowns(menuContainer) {
    const container = menuContainer || document;
    const dropdowns = container.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('a');
        
        trigger.addEventListener('click', function(e) {
            // Only for mobile view
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other open dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    addParticleStyles();
    if (particlesContainer) {
        createParticles();
    }
    
    // Mobile Menu Toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Initialize mobile dropdown functionality
    initMobileDropdowns();
    
    // Event Listeners for home page elements
    if (discoverBtn) {
        discoverBtn.addEventListener('click', () => {
            formOverlay.classList.add('active');
            setTimeout(() => {
                document.querySelector('.form-container').style.opacity = '1';
                document.querySelector('.form-container').style.transform = 'translateY(0)';
            }, 10);
        });
    }
    
    if (closeFormBtn) {
        closeFormBtn.addEventListener('click', () => {
            document.querySelector('.form-container').style.opacity = '0';
            document.querySelector('.form-container').style.transform = 'translateY(30px)';
            setTimeout(() => {
                formOverlay.classList.remove('active');
            }, 500);
        });
    }
    
    if (vibrationForm) {
        vibrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            processForm();
        });
    }
    
    if (closeResultBtn) {
        closeResultBtn.addEventListener('click', () => {
            document.querySelector('.result-container').style.opacity = '0';
            document.querySelector('.result-container').style.transform = 'translateY(30px)';
            setTimeout(() => {
                resultOverlay.classList.remove('active');
            }, 500);
        });
    }
}); 