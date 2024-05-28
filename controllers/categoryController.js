/* eslint-disable radix */
/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */

const slugify = require('slugify');
const cloudinary = require('cloudinary').v2;
const categoryModel = require('../models/categoryModel');
const { replaceMongoIdInArray } = require('../utils/data-util');

const { uploadOnCloudinary } = require('../utils/cloudinary');



const create = async (req, res) => {
    try {
        const { name } = req.body;
        const thumbnail  = req.files['thumbnail'][0];
        const logo  = req.files['logo'][0];

        // console.log("thumbnail = ", thumbnail);
        // console.log("logo = ", logo);

        if (!name.trim()) {
            return res.json({ error: 'Name is required' });
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.json({ error: 'Already exists' });
        }

        // const res1 = await cloudinary.uploader.upload(thumbnail.path);
        // console.log("res1 = ",res1);
        // const res2 = await cloudinary.uploader.upload(logo.path);
        // console.log("res2 = ",res2);
        const res1 = await uploadOnCloudinary(thumbnail.path);
        console.log("res1 = ",res1);
        const res2 = await uploadOnCloudinary(ogo.path);
        console.log("res2 = ",res2);

        // const category = await categoryModel.create({ name, slug: slugify(name), thumbnail: thumbnail.filename, logo:logo.filename });
        // res.json(category);
        res.json({message:"success"});
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

const list = async (req, res) => {
    try {
        const all = await categoryModel.find({}).select(['name', 'image']).lean();
        res.json(replaceMongoIdInArray(all));
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

const remove = async (req, res) => {
    try {
        console.log('req.params.categoryId = ', req.params.categoryId);
        const removed = await categoryModel.findByIdAndDelete(req.params.categoryId);
        res.json(removed);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

module.exports = { create, list, remove };
