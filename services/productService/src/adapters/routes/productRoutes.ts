import express from "express";

import {productController} from '../../handlers/controllers';

export = (dependencies: any) => {
    const router = express.Router();
    const { addProduct, deleteProduct, getProducts } = productController(dependencies);

    router.post('/addProduct', addProduct)

    router.get('/deleteProduct/:productId', deleteProduct)
    
    router.get('/getProducts', getProducts)

    return router;
};
