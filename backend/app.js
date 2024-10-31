require('dotenv').config();
const express = require('express');
const connectDB = require('./db.js'); // Import the database connection
const Restaurant = require('./models/Restaurants.js'); // Import the model

const app = express();
app.use(express.json()); // To parse JSON bodies
const cors = require('cors');
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
connectDB();

// Define routes (e.g., add a restaurant)
app.post('/restaurants', async (req, res) => {
    try {
        const newRestaurant = new Restaurant(req.body);
        const savedRestaurant = await newRestaurant.save();
        res.status(201).json(savedRestaurant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// To fetch restaurant based on name
app.get('/api/restaurants/:name', async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({ name: req.params.name });
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// New POST route for joining the queue
app.post('/api/restaurants/:name/joinQueue', async (req, res) => {
    const restaurantName = req.params.name;
    const user = req.body.user;

    try {
        const restaurant = await Restaurant.findOne({ name: restaurantName });

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        // Check if the queue is full (adjust this logic based on your requirements)
        if (restaurant.queue_size >= 5) {
            return res.status(400).json({ message: 'Queue is full. Cannot add more customers.' });
        }

        // Update the restaurant queue (assuming you have a queue array in your restaurant model)
        if (!restaurant.queue) restaurant.queue = []; // Initialize queue if it doesn't exist
        restaurant.queue.push(user); // Add user to the queue
        restaurant.queue_size += 1; // Increment queue size
        await restaurant.save();

        res.status(200).json({ queueSize: restaurant.queue_size });
    } catch (error) {
        console.error('Error adding to queue:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});





//for queue status 
app.get('/api/restaurants/:name/queue', async (req, res) => {
    const restaurantName = req.params.name;

    try {
        const restaurant = await Restaurant.findOne({ name: restaurantName });
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        res.json({ queue: restaurant.queue, queueSize: restaurant.queue_size });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

app.post('/api/restaurants/:name/dequeue', async (req, res) => {
    const restaurantName = req.params.name;

    try {
        const restaurant = await Restaurant.findOne({ name: restaurantName });
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        if (restaurant.queue.length === 0) {
            return res.status(400).json({ message: 'No one in the queue to dequeue.' });
        }

        const dequeuedUser = restaurant.queue.shift(); // Remove the first user from the queue
        restaurant.queue_size -= 1; // Decrement queue size
        await restaurant.save();

        res.json({ user: dequeuedUser, queueSize: restaurant.queue_size });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
module.exports = { app, server };
