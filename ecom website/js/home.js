// Food Items Data
const foodItems = [
    // Main Dishes (12 items)
    {
        id: 1,
        name: "Veggie Tomato Mix",
        price: "N1,900",
        category: "main",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        description: "Fresh vegetable salad with special tomato mix"
    },
    {
        id: 2,
        name: "Grilled Chicken Salad",
        price: "N2,500",
        category: "main",
        image: "https://images.unsplash.com/photo-1674315411321-d5ab28fc8dd7",
        description: "Grilled chicken breast with fresh garden salad"
    },
    {
        id: 3,
        name: "Beef Burger Deluxe",
        price: "N2,800",
        category: "main",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        description: "Premium beef patty with cheese and fresh veggies"
    },
    {
        id: 4,
        name: "Pasta Carbonara",
        price: "N2,400",
        category: "main",
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3",
        description: "Creamy pasta with bacon and parmesan"
    },
    {
        id: 5,
        name: "Grilled Salmon",
        price: "N3,500",
        category: "main",
        image: "https://images.unsplash.com/photo-1567159644489-0c1d9a2c2b0f",
        description: "Fresh salmon fillet with herbs and lemon"
    },
    {
        id: 6,
        name: "Chicken Stir Fry",
        price: "N2,200",
        category: "main",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
        description: "Wok-fried chicken with fresh vegetables"
    },
    {
        id: 7,
        name: "Beef Lasagna",
        price: "N2,900",
        category: "main",
        image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3",
        description: "Layered pasta with meat sauce and cheese"
    },
    {
        id: 8,
        name: "Vegetarian Pizza",
        price: "N2,600",
        category: "main",
        image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143",
        description: "Fresh vegetables on crispy crust"
    },
    {
        id: 9,
        name: "Shrimp Scampi",
        price: "N3,200",
        category: "main",
        image: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa",
        description: "Garlic butter shrimp with pasta"
    },
    {
        id: 10,
        name: "Chicken Biryani",
        price: "N2,700",
        category: "main",
        image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a",
        description: "Aromatic rice with spiced chicken"
    },
    {
        id: 11,
        name: "Fish & Chips",
        price: "N2,300",
        category: "main",
        image: "https://images.unsplash.com/photo-1579208575657-c595a05383b7",
        description: "Crispy battered fish with french fries"
    },
    {
        id: 12,
        name: "Beef Steak",
        price: "N3,800",
        category: "main",
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e",
        description: "Grilled beef steak with vegetables"
    },

    // Drinks (8 items)
    {
        id: 13,
        name: "Fresh Orange Juice",
        price: "N800",
        category: "drinks",
        image: "https://images.unsplash.com/photo-1613478838004-5b2144a56be0",
        description: "Freshly squeezed orange juice"
    },
    {
        id: 14,
        name: "Mango Smoothie",
        price: "N1,000",
        category: "drinks",
        image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4",
        description: "Fresh mango blended with yogurt"
    },
    {
        id: 15,
        name: "Iced Coffee",
        price: "N900",
        category: "drinks",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735",
        description: "Cold brewed coffee with milk"
    },
    {
        id: 16,
        name: "Green Tea",
        price: "N600",
        category: "drinks",
        image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5",
        description: "Traditional Japanese green tea"
    },
    {
        id: 17,
        name: "Berry Smoothie",
        price: "N1,100",
        category: "drinks",
        image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888",
        description: "Mixed berries blended smoothie"
    },
    {
        id: 18,
        name: "Lemonade",
        price: "N700",
        category: "drinks",
        image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859",
        description: "Fresh squeezed lemonade"
    },
    {
        id: 19,
        name: "Chocolate Milkshake",
        price: "N1,200",
        category: "drinks",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699",
        description: "Rich chocolate shake with cream"
    },
    {
        id: 20,
        name: "Coconut Water",
        price: "N800",
        category: "drinks",
        image: "https://images.unsplash.com/photo-1536759808958-bab1479ed4c8",
        description: "Fresh natural coconut water"
    },

    // Snacks (6 items)
    {
        id: 21,
        name: "French Fries",
        price: "N1,000",
        category: "snacks",
        image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d",
        description: "Crispy golden french fries"
    },
    {
        id: 22,
        name: "Chicken Wings",
        price: "N1,800",
        category: "snacks",
        image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f",
        description: "Spicy buffalo chicken wings"
    },
    {
        id: 23,
        name: "Mozzarella Sticks",
        price: "N1,400",
        category: "snacks",
        image: "https://images.unsplash.com/photo-1531749668029-257f2a16b7eb",
        description: "Breaded mozzarella sticks"
    },
    {
        id: 24,
        name: "Nachos",
        price: "N1,600",
        category: "snacks",
        image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d",
        description: "Loaded nachos with cheese"
    },
    {
        id: 25,
        name: "Onion Rings",
        price: "N1,200",
        category: "snacks",
        image: "https://images.unsplash.com/photo-1639024471283-03518883512d",
        description: "Crispy battered onion rings"
    },
    {
        id: 26,
        name: "Spring Rolls",
        price: "N1,500",
        category: "snacks",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947",
        description: "Vegetable spring rolls"
    },

    // Sauces (4 items)
    {
        id: 27,
        name: "BBQ Sauce",
        price: "N500",
        category: "sauce",
        image: "https://images.unsplash.com/photo-1612871689353-cccf581d667b",
        description: "Smoky barbecue sauce"
    },
    {
        id: 28,
        name: "Hot Sauce",
        price: "N400",
        category: "sauce",
        image: "https://images.unsplash.com/photo-1614113076002-10b5708c715d",
        description: "Spicy hot sauce"
    },
    {
        id: 29,
        name: "Ranch Dressing",
        price: "N600",
        category: "sauce",
        image: "https://images.unsplash.com/photo-1585325701956-60dd9c8553bc",
        description: "Creamy ranch dressing"
    },
    {
        id: 30,
        name: "Tartar Sauce",
        price: "N400",
        category: "sauce",
        image: "https://images.unsplash.com/photo-1585325701956-60dd9c8553bc",
        description: "Classic tartar sauce"
    }
];

