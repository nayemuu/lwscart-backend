/* eslint-disable comma-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const categorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 50,
        unique: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Category', categorySchema);
