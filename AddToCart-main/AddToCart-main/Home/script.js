const url = 'https://dummyjson.com/products'
const row2 = document.querySelector(".row2")
const addToCart = document.querySelector(".btn-primary")
const loader = document.querySelector(".loader")
const datafn = async function () {
    try {
        loader.style.display = "flex";
        JSON.parse(localStorage.getItem("productData")) || []
        const result = await fetch(url)
        // console.log(result);
        const data = await result.json()
        const productData = data.products
        // console.log(productData);

        // console.log(data);
        localStorage.setItem("productData", JSON.stringify(productData))
        show()
        loader.style.display = "none";
    } catch (error) {
        console.log(error);
    }
}
datafn()

function show() {
    const data = JSON.parse(localStorage.getItem("productData")) || []
    let result = ""
    data.map((product, index) => {
        result += `
        <div class="col">
            <div class="card shadow-lg border-0">
                <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title text-truncate" title="${product.title}">${product.title}</h5>
                    <p class="card-text text-truncate" title="${product.description}">${product.description}</p>
                    <div class="d-flex align-items-center justify-content-between mb-3">
                        <span class="price-tag">$${product.price}</span>
                        <span class="badge bg-primary">In Stock</span>
                    </div>
                    <div class="d-flex gap-2 modal-body">
                        <button class="btn btn-outline-success btn-sm btn-custom w-50 d-flex align-items-center justify-content-center gap-1" onclick="handleCart(${index})">
                            <i class="fas fa-cart-plus"></i> Add
                        </button>
                 
                        <button type="button" class="btn btn-outline-info btn-sm btn-custom w-50 d-flex align-items-center justify-content-center gap-1" onclick="handleDescription(${index})" >
                            <i class="fas fa-info-circle"></i> Details
                        </button>            
                    </div>
                </div>
            </div>
        </div>
            `;
    });
    document.querySelector(".row2").innerHTML = result;
    // console.log(data);
}

function handleCart(id) {
    const data = JSON.parse(localStorage.getItem('productData')) || []
    const cartData = JSON.parse(localStorage.getItem("cartData")) || []
    cartData.push(data[id])
    localStorage.setItem("cartData", JSON.stringify(cartData))

    updateCartCount()
    showAlert("success", "Product added")
    // console.log(cartData);
}

function handleDescription(id) {
    const data = JSON.parse(localStorage.getItem("productData")) || []
    const product = data[id];

    // Populate modal with product details
    document.getElementById("modalProductImage").src = product.thumbnail;
    document.getElementById("modalProductTitle").textContent = product.title;
    document.getElementById("modalProductDescription").textContent = product.description;
    document.getElementById("modalProductPrice").textContent = `$${product.price}`;
    document.getElementById("modalProductRating").textContent = `${product.rating} / 5`;
    document.getElementById("modalProductWarranty").textContent = product.warranty || "1 Year Warranty";
    document.getElementById("modalProductDiscount").textContent = `${product.discountPercentage}% Off`;
    document.getElementById("modalProductReturnPolicy").textContent = product.returnPolicy || "30 Days Return Policy";

    // Handle Add to Cart button
    const addToCartButton = document.getElementById("modalAddToCart");
    addToCartButton.onclick = () => handleCart(id);

    // Handle Buy Now button
    const buyNowButton = document.getElementById("modalBuyNow");
    buyNowButton.onclick = () => {
        showAlert("info", "Redirecting to checkout...");
    };

    const productModal = new bootstrap.Modal(document.getElementById("productModal"));
    productModal.show();
}

// Function to update cart count
function updateCartCount() {
    let cartCountElement = document.getElementById("cart-count");
    const cartData = JSON.parse(localStorage.getItem("cartData")) || []
    let itemCount = cartData.length;

    if (cartData == null || itemCount === 0) {
        cartCountElement.style.display = "none";
    } else {
        cartCountElement.textContent = itemCount;
        cartCountElement.style.display = "flex";
    }
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", updateCartCount);

window.onload = function () {
    datafn();
};

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

function handleLogout() {
    const logoutButton = document.getElementById("logout-button");
    const users = JSON.parse(localStorage.getItem("users")) || []
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || []
    const user = users.find(user => user.status === "active");
    if (user) {
        // localStorage.removeItem("user");
        user.status = "inactive";
        localStorage.setItem("users", JSON.stringify(users));
        currentUser.splice(0, 1)
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        // Redirect to login page
        window.location.href = "../Authentication/Login/index.html";
    }
}

function loginCheck() {
    const users = JSON.parse(localStorage.getItem("users")) || []
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || []
    const userInfo = document.getElementById("user-info")
    const authButtons = document.getElementById("auth-buttons")
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
        authButtons.style.display = "none"

    } else {
        userInfo.style.display = "none"
        authButtons.style.display = "flex"
    }

}
loginCheck()