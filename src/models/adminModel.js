const mongoose = require("mongoose");

const Admin = new mongoose.Schema({

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
  isAdmin: {
    type: Boolean,
    default: false, // Set default value to false for regular users
  },
  newpassword:{
    type:String,
    default:false
  }

});

const adminModel = mongoose.model("Admin", Admin);

module.exports = adminModel;
