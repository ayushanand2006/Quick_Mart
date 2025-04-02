// Cart se item hatao aur history mein bhejne wala function
function cartRemove(index) {
    let cartData = JSON.parse(localStorage.getItem("cartData")) || [];
    let historyData = JSON.parse(localStorage.getItem("historyData")) || [];

    if (cartData.length > 0) {
        let scrollPos = window.scrollY;
        let item = cartData[index];
        let title = item.title;

        item.removedAt = new Date().toISOString();
        historyData.push(item);
        localStorage.setItem("historyData", JSON.stringify(historyData));

        cartData.splice(index, 1);
        localStorage.setItem("cartData", JSON.stringify(cartData));

        DataFunction();
        showToast(`${title} has been moved to history`, 'info', 'top-right');

        window.scrollTo(0, scrollPos);
    }
}

// History se item ko cart mein vapas bhejne wala function
function returnToCart(index) {
    let historyData = JSON.parse(localStorage.getItem("historyData")) || [];
    let cartData = JSON.parse(localStorage.getItem("cartData")) || [];

    if (historyData.length > 0 && index < historyData.length) {
        let scrollPos = window.scrollY;
        let item = historyData[index];
        let title = item.title;

        delete item.removedAt;
        cartData.push(item);
        localStorage.setItem("cartData", JSON.stringify(cartData));

        historyData.splice(index, 1);
        localStorage.setItem("historyData", JSON.stringify(historyData));
        displayHistory();

        showToast(`${title} has been returned to your cart`, 'success', 'top-right');
        window.scrollTo(0, scrollPos);
    }
}

// History se item ko permanent delete karne wala function
function deleteFromHistory(index) {
    let historyData = JSON.parse(localStorage.getItem("historyData")) || [];

    if (historyData.length > 0 && index < historyData.length) {
        let scrollPos = window.scrollY;
        let item = historyData[index];
        let title = item.title;

        historyData.splice(index, 1);
        localStorage.setItem("historyData", JSON.stringify(historyData));
        displayHistory();

        showToast(`${title} has been permanently removed`, 'error', 'top-right');
        window.scrollTo(0, scrollPos);
    }
}

// History items ko screen pe dikhane wala function
function displayHistory() {
    const historyContainer = document.querySelector("#historyData");

    if (!historyContainer) {
        console.error("History container not found!");
        return;
    }

    const historyData = JSON.parse(localStorage.getItem("historyData")) || [];

    if (historyData.length === 0) {
        // Koi items nahi hai history mein - empty wala function call hoga
        historyContainer.innerHTML = `
        <div class="col-12 d-flex justify-content-center">
            <div class="empty-history-container">
                <div class="empty-history-illustration">
                    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="empty-history-icon">
                        <path d="M12 8v4l3 3"></path>
                        <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                    <div class="empty-history-animation"></div>
                </div>
                <h2 class="empty-history-title">No History Found</h2>
                <p class="empty-history-message">Items you remove from your cart will appear here.</p>
                <a href="../cart/index.html" class="empty-history-button">
                    Return to Cart
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ms-2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            </div>
        </div>
        `;
        addEmptyHistoryStyles(); // Empty history styles ko add karne wala function ko call kiya
        return;
    }

    // History items hai to unko dikhane wala function
    let html = '';
    for (let i = 0; i < historyData.length; i++) {
        let product = historyData[i];
        html += `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="history-item h-100">
                <div class="product-image-wrapper">
                    <img src="${product.thumbnail}" class="product-image" alt="Product Image">
                    <div class="rating-badge">
                        <i class="fas fa-star me-1"></i> ${product.rating}
                    </div>
                </div>
                <div class="product-details">
                    <h5 class="product-title">${product.title}</h5>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">💲${product.price.toFixed(2)}</div>
                    <div class="history-actions">
                        <button onclick="returnToCart(${i})" class="return-btn">
                            <i class="fas fa-shopping-cart"></i> Return to Cart
                        </button>
                        <button onclick="deleteFromHistory(${i})" class="delete-btn">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    historyContainer.innerHTML = html;
}

// Empty history wale CSS styles ko add hai ye wale function me
function addEmptyHistoryStyles() {
    let style = document.getElementById('empty-history-styles');
    if (style) {
        style.remove(); // Agar pehle se hai to hata dega ye function
    }

    style = document.createElement('style');
    style.id = 'empty-history-styles';

    // Maine CSS style content yaha se hata ya hai 

    document.head.appendChild(style); // Style ko head mein add karaya
}

// History items ke CSS styles ko add kiya ha ye wale function me
function addHistoryStyles() {
    const style = document.createElement('style');
    style.id = 'history-styles';

    // Maine CSS style content yaha se hata ya hai

    document.head.appendChild(style); // Style ko head mein add karaya
}

// History page ko initialize kiya
function initHistoryPage() {
    addHistoryStyles(); // Styles Ko add kiya
    displayHistory(); // Items ko yah pe dikhaya
}

document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector("#historyData")) {
        initHistoryPage(); // History page initialize kiya
    }
});

// Toast notification ka function
function createToastContainer(position = 'top-right') {
    const containerId = `toast-container-${position}`;

    // Agar container pehle se nahi hai to banao
    if (!document.getElementById(containerId)) {
        const toastContainer = document.createElement('div');
        toastContainer.id = containerId;

        // Toast ka position
        let positionStyle = '';
        if (position === 'top-center') {
            positionStyle = `top: 20px; left: 50%; transform: translateX(-50%);`;
        } else if (position === 'top-right') {
            positionStyle = `top: 20px; right: 20px;`;
        } else if (position === 'top-left') {
            positionStyle = `top: 20px; left: 20px;`;
        } else {
            positionStyle = `top: 20px; right: 20px;`;
        }

        toastContainer.style.cssText = `
            position: fixed;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
            ${positionStyle}
        `;

        document.body.appendChild(toastContainer);
    }

    return document.getElementById(containerId);
}

// Toast notification show karne wala function
function showToast(message, type = 'success', position = 'top-right') {
    const toastContainer = createToastContainer(position);
    const toast = document.createElement('div');
    toast.classList.add('toast');

    // Ye Toast ka style type hai
    let bgColor, borderColor, iconColor, icon, textColor;
    if (type === 'success') {
        bgColor = '#f0fdf4';
        borderColor = '#22c55e';
        iconColor = '#16a34a';
        textColor = '#166534';
        icon = '<i class="fas fa-check-circle"></i>';
    } else if (type === 'error') {
        bgColor = '#fef2f2';
        borderColor = '#ef4444';
        iconColor = '#dc2626';
        textColor = '#991b1b';
        icon = '<i class="fas fa-exclamation-circle"></i>';
    } else if (type === 'info') {
        bgColor = '#eff6ff';
        borderColor = '#1d4ed8';
        iconColor = '#2563eb';
        textColor = '#1e40af';
        icon = '<i class="fas fa-info-circle"></i>';
    } else if (type === 'warning') {
        bgColor = '#fffbeb';
        borderColor = '#f59e0b';
        iconColor = '#d97706';
        textColor = '#92400e';
        icon = '<i class="fas fa-exclamation-triangle"></i>';
    } else {
        bgColor = '#f0fdf4';
        borderColor = '#22c55e';
        iconColor = '#16a34a';
        textColor = '#166534';
        icon = '<i class="fas fa-check-circle"></i>';
    }

    // Ye Animation ke liye transform function hai
    let initialTransform, finalTransform;
    if (position === 'top-center') {
        initialTransform = 'translateY(-100%)';
        finalTransform = 'translateY(0)';
    } else {
        initialTransform = 'translateX(100%)';
        finalTransform = 'translateX(0)';
    }

    toast.style.cssText = `
        background: ${bgColor};
        color: ${textColor};
        padding: 12px 20px;
        border-radius: 6px;
        border-left: 4px solid ${borderColor};
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        display: flex;
        align-items: center;
        min-width: 300px;
        max-width: 380px;
        font-weight: 500;
        opacity: 0;
        transform: ${initialTransform};
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        position: relative;
    `;

    toast.innerHTML = `
        <div style="color: ${iconColor}; margin-right: 12px; font-size: 18px;">${icon}</div>
        <div style="flex-grow: 1; font-size: 14px;">${message}</div>
        <div style="margin-left: 12px; cursor: pointer; color: #6b7280; font-size: 12px;" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </div>
        <div class="toast-progress" style="position: absolute; bottom: 0; left: 0; height: 3px; width: 100%; background: ${borderColor}; transform-origin: left; opacity: 0.5;"></div>
    `;

    toastContainer.appendChild(toast);

    // Toast ko show karne ka function
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = finalTransform;

        // Progress bar ko animate karne ka function
        const progressBar = toast.querySelector('.toast-progress');
        progressBar.style.transition = 'transform 3s linear';
        progressBar.style.transform = 'scaleX(0)';
    }, 50);

    // Toast ko 3.5 second baad hide karne ka fuction
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = initialTransform;

        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3500);

    // Mouse hover pe animation rokne kar function hai ye
    toast.addEventListener('mouseenter', () => {
        const progressBar = toast.querySelector('.toast-progress');
        progressBar.style.transition = 'none';
    });

    // Mouse leave pe animation wapas start karne ka fuction hai ye
    toast.addEventListener('mouseleave', () => {
        const progressBar = toast.querySelector('.toast-progress');
        progressBar.style.transition = 'transform 3s linear';
        progressBar.style.transform = 'scaleX(0)';
    });
}

function loginCheck() {
    const users = JSON.parse(localStorage.getItem("users")) || []
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || []
    const userInfo = document.getElementById("userGreetingTab")
    const authButtons = document.getElementById("accountTab")
    const userName = document.getElementById("user-name")
    // console.log(currentUser);
    if (currentUser.length > 0) {
        currentUser.forEach(user => {
            const currentUserEmail = user.email
            const currentUserPassword = user.password
            console.log(currentUserEmail, currentUserPassword);
            let currenUserData = users.find(user => user.email === currentUserEmail && user.password === currentUserPassword && user.status === "active")
            userName.innerText = currenUserData.firstName
        });

        userInfo.style.display = "flex"
        // authButtons.style.display = "none"

    } else {
        userInfo.style.display = "none"
        // authButtons.style.display = "flex"
    }

}
loginCheck()

// Export the function if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { showToast };
}

// Ye function profile modal ko kholta hai jab user profile link pe click karta hai
document.getElementById("profileLink").addEventListener("click", function () {
    // Ye function localStorage se current user ki details ko uthata hai
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Jab user logged in hai tab hi profile modal khulega
    if (currentUser.length > 0) {
        const userEmail = currentUser[0].email;
        const userPassword = currentUser[0].password;

        // Ye function active user ko array me se dhoond ta hai
        const userData = users.find(user =>
            user.email === userEmail &&
            user.password === userPassword &&
            user.status === "active"
        );

        if (userData) {
            // Phir user data ko modal me dikhata hain
            const profileData = document.getElementById("userProfileData");

            // Profile modal me user data ko set Karta hai ye function
            profileData.innerHTML = `
                <div class="text-center mb-4">
                    <div class="mx-auto bg-light rounded-circle d-flex justify-content-center align-items-center mb-3" 
                         style="width: 100px; height: 100px;">
                        <img src="img/user-svgrepo-com.svg" alt="User Avatar" class="rounded-circle" 
                             style="width: 80%; height: 80%; object-fit: cover;">
                    </div>
                    <h4 class="text-success fw-bold">${userData.firstName} ${userData.lastName || ""}</h4>
                    <span class="badge bg-success">Active Account</span>
                </div>
                
                <div class="bg-light p-3 rounded-3 mb-3">
                    <div class="row mb-2">
                        <div class="col-4 text-muted">Email:</div>
                        <div class="col-8 fw-bold">${userData.email}</div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-4 text-muted">First Name:</div>
                        <div class="col-8">${userData.firstName}</div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-4 text-muted">Last Name:</div>
                        <div class="col-8">${userData.lastName || "Not set"}</div>
                    </div>
            `;

            // Profile modal ko show karta hai ye function
            const profileModal = new bootstrap.Modal(document.getElementById("userProfileModal"));
            profileModal.show();
        }
    } else {
        // Agar user logged in nahi hai to login page pe redirect karta hai ye function
        window.location.href = "../Auth/Register/index.html";
    }
});

// Ye function logout karta hai user ko
document.getElementById("confirmLogout").addEventListener("click", function () {

    setTimeout(() => {
        const logoutModal = document.getElementById("logoutModal");
        const modalInstance = bootstrap.Modal.getInstance(logoutModal);
        modalInstance.hide();
    }, 500);

    const toastId = `toast-${Date.now()}`;

    const toastHTML = `
        <div id="${toastId}" class="custom-toast top-center-toast">
            <div>
                <p class="fw-bold mb-1">User Successfully Logged Out. Redirecting...</p>
            </div>
            <button type="button" class="btn-close btn-close-white ms-3" aria-label="Close" onclick="removeToast('${toastId}')"></button>
        </div>`;

    const toastContainer = document.getElementById("toastContainer");
    toastContainer.insertAdjacentHTML("beforeend", toastHTML);

    setTimeout(() => {
        removeToast(toastId);
        window.location.href = "../Auth/Login/index.html"; // Redirect to login page
    }, 1700);
});

function removeToast(toastId) {
    const toastElement = document.getElementById(toastId);
    if (toastElement) {
        toastElement.remove();
    }
}