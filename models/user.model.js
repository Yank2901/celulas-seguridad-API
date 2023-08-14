const mongoose = require('mongoose');

const HomeDirectionSchema = new mongoose.Schema({
  province: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  neighborhood: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Invalid email"
    }
  },
  password: {
    type: String,
    required: true
  },
  homeDirections: [HomeDirectionSchema]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;