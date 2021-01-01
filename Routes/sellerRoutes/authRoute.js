const express = require("express")
const validator = require("validator")
const bcrypt = require('bcryptjs')

const Seller = require("../../Models/sellerModel")

const router = express.Router();

// user signup route and its handeler
router
    .route('/signup')
    .post(async (req, res) => {
        const { email, name, password, address, mobileno } = req.body

        if (!name || !email || !password || !address || !mobileno) {
            return res
                .json({
                    status: "failed",
                    message: "All fields are required."
                })
        }

        if (!validator.isEmail(email)) {
            return res
                .json({
                    status: "failed",
                    message: "Invalid Email address"
                })
        }

        if (password.length < 8) {
            return res
                .json({
                    status: "failed",
                    message: "Password must contain atleast 8 characters"
                })
        }

        await Seller
            .findOne({ email: email })
            .then(async (user) => {
                if (user) {
                    return res
                        .json({
                            status: "failed",
                            message: "User already exists !"
                        })
                } else {
                    const hashPassword = await bcrypt.hash(password, 12)
                    await Seller
                        .create({
                            email: email,
                            shopname: name,
                            mobileno: mobileno,
                            address: address,
                            password: hashPassword
                        })
                        .then((user) => {
                            return res
                                .status(201)
                                .json({
                                    status: "success",
                                    message: "User created succesfully!",
                                    user: {
                                        email: email,
                                        shopname: user.shopname,
                                        mobileno: user.mobileno,
                                        address: user.address,
                                        _id: user._id,
                                    }
                                })
                        })
                        .catch((err) => {
                            console.log(err)
                        })

                }
            })
            .catch((err) => {
                console.log(err)
            })

    })

// user signin route and its handeler
router
    .route('/signin')
    .post(async (req, res) => {
        const { email, password } = req.body

        if (!email || !password) {
            return res
                .json({
                    status: "failed",
                    message: "All fields are required."
                })
        }

        await Seller
            .findOne({ email: email })
            .then((user) => {
                if (!user) {
                    return res
                        .json({
                            status: "failed",
                            message: "Account doesn't exists."
                        })
                } else {
                    bcrypt
                        .compare(password, user.password)
                        .then((match) => {
                            if (match) {
                                return res
                                    .json({
                                        status: "success",
                                        message: "Login successful.",
                                        user: {
                                            email: email,
                                            shopname: user.shopname,
                                            mobileno: user.mobileno,
                                            address: user.address,
                                            _id: user._id,
                                        }
                                    })
                            } else {
                                return res
                                    .json({
                                        status: "failed",
                                        message: "Invalid Email or Password."
                                    })
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }

            })
            .catch((err) => {
                console.log(err)
            })

    })

module.exports = router;