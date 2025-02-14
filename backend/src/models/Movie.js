const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema(
  {
    poster: { type: String, default: null},
    title: { type: String, default: null },
    vote_average: { type: Number, default: null },
    vote_count: { type: Number, default: null },
    popularity: { type: Number, default: null },
    release_date: { type: Date, default: null },
    overview: { type: String, default: null},
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
  },
  { timestamps: true }
);

schema.plugin(uniqueValidator);
module.exports = mongoose.model("Movie", schema);
