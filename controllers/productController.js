
const productModel = require('../models/productModel');
const subCategoryModel = require('../models/subCategoryModel');
const categoryModel = require('../models/categoryModel');
const { replaceMongoIdInArray } = require('../utils/mongoDB-utils');

const create = async (req, res) => {
    try {
        const {category, subCategory } = req.body;
        // console.log("req.body = ", req.body);

        const categoryExists = await categoryModel.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ error: 'Category does not exist' });
        }


        const subCategoryExists = await subCategoryModel.findById(subCategory);

        console.log("subCategoryExists" , subCategoryExists);
        if (!subCategoryExists) {
            return res.status(400).json({ error: 'subCategory does not exist' });
        }

        await productModel.create(req.body);

        res.status(201).json({message:"Product Created Sucessfully"});
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

const list = async (req, res) => {
    const { limit, offset } = req.query;
    try {
        const products = await productModel.find({}).populate("category", "name").populate("subCategory", "name").populate("color", "name").lean();  // category is field name, Note Your Schema Name
        if (products.length === 0) {
            return { count: 0, limit: limit ? limit : 10, offset: offset ? offset : 0, products: [] };
          }

          const start = offset ? offset: 0;
          const end = (limit && offset) ? offset + limit: 10;

          const paginatedProducts = products.slice(start, end);


        res.status(200).json({ count: products.length, limit: limit ? limit : 10, offset: offset ? offset : 0, products: replaceMongoIdInArray(paginatedProducts)});
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

const remove = async (req, res) => {
    try {
        console.log('req.params.subCategoryId = ', req.params.subCategoryId);
        const deletedData = await productModel.findByIdAndDelete(req.params.subCategoryId);
        res.json({message: "deleted successfully"});
    } catch (err) {
        console.log(err);
        return res.status(500).json(err.message);
    }
};


const insertMany = async (req, res) => {
    try {
        await productModel.insertMany(req.body); // array of objects থাকবে যার কারনে destructure করি নাই

        // console.log(user1);
        res.status(201).json({message:"Products Created Sucessfully"});
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports = { create, list, remove, insertMany };
