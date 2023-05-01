"use strict";

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const isAuthenticated = require("./middleware/isAuthenticated");
const pokemonRouter = require("./router/pokemon");
const trainerRouter = require("./router/trainers");
const { errorHandler} = require("./utils/errors");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.get("/", isAuthenticated, (req, res) => {
  res.json({ success: true });
});

app.use("/api/pokemon", pokemonRouter);
app.use("/api/trainers", trainerRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
