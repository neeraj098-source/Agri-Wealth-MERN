const mongoose = require('mongoose');
const wasteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  quantity: { type: String, required: true },
  price: { type: String, required: true },
  location: { type: String, required: true },
  farmer: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  verified: { type: Boolean, default: false },
}, { timestamps: true });
const WasteListing = mongoose.model('WasteListing', wasteSchema);
module.exports = WasteListing;