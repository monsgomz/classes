const trainers = require("../models/trainers");
const { UnauthenticatedError } = require("../utils/errors");

const isAuthenticated = (req, res, next) => {
  const { user_id } = req.headers;
  const user = trainers.find((trainer) => trainer.id === Number(user_id));

  if (!user) {
    throw new UnauthenticatedError("You must be signed in to access this");
  }

  req.user = user;
  next();
};

module.exports = isAuthenticated;
