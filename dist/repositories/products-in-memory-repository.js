"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsInMemoryRepository = exports.db = void 0;
exports.db = {
    products: [{ id: 1, title: 'tomato' }, { id: 2, title: 'orange' }]
};
exports.productsInMemoryRepository = {
    async findProducts(title) {
        if (title) {
            let filteredProducts = exports.db.products.filter(p => p.title.indexOf(title) > -1);
            return filteredProducts;
        }
        else {
            return exports.db.products;
        }
    },
    async getProductById(id) {
        let product = exports.db.products.find(p => p.id === id);
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
        exports.db.products.push(newProduct);
        return newProduct;
    },
    async updateProduct(id, title) {
        let product = exports.db.products.find(p => p.id === id);
        if (product) {
            product.title = title;
            return true;
        }
        else {
            return false;
        }
    },
    async deleteProduct(id) {
        for (let i = 0; i < exports.db.products.length; i++) {
            if (exports.db.products[i].id === id) {
                exports.db.products.splice(i, 1);
                return true;
            }
        }
        return false;
    }
};
