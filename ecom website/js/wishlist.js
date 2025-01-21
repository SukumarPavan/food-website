let wishlistItems = new Set(JSON.parse(localStorage.getItem('favorites')) || []);

document.addEventListener('DOMContentLoaded', () => {
    displayWishlistItems();
});

function displayWishlistItems() {
    const wishlistContainer = document.getElementById('wishlistItems');
    wishlistContainer.innerHTML = '';

    if (wishlistItems.size === 0) {
        wishlistContainer.innerHTML = `
            <div class="empty-wishlist">
                <i class="fas fa-heart"></i>
                <p>No favorite items yet</p>
            </div>
        `;
        return;
    }

    const favoriteItems = foodItems.filter(item => wishlistItems.has(item.id));
    
    favoriteItems.forEach(item => {
        const wishlistItem = document.createElement('div');
        wishlistItem.className = 'wishlist-item';
        wishlistItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="price">${item.price}</p>
            </div>
            <button class="add-to-cart-btn" data-id="${item.id}">
                Add to cart
            </button>
            <button class="remove-favorite" data-id="${item.id}">
                <i class="fas fa-heart"></i>
            </button>
        `;
        wishlistContainer.appendChild(wishlistItem);
    });

    // Add event listeners
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => addToCart(e.target.dataset.id));
    });

    document.querySelectorAll('.remove-favorite').forEach(btn => {
        btn.addEventListener('click', (e) => removeFromWishlist(e.target.dataset.id));
    });
}

function addToCart(itemId) {
    const item = foodItems.find(food => food.id === parseInt(itemId));
    if (item) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({...item, quantity: 1});
        localStorage.setItem('cart', JSON.stringify(cart));
        showNotification('Added to cart!');
    }
}

function removeFromWishlist(itemId) {
    wishlistItems.delete(parseInt(itemId));
    localStorage.setItem('favorites', JSON.stringify([...wishlistItems]));
    displayWishlistItems();
    showNotification('Removed from favorites');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }, 100);
} 