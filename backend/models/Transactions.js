const { type } = require("os");
const User = require("./UserSchema"); 
const sports = require("./sportSchema");


const mongoose=require('mongoose')
const bookingSchema = new mongoose.Schema({
    Uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
    },
    sports_bookings: {
        type: [mongoose.Schema.Types.ObjectId], 
        ref: sports,
        required:false,
    },
},  {
    timeseries: true
}
);



module.exports = mongoose.model('transactions', bookingSchema);