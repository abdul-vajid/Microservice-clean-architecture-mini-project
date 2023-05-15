import { userSchema, IUserDb } from "../index";


export const createUser = async (user: IUserDb): Promise<IUserDb> => {
    const mongooseObject = new userSchema({
        userId : user.userId,
        fullname : user.fullname,
        email : user.email,
        phoneNumber : user.phoneNumber,
        city : user.city,
        country : user.country,
    });
    return await mongooseObject.save() as IUserDb
}


export const checkUserCredentials = async (email: string, password: string): Promise<IUserDb> => {
    const mongooseObject = await userSchema.findOne({ email: email, password: password })
    return await mongooseObject as IUserDb
}

export const findUserByEmail = async (email: string): Promise<IUserDb> => {
    const mongooseObject = await userSchema.findOne({ email: email })
    
    return mongooseObject as IUserDb
}