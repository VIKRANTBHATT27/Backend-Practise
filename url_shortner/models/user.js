const mongoose = require("mongoose");

const userModel = mongoose.Schema({
     name: {
          type: String,
          required: true
     },   
     email: {
          type: String,
          required: true,
          unique: true
     },
     password: {
          type: String,
          required: true
     },
     role: {
          type: String,
          required: true,
          default: 'USER'
     }
}, { timestamps: true, collection: 'userModel' });

const User = mongoose.model('User', userModel);
module.exports = User;