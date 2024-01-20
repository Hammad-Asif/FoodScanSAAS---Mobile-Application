const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
  },
  paymentId: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "",
  },
  amountFor: {
    type: String,
    default: "",
  },
  accountId: {
    type: String,
    default: "",
  },
  currencyCode: {
    type: String,
  },
  amount: {
    type: String,
  },
  grossAmount: {
    type: String,
  },
  netAmount: {
    type: String,
  },
  paypalFee: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

exports.Payment = mongoose.model("Payment", paymentSchema);
