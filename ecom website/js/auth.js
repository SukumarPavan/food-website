const API_URL = 'http://localhost:5000/api';

async function signup(userData) {
    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error);
        }

        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
    } catch (error) {
        throw error;
    }
}

async function login(credentials) {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error);
        }

        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
    } catch (error) {
        throw error;
    }
}

async function updateProfile(profileData) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(profileData)
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error);
        }

        // Update stored user data
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    } catch (error) {
        throw error;
    }
}

function registerUser(userData) {
    const errorDiv = document.getElementById('signupError');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }

    fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            if (document.getElementById('signupError')) {
                showError(data.error);
            }
        } else {
            // Store user data
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            // Redirect to home page
            window.location.href = '/home.html';
        }
    })
    .catch(error => {
        if (document.getElementById('signupError')) {
            showError('Connection error. Please try again.');
        }
    });
}

function loginUser(credentials) {
    const errorDiv = document.getElementById('loginError');
    errorDiv.style.display = 'none';

    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showError(data.error);
        } else {
            // Store user data
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            // Redirect to home page
            window.location.href = '/home.html';
        }
    })
    .catch(error => {
        showError('Connection error. Please try again.');
    });
}

function showError(message) {
    const errorDiv = document.getElementById('loginError');
    errorDiv.querySelector('span').textContent = message;
    errorDiv.style.display = 'flex';
    
    // Add error class to password field
    document.getElementById('password').parentElement.classList.add('error');
}

function placeOrder(orderData) {
    console.log('Sending order data:', orderData);
    fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Order response:', data);
        if (data.error) {
            alert(data.error);
        } else {
            alert('Order placed successfully!');
            // Handle successful order
        }
    })
    .catch(error => {
        console.error('Order error:', error);
        alert('Failed to place order!');
    });
}

let verificationTimer = null;

function isValidIndianPhone(phone) {
    // Remove spaces and dashes
    phone = phone.replace(/[\s-]/g, '');
    
    // Check if it starts with +91 and has 10 digits after that
    const phoneRegex = /^\+91[6-9]\d{9}$/;
    return phoneRegex.test(phone);
}

function formatPhoneNumber(phone) {
    // Ensure phone number starts with +91
    if (!phone.startsWith('+91')) {
        phone = '+91' + phone.replace(/^\+?91?/, '');
    }
    return phone;
}

function updateTimer(seconds) {
    const timerElement = document.getElementById('codeTimer');
    if (seconds > 0) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timerElement.textContent = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    } else {
        timerElement.textContent = 'Expired';
        document.getElementById('verifyCodeBtn').disabled = true;
        document.getElementById('sendCodeBtn').disabled = false;
    }
}

