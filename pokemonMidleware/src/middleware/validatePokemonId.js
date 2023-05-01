const createDebug = require("debug");
const pokemon = require("../models/pokemon");
const { NotFoundError } = require("../utils/errors");
const debug = createDebug("app:validatePokemonId");

const validatePokemonId = (req, _res, next) => {
  const foundPokemon = pokemon.find((p) => p.id === parseInt(req.params.id));
  debug("looking up pokemon");
  if (!foundPokemon) {
    throw new NotFoundError(`Pokemon with id ${req.params.id} not found`);
  }
  next();
};

module.exports = validatePokemonId;