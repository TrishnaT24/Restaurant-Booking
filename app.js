require('dotenv').config();
const express = require('express');
const connectDB = require('./db.js'); // Import the database connection
const Restaurant = require('./models/Restaurants.js'); // Import the model

const app = express();
app.use(express.json()); // To parse JSON bodies

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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
