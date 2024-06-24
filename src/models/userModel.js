const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  providerName: {
    type: String,
  },
  providerUId: {
    type: String,
  },
  status: {
    type: String,
  },
  isIntro: {
    type: String,
    default: true,
  },
  isDeleated: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
