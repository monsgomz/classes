const createDebug = require("debug");
const trainer = require("../models/trainers");
const { NotFoundError } = require("../utils/errors");
const debug = createDebug("app:validateTrainersId");

const validateTrainersId = (req, _res, next) => {
  const foundTrainer = trainer.find((p) => p.id === parseInt(req.params.id));
  debug("looking up trainer");
  if (!foundTrainer) {
    throw new NotFoundError(`Trainer with id ${req.params.id} not found`);
  }
  next();
};

module.exports = validateTrainersId;