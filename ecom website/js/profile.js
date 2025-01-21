document.addEventListener('DOMContentLoaded', () => {
    loadUserProfile();
    setupEventListeners();
});

// Load user profile from localStorage
function loadUserProfile() {
    const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {
        name: 'Marvis Ighedosa',
        email: 'dosamarvis@gmail.com',
        phone: '+234 9011039271',
        address: 'No 15 uti street off ovie palace road effurun delta state'
    };

    document.getElementById('userName').textContent = userProfile.name;
    document.getElementById('userEmail').textContent = userProfile.email;
    document.getElementById('userPhone').textContent = userProfile.phone;
    document.getElementById('userAddress').textContent = userProfile.address;
}

function setupEventListeners() {
    // Change button click
    document.querySelector('.change-btn').addEventListener('click', openEditModal);
    
    // Close modal
    document.querySelector('.close-btn').addEventListener('click', closeEditModal);
    
    // Edit form submission
    document.getElementById('editProfileForm').addEventListener('submit', handleProfileUpdate);
    
    // Email verification button
    document.getElementById('verifyEmailBtn')?.addEventListener('click', handleEmailVerification);
}

function openEditModal() {
    const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
    
    document.getElementById('editName').value = userProfile.name || '';
    document.getElementById('editEmail').value = userProfile.email || '';
    document.getElementById('editPhone').value = userProfile.phone || '';
    document.getElementById('editAddress').value = userProfile.address || '';
    
    document.getElementById('editProfileModal').classList.add('active');
}

function closeEditModal() {
    document.getElementById('editProfileModal').classList.remove('active');
    // Clear any validation messages
    document.querySelectorAll('.validation-message').forEach(el => el.remove());
}

async function handleProfileUpdate(e) {
    e.preventDefault();
    
    const newEmail = document.getElementById('editEmail').value;
    const currentProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
    
    // Check if email has changed
    if (newEmail !== currentProfile.email) {
        // Show email verification modal
        showEmailVerificationModal(newEmail);
        return;
    }

    updateProfileData();
}

function updateProfileData() {
    const updatedProfile = {
        name: document.getElementById('editName').value,
        email: document.getElementById('editEmail').value,
        phone: document.getElementById('editPhone').value,
        address: document.getElementById('editAddress').value
    };

    // Validate email format
    if (!isValidEmail(updatedProfile.email)) {
        showValidationError('editEmail', 'Please enter a valid email address');
        return;
    }

    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    
    // Update UI
    loadUserProfile();
    
    // Close modal and show notification
    closeEditModal();
    showNotification('Profile details updated successfully!');
}

function showEmailVerificationModal(newEmail) {
    const verificationCode = Math.floor(100000 + Math.random() * 900000); // 6-digit code
    
    const modal = document.createElement('div');
    modal.className = 'modal verification-modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Verify Email</h3>
                <button class="close-btn">&times;</button>
            </div>
            <p>We've sent a verification code to ${newEmail}</p>
            <div class="verification-code-input">
                <input type="text" maxlength="6" placeholder="Enter 6-digit code">
            </div>
            <div class="verification-actions">
                <button class="verify-btn">Verify Email</button>
                <button class="resend-btn">Resend Code</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Store verification code temporarily
    sessionStorage.setItem('verificationCode', verificationCode);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.close-btn');
    const verifyBtn = modal.querySelector('.verify-btn');
    const resendBtn = modal.querySelector('.resend-btn');
    const codeInput = modal.querySelector('input');

    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    verifyBtn.addEventListener('click', () => {
        if (codeInput.value === sessionStorage.getItem('verificationCode')) {
            updateProfileData();
            modal.remove();
            showNotification('Email verified successfully!');
        } else {
            showValidationError('verification-code', 'Invalid verification code');
        }
    });

    resendBtn.addEventListener('click', () => {
        const newCode = Math.floor(100000 + Math.random() * 900000);
        sessionStorage.setItem('verificationCode', newCode);
        showNotification('New verification code sent!');
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showValidationError(inputId, message) {
    const input = document.getElementById(inputId);
    const existingError = input.parentElement.querySelector('.validation-message');
    
    if (existingError) {
        existingError.textContent = message;
    } else {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'validation-message';
        errorDiv.textContent = message;
        input.parentElement.appendChild(errorDiv);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }, 100);
} 