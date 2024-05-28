const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
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
    category: {   // category is field name, Note Your Schema Name
        type: mongoose.Types.ObjectId,
        ref: "Category", // This Category is reffering your Schema
        required: true
    },
});

module.exports = mongoose.model('SubCategory', subCategorySchema);