const { Router } = require("express");
const pokemonController = require("../controllers/pokemon");
const pokemonRouter = Router();

pokemonRouter.post("/", pokemonController.create);
pokemonRouter.get("/", pokemonController.getAll);
pokemonRouter.get("/:id",pokemonController.getOne);
pokemonRouter.put("/:id", pokemonController.replace);
pokemonRouter.patch("/:id",pokemonController.update);
pokemonRouter.delete("/:id",pokemonController.deleteOne);

module.exports = pokemonRouter;
