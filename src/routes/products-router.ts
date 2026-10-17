import {Request, Response, Router} from "express";
import {HTTP_STATUSES} from "../index";
import {productsDbRepository} from "../repositories/products-db-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

export const titleValidation = body('title').trim().isLength({
    min: 3,
    max: 10
}).withMessage('Title length should be from 3 to 10 symbols')

export const productsRouter = Router({})

productsRouter.get('/', async (req: Request, res: Response) => {
    const foundProducts = await productsDbRepository.findProducts(req.query.title?.toString())
    res.send(foundProducts)
})

productsRouter.post('/', titleValidation, inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const newProduct = await productsDbRepository.createProduct(req.body.title)
        res.status(HTTP_STATUSES.CREATED_201).send(newProduct)
    })

productsRouter.get('/:id', async (req: Request, res: Response) => {
    let product = await productsDbRepository.getProductById(+req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})

productsRouter.put('/:id', titleValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const isUpdated = await productsDbRepository.updateProduct(+req.params.id, req.body.title)
    if (isUpdated) {
        const product = await productsDbRepository.getProductById(+req.params.id)
        res.send(product)
    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})

productsRouter.delete('/:id', async (req: Request, res: Response) => {
    const isDeleted = await productsDbRepository.deleteProduct(+req.params.id)
    if (isDeleted) {
        res.send(HTTP_STATUSES.NO_CONTENT_204)
    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})