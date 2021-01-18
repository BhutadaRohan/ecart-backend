const express = require("express")

const Cart = require('../../Models/cartModel')

const router = express.Router();

// get user cart
router
    .route('/:id/cart')
    .get(async (req, res) => {
        const userId = req.params.id
        Cart.find({ ownedBy: userId }, { __v: 0 })
            .populate('items.productId')
            .then(cart => {
                res.json({
                    status: 'success',
                    message: 'Cart items successfully fetched',
                    cart: cart
                })
            })
            .catch(() => {
                res.json({
                    status: 'failed',
                    message: 'Something went wrong',
                })
            })
    })

// update cart
router
    .route('/cart/update')
    .post(async (req, res) => {
        const { _id, items } = req.body
        Cart.findByIdAndUpdate(_id, { items }, { new: true })
            .populate('items')
            .then(cart => {
                res.json({
                    status: 'success',
                    message: 'Product added successfully',
                    cart: cart
                })
            })
            .catch(() => {
                res.json({
                    status: 'failed',
                    message: 'Something went wrong',
                })
            })
    })

module.exports = router