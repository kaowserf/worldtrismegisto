// Initialize mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (!mobileMenu) return;
        
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnButton = mobileMenuBtn.contains(event.target);
        
        if (mobileMenu.classList.contains('active') && !isClickInsideMenu && !isClickOnButton) {
            toggleMobileMenu();
        }
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', () => {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('active') && window.innerWidth > 768) {
            toggleMobileMenu();
        }
    });
}

function createMobileMenu() {
    // Create mobile menu container if it doesn't exist
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');
    
    // Create navigation links container
    const navLinks = document.createElement('div');
    navLinks.classList.add('nav-links');
    
    // Define the categories with their icons
    const categories = [
        { text: 'Men', icon: 'fas fa-mars', href: 'shop.html?category=men' },
        { text: 'Women', icon: 'fas fa-venus', href: 'shop.html?category=women' },
        { text: 'Tarot Reading', icon: 'fas fa-star', href: 'tarot.html' }
    ];
    
    // Add category links
    categories.forEach(category => {
        const link = document.createElement('a');
        link.href = category.href;
        
        const icon = document.createElement('i');
        icon.className = `${category.icon} category-icon`;
        
        link.appendChild(icon);
        link.appendChild(document.createTextNode(category.text));
        navLinks.appendChild(link);
    });
    
    // Add the navigation links to the mobile menu
    mobileMenu.appendChild(navLinks);
    
    // Add the mobile menu to the document
    document.body.appendChild(mobileMenu);
    
    return mobileMenu;
}

function toggleMobileMenu() {
    let mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    // Create mobile menu if it doesn't exist
    if (!mobileMenu) {
        mobileMenu = createMobileMenu();
    }
    
    // Toggle active class on mobile menu
    mobileMenu.classList.toggle('active');
    
    // Update hamburger icon
    if (mobileMenu.classList.contains('active')) {
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initMobileMenu);

// Initialize immediately if DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initMobileMenu();
} 