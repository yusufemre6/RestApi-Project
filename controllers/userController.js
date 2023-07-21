const User = require('../models/user');


const user = new User();

const getAllUsers = async (req, res) => {
  try {
    user.getAllUsers(req,res);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createUser = async (req, res) => {
  try {
    user.createUser(req,res);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    user.getUserById(req,res);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    user.updateUser(req,res);

  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    user.deleteUser(req,res);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getAllUsers, createUser, getUserById, updateUser, deleteUser };
