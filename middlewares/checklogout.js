const Admin = require('../models/admin');
const checkFields= require('../modules/checkfields');
const Token = require('../models/token');


const logoutMiddleware = async (req, res, next) => {
    try{
        const status= await (Token.findOne({ status: true }));

        if(!status){
            return res.status(401).json({ message:'You are already logged out' });
        }

        next();
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  module.exports = logoutMiddleware;
  
  