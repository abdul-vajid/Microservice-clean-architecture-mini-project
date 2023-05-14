import express from "express";
import { Request, Response, NextFunction } from 'express';
import {
    registerUser,
    checkUserCredentials,
    test
} from '../controllers/authController.ts'



const router = express.Router();

router.get('/test', test);

router.post('/register', registerUser);

router.post('/login', checkUserCredentials)

export default router;