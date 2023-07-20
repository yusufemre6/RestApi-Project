const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    uniqe:true 
  },
  stock:{
    type:Number,
    required:true,
    default:0
  },
  price: { 
    type: Number, 
    required: true 
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;