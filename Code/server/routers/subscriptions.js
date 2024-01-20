// =======================================  Importing Libraries  ================================================

const express = require("express");
const router = express.Router();
const { Subscription } = require("../models/subscription");
const { User } = require("../models/user");
const { Plan } = require("../models/plan");
var moment = require("moment");
const { Payment } = require("../models/payment");

// =======================================  Getting All Subscriptions  =================================================

router.get("/", async (req, res) => {
  try {
    const result = await Subscription.find().populate("user").populate("plan");

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription Record is Empty" });
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in Subscription Routes (get)",
      error: err,
    });
  }
});

// =======================================  Getting Single Subscription by id  ========================================

router.get("/:id", async (req, res) => {
  try {
    const result = await Subscription.findById(req.params.id)
      .populate("user")
      .populate("plan");

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription Not Found" });
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in Subscription Routes (get)",
      error: err,
    });
  }
});

// =======================================  Getting Subscription by User Id  ========================================

router.get("/user/:userId", async (req, res) => {
  try {
    const result = await Subscription.find({ user: req.params.userId })
      .sort({
        createdOn: -1,
      })
      .populate("user")
      .populate("plan");

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "User Subscription Not Found" });
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in Subscription Routes (get)",
      error: err,
    });
  }
});

// =======================================  Create Subscription  ======================================================

router.post("/", async (req, res) => {
  try {
    const checkUser = await User.findById(req.body.user);
    if (!checkUser)
      return res
        .status(400)
        .json({ success: false, message: "This user is not exits" });

    const checkPlan = await Plan.findById(req.body.plan);
    if (!checkPlan)
      return res
        .status(400)
        .json({ success: false, message: "This plan is not exits" });

    const insertSubscription = new Subscription({
      user: req.body.user,
      plan: req.body.plan,
      startsAt: moment().format(),
      endsAt:
        checkPlan?.type == "monthly"
          ? moment().add(1, "M").format()
          : moment().add(1, "Y").format(),
      renewedAt: req.body.renewedAt,
      renewedSubscriptionId: req.body.renewedSubscriptionId,
      cancelledAt: req.body.cancelledAt,
      upgradedAt: req.body.upgradedAt,
      upgradedToPlanId: req.body.upgradedToPlanId,
      downgradedAt: req.body.downgradedAt,
      downgradedToPlanId: req.body.downgradedToPlanId,
    });

    const insertPayment = new Payment({
      user: req.body.user,
      subscription: insertSubscription?.id,
      status: req?.body?.status,
      paymentId: req?.body?.paymentId,
      amountFor: req?.body?.amountFor,
      accountId: req.body.accountId,
      currencyCode: req.body.currencyCode,
      amount: req.body.amount,
      grossAmount: req.body.grossAmount,
      netAmount: req.body.netAmount,
      paypalFee: req.body.paypalFee,
    });

    const result = await User.findByIdAndUpdate(req.body.user, {
        isSubscribed: true,
    }, { new: true })

    const result1 = await insertSubscription.save();
    const result2 = await insertPayment.save();

    if (!result2) {
      res
        .status(500)
        .json({ success: false, message: "Subscription Not Inserted" });
    }
    res.status(201).send(result2);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in Subscriptions Router (post)",
      error: err,
    });
  }
});

// =======================================  Upgrade Subscription  ======================================================

router.post("/", async (req, res) => {
  try {
    const insertSubscription = new Subscription({
      user: req.body.user,
      plan: req.body.plan,
      startsAt: req.body.startsAt,
      endsAt: req.body.endsAt,
      renewedAt: req.body.renewedAt,
      renewedSubscriptionId: req.body.renewedSubscriptionId,
      cancelledAt: req.body.cancelledAt,
      upgradedAt: req.body.upgradedAt,
      upgradedToPlanId: req.body.upgradedToPlanId,
      downgradedAt: req.body.downgradedAt,
      downgradedToPlanId: req.body.downgradedToPlanId,
    });

    const result = await insertSubscription.save();

    if (!result) {
      res
        .status(500)
        .json({ success: false, message: "Subscription Not Inserted" });
    }
    res.status(201).send(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in Subscriptions Router (post)",
      error: err,
    });
  }
});

// =======================================  Delete Subscription by Id  =================================================

router.delete("/:id", async (req, res) => {
  try {
    const result = await Subscription.findByIdAndRemove(req.params.id);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription Not Found" });
    }
    res.status(200).json({ success: true, message: "Subscription Deleted" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in Subscription Routes (delete)",
      error: err,
    });
  }
});

module.exports = router;
