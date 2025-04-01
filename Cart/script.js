// Cart page ka main function
async function DataFunction() {
    const row = document.querySelector("#productData");
    const checkOut = document.querySelector("#checkOut");
    const cartData = JSON.parse(localStorage.getItem("cartData")) || [];

    let productresult = '';
    let totalPrice = 0;

    cartData.forEach((product, index) => {
        totalPrice += product.price;

        productresult += `
<div class="col-lg-3 col-md-4 col-sm-6 mb-4">
    <div class="cart-item h-100" style="max-width: 280px; margin-right: 75px; border-radius: 16px; box-shadow: 0 10px 20px rgba(0,0,0,0.1); overflow: hidden; transition: transform 0.3s, box-shadow 0.3s; position: relative; border: none;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 15px 25px rgba(0,0,0,0.15)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 20px rgba(0,0,0,0.1)';">
        
        <!-- Image container with gradient overlay -->
        <div class="product-image-wrapper" style="position: relative; height: 180px; overflow: hidden;">
            <img src="${product.thumbnail}" class="product-image" alt="Product Image" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s;">
            <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 50%; background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); z-index: 1;"></div>
            
            <!-- Rating badge with pulse effect -->
            <div class="rating-badge" style="position: absolute; top: 15px; left: 15px; background-color: rgba(255,255,255,0.85); padding: 5px 10px; border-radius: 20px; font-size: 12px; color: #333; z-index: 2; font-weight: bold; box-shadow: 0 3px 8px rgba(0,0,0,0.2); display: flex; align-items: center;">
                <i class="fas fa-star" style="color: #ffc107; margin-right: 5px;"></i> 
                <span>${product.rating}</span>
            </div>
        </div>
        
        <!-- Product details with better spacing and effects -->
        <div class="product-details" style="padding: 16px; background-color: white; position: relative;">
            <!-- Category pill -->
            <div style="display: inline-block; background-color: #e3f2fd; color: #1976d2; border-radius: 12px; padding: 3px 10px; font-size: 11px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">${product.category || 'General'}</div>
            
            <h5 class="product-title" style="font-size: 16px; margin-bottom: 10px; font-weight: 600; color: #333; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; height: 40px;">${product.title}</h5>
            
            <p class="product-description" style="font-size: 18px; font-weight: bold; color: #6c757d; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">${product.description}</p>
            <p class="product-description" style="font-size: 18px; font-weight: bold; color:rgb(0, 0, 0); overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">💲${product.price}</p>
            
            <!-- Animated button with hover effect -->
            <button onclick="cartRemove(${index})" class="remove-btn" style="background-color: #f44336; color: white; border: none; padding: 8px 12px; border-radius: 8px; width: 100%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background-color 0.3s, transform 0.2s; font-weight: 500; position: relative; overflow: hidden;">
                <span style="position: relative; z-index: 2; display: flex; align-items: center;">
                    <i class="fas fa-trash" style="margin-right: 8px;"></i> Remove from Cart
                </span>
                <div style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); transition: left 0.5s; z-index: 1;" onmouseover="this.style.left='100%'"></div>
            </button>
        </div>
    </div>
</div>
    `;
    });
    // Checkout ka HTML
    let checkOutData = "";
    if (cartData.length > 0) {
        // Agar cart mein kuch hai to checkout
        checkOutData += `
<div class="fixed top-32 right-1 bg-white shadow-lg rounded-2xl border border-gray-200 p-3 max-w-xs w-64 h-32 z-10">
    <div class="flex flex-col h-full">
        <div class="flex justify-between items-center mb-2">
            <div>
                <div class="text-xs text-gray-500 uppercase tracking-wider">Total Amount</div>
                <div class="flex items-baseline">
                    <span class="text-lg font-bold text-gray-600 mr-1">$</span>
                    <span class="text-2xl font-extrabold text-black tracking-tight">${totalPrice.toFixed(2).split('.')[0]}</span>
                    <span class="text-sm font-medium text-gray-500 ml-1">.${totalPrice.toFixed(2).split('.')[1]}</span>
                </div>
            </div>
            <div class="bg-green-100 p-2 rounded-full">
                <i class="fas fa-wallet text-green-600 text-base"></i>
            </div>
        </div>

        <div class="mt-2">
            <button 
                onclick="buyNow()" 
                class="w-full py-2 bg-green-600 text-white rounded-full font-bold text-xs 
                       transform transition-all duration-300 
                       hover:bg-black hover:shadow-md 
                       active:scale-95 
                       flex items-center justify-center space-x-2 group"
            >
                <i class="fas fa-shopping-cart transition-transform group-hover:scale-105"></i>
                <span>Complete Purchase</span>
            </button>
        </div>
    </div>
</div>
`;
        row.classList.remove('justify-content-center');
    } else {
        // Agar cart khali hai to empty message
        productresult = `
        <div class="col-12 d-flex justify-content-center">
            <div class="empty-cart-container">
                <div class="empty-cart-illustration">
                    <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="empty-cart-icon">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <div class="empty-cart-animation"></div>
                </div>
                <h2 class="empty-cart-title">Your Cart is Empty</h2>
                <p class="empty-cart-message">Looks like you haven't added anything to your cart yet.</p>
                <a href="../main/index.html" class="empty-cart-button">
                    Continue Shopping
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ms-2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            </div>
        </div>
        `;

        row.classList.add('justify-content-center');
        checkOutData = '';
    }

    row.innerHTML = productresult;
    checkOut.innerHTML = checkOutData;
}

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

// Cart se item remove karne wala function hai ye
function cartRemove(index) {
    let cartData = JSON.parse(localStorage.getItem("cartData")) || [];
    let historyData = JSON.parse(localStorage.getItem("historyData")) || [];

    if (cartData.length > 0) {
        // Scroll position ko yaad rakhne wala function 
        const scrollPosition = window.scrollY;
        const removedItem = cartData[index];
        const productTitle = removedItem.title;

        removedItem.removedAt = new Date().toISOString();
        historyData.push(removedItem);
        localStorage.setItem("historyData", JSON.stringify(historyData));
        
        cartData.splice(index, 1);
        localStorage.setItem("cartData", JSON.stringify(cartData));
        
        DataFunction();

        // Toast notification dikhane wala function
        showToast(`${productTitle} has been moved to history`, 'info', 'top-right');

        // Scroll position restore karne wala function
        setTimeout(() => {
            window.scrollTo(0, scrollPosition);
        }, 0);
    }
}

// Buy now button click pe call hone wala function
function buyNow() {
    showToast("Your order has been placed successfully. Thank you for shopping with us!", 'success', 'top-center');
    localStorage.removeItem("cartData");
    DataFunction();
}

// History page initialize karne wala function
function initHistoryPage() {
    // Display history items wala function
    if (typeof displayHistory === 'function') {
        displayHistory();
    }
    
    // Add header to history page wala function
    const historyHeader = document.querySelector(".history-header");
    if (!historyHeader) {
        const container = document.querySelector(".container");
        if (container) {
            const headerDiv = document.createElement('div');
            headerDiv.className = 'history-header';
            headerDiv.innerHTML = `
                <h2 class="history-title"><i class="fas fa-cart-shopping"></i>Cart</h2>
            `;
            
            const row = document.querySelector(".row");
            if (row) {
                container.insertBefore(headerDiv, row);
            } else {
                container.appendChild(headerDiv);
            }
        }
    }
}

// Page load hone pe run hone wala function
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector("#historyData")) {
        initHistoryPage();
    }
    
    // Cart page data load karne wala function
    DataFunction();
});


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