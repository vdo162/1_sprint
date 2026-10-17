"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = exports.titleValidation = void 0;
const express_1 = require("express");
const index_1 = require("../index");
const products_db_repository_1 = require("../repositories/products-db-repository");
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
exports.titleValidation = (0, express_validator_1.body)('title').trim().isLength({
    min: 3,
    max: 10
}).withMessage('Title length should be from 3 to 10 symbols');
exports.productsRouter = (0, express_1.Router)({});
exports.productsRouter.get('/', async (req, res) => {
    const foundProducts = await products_db_repository_1.productsDbRepository.findProducts(req.query.title?.toString());
    res.send(foundProducts);
});
exports.productsRouter.post('/', exports.titleValidation, input_validation_middleware_1.inputValidationMiddleware, async (req, res) => {
    const newProduct = await products_db_repository_1.productsDbRepository.createProduct(req.body.title);
    res.status(index_1.HTTP_STATUSES.CREATED_201).send(newProduct);
});
exports.productsRouter.get('/:id', async (req, res) => {
    let product = await products_db_repository_1.productsDbRepository.getProductById(+req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(index_1.HTTP_STATUSES.NOT_FOUND_404);
    }
});
exports.productsRouter.put('/:id', exports.titleValidation, input_validation_middleware_1.inputValidationMiddleware, async (req, res) => {
    const isUpdated = await products_db_repository_1.productsDbRepository.updateProduct(+req.params.id, req.body.title);
    if (isUpdated) {
        const product = await products_db_repository_1.productsDbRepository.getProductById(+req.params.id);
        res.send(product);
    }
    else {
        res.send(index_1.HTTP_STATUSES.NOT_FOUND_404);
    }
});
exports.productsRouter.delete('/:id', async (req, res) => {
    const isDeleted = await products_db_repository_1.productsDbRepository.deleteProduct(+req.params.id);
    if (isDeleted) {
        res.send(index_1.HTTP_STATUSES.NO_CONTENT_204);
    }
    else {
        res.send(index_1.HTTP_STATUSES.NOT_FOUND_404);
    }
});
