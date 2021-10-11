const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    index: true,
  },
  add: {
    type: String,
    trim: true,
    index: true,
  },
  items: [String],
  pin: {
    type: String,
    trim: true,
    index: true,
  },
});

module.exports = mongoose.model("User", userSchema);
