
const productModel = require('../models/productModel');
const subCategoryModel = require('../models/productModel');
const categoryModel = require('../models/categoryModel');
const { replaceMongoIdInArray } = require('../utils/mongoDB-utils');

const create = async (req, res) => {
    try {
        const {category, subCategory } = req.body;
        console.log("req.body = ", req.body);

        const categoryExists = await categoryModel.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ error: 'Category does not exist' });
        }


        const subCategoryExists = await categoryModel.findById(subCategory);
        if (!subCategoryExists) {
            return res.status(400).json({ error: 'subCategory does not exist' });
        }

        // await productModel.create(req.body);

        res.status(201).json({message:"Product Created Sucessfully"});
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
};

const list = async (req, res) => {
    try {
        const all = await subCategoryModel.find({}).populate("category", "name").lean();  // category is field name, Note Your Schema Name
        res.json(replaceMongoIdInArray(all));
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

const remove = async (req, res) => {
    try {
        console.log('req.params.subCategoryId = ', req.params.subCategoryId);
        const deletedData = await subCategoryModel.findByIdAndDelete(req.params.subCategoryId);
        res.json({message: "deleted successfully"});
    } catch (err) {
        console.log(err);
        return res.status(500).json(err.message);
    }
};

module.exports = { create, list, remove };
