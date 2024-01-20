// =======================================  Importing Libraries  ================================================

const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");
const { evaluateIngredients } = require("../helpers/evaluate");

// =======================================  Getting All Products  =================================================

router.get("/", async (req, res) => {
  try {
    const result = await Product.find();

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Product Record is Empty" });
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in Product Routes (get)",
      error: err,
    });
  }
});

// =======================================  Getting Single Product by id  ========================================

router.get("/:id", async (req, res) => {
  try {
    const result = await Product.findById(req.params.id);

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in Product Routes (get)",
      error: err,
    });
  }
});

// =======================================  Getting Product by User Id  ========================================

router.get("/user/:userId", async (req, res) => {
  try {
    const result = await Product.find({ user: req.params.userId }).sort({
      createdOn: -1,
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "User Product Not Found" });
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in Product Routes (get)",
      error: err,
    });
  }
});

// =======================================  Create Products  ======================================================

router.post("/", async (req, res) => {
    console.log('req ', req?.body);
  try {
    const checkProduct = await Product.findOne({
      nix_item_id: req?.body?.nix_item_id,
      user: req?.body?.user
    });
    if (checkProduct)
      return res
        .status(400)
        .json({ success: false, message: "This Product is already exits" });

    const { rating } = evaluateIngredients(req?.body?.ingredients?.split(","));

    const insertProduct = new Product({
      user: req.body.user,
      name: req.body.name,
      photo: req.body.photo,
      brand: req.body.brand,
      ingredients: req.body.ingredients,
      rating: rating,
      chatGptDes: req.body.chatGptDes,
      nix_item_id: req.body.nix_item_id,
      nix_brand_id: req.body.nix_brand_id,
      serving_qty: req.body.serving_qty,
      serving_unit: req.body.serving_unit,
      serving_weight_grams: req.body.serving_weight_grams,
      nf_metric_qty: req.body.nf_metric_qty,
      nf_calories: req.body.nf_calories,
      nf_total_fat: req.body.nf_total_fat,
      nf_saturated_fat: req.body.nf_saturated_fat,
      nf_cholesterol: req.body.nf_cholesterol,
      nf_sodium: req.body.nf_sodium,
      nf_total_carbohydrate: req.body.nf_total_carbohydrate,
      nf_dietary_fiber: req.body.nf_dietary_fiber,
      nf_sugars: req.body.nf_sugars,
      nf_protein: req.body.nf_protein,
      nf_potassium: req.body.nf_potassium,
    });

    const result1 = await insertProduct.save();

    if (!result1) {
      res.status(500).json({ success: false, message: "Product Not Inserted" });
    }
    res.status(201).send(result1);
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Error in Products Router (post)",
      error: err,
    });
  }
});

module.exports = router;
