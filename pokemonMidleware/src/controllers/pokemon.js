const PokemonService = require("../services/pokemon");

const getAll = (_req, res) => {
  const pokemon = PokemonService.getAll();
  res.json({data: pokemon,});
};

const getOne = (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = PokemonService.getOne(id);
  res.json({data: pokemon,});
};

const create = (req, res) => {
  const { name, type, abilities } = req.body;
  const data = PokemonService.create(name, type, abilities);
  res.status(201).json({ data });
};

const replace = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, type, abilities } = req.body;
  const data = PokemonService.replace(id, name, type, abilities);
  res.json({ data });
};

const update = (req, res) => {
  const id = parseInt(req.params.id);
  const updatedFields = req.body;
  const data = PokemonService.update(id, updatedFields);

  res.json({ data });
};

const deleteOne = (req, res) => {
  const id = parseInt(req.params.id);
  const data = PokemonService.deleteOne(id);
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
