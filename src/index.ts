import express from 'express';
import {productsRouter} from "./routes/products-router";
import {runDb} from "./repositories/db";

const port = process.env.PORT || 5000

export const app = express()

app.use(express.json())

export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
}

app.use('/products', productsRouter)

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port http://localhost:${port}`);
    });
}

startApp()

