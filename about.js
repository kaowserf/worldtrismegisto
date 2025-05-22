// About Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations for elements as they scroll into view
    initScrollAnimations();
    
    // Add hover effects to team members
    initTeamHoverEffects();
    
    // Initialize Newsletter functionality
    initNewsletterForm();
});

// Scroll Animations
function initScrollAnimations() {
    // Select all elements to animate
    const animatedElements = document.querySelectorAll('.story-content, .mission-statement, .pillar, .team-member, .value-item, .ethical-content');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If element is in view
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });
    
    // Observe each element
    animatedElements.forEach(element => {
        // Add initial class for CSS transitions
        element.classList.add('pre-animate');
        // Start observing
        observer.observe(element);
    });
    
    // Add styles for animations
    const style = document.createElement('style');
    style.textContent = `
        .pre-animate {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .story-content.pre-animate .story-image,
        .story-content.pre-animate .story-text {
            opacity: 0;
            transform: translateX(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .story-content.animate-in .story-image,
        .story-content.animate-in .story-text {
            opacity: 1;
            transform: translateX(0);
        }
        
        .story-content.pre-animate .story-image {
            transform: translateX(-30px);
        }
        
        .value-item.pre-animate {
            transform: translateX(-30px);
        }
        
        .value-item.animate-in {
            transform: translateX(0);
        }
        
        .value-item:hover {
            transform: translateX(10px);
        }
    `;
    document.head.appendChild(style);
}

// Team Hover Effects
function initTeamHoverEffects() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        const memberImage = member.querySelector('.member-image');
        const memberOverlay = member.querySelector('.member-overlay');
        
        if (memberImage && memberOverlay) {
            // Set initial state
            memberOverlay.style.opacity = '0';
            
            // Add hover effect
            memberImage.addEventListener('mouseenter', () => {
                memberOverlay.style.opacity = '1';
            });
            
            memberImage.addEventListener('mouseleave', () => {
                memberOverlay.style.opacity = '0';
            });
        }
    });
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const consentCheckbox = this.querySelector('input[type="checkbox"]');
            
            // Basic validation
            if (!emailInput.value.trim()) {
                showFormMessage(newsletterForm, 'Please enter your email address', 'error');
                return;
            }
            
            if (!validateEmail(emailInput.value)) {
                showFormMessage(newsletterForm, 'Please enter a valid email address', 'error');
                return;
            }
            
            if (!consentCheckbox.checked) {
                showFormMessage(newsletterForm, 'Please agree to our Privacy Policy', 'error');
                return;
            }
            
            // If validation passes, simulate form submission
            emailInput.value = '';
            consentCheckbox.checked = false;
            
            // Show success message
            showFormMessage(newsletterForm, 'Thank you for subscribing to our newsletter!', 'success');
        });
    }
}

// Helper function to validate email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

// Helper function to show form messages
function showFormMessage(form, message, type) {
    // Remove any existing message
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Style the message
    messageElement.style.padding = '10px';
    messageElement.style.marginTop = '15px';
    messageElement.style.borderRadius = '4px';
    
    if (type === 'error') {
        messageElement.style.backgroundColor = 'rgba(255, 107, 107, 0.2)';
        messageElement.style.color = '#ff6b6b';
        messageElement.style.border = '1px solid rgba(255, 107, 107, 0.5)';
    } else {
        messageElement.style.backgroundColor = 'rgba(154, 205, 50, 0.2)';
        messageElement.style.color = '#9ACD32';
        messageElement.style.border = '1px solid rgba(154, 205, 50, 0.5)';
    }
    
    // Append to form
    form.appendChild(messageElement);
    
    // Remove the message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Add parallax effect to hero section
let heroSection = document.querySelector('.about-hero');
if (heroSection) {
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY;
        // Move the background image at a slower rate than the scroll
        heroSection.style.backgroundPosition = `center ${scrollPos * 0.4}px`;
    });
} 