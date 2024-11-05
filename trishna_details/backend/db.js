require('dotenv').config(); 
const mongoose = require('mongoose');

const connectDB = async () => {
    const mongo_url = process.env.MONGO_CONN; 

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