// DOM Elements
const foodGrid = document.getElementById('foodGrid');
const categoryButtons = document.querySelectorAll('.category');
const searchInput = document.querySelector('input[type="search"]');
const cartBtn = document.querySelector('.cart-btn');
const menuBtn = document.querySelector('.menu-btn');

// State Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let favorites = new Set(JSON.parse(localStorage.getItem('favorites')) || []);
let currentCategory = 'all';
let isLoading = false;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = '/login.html';
        return;
    }

    // Load food items
    loadFoodItems();
    setupEventListeners();
    updateCartCount();
});

// Initialize App
function initializeApp() {
    displayFoodItems(foodItems);
    updateFavoritesUI();
    createScrollTopButton();
}

// Event Listeners Setup
function setupEventListeners() {
    // Category filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentCategory = button.dataset.category;
            updateCategoryUI(button);
            filterAndDisplayItems();
        });
    });

    // Search functionality
    searchInput.addEventListener('input', debounce(filterAndDisplayItems, 300));

    // Cart button
    cartBtn.addEventListener('click', () => {
        window.location.href = 'cart.html';
    });

    // Menu button
    menuBtn.addEventListener('click', toggleMenu);

    // Bottom navigation
    document.querySelectorAll('.bottom-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const currentActive = document.querySelector('.bottom-nav a.active');
            currentActive?.classList.remove('active');
            e.currentTarget.classList.add('active');

            // Navigate based on icon
            const icon = e.currentTarget.querySelector('i');
            if (icon.classList.contains('fa-heart')) {
                window.location.href = 'wishlist.html';
            } else if (icon.classList.contains('fa-user')) {
                window.location.href = 'profile.html';
            } else if (icon.classList.contains('fa-history')) {
                window.location.href = 'history.html';
            }
        });
    });
}

// Filter and Display Items
function filterAndDisplayItems() {
    const searchTerm = searchInput.value.toLowerCase();
    let filteredItems = foodItems;

    // Apply category filter
    if (currentCategory !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === currentCategory);
    }

    // Apply search filter
    if (searchTerm) {
        filteredItems = filteredItems.filter(item => 
            item.name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm)
        );
    }

    displayFoodItems(filteredItems);
}

