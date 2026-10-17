import {MongoClient} from 'mongodb'

export type ProductType = {
    id: number;
    title: string
}

//const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017";
const mongoUri = process.env.mongoURI ||
    "mongodb://vdo162_db_user:RhgfraMhpu9E0q8p@ac-xrdwpdl-shard-00-00.j0gvvou.mongodb.net:27017,ac-xrdwpdl-shard-00-01.j0gvvou.mongodb.net:27017,ac-xrdwpdl-shard-00-02.j0gvvou.mongodb.net:27017/shop-dev?ssl=true&replicaSet=atlas-gstfzh-shard-0&authSource=admin";


const client = new MongoClient(mongoUri);
// const db = client.db('shop');
const db = client.db();
export const productsCollection = db.collection<ProductType>('products')

export async function runDb() {
    try {
        // Connect the client to the server
        await client.connect();
        // Establish and verify connection
        await client.db("products").command({ping: 1});
        console.log("Connected successfully to mongo server");

    } catch(err) {
        console.log(err)
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
