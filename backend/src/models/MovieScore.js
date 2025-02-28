const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema(
  {
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
    score: { type: Number, required: true, default: 10 },
  },
  { timestamps: true }
);

schema.plugin(uniqueValidator);
module.exports = mongoose.model("MovieScore", schema);
