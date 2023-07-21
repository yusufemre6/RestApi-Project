const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Middleware
const loginMiddleware = require('../middlewares/checklogin');
const logoutMiddleware = require('../middlewares/checklogout');

// Auth rotaları
router.post('/login',loginMiddleware, authController.login);
router.post('/logout',logoutMiddleware , authController.logout);

module.exports = router;