const mongoose = require('mongoose');
const Seller = require('./sellerModel');
const { ObjectId } = mongoose.Schema.Types

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    mrp: {
        type: Number,
        required: true,
    },

    discount: {
        type: Number,
        default: 0
    },

    highlights: {
        type: Array,
        required: true,
    },

    productdesc: {
        type: Object,
        required: true,
    },

    ownedBy: {
        type: ObjectId,
        ref: Seller,
        required: true
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;