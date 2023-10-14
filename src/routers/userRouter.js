const express = require("express");
const jwt = require('jsonwebtoken');
const userRouter = express.Router();
const User = require("../models/userModel")
const bcrypt = require('bcrypt');
const saltRounds = 10;

// user register handaling start  there
userRouter.post('/register', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (user) {
            res.status(400).send("user already exist")
        }
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            const newUser = new User({
                email: req.body.email,
                name: req.body.name,
                password: hash
            })
            await newUser.save()
                .then((user) => {
                    res.status(200).send({
                        sucsses: true,
                        masseage: "user is created sucssesfully",
                        user: {
                            userId: user._id
                        }
                    })
                })
                .catch(err => {
                    res.status(500).send(err)
                })

        });
    } catch (error) {
        res.status(500).send(error.masseage)
    }
})
// user register handaling end  there

// user login start there
userRouter.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user) {
            res.status(401).send({
                sucsses:false,
                masseage:"user not found"
            })
        }
        if (!bcrypt.compareSync(req.password,user.password)) {
            res.status(401).send({
                sucsses:false,
                masseage:"in currect password"
            })
        }
       
    } catch (error) {
        res.status(500).send(error.masseage)
    }
})
// user login end there



module.exports = userRouter;