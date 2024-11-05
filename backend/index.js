require('dotenv').config();
const express = require('express');
const authRouter = require('./Routes/AuthRouter.js');
const ProductRouter=require('./Routes/ProductRouter.js');
const bodyParser = require('body-parser');
require('./Models/db');
const app = require('../trishna_details/backend/app.js'); // Import the app instance
const { initQueue } = require('../trishna_details/backend/queue.js'); // Import queue initialization function
const PORT = process.env.PORT || 3000;



const cors = require('cors');
app.use(express.json()); // To parse JSON bodies
app.use('/auth', authRouter); 
app.use('/products', ProductRouter);
app.use(bodyParser.json());
app.use(cors());
app.get('/ping', (req, res) => {
  res.send('PONG');
});

app.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}`);
  
  // Initialize the queue after server starts
  const bookingQueue = await initQueue();

  // Route to enqueue a user in the booking queue
  app.post('/queue/enqueue', async (req, res) => {
    const { user } = req.body;
    await bookingQueue.enqueue(user);
    res.send(`${user} added to the queue.`);
  });
});
