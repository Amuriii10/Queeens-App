let cartItems = [];
let myOrders = [];  

function toggleCart(productName, price, buttonId) {
    const btn = document.getElementById(buttonId);
    const itemIndex = cartItems.findIndex(item => item.name === productName);

    if (itemIndex > -1) {
        cartItems.splice(itemIndex, 1);
        if (btn) {
            btn.innerHTML = `Add to Cart`;
            btn.classList.replace("btn-danger", "btn-outline-success");
        }
    } else {
        cartItems.push({
            name: productName,
            price: price,
            quantity: 1,
            btnId: buttonId
        });
        if (btn) {
            btn.innerHTML = `Remove from Cart`;
            btn.classList.replace("btn-outline-success", "btn-danger");
        }
    }
    updateCartUI();
}

function updateQty(index, change) {
    cartItems[index].quantity += change;
    if (cartItems[index].quantity <= 0) {
        removeCartItem(index);
    } else {
        updateCartUI();
    }
}

function removeCartItem(index) {
    const item = cartItems[index];
    const btn = document.getElementById(item.btnId);
    if (btn) {
        btn.innerHTML = `Add to Cart`;
        btn.classList.replace("btn-danger", "btn-outline-success");
    }
    cartItems.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const badge = document.getElementById('cart-badge');
    const totalElement = document.getElementById('cart-total-price');

    if (!container || !badge || !totalElement) return;

    if (cartItems.length === 0) {
        container.innerHTML = `<div class="text-center text-muted mt-5"><i class="fas fa-box-open fs-1 mb-3"></i><p>Your cart is empty.</p></div>`;
        badge.innerText = "0";
        totalElement.innerText = "0 Birr";
        return;
    }

    container.innerHTML = '';
    let grandTotal = 0;
    let totalQty = 0;

    cartItems.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;
        totalQty += item.quantity;

        container.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                <div style="flex: 1;">
                    <h6 class="mb-0 fw-bold">${item.name}</h6>
                    <small class="text-success">${item.price} Birr</small>
                </div>
                <div class="d-flex align-items-center">
                    <div class="btn-group btn-group-sm me-2">
                        <button class="btn btn-outline-secondary" onclick="updateQty(${index}, -1)">-</button>
                        <button class="btn btn-light disabled text-dark fw-bold">${item.quantity}</button>
                        <button class="btn btn-outline-secondary" onclick="updateQty(${index}, 1)">+</button>
                    </div>
                    <div class="fw-bold me-2" style="width: 60px;">${itemTotal}</div>
                    <button class="btn btn-sm text-danger" onclick="removeCartItem(${index})"><i class="fas fa-times"></i></button>
                </div>
            </div>`;
    });

    badge.innerText = totalQty;
    totalElement.innerText = grandTotal + " Birr";
}

function placeOrder() {
    if (cartItems.length === 0) {
        alert("እባክዎ መጀመሪያ እቃ ወደ ቅርጫት ያስገቡ!");
        return;
    }

    const orderCode = "QN-" + Math.floor(1000 + Math.random() * 9000);
    const now = new Date();
    const expiryTime = new Date(now.getTime() + 60 * 60 * 1000); 
    const expiryString = expiryTime.getHours() + ":" + (expiryTime.getMinutes() < 10 ? '0' : '') + expiryTime.getMinutes();

    const newOrder = {
        code: orderCode,
        total: document.getElementById('cart-total-price').innerText,
        expiry: expiryString,
        date: now.toLocaleDateString()
    };

    myOrders.push(newOrder);
    alert(`✅ Order Successful!\nCode: ${orderCode}\nTicket expired    in (${expiryString}) unpaid orders dissapoint!`);

    // ቅርጫቱን አጽዳ
    cartItems.forEach(item => {
        const btn = document.getElementById(item.btnId);
        if (btn) {
            btn.innerHTML = `Add to Cart`;
            btn.classList.replace("btn-danger", "btn-outline-success");
        }
    });
    cartItems = [];
    updateCartUI();
    updateOrdersUI(); 
}

function updateOrdersUI() {
    const container = document.getElementById('orders-list-container');
    if (!container) return;

    if (myOrders.length === 0) {
        container.innerHTML = `<div class="text-center p-4 text-muted"><p>ምንም ትዕዛዝ አልተገኘም</p></div>`;
        return;
    }

    container.innerHTML = '';
    myOrders.forEach(order => {
        container.innerHTML += `
            <div class="card mb-3 border-start border-4 border-success shadow-sm">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h6 class="fw-bold text-primary">Order: ${order.code}</h6>
                        <span class="badge bg-danger">Unpaid</span>
                    </div>
                    <p class="small mb-1"><strong>Total:</strong> ${order.total}</p>
                    <p class="small text-danger fw-bold mb-0">
                        <i class="fas fa-clock"></i> Expires at: ${order.expiry} (Payment required)
                    </p>
                </div>
            </div>`;
    });
}
function searchProducts() {
    let input = document.getElementById('product-search').value.toLowerCase();
    
    let products = document.getElementsByClassName('product-item');

    for (let i = 0; i < products.length; i++) {
        let title = products[i].querySelector('.ms-card-title').innerText.toLowerCase();

        if (title.includes(input)) {
            products[i].style.display = "block"; 
        } else {
            products[i].style.display = "none";  
        }
    }
}