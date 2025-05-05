const mongoose = require('mongoose');
const { Schema } = mongoose; 
const User = require("../models/UserSchema");  
const sportbookings = require("../models/bookingSchema");

const userwalletSchema = new Schema({
    Uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,  // Reference to the User model
    }, 
    email: {
        type: String, 
        required: true,
    },
    sports_bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: sportbookings,  // Reference to the sports model
        required: false,
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('userwallet', userwalletSchema);
