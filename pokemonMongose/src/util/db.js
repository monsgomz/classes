"use strict";

const createDebug = require("debug");
const mongoose = require("mongoose");
const db = mongoose.connection;
const debug = createDebug("app:db_connection");

mongoose.connect(process.env.MONGO_URL);

db.on("error", (e) => {
  debug(e);
});
db.once("open", function () {
  debug("Connected successfully");
});
