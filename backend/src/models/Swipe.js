const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema(
  {
    user: { type: String, default: null },
    film: { type: Date, default: null },
    choice: {
      type: String,
      enum: ["like", "unlike"],
    },
  },
  { timestamps: true }
);

schema.plugin(uniqueValidator);
module.exports = mongoose.model("Swipe", schema);
