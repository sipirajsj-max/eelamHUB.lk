let currentStep = 1;
const totalSteps = 5;
let isEmailVerified = false; 
let isMobileVerified = false;
let photoUploaded = false;

document.addEventListener("DOMContentLoaded", function() {
    updateStepper();
});

function updateStepper() {
    // அனைத்து ஃபார்ம் ஸ்டெப்களையும் கட்டுப்படுத்தல்
    for (let i = 1; i <= totalSteps; i++) {
        const stepEl = document.getElementById(`step${i}`);
        if (stepEl) {
            if (i === currentStep) {
                stepEl.classList.add('active');
            } else {
                stepEl.classList.remove('active');
            }
        }
    }

    // ஸ்டெப்பர் இண்டிகேட்டர்களை புதுப்பித்தல்
    for (let i = 1; i <= totalSteps; i++) {
        const indicator = document.getElementById(`step${i}-indicator`);
        if (indicator) {
            if (i === currentStep) {
                indicator.classList.add('active');
                indicator.classList.remove('completed');
            } else if (i < currentStep) {
                indicator.classList.add('completed');
                indicator.classList.remove('active');
            } else {
                indicator.classList.remove('active', 'completed');
            }
        }
    }

    // புரொக்ரஸ் லைன் அளவைக் கணக்கிடல்
    const progressLine = document.getElementById('progressLine');
    if (progressLine) {
        const progressWidth = ((currentStep - 1) / (totalSteps - 1)) * 100;
        progressLine.style.width = `${progressWidth}%`;
    }

    // பட்டன்களை காட்டுதல் / மறைத்தல்
    document.getElementById('prevBtn').style.display = currentStep === 1 ? 'none' : 'inline-block';
    
    const nextBtn = document.getElementById('nextBtn');
    if (currentStep === totalSteps) {
        nextBtn.innerText = 'Submit Registration';
        nextBtn.classList.add('btn-submit');
    } else {
        nextBtn.innerText = 'Next Step';
        nextBtn.classList.remove('btn-submit');
    }
}

function changeStep(direction) {
    if (direction === 1 && !validateForm()) {
        return; // வேலிடேஷன் பிழையெனில் அடுத்த ஸ்டெப்பிற்கு செல்லாது
    }

    currentStep += direction;

    if (currentStep > totalSteps) {
        alert('Congratulations! Secure Registration Complete.');
        window.location.href = 'dashboard.html'; 
        return;
    }

    if (currentStep === 3) {
        // Step 2-இல் கொடுத்த போன் நம்பரை Step 3-இன் Read-only போன் பாக்ஸிற்கு மாற்றுதல்
        document.getElementById('mobile').value = document.getElementById('personalMobile').value;
    }

    updateStepper();
}

// மின்னஞ்சல் OTP சரிபார்ப்பு
function sendEmailOTP() {
    const email = document.getElementById('email').value;
    if (!email.includes('@') || email.trim() === "") {
        document.getElementById('email-error').style.display = 'block';
        return;
    }
    document.getElementById('email-error').style.display = 'none';
    document.getElementById('emailOtpGroup').style.display = 'block';
    alert('Testing Code: 123456');
}

function verifyEmailOTP() {
    const otpCode = document.getElementById('emailOtp').value;
    if (otpCode === "123456") {
        isEmailVerified = true;
        document.getElementById('email-otp-error').style.display = 'none';
        document.getElementById('emailOtpGroup').style.display = 'none';
        document.getElementById('email').disabled = true;
        document.getElementById('sendEmailOtpBtn').style.display = 'none';
        
        document.getElementById('email-verified-lbl').style.display = 'block';
        document.getElementById('passwordSection').style.display = 'block';
        document.getElementById('googleAuthSection').style.display = 'none';
    } else {
        document.getElementById('email-otp-error').style.display = 'block';
    }
}

// மொபைல் OTP சரிபார்ப்பு
function sendOTP() {
    document.getElementById('otpGroup').style.display = 'block';
    alert('Testing SMS Code: 1234');
}

