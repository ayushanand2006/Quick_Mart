const form = document.getElementById("login-form");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);

    // checking if user is registered
    if (user) {
        const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
        // creating current user credential
        const currentUserCredential = [{
            firstName: user.firstName,
            email: email,
            password: password
        }];

        // checking if user already logged in
        const currentUserData = currentUser.find(user => user.email === email && user.password === password);
        
        if (currentUserData) {
            showAlert("success", "User logged in successfully");
            user.status = "active";
            users.push(user);
            users.splice(users.indexOf(user), 1);
            localStorage.setItem("users", JSON.stringify(users));
            // Redirect after a slight delay to ensure data is saved
            setTimeout(function () {
                window.location.href = "../../main/index.html";
            }
            , 500);
        } else {
            // saving current user credential in local storage
            localStorage.setItem("currentUser", JSON.stringify(currentUserCredential));
            showAlert("success", "User logged in successfully");
            user.status = "active";
            users.push(user);
            users.splice(users.indexOf(user), 1);
            localStorage.setItem("users", JSON.stringify(users));
            
            // Redirect after a slight delay to ensure data is saved
            setTimeout(function () {
                window.location.href = "../../main/index.html";
            }, 500);
        }
    } else {
        showAlert("error", "Invalid credentials");
    }
});

function showAlert(type, message) {
    const alertBox = document.getElementById("custom-alert");
    const alertInnerBox = document.getElementById("alert-box");
    const alertMessage = document.getElementById("alert-message");
    const alertIcon = document.getElementById("alert-icon");
    
    // Define alert types with SVG icons and colors
    const types = {
        success: {
            icon: `<i data-feather="check-circle" class="text-success"></i>`,
            className: "toast-success"
        },
        error: {
            icon: `<i data-feather="alert-circle" class="text-danger"></i>`,
            className: "toast-error"
        },
        warning: {
            icon: `<i data-feather="alert-triangle" class="text-warning"></i>`,
            className: "toast-warning"
        },
        info: {
            icon: `<i data-feather="info" class="text-info"></i>`,
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
    
    // Initialize Feather icons for the alert icon
    feather.replace();
    
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
