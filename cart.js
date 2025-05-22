// cart.js - Functionality for the shopping cart page

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const cartItemsContainer = document.getElementById('cart-items');
    const cartEmptyElement = document.getElementById('cart-empty');
    const cartContentElement = document.getElementById('cart-content');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const closeCheckoutBtn = document.getElementById('close-checkout-btn');
    const checkoutOverlay = document.getElementById('checkout-overlay');
    const orderSummaryElement = document.getElementById('order-summary');
    const checkoutForm = document.getElementById('checkout-form');
    const orderSuccessOverlay = document.getElementById('order-success-overlay');
    const orderNumberElement = document.getElementById('order-number');
    const confirmationEmailElement = document.getElementById('confirmation-email');
    const promoInput = document.getElementById('promo-input');
    const applyPromoBtn = document.getElementById('apply-promo');
    const recommendedProductsContainer = document.getElementById('recommended-products');
    const cartCountElement = document.querySelector('.cart-count');
    
    // Variables
    let cartItems = [];
    let promoCodeApplied = false;
    const TAX_RATE = 0.08; // 8%
    const FREE_SHIPPING_THRESHOLD = 100; // Free shipping for orders over $100
    const SHIPPING_COST = 12.99;
    const PROMO_DISCOUNT = 0.15; // 15% off
    
    // Products data (would be fetched from a database in a real app)
    const products = [
        { id: 1, name: 'The Seeker T-Shirt', price: 35.00, image: 'Productimage/productimage (1).jpeg' },
        { id: 2, name: 'The Flame Hoodie', price: 59.99, image: 'Productimage/productimage (2).jpeg' },
        { id: 3, name: 'The Mirror Tank Top', price: 29.95, image: 'Productimage/productimage (3).jpeg' },
        { id: 4, name: 'The Vessel Long Sleeve', price: 42.00, image: 'Productimage/productimage (4).jpeg' },
        { id: 5, name: 'The High Priestess T-Shirt', price: 35.00, image: 'Productimage/productimage (5).jpeg' },
        { id: 6, name: 'The Empress Hoodie', price: 59.99, image: 'Productimage/productimage (6).jpeg' },
        { id: 7, name: 'The Emperor Tank Top', price: 29.95, image: 'Productimage/productimage (7).jpeg' },
        { id: 8, name: 'The Hierophant Long Sleeve', price: 42.00, image: 'Productimage/productimage (8).jpeg' },
        { id: 9, name: 'The Lovers T-Shirt', price: 35.00, image: 'Productimage/productimage (9).jpeg' }
    ];
    
    // Initialize
    function init() {
        loadCart();
        setupEventListeners();
        displayRecommendedProducts();
    }
    
    // Load Cart Items from localStorage
    function loadCart() {
        cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        updateCartDisplay();
    }
    
    // Setup Event Listeners
    function setupEventListeners() {
        // Add event listener for checkout button
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', openCheckoutOverlay);
        }
        
        // Add event listener for close checkout button
        if (closeCheckoutBtn) {
            closeCheckoutBtn.addEventListener('click', closeCheckoutOverlay);
        }
        
        // Add event listener for checkout form submission
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', handleCheckoutSubmit);
        }
        
        // Add event listener for apply promo button
        if (applyPromoBtn) {
            applyPromoBtn.addEventListener('click', applyPromoCode);
        }
    }
    
    // Update Cart Display
    function updateCartDisplay() {
        // Update cart count in navigation
        updateCartCount();
        
        if (cartItems.length === 0) {
            // Show empty cart message if cart is empty
            if (cartEmptyElement && cartContentElement) {
                cartEmptyElement.style.display = 'block';
                cartContentElement.style.display = 'none';
            }
            return;
        }
        
        // Otherwise, show cart content and hide empty message
        if (cartEmptyElement && cartContentElement) {
            cartEmptyElement.style.display = 'none';
            cartContentElement.style.display = 'flex';
        }
        
        // Clear cart items container and render cart items
        if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        
            cartItems.forEach((item, index) => {
                const cartItemElement = createCartItemElement(item, index);
                cartItemsContainer.appendChild(cartItemElement);
            });
        }
        
        // Update totals
        updateTotals();
    }
    
    // Create Cart Item Element
    function createCartItemElement(item, index) {
        const itemTotal = calculateItemTotal(item);
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        // Create HTML with size and color information if available
        let itemDetails = '';
        if (item.size) {
            // Convert size value to readable format (e.g., "s" to "Small")
            let sizeText = item.size;
            switch(item.size.toLowerCase()) {
                case 's': sizeText = 'Small'; break;
                case 'm': sizeText = 'Medium'; break;
                case 'l': sizeText = 'Large'; break;
                case 'xl': sizeText = 'X-Large'; break;
                case '2xl': sizeText = '2X-Large'; break;
            }
            itemDetails += `<div class="item-size">Size: ${sizeText}</div>`;
        }
        
        if (item.color) {
            // Capitalize first letter of color
            const colorText = item.color.charAt(0).toUpperCase() + item.color.slice(1);
            itemDetails += `<div class="item-color">Color: ${colorText}</div>`;
        }
        
        cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <div class="cart-item-price">${item.price}</div>
                    ${itemDetails}
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn decrease-quantity" data-index="${index}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${index}">
                        <button class="quantity-btn increase-quantity" data-index="${index}">+</button>
                    </div>
                    <button class="remove-item" data-index="${index}">
                        <i class="fas fa-trash-alt"></i> Remove
                    </button>
                </div>
            </div>
            <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
        `;
        
        // Add event listeners to quantity buttons and remove button
        const decreaseBtn = cartItem.querySelector('.decrease-quantity');
        const increaseBtn = cartItem.querySelector('.increase-quantity');
        const quantityInput = cartItem.querySelector('.quantity-input');
        const removeBtn = cartItem.querySelector('.remove-item');
        
        decreaseBtn.addEventListener('click', () => decreaseQuantity(index));
        increaseBtn.addEventListener('click', () => increaseQuantity(index));
        quantityInput.addEventListener('change', (e) => updateQuantity(index, parseInt(e.target.value)));
        removeBtn.addEventListener('click', () => removeCartItem(index));
        
        return cartItem;
    }
    
    // Decrease Item Quantity
    function decreaseQuantity(index) {
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
            saveCart();
            updateCartDisplay();
        }
    }
    
    // Increase Item Quantity
    function increaseQuantity(index) {
        cartItems[index].quantity++;
        saveCart();
        updateCartDisplay();
    }
    
    // Update Item Quantity directly
    function updateQuantity(index, quantity) {
        if (quantity < 1) quantity = 1;
        cartItems[index].quantity = quantity;
        saveCart();
        updateCartDisplay();
    }
    
    // Remove Item from Cart
    function removeCartItem(index) {
        cartItems.splice(index, 1);
        saveCart();
        updateCartDisplay();
        
        // Update cart count in localStorage
        let currentCartCount = parseInt(localStorage.getItem('cartCount') || '0');
        currentCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        localStorage.setItem('cartCount', currentCartCount.toString());
        
        // Update cart count display
        if (cartCountElement) {
            cartCountElement.textContent = currentCartCount;
        }
    }
    
    // Calculate Item Total Price
    function calculateItemTotal(item) {
            const price = parseFloat(item.price.replace('$', ''));
        return price * item.quantity;
    }
    
    // Update Totals (Subtotal, Shipping, Tax, Total)
    function updateTotals() {
        const subtotal = calculateSubtotal();
        const shipping = calculateShipping(subtotal);
        const tax = calculateTax(subtotal);
        const total = subtotal + shipping + tax;
        
        if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        if (shippingElement) shippingElement.textContent = shipping > 0 ? `$${shipping.toFixed(2)}` : 'FREE';
        if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
    }
    
    // Calculate Subtotal
    function calculateSubtotal() {
        let subtotal = cartItems.reduce((total, item) => {
            return total + calculateItemTotal(item);
        }, 0);
        
        // Apply promo discount if a promo code is applied
        if (promoCodeApplied) {
            subtotal = subtotal * (1 - PROMO_DISCOUNT);
        }
        
        return subtotal;
    }
    
    // Calculate Shipping Cost
    function calculateShipping(subtotal) {
        return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    }
    
    // Calculate Tax
    function calculateTax(subtotal) {
        return subtotal * TAX_RATE;
    }
    
    // Save Cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    
    // Update Cart Count Display
    function updateCartCount() {
        if (cartCountElement) {
            const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
            cartCountElement.textContent = itemCount;
            localStorage.setItem('cartCount', itemCount.toString());
        }
    }
    
    // Apply Promo Code
    function applyPromoCode() {
        if (!promoInput) return;
        
        const promoCode = promoInput.value.trim();
        if (promoCode.toUpperCase() === 'MYSTICAL15') {
            promoCodeApplied = true;
            promoInput.disabled = true;
            applyPromoBtn.disabled = true;
            applyPromoBtn.textContent = 'Applied';
            
            // Show success message
            const promoSuccess = document.createElement('div');
            promoSuccess.className = 'promo-success';
            promoSuccess.textContent = '15% discount applied!';
            promoSuccess.style.color = 'var(--muted-gold)';
            promoSuccess.style.marginTop = '0.5rem';
            promoSuccess.style.fontSize = '0.9rem';
            promoSuccess.style.fontStyle = 'italic';
            
            const promoContainer = promoInput.parentElement;
            if (promoContainer && !promoContainer.querySelector('.promo-success')) {
                promoContainer.appendChild(promoSuccess);
            }
            
            // Update totals with the discount
            updateTotals();
        } else {
            // Show error message
            const promoError = document.createElement('div');
            promoError.className = 'promo-error';
            promoError.textContent = 'Invalid promo code';
            promoError.style.color = '#e57373';
            promoError.style.marginTop = '0.5rem';
            promoError.style.fontSize = '0.9rem';
            promoError.style.fontStyle = 'italic';
            
            const promoContainer = promoInput.parentElement;
            
            // Remove any existing error messages
            const existingError = promoContainer.querySelector('.promo-error');
            if (existingError) {
                existingError.remove();
            }
            
            promoContainer.appendChild(promoError);
            
            // Clear the input field
            promoInput.value = '';
        }
    }
    
    // Open Checkout Overlay
    function openCheckoutOverlay() {
        if (!checkoutOverlay) return;
        
        // Update order summary in checkout form
        updateOrderSummary();
        
        // Show checkout overlay
        checkoutOverlay.classList.add('active');
        setTimeout(() => {
            checkoutOverlay.querySelector('.checkout-form-container').style.opacity = '1';
            checkoutOverlay.querySelector('.checkout-form-container').style.transform = 'translateY(0)';
        }, 10);
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
    }
    
    // Close Checkout Overlay
    function closeCheckoutOverlay() {
        if (!checkoutOverlay) return;
        
        checkoutOverlay.querySelector('.checkout-form-container').style.opacity = '0';
        checkoutOverlay.querySelector('.checkout-form-container').style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            checkoutOverlay.classList.remove('active');
            // Restore body scrolling
            document.body.style.overflow = '';
        }, 500);
    }
    
    // Update Order Summary in Checkout Form
    function updateOrderSummary() {
        if (!orderSummaryElement) return;
        
        const subtotal = calculateSubtotal();
        const shipping = calculateShipping(subtotal);
        const tax = calculateTax(subtotal);
        const total = subtotal + shipping + tax;
        
        orderSummaryElement.innerHTML = `
            <div class="summary-item">
                <span>Subtotal</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-item">
                <span>Shipping</span>
                <span>${shipping > 0 ? `$${shipping.toFixed(2)}` : 'FREE'}</span>
            </div>
            <div class="summary-item">
                <span>Tax</span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="summary-item">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>
        `;
    }
    
    // Handle Checkout Form Submission
    function handleCheckoutSubmit(e) {
        e.preventDefault();
        
        // In a real application, you would validate the form and process payment here
        // For this demo, we'll just simulate a successful order
        
        // Get email for confirmation
        const emailInput = document.getElementById('email');
        const email = emailInput ? emailInput.value : 'your email';
        
        // Generate a random order number
        const orderNumber = `WT-${Math.floor(10000 + Math.random() * 90000)}`;
        
        // Update order success overlay
        if (orderNumberElement) {
            orderNumberElement.textContent = orderNumber;
        }
        
        if (confirmationEmailElement) {
            confirmationEmailElement.textContent = email;
        }
        
        // Close checkout overlay
        closeCheckoutOverlay();
        
        // Show order success overlay
        setTimeout(() => {
            if (orderSuccessOverlay) {
                orderSuccessOverlay.classList.add('active');
                setTimeout(() => {
                    orderSuccessOverlay.querySelector('.success-container').style.opacity = '1';
                    orderSuccessOverlay.querySelector('.success-container').style.transform = 'translateY(0)';
                }, 10);
                
                // Clear cart after successful order
                cartItems = [];
                saveCart();
                updateCartCount();
                
                // Add click event to close success overlay and redirect to home
                const continueShoppingBtn = orderSuccessOverlay.querySelector('.continue-shopping-btn');
                if (continueShoppingBtn) {
                    continueShoppingBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        orderSuccessOverlay.classList.remove('active');
                        window.location.href = 'shop.html';
                    });
                }
            }
        }, 500);
    }
    
    // Display Recommended Products
    function displayRecommendedProducts() {
        if (!recommendedProductsContainer) return;
        
        // Use a subset of products for recommendations (random selection)
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        const selectedProducts = shuffled.slice(0, 4);
        
        selectedProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-overlay">
                        <a href="product.html?id=${product.id}" class="view-btn">View Details</a>
                    </div>
                </div>
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-product-id="${product.id}" data-product-name="${product.name}" data-product-price="$${product.price.toFixed(2)}" data-product-image="${product.image}">Add to Cart</button>
            `;
            
            // Add event listener to add to cart button
            const addToCartBtn = productCard.querySelector('.add-to-cart');
            addToCartBtn.addEventListener('click', handleAddToCartClick);
            
            recommendedProductsContainer.appendChild(productCard);
        });
    }
    
    // Handle Add to Cart Click for recommended products
    function handleAddToCartClick(e) {
        const button = e.target;
        const productName = button.getAttribute('data-product-name');
        const productPrice = button.getAttribute('data-product-price');
        const productImage = button.getAttribute('data-product-image');
        
        // Create product object
        const product = {
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };
        
        // Check if product already in cart (without considering size/color since not selected here)
        const existingProductIndex = cartItems.findIndex(item => 
            item.name === productName && !item.size && !item.color
        );
        
        if (existingProductIndex > -1) {
            // Product exists, increase quantity
            cartItems[existingProductIndex].quantity += 1;
        } else {
            // Product doesn't exist, add to cart
            cartItems.push(product);
        }
        
        // Save updated cart
        saveCart();
        
        // Update cart display
        updateCartDisplay();
        
        // Show confirmation message
        showAddedToCartMessage(productName);
    }
    
    // Show Added to Cart Message
    function showAddedToCartMessage(productName) {
        const message = document.createElement('div');
        message.className = 'added-to-cart-message';
        message.textContent = `${productName} added to cart`;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.classList.add('active');
        }, 10);
        
        setTimeout(() => {
            message.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(message);
            }, 300);
        }, 2000);
    }
    
    // Initialize the cart page
    init();
}); 