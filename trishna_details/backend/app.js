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
        console.log("Request body:", req.body);
        const newRestaurant = new Restaurant(req.body);
        const savedRestaurant = await newRestaurant.save();
        res.status(201).json(savedRestaurant);
    } catch (error) {
        console.error("Error saving restaurant:", error); 
        res.status(400).json({ error: error.message });
    }
});

// Fetch restaurant based on name
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

app.post('/api/restaurants/:name/joinQueue', async (req, res) => {
    const restaurantName = req.params.name;

    try {
        const restaurant = await Restaurant.findOne({ name: restaurantName });
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        if (restaurant.queue_size >= 10) {
            return res.status(400).json({ message: 'Queue is full. Cannot add more customers.' });
        }

        restaurant.queue_size += 1;
        await restaurant.save();
        res.status(200).json({ queueSize: restaurant.queue_size });
    } catch (error) {
        console.error('Error adding to queue:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/restaurants/:name/queue', async (req, res) => {
    const restaurantName = req.params.name;

    try {
        const restaurant = await Restaurant.findOne({ name: restaurantName });
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json({ queueSize: restaurant.queue_size });
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

        if (restaurant.queue_size <= 0) {
            return res.status(400).json({ message: 'No one in the queue to dequeue.' });
        }

        restaurant.queue_size -= 1;
        await restaurant.save();
        res.json({ queueSize: restaurant.queue_size });
    } catch (error) {
        console.error('Error dequeueing:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

module.exports = app;
