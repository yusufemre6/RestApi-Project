const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

// Middleware
const authMiddleware = require('./middlewares/auth');

// Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

// Middleware kullanımı
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes tanımları
app.use('/auth', authRoutes);
app.use('/admin',authMiddleware ,adminRoutes);

const connectDB = require('./config/db');
connectDB();

// Server başlatma
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
