/* eslint-disable comma-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const categorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    thumbnail: {
        type: Object,
        required: true,
    },
    photos: {
        type: Array,
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
    category: {
        type: String,
        trim: true,
        required: true,
    },
    subcategory: {
        type: String,
        trim: true,
        required: true,
    },
});

module.exports = mongoose.model('Category', categorySchema);
