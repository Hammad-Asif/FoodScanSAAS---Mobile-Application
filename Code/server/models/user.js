const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: [true, "Already have an account on this email"],
  },
  passwordHash: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isSubscribed: {
    type: Boolean,
    default: false,
  },
  isOnceSubscribed: {
    type: Boolean,
    default: false,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

exports.User = mongoose.model("User", userSchema);
