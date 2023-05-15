import { authSchema, IAuthDb } from "../index";


export const generateUserCredentials = async (user: IAuthDb): Promise<IAuthDb> => {
    const mongooseObject = new authSchema({
        email: user.email,
        password: user.password
    });
    return await mongooseObject.save() as IAuthDb
}


export const checkUserCredentials = async (email: string, password: string): Promise<IAuthDb> => {
    const mongooseObject = await authSchema.findOne({ email: email, password: password })
    return await mongooseObject as IAuthDb
}

export const findUserByEmail = async (email: string): Promise<IAuthDb> => {
    const mongooseObject = await authSchema.findOne({ email: email })
    
    return mongooseObject as IAuthDb
}