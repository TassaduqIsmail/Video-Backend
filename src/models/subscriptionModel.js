const mongoose = require("mongoose");

const subscriptionModel = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  subcriberId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  paymentStatus: {
    type: String,
  },
  paymentIntent: {
    type: String,
  },
  price: {
    type: String,
  },
  subStatus: {
    type: String,
  },
});

const subscription = mongoose.model('subscription', subscriptionModel);

module.exports = subscription;