function verifyMobileOTP() {
    const otp = document.getElementById('otp').value;
    if (otp === "1234") {
        isMobileVerified = true;
        document.getElementById('mobile-otp-error').style.display = 'none';
        document.getElementById('mobile-verified-lbl').style.display = 'block';
    } else {
        document.getElementById('mobile-otp-error').style.display = 'block';
    }
}

// புகைப்படக் காட்சிப்படுத்தல்
function previewProfilePhoto(input) {
    const file = input.files[0];
    const errorElement = document.getElementById('photo-error');
    
    if (file) {
        if (file.size > 2 * 1024 * 1024) {
            errorElement.style.display = 'block';
            input.value = "";
            photoUploaded = false;
            return;
        }
        errorElement.style.display = 'none';
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('previewImg').src = e.target.result;
            document.getElementById('previewImg').style.display = 'block';
            document.getElementById('avatarIcon').style.display = 'none';
            photoUploaded = true;
        }
        reader.readAsDataURL(file);
    }
}

// பாஸ்வேர்ட் பலம் சரிபார்த்தல்
function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    
    const reqLength = document.getElementById('req-length');
    const reqUpper = document.getElementById('req-upper');
    const reqNumber = document.getElementById('req-number');
    const reqSpecial = document.getElementById('req-special');

    let strength = 0;

    if (password.length >= 8) { strength++; reqLength.classList.add('valid'); reqLength.querySelector('i').className = "fas fa-check-circle"; } 
    else { reqLength.classList.remove('valid'); reqLength.querySelector('i').className = "fas fa-circle"; }

    if (/[A-Z]/.test(password)) { strength++; reqUpper.classList.add('valid'); reqUpper.querySelector('i').className = "fas fa-check-circle"; } 
    else { reqUpper.classList.remove('valid'); reqUpper.querySelector('i').className = "fas fa-circle"; }

    if (/[0-9]/.test(password)) { strength++; reqNumber.classList.add('valid'); reqNumber.querySelector('i').className = "fas fa-check-circle"; } 
    else { reqNumber.classList.remove('valid'); reqNumber.querySelector('i').className = "fas fa-circle"; }

    if (/[^A-Za-z0-9]/.test(password)) { strength++; reqSpecial.classList.add('valid'); reqSpecial.querySelector('i').className = "fas fa-check-circle"; } 
    else { reqSpecial.classList.remove('valid'); reqSpecial.querySelector('i').className = "fas fa-circle"; }

    if (password.length === 0) {
        strengthBar.style.width = '0%'; strengthText.innerText = '';
    } else if (strength <= 2) {
        strengthBar.style.width = '33%'; strengthBar.style.backgroundColor = '#ef4444'; strengthText.innerText = 'Weak Password ⚠️'; strengthText.style.color = '#ef4444';
    } else if (strength === 3) {
        strengthBar.style.width = '66%'; strengthBar.style.backgroundColor = '#facc15'; strengthText.innerText = 'Medium Password 🫡'; strengthText.style.color = '#facc15';
    } else if (strength === 4) {
        strengthBar.style.width = '100%'; strengthBar.style.backgroundColor = '#22c55e'; strengthText.innerText = 'Strong Secure Password 🔥'; strengthText.style.color = '#22c55e';
    }
}

function togglePasswordVisibility(inputId, iconId) {
    const passwordInput = document.getElementById(inputId);
    const toggleIcon = document.getElementById(iconId);
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text'; toggleIcon.className = 'far fa-eye-slash eye-icon';
    } else {
        passwordInput.type = 'password'; toggleIcon.className = 'far fa-eye eye-icon';
    }
}

function hideAllErrors() {
    const errorMessages = document.querySelectorAll('.error-msg');
    errorMessages.forEach(msg => {
        if(msg.id !== 'email-otp-error' && msg.id !== 'mobile-otp-error') {
            msg.style.display = 'none';
        }
    });
}

