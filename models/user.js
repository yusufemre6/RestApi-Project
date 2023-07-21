const mongoose = require('mongoose');
const checkFields=require('../modules/checkfields');

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
      role: {
        type: String,
        default: 'Personal',
      },
    });

    this.model = mongoose.model('User', this.schema);
  }

  async createUser(req,res) {
    try {
      const { name, email, city} = req.body;

      const requiredFields = ["name","email","city"];
    
      if(!checkFields.checkFields(req.body,requiredFields)){
        return res.status(400).json({ message: 'Reguired fields are incorrect' });
      }

      const user = this.model.create({ name, email, city });

      res.status(201).json({
        message:'User creating is successfull',
        user
      });
    } catch (error) {
      console.log(error)
    }
  }

  async getAllUsers(req,res) {
   try {
    const users = this.model.find();
    console.log("1")
    res.status(200).json({users});
   } catch (error) {
    console.log(error)
   }
  }

  async getUserById(req,res){
    try {
      const { id } = req.params;

      const user =  this.findById(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User found', user });
    } catch (error) {
      console.log(error)
    }
  }

  async updateUser(req,res){
    try {
      const { id } = req.params;

      const user = this.model.findByIdAndUpdate(id, req.body, { new: true });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User updated', user });
    } catch (error) {
      console.log(error)
    }
  }

  async deleteUser(req,res){
    try {
      const { id } = req.params;

      const user = this.model.findByIdAndDelete(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted'});
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = UserModel;

