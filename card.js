// የካርት ዝርዝር
let myCart = [];

// 1. ADD / REMOVE TOGGLE FUNCTION
function toggleCart(btn, name, price) {
    const itemIndex = myCart.findIndex(item => item.name === name);

    if (itemIndex === -1) {
        // ምርቱ በካርት ውስጥ የለም -> ጨምር
        myCart.push({ name, price });
        btn.innerText = "Remove from cart";
        btn.style.backgroundColor = "#dc3545"; // ቀይ (Danger)
        btn.style.borderColor = "#dc3545";
    } else {
        // ምርቱ በካርት ውስጥ አለ -> አስወጣ
        myCart.splice(itemIndex, 1);
        btn.innerText = "Add to cart";
        btn.style.backgroundColor = "#198754"; // አረንጓዴ (Success)
        btn.style.borderColor = "#198754";
    }

    // የካርት ቆጣሪውን አፕዴት አድርግ (Badge ካለህ)
    const cartBadge = document.getElementById('cart-count');
    if (cartBadge) cartBadge.innerText = myCart.length;
}

// 2. RATING FUNCTION
function handleRating(ratingDiv) {
    const stars = ratingDiv.querySelectorAll('i');
    const submitArea = ratingDiv.nextElementSibling;

    stars.forEach(star => {
        star.onclick = function() {
            const idx = this.getAttribute('data-idx');
            // ኮከቦችን ማብራት
            stars.forEach((s, i) => {
                if (i < idx) {
                    s.classList.replace('far', 'fas');
                } else {
                    s.classList.replace('fas', 'far');
                }
            });
            // ሰብሚት በተኑን አሳይ
            if(submitArea) submitArea.style.display = "block";
        }
    });
}

function submitRate(btn) {
    btn.parentElement.innerHTML = "<small class='text-success'>አመሰግናለን! ✅</small>";
}

// 3. COMMENT LOGIC (With Login Guard)
function toggleComment(link) {
    const card = link.closest('.product-card');
    const box = card.querySelector('.comment-box');
    const inputArea = box.querySelector('.input-area');
    const loginMsg = box.querySelector('.login-msg');
    
    // ሎጊን መኖሩን ቼክ አድርግ
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    // ቦክሱን ክፈት/ዝጋ
    box.style.display = (box.style.display === "none") ? "block" : "none";

    if (isLoggedIn) {
        if(inputArea) inputArea.style.display = "block";
        if(loginMsg) loginMsg.style.display = "none";
    } else {
        if(inputArea) inputArea.style.display = "none";
        if(loginMsg) loginMsg.style.display = "block";
    }
}

function postComment(btn) {
    const input = btn.previousElementSibling;
    const display = btn.closest('.comment-box').querySelector('.display-comments');
    const user = localStorage.getItem("userName") || "User";

    if (input.value.trim() !== "") {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `<strong>${user}:</strong> ${input.value}`;
        newDiv.style.fontSize = "12px";
        display.appendChild(newDiv);
        input.value = ""; // አጥፋው
    }
}

// ገጹ ሲከፈት ሬቲንግ እንዲሰራ አድርግ
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.rating').forEach(r => handleRating(r));
});