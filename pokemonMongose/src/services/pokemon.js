const { BadRequestError, NotFoundError } = require("../util/errors");
const pokemon = require("../models/pokemon");

const create =  async (name, type, abilities) => {
  if (!name || !type ||!abilities) {
    throw new BadRequestError("Name, type and abilities required");
  }
  
  const newPokemon = new pokemon({
    name,
    type,
    abilities
  });
  await newPokemon.save();
  return newPokemon;
};

const deleteOne = async (id) => {
  const deletedPokemon = await pokemon.findByIdAndDelete(id);
  if (!deletedPokemon) {
    throw new NotFoundError(`Pokemon with id ${id} not found`);
  } else{
    const deletedPokemon = await pokemon.findByIdAndDelete(id);
  }

  return deletedPokemon;
};

const getAll = async() => {
  const allPokemons = await pokemon.find();
  return allPokemons;
};

const getOne = async(id) => {
  const foundPokemon = await pokemon.findById(id);
  return foundPokemon;
};

const replace = async (id, newPokemon) => {
  if (!newPokemon.name || !newPokemon.type || !newPokemon.abilities) {
    throw new BadRequestError("Name, type and abilities required");
  }
  const replacePokemon = await pokemon.findByIdAndUpdate(id, newPokemon,{
    returnOriginal: false,
  });
  if (!replacePokemon) {
    throw new NotFoundError(`Pokemon with id ${id} not found`);
  }
 
  return updatedPokemon;
};

const update = async(id, updatedFields) => {
  if (!Object.keys(updatedFields).length) {
    throw new BadRequestError("Nothing updated");
  }
    const updatePokemon = await pokemon.findByIdAndUpdate(id, updatedFields, {
      returnOriginal: false,
    });
  if (!updatePokemon) {
    throw new NotFoundError(`Pokemon with id ${id} not found`);
  }

  return updatePokemon;
};

module.exports = {
  create,
  deleteOne,
  getAll,
  getOne,
  replace,
  update,
};
