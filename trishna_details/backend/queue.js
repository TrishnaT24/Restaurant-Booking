// queue.js
const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurants.js'); // Import the Restaurant model
const connectDB = require('./db.js'); // Connect to MongoDB

// Define the TimedQueue class to handle queue operations for a restaurant
class TimedQueue {
  constructor(restaurantId) {
    this.restaurantId = restaurantId; // The ID of the restaurant for the queue
    this.dequeueInterval = null; // Interval ID for automatic dequeue
  }

  // Get the current queue size from the database
  async getQueueSize() {
    const restaurant = await Restaurant.findById(this.restaurantId);
    return restaurant ? restaurant.queue_size : 0;
  }

  // Add a user to the queue
  async enqueue(user) {
    const currentSize = await this.getQueueSize();

    if (currentSize >= 5) { // Example max queue size
      console.log("Queue is full. Cannot add more customers.");
      return;
    }

    console.log(`${user} has entered the queue.`);
    await this.updateQueueSize(currentSize + 1);

    // Start the dequeue interval if it’s not already running
    if (!this.dequeueInterval) {
      this.startDequeueInterval();
    }
  }

  // Update the queue size in the database
  async updateQueueSize(newSize) {
    try {
      const restaurant = await Restaurant.findById(this.restaurantId);
      if (restaurant) {
        restaurant.queue_size = newSize;
        await restaurant.save();
        console.log("Queue size updated successfully.");
      }
    } catch (err) {
      console.log("Error updating queue size:", err);
    }
  }

  // Remove a user from the queue
  async dequeue() {
    const currentSize = await this.getQueueSize();
    if (currentSize === 0) {
      console.log("The queue is empty.");
      return;
    }

    console.log("A user has been removed from the queue.");
    await this.updateQueueSize(currentSize - 1);
  }

  // Start an interval to automatically dequeue every 30 seconds
  startDequeueInterval() {
    this.dequeueInterval = setInterval(async () => {
      await this.dequeue();
      if (await this.getQueueSize() === 0) {
        console.log("Queue is empty. Stopping dequeue interval.");
        clearInterval(this.dequeueInterval);
        this.dequeueInterval = null;
      }
    }, 30000); // 30 seconds interval for dequeueing
  }
}

// Initialize the queue when the server starts
async function initQueue() {
  await connectDB(); // Ensure the database connection
  const restaurantId = "6724db5b0170edc3a3d74831"; // Example restaurant ID
  const bookingQueue = new TimedQueue(restaurantId);

  // Check initial queue size and start dequeue interval if needed
  const initialSize = await bookingQueue.getQueueSize();
  if (initialSize > 0) {
    bookingQueue.startDequeueInterval();
  }

  return bookingQueue; // Return the initialized queue
}

module.exports = { initQueue };
