const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//scheme of db
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;//maine user schema ko users collection se attach kiya