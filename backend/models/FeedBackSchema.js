const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true, // Ensure it's not null
      unique: false, // Remove the unique constraint if not required
    },
    rating: {
      type: String,
      min: 1,
      max: 5,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
// Create a model based on the schema
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
