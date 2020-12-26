const mongoose = require('mongoose');

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

    sellername: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;