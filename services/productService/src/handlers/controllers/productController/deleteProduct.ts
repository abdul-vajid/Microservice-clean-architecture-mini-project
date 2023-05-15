import { Request, Response, NextFunction } from 'express';
// import {ErrorResponse } from '../../../utils/index.ts';
import config from '../../../infrastructure/rabbitmq/rabbitmq.config.ts';


export = (depentencies: any): any => {
    const {
        useCases: {
            deleteProduct_UseCase
        },
    } = depentencies;

    const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
       
    };
    return deleteProduct
}