const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(cors({
    origin: '*',  // Allow all origins
    methods: ['GET', 'POST']
}));
app.use(express.json());

// Serve static files from the parent directory
app.use(express.static(path.join(__dirname, '..')));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Function to get current time
function getCurrentTime() {
    return new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
    });
}

// Function to log with timestamp
function logWithTime(message) {
    console.log(`[${getCurrentTime()}] ${message}`);
}

// Create data storage
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

// Create data directory and files if they don't exist
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
    logWithTime('Created data directory');
}

// Initialize files with empty arrays
function initializeJsonFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '[]');
            logWithTime(`Initialized ${path.basename(filePath)}`);
        } else {
            const content = fs.readFileSync(filePath, 'utf8');
            JSON.parse(content);
        }
    } catch (error) {
        fs.writeFileSync(filePath, '[]');
        logWithTime(`Reset ${path.basename(filePath)}`);
    }
}

initializeJsonFile(USERS_FILE);
initializeJsonFile(ORDERS_FILE);

// Helper functions
const readData = (file) => {
    try {
        const data = fs.readFileSync(file, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        logWithTime(`Error reading ${path.basename(file)}: ${error.message}`);
        return [];
    }
};

const writeData = (file, data) => {
    try {
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
    } catch (error) {
        logWithTime(`Error writing to ${path.basename(file)}: ${error.message}`);
        throw error;
    }
};

app.post('/api/signup', (req, res) => {
    try {
        const { email, password, name } = req.body;
        const users = readData(USERS_FILE);

        if (users.find(u => u.email === email)) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const newUser = {
            id: Date.now().toString(),
            email,
            password,
            name,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        writeData(USERS_FILE, users);

        logWithTime('✅ Registration successful!\n');
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        logWithTime(`Registration error: ${error.message}`);
        res.status(500).json({ error: 'Error creating user' });
    }
});

app.post('/api/login', (req, res) => {
    try {
        const { email, password } = req.body;
        const users = readData(USERS_FILE);

        logWithTime('\n🔐 Login Attempt');
        logWithTime(`Email: ${email}`);

        const user = users.find(u => u.email === email);
        
        if (!user) {
            logWithTime('❌ Login failed: User not found');
            return res.status(400).json({ error: 'Email not registered' });
        }

        if (user.password !== password) {
            logWithTime('❌ Login failed: Invalid password');
            return res.status(400).json({ error: 'Incorrect password' });
        }

        logWithTime('✅ Login successful!');
        logWithTime(`User: ${user.name}\n`);
        
        res.json({ 
            user: {
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        logWithTime(`Login error: ${error.message}`);
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
});

app.post('/api/orders', (req, res) => {
    try {
        const { userEmail, items, totalAmount, address, phone } = req.body;
        const orders = readData(ORDERS_FILE);

        logWithTime('\n🛍️ New Order');
        logWithTime(`Customer Email: ${userEmail}`);
        logWithTime(`Items: ${items.length}`);
        logWithTime(`Total Amount: ${totalAmount}`);
        logWithTime(`Delivery Address: ${address}`);

        const newOrder = {
            id: Date.now().toString(),
            userEmail,
            items,
            totalAmount,
            address,
            phone,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        orders.push(newOrder);
        writeData(ORDERS_FILE, orders);

        logWithTime('✅ Order placed successfully!');
        logWithTime(`Order ID: ${newOrder.id}`);
        res.status(201).json(newOrder);
    } catch (error) {
        logWithTime('Order error:');
        logWithTime(error.message);
        res.status(500).json({ error: 'Error creating order' });
    }
});

// View all users (admin)
app.get('/api/users', (req, res) => {
    try {
        const users = readData(USERS_FILE);
        logWithTime('\n📊 Users List');
        logWithTime(`Total Users: ${users.length}`);
        res.json(users);
    } catch (error) {
        logWithTime('Error fetching users:');
        logWithTime(error.message);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// View all orders (admin)
app.get('/api/orders', (req, res) => {
    try {
        const orders = readData(ORDERS_FILE);
        logWithTime('\n📦 Orders List');
        logWithTime(`Total Orders: ${orders.length}`);
        res.json(orders);
    } catch (error) {
        logWithTime('Error fetching orders:');
        logWithTime(error.message);
        res.status(500).json({ error: 'Error fetching orders' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.clear();
    logWithTime('🚀 Food Delivery Server Started');
    logWithTime(`Server running at http://localhost:${PORT}`);
    logWithTime('\n📝 Server is tracking:');
    logWithTime('- User registrations');
    logWithTime('- User logins');
    logWithTime('- Orders placed');
    logWithTime('- All website activity\n');
    logWithTime('Waiting for connections...\n');
}); 