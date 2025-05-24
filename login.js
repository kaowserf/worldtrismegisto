document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    // Toggle password visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.querySelector('i').classList.toggle('fa-eye');
            togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    // Handle form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = loginForm.email.value;
            const password = loginForm.password.value;
            const remember = loginForm.remember.checked;

            try {
                // Show loading state
                const submitButton = loginForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';

                // Here you would typically make an API call to your backend
                // For now, we'll simulate a login process
                await simulateLogin(email, password, remember);

                // Redirect to dashboard or previous page
                const redirectUrl = new URLSearchParams(window.location.search).get('redirect') || 'dashboard.html';
                window.location.href = redirectUrl;

            } catch (error) {
                showError(error.message);
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
    }

    // Handle social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const provider = button.classList.contains('google') ? 'Google' : 'Facebook';
            handleSocialLogin(provider);
        });
    });
});

// Simulate login process (replace with actual API calls)
function simulateLogin(email, password, remember) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email && password) {
                // Store auth token in localStorage or sessionStorage based on remember choice
                const token = generateToken();
                if (remember) {
                    localStorage.setItem('authToken', token);
                } else {
                    sessionStorage.setItem('authToken', token);
                }
                resolve();
            } else {
                reject(new Error('Invalid email or password'));
            }
        }, 1500);
    });
}

// Handle social login (replace with actual OAuth implementation)
function handleSocialLogin(provider) {
    // Here you would typically implement OAuth flow
    console.log(`Logging in with ${provider}...`);
    // For now, just show a message
    showMessage(`${provider} login will be implemented soon!`);
}

// Helper function to show error messages
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'auth-error';
    errorDiv.textContent = message;

    const form = document.getElementById('login-form');
    form.insertBefore(errorDiv, form.firstChild);

    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Helper function to show messages
function showMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'auth-message';
    messageDiv.textContent = message;

    const form = document.getElementById('login-form');
    form.insertBefore(messageDiv, form.firstChild);

    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Generate a random token (replace with actual token generation)
function generateToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Check if user is already logged in
function checkAuthStatus() {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
        // Redirect to dashboard if already logged in
        window.location.href = 'dashboard.html';
    }
}

// Initialize auth status check
checkAuthStatus(); 