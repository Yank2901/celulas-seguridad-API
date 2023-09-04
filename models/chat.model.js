const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  idCell: {
    type: String,
    required: true,
  },
  idUser: {
    type: String,
    required: true,
  },
  nameUser: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date
  },
  typeMessage: {
    type: String,
    required: true,
  },
});

const Chat = mongoose.model("chat", ChatSchema);

module.exports = Chat;