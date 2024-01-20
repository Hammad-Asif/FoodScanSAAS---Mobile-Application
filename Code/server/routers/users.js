// =======================================  Importing Libraries  ================================================

const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const { Subscription } = require('../models/subscription');


// =======================================  Getting All Users  =================================================


router.get('/', async (req, res) => {
    try {
        const result = await User.find().select('-passwordHash');

        if (!result) {
            return res.status(404).json({ success: false, message: 'User Record is Empty' })
        }

        res.status(200).send(result)
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Error in User Routes (get)', error: err })
    }
})


// =======================================  Getting Single User by id  ========================================

router.get('/:id', async (req, res) => {
    try {
        const result = await User.findById(req.params.id).select('-passwordHash');

        if (!result) {
            return res.status(404).json({ success: false, message: 'User Not Found' })
        }

        res.status(200).send(result)
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Error in User Routes (get)', error: err })
    }
})


// =======================================  Sign Up User  ======================================================

router.post('/signup', async (req, res) => {
    try {

        const checkEmail = await User.findOne({ email: req.body.email });
        if (checkEmail) return res.status(400).json({ success: false, message: 'Already have an account on this email' })

        const insertUser = new User({
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            name: req.body.name,
        })

        const result = await insertUser.save();

        if (!result) {
            res.status(500).json({ success: false, message: 'User Not Inserted' })
        }
        res.status(201).send(result);
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Error in Users Router (post)', error: err })
        console.log('Error ', err)
    }
})


// =======================================  Sign In User  =====================================================

router.post(`/signin`, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User Not Found' })
        }

        if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
            
            res.status(200).send({ success: false, user: user, signIn: true });
        }
        else {
            res.status(400).send({ message: 'Wrong Password' });
        }

    } catch (err) {
        res.status(500).json({ success: false, message: 'Error in User Routes (post)', error: err })
    }
})


// =======================================  Update User Info by Id  =================================================

router.patch('/updateInfo/:id', async (req, res) => {

    try {

        const user = await User.findById(req.params.id);
        if (!user) return res.status(400).send('Invalid User!');


        const result = await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
        }, { new: true })

        if (!result) {
            return res.status(404).json({ success: false, message: 'User Not Found' })
        }
        res.status(200).send({user: result, message: "Updated Successfully!"})
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Error in Users Router (put)', error: err })
    }
})


// =======================================  Update User Password by Id  =================================================

router.put('/update-password/:id', async (req, res) => {
    try {

        const user = await User.findById(req.params.id);
        if (!user) return res.status(400).send('Invalid User!');


        if (user && bcrypt.compareSync(req.body.oldPassword, user.passwordHash)) {
            var result = await User.findByIdAndUpdate(req.params.id, {
                passwordHash: bcrypt.hashSync(req.body.newPassword, 10),
            }, { new: true })
        }
        else {
            return res.status(400).send({ success: false, message: 'Wrong Password' });
        }


        if (!result) {
            return res.status(404).json({ success: false, message: 'User Not Found' })
        }

        res.status(200).json({message: 'Password Changed Successfully!', success: true})
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Error in Users Router (put)', error: err })
        console.log(err);
    }
})


// =======================================  Delete User by Id  =================================================

router.delete('/:id', async (req, res) => {
    try {
        const result = await User.findByIdAndRemove(req.params.id)
        if (!result) {
            return res.status(404).json({ success: false, message: 'User Not Found' })
        }
        res.status(200).json({ success: true, message: 'User Deleted' })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error in User Routes (delete)', error: err })
    }
})


// =======================================  Count All Users  ===================================================

router.get(`/get/count`, async (req, res) => {
    try {
        const userCount = await User.countDocuments()
        res.status(200).send({ userCount: userCount });
    } catch (err) {
        res.status(500).json({ success: false, error: err })
    }
})

module.exports = router;