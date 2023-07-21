const User = require('../models/user');
const checkFields=require('../modules/checkfields');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, city} = req.body;

    const requiredFields = ["name","email","city"];
  
    if(!checkFields.checkFields(req.body,requiredFields)){
      return res.status(400).json({ message: 'Reguired fields are incorrect' });
    }

    const user = await User.create({ name, email, city });

    res.status(201).json({
      message:'User creating is successfull',
      user
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User found', user });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated', user });

  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted'});
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getAllUsers, createUser, getUserById, updateUser, deleteUser };
