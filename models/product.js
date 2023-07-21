const mongoose = require('mongoose');
const checkFields=require('../modules/checkfields');

class ProductModel {
  constructor() {
    this.schema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
        unique: true,
      },
      stock: {
        type: Number,
        required: true,
        default: 0,
      },
      price: {
        type: Number,
        required: true,
      },
    });

    this.model = mongoose.model('Product', this.schema);
  }

  async createProduct(req,res) {
    try {
      const { name , stock , price } = req.body;

    const requiredFields = ["name","stock","price"];
  
    if(!checkFields.checkFields(req.body,requiredFields)){
      return res.status(400).json({ message: 'Reguired fields are incorrect' });
    }

    const product = this.model.create({ name, stock, price });

    res.status(201).json({message:"Product created",product});
    } catch (error) {
      console.log(error)
    }
  }

  async getAllProducts(req,res){
    try {
      const products = await this.model.find();
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
    }  
  }

  async getProductById(req,res) {
    try {
      const { id } = req.params;

      const product = this.model.findById(id);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({message:"Product found",product});
    } catch (error) {
      console.log(error)
    }
  }

  async updateProduct(req,res){
    try {
      const { id } = req.params;
    
      const product = this.model.findByIdAndUpdate(id, req.body, { new: true });

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({message:"Product updated",product});
    } catch (error) {
      console.log(error)
    }
  }

  async deleteProduct(req,res){
    try {
      const { id } = req.params;

      const product = this.model.findByIdAndDelete(id);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({
        message:"Product deleted"
      });
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = ProductModel;
