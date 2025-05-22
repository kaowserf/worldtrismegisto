// e-commerce.js - General e-commerce functionality

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    // Initialize cart count from localStorage or set to 0
    let currentCartCount = localStorage.getItem('cartCount') || 0;
    cartCount.textContent = currentCartCount;
    
    // Event Listeners
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    if (addToCartButtons) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', handleAddToCart);
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Mobile Menu Toggle
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        
        // Toggle icon between bars and X
        if (navLinks.classList.contains('active')) {
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
    
    // Add to Cart functionality
    function handleAddToCart(e) {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        const productImage = productCard.querySelector('.product-image img').src;
        
        // Create a product object with default size and color
        const product = {
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1,
            size: 'm', // Default to medium size
            color: 'black' // Default to black color
        };
        
        // Get existing cart or initialize empty array
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already in cart with same size and color
        const existingProductIndex = cart.findIndex(item => 
            item.name === productName && 
            item.size === product.size && 
            item.color === product.color
        );
        
        if (existingProductIndex > -1) {
            // Product exists with same options, increase quantity
            cart[existingProductIndex].quantity += 1;
        } else {
            // Product doesn't exist with these options, add to cart
            cart.push(product);
        }
        
        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        currentCartCount++;
        cartCount.textContent = currentCartCount;
        localStorage.setItem('cartCount', currentCartCount);
        
        // Feedback to user
        const addedMessage = document.createElement('div');
        addedMessage.className = 'added-to-cart-message';
        addedMessage.textContent = `${productName} (Medium) added to cart`;
        document.body.appendChild(addedMessage);
        
        // Add active class for animation
        setTimeout(() => {
            addedMessage.classList.add('active');
        }, 10);
        
        // Remove the message after animation
        setTimeout(() => {
            addedMessage.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(addedMessage);
            }, 300);
        }, 2000);
    }
    
    // Newsletter submission
    function handleNewsletterSubmit(e) {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // In a real app, this would send the email to a server
        // For now, we'll just show a success message
        
        // Clear the input
        emailInput.value = '';
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'newsletter-success';
        successMessage.textContent = `Thank you! ${email} has been subscribed.`;
        
        // Check if message already exists
        const existingMessage = document.querySelector('.newsletter-success');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Add the message after the form
        newsletterForm.after(successMessage);
        
        // Save to localStorage for demo purposes
        const subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
        subscribers.push({ email, date: new Date().toISOString() });
        localStorage.setItem('subscribers', JSON.stringify(subscribers));
    }
    
    // Add styles for add to cart message
    const style = document.createElement('style');
    style.textContent = `
        .added-to-cart-message {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--muted-gold);
            color: var(--charcoal);
            padding: 12px 20px;
            border-radius: 4px;
            font-family: 'Cormorant Garamond', serif;
            font-size: 1rem;
            z-index: 1000;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s, transform 0.3s;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        .added-to-cart-message.active {
            opacity: 1;
            transform: translateY(0);
        }
        
        .newsletter-success {
            margin-top: 1rem;
            color: var(--muted-gold);
            font-family: 'Cormorant Garamond', serif;
            font-style: italic;
            animation: fadeIn 0.5s;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Helper function to get URL parameters (for product pages)
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    
    // If we're on a shop page with a card parameter, scroll to related products
    const cardParam = getUrlParameter('card');
    if (cardParam && document.querySelector('.related-designs')) {
        setTimeout(() => {
            document.querySelector('.related-designs').scrollIntoView({
                behavior: 'smooth'
            });
        }, 500);
    }
}); 