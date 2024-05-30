/* eslint-disable consistent-return */
/* eslint-disable max-len */
const express = require('express');
const { list, create, remove } = require('../controllers/productController');

const Route = express.Router();
Route.get('/', list);
Route.post('/', create);
Route.delete('/:productId', remove);

module.exports = Route;
