const mongoose = require('mongoose');
const checkFields=require('../helpers/checkfields');

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

    const product = await this.model.create({ name, stock, price });

    res.status(201).json({message:"Product created",product});
    } catch (error) {
      console.log(error)
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.model.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }  
  }

  async getProductById(req,res) {
    try {
      const { id } = req.params;

      const product = await this.model.findById(id);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({message:"Product found",product});
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateProduct(req,res){
    try {
      const { id } = req.params;
    
      const product = await this.model.findByIdAndUpdate(id, req.body, { new: true });

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({message:"Product updated",product});
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteProduct(req,res){
    try {
      const { id } = req.params;

      const product = await this.model.findByIdAndDelete(id);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({
        message:"Product deleted"
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = ProductModel;
