import mongoose from "mongoose";
import { schemas } from "..";
import { authDb } from "../../../../app/interfaces/authDb.interface"

export const generateUserCredentials = async (email: string, password: string): Promise<authDb> => {
    const mongooseObject = new schemas.auth({
        email,
        password
    });
    return await mongooseObject.save() as authDb
}


export const checkUserCredentials = async (email: string, password: string): Promise<authDb> => {
    const mongooseObject = new schemas.auth({
        email,
        password
    });
    return await mongooseObject.save() as authDb
}