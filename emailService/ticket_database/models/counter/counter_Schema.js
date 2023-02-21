const mongoose = require("mongoose");

const { Schema } = mongoose;

const counterSchema = new Schema({
  id: {
    type: String,
  },
  seq: {
    type: Number,
  },
});

module.exports = counterSchema;
