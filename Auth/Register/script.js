const passwordInput = document.getElementById("password");
const eyeIcon = document.getElementById("eye-icon");

function togglePassword(event) {
    event.preventDefault();
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    eyeIcon.classList.toggle("fa-eye");
    eyeIcon.classList.toggle("fa-eye-slash");
}

// Confirm password
const confirmPasswordInput = document.getElementById("confirm-password");
const eyeIconConfirm = document.getElementById("eye-icon-confirm");

function toggleConfirmPassword(event) {
    event.preventDefault();
    const type = confirmPasswordInput.type === "password" ? "text" : "password";
    confirmPasswordInput.type = type;
    eyeIconConfirm.classList.toggle("fa-eye");
    eyeIconConfirm.classList.toggle("fa-eye-slash");
}

const form = document.getElementById("register-form");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    
    if (password === confirmPassword) {
        // Create user object
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            status: "Inactive"
        };
        
        // Get users from localStorage or create an empty array
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);
        
        // Save updated users list to localStorage
        localStorage.setItem("users", JSON.stringify(users));
        
        showAlert("success", "User registered successfully");
        
        // Redirect after a slight delay to ensure data is saved
        setTimeout(function () {
            window.location.href = "../Login/index.html";
        }, 500); // Delay to ensure data is saved properly
    } else {
        showAlert("error", "Passwords do not match");
    }
});

function showAlert(type, message) {
    const alertBox = document.getElementById("custom-alert");
    const alertInnerBox = document.getElementById("alert-box");
    const alertMessage = document.getElementById("alert-message");
    const alertIcon = document.getElementById("alert-icon");
    
    // Define alert types with icons and colors
    const types = {
        success: {
            icon: `<i class="fas fa-check-circle fs-4 text-success"></i>`,
            className: "toast-success"
        },
        error: {
            icon: `<i class="fas fa-exclamation-circle fs-4 text-danger"></i>`,
            className: "toast-error"
        },
        warning: {
            icon: `<i class="fas fa-exclamation-triangle fs-4 text-warning"></i>`,
            className: "toast-warning"
        },
        info: {
            icon: `<i class="fas fa-info-circle fs-4 text-info"></i>`,
            className: "toast-info"
        }
    };
    
    // Apply alert type styles
    alertMessage.innerText = message;
    alertIcon.innerHTML = types[type].icon;
    
    // Remove all previous classes and add the new one
    alertInnerBox.classList.remove("toast-success", "toast-error", "toast-warning", "toast-info");
    alertInnerBox.classList.add(types[type].className);
    
    // Show alert
    alertBox.style.display = "block";
    
    // Auto close after 3.5 seconds
    setTimeout(closeAlert, 3500);
}

function closeAlert() {
    const alertBox = document.getElementById("custom-alert");
    const alertInnerBox = document.getElementById("alert-box");
    
    // Add slide-out animation
    alertInnerBox.classList.add("slide-out");
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
        alertBox.style.display = "none";
        alertInnerBox.classList.remove("slide-out");
    }, 300);
}
