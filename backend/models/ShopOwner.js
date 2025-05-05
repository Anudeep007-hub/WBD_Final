const mongoose = require('mongoose');

const shopOwnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  shop: { type: String, required: true },
  password: { type: String, required: true }, // Store hashed password
});

const ShopOwner = mongoose.model('ShopOwner', shopOwnerSchema);

module.exports = ShopOwner;
