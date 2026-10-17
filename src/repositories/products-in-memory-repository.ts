export type ProductType = {
    id: number;
    title: string
}

type dbType = {
    products: ProductType[];
}

export const db: dbType = {
    products: [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]
}

export const productsInMemoryRepository = {
    async findProducts(title: string | null | undefined): Promise<ProductType[]> {
        if (title) {
            let filteredProducts = db.products.filter(p => p.title.indexOf(title) > -1)
            return filteredProducts
        } else {
            return db.products
        }
    },
    async getProductById(id: number): Promise<ProductType | null> {
        let product = db.products.find(p => p.id === id)

        if (product) {
            return product;
        } else {
            return null;
        }
    },
    async createProduct(title: string): Promise<ProductType> {
        const newProduct = {
            id: +(new Date()),
            title: title
        }
        db.products.push(newProduct)
        return newProduct
    },
    async updateProduct(id: number, title: string): Promise<boolean> {
        let product = db.products.find(p => p.id === id)
        if (product) {
            product.title = title
            return true;
        } else {
            return false;
        }
    },
    async deleteProduct(id: number): Promise<boolean> {
        for (let i = 0; i < db.products.length; i++) {
            if (db.products[i].id === id) {
                db.products.splice(i, 1)
                return true;
            }
        }
        return false
    }
}
