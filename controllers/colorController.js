const slugify = require('slugify');
const colorModel = require('../models/colorModel');
const { replaceMongoIdInArray } = require('../utils/mongoDB-utils');

const create = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name.trim()) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const colorExists = await colorModel.findOne({ name });
        if (colorExists) {
            return res.status(400).json({ error: 'Already exists' });
        }


        const color = await colorModel.create({
            name,
            slug: slugify(name),
        });

        res.status(201).json({message:"Color Created Sucessfully"});
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
};

const list = async (req, res) => {
    try {
        const all = await colorModel.find({}).lean();  // category is field name, Note Your Schema Name
        res.json(replaceMongoIdInArray(all));
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

const remove = async (req, res) => {
    try {
        console.log('req.params.colorId = ', req.params.colorId);
        const deletedData = await colorModel.colorModel(req.params.colorId);
        res.json({message: "deleted successfully"});
    } catch (err) {
        console.log(err);
        return res.status(500).json(err.message);
    }
};

module.exports = { create, list, remove };
