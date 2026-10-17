"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUSES = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const products_router_1 = require("./routes/products-router");
const db_1 = require("./repositories/db");
const port = process.env.PORT || 5000;
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
exports.app.use('/products', products_router_1.productsRouter);
const startApp = async () => {
    await (0, db_1.runDb)();
    exports.app.listen(port, () => {
        console.log(`Example app listening on port http://localhost:${port}`);
    });
};
startApp();
