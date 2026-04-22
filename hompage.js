// ትዕዛዞችን ለመያዝ አዲስ array
let myOrders = [];

function placeOrder() {
    if (cartItems.length === 0) {
        alert("እባክዎ መጀመሪያ እቃ ወደ ቅርጫት ያስገቡ!");
        return;
    }

    // 1. የዘፈቀደ ትዕዛዝ ኮድ መፍጠር (ለምሳሌ፡ QN-5421)
    const orderCode = "QN-" + Math.floor(1000 + Math.random() * 9000);
    
    // 2. የአሁኑን ሰዓት እና ከ1 ሰዓት በኋላ ያለውን ሰዓት ማስላት
    const now = new Date();
    const expiryTime = new Date(now.getTime() + 60 * 60 * 1000); // +1 hour
    const expiryString = expiryTime.getHours() + ":" + (expiryTime.getMinutes() < 10 ? '0' : '') + expiryTime.getMinutes();

    // 3. ትዕዛዙን ወደ ዝርዝር መመዝገብ
    const newOrder = {
        code: orderCode,
        items: [...cartItems],
        total: document.getElementById('cart-total-price').innerText,
        expiry: expiryString,
        status: "Pending"
    };
    myOrders.push(newOrder);

    // 4. ለተጠቃሚው መልዕክት ማሳየት
    alert(`✅ Order Successful!\n\nOrder Code: ${orderCode}\nTotal: ${newOrder.total}\n\n⚠️ ማሳሰቢያ: ክፍያ ካልተፈጸመ ትዕዛዝዎ ከሰዓት ${expiryString} በኋላ አገልግሎት አያገኝም (Expires in 1 hour).`);

    // 5. ካርቱን ባዶ ማድረግ
    clearCartAfterOrder();
    
    // 6. የ Orders ገጽን ማዘመን
    updateOrdersUI();
}

// ትዕዛዝ ከተሰጠ በኋላ ካርቱን የሚያጸዳ
function clearCartAfterOrder() {
    cartItems = [];
    updateCartUI();
    // ሁሉንም በተኖች ወደ Add to Cart መመለስ
    document.querySelectorAll('.btn-danger').forEach(btn => {
        if(btn.innerText === "Remove from Cart") {
            btn.innerHTML = "Add to Cart";
            btn.classList.replace("btn-danger", "btn-outline-success");
        }
    });
}