const { BadRequestError } = require("../utils/errors");

const validateTrainerData = (req, _res, next) => {
  const { firstName, lastName, badges, role }  = req.body;
  if (firstName || lastName ||badges || role) {
    if (typeof firstName !== "string" && typeof lastName !== "string" && typeof role !== "string") {
    throw new BadRequestError("First name, last name and role should be string");
  }
  if (typeof badges == "string") {
    req.body.badges = [badges];
  } else if (!Array.isArray(badges)) {
    throw new BadRequestError("Badges should be an array");
  } else if (badges.some((el) => typeof el !== "string")) {
    throw new BadRequestError("Badges must be a string");
  }
  }else{
    throw new BadRequestError("Please write something to change");
  }
  
  next();
};

module.exports = validateTrainerData;
