document.addEventListener('DOMContentLoaded', () => {
    const searchTerm = new URLSearchParams(window.location.search).get('search');
    if (searchTerm) {
        displaySearchResults(searchTerm);
    }
});

function displaySearchResults(searchTerm) {
    const filteredItems = foodItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const foodGrid = document.querySelector('.food-grid');
    foodGrid.innerHTML = '';

    filteredItems.forEach(item => {
        const foodCard = createFoodCard(item);
        foodGrid.appendChild(foodCard);
    });
}

function createFoodCard(item) {
    const card = document.createElement('div');
    card.className = 'food-card';
    card.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p class="price">${item.price}</p>
    `;

    card.addEventListener('click', () => {
        window.location.href = `food-detail.html?id=${item.id}`;
    });

    return card;
} 