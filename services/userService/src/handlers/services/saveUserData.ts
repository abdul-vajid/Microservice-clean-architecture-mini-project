export = (depentencies: any): any => {
    const {
        useCases: {
            saveUserData_useCase
        },
        RabbitMQClient
    } = depentencies;

    const saveUserData = async (message: any) => {
        type Response = {
            isError: boolean,
            message?: string,
            data?: any
        }
        let response: Response = { isError: false }

        const user = {
            userId: message.userId,
            fullname: message.fullname,
            email: message.email,
            phoneNumber: message.phoneNumber,
            city: message.city,
            country: message.country
        }
        const savedUserData = await saveUserData_useCase(depentencies).execute(user);
        
        if (savedUserData.error) {
            response.isError = true
            response.message = "Internal error"
            response.data = savedUserData.error
            return response
        } else {
            response.isError = false
            response.message = "User successfully saved"
            response.data = savedUserData.userId
            return response
        }
    };
    return saveUserData;
}




/* import User from "../../models/userModel.ts"

export const saveUserInfoInDb = async (message: any) => {
    type Response = {
        isError: boolean,
        message?: string,
        data?: any
    }
    let response: Response = { isError: false }
    try {
        const newUser = new User({
            userId: message.userId,
            email: message.email,
            fullname: message.fullname,
            phoneNumber: message.phoneNumber,
            country: message.country,
            city: message.city
        });
        await newUser.save();
        response.isError = false;
        response.message = 'user info saved in user db';
        return response;
    } catch (error) {
        response.isError = true;
        response.message = 'something went wrong in adding user db';
        response.data = error
        return response;
    }
} */