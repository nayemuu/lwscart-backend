/* eslint-disable consistent-return */
/* eslint-disable max-len */
const express = require('express');
const { list, create, remove } = require('../controllers/subCategoryController');

const Route = express.Router();
Route.get('/', list);
Route.post('/', create);
Route.delete('/:categoryId', remove);

module.exports = Route;
