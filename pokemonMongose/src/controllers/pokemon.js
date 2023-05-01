const PokemonService = require("../services/pokemon");
const {ObjectId} = require('mongodb');

const getAll = async (_req, res,next) => {
  try {
    const pokemon = await PokemonService.getAll();
    res.json({data: pokemon,});
    
  } catch (error) {
    next(error);
  }
  
};

const getOne = async(req, res,next) => {
  const id = new ObjectId(req.params.id);
  try {
     const pokemon = await PokemonService.getOne(id);
  res.json({data: pokemon,});
    
  } catch (error) {
     next(error);
  }
 
};

const create = async(req, res,next) => {
  const { name, type, abilities } = req.body;
  try {
    const data = await PokemonService.create(name, type, abilities);
    res.status(201).json({ data });
    
  } catch (error) {
     next(error);
  }
  
};

const replace = async(req, res,next) => {
  const id = new ObjectId(req.params.id);
  try {
     const { name, type, abilities } = req.body;
    const data = await PokemonService.replace(id, name, type, abilities);
    res.json({ data });
    
  } catch (error) {
    next(error);
  }
 
};

const update = async(req, res,next) => {
  const id = new ObjectId(req.params.id);
  const updatedFields = req.body;
  try {
    const data = await PokemonService.update(id, updatedFields);
    res.json({ data });
    
  } catch (error) {
    next(error);
  }
  
};

const deleteOne = async(req, res,next) => {
  const id = new ObjectId(req.params.id);
  try {
    const data = PokemonService.deleteOne(id);
    res.json({ data });
    
  } catch (error) {
    next(error);
  }
  
};

module.exports = {
  getAll,
  getOne,
  create,
  replace,
  update,
  deleteOne,
};
