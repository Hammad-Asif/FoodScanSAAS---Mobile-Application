const mongoose = require("mongoose");

const planSchema = mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  type: {
    type: String,
  },
  price: {
    type: String,
  },
  discount: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

exports.Plan = mongoose.model("Plan", planSchema);
