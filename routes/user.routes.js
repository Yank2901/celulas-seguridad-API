const UserController = require("../controllers/user.controller");
const LocationController = require("../controllers/location.controller");
const CellController = require("../controllers/cell.controller");
const ChatController = require("../controllers/chat.controller");

module.exports = function (app) {
  // Rutas para usuarios
  app.post("/api/user", UserController.getUserByIdAndPassword);
  app.post("/api/user/new", UserController.createUser);

  // Rutas para ubicaciones
  app.get("/api/locations", LocationController.getAllLocations);

  // Rutas para celdas
  app.post("/api/cell/new", CellController.createCell);
  app.get("/api/cells", CellController.getAllCells);
  app.get("/api/cells/:province", CellController.getCellsByProvince);
  app.get("/api/cells/:province/:city", CellController.getCellsByCity);
  app.get("/api/cells/:province/:city/:neighborhood", CellController.getCellsByNeighborhood);
  app.get("/api/cell/:cellId", CellController.getCellById);
  app.put("/api/cell/addUser/:cellId", CellController.addUserToCell);
  app.delete("/api/cell//deleteUser/:cellId/:userId", CellController.deleteUserFromCell);

  // Rutas para chats
  app.post("/api/chat/new", ChatController.createChat);
  app.get("/api/chats/:idCell", ChatController.getAllMessagesByIdCell);
};
