const mongoose = require("mongoose");

const CellSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  province: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  neighborhood: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  users: [
    {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

const Cell = mongoose.model("cells1", CellSchema);

module.exports = Cell;
