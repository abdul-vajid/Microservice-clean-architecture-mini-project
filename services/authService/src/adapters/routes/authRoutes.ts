import express from "express";

import {authController} from '../controllers';

export = (dependencies: any) => {
    const router = express.Router();
    const { registerUser } = authController(dependencies);

    router.post('/registerUser', registerUser)

    return router;
};
