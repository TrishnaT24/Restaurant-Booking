const mongoose = require('mongoose');
const Schema=mongoose.Schema;
// Define the restaurant schema
const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true, 
    },
    rating: {
        type: Number,
        required: true, 
        min: 0,         
        max: 5          
    },
    food_type: {
        type: String,  
        required: true, 
    },
    cuisine: {
        type: String,
        required: true, 
    },
    queue_size:{
        type:Number,
        required:true,
        min:0,
        max:10,
    }
});
module.exports = mongoose.model('Restaurant', restaurantSchema);


