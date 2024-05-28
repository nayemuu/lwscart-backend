/* eslint-disable consistent-return */
/* eslint-disable max-len */
const express = require('express');
const { list, create, remove } = require('../controllers/categoryController');
const upload = require('../utils/multer');

const Route = express.Router();
Route.get('/', list);
Route.post('/', upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'logo', maxCount: 1 }]), create);
Route.delete('/:categoryId', remove);

module.exports = Route;
