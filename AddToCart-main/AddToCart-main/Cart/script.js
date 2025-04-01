const loader = document.querySelector(".loader")

function show() {
    loader.style.display = "flex";

    const data = JSON.parse(localStorage.getItem('cartData')) || []
    // console.log(data);

    let result = ""
    data.map((product, index) => {
        result += `
                        <div class="col">
                    <div class="card shadow-lg border-0">
                        <!-- Product Image -->
                        <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">

                        <div class="card-body d-flex flex-column justify-content-between">
                            <!-- Product Title -->
                            <h5 class="card-title text-truncate mb-2" title="${product.title}">
                                ${product.title}
                            </h5>

                            <!-- Product Description -->
                            <p class="card-text text-truncate mb-3" title="${product.description}">
                                ${product.description}
                            </p>

                            <!-- Price and Stock Badge -->
                            <div class="d-flex align-items-center justify-content-between mb-3">
                                <span class="price-tag">$${product.price}</span>
                                <span class="badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}">
                                    ${product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>

                            <!-- Updated Details Button -->
                            <button
                                class="btn btn-outline-info btn-sm btn-custom w-100 d-flex align-items-center justify-content-center gap-2 mb-2"
                                onclick="handleDescription(${index})">
                                <i class="fas fa-info-circle"></i> View Details
                            </button>

                            <!-- Remove Button -->
                            <button
                                class="btn btn-outline-danger btn-sm btn-custom w-100 d-flex align-items-center justify-content-center gap-2"
                                onclick="handleRemove(${index})">
                                <i class="fas fa-trash-alt"></i> Remove
                            </button>
                        </div>
                    </div>
                </div>
                    `;
    });

    document.querySelector(".row2").innerHTML = result;
    // console.log(data);
    loader.style.display = "none";
}

show()

function handleRemove(id) {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const removedData = JSON.parse(localStorage.getItem("removedData")) || []
    removedData.push(cartData[id])
    localStorage.setItem("removedData", JSON.stringify(removedData))
    cartData.splice(id, 1)
    localStorage.setItem("cartData", JSON.stringify(cartData))
    show()
    location.reload()
}

function totalPrice() {
    const data = JSON.parse(localStorage.getItem('cartData')) || []
    var totalPrice = 0
    data.map((product) => {
        totalPrice += parseFloat(product.price)
    })
    document.querySelector(".row3").innerHTML = `
             <div class="container d-flex justify-content-between align-items-center py-4 border-top mt-4">
                    <!-- Total Price Section -->
                    <h2 class="total-price mb-0">
                        <span class="text-muted">Total:</span>
                        <span class="text-success fw-bold">$${totalPrice.toFixed(2)}</span>
                    </h2>

                    <!-- Buy Now Button -->
                    <button class="btn btn-checkout d-flex align-items-center gap-2">
                        <i class="fas fa-credit-card fs-6"></i>
                        Checkout
                    </button>
                </div>
                
                `
}

totalPrice()

function handleDescription(id) {
    const data = JSON.parse(localStorage.getItem("productData"));
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
        alert("Redirecting to checkout...");
    };

    const productModal = new bootstrap.Modal(document.getElementById("productModal"));
    productModal.show();
}

function loginCheck() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || []
    const authButtons = document.getElementById("auth-buttons")

    // console.log(currentUser);
    if (currentUser.length > 0) {
        authButtons.style.display = "none"
    } else {
        authButtons.style.display = "flex"
    }

}
loginCheck()