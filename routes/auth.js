const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Middleware
const registerMiddleware = require('../middlewares/checkregister');
const loginMiddleware = require('../middlewares/checklogin');
const logoutMiddleware = require('../middlewares/checklogout');

// Auth rotaları
router.post('/register',registerMiddleware ,authController.register);
router.post('/login',loginMiddleware, authController.login);
router.post('/logout',logoutMiddleware , authController.logout);

module.exports = router;