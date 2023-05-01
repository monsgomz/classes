const { BadRequestError, NotFoundError } = require("../utils/errors");
const trainers = require("../models/trainers");

const create = (firstName, lastName, badges, role) => {
  if (!firstName || !lastName ||!badges || !role) {
    throw new BadRequestError("First name, last name, badges and role required");
  }
  const newTrainer = {
    id: Date.now(),
    firstName,
    lastName,
    badges,
    role
  }
  trainers.push(newTrainer);
  return newTrainer;
};

const deleteOne = (id) => {
  const idx = trainers.findIndex((trainerElement) => trainerElement.id === id);
  if (idx < 0) {
    throw new NotFoundError(`The trainer with id ${id} not found`);
  }

  const [deletedTrainer] = trainers.splice(idx, 1);
  return deletedTrainer;
};

const getAll = () => {
  return trainers;
};

const getOne = (id) => {
  const foundTrainer = trainers.find((p) => p.id === id);
  return foundTrainer;
};

const replace = (id, firstName, lastName, badges,role) => {
  const updatedTrainer = {
    id,
    firstName,
    lastName,
    badges,
    role
  };
  if (!firstName || !lastName ||!badges || role) {
    throw new BadRequestError("First name, last name, badges and role required");
  }
  const idx = trainers.findIndex((trainerElem) => trainerElem.id === id);
  if (idx < 0) {
    throw new NotFoundError(`Trainer with id ${id} not found`);
  }
  trainers[idx] = updatedTrainer;
  return updatedTrainer;
};

const update = (id, updatedFields) => {
  if (!Object.keys(updatedFields).length) {
    throw new BadRequestError("Nothing updated");
  }
  const idx = trainers.findIndex((trainerElem) => trainerElem.id === id);
  if (idx < 0) {
    throw new NotFoundError(`Trainer with id ${id} not found`);
  }

  const updatedTrainer = {
    ...trainers[idx],
    ...updatedFields,
  };
  trainers[idx] = updatedTrainer;
  return updatedTrainer;
};

module.exports = {
  create,
  deleteOne,
  getAll,
  getOne,
  replace,
  update,
};
