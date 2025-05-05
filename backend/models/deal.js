// models/Deal.js
const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  shop: {
    type: String,
    required: true, // Ensure this field is mandatory
  },
  description: {
    type: String,
    required: true, // Ensure this field is mandatory
  },
  expiration: {
    type: Date, // Changed to a Date type for better handling of expiration dates
    required: true, // Ensure this field is mandatory
  }
});

module.exports = mongoose.model('Deal', dealSchema);
