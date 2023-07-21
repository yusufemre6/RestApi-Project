const Product = require('../models/product');
const checkFields= require('../modules/checkfields'); 

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name , stock , price } = req.body;

    const requiredFields = ["name","stock","price"];
  
    if(!checkFields.checkFields(req.body,requiredFields)){
      return res.status(400).json({ message: 'Reguired fields are incorrect' });
    }

    const product = await Product.create({ name, stock, price });

    res.status(201).json({message:"Product created",product});
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({message:"Product found",product});
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const requiredFields = ["name","stock","price"];
  
    if(!checkFields.checkFields(req.body,requiredFields)){
      return res.status(400).json({ message: 'Reguired fields are incorrect' });
    }

    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({message:"Product updated",product});
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(204).json({message:"Product deleted"});
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct };
