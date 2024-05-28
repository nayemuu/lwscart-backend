/* eslint-disable radix */
/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */

const slugify = require('slugify');
const subCategoryModel = require('../models/subCategoryModel');
const categoryModel = require('../models/categoryModel');
const { replaceMongoIdInArray } = require('../utils/mongoDB-utils');

const create = async (req, res) => {
    try {
        const { name, category } = req.body;
        if (!name.trim()) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const existingCategory = await subCategoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ error: 'Already exists' });
        }

        const categoryExists = await categoryModel.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ error: 'Category does not exist' });
        }

        const subCategory = await subCategoryModel.create({
            name,
            slug: slugify(name),
            category
        });

        res.json(subCategory);
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
        const removed = await subCategoryModel.findByIdAndDelete(req.params.subCategoryId);
        res.json(removed);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

module.exports = { create, list, remove };
