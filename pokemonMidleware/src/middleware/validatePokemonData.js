const { BadRequestError } = require("../utils/errors");

const validatePokemonData = (req, _res, next) => {
  const { name, type, abilities } = req.body;
  if (name || type || abilities) {
    if (typeof name !== "string" && typeof type !== "string" && typeof abilities !== "string") {
    throw new BadRequestError("First name, last name and role should be string");
  }
    if (typeof abilities == "string") {
    req.body.abilities = [abilities];
  } else if (!Array.isArray(abilities)) {
    throw new BadRequestError("Abilities should be an array");
  } 

  }else{
    throw new BadRequestError("Name, Type and Abilities required");
  }
  next();
};

module.exports = validatePokemonData;
