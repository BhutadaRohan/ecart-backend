const mongoose = require('mongoose');
const Seller = require('./sellerModel');
const { ObjectId } = mongoose.Schema.Types

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    price: {
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

    description: {
        type: Object,
        required: true,
    },

    category: {
        type: String,
        required: true
    },

    ownedBy: {
        type: ObjectId,
        ref: Seller,
        required: true
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;