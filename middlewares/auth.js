const jwt = require('jsonwebtoken');
const Token = require('../models/token'); 
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
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

    const status= (Token.findOne({ value: token })).status;

    if(status){
      req.user = decoded;
    }
    else{
      return res.status(401).json({ message:'You are no longer active' });
    }
    next();
  });
};

module.exports = authMiddleware;

