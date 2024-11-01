import React, { useState } from 'react';
import './filter.css';
import pic from './pic.png';

function RestaurantList() {
  const [restaurants] = useState([
    { id: 1, name: "The Gourmet Kitchen", location: "Downtown", veg: true, rating: 4.5, cuisine: "Italian", image:pic },
    { id: 2, name: "Sushi Palace", location: "City Center", veg: false, rating: 4.8, cuisine: "Japanese", image:pic },
    { id: 3, name: "Burger Hub", location: "Suburbs", veg: false, rating: 4.2, cuisine: "American", image:pic },
    { id: 4, name: "Green Delight", location: "Suburbs", veg: true, rating: 4.7, cuisine: "Indian", image:pic }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterVeg, setFilterVeg] = useState("all");
  const [filterCuisine, setFilterCuisine] = useState("all");
  const [filterRating, setFilterRating] = useState("all");

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVegFilter = filterVeg === "all" || (filterVeg === "veg" && restaurant.veg) || (filterVeg === "non-veg" && !restaurant.veg);
    const matchesCuisineFilter = filterCuisine === "all" || restaurant.cuisine === filterCuisine;
    const matchesRatingFilter = filterRating === "all" || restaurant.rating >= parseFloat(filterRating);
    return matchesSearch && matchesVegFilter && matchesCuisineFilter && matchesRatingFilter;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2 text-center">Our Featured Restaurants</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">Explore the best dining options curated just for you</p>

      {/* Header with search and filters */}
      <div className="filter-controls flex flex-col lg:flex-row items-center lg:justify-between mb-8 space-y-4 lg:space-y-0 lg:space-x-4">
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none lg:flex-1"
        />

        <select
          value={filterVeg}
          onChange={(e) => setFilterVeg(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
        >
          <option value="all">All</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
        </select>

        <select
          value={filterCuisine}
          onChange={(e) => setFilterCuisine(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
        >
          <option value="all">All Cuisines</option>
          <option value="Italian">Italian</option>
          <option value="Japanese">Japanese</option>
          <option value="American">American</option>
          <option value="Indian">Indian</option>
        </select>

        <select
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
        >
          <option value="all">Any Rating</option>
          <option value="4.0">4 Stars & Up</option>
          <option value="4.5">4.5 Stars & Up</option>
          <option value="4.8">4.8 Stars & Up</option>
        </select>
      </div>

      {/* Restaurant Cards */}
      <div className="cont grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <div className="card border border-gray-200 rounded-lg shadow-lg" key={restaurant.id}>
            <img src={restaurant.image} alt={restaurant.name} className="rounded-t-lg w-full h-35 object-cover" />
            <div className="card-content p-4">
              <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
              <div className="info flex justify-between items-center mb-2">
                <span className={`text-sm font-medium ${restaurant.veg ? "text-green-600" : "text-red-600"}`}>
                  {restaurant.veg ? "Veg" : "Non-Veg"}
                </span>
                <span className="rating text-yellow-500">{restaurant.rating} ⭐</span>
              </div>
              <div className="cuisine text-gray-600">Cuisine: {restaurant.cuisine}</div>
            </div>
            <div className="footer bg-gray-100 p-2 text-center text-sm text-gray-500 rounded-b-lg">Enjoy your meal!</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantList;
