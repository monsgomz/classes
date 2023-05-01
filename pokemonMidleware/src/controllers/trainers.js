const TrainersService = require("../services/trainers");

const getAll = (_, res) => {
  const data = TrainersService.getAll();
  res.json({data});
};

const getOne = (req, res) => {
  const id = parseInt(req.params.id);
  const data = TrainersService.getOne(id);
  res.json({ data});
};

const create = (req, res) => {
  const { firstName, lastName, badges, role } = req.body;
  const data = TrainersService.create(firstName, lastName, badges, role);
  res.status(201).json({ data });
};

const replace = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstName, lastName, badges, role }  = req.body;
  const data = TrainersService.replace(id, firstName, lastName, badges, role);
  res.json({ data });
};

const update = (req, res) => {
  const id = parseInt(req.params.id);
  const updatedFields = req.body;
  const data = TrainersService.update(id, updatedFields);
  res.json({ data });
};

const deleteOne = (req, res) => {
  const id = parseInt(req.params.id);
  const data = TrainersService.deleteOne(id);
  res.json({ data });
};

module.exports = {
  getAll,
  getOne,
  create,
  replace,
  update,
  deleteOne,
};
