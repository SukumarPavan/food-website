const crypto = require('crypto');

class VerificationCode {
    constructor() {
        this.codes = new Map();
    }

    generateCode(phoneNumber) {
        // Generate a 6-digit code
        const code = crypto.randomInt(100000, 999999).toString();
        const expiryTime = Date.now() + (5 * 60 * 1000); // 5 minutes from now

        // Store the code with phone number and expiry
        this.codes.set(phoneNumber, {
            code,
            expiryTime,
            attempts: 0,
            used: false
        });

        // Cleanup expired codes every minute
        setTimeout(() => {
            this.removeExpiredCode(phoneNumber);
        }, 5 * 60 * 1000);

        return code;
    }

    verifyCode(phoneNumber, submittedCode) {
        const codeData = this.codes.get(phoneNumber);
        
        if (!codeData) {
            return { valid: false, message: 'No verification code found. Please request a new code.' };
        }

        if (codeData.used) {
            return { valid: false, message: 'This code has already been used.' };
        }

        if (Date.now() > codeData.expiryTime) {
            this.removeExpiredCode(phoneNumber);
            return { valid: false, message: 'Code has expired. Please request a new code.' };
        }

        if (codeData.attempts >= 3) {
            this.removeExpiredCode(phoneNumber);
            return { valid: false, message: 'Too many attempts. Please request a new code.' };
        }

        if (codeData.code !== submittedCode) {
            codeData.attempts++;
            return { valid: false, message: 'Invalid code. Please try again.' };
        }

        // Mark code as used
        codeData.used = true;
        return { valid: true, message: 'Code verified successfully.' };
    }

    removeExpiredCode(phoneNumber) {
        this.codes.delete(phoneNumber);
    }

    getTimeRemaining(phoneNumber) {
        const codeData = this.codes.get(phoneNumber);
        if (!codeData) return 0;
        
        const remaining = Math.max(0, codeData.expiryTime - Date.now());
        return Math.floor(remaining / 1000); // Convert to seconds
    }
}

module.exports = new VerificationCode(); 