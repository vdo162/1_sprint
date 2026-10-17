"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsDbRepository = void 0;
const db_1 = require("./db");
exports.productsDbRepository = {
    async findProducts(title) {
        const filter = {};
        if (title) {
            filter.title = { $regex: title };
        }
        return db_1.productsCollection.find(filter).toArray();
    },
    async getProductById(id) {
        let product = await db_1.productsCollection.findOne({ id });
        if (product) {
            return product;
        }
        else {
            return null;
        }
    },
    async createProduct(title) {
        const newProduct = {
            id: +(new Date()),
            title: title
        };
        await db_1.productsCollection.insertOne(newProduct);
        return newProduct;
    },
    async updateProduct(id, title) {
        const result = await db_1.productsCollection.updateOne({ id }, { $set: { title } });
        return result.matchedCount === 1;
    },
    async deleteProduct(id) {
        const result = await db_1.productsCollection.deleteOne({ id });
        return result.deletedCount === 1;
    }
};
