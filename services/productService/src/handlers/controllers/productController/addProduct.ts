import { Request, Response, NextFunction } from 'express';
// import {ErrorResponse } from '../../../utils/index.ts';
import config from '../../../infrastructure/rabbitmq/rabbitmq.config.ts';


export = (depentencies: any): any => {
    const {
        useCases: {
            addProduct_UseCase
        },
    } = depentencies;

    const addProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = {
                productName: req.body.productName,
                category: req.body.category,
                madeIn: req.body.madeIn,
                stock: req.body.stock,
                amount: req.body.amount
            }
            const savedProduct = await addProduct_UseCase(depentencies).execute(product);
            res.status(201).send({ status: 201, message: `${savedProduct.productName} added to product table` })
        } catch (error) {
            next(error)
        }
    };
    return addProduct
}