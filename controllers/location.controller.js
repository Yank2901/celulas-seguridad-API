const Location = require('../models/location.model');

// Obtener todas las provincias con sus ciudades
exports.getAllLocations = (_, res) => {
    Location.find({})
        .then(locations => {
            locations.sort((a, b) => a.province.localeCompare(b.province));

            locations.forEach(location => {
                location.cities.sort((a, b) => a.city.localeCompare(b.city));

                location.cities.forEach(city => {
                    city.neighborhoods.sort();
                });
            });

            res.json(locations);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || "Ocurrió un error al recuperar las ubicaciones."
            });
        });
};
