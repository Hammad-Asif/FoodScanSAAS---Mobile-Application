const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    default: "",
  },
  photo: {
    type: String,
  },
  brand: {
    type: String,
    default: "",
  },
  ingredients: {
    type: String,
  },
  rating: {
    type: Number,
  },
  chatGptDes: {
    type: String,
  },
  nix_item_id: {
    type: String,
    default: "",
  },
  nix_brand_id: {
    type: String,
    default: "",
  },

  serving_qty: {
    type: Number,
  },
  serving_unit: {
    type: String,
    
  },
  serving_weight_grams: {
    type: Number,
  },
  nf_metric_qty: {
    type: Number,
  },
  nf_calories: {
    type: Number,
  },
  nf_total_fat: {
    type: Number,
  },
  nf_saturated_fat: {
    type: Number,
  },
  nf_cholesterol: {
    type: Number,
  },
  nf_sodium: {
    type: Number,
  },
  nf_total_carbohydrate: {
    type: Number,
  },
  nf_dietary_fiber: {
    type: Number,
  },
  nf_sugars: {
    type: Number,
  },
  nf_protein: {
    type: Number,
  },
  nf_potassium: {
    type: Number,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

exports.Product = mongoose.model("Product", productSchema);