function showPhoneError(message, isSuccess = false) {
    const container = document.querySelector('.phone-verification');
    const existingError = container.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = `error-message ${isSuccess ? 'success' : ''}`;
    errorDiv.innerHTML = `
        <i class="fas fa-${isSuccess ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    container.appendChild(errorDiv);

    if (!isSuccess) {
        container.classList.add('error');
        setTimeout(() => {
            errorDiv.remove();
            container.classList.remove('error');
        }, 3000);
    }
}

document.getElementById('signupPhone').addEventListener('input', function(e) {
    let phone = e.target.value;
    phone = phone.replace(/[^\d+]/g, '');
    
    if (!phone.startsWith('+91') && phone.length > 0) {
        phone = '+91' + phone;
    }
    
    if (phone.length > 13) {
        phone = phone.slice(0, 13);
    }
    
    e.target.value = phone;
});

document.getElementById('sendCodeBtn').addEventListener('click', async function() {
    const phone = document.getElementById('signupPhone').value;
    
    if (!phone.match(/^\+91[6-9]\d{9}$/)) {
        showPhoneError('Please enter a valid Indian phone number');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/send-verification', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone })
        });

        const data = await response.json();
        
        if (data.error) {
            showPhoneError(data.error);
            return;
        }

        // Show verification section
        document.querySelector('.verification-section').style.display = 'block';
        this.disabled = true;

        // Start timer
        let timeRemaining = 300; // 5 minutes
        updateTimer(timeRemaining);

        if (verificationTimer) clearInterval(verificationTimer);
        verificationTimer = setInterval(() => {
            timeRemaining--;
            updateTimer(timeRemaining);
            if (timeRemaining <= 0) {
                clearInterval(verificationTimer);
            }
        }, 1000);

        showPhoneError('Verification code sent successfully!', true);
    } catch (error) {
        showPhoneError('Error sending verification code');
    }
});

document.getElementById('verifyCodeBtn').addEventListener('click', async function() {
    const phone = document.getElementById('signupPhone').value;
    const code = document.getElementById('verificationCode').value;

    if (!code || code.length !== 6) {
        showPhoneError('Please enter a valid 6-digit code');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/verify-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, code })
        });

        const data = await response.json();
        
        if (data.error) {
            showPhoneError(data.error);
            return;
        }

        // Show success
        const verificationSection = document.querySelector('.verification-section');
        verificationSection.classList.add('verified');
        
        // Enable create account button
        document.querySelector('.create-btn').disabled = false;
        
        // Store verification status
        localStorage.setItem('phoneVerified', phone);
        
        showPhoneError('✓ Phone verified successfully', true);
        
        // Disable verification inputs
        document.getElementById('verificationCode').disabled = true;
        this.disabled = true;
    } catch (error) {
        showPhoneError('Error verifying code');
    }
});

// Function to handle signup
function handleSignup(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const termsCheckbox = document.getElementById('termsCheckbox');

    // Remove any existing error messages
    removeExistingErrors();

    // Validate form
    if (!name || name.trim().length < 2) {
        showError('name', 'Please enter a valid name');
        return false;
    }

    if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        return false;
    }

    if (password.length < 6) {
        showError('password', 'Password must be at least 6 characters');
        return false;
    }

    if (password !== confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        return false;
    }

    if (!termsCheckbox.checked) {
        showError('terms', 'Please accept the terms and privacy policy');
        return false;
    }

    // Send signup request to server
    fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showError('email', data.error);
        } else {
            window.location.href = 'login.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showError('general', 'Signup failed. Please try again.');
    });

    return false;
}

// Function to handle login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Remove any existing error messages
    removeExistingErrors();

    // Validate email format
    if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        return false;
    }

    // Send login request to server
    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            if (data.error.includes('not registered')) {
                showError('email', 'Email not registered');
            } else if (data.error.includes('password')) {
                showError('password', 'Invalid password');
            } else {
                showError('general', data.error);
            }
        } else {
            // Store user data and redirect
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            window.location.href = 'home.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showError('general', 'Login failed. Please try again.');
    });

    return false;
}

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to validate phone format
function isValidPhone(phone) {
    const phoneRegex = /^\+?\d{1,3}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    return phoneRegex.test(phone);
}

// Function to show error messages
function showError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;

    let container;
    switch(field) {
        case 'name':
            container = document.getElementById('signupName')?.closest('.input-icon');
            break;
        case 'email':
            container = document.querySelector('input[type="email"]')?.closest('.input-icon');
            break;
        case 'password':
            container = document.querySelector('input[type="password"]')?.closest('.input-icon');
            break;
        case 'confirmPassword':
            container = document.querySelectorAll('input[type="password"]')[1]?.closest('.input-icon');
            break;
        case 'terms':
            container = document.querySelector('.terms-check');
            break;
        case 'phone':
            container = document.getElementById('signupPhone')?.closest('.input-icon');
            break;
        default:
            container = document.querySelector('.auth-content');
    }

    if (container) {
        container.classList.add('error');
        container.appendChild(errorDiv);
    }
}

// Function to remove existing errors
function removeExistingErrors() {
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.error').forEach(element => element.classList.remove('error'));
}

// Add input event listeners to remove errors on typing
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const container = this.closest('.input-icon') || this.closest('.terms-check');
            if (container && container.classList.contains('error')) {
                container.classList.remove('error');
                const errorMessage = container.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });
    });
});

// For testing - log the users in localStorage
console.log('Current users:', JSON.parse(localStorage.getItem('users') || '[]')); 