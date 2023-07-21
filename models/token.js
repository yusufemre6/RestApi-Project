const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  name: { 
    type: String, 
    default:"Bearer"
  },
  value: {
    type:String,
    unique:true,
    immutable: true
  },
  status:{
    type:Boolean,
    default:true
  }
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;