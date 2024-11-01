const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;
//connect kiya ..url is in .env(connection string)
mongoose.connect(mongo_url)
    .then(() => {
        console.log('MongoDB Connected...');
    }).catch((err) => {
        console.log('MongoDB Connection Error: ', err);
    })