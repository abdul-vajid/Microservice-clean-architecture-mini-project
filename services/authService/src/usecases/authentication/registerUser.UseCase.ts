import { User } from "../../entities/auth.entities.ts";
import { IUserData } from "../../utils/interfaces/IUserData.ts";

export const registerUser_UseCase = (dependencies: any) => {
    const {
       repositories
    } = dependencies;

    if (!repositories)
        throw new Error("Repositories dependencie is missing");

    const execute = ({ email, password }: IUserData) => {
        const user = new User({
            email,
            password
        });
        return repositories.generateUserCredentials(user)
    };
    return {
        execute,
    };
};