require('dotenv').config(); 
const mongoose = require('mongoose');

const connectDB = async () => {
    const mongo_url = process.env.DATABASE_URI; 

    try {
        await mongoose.connect(mongo_url, {
            // useUnifiedTopology: true,
            // useNewUrlParser: true
        });
        console.log("Mongodb connected");
    } catch (err) {
        console.log("Mongo connection error:", err);
    }
};
module.exports=connectDB;