// முதன்மை படிவ வேலிடேஷன்
function validateForm() {
    let isValid = true;
    hideAllErrors();

    if (currentStep === 1) {
        if (!isEmailVerified) { alert('Please verify your email address first.'); return false; }
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const isStrong = document.getElementById('req-length').classList.contains('valid') &&
                         document.getElementById('req-upper').classList.contains('valid') &&
                         document.getElementById('req-number').classList.contains('valid') &&
                         document.getElementById('req-special').classList.contains('valid');

        if (!isStrong) { document.getElementById('password-error').style.display = 'block'; isValid = false; }
        if (password !== confirmPassword) { document.getElementById('password-match-error').style.display = 'block'; isValid = false; }
    } 
    else if (currentStep === 2) {
        const fullname = document.getElementById('fullname').value.trim();
        const nic = document.getElementById('nic').value.trim();
        const age = document.getElementById('age').value;
        const nationality = document.getElementById('nationality').value.trim();
        const district = document.getElementById('district').value;
        const profJob = document.getElementById('profJob').value.trim();
        const mainExp = document.getElementById('mainExp').value;
        const expectedSalary = document.getElementById('expectedSalary').value;
        const homeAddress = document.getElementById('homeAddress').value.trim();
        const personalMobile = document.getElementById('personalMobile').value.trim();
        const whatsappNo = document.getElementById('whatsappNo').value.trim();

        // ஸ்ரீலங்காவின் புதிய (12 எண்கள்) மற்றும் பழைய (9 எண்கள் + V) NIC வடிவங்கள்
        const nicRegex = /^([0-9]{9}[vVxX]|[0-9]{12})$/;
        // ஸ்ரீலங்கா மொபைல் எண்கள் (07XXXXXXXX)
        const phoneRegex = /^(07)[0-9]{8}$/;

        if (fullname === "") { document.getElementById('name-error').style.display = 'block'; isValid = false; }
        if (!nicRegex.test(nic)) { document.getElementById('nic-error').style.display = 'block'; isValid = false; }
        if (age === "" || age < 16 || age > 70) { document.getElementById('age-error').style.display = 'block'; isValid = false; }
        if (nationality === "") { document.getElementById('nationality-error').style.display = 'block'; isValid = false; }
        if (district === "") { document.getElementById('district-error').style.display = 'block'; isValid = false; }
        if (profJob === "") { document.getElementById('profJob-error').style.display = 'block'; isValid = false; }
        if (mainExp === "" || mainExp < 0) { document.getElementById('mainExp-error').style.display = 'block'; isValid = false; }
        if (expectedSalary === "" || expectedSalary <= 0) { document.getElementById('salary-error').style.display = 'block'; isValid = false; }
        if (!photoUploaded) { document.getElementById('photo-error').style.display = 'block'; isValid = false; }
        if (homeAddress === "") { document.getElementById('homeAddress-error').style.display = 'block'; isValid = false; }
        if (!phoneRegex.test(personalMobile)) { document.getElementById('personalMobile-error').style.display = 'block'; isValid = false; }
        if (!phoneRegex.test(whatsappNo)) { document.getElementById('whatsapp-error').style.display = 'block'; isValid = false; }
    } 
    else if (currentStep === 3) {
        if (!isMobileVerified) { alert('Please verify your mobile number via OTP.'); isValid = false; }
    } 
    else if (currentStep === 4) {
        const bank = document.getElementById('bank').value;
        const accName = document.getElementById('accName').value;
        const accNo = document.getElementById('accNo').value;
        if (bank === "") { alert('Please select your bank.'); isValid = false; }
        if (accName.trim() === "") { document.getElementById('bankname-error').style.display = 'block'; isValid = false; }
        if (accNo.trim() === "") { document.getElementById('bankno-error').style.display = 'block'; isValid = false; }
    } 
    else if (currentStep === 5) {
        const terms = document.getElementById('terms').checked;
        if (!terms) { document.getElementById('terms-error').style.display = 'block'; isValid = false; }
    }

    return isValid;
}