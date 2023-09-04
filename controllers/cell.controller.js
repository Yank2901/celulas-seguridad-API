const Cell = require("../models/cell.model")

module.exports.createCell = (request, response) => {
  const { name, province, city, neighborhood, address, users } = request.body;
  Cell.create({
    name,
    province,
    city,
    neighborhood,
    address,
    users,
  })
    .then((user) => response.json(user))
    .catch((err) => response.status(400).json(err));
};

// Obtener todas las provincias con sus ciudades
exports.getAllCells = (_, res) => {
  Cell.find({})
    .then((cells) => {
      res.json(cells);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message || "Ocurrió un error al obtener las células.",
      });
    });
};
exports.getCellsByProvince = (request, res) => {
  Cell.find({ province: request.params.province })
    .then((cells) => {
      res.json(cells);
    })
    .catch((err) => {
      res.status(500).json({
        error:
          err.message ||
          "Ocurrió un error al obtener las células por provincia.",
      });
    });
};

exports.getCellsByCity = (request, res) => {
  Cell.find({ province: request.params.province, city: request.params.city })
    .then((cells) => {
      res.json(cells);
    })
    .catch((err) => {
      res.status(500).json({
        error:
          err.message || "Ocurrió un error al obtener las células por ciudad.",
      });
    });
};

exports.getCellsByNeighborhood = (request, res) => {
  Cell.find({
    province: request.params.province,
    city: request.params.city,
    neighborhood: request.params.neighborhood,
  })
    .then((cells) => {
      res.json(cells);
    })
    .catch((err) => {
      res.status(500).json({
        error:
          err.message || "Ocurrió un error al obtener las células por barrio.",
      });
    });
};

// Quiero buscar una celula por el campo _id autogenerado por mongo
exports.getCellById = (request, res) => {
  const cellId = request.params.cellId; // Capturar el valor de _id desde los parámetros de la solicitud
  Cell.findOne({ _id: cellId })
    .then((cell) => {
      if (!cell) {
        return res.status(404).json({ error: "Celda no encontrada." });
      }
      res.json(cell);
    })
    .catch((err) => {
      res.status(500).json({
        error:
          err.message || "Ocurrió un error al obtener la celda por su _id.",
      });
    });
};

exports.addUserToCell = (request, res) => {
  const cellId = request.params.cellId;
  const { id, name } = request.body;
  Cell.findOne({ _id: cellId })
    .then((cell) => {
      if (!cell) {
        return res.status(404).json({ error: "Celda no encontrada." });
      }
      cell.users.push({ id: id, name: name });
      cell.save();
      res.json(cell);
    })
    .catch((err) => {
      res.status(500).json({
        error:
          err.message || "Ocurrió un error al obtener la celda por su _id.",
      });
    });
};

exports.deleteUserFromCell = (request, res) => {
  const cellId = request.params.cellId;
  const userId = request.params.userId;

  Cell.findOne({ _id: cellId })
    .then((cell) => {
      if (!cell) {
        return res.status(404).json({ error: "Celda no encontrada." });
      }
      cell.users.pull({ id: userId });
      cell.save();
      res.json(cell);
    })
    .catch((err) => {
      res.status(500).json({
        error:
          err.message || "Ocurrió un error al obtener la celda por su id.",
      });
    });
};
