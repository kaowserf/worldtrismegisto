/**
 * Mystic Threads - Shop Page JavaScript
 * This file handles the shop functionality including:
 * - Product filtering by category
 * - Product sorting
 * - Product search
 * - Add to cart functionality
 * - Pagination
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const productGrid = document.querySelector('.product-grid');
    const productCards = document.querySelectorAll('.product-card');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const searchInput = document.getElementById('product-search');
    const searchBtn = document.getElementById('search-btn');
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    
    // Create container for added-to-cart message if it doesn't exist
    let messageContainer = document.querySelector('.added-to-cart-message');
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.className = 'added-to-cart-message';
        document.body.appendChild(messageContainer);
    }
    
    // Filter products by category
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    // Sort products
    if (sortFilter) {
        sortFilter.addEventListener('change', sortProducts);
    }
    
    // Search products
    if (searchBtn) {
        searchBtn.addEventListener('click', searchProducts);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }
    
    // Pagination
    if (paginationBtns.length > 0) {
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                paginationBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // In a real implementation, this would fetch the next page of products
                // For now, we'll just scroll to top
                window.scrollTo({
                    top: document.querySelector('.products-section').offsetTop - 100,
                    behavior: 'smooth'
                });
            });
        });
    }
    
    // Add to cart functionality
    if (addToCartBtns.length > 0) {
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', handleAddToCart);
        });
    }
    
    // Check for URL parameters and apply filters
    window.addEventListener('load', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        
        if (categoryParam && categoryFilter) {
            // Find the matching option in the select
            for (let i = 0; i < categoryFilter.options.length; i++) {
                if (categoryFilter.options[i].value === categoryParam) {
                    categoryFilter.selectedIndex = i;
                    filterProducts();
                    break;
                }
            }
        }
    });
    
    /**
     * Filter products by selected category
     */
    function filterProducts() {
        const selectedCategory = categoryFilter.value;
        
        productCards.forEach(card => {
            if (selectedCategory === 'all' || card.dataset.category === selectedCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update URL with filter
        const url = new URL(window.location);
        if (selectedCategory === 'all') {
            url.searchParams.delete('category');
        } else {
            url.searchParams.set('category', selectedCategory);
        }
        window.history.replaceState({}, '', url);
    }
    
    /**
     * Sort products by selected criteria
     */
    function sortProducts() {
        const selectedSort = sortFilter.value;
        const cards = Array.from(productCards);
        
        cards.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
            const priceB = parseFloat(b.querySelector('.price').textContent.replace('$', ''));
            const nameA = a.querySelector('h3').textContent;
            const nameB = b.querySelector('h3').textContent;
            
            switch (selectedSort) {
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'name-az':
                    return nameA.localeCompare(nameB);
                case 'name-za':
                    return nameB.localeCompare(nameA);
                default: // featured
                    return 0;
            }
        });
        
        // Re-append cards in the new order
        cards.forEach(card => {
            productGrid.appendChild(card);
        });
    }
    
    /**
     * Search products by name
     */
    function searchProducts() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // If search is empty, show all products (respecting category filter)
            filterProducts();
            return;
        }
        
        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            const categoryValue = card.dataset.category;
            const selectedCategory = categoryFilter.value;
            
            // Check if product name contains search term AND matches category (if a category is selected)
            if (productName.includes(searchTerm) && 
                (selectedCategory === 'all' || categoryValue === selectedCategory)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    /**
     * Handle adding a product to the cart
     */
    function handleAddToCart(e) {
        e.preventDefault();
        const card = e.target.closest('.product-card');
        const productName = card.querySelector('h3').textContent;
        const productPrice = card.querySelector('.price').textContent;
        
        // Update cart count in localStorage
        let cartCount = parseInt(localStorage.getItem('cartCount') || '0');
        cartCount++;
        localStorage.setItem('cartCount', cartCount);
        
        // Update cart count display
        const cartCountDisplay = document.querySelector('.cart-count');
        if (cartCountDisplay) {
            cartCountDisplay.textContent = cartCount;
        }
        
        // Save cart item to localStorage
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        const productImage = card.querySelector('.product-image img').src;
        
        // Check if item is already in cart
        const existingItemIndex = cartItems.findIndex(item => item.name === productName);
        
        if (existingItemIndex > -1) {
            // Increase quantity if item already exists
            cartItems[existingItemIndex].quantity += 1;
        } else {
            // Add new item
            cartItems.push({
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Show added to cart message
        showAddedToCartMessage(productName);
    }
    
    /**
     * Display a message when an item is added to the cart
     */
    function showAddedToCartMessage(productName) {
        messageContainer.innerHTML = `<i class="fas fa-check-circle"></i> ${productName} added to cart`;
        messageContainer.classList.add('show');
        
        // Hide message after 3 seconds
        setTimeout(() => {
            messageContainer.classList.remove('show');
        }, 3000);
    }
}); 