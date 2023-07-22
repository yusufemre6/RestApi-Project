const Admin = require('../models/admin');
const checkFields= require('../helpers/checkfields');
const Token = require('../models/token');


const loginMiddleware = async (req, res, next) => {
    try{
        const requiredFields = ["email","password"];

        if(!checkFields.checkFields(req.body,requiredFields)){
            return res.status(400).json({ message: 'Reguired fields are incorrect' });
        }
        
        const status= await (Token.findOne({ status: true }));
        
        if(status){
            return res.status(401).json({ 
                message:'You are already logged in',
                token: JSON.stringify(status.value) 
            });
        }
        next();
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  module.exports = loginMiddleware;
  
  