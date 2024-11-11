const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true }, 
  images: [{ type: String }],
  description: { type: String, required: true },
});

const ProductModal = mongoose.model('Product', productSchema);

module.exports = ProductModal;
