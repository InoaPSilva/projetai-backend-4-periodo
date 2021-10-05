const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        required: true
    },

    profilePic: String,

    linkedin: {
        type: String,
    },

    github: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
});

const guest = mongoose.model('guest', guestSchema);

module.exports = guest;