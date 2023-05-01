"use strict";

require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const pokemonRouter = require("./router/pokemon");
const { errorHandler } = require("./util/errors");
require("./util/db");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

// app.get("/", async (_req, res) => {
//   const Dog = mongoose.model("dog", { name: String });
//   const dylan = new Dog({ name: "Daila" });
//   await dylan.save();
//   res.json({ dylan });
// });

app.use("/api/pokemon", pokemonRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
