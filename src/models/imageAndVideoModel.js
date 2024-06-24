const { Long, Double } = require("mongodb");
const mongoose = require("mongoose");

const imageAndVideoSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'

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
  pic_format: {
    type: String,
  },
  pic_type: {
    type: String,
  },
  duration: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [String],

  views: {
    type: Number,
    default: 0
  },
  ratings: [
    {
      uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      rate: {
        type: Number,
        default: 0
      }
    }
  ]

});

const imageAndVideo = mongoose.model('imagesAndVideos', imageAndVideoSchema);

module.exports = imageAndVideo;