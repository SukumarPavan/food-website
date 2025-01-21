document.addEventListener('DOMContentLoaded', () => {
    const itemId = new URLSearchParams(window.location.search).get('id');
    if (itemId) {
        loadFoodDetail(itemId);
    }
    setupEventListeners();
});

// Updated foodItems array with detailed information
const foodItems = [
    {
        id: 1,
        name: "Veggie Tomato Mix",
        price: "N1,900",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        description: "A delightful mix of fresh vegetables and special tomato sauce",
        ingredients: ["Fresh tomatoes", "Lettuce", "Bell peppers", "Olive oil", "Herbs"],
        deliveryTime: "30-45 minutes",
        returnPolicy: "All our foods are double checked before leaving our stores so by any case you found a broken food please contact our hotline immediately."
    },
    // ... add more items with detailed information
];

function loadFoodDetail(itemId) {
    const item = foodItems.find(food => food.id === parseInt(itemId));
    if (item) {
        document.getElementById('foodImage').src = item.image;
        document.getElementById('foodImage').alt = item.name;
        document.getElementById('foodName').textContent = item.name;
        document.getElementById('foodPrice').textContent = item.price;
        
        // Update delivery info and return policy if specific to the item
        document.querySelector('.info-section:nth-child(1) p').textContent = 
            `Delivery time: ${item.deliveryTime}`;
        document.querySelector('.info-section:nth-child(2) p').textContent = 
            item.returnPolicy;

        // Check if item is in favorites
        const favorites = new Set(JSON.parse(localStorage.getItem('favorites')) || []);
        const favoriteBtn = document.querySelector('.favorite-btn i');
        if (favorites.has(parseInt(itemId))) {
            favoriteBtn.classList.replace('far', 'fas');
        }
    }
}

function setupEventListeners() {
    const favoriteBtn = document.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', toggleFavorite);

    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', addToCart);

    // Image dots navigation
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateActiveDot(index);
        });
    });
}

function toggleFavorite() {
    const itemId = new URLSearchParams(window.location.search).get('id');
    const favorites = new Set(JSON.parse(localStorage.getItem('favorites')) || []);
    const icon = document.querySelector('.favorite-btn i');

    if (favorites.has(parseInt(itemId))) {
        favorites.delete(parseInt(itemId));
        icon.classList.replace('fas', 'far');
        showNotification('Removed from favorites');
    } else {
        favorites.add(parseInt(itemId));
        icon.classList.replace('far', 'fas');
        showNotification('Added to favorites');
    }

    localStorage.setItem('favorites', JSON.stringify([...favorites]));
}

function addToCart() {
    const itemId = new URLSearchParams(window.location.search).get('id');
    const item = foodItems.find(food => food.id === parseInt(itemId));
    
    if (item) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({...item, quantity: 1});
        localStorage.setItem('cart', JSON.stringify(cart));
        
        showNotification('Added to cart!');
        
        // Animate button
        const btn = document.querySelector('.add-to-cart-btn');
        btn.textContent = 'Added!';
        btn.style.backgroundColor = '#4CAF50';
        setTimeout(() => {
            btn.textContent = 'Add to cart';
            btn.style.backgroundColor = '';
        }, 1000);
    }
}

function updateActiveDot(index) {
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
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