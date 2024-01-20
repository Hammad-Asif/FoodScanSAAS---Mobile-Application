const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
  },
  startsAt: {
    type: Date,
    default: Date.now,
  },
  endsAt: {
    type: Date,
    default: null,
  },
  renewedAt: {
    type: Date,
    default: null,
  },
  renewedSubscriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcription",
    default: null,
  },
  cancelledAt: {
    type: Date,
    default: null,
  },
  upgradedAt: {
    type: Date,
    default: null,
  },
  upgradedToPlanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    default: null,
  },
  downgradedAt: {
    type: Date,
    default: null,
  },
  downgradedToPlanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    default: null,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

exports.Subscription = mongoose.model("Subscription", subscriptionSchema);
