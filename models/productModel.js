/* eslint-disable comma-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    thumbnail: {
        type: String,
        trim: true,
        required: true,
    },
    photos: {
        type: Array,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        trim: true,
        required: true,
    },
    category: {   // category is field name, Note Your Schema Name
        type: mongoose.Types.ObjectId,
        ref: "Category", // This Category is reffering your Schema
        required: true
    },
    subcategory: {
        type: String,
        ref: "SubCategory",
        required: true,
    },
    sku: {
        type: String,
        trim: true,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountPrice : {
        type: Number,
        required: true,
    },
    color:{
        type: Array,
    },
    reviews:{
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Product', productSchema);
