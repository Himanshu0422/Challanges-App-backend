const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middlewares/authMiddleware');
const { User, schema } = require('../models/userModel');

router.post('/register', async (req, res) => {
    try {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400)
                .send({
                    message: error.details[0].message,
                    success: false
                });
        }
        const userExists = await User.findOne({
            email: req.body.email
        });
        if (userExists) {
            return res.status(200).send({
                message: "User already exists",
                success: false,
            });
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        req.body.password = hashedPass;

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        await newUser.save();
        res.status(200).send({
            message: "User created successfully",
            success: true,
        });
    } catch (err) {
        res.status(500).send({
            message: "Error creating user",
            success: false,
            err
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });
        if (!user) {
            return res.status(200).send({
                message: "User not found",
                success: false
            })
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(200).send({
                message: "Password is incorrect",
                success: false
            })
        } else {
            const token = jwt.sign(
                {
                    id: user._id,
                },
                process.env.SECRET_KEY,
                {
                    expiresIn: "1d"
                }
            );
            res.status(200).send({
                message: "Login successful",
                success: true,
                data: token
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Error logging user",
            success: false,
            error
        });
    }
});

router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        user.password = undefined;
        if (!user) {
            res.status(200).send({
                message: "User not find",
                success: false,
            });
        } else {
            res.status(200).send({
                success: true,
                data: user,
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Error getting user info",
            success: false,
            error,
        });
    }
});

module.exports = router;