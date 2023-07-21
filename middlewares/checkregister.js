const Admin = require('../models/admin');
const checkFields= require('../modules/checkfields');
const Token = require('../models/token');


const registerMiddleware = async (req, res, next) => {
    try{
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

        const isExist= await Admin.exists({email});

        if(isExist){
            return res.status(406).json({ message: 'The email is already exist'});
        }

        if(password.length<6){
            return res.status(406).json({ message: 'The password must be longer than 6 character'});
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
  
  module.exports = registerMiddleware;
  
  