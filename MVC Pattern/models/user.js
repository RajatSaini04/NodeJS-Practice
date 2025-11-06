const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true });

const User = mongoose.model('user', userschema);

module.exports = User;