const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Token = require('../models/token');
const checkFields= require('../modules/checkfields'); 

const register = async (req, res) => {
  try {
    const { name, email, password} = req.body;

    // Şifre hashleme
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kullanıcı oluşturma
    const admin = await Admin.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const requiredFields = ["email","password"];
  
    
    const admin = await Admin.findOne({ email });
    
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
    const token = await Token.create({value:jwt.sign({ adminId: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1m' })});

    res.status(200).json({ 
      message:admin.role+" login is successfully",
      status:'OK',
      admin,
      token:token
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const logout=async (req,res)=>{
  const authHeader = req.headers.authorization.split(' ')[1];
  
  const filter = { value: authHeader };
  const update = { status: false };
  const updatedDocument = await Token.findOneAndUpdate(filter, update, { new: true });
  res.status(200).json({ 
    message:" logout is successfully",
    status:'OK'
  });
};

module.exports = {register , login , logout };
