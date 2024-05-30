/* eslint-disable comma-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const colorSchema = new Schema({
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
    }
});

module.exports = mongoose.model('Color', colorSchema);
