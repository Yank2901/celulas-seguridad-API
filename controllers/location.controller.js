const Location = require('../models/location.model');

// Obtener todas las provincias con sus ciudades
exports.getAllLocations = (_, res) => {
    Location.find({})
        .then(locations => {
            res.json(locations);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || "Ocurrió un error al recuperar las ubicaciones."
            });
        });
};