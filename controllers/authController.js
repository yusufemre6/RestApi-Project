const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const register = async (req, res) => {
  try {
    const { name, email, password} = req.body;

    const requiredFields = ["name","email","password"];

    // Nesnenin tüm alanlarını dizi olarak alıyoruz
    const objectFields = Object.keys(req.body);

    // Tüm istenen alanların, nesnenin alanları içerisinde olup olmadığını kontrol ediyoruz
    for (const field of requiredFields) {
      if (!objectFields.includes(field)) {
        return res.status(400).json({ message: 'Reguired fields are incorrect' });
      }
    }

    const isExist= await Admin.findOne({email});

    if(isExist){
      return res.status(406).json({ message: 'The email is already exist'});
    }

    if(password.length<6){
      return res.status(406).json({ message: 'The password must be longer than 6 character'});
    }

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

    // Kullanıcıyı bulma
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
    const token = jwt.sign({ adminId: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ 
      message:admin.role+" login is successfully",
      status:'OK',
      admin,
      token 
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const logout=async (req,res)=>{};

module.exports = {register , login , logout };
