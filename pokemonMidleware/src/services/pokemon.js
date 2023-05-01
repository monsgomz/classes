const { BadRequestError, NotFoundError } = require("../utils/errors");
const pokemon = require("../models/pokemon");

const create = (name, type, abilities) => {
  if (!name || !type ||!abilities) {
    throw new BadRequestError("Name, type and abilities required");
  }
  const newPokemon = {
    id: Date.now(),
    name,
    type,
    abilities
  }
  pokemon.push(newPokemon);
  return newPokemon;
};

const deleteOne = (id) => {
  const idx = pokemon.findIndex((pokemonElement) => pokemonElement.id === id);
  if (idx < 0) {
    throw new NotFoundError(`Pokemon with id ${id} not found`);
  }

  const [deletedPokemon] = pokemon.splice(idx, 1);
  return deletedPokemon;
};

const getAll = () => {
  return pokemon;
};

const getOne = (id) => {
  const foundPokemon = pokemon.find((p) => p.id === id);
  return foundPokemon;
};

const replace = (id, name, type, abilities) => {
  const updatedPokemon = {
    id,
    name,
    type,
    abilities,
  };
  if (!name || !type || !abilities) {
    throw new BadRequestError("Name, type and abilities required");
  }
  const idx = pokemon.findIndex((pokemonElem) => pokemonElem.id === id);
  if (idx < 0) {
    throw new NotFoundError(`Pokemon with id ${id} not found`);
  }
  pokemon[idx] = updatedPokemon;
  return updatedPokemon;
};

const update = (id, updatedFields) => {
  if (!Object.keys(updatedFields).length) {
    throw new BadRequestError("Nothing updated");
  }
  const idx = pokemon.findIndex((pokemonElem) => pokemonElem.id === id);
  if (idx < 0) {
    throw new NotFoundError(`Pokemon with id ${id} not found`);
  }

  const updatedPokemon = {
    ...pokemon[idx],
    ...updatedFields,
  };
  pokemon[idx] = updatedPokemon;
  return updatedPokemon;
};

module.exports = {
  create,
  deleteOne,
  getAll,
  getOne,
  replace,
  update,
};
