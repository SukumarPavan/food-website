let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    setupEventListeners();
});

function displayCartItems() {
    const cartContainer = document.getElementById('cartItems');
    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>No items in cart</p>
            </div>
        `;
        return;
    }

    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="price">${item.price}</p>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn minus" data-index="${index}">-</button>
                <span class="quantity">${item.quantity || 1}</span>
                <button class="quantity-btn plus" data-index="${index}">+</button>
            </div>
            <button class="delete-btn" data-index="${index}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartContainer.appendChild(cartItem);
    });

    updateTotalPrice();
}

function setupEventListeners() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('quantity-btn')) {
            const index = e.target.dataset.index;
            if (e.target.classList.contains('plus')) {
                incrementQuantity(index);
            } else if (e.target.classList.contains('minus')) {
                decrementQuantity(index);
            }
        }

        if (e.target.closest('.delete-btn')) {
            const index = e.target.closest('.delete-btn').dataset.index;
            removeFromCart(index);
        }
    });

    document.querySelector('.complete-order-btn').addEventListener('click', completeOrder);
}

function incrementQuantity(index) {
    cartItems[index].quantity = (cartItems[index].quantity || 1) + 1;
    updateCart();
}

function decrementQuantity(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        updateCart();
    }
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCartItems();
}

function updateTotalPrice() {
    const total = cartItems.reduce((sum, item) => {
        const price = parseInt(item.price.replace(/[^0-9]/g, ''));
        return sum + (price * (item.quantity || 1));
    }, 0);

    const footerBtn = document.querySelector('.complete-order-btn');
    footerBtn.textContent = `Complete order • N${total.toLocaleString()}`;
}

function completeOrder() {
    // Add order completion logic here
    window.location.href = 'checkout.html';
} 