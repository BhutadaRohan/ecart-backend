const express = require("express")

const Seller = require("../../Models/sellerModel")
const Product = require("../../Models/productModel");

const router = express.Router();

//get all products for the seller
router
    .route('/products')
    .post(async (req, res) => {
        const { _id } = req.body;

        await Seller
            .findById(_id)
            .then(async (seller) => {
                await Product
                    .find({
                        '_id': { $in: seller["products"] }
                    }, { _id: 0, __v: 0 })
                    .then((products) => {
                        res.json({
                            status: 'success',
                            message: 'All products for the seller',
                            length: products.length,
                            products: products
                        })
                    })
            })
    })

// add new product to the products collection and also to the seller 
router
    .route('/addproduct')
    .post(async (req, res) => {
        const { _id, name, mrp, discount, highlights, productdesc } = req.body

        if (!name || !mrp || !highlights || !productdesc) {
            res.json({
                status: 'failed',
                message: 'All fields are required'
            })
        }

        const sellername = await Seller.findById(_id);

        await Product
            .create({
                name: name,
                mrp: mrp,
                discount: discount,
                highlights: highlights,
                productdesc: productdesc,
                sellername: sellername["shopname"]
            })
            .then(async (product) => {
                await Seller
                    .findByIdAndUpdate(_id,
                        { $push: { "products": String(product._id) } },
                        { new: true })
                    .then((seller) => {
                        res.json({
                            status: 'success',
                            message: 'product added succesfully',
                            seller: seller
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    })


// Delete the product from products collection and also from seller document
router
    .route('/deleteproduct')
    .post(async (req, res) => {

        const { _id, productid } = req.body

        await Seller
            .findByIdAndUpdate(
                _id,
                { $pull: { products: productid } },
                { new: true }
            )
            .then(async (seller) => {
                await Product
                    .findByIdAndDelete(productid)
                    .then(async () => {
                        res.json({
                            status: 'success',
                            message: 'product deleted succesfully',
                            seller: seller
                        })
                    })
                    .catch((err) => { console.log(err) })

            })
            .catch((err) => {
                console.log(err)
            })
    })

//Modify the product from product collection and also from seller
router
    .route('/modifyproduct')
    .post(async (req, res) => {
        const { id, newproduct } = req.body;

        await Product
            .findByIdAndUpdate(id, newproduct, { new: true })
            .then((product) => {
                res.json({
                    status: 'success',
                    message: 'Product Information updated succesfully',
                    product: product
                })
            })
            .catch((err) => {
                console.log(err)
            })
    })

module.exports = router;