// =======================================  Importing Libraries  ================================================

const express = require("express");
const router = express.Router();
const { Payment } = require("../models/payment");

// =======================================  Getting All Payments  =================================================

router.get("/", async (req, res) => {
  try {
    const result = await Payment.find()
      .populate("user")
      .populate("subscription");

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Payment Record is Empty" });
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in Payment Routes (get)",
      error: err,
    });
  }
});

// =======================================  Getting Single Payment by id  ========================================

router.get("/:id", async (req, res) => {
  try {
    const result = await Payment.findById(req.params.id)
      .populate("user")
      .populate("subscription");

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Payment Not Found" });
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in Payment Routes (get)",
      error: err,
    });
  }
});

// =======================================  Getting Payment by User Id  ========================================

router.get("/user/:userId", async (req, res) => {
  try {
    const result = await Payment.find({ user: req.params.userId })
      .sort({
        createdOn: -1,
      })
      .populate("user")
      .populate("subscription");

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "User Payment Not Found" });
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in Payment Routes (get)",
      error: err,
    });
  }
});

module.exports = router;
