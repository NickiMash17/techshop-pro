const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Laptops', 'Smartphones', 'Tablets', 'Accessories']
  },
  imageUrl: String,
  specs: {
    type: Map,
    of: String
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Product', productSchema);