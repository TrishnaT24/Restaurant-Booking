const mongoose = require('mongoose');
const readline = require('readline');
const Restaurant = require('./models/Restaurants.js'); // Import the model
const connectDB = require('./db.js'); 

class TimedQueue {
  constructor(restaurantId) {
    this.queue = [];
    this.restaurantId = restaurantId; // Store the restaurant ID to fetch queue size
  }

  // Initialize the queue by fetching the current queue state from the database
  async initializeQueue() {
    const restaurant = await Restaurant.findById(this.restaurantId);
    if (restaurant && restaurant.queue) {
      this.queue = restaurant.queue; // Load the queue from the database
    }
  }

  async getQueueSize() {
    const restaurant = await Restaurant.findById(this.restaurantId);
    return restaurant ? restaurant.queue_size : 0; // Return the current queue size
  }

  async enqueue(user) {
    const currentSize = await this.getQueueSize();

    if (currentSize >= 5) {
      console.log("Queue is full. Cannot add more customers.");
      return;
    }

    const userEntry = { user, timestamp: new Date() };
    this.queue.push(userEntry);
    console.log(`There are ${currentSize} people ahead of you in this queue.`);
    console.log(`Current queue size: ${this.queue.length}.`);
    console.log(`${user} has entered the queue.`);

    // Update queue size in the database
    await this.updateQueueSize();

    // Schedule the dequeue operation after 5 seconds
    setTimeout(() => {
      this.dequeue();
    }, 30000); 
  }

  async updateQueueSize() {
    const restaurant = await Restaurant.findById(this.restaurantId);
    if (restaurant) {
      restaurant.queue_size = this.queue.length; // Update queue size
      restaurant.queue = this.queue; // Save current queue state
      await restaurant.save();
    }
  }

  async dequeue() {
    if (this.queue.length === 0) {
      console.log("The queue is empty.");
      return;
    }

    const frontUser = this.queue.shift();
    console.log(`${frontUser.user} has been removed from the queue.`);

    // Update queue size in the database
    await this.updateQueueSize();
  }

  front() {
    if (this.queue.length === 0) {
      return "The queue is empty.";
    }
    return this.queue[0]; // Return the front user
  }

  size() {
    return this.queue.length;
  }
}

// Main function to start the queue process
async function main() {
  await connectDB();

  const restaurantId = "67222fbd8cfc985b2c7bf763"; // Replace with your actual restaurant ID
  const bookingQueue = new TimedQueue(restaurantId); // Create a queue for the restaurant

  // Initialize the queue from the database
  await bookingQueue.initializeQueue();

  // Set up readline interface for user input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Function to prompt for a new user to add to the queue
  function addUser() {
    rl.question("Enter customer name to add to the queue (or type 'exit' to stop): ", async (name) => {
      if (name.toLowerCase() === 'exit') {
        rl.close();
        return;
      }
      await bookingQueue.enqueue(name);
      addUser(); 
    });
  }

  addUser();
}

main();
