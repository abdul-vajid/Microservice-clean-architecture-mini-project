import { Request, Response, NextFunction } from 'express';
// import {ErrorResponse } from '../../../utils/index.ts';
import config from '../../../infrastructure/rabbitmq/rabbitmq.config.ts';


export = (depentencies: any): any => {
    const {
        useCases: {
            getProducts_UseCase
        },
    } = depentencies;

    const getProducts = async (req: Request, res: Response, next: NextFunction) => {
       
    };
    return getProducts
}