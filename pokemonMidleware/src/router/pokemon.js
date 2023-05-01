const { Router } = require("express");
const pokemonController = require("../controllers/pokemon");
const validatePokemonId = require('../middleware/validatePokemonId');
const validatePokemonData = require('../middleware/validatePokemonData');
const pokemonRouter = Router();

pokemonRouter.post("/", pokemonController.create);
pokemonRouter.get("/", pokemonController.getAll);
pokemonRouter.get("/:id", validatePokemonId,pokemonController.getOne);
pokemonRouter.put("/:id", validatePokemonData,pokemonController.replace);
pokemonRouter.patch("/:id", validatePokemonData,pokemonController.update);
pokemonRouter.delete("/:id", validatePokemonId,pokemonController.deleteOne);

module.exports = pokemonRouter;
