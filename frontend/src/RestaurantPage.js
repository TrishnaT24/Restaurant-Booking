import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RestaurantPage.css';
import thai from './images/thai.jpg';

const RestaurantPage = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { name } = useParams();
  const navigate = useNavigate();

  // Function to fetch restaurant data
  const fetchRestaurantData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3000/api/restaurants/${name}`);
      if (response.ok) {
        const data = await response.json();
        setRestaurantData(data);
      } else {
        console.error('Restaurant not found');
        setRestaurantData(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to join the queue
  const joinQueue = async () => {
    try {
      const userName = 'Customer';
      const response = await fetch(`http://localhost:3000/api/restaurants/${name}/joinQueue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userName }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(`You have been added to the queue. There are ${result.queueSize} people ahead of you.`);
        fetchRestaurantData();
      } else if (response.status === 400) {
        const error = await response.json();
        setMessage(error.message || 'Error joining the queue.');
      } else {
        setMessage('An unexpected error occurred.');
      }
    } catch (error) {
      console.error('Error joining the queue:', error);
      setMessage('Failed to join the queue.');
    }
  };

  useEffect(() => {
    let intervalId;

    const startAutoDequeue = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/restaurants/${name}/dequeue`, {
          method: 'POST',
        });

        if (response.ok) {
          const result = await response.json();
          setMessage(`User ${result.user} has been dequeued. Remaining queue size: ${result.queueSize}`);
          fetchRestaurantData();
        }
      } catch (error) {
        console.error('Error dequeueing:', error);
      }
    };

    fetchRestaurantData();
    intervalId = setInterval(startAutoDequeue, 30000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [name]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <button
        onClick={() => navigate('/filters')}
        style={{color:'purple',
          fontWeight:'bold',
          marginBottom:'25px'
        }}className="absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Back to Restaurants
      </button>
      <img src={thai} alt="Restaurant" className="restaurant-image" />
      <h1 className="title">{name}</h1>
      {restaurantData ? (
        <ul className="details-list">
          <li>Rating: {restaurantData.rating} ⭐️</li>
          <li>Food Type: {restaurantData.food_type} 🍣</li>
          <li>Cuisine: {restaurantData.cuisine} 🇯🇵</li>
          <li>Current Queue Size: <span>{restaurantData.queue_size}</span></li>
        </ul>
      ) : (
        <ul className="details-list">
          <li>4.5 ⭐️</li>
          <li>Non-Veg 🍣</li>
          <li>Japanese 🇯🇵</li>
          <li>Current Queue Size: <span>4</span></li>
        </ul>
      )}
      <div>
        <button className="button" onClick={fetchRestaurantData}>
          Check Current Queue Status
        </button>
        <button className="button" onClick={joinQueue}>
          Join Queue
        </button>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default RestaurantPage;