const jwt = require('jsonwebtoken');
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

    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;

