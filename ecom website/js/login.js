document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add login logic here
    window.location.href = 'home.html';
});

// Tab switching logic
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
}); 