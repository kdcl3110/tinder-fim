const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema(
  {
    name: { type: String, default: null, required: true},
    phone: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null, required: true },
    avatar: { type: String, default: null },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
  },
  { timestamps: true }
);

schema.plugin(uniqueValidator);
module.exports = mongoose.model("User", schema);