// Display Food Items with Loading State
function displayFoodItems(items) {
    showLoading();
    
    foodGrid.innerHTML = items.length ? '' : createEmptyState();
    
    items.forEach((item, index) => {
        const card = createFoodCard(item, index);
        foodGrid.appendChild(card);
    });

    hideLoading();
}

// Create Food Card
function createFoodCard(item, index) {
    const card = document.createElement('div');
    card.className = 'food-card';
    card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;

    card.innerHTML = `
        <div class="food-image">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <button class="favorite-btn" data-id="${item.id}">
                <i class="fa${favorites.has(item.id) ? 's' : 'r'} fa-heart"></i>
            </button>
        </div>
        <div class="food-info">
            <h3>${item.name}</h3>
            <p class="price">${item.price}</p>
            <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
        </div>
    `;

    // Add event listeners
    card.querySelector('.favorite-btn').addEventListener('click', (e) => toggleFavorite(e, item.id));
    card.querySelector('.add-to-cart').addEventListener('click', () => addToCart(item));

    return card;
}

// Cart Functions
function addToCart(item) {
    cart.push({ ...item, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showAddToCartAnimation(event.target);
    showNotification(`Added ${item.name} to cart!`);
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
    cartCount.style.display = cart.length ? 'block' : 'none';
}

// Favorite Functions
function toggleFavorite(event, itemId) {
    event.stopPropagation();
    const btn = event.currentTarget;
    const icon = btn.querySelector('i');

    if (favorites.has(itemId)) {
        favorites.delete(itemId);
        icon.classList.replace('fas', 'far');
    } else {
        favorites.add(itemId);
        icon.classList.replace('far', 'fas');
    }

    localStorage.setItem('favorites', JSON.stringify([...favorites]));
    showNotification(favorites.has(itemId) ? 'Added to favorites!' : 'Removed from favorites');
}

// UI Animations and Effects
function showAddToCartAnimation(button) {
    button.textContent = 'Added!';
    button.style.backgroundColor = '#4CAF50';
    button.disabled = true;

    setTimeout(() => {
        button.textContent = 'Add to Cart';
        button.style.backgroundColor = '';
        button.disabled = false;
    }, 1000);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Loading State
function showLoading() {
    isLoading = true;
    const loader = document.createElement('div');
    loader.className = 'loading';
    foodGrid.innerHTML = '';
    foodGrid.appendChild(loader);
}

function hideLoading() {
    isLoading = false;
    const loader = document.querySelector('.loading');
    if (loader) loader.remove();
}

// Empty State
function createEmptyState() {
    return `
        <div class="empty-state">
            <i class="fas fa-search"></i>
            <p>No items found</p>
            <p>Try adjusting your search or filters</p>
        </div>
    `;
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Scroll to Top Button
function createScrollTopButton() {
    const button = document.createElement('button');
    button.className = 'scroll-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        button.classList.toggle('visible', window.scrollY > 300);
    });

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Navigation Handler
function handleNavigation(e) {
    e.preventDefault();
    const currentActive = document.querySelector('.bottom-nav a.active');
    currentActive?.classList.remove('active');
    e.currentTarget.classList.add('active');
}

// Menu Toggle
function toggleMenu() {
    // Implement menu toggle functionality
    showNotification('Menu feature coming soon!');
}

// Update Category UI
function updateCategoryUI(selectedButton) {
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    selectedButton.classList.add('active');
}

// Update Favorites UI
function updateFavoritesUI() {
    favorites.forEach(id => {
        const btn = document.querySelector(`.favorite-btn[data-id="${id}"] i`);
        if (btn) btn.classList.replace('far', 'fas');
    });
}

function loadFoodItems() {
    const foodGrid = document.getElementById('foodGrid');
    foodGrid.innerHTML = '';

    foodItems.forEach(item => {
        const foodItem = document.createElement('div');
        foodItem.className = 'food-item';
        foodItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p class="price">${item.price}</p>
        `;
        
        foodItem.addEventListener('click', () => {
            window.location.href = `/food-detail.html?id=${item.id}`;
        });

        foodGrid.appendChild(foodItem);
    });
} 