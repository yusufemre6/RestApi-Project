const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');

//User rotaları
router.get('/getAllUsers', userController.getAllUsers);
router.post('/createUser', userController.createUser);
router.get('/getUserById/:id', userController.getUserById);
router.patch('/updateUser/:id', userController.updateUser);
router.delete('/deleteUser/:id', userController.deleteUser);
router.patch('/uploadImgByUserId/:id', userController.uploadImgByUserId);


// Product rotaları
router.get('/getAllProducts', productController.getAllProducts);
router.post('/createProduct', productController.createProduct);
router.get('/getProductById/:id', productController.getProductById);
router.patch('/updateProduct/:id', productController.updateProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);

module.exports = router;