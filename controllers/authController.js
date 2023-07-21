const Admin = require('../models/admin');

const admin= new Admin();

const login = async (req, res) => {
  try {
    admin.loginAdmin(req,res);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const logout=async (req,res)=>{
  try {
    admin.logoutAdmin(req,res);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {login , logout };
