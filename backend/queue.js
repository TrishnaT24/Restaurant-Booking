const mongoose = require('mongoose');
const readline = require('readline');
const Restaurant = require('./models/Restaurants.js'); // Import the model
const connectDB = require('./db.js');

// Enable CORS for all routes
const { app } = require('./app.js');

class TimedQueue {
  constructor(restaurantId) {
    this.restaurantId = restaurantId;
    this.dequeueInterval = null;
  }

  async getQueueSize() {
    const restaurant = await Restaurant.findById(this.restaurantId);
    return restaurant ? restaurant.queue_size : 0;
  }

  async enqueue(user) {
    const currentSize = await this.getQueueSize();

    if (currentSize >= 5) {
      console.log("Queue is full. Cannot add more customers.");
      return;
    }

    // Just log the enqueue event
    console.log(`${user} has entered the queue.`);
    await this.updateQueueSize(currentSize + 1); // Increment queue size

    // Start dequeue interval if not already running
    if (!this.dequeueInterval) {
      this.startDequeueInterval();
    }
  }

  async updateQueueSize(newSize) {
    try {
      const restaurant = await Restaurant.findById(this.restaurantId);
      if (restaurant) {
        restaurant.queue_size = newSize;
        await restaurant.save();
        console.log("Queue size updated in the database successfully.");
      }
    } catch (err) {
      console.log("Error updating queue size:", err);
    }
  }

  async dequeue() {
    const currentSize = await this.getQueueSize();
    if (currentSize === 0) {
      console.log("The queue is empty.");
      return;
    }

    console.log("A user has been removed from the queue.");
    await this.updateQueueSize(currentSize - 1); // Decrement queue size
  }

  startDequeueInterval() {
    this.dequeueInterval = setInterval(async () => {
      await this.dequeue();
      if (await this.getQueueSize() === 0) {
        console.log("Queue is empty. Stopping dequeue interval.");
        clearInterval(this.dequeueInterval);
        this.dequeueInterval = null;
      }
    }, 30000); // Adjust this interval time as necessary
  }

  front() {
    // This method is no longer applicable without an actual queue
    return "Queue management is based solely on queue size.";
  }

  size() {
    return this.getQueueSize();
  }
}

async function main() {
  await connectDB();

  const restaurantId = "67234ab1a5f5a31213873e7d";
  const bookingQueue = new TimedQueue(restaurantId);

  // No need to initialize an actual queue; just check size
  const initialSize = await bookingQueue.getQueueSize();
  if (initialSize > 0) {
    bookingQueue.startDequeueInterval();
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

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
