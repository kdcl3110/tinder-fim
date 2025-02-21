const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema(
  {
    username: { type: String, default: null, required: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  },
  { timestamps: true }
);

schema.plugin(uniqueValidator);
module.exports = mongoose.model("User", schema);
