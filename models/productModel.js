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
    images: {
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
    subCategory: {
        type: mongoose.Types.ObjectId, // 
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
    discountPercentage : {
        type: Number,
        required: true,
    },
    colors: [{   // category is field name, Note Your Schema Name
        type: mongoose.Types.ObjectId,
        ref: "Color", // This Category is reffering your Schema
        required: false
    }],
    description:{
        type: String,
        trim: true,
        required: true,
    },
    reviews:{
        type: Object,
        required: true,
    }, 
    rating: {
        type: Number,
        required: true,
        default:3.5
    },   
    keywords: {
        type: Array,
    },  
    sizes: {
        type: Array,
    },
    totalSold: {
        type: Number,
        required: true,
        default:0
    },
});

module.exports = mongoose.model('Product', productSchema);
