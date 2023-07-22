const jwt = require('jsonwebtoken');
const Token = require('../models/token'); 
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    // Bearer Token kontrolü
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    // Token doğrulama
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Kullanıcının rolünü kontrol etme
      if (decoded.role !== 'Admin') {
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.user = decoded;
    });
    
    const foundUser = await Token.findOne({ value: token });
    if (foundUser.status===false) {
      return res.status(403).json({ message: 'You are not longer than active' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = authMiddleware;

