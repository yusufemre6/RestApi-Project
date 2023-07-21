const Admin = require('../models/admin');
const checkFields= require('../modules/checkfields');
const Token = require('../models/token');


const loginMiddleware = async (req, res, next) => {
    try{
        const { email, password} = req.body;
    
        const requiredFields = ["email","password"];

        // Nesnenin tüm alanlarını dizi olarak alıyoruz
        const objectFields = Object.keys(req.body);

        // Tüm istenen alanların, nesnenin alanları içerisinde olup olmadığını kontrol ediyoruz
        for (const field of requiredFields) {
            if (!objectFields.includes(field)) {
                return res.status(400).json({ message: 'Reguired fields are incorrect' });
            }
        }

        const status= await (Token.findOne({ status: true }));

        if(status){
            return res.status(401).json({ message:'You are already logged in' });
        }

        next();
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }

    
  };
  
  module.exports = loginMiddleware;
  
  