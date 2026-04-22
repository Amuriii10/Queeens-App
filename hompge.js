// በካርታችን ውስጥ ያሉ ምርቶችን ለመያዝ
let cartItems = [];

// ምርት ወደ ካርት መጨመሪያ / ማስወገጃ ዋና ፈንክሽን
function toggleCart(productName, price, buttonId) {
    const btn = document.getElementById(buttonId);
    
    // ምርቱ ካርት ውስጥ መኖሩን ማረጋገጥ
    const itemIndex = cartItems.findIndex(item => item.name === productName);

    if (itemIndex > -1) {
        // ምርቱ ካለ - ከካርት አውጣው
        cartItems.splice(itemIndex, 1);
        if(btn) {
            btn.innerHTML = `Add to Cart`;
            btn.classList.replace("btn-danger", "btn-outline-success");
        }
    } else {
        // ምርቱ ከሌለ - አዲስ ጨምር (መነሻ ብዛት 1)
        cartItems.push({ 
            name: productName, 
            price: price, 
            quantity: 1, 
            btnId: buttonId 
        });
        if(btn) {
            btn.innerHTML = `Remove from Cart`;
            btn.classList.replace("btn-outline-success", "btn-danger");
        }
    }

    // የካርቱን UI አዘምን
    updateCartUI();
}

// የብዛት (Quantity) መጨመሪያ እና መቀነሻ
function updateQty(index, change) {
    cartItems[index].quantity += change;
    
    // ብዛቱ ከ 1 በታች ከሆነ ምርቱን ከካርቱ ሰርዝ
    if (cartItems[index].quantity <= 0) {
        removeCartItem(index);
    } else {
        updateCartUI();
    }
}

// ምርትን ከካርቱ ውስጥ ሙሉ በሙሉ ማጥፊያ (Delete icon ሲነካ)
function removeCartItem(index) {
    const item = cartItems[index];
    const btn = document.getElementById(item.btnId);
    
    // ወደ ውጭ ባለው (Product Grid) ላይ ያለውን በተን መመለስ
    if (btn) {
        btn.innerHTML = `Add to Cart`;
        btn.classList.replace("btn-danger", "btn-outline-success");
    }
    
    // ከ Array ውስጥ መሰረዝ
    cartItems.splice(index, 1);
    updateCartUI();
}

// የካርቱን ገፅታ (HTML) በየጊዜው የሚያዘምን ፈንክሽን
function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const badge = document.getElementById('cart-badge');
    const totalElement = document.getElementById('cart-total-price');

    // ሁለቱም HTML ውስጥ መኖራቸውን እርግጠኛ ለመሆን
    if (!container || !badge || !totalElement) {
        console.error("Cart HTML elements not found!");
        return;
    }

    // ካርቱ ባዶ ከሆነ
    if (cartItems.length === 0) {
        container.innerHTML = `
            <div class="text-center text-muted mt-5">
                <i class="fas fa-box-open fs-1 mb-3"></i>
                <p>Your cart is empty.</p>
            </div>`;
        badge.innerText = "0";
        totalElement.innerText = "0 Birr";
        return;
    }

    container.innerHTML = ''; // ያለውን አጽዳ
    let grandTotal = 0;
    let totalItems = 0;

    // በእያንዳንዱ ምርት ላይ መዞር
    cartItems.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;
        totalItems += item.quantity;

        container.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                <div style="flex: 1;">
                    <h6 class="mb-0 fw-bold">${item.name}</h6>
                    <small class="text-success">${item.price} Birr / unit</small>
                </div>
                
                <div class="d-flex align-items-center">
                    <div class="btn-group btn-group-sm me-2" role="group">
                        <button type="button" class="btn btn-outline-secondary" onclick="updateQty(${index}, -1)">-</button>
                        <button type="button" class="btn btn-light disabled text-dark fw-bold" style="width: 35px;">${item.quantity}</button>
                        <button type="button" class="btn btn-outline-secondary" onclick="updateQty(${index}, 1)">+</button>
                    </div>
                    
                    <div class="fw-bold me-2 text-end" style="width: 70px;">
                        ${itemTotal} <small>Birr</small>
                    </div>
                    
                    <button class="btn btn-sm text-danger border-0 p-1" onclick="removeCartItem(${index})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;
    });

    // ድምር ዋጋ እና የላይኛው ባጅ ማዘመን
    badge.innerText = totalItems;
    totalElement.innerText = grandTotal.toLocaleString() + " Birr";
}
document.querySelector('button[style*="background-color: #00AEEF"]').onclick = function() {
    const total = document.getElementById('cart-total-price').innerText;
    if(cartItems.length > 0) {
        alert("ወደ Telebirr መተግበሪያ እየወሰድዎት ነው... \nጠቅላላ ክፍያ: " + total);
    } else {
        alert("እባክዎ መጀመሪያ እቃ ወደ ቅርጫት ያስገቡ!");
    }
};
