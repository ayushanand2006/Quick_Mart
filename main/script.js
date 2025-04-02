const row = document.querySelector(".row");
const url = "https://dummyjson.com/products";
const datafn = async function () {
    try {
        // loader.style.display = "flex";
        JSON.parse(localStorage.getItem("productData")) || []
        const result = await fetch(url)
        // console.log(result);
        const data = await result.json()
        const productData = data.products
        // console.log(productData);

        // console.log(data);
        localStorage.setItem("productData", JSON.stringify(productData))
        show(productData)
    } catch (error) {
        console.log(error);
    }
}
datafn()

// console.log(productData);
// localStorage.setItem("productData", JSON.stringify(productData));
function show(products) { 

    let productresult = '';

    products.forEach((product, index) => {
        productresult += `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.thumbnail}" alt="Product Image">
                </div>

                <div class="product-info">
                    <h5 class="product-title">${product.title}</h5>
                    <p class="product-description">${product.description}</p>
                    <div class="product-meta">
                        <span class="price">💲${product.price}</span>
                        <span class="rating">⭐ ${product.rating}</span>
                    </div>

                    <div class="product-buttons mt-4">
                        <div class="d-flex gap-2 modal-body">
                            <button class="btn btn-outline-success btn-sm btn-custom w-50 d-flex align-items-center justify-content-center gap-1 add-to-cart-btn" data-id="${index}" onclick="handleCart(${index})">
                                <i class="fas fa-cart-plus"></i> Add
                            </button>
                            
                            <button type="button" class="btn btn-outline-info btn-sm btn-custom w-50 d-flex align-items-center justify-content-center gap-1" onclick="handleDescription(${index})">
                                <i class="fas fa-info-circle"></i> Details
                            </button>            
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    });

    row.innerHTML = productresult;

}

// show()
// document.querySelectorAll(".add-to-cart-btn").forEach(button => {
//     button.addEventListener("click", function () {
//         handleCart(this.getAttribute("data-id"));
//     });
// });


// ---- Handle Add to Cart ----
function handleCart(id) {
    const data = JSON.parse(localStorage.getItem('productData'));
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    cartData.push(data[id]);
    localStorage.setItem("cartData", JSON.stringify(cartData));
    const toastId = `toast-${Date.now()}`;

    const toastHTML = `
        <div id="${toastId}" class="custom-toast">
    <div>
        <p class="fw-bold mb-1">Item added successfully!</p>
    </div>
    <button type="button" class="btn-close btn-close-white ms-3" aria-label="Close" onclick="removeToast('${toastId}')"></button>
</div>`;

    const toastContainer = document.getElementById("toastContainer");
    toastContainer.insertAdjacentHTML("beforeend", toastHTML);
    setTimeout(() => {
        removeToast(toastId);
    }, 3000);
}

function removeToast(toastId) {
    const toastEl = document.getElementById(toastId);
    if (toastEl) {
        toastEl.classList.add("fade-out");
        setTimeout(() => {
            toastEl.remove();
        }, 500);
    }
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
            // console.log(currentUserEmail, currentUserPassword);
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

// ---- Handle Description ----
function handleDescription(id) {
    const data = JSON.parse(localStorage.getItem('productData'));
    const product = data[id];

    document.getElementById("modalProductImage").src = product.thumbnail;
    document.getElementById("modalProductTitle").textContent = product.title;
    document.getElementById("modalProductDescription").textContent = product.description;
    document.getElementById("modalProductPrice").textContent = product.price;
    document.getElementById("modalProductRating").textContent = product.rating;


    const modalTitle = document.getElementById("productModalTitle");
    const modalBody = document.getElementById("productModalBody");

    const modal = new bootstrap.Modal(document.getElementById("productModal"));
    modal.show();
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

document.getElementById("search_box").addEventListener("input", function () {
    var searchValue = this.value.toLowerCase();
    var productCards = JSON.parse(localStorage.getItem("productData")) || [];
    var filteredProducts = productCards.filter(function (product) {
        return product.title.toLowerCase().includes(searchValue);
    });
    show(filteredProducts);
})