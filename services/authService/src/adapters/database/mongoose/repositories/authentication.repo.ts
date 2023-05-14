import {authSchema} from "../index";
import { authDb, userData } from "../../../../app/interfaces/auth.interface"


export const generateUserCredentials = async (user: userData): Promise<authDb> => {
    console.log('Debug 4', user);
    console.log('Debug 5', user.email);
    console.log('Debug 6', user.password);
    const mongooseObject = new authSchema({
        email : user.email,
        password : user.password
    });
    return await mongooseObject.save() as authDb
}


export const checkUserCredentials = async (email: string, password: string): Promise<authDb> => {
    const mongooseObject = await authSchema.findOne({ email: email, password: password })
    return await mongooseObject as authDb
}

export const findUserByEmail = async (email: string): Promise<authDb> => {
    const mongooseObject = await authSchema.findOne({ email: email })
    return await mongooseObject as authDb
}