const user = require("./UserSchema");
const sports = require("./sportSchema");


const mongoose=require('mongoose')
const bookingSchema = new mongoose.Schema({
    sport_foreignkey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: sports,
    },
    date: {
        type: Date, 
        required: true
    }, 
    slot: {
        type: String,
        required: true
    }, 
    is_booked: {
        type: Boolean, 
        default: false
    },  
},  {
    timeseries: true
}
);



module.exports = mongoose.model('sportbookings', bookingSchema);