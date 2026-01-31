const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,   // ✅ SINGLE IMAGE
  price: Number
});

module.exports = mongoose.model('Product', productSchema);
