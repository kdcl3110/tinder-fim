
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true},
  },
  { timestamps: true }
);

schema.plugin(uniqueValidator);
module.exports = mongoose.model("Group", schema);
