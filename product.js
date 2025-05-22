/**
 * Mystic Threads - Product Detail Page JavaScript
 * This file handles product detail page functionality including:
 * - Product image gallery
 * - Tab switching
 * - Quantity updates
 * - Add to cart functionality
 * - Reviews interaction
 */

document.addEventListener('DOMContentLoaded', function() {
    // Product information from API (simulated)
    const productData = {
        // Default product data (will be overridden if ID is present in URL)
        1: {
            name: 'The Seeker T-Shirt',
            price: '$35.00',
            sku: 'MT-TS-001',
            image: 'Productimage/productimage (1).jpeg',
            category: 'tshirt',
            description: 'This mystical t-shirt features an elegant design inspired by the Seeker tarot card. Made with 100% organic cotton, it\'s both comfortable and environmentally friendly.',
            images: [
                'Productimage/productimage (1).jpeg',
                'Productimage/productimage (5).jpeg',
                'Productimage/productimage (9).jpeg',
                'Productimage/productimage (13).jpeg'
            ]
        },
        2: {
            name: 'The Flame Hoodie',
            price: '$59.99',
            sku: 'MT-HD-002',
            image: 'Productimage/productimage (2).jpeg',
            category: 'hoodie',
            description: 'Wrap yourself in mystical warmth with this premium hoodie featuring the Flame design. Made with organic cotton blend for ultimate comfort.',
            images: [
                'Productimage/productimage (2).jpeg',
                'Productimage/productimage (6).jpeg',
                'Productimage/productimage (10).jpeg',
                'Productimage/productimage (14).jpeg'
            ]
        },
        3: {
            name: 'The Mirror Tank Top',
            price: '$29.95',
            sku: 'MT-TT-003',
            image: 'Productimage/productimage (3).jpeg',
            category: 'tank',
            description: 'This lightweight tank top features our Mirror design, perfect for yoga and meditation. Made with breathable organic cotton.',
            images: [
                'Productimage/productimage (3).jpeg',
                'Productimage/productimage (7).jpeg',
                'Productimage/productimage (11).jpeg',
                'Productimage/productimage (15).jpeg'
            ]
        },
        4: {
            name: 'The Vessel Long Sleeve',
            price: '$42.00',
            sku: 'MT-LS-004',
            image: 'Productimage/productimage (4).jpeg',
            category: 'longsleeve',
            description: 'Our Vessel long sleeve shirt provides comfort in all seasons with its breathable organic cotton fabric and mystical design.',
            images: [
                'Productimage/productimage (4).jpeg',
                'Productimage/productimage (8).jpeg',
                'Productimage/productimage (12).jpeg',
                'Productimage/productimage (16).jpeg'
            ]
        },
        5: {
            name: 'The High Priestess T-Shirt',
            price: '$35.00',
            sku: 'MT-TS-005',
            image: 'Productimage/productimage (5).jpeg',
            category: 'tshirt',
            description: 'Channel your intuitive wisdom with The High Priestess T-Shirt. Features a stunning tarot-inspired design on 100% organic cotton.',
            images: [
                'Productimage/productimage (5).jpeg',
                'Productimage/productimage (1).jpeg',
                'Productimage/productimage (9).jpeg',
                'Productimage/productimage (13).jpeg'
            ]
        }
    };

    // DOM Elements
    const productName = document.getElementById('product-name');
    const productPrice = document.getElementById('product-price');
    const productSku = document.getElementById('product-sku');
    const productMainImage = document.getElementById('product-main-image');
    const productTitle = document.getElementById('product-title');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const quantityInput = document.getElementById('quantity');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const writeReviewBtn = document.querySelector('.write-review-btn');
    
    // Initialize cart count from localStorage
    updateCartCount();
    
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || '1'; // Default to product 1 if no ID specified
    
    // Load product data
    loadProductData(productId);
    
    // Tab functionality
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Hide all tab contents
                tabContents.forEach(content => {
                    content.style.display = 'none';
                });
                
                // Show the selected tab content
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).style.display = 'block';
            });
        });
    }
    
    // Quantity input functionality
    if (quantityInput) {
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) value = 1;
            if (value > 10) value = 10;
            this.value = value;
        });
    }
    
    // Add to cart functionality
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', addToCart);
    }
    
    // Write review functionality
    if (writeReviewBtn) {
        writeReviewBtn.addEventListener('click', function() {
            alert('Review functionality will be implemented in a future update.');
        });
    }
    
    // Functions
    
    /**
     * Load product data based on ID
     */
    function loadProductData(id) {
        if (!productData[id]) {
            console.error('Product not found!');
            return;
        }
        
        const product = productData[id];
        
        // Update product details in the page
        if (productName) productName.textContent = product.name;
        if (productPrice) productPrice.textContent = product.price;
        if (productSku) productSku.textContent = product.sku;
        if (productMainImage) productMainImage.src = product.image;
        if (productTitle) productTitle.textContent = product.name;
        
        // Update page title
        document.title = `${product.name} | Mystic Threads`;
        
        // Update thumbnails
        updateThumbnails(product.images);
    }
    
    /**
     * Update thumbnails based on product images
     */
    function updateThumbnails(images) {
        thumbnails.forEach((thumb, index) => {
            if (index < images.length) {
                const img = thumb.querySelector('img');
                if (img) {
                    img.src = images[index];
                    img.addEventListener('click', function() {
                        changeMainImage(this.src);
                    });
                }
            }
        });
    }
    
    /**
     * Change main product image
     */
    function changeMainImage(src) {
        if (productMainImage) productMainImage.src = src;
        
        // Update active thumbnail
        thumbnails.forEach(thumb => {
            const img = thumb.querySelector('img');
            if (img && img.src === src) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }
    
    /**
     * Add to cart functionality
     */
    function addToCart() {
        const name = productName.textContent;
        const price = productPrice.textContent;
        const quantity = parseInt(quantityInput.value);
        const size = document.getElementById('size-select').value;
        const color = document.getElementById('color-select').value;
        
        // Update cart count
        let cartCount = parseInt(localStorage.getItem('cartCount') || '0');
        cartCount += quantity;
        localStorage.setItem('cartCount', cartCount);
        
        // Update cart display
        updateCartCount();
        
        // Save cart item to localStorage
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        
        // Check if item already exists
        const existingItemIndex = cartItems.findIndex(item => 
            item.name === name && 
            item.size === size && 
            item.color === color
        );
        
        if (existingItemIndex > -1) {
            // Increase quantity if item already exists
            cartItems[existingItemIndex].quantity += quantity;
        } else {
            // Add new item
            cartItems.push({
                name: name,
                price: price,
                image: productMainImage.src,
                quantity: quantity,
                size: size,
                color: color
            });
        }
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Show added to cart message
        showAddedToCartMessage(name, quantity);
    }
    
    /**
     * Update quantity
     */
    window.updateQuantity = function(change) {
        let value = parseInt(quantityInput.value) + change;
        
        // Ensure value is at least 1
        if (value < 1) value = 1;
        // Ensure value is at most 10
        if (value > 10) value = 10;
        
        quantityInput.value = value;
    };
    
    /**
     * Update cart count display
     */
    function updateCartCount() {
        const cartCount = parseInt(localStorage.getItem('cartCount') || '0');
        const cartCountDisplay = document.querySelector('.cart-count');
        if (cartCountDisplay) {
            cartCountDisplay.textContent = cartCount;
        }
    }
    
    /**
     * Show added to cart message
     */
    function showAddedToCartMessage(productName, quantity) {
        // Check if message container exists
        let messageContainer = document.querySelector('.added-to-cart-message');
        if (!messageContainer) {
            messageContainer = document.createElement('div');
            messageContainer.className = 'added-to-cart-message';
            document.body.appendChild(messageContainer);
        }
        
        messageContainer.innerHTML = `<i class="fas fa-check-circle"></i> ${quantity} × ${productName} added to cart`;
        messageContainer.classList.add('show');
        
        // Hide message after 3 seconds
        setTimeout(() => {
            messageContainer.classList.remove('show');
        }, 3000);
    }
}); 