const User = require('../models/user.model');

module.exports.getUserByIdAndPassword = (req, res) => {
  const { id, password } = req.body;

  User.findOne({ id, password })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.json(user);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: "Something went wrong when fetching the user" })
    );
};
