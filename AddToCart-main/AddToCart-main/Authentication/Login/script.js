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
        }]

        // checking if user already logged in
        const currentUserData = currentUser.find(user => user.email === email && user.password === password);
        // console.log(currentUserData, "currentUserData");
        if (currentUserData) {
            showAlert("error", "User already logged in");
        } else {
            // saving current user credential in local storage
            // currentUser.push(currentUserCredential);
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
})
function showAlert(type, message) {
    const alertBox = document.getElementById("custom-alert");
    const alertInnerBox = document.getElementById("alert-box");
    const alertMessage = document.getElementById("alert-message");
    const alertIcon = document.getElementById("alert-icon");

    // Define alert types with SVG icons and colors
    const types = {
        success: {
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                </svg>`,
            backgroundColor: "#22c55e"
        },
        error: {
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12" y2="16" />
                </svg>`,
            backgroundColor: "#ef4444"
        },
        warning: {
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 9v2m0 4h.01" />
                    <path d="M5.05 19h13.9a2 2 0 0 0 1.732-1l6.5-11a2 2 0 0 0-1.732-3H5.05a2 2 0 0 0-1.732 3l6.5 11a2 2 0 0 0 1.732 1z" />
                </svg>`,
            backgroundColor: "#f59e0b"
        },
        info: {
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="16" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                </svg>`,
            backgroundColor: "#3b82f6"
        }
    };

    // Apply alert type styles
    alertMessage.innerText = message;
    alertIcon.innerHTML = types[type].icon;
    alertInnerBox.style.backgroundColor = types[type].backgroundColor;

    // Show alert with animation
    alertBox.classList.remove("hidden");
    alertInnerBox.classList.add("show-alert");

    // Auto close after 3.5 seconds
    setTimeout(closeAlert, 3500);
}

// Close alert with animation
function closeAlert() {
    const alertBox = document.getElementById("custom-alert");
    const alertInnerBox = document.getElementById("alert-box");

    // Hide with animation
    alertInnerBox.classList.remove("show-alert");
    alertInnerBox.classList.add("hide-alert");

    // Wait for animation to complete before hiding
    setTimeout(() => {
        alertBox.classList.add("hidden");
        alertInnerBox.classList.remove("hide-alert");
    }, 300);
}