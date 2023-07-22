const mongoose = require('mongoose');
const checkFields=require('../helpers/checkfields');
const upload = require("../helpers/upload")
const multer =require('multer');
const bcrypt = require('bcryptjs');

class UserModel {
  constructor() {
    this.schema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      city: {
        type: String,
        required: true,
      },
      imgUrl:{
        type: String,
        default:'',
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        default: 'Personal',
      },
    });

    this.model = mongoose.model('User', this.schema);
  }

  async createUser(req,res) {
    try {
      const { name, email, city, password} = req.body;

      const requiredFields = ["name","email","city","password"];
    
      if(!checkFields.checkFields(req.body,requiredFields)){
        return res.status(400).json({ message: 'Reguired fields are incorrect' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.model.create({ name, email, city, password:hashedPassword });

      res.status(201).json({
        message:'User creating is successfull',
        user
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAllUsers(req,res) {
    try {
      const users = await this.model.find();
  
      res.status(200).json(users);
    } catch (error) {

      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getUserById(req,res){
    try {
      const { id } = req.params;

      const user = await this.model.findById(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User found', user });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateUser(req,res){
    try {
      const { id } = req.params;
      
      const objectFields = Object.keys(req.body);
      
      if(objectFields.includes('password')){
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }

      const user = await this.model.findByIdAndUpdate(id, req.body, { new: true });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User updated', user });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteUser(req,res){
    try {
      const { id } = req.params;

      const user = await this.model.findByIdAndDelete(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted'});
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async uploadImgByUserId(req,res){
    try {
      const { id } = req.params;
      
      const user = await this.model.findById(id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      upload(req,res,(err)=>{
        if (err instanceof multer.MulterError) {
            res.status(500).json({ error: 'Internal server error' });
        }else if(err) {
            res.status(500).json({ error: 'Internal server error' });
        } 
        else {
            this.model.findByIdAndUpdate(id, {imgUrl:req.newFileAddress}, { new: true }).then((user) => {
              res.status(200).json({ message: 'User img uploaded', user });
            }).catch((err) => {
              
            });;
        }
    })
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = UserModel;

