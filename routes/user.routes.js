const UserController = require ('../controllers/user.controller');
const LocationController = require ('../controllers/location.controller');

module.exports = function (app) {
  app.post('/api/user', UserController.getUserByIdAndPassword);
  app.get('/api/locations', LocationController.getAllLocations);
};
