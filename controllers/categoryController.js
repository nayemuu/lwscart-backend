/* eslint-disable radix */
/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */

const slugify = require('slugify');
const categoryModel = require('../models/categoryModel');
const { replaceMongoIdInArray } = require('../utils/mongoDB-utils');
const { replaceCloudinaryObjectIntoUrlInArray } = require('../utils/cloudinary-utils');

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

        const thumbnailImageDetails = await uploadOnCloudinary(thumbnail.path);
        // console.log("thumbnailImageDetails = ", thumbnailImageDetails);
        const logoImageDetails = await uploadOnCloudinary(logo.path);
        // console.log("logoImageDetails = ", logoImageDetails);

        const category = await categoryModel.create({ name, slug: slugify(name), thumbnail: thumbnailImageDetails, logo:logoImageDetails });
        res.json(category);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

const list = async (req, res) => {
    try {
        const dataFromMongodb = await categoryModel.find({}).select(['name', 'thumbnail', "logo"]).lean();

        let cloudinaryFields = ['thumbnail', 'logo']; 
        console.log("dataFromMongodb = ", dataFromMongodb);
        let finalData = replaceCloudinaryObjectIntoUrlInArray(replaceMongoIdInArray(dataFromMongodb), cloudinaryFields);
        console.log("finalData = ", finalData);

        res.json(finalData);
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
