// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ Accordion
    initFaqAccordion();
    
    // Initialize Form Validation
    initFormValidation();
    
    // Initialize Map Placeholder
    initMapPlaceholder();
});

// FAQ Accordion Functionality
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items first
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Form Validation
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Basic validation
            let isValid = true;
            
            // Validate name
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            // Validate email
            if (!validateEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Please enter your message');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            // If form is valid, you would submit it or show success message
            if (isValid) {
                showSuccessMessage();
                contactForm.reset();
            }
        });
    }
}

// Email validation helper
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

// Show error message
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    
    // Remove any existing error
    removeError(input);
    
    // Add error class
    formGroup.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#ff6b6b';
    errorElement.style.fontSize = '0.9rem';
    errorElement.style.marginTop = '0.5rem';
    
    // Append error message
    formGroup.appendChild(errorElement);
    
    // Highlight input
    input.style.borderColor = '#ff6b6b';
}

// Remove error message
function removeError(input) {
    const formGroup = input.closest('.form-group');
    
    // Remove error class
    formGroup.classList.remove('error');
    
    // Remove error message if it exists
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        formGroup.removeChild(errorElement);
    }
    
    // Reset input style
    input.style.borderColor = '';
}

// Show success message
function showSuccessMessage() {
    const formContainer = document.querySelector('.contact-form-container');
    
    // Create success message
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = 'Thank you for your message. We will be in touch soon!';
    successElement.style.color = '#9ACD32';
    successElement.style.fontSize = '1.1rem';
    successElement.style.padding = '1rem';
    successElement.style.textAlign = 'center';
    successElement.style.marginTop = '1rem';
    successElement.style.backgroundColor = 'rgba(28, 28, 28, 0.6)';
    successElement.style.borderRadius = '4px';
    successElement.style.border = '1px solid var(--symbol-color)';
    
    // Append success message
    formContainer.appendChild(successElement);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        formContainer.removeChild(successElement);
    }, 5000);
}

// Map Placeholder Functionality
function initMapPlaceholder() {
    const mapContainer = document.querySelector('.map-container');
    const directionsBtn = document.querySelector('.directions-btn');
    
    if (directionsBtn) {
        directionsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // This would normally open Google Maps or similar
            // For demo purposes, we'll open a new tab with Google Maps
            window.open('https://maps.google.com', '_blank');
        });
    }
    
    // In a real implementation, you would initialize your map here
    // For example, using Google Maps API or similar
} 