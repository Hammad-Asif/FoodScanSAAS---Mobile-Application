// =======================================  Importing Libraries  ================================================

const express = require('express');
const router = express.Router();
const { Plan } = require('../models/plan');


// =======================================  Getting All Plans  =================================================


router.get('/', async (req, res) => {
    try {
        const result = await Plan.find();

        if (!result) {
            return res.status(404).json({ success: false, message: 'Plan Record is Empty' })
        }

        res.status(200).send(result)
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Error in Plan Routes (get)', error: err })
    }
})


// =======================================  Getting Single Plan by id  ========================================

router.get('/:id', async (req, res) => {
    try {
        const result = await Plan.findById(req.params.id);

        if (!result) {
            return res.status(404).json({ success: false, message: 'Plan Not Found' })
        }

        res.status(200).send(result)
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Error in Plan Routes (get)', error: err })
    }
})


// =======================================  Create  ======================================================

router.post('/', async (req, res) => {
    try {

        const checkPlan = await Plan.findOne({ title: req.body.title });
        if (checkPlan) return res.status(400).json({ success: false, message: 'Already have a plan with this title' })

        const insertPlan = new Plan({
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            price: req.body.price,
            discount: req.body.discount,
        })

        const result = await insertPlan.save();

        if (!result) {
            res.status(500).json({ success: false, message: 'Plan Not Inserted' })
        }
        res.status(201).send(result);
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Error in Plans Router (post)', error: err })
    }
})


// =======================================  Delete Plan by Id  =================================================

router.delete('/:id', async (req, res) => {
    try {
        const result = await Plan.findByIdAndRemove(req.params.id)
        if (!result) {
            return res.status(404).json({ success: false, message: 'Plan Not Found' })
        }
        res.status(200).json({ success: true, message: 'Plan Deleted' })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error in Plan Routes (delete)', error: err })
    }
})


module.exports = router;