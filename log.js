
function rateProduct(prodName, rating) {
    const stars = document.querySelectorAll(`#rating-${prodName} i`);
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('text-secondary');
            star.classList.add('text-warning');
        } else {
            star.classList.remove('text-warning');
            star.classList.add('text-secondary');
        }
    });
    document.getElementById(`count-${prodName}`).innerText = `(${rating}.0)`;
}

function handleComment(prodName) {
    let shortName = prodName.replace("Fresh ", ""); 
    
    currentProduct = shortName; 
    
    document.getElementById('modalTitle').innerText = prodName + " Reviews";
    document.getElementById('commentSection').style.display = 'block';
    document.getElementById('oldComments').innerHTML = "<em>No reviews yet. Be the first!</em>";
}

function saveComment() {
    let text = document.getElementById('commentInput').value;
    
    if (text.trim() !== "") {
        let badgeId = 'comment-badge-' + currentProduct;
        let badge = document.getElementById(badgeId);

        if (badge) {
            let currentCount = parseInt(badge.innerText) || 0;
            badge.innerText = currentCount + 1;
        }

        showToast();

        document.getElementById('commentInput').value = "";
        document.getElementById('commentSection').style.display = 'none';
    }
}

function showToast() {
    let toast = document.getElementById('success-toast');
    if(toast) {
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 2500);
    } else {
        alert("Comment added successfully!");
    }
}