const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({

    shopname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    address: {
        type: String,
        required: true,
    },
    mobileno: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
        default: []
    }
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;