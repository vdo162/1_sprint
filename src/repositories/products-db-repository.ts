import {productsCollection, ProductType} from "./db";

export const productsDbRepository = {
    async findProducts(title: string | null | undefined): Promise<ProductType[]> {
        const filter: any = {}
        if (title) {
            filter.title = {$regex: title}
        }
        return productsCollection.find(filter).toArray()
    },
    async getProductById(id: number): Promise<ProductType | null> {
        let product = await productsCollection.findOne({id})

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
        await productsCollection.insertOne(newProduct)
        return newProduct
    },
    async updateProduct(id: number, title: string): Promise<boolean> {
        const result = await productsCollection.updateOne({id}, {$set: {title}})
        return result.matchedCount === 1
    },
    async deleteProduct(id: number): Promise<boolean> {
        const result = await productsCollection.deleteOne({id});
        return result.deletedCount === 1
    }
}
