// Check authentication and initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }
    initializeDashboard();
});

// Authentication check
function isAuthenticated() {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
}

// Initialize all dashboard components
function initializeDashboard() {
    loadUserData();
    initializeNavigation();
    initializeForms();
    initializeLogout();
}

// Load mock user data (replace with API calls in production)
function loadUserData() {
    const mockUserData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234 567 8900',
        birthdate: '1990-01-01'
    };

    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        Object.keys(mockUserData).forEach(key => {
            const input = profileForm.querySelector(`#${key}`);
            if (input) input.value = mockUserData[key];
        });

        const userName = document.querySelector('.user-name');
        if (userName) userName.textContent = `Welcome, ${mockUserData.name}!`;
    }
}

// Handle dashboard navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.dashboard-nav a[data-section]');
    const sections = document.querySelectorAll('.dashboard-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            link.classList.add('active');
            const sectionId = link.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');

            if (window.innerWidth <= 768) {
                document.querySelector('.dashboard-content').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle URL hash navigation
    const hash = window.location.hash.substring(1);
    if (hash) {
        const link = document.querySelector(`.dashboard-nav a[data-section="${hash}"]`);
        if (link) link.click();
    }
}

// Initialize form handling
function initializeForms() {
    // Profile form
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await handleFormSubmission(profileForm, 'Profile updated successfully!');
        });
    }

    // Settings form
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const newPassword = settingsForm.newPassword.value;
            const confirmPassword = settingsForm.confirmPassword.value;
            
            if (newPassword !== confirmPassword) {
                showNotification('Passwords do not match!', 'error');
                return;
            }
            
            await handleFormSubmission(settingsForm, 'Settings updated successfully!');
        });
    }

    // Address button
    const addAddressBtn = document.querySelector('.add-address-btn');
    if (addAddressBtn) {
        addAddressBtn.addEventListener('click', () => {
            showNotification('Address form will be implemented soon!', 'info');
        });
    }

    // Notification toggles
    const notificationToggles = document.querySelectorAll('input[type="checkbox"]');
    notificationToggles.forEach(toggle => {
        toggle.addEventListener('change', async () => {
            await handleNotificationToggle(toggle);
        });
    });
}

// Handle form submissions
async function handleFormSubmission(form, successMessage) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    try {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        showNotification(successMessage, 'success');
        
    } catch (error) {
        showNotification('An error occurred. Please try again.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
}

// Handle notification preference changes
async function handleNotificationToggle(toggle) {
    try {
        toggle.disabled = true;
        await new Promise(resolve => setTimeout(resolve, 500));
        showNotification('Notification preferences updated!', 'success');
    } catch (error) {
        showNotification('Failed to update notification preferences.', 'error');
        toggle.checked = !toggle.checked;
    } finally {
        toggle.disabled = false;
    }
}

// Initialize logout functionality
function initializeLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('authToken');
            sessionStorage.removeItem('authToken');
            window.location.href = 'login.html';
        });
    }
}

// Show notification messages
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `dashboard-notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '8px',
        backgroundColor: type === 'success' ? '#4CAF50' :
                       type === 'error' ? '#f44336' :
                       type === 'info' ? '#2196F3' : '#ff9800',
        color: 'white',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: '1000',
        opacity: '0',
        transform: 'translateY(-20px)',
        transition: 'all 0.3s ease'
    });

    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
} 