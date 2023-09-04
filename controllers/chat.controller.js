const Chat = require("../models/chat.model");

module.exports.createChat = (request, response) => {
  const { idCell, idUser, nameUser, message, date, typeMessage } = request.body;
  Chat.create({
    idCell: idCell,
    idUser: idUser,
    nameUser: nameUser,
    message: message,
    date: date,
    typeMessage: typeMessage,
  })
    .then((chat) => response.json(chat))
    .catch((err) => response.status(400).json(err));
};

module.exports.getAllMessagesByIdCell = (request, response) => {
  Chat.find({ idCell: request.params.idCell })
    .then((chat) => response.json(chat.sort((a, b) => a.date - b.date)))
    .catch((err) => response.status(400).json(err));
};
