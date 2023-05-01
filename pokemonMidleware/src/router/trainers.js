const { Router } = require("express");
const trainerController = require("../controllers/trainers");
const validateTrainerId = require('../middleware/validateTrainerId');
const validateTrainerData = require('../middleware/validateTrainerData');
const trainerRouter = Router();

trainerRouter.post("/", trainerController.create);
trainerRouter.get("/", trainerController.getAll);
trainerRouter.get("/:id", validateTrainerId, trainerController.getOne);
trainerRouter.put("/:id", validateTrainerData,trainerController.replace);
trainerRouter.patch("/:id", validateTrainerData,trainerController.update);
trainerRouter.delete("/:id", validateTrainerId,trainerController.deleteOne);

module.exports = trainerRouter;
