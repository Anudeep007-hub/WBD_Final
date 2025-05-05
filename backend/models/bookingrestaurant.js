// // models/bookingsrestaurant.js
// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//     tableId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Table', // Assuming you have a 'Table' model
//         required: true,
//     },
//     name: {
//         type: String,
//         required: true,
//     },
//     phone: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//     },
//     bookingStatus: {
//         type: String,
//         enum: ['Pending', 'Confirmed', 'Cancelled'],
//         default: 'Pending',
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

// const Booking = mongoose.model('Booking', bookingSchema);

// module.exports = Booking;

const mongoose = require('mongoose');
const cron = require('node-cron');

const bookingSchema = new mongoose.Schema({
    tableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table', // Assuming you have a 'Table' model
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    bookingStatus: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Model
const Booking = mongoose.model('Booking', bookingSchema);

// CRON JOB TO DELETE BOOKINGS AFTER MIDNIGHT
cron.schedule('0 0 * * *', async () => {
    try {
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        // Find and delete all bookings created "yesterday"
        const result = await Booking.deleteMany({
            createdAt: { $lt: now }
        });

        console.log(`Deleted ${result.deletedCount} expired bookings after midnight.`);
    } catch (error) {
        console.error('Error deleting expired bookings:', error);
    }
});

module.exports = Booking;
