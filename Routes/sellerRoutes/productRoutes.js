const express = require("express")

const Seller = require("../../Models/sellerModel")
const Product = require("../../Models/productModel");

const router = express.Router();

//get all products for the seller
router
    .route('/products/:id')
    .get(async (req, res) => {
        const { id } = req.params;
        console.log(id)
        await Product
            .find({ ownedBy: id }, { __v: 0 })
            .populate('ownedBy', { password: 0, __v: 0 })
            .then((products) => {
                res.json({
                    status: 'success',
                    message: 'All products for the seller',
                    length: products.length,
                    products: products
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
                sellername: sellername["shopname"],
                ownedBy: _id
            })
            .then((product) => {
                res.json({
                    status: 'success',
                    message: 'product added succesfully',
                    product: product
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

        const { productid } = req.body

        await Product
            .findByIdAndDelete(productid)
            .then(() => {
                res.json({
                    status: 'success',
                    message: 'product deleted succesfully'
                })
            })
            .catch((err) => { console.log(err) })

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