const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// parsing is the process of taking raw data and breaking it down into 
//structured information so the program can work with it efficiently.
const cors = require('cors');
//cors allows info from other ports too(in this case react port)
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
require('./Models/restaurant')
require('dotenv').config();
require('./Models/db');
require('./app');
require('./db')
require('./queue')
const PORT = process.env.PORT || 8080;

// app.get('/ping', (req, res) => {
//     res.send('PONG');
// });

 app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.post('/restaurants', async (req, res) => {
    try {
        const newRestaurant = new Restaurants(req.body);
        const savedRestaurant = await newRestaurant.save();
        res.status(201).json(savedRestaurant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})