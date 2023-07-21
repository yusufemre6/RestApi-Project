const Product = require('../models/product');

const product = new Product();

const getAllProducts = async (req, res) => {
  try {
    product.getAllProducts(req,res);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createProduct = async (req, res) => {
  try {
    product.createProduct(req,res);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    product.getProductById(req,res);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateProduct = async (req, res) => {
  try {
   product.updateProduct(req,res);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    product.deleteProduct(req,res);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct };
