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

document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector("#historyData")) {
        initHistoryPage(); // History page initialize kiya
    }
});

/**
 * Shows a toast notification
 * @param {string} message - The message to display in the toast
 * @param {string} type - Type of toast: 'success', 'error', 'info', 'warning'
 * @param {string} position - Position of toast: 'top-right', 'top-left', 'bottom-right', 'bottom-left'
 * @param {number} duration - Duration in milliseconds
 */
function showToast(message, type = 'info', position = 'top-right', duration = 4000) {
    // Get the toast container, or create it if it doesn't exist
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    // Set container position based on the position parameter
    switch (position) {
        case 'top-left':
            container.style.top = '20px';
            container.style.left = '20px';
            container.style.right = 'auto';
            container.style.bottom = 'auto';
            break;
        case 'bottom-right':
            container.style.top = 'auto';
            container.style.left = 'auto';
            container.style.right = '20px';
            container.style.bottom = '20px';
            break;
        case 'bottom-left':
            container.style.top = 'auto';
            container.style.left = '20px';
            container.style.right = 'auto';
            container.style.bottom = '20px';
            break;
        default: // top-right
            container.style.top = '20px';
            container.style.left = 'auto';
            container.style.right = '20px';
            container.style.bottom = 'auto';
    }
    
    // Get the icon based on toast type
    let icon = '';
    switch (type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        default: // info
            icon = '<i class="fas fa-info-circle"></i>';
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-message">${message}</div>
        <button class="toast-close" onclick="this.parentElement.remove();">
            <i class="fas fa-times"></i>
        </button>
        <div class="toast-progress"></div>
    `;
    
    // Add custom animation duration
    toast.style.setProperty('--duration', `${duration}ms`);
    toast.querySelector('.toast-progress').style.animation = `progress ${duration}ms linear forwards`;
    
    // Add to container
    container.appendChild(toast);
    
    // Remove after duration
    setTimeout(() => {
        if (toast && toast.parentElement) {
            toast.remove();
        }
    }, duration);
    
    // Optional: Remove when clicked
    toast.addEventListener('click', (event) => {
        if (!event.target.closest('.toast-close')) {
            toast.remove();
        }
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
document.getElementById("profileLink").addEventListener("click", function() {
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