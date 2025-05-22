// checkout.js - Functionality for the checkout page

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const shippingForm = document.getElementById('shipping-info-form');
    const paymentForm = document.getElementById('payment-info-form');
    const shippingSection = document.getElementById('shipping-form');
    const paymentSection = document.getElementById('payment-form');
    const confirmationSection = document.getElementById('confirmation-section');
    const backToShippingBtn = document.getElementById('back-to-shipping');
    const orderItemsContainer = document.getElementById('order-items');
    const orderSubtotal = document.getElementById('order-subtotal');
    const orderShipping = document.getElementById('order-shipping');
    const orderTotal = document.getElementById('order-total');
    const applyPromoBtn = document.getElementById('apply-promo');
    const promoCodeInput = document.getElementById('promo-code');
    const steps = document.querySelectorAll('.step');
    
    // Initialize the checkout page
    initCheckout();
    
    // Event listeners
    if (shippingForm) {
        shippingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            goToStep(2);
        });
    }
    
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            completeOrder();
        });
    }
    
    if (backToShippingBtn) {
        backToShippingBtn.addEventListener('click', function() {
            goToStep(1);
        });
    }
    
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', applyPromoCode);
    }
    
    // Credit card input formatting
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', formatCardNumber);
    }
    
    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', formatExpiry);
    }
    
    /**
     * Initialize the checkout page
     */
    function initCheckout() {
        // Get cart items from localStorage
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        
        // Check if cart is empty, redirect to cart page if it is
        if (cartItems.length === 0) {
            window.location.href = 'cart.html';
            return;
        }
        
        // Display order summary
        renderOrderSummary(cartItems);
        
        // Calculate and update totals
        updateOrderTotals(cartItems);
    }
    
    /**
     * Render order summary to the page
     */
    function renderOrderSummary(items) {
        orderItemsContainer.innerHTML = '';
        
        items.forEach(item => {
            // Format price for display
            const price = item.price.replace('$', '');
            const quantity = item.quantity || 1;
            const totalPrice = parseFloat(price) * quantity;
            
            // Create item element
            const itemElement = document.createElement('div');
            itemElement.className = 'order-item';
            
            // Options string
            let optionsStr = '';
            if (item.size) optionsStr += `Size: ${item.size}`;
            if (item.color) {
                if (optionsStr) optionsStr += ' | ';
                optionsStr += `Color: ${item.color}`;
            }
            
            itemElement.innerHTML = `
                <div class="order-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="order-item-details">
                    <div class="order-item-name">${item.name}</div>
                    ${optionsStr ? `<div class="order-item-options">${optionsStr}</div>` : ''}
                    <div class="order-item-quantity">Qty: ${quantity}</div>
                </div>
                <div class="order-item-price">$${totalPrice.toFixed(2)}</div>
            `;
            
            orderItemsContainer.appendChild(itemElement);
        });
    }
    
    /**
     * Update order totals
     */
    function updateOrderTotals(items) {
        // Calculate subtotal
        const subtotal = items.reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            const quantity = item.quantity || 1;
            return total + (price * quantity);
        }, 0);
        
        // Calculate shipping (free over $100)
        const shipping = subtotal > 100 ? 0 : 10;
        
        // Calculate total
        const total = subtotal + shipping;
        
        // Update display
        orderSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        orderShipping.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
        orderTotal.textContent = `$${total.toFixed(2)}`;
        
        // Save order total to localStorage for confirmation page
        localStorage.setItem('orderTotal', total.toFixed(2));
    }
    
    /**
     * Apply promo code
     */
    function applyPromoCode() {
        const promoCode = promoCodeInput.value.trim().toUpperCase();
        
        // Check if promo code is valid (for demo purposes, "MYSTICAL" gives 10% off)
        if (promoCode === 'MYSTICAL') {
            // Get cart items
            const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
            
            // Calculate subtotal
            const subtotal = cartItems.reduce((total, item) => {
                const price = parseFloat(item.price.replace('$', ''));
                const quantity = item.quantity || 1;
                return total + (price * quantity);
            }, 0);
            
            // Apply 10% discount
            const discount = subtotal * 0.1;
            
            // Calculate shipping (free over $100)
            const shipping = subtotal > 100 ? 0 : 10;
            
            // Calculate total with discount
            const total = subtotal - discount + shipping;
            
            // Add discount row
            const discountRow = document.createElement('div');
            discountRow.className = 'summary-row';
            discountRow.innerHTML = `
                <span>Discount (MYSTICAL)</span>
                <span>-$${discount.toFixed(2)}</span>
            `;
            
            // Insert before total row
            const totalRow = document.querySelector('.summary-total');
            totalRow.parentNode.insertBefore(discountRow, totalRow);
            
            // Update total
            orderTotal.textContent = `$${total.toFixed(2)}`;
            
            // Disable promo code input and button
            promoCodeInput.disabled = true;
            applyPromoBtn.disabled = true;
            
            // Show success message
            showPromoMessage('Promo code applied successfully!', 'success');
        } else {
            // Show error message
            showPromoMessage('Invalid promo code. Please try again.', 'error');
        }
    }
    
    /**
     * Show promo code message
     */
    function showPromoMessage(message, type) {
        // Check if message element already exists
        let messageElement = document.querySelector('.promo-message');
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = 'promo-message';
            promoCodeInput.parentNode.appendChild(messageElement);
        }
        
        // Set message and class
        messageElement.textContent = message;
        messageElement.className = `promo-message ${type}`;
        
        // Hide message after 3 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }
    
    /**
     * Go to the specified step
     */
    function goToStep(stepNumber) {
        // Hide all sections
        shippingSection.classList.remove('active');
        paymentSection.classList.remove('active');
        confirmationSection.classList.remove('active');
        
        // Update steps
        steps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            
            if (index + 1 < stepNumber) {
                step.classList.add('completed');
            } else if (index + 1 === stepNumber) {
                step.classList.add('active');
            }
        });
        
        // Show the selected section
        if (stepNumber === 1) {
            shippingSection.classList.add('active');
        } else if (stepNumber === 2) {
            paymentSection.classList.add('active');
        } else if (stepNumber === 3) {
            confirmationSection.classList.add('active');
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
    
    /**
     * Complete the order process
     */
    function completeOrder() {
        // In a real app, this would send the order to a server
        // For this demo, we'll just show the confirmation step
        
        // Generate a random order number
        const orderNumber = 'WT' + Math.floor(Math.random() * 10000000);
        document.getElementById('order-number').textContent = orderNumber;
        
        // Get email from form
        const email = document.getElementById('email').value;
        document.getElementById('confirmation-email').textContent = email;
        
        // Clear cart
        localStorage.removeItem('cartItems');
        localStorage.setItem('cartCount', '0');
        
        // Update the cart count in the header
        const cartCountDisplay = document.querySelector('.cart-count');
        if (cartCountDisplay) {
            cartCountDisplay.textContent = '0';
        }
        
        // Go to confirmation step
        goToStep(3);
    }
    
    /**
     * Format credit card number as user types
     */
    function formatCardNumber(e) {
        // Remove non-digits
        let val = e.target.value.replace(/\D/g, '');
        
        // Add spaces every 4 characters
        val = val.replace(/(\d{4})(?=\d)/g, '$1 ');
        
        // Limit to 19 characters (16 digits + 3 spaces)
        val = val.substring(0, 19);
        
        // Update the input
        e.target.value = val;
    }
    
    /**
     * Format expiry date as user types
     */
    function formatExpiry(e) {
        // Remove non-digits
        let val = e.target.value.replace(/\D/g, '');
        
        // Add slash after month
        if (val.length > 2) {
            val = val.substring(0, 2) + '/' + val.substring(2);
        }
        
        // Limit to 5 characters (MM/YY)
        val = val.substring(0, 5);
        
        // Update the input
        e.target.value = val;
    }
}); 