const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    roomType: {
        type: String,
        required: true,
        enum: ['hostel', 'pg', 'flat']
    },
    checkin: {
        type: Date,
        required: true
    },
    checkout: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    }
});

const booking = mongoose.model('booking', bookingSchema);
module.exports = booking;