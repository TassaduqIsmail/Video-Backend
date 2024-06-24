const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({

  
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'

  },
  name: {
    type: String,
  },
  username: {
    type: String,
    unique: true
  },
  pic_url: {
    type: String,
  },
  pic_asset_id: {
    type: String,
  },
  pic_public_id: {
    type: String,
  },
  pic_created_at: {
    type: String,
  },
  price: {
    type: String,
  },
});

const Profile = mongoose.model("Profile", userProfileSchema);

module.exports = Profile;
