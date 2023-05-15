import express from "express";

import {authController} from '../../handlers/controllers';

export = (dependencies: any) => {
    const router = express.Router();
    const { registerUser, loginUser } = authController(dependencies);

    router.post('/registerUser', registerUser)

    router.post('/login', loginUser)

    return router;
};
