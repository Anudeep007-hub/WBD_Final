const mongoose = require('mongoose');

// Define the Manager schema
const ManagerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please enter a valid email address',
    ],
  },
  section: {
    type: String,
    required: [true, 'Section is required'],
    enum: {
      values: ['weather', 'sports', 'theatre', 'restaurant'],
      message: 'Section must be one of: weather, sports, theatre, restaurant',
    },
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Export the model
const Manager = mongoose.model('Manager', ManagerSchema);

module.exports = Manager;
