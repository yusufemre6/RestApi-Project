const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Token = require('../models/token');

class Admin {
  constructor() {
    this.schema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        default: 'Admin',
      },
    });

    this.model = mongoose.model('Admin', this.schema);
  }

  async loginAdmin(req,res){
    try {
      const { email, password } = req.body;
    
      const admin = await this.model.findOne({ email });

      //Email kontolü
      if (!admin) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      // Şifre kontrolü
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Token oluşturma
      const token = await Token.create({value:jwt.sign({ adminId: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' })});

      const tokenExpirationTime=3600000;

      setTimeout(() => this.autoLogout(), tokenExpirationTime);

      res.status(200).json({ 
        message:admin.role+" login is successfully. Your token is here: ",
        token:token
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async logoutAdmin(req,res){
    try {
      const update = { status: false };
      const updatedDocument = await Token.updateMany({},{$set: update});
      res.status(200).json({ 
        message:" logout is successfully",
        status:'OK'
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async  autoLogout(){
    try {
      const update = { status: false };
      const updatedDocument = await Token.updateMany({},{$set: update});
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = Admin